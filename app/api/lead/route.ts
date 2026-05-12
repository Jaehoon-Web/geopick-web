import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name: string;
  phone: string;
  biz: string;
  msg?: string;
};

function isValidPhone(v: string) {
  const digits = v.replace(/[^\d]/g, "");
  return digits.length >= 9 && digits.length <= 11;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Very lightweight in-memory rate limit (per process). For multi-instance prod,
// replace with Upstash Redis / KV / similar.
const recentByIp = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const arr = (recentByIp.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  recentByIp.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

async function notifySlack(lead: Record<string, unknown>) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return { skipped: true };
  try {
    const text = [
      "🟠 *새 진단 신청*",
      `• 이름: ${lead.name}`,
      `• 연락처: ${lead.phone}`,
      `• 업종: ${lead.biz}`,
      `• 메모: ${lead.msg || "(없음)"}`,
      `• Referer: ${lead.referer || "(없음)"}`,
    ].join("\n");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error("[lead] slack failed", err);
    return { ok: false, error: String(err) };
  }
}

/**
 * 카카오톡 알림톡 (Kakao Biz Message)
 *
 * 알림톡은 Kakao 비즈채널 + Solapi/Aligo 같은 게이트웨이가 필요합니다.
 * 셋업이 끝나면 아래 변수에 값을 넣어주세요.
 *
 * Solapi (https://solapi.com) 기준 필요 변수:
 *   SOLAPI_API_KEY        — 콘솔의 API Key
 *   SOLAPI_API_SECRET     — 콘솔의 API Secret
 *   SOLAPI_SENDER_PHONE   — 발신번호 (사전 등록 필요)
 *   SOLAPI_PF_ID          — 카카오 비즈채널 ID
 *   SOLAPI_TEMPLATE_ID    — 사전 검수된 알림톡 템플릿 ID
 *   LEAD_NOTIFY_PHONE     — 알림 받을 휴대전화 번호 (담당자 본인)
 *
 * 사전 작업:
 *   1) Solapi 가입 → 발신번호 등록 (본인 인증)
 *   2) 카카오톡 비즈채널 개설 (kakaotalkchannel.com)
 *   3) Solapi 콘솔에서 비즈채널 연동 → PF_ID 발급
 *   4) 알림톡 템플릿 등록 + 카카오 검수 (보통 1~3 영업일)
 *      예시 템플릿:
 *      "[지오픽] 새 진단 신청 접수\n\n이름: #{name}\n연락처: #{phone}\n업종: #{biz}"
 *
 * 검수 통과 전까지는 Slack/Resend 채널로 대신 알림 받으세요.
 */
async function notifyKakaoBiz(lead: Record<string, unknown>) {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const senderPhone = process.env.SOLAPI_SENDER_PHONE;
  const pfId = process.env.SOLAPI_PF_ID;
  const templateId = process.env.SOLAPI_TEMPLATE_ID;
  const to = process.env.LEAD_NOTIFY_PHONE;

  if (!apiKey || !apiSecret || !senderPhone || !pfId || !templateId || !to) {
    return { skipped: true };
  }

  try {
    // HMAC 서명 — Solapi 인증 방식
    const salt = Math.random().toString(36).slice(2, 14);
    const date = new Date().toISOString();
    const data = `${date}${salt}`;
    const crypto = await import("node:crypto");
    const signature = crypto
      .createHmac("sha256", apiSecret)
      .update(data)
      .digest("hex");

    const res = await fetch("https://api.solapi.com/messages/v4/send", {
      method: "POST",
      headers: {
        Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          to: String(to).replace(/[^\d]/g, ""),
          from: String(senderPhone).replace(/[^\d]/g, ""),
          type: "ATA", // 알림톡
          kakaoOptions: {
            pfId,
            templateId,
            // 템플릿 변수 — 사전 등록한 변수명과 정확히 일치해야 합니다
            variables: {
              "#{name}": String(lead.name),
              "#{phone}": String(lead.phone),
              "#{biz}": String(lead.biz),
            },
          },
        },
      }),
    });
    const body = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    console.error("[lead] kakao biz failed", err);
    return { ok: false, error: String(err) };
  }
}

async function notifyResendEmail(lead: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !to || !from) return { skipped: true };
  try {
    const html = `
      <h2>새 진단 신청 — 지오픽</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
        <tr><td><b>이름</b></td><td>${escapeHtml(String(lead.name))}</td></tr>
        <tr><td><b>연락처</b></td><td>${escapeHtml(String(lead.phone))}</td></tr>
        <tr><td><b>업종</b></td><td>${escapeHtml(String(lead.biz))}</td></tr>
        <tr><td><b>메모</b></td><td>${escapeHtml(String(lead.msg || "(없음)"))}</td></tr>
        <tr><td><b>제출 시각</b></td><td>${escapeHtml(String(lead.submittedAt))}</td></tr>
        <tr><td><b>Referer</b></td><td>${escapeHtml(String(lead.referer || "(없음)"))}</td></tr>
      </table>
    `;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[지오픽] 진단 신청 · ${lead.biz} · ${lead.name}`,
        html,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error("[lead] resend failed", err);
    return { ok: false, error: String(err) };
  }
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "잠시 후 다시 시도해 주세요." },
      { status: 429 }
    );
  }

  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").toString().trim();
  const phone = (body.phone || "").toString().trim();
  const biz = (body.biz || "").toString().trim();
  const msg = (body.msg || "").toString().trim();

  if (!name || name.length > 80) {
    return NextResponse.json({ error: "이름을 확인해 주세요." }, { status: 400 });
  }
  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json(
      { error: "연락처를 확인해 주세요." },
      { status: 400 }
    );
  }
  if (!biz || biz.length > 60) {
    return NextResponse.json(
      { error: "업종을 선택해 주세요." },
      { status: 400 }
    );
  }
  if (msg.length > 2000) {
    return NextResponse.json(
      { error: "메시지가 너무 깁니다." },
      { status: 400 }
    );
  }

  const lead = {
    name,
    phone,
    biz,
    msg: msg || null,
    submittedAt: new Date().toISOString(),
    ip,
    ua: req.headers.get("user-agent") || "",
    referer: req.headers.get("referer") || "",
  };

  // Always log so it's visible during dev or when no channels configured
  console.log("[lead]", JSON.stringify(lead));

  const [slack, email, kakao] = await Promise.all([
    notifySlack(lead),
    notifyResendEmail(lead),
    notifyKakaoBiz(lead),
  ]);

  // We still return ok to the user even if a channel skipped — they shouldn't
  // see internal wiring problems. But log a warning if NOTHING ran.
  if (slack.skipped && email.skipped && kakao.skipped) {
    console.warn(
      "[lead] No notification channel configured. " +
        "Set SLACK_WEBHOOK_URL, or RESEND_API_KEY + LEAD_NOTIFY_EMAIL + LEAD_FROM_EMAIL, " +
        "or SOLAPI_* + LEAD_NOTIFY_PHONE for 카카오 알림톡."
    );
  }

  return NextResponse.json({ ok: true });
}
