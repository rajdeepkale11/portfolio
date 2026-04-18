"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { useThemeFx } from "@/components/ThemeFx";

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M21 14.9A8.4 8.4 0 0 1 9.1 3a6.9 6.9 0 1 0 11.9 11.9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 2v2.5M12 19.5V22M22 12h-2.5M4.5 12H2M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8M19.1 19.1l-1.8-1.8M6.7 6.7L4.9 4.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const fx = useThemeFx();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const resolved = theme === "system" ? systemTheme : theme;
  const isDark = resolved !== "light";

  // Avoid hydration mismatch: server can't know the user's theme yet.
  if (!mounted) {
    return (
      <button
        type="button"
        className="focus-ring neo-border inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[color:var(--foreground)]/80 ring-1 ring-white/10 transition hover:bg-white/10"
        aria-label="Toggle theme"
        title="Theme"
      >
        <span className="h-5 w-5 rounded-full bg-[color:var(--foreground)]/20" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        const next = isDark ? "light" : "dark";
        fx?.playThemeTransition(next);
        if (!fx) setTheme(next);
      }}
      className="focus-ring neo-border inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[color:var(--foreground)]/80 ring-1 ring-white/10 transition hover:bg-white/10"
      aria-label="Toggle theme"
      title={mounted ? (isDark ? "Switch to light" : "Switch to dark") : "Theme"}
    >
      {isDark ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
}

