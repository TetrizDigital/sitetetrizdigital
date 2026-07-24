import { useEffect, useRef, useState } from "react";

/**
 * CinematicShell — global cinematic overlay layer (Phase 2).
 * Silent HUD: grain + vignette + letterbox + spotlight + custom cursor mira.
 * No REC/timecode/coords/scene text — pure atmosphere.
 */
export default function CinematicShell() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      cx += (tx - cx) * 0.25;
      cy += (ty - cy) * 0.25;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(400px circle at ${cx}px ${cy}px, rgba(255,187,0,.07), transparent 70%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.classList.add("cinematic-cursor");
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("cinematic-cursor");
    };
  }, [enabled]);

  return (
    <div aria-hidden className="cinematic-shell pointer-events-none fixed inset-0 z-[70]">
      {enabled ? (
        <div ref={spotlightRef} className="absolute inset-0" style={{ mixBlendMode: "screen" }} />
      ) : null}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 100%)",
        }}
      />

      {/* film grain removed per user request */}

      <div className="absolute inset-x-0 top-0 h-[14px] bg-black" />
      <div className="absolute inset-x-0 bottom-0 h-[14px] bg-black" />

      {enabled ? (
        <div
          ref={cursorRef}
          className="absolute left-0 top-0"
          style={{ width: 32, height: 32, willChange: "transform" }}
        >
          <svg viewBox="0 0 32 32" width="32" height="32" style={{ overflow: "visible" }}>
            <circle cx="16" cy="16" r="10" fill="none" stroke="#FFBB00" strokeWidth="1" opacity=".9" />
            <circle cx="16" cy="16" r="1.5" fill="#FFBB00" />
            <line x1="16" y1="0" x2="16" y2="6" stroke="#FFBB00" strokeWidth="1" />
            <line x1="16" y1="26" x2="16" y2="32" stroke="#FFBB00" strokeWidth="1" />
            <line x1="0" y1="16" x2="6" y2="16" stroke="#FFBB00" strokeWidth="1" />
            <line x1="26" y1="16" x2="32" y2="16" stroke="#FFBB00" strokeWidth="1" />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
