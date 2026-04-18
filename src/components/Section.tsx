"use client";

import * as React from "react";

export function Section({
  id,
  children,
  className,
}: React.PropsWithChildren<{ id?: string; className?: string }>) {
  return (
    <section id={id} className={["scroll-mt-24", className ?? ""].join(" ")}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progress from when heading enters viewport to slightly past center.
      const start = vh * 0.92;
      const end = vh * 0.38;
      const t = (start - r.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, t));
      setP(clamped);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-3 section-heading"
      style={{ ["--p" as never]: String(p) }}
    >
      <div className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-muted">
        <span className="h-px w-8 bg-[color:var(--card-border)]" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-balance text-sm leading-7 text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
