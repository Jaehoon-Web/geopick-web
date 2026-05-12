"use client";

import { useState, FormEvent } from "react";

const INDUSTRIES = [
  "피부과 · 성형외과",
  "한의원",
  "에스테틱 · 뷰티샵",
  "법률사무소",
  "음식점 · 프랜차이즈",
  "기타",
];

type Status = "idle" | "submitting" | "success" | "error";

export function CtaForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      biz: String(fd.get("biz") || "").trim(),
      msg: String(fd.get("msg") || "").trim(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "신청 처리에 실패했어요.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  }

  return (
    <section className="section cta" id="form">
      <div className="cta__aurora" aria-hidden="true" />
      <div className="cta__inner">
        <div data-reveal>
          <span className="eyebrow cta__eyebrow">09 · Apply</span>
          <h2 className="cta__title">
            1분이면
            <br />
            <span className="cta__title-accent">끝납니다.</span>
          </h2>
          <p className="cta__sub">
            영업 전화 안 합니다. 24시간 안에 카톡으로 진단 결과 PDF부터
            보내드립니다.
          </p>
          <p className="cta__safe">
            제출 정보는 1:1 상담 외 용도로 사용되지 않습니다.
            <br />
            상담 후 진행 여부는 자유롭게 결정하실 수 있습니다.
          </p>
        </div>

        {status === "success" ? (
          <div
            className="form__success"
            data-reveal
            style={{ ["--rdelay" as string]: "120ms" }}
          >
            <b>신청 완료 ✓ 카톡으로 안내드릴게요.</b>
            <p style={{ marginTop: 12, color: "rgba(244,239,230,0.72)" }}>
              담당 매니저가 24시간 안에 입력하신 번호로 진단 결과 PDF를
              발송해 드립니다. 영업 전화는 하지 않습니다.
            </p>
          </div>
        ) : (
          <form
            className="form"
            data-reveal
            style={{ ["--rdelay" as string]: "120ms" }}
            onSubmit={onSubmit}
          >
            <div className="form__field">
              <label className="form__label" htmlFor="lead_name">
                어떻게 부르면 될까요?
              </label>
              <input
                id="lead_name"
                name="name"
                type="text"
                placeholder="원장님 / 사장님 호칭 또는 이름"
                autoComplete="name"
                required
                disabled={status === "submitting"}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="lead_phone">
                연락 받으실 번호
              </label>
              <input
                id="lead_phone"
                name="phone"
                type="tel"
                placeholder="010-0000-0000"
                inputMode="tel"
                autoComplete="tel"
                required
                disabled={status === "submitting"}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="lead_biz">
                어떤 업종이세요?
              </label>
              <select
                id="lead_biz"
                name="biz"
                required
                disabled={status === "submitting"}
                defaultValue=""
              >
                <option value="" disabled>
                  선택해주세요
                </option>
                {INDUSTRIES.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="lead_msg">
                지금 가장 큰 고민이 뭔가요? <small>(선택)</small>
              </label>
              <textarea
                id="lead_msg"
                name="msg"
                rows={2}
                placeholder="예: 옆 병원이 갑자기 잘 된다는 소문이…"
                disabled={status === "submitting"}
              />
            </div>
            <button
              type="submit"
              className="btn btn--primary btn--xl form__submit"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? "신청 처리 중…"
                : "무료 진단 신청하기"}
              {status !== "submitting" && (
                <span className="btn-arrow">→</span>
              )}
            </button>
            {status === "error" && error && (
              <p
                style={{
                  color: "var(--accent)",
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                {error} — 잠시 후 다시 시도해 주세요.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
