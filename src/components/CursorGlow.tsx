"use client";

import * as React from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

export function CursorGlow() {
  const rafRef = React.useRef<number | null>(null);
  const last = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = document.documentElement;

    const flush = () => {
      rafRef.current = null;
      const { x, y } = last.current;
      root.style.setProperty("--gx", `${x}px`);
      root.style.setProperty("--gy", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      last.current.x = e.clientX;
      last.current.y = e.clientY;
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      root.style.removeProperty("--gx");
      root.style.removeProperty("--gy");
    };
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
}

