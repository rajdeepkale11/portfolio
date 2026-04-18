"use client";

import * as React from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroGlowScope({ children }: { children: React.ReactNode }) {
  const mainRef = React.useRef<HTMLElement | null>(null);
  const last = React.useRef({ x: 0, y: 0 });
  const on = React.useRef(false);

  const setOn = (v: boolean) => {
    if (on.current === v) return;
    on.current = v;
    document.documentElement.classList.toggle("hero-glow-on", v);
  };

  const applyPointer = React.useCallback(() => {
    const main = mainRef.current;
    if (!main || !on.current) return;
    if (prefersReducedMotion()) return;
    const r = main.getBoundingClientRect();
    document.documentElement.style.setProperty("--hx", `${last.current.x - r.left}px`);
    document.documentElement.style.setProperty("--hy", `${last.current.y - r.top}px`);
  }, []);

  React.useEffect(() => {
    const sync = () => applyPointer();
    window.addEventListener("scroll", sync, { passive: true, capture: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync, { capture: true });
      window.removeEventListener("resize", sync);
    };
  }, [applyPointer]);

  return (
    <main
      ref={mainRef}
      className="relative w-full flex-1"
      onMouseMove={(e) => {
        if (prefersReducedMotion()) return;
        last.current = { x: e.clientX, y: e.clientY };
        setOn(true);
        applyPointer();
      }}
      onMouseLeave={() => setOn(false)}
    >
      <div className="hero-glow" aria-hidden="true" />
      {children}
    </main>
  );
}

