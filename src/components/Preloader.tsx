import { useEffect, useState } from "react";

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      // ease-out for a "reel loading" feel
      const eased = 1 - Math.pow(1 - p, 2);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setDone(true);
        window.setTimeout(() => {
          document.body.style.overflow = prevOverflow;
          setGone(true);
        }, 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-700"
      style={{
        background: "#000",
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
      aria-hidden={done}
    >
      {/* Sweeping mustard line */}
      <div
        className="absolute left-0 h-px w-full"
        style={{
          top: "50%",
          background:
            "linear-gradient(90deg, transparent 0%, #FFBB00 50%, transparent 100%)",
          transform: `translateX(${-100 + pct * 2}%)`,
          transition: "transform .1s linear",
          opacity: .8,
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        <div
          className="text-white/60"
          style={{ fontSize: 10, letterSpacing: ".5em" }}
        >
          TETRIZ PICTURES PRESENTS
        </div>
        <div
          className="tabular-nums"
          style={{
            color: "#fff",
            fontSize: "clamp(4rem, 12vw, 9rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-.04em",
          }}
        >
          {String(pct).padStart(3, "0")}
        </div>
        <div className="flex items-center gap-2 text-white/50" style={{ fontSize: 10, letterSpacing: ".35em" }}>
          <span className="h-2 w-2 rounded-full" style={{ background: "#FFBB00" }} />
          LOADING SCENE 01 / 09
        </div>
      </div>

      {/* Corner brackets */}
      <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t" style={{ borderColor: "#FFBB00" }} />
      <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t" style={{ borderColor: "#FFBB00" }} />
      <div className="pointer-events-none absolute left-6 bottom-6 h-8 w-8 border-l border-b" style={{ borderColor: "#FFBB00" }} />
      <div className="pointer-events-none absolute right-6 bottom-6 h-8 w-8 border-r border-b" style={{ borderColor: "#FFBB00" }} />
    </div>
  );
}
