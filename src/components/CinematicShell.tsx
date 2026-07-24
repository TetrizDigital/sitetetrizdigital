import { useEffect, useRef, useState } from "react";

/**
 * CinematicShell — global cinematic overlay layer.
 * Grain + vignette + letterbox bars + custom cursor mira + timecode HUD + spotlight.
 * Non-interactive except for the sound toggle placeholder.
 */

const SCENES: { id: string; label: string }[] = [
  { id: "__hero", label: "MANIFESTO" },
  { id: "jogo", label: "O JOGO" },
  { id: "metodo", label: "MÉTODO" },
  { id: "onde-entramos", label: "SERVIÇOS" },
  { id: "trofeus", label: "TROFÉUS" },
  { id: "jogadores", label: "JOGADORES" },
  { id: "arena", label: "ARENA" },
  { id: "times", label: "TIMES" },
  { id: "agendar", label: "AGENDAR" },
];

export default function CinematicShell() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const coordsRef = useRef<HTMLSpanElement | null>(null);
  const [scene, setScene] = useState(0);
  const [tc, setTc] = useState("00:00");
  const [enabled, setEnabled] = useState(false);

  // Enable heavy overlays only on desktop, respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Timecode counter (real elapsed since mount)
  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      const s = Math.floor((performance.now() - start) / 1000);
      const mm = String(Math.floor(s / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setTc(`${mm}:${ss}`);
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  // Cursor + spotlight tracking
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
      if (coordsRef.current) {
        coordsRef.current.textContent = `X${String(Math.round(cx)).padStart(4, "0")} Y${String(Math.round(cy)).padStart(4, "0")}`;
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

  // Active scene detection via IntersectionObserver on section ids
  useEffect(() => {
    const els = SCENES.map((s) =>
      s.id === "__hero" ? document.querySelector("[data-hero]") : document.getElementById(s.id),
    ).filter(Boolean) as Element[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.35) {
            const idx = els.indexOf(e.target);
            if (idx >= 0) setScene(idx);
          }
        });
      },
      { threshold: [0.35, 0.6] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden className="cinematic-shell pointer-events-none fixed inset-0 z-[70]">
      {/* Spotlight following cursor */}
      {enabled ? (
        <div ref={spotlightRef} className="absolute inset-0" style={{ mixBlendMode: "screen" }} />
      ) : null}

      {/* Global vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 100%)",
        }}
      />

      {/* Film grain */}
      {enabled ? <div className="cinematic-grain absolute inset-0" /> : null}

      {/* Letterbox bars */}
      <div className="absolute inset-x-0 top-0 h-[18px] bg-black" />
      <div className="absolute inset-x-0 bottom-0 h-[18px] bg-black" />

      {/* HUD — top-left REC + scene */}
      <div
        className="absolute left-4 top-6 flex items-center gap-3 text-white/85"
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 10,
          letterSpacing: ".28em",
          textTransform: "uppercase",
        }}
      >
        <span className="cinematic-rec inline-block h-2 w-2 rounded-full" style={{ background: "#FFBB00" }} />
        REC · {tc}
        <span className="mx-2 opacity-40">|</span>
        SCENE {String(scene + 1).padStart(2, "0")}/{String(SCENES.length).padStart(2, "0")} · {SCENES[scene]?.label}
      </div>

      {/* HUD — top-right coords */}
      <div
        className="absolute right-4 top-6 text-white/70"
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 10,
          letterSpacing: ".22em",
        }}
      >
        <span ref={coordsRef}>X0000 Y0000</span>
        <span className="mx-2 opacity-40">|</span>
        <span style={{ color: "#FFBB00" }}>ƒ/2.39 · 4K</span>
      </div>

      {/* HUD — bottom-left cinematographer credit */}
      <div
        className="absolute left-4 bottom-6 text-white/60"
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 9,
          letterSpacing: ".3em",
          textTransform: "uppercase",
        }}
      >
        TETRIZ ▸ DIRECTOR'S CUT
      </div>

      {/* Scene scrubber — right side dots */}
      <nav
        className="pointer-events-auto absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-end gap-3"
        aria-label="Cenas"
      >
        {SCENES.map((s, i) => (
          <a
            key={s.id}
            href={s.id === "__hero" ? "#top" : `#${s.id}`}
            className="group flex items-center gap-2"
            title={s.label}
          >
            <span
              className="text-[9px] tracking-[.25em] opacity-0 transition-opacity group-hover:opacity-100"
              style={{ color: "#FFBB00", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              {s.label}
            </span>
            <span
              className="block transition-all"
              style={{
                width: i === scene ? 22 : 10,
                height: 2,
                background: i === scene ? "#FFBB00" : "rgba(255,255,255,.35)",
              }}
            />
          </a>
        ))}
      </nav>

      {/* Custom cursor mira */}
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
