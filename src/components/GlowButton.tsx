import Link from "next/link";
import * as React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function GlowButton({
  href,
  children,
  variant = "primary",
  className,
}: Props) {
  const base =
    "focus-ring shine neo-border hud-frame relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition will-change-transform active:translate-y-px hover:translate-y-[-1px]";
  const primary =
    "text-black bg-white/92 hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_18px_60px_rgba(0,0,0,0.35)]";
  const secondary =
    "text-[color:var(--foreground)]/90 bg-white/6 hover:bg-white/10 border border-white/10 shadow-[0_14px_42px_rgba(0,0,0,0.25)]";

  return (
    <Link
      href={href}
      className={[
        base,
        variant === "primary" ? primary : secondary,
        className ?? "",
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 rounded-full opacity-70 blur-xl"
          style={{
            background:
              "radial-gradient(120px 80px at 30% 35%, rgba(160,160,170,0.35), transparent 60%), radial-gradient(140px 90px at 70% 60%, rgba(80,80,88,0.28), transparent 60%)",
          }}
        />
      ) : null}
    </Link>
  );
}
