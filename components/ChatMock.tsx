"use client";

import { useEffect, useRef, useState } from "react";

const FULL_TEXT =
  "강남 지역에서 리프팅 시술로 평이 좋은 곳을 정리해드릴게요.";

const RANKS = [
  { rank: 1, name: "A 피부과", tag: "CLIENT", highlight: true },
  { rank: 2, name: "B 피부과", tag: "강남" },
  { rank: 3, name: "C 클리닉", tag: "신사" },
];

export function ChatMock() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [parallax, setParallax] = useState({ y: 0, scale: 1, opacity: 1 });
  const startedRef = useRef(false);

  // Typing animation
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let i = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (i <= FULL_TEXT.length) {
        setTyped(FULL_TEXT.slice(0, i));
        i++;
        setTimeout(tick, 32 + Math.random() * 24);
      } else {
        setDone(true);
      }
    };

    const startTimer = setTimeout(tick, 1100);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, []);

  // Parallax on scroll
  useEffect(() => {
    let ticking = false;
    function update() {
      const y = window.scrollY;
      const max = window.innerHeight;
      const p = Math.min(y / max, 1);
      setParallax({
        y: -y * 0.06,
        scale: 1 - p * 0.04,
        opacity: 1 - p * 0.6,
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hero__visual">
      <div
        className="chat-mock"
        style={{
          transform: `translateY(${parallax.y}px) scale(${parallax.scale})`,
          opacity: parallax.opacity,
        }}
      >
        <div className="chat-aside chat-aside--tl">live · AI search</div>
        <div className="chat-mock__top">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span>chat.openai.com</span>
          <span style={{ opacity: 0.5 }}>⌘K</span>
        </div>
        <div className="chat-mock__body">
          <div className="chat-msg chat-msg--user">
            <div className="chat-msg__role">
              <span>USER</span>
            </div>
            <div className="bub">강남에서 리프팅 잘하는 피부과 추천해줘</div>
          </div>
          <div className="chat-msg chat-msg--ai">
            <div className="chat-msg__role">
              <span className="av">AI</span>
              <span>CHATGPT</span>
            </div>
            <div className="bub">
              <div className={done ? "" : "typing"}>{typed}</div>
              {done && (
                <div className="chat-rank">
                  {RANKS.map((r, idx) => (
                    <div
                      key={r.rank}
                      className={`chat-rank__item${r.highlight ? " highlight" : ""}`}
                      style={{
                        opacity: 0,
                        transform: "translateY(8px)",
                        animation: `chat-rank-in 420ms cubic-bezier(.2,.7,.2,1) ${idx * 140}ms forwards`,
                      }}
                    >
                      <span className="chat-rank__num">{r.rank}</span>
                      <span className="chat-rank__name">{r.name}</span>
                      <span className="chat-rank__tag">{r.tag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="chat-aside chat-aside--br">+218% 노출</div>
      </div>
    </div>
  );
}
