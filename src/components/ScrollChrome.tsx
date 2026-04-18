"use client";

import * as React from "react";

const SECTIONS = ["about", "services", "skills", "projects", "contact"] as const;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollChrome() {
  const [active, setActive] = React.useState<string | null>(null);
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setP(scrollTop / max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        const id = visible?.target?.id ?? null;
        setActive(id);
      },
      { root: null, threshold: [0.25, 0.35, 0.5, 0.65] },
    );

    els.forEach((el) => io.observe(el!));
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.activeSection = active ?? "";
  }, [active]);

  return (
    <div
      className="scroll-progress"
      aria-hidden="true"
      style={{ ["--sp" as never]: String(p) }}
    />
  );
}
