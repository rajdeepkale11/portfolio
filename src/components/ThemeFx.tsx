"use client";

import { useTheme } from "next-themes";
import * as React from "react";

type Ctx = {
  playThemeTransition: (nextTheme: "dark" | "light") => void;
};

const ThemeFxContext = React.createContext<Ctx | null>(null);

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useThemeFx() {
  return React.useContext(ThemeFxContext);
}

type CinematicKind = "to-dark" | "to-light";

/**
 * Long-form cinematic wipes — theme flips near full coverage, then a soft dissolve.
 */
const CINEMATIC = {
  "to-dark": { totalMs: 1200, themeAtMs: 620 },
  "to-light": { totalMs: 1150, themeAtMs: 540 },
} as const;

function ThemeCinematicOverlay({ kind }: { kind: CinematicKind }) {
  const isDark = kind === "to-dark";
  return (
    <div
      className={`theme-cinematic theme-cinematic--${kind}`}
      aria-hidden="true"
    >
      {isDark ? (
        <>
          <div className="theme-cinematic__layer theme-cinematic__layer--dark-a" />
          <div className="theme-cinematic__layer theme-cinematic__layer--dark-b" />
          <div className="theme-cinematic__layer theme-cinematic__layer--dark-c" />
        </>
      ) : (
        <>
          <div className="theme-cinematic__layer theme-cinematic__layer--light-a" />
          <div className="theme-cinematic__layer theme-cinematic__layer--light-b" />
          <div className="theme-cinematic__layer theme-cinematic__layer--light-c" />
        </>
      )}
    </div>
  );
}

function ParticleDrift() {
  const { theme, systemTheme } = useTheme();
  const resolved = theme === "system" ? systemTheme : theme;
  const isDark = resolved !== "light";

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!isDark) return;
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const particles = Array.from({ length: 56 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.000075,
      vy: (Math.random() - 0.5) * 0.00005,
      r: 0.45 + Math.random() * 1.35,
      hue: i % 3 === 0 ? 200 : i % 3 === 1 ? 270 : 210,
    }));

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x = (p.x + p.vx * dt) % 1;
        p.y = (p.y + p.vy * dt) % 1;
        if (p.x < 0) p.x += 1;
        if (p.y < 0) p.y += 1;

        const depth = 0.35 + p.z * 0.65;
        const x = (p.x - 0.5) * w * (1.05 - p.z * 0.18) + w / 2;
        const y = (p.y - 0.5) * h * (1.05 - p.z * 0.18) + h / 2;
        const a = 0.035 + depth * 0.11;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 70%, 72%, ${a})`;
        ctx.arc(x, y, p.r * (0.8 + depth * 0.9), 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isDark]);

  if (!isDark || prefersReducedMotion()) return null;
  return <canvas ref={canvasRef} className="particle-drift" aria-hidden="true" />;
}

/** Soft paper / pollen drift — distinct from dark cyber particles. */
function LightParticleDrift() {
  const { theme, systemTheme } = useTheme();
  const resolved = theme === "system" ? systemTheme : theme;
  const isLight = resolved === "light";

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!isLight) return;
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const specs = [
      { hue: 42, sat: 55, light: 92 },
      { hue: 268, sat: 42, light: 93 },
      { hue: 168, sat: 38, light: 92 },
      { hue: 330, sat: 48, light: 94 },
    ];

    const particles = Array.from({ length: 38 }, (_, i) => {
      const s = specs[i % specs.length]!;
      return {
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.00004,
        vy: (Math.random() - 0.5) * 0.000028 - 0.000012,
        r: 0.55 + Math.random() * 1.85,
        ...s,
      };
    });

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x = (p.x + p.vx * dt) % 1;
        p.y = (p.y + p.vy * dt) % 1;
        if (p.x < 0) p.x += 1;
        if (p.y < 0) p.y += 1;

        const depth = 0.4 + p.z * 0.6;
        const x = (p.x - 0.5) * w * (1.02 - p.z * 0.12) + w / 2;
        const y = (p.y - 0.5) * h * (1.02 - p.z * 0.12) + h / 2;
        const a = 0.018 + depth * 0.055;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a})`;
        ctx.arc(x, y, p.r * (0.85 + depth * 0.75), 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isLight]);

  if (!isLight || prefersReducedMotion()) return null;
  return <canvas ref={canvasRef} className="light-drift" aria-hidden="true" />;
}

export function ThemeFxProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const [cinematicKind, setCinematicKind] = React.useState<CinematicKind | null>(null);
  const lock = React.useRef(false);
  const timers = React.useRef<number[]>([]);

  const clearTimers = React.useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  React.useEffect(() => () => clearTimers(), [clearTimers]);

  const playThemeTransition = React.useCallback(
    (nextTheme: "dark" | "light") => {
      if (prefersReducedMotion()) {
        setTheme(nextTheme);
        return;
      }
      if (lock.current) return;
      lock.current = true;
      clearTimers();

      const kind: CinematicKind = nextTheme === "dark" ? "to-dark" : "to-light";
      const { totalMs, themeAtMs } = CINEMATIC[kind];
      setCinematicKind(kind);

      timers.current.push(
        window.setTimeout(() => {
          setTheme(nextTheme);
        }, themeAtMs),
      );

      timers.current.push(
        window.setTimeout(() => {
          setCinematicKind(null);
          lock.current = false;
        }, totalMs),
      );
    },
    [clearTimers, setTheme],
  );

  const ctx = React.useMemo<Ctx>(() => ({ playThemeTransition }), [playThemeTransition]);

  return (
    <ThemeFxContext.Provider value={ctx}>
      <ParticleDrift />
      <LightParticleDrift />
      {children}
      {cinematicKind ? <ThemeCinematicOverlay kind={cinematicKind} /> : null}
    </ThemeFxContext.Provider>
  );
}
