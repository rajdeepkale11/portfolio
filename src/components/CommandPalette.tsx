"use client";

import Link from "next/link";
import * as React from "react";

type Item = { id: string; label: string; href: string; hint?: string };

const ITEMS: Item[] = [
  { id: "top", label: "Home", href: "#top", hint: "Hero" },
  { id: "about", label: "About", href: "#about", hint: "Story" },
  { id: "services", label: "Services", href: "#services" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ITEMS;
    return ITEMS.filter((it) => it.label.toLowerCase().includes(query));
  }, [q]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((v) => Math.min(v + 1, Math.max(0, filtered.length - 1)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((v) => Math.max(0, v - 1));
      }
      if (e.key === "Enter") {
        const it = filtered[active];
        if (!it) return;
        e.preventDefault();
        setOpen(false);
        window.location.hash = it.href.replace("#", "");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, active]);

  React.useEffect(() => {
    if (!open) {
      setQ("");
      setActive(0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={[
        "cmdk",
        prefersReducedMotion() ? "" : "cmdk--animate",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={() => setOpen(false)}
    >
      <div className="cmdk__panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cmdk__top">
          <input
            autoFocus
            className="cmdk__input"
            placeholder="Jump to… (Services, Projects, Contact)"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
          />
          <div className="cmdk__hint">Ctrl K</div>
        </div>

        <div className="cmdk__list">
          {filtered.length ? (
            filtered.map((it, idx) => (
              <Link
                key={it.id}
                href={it.href}
                className={[
                  "cmdk__item",
                  idx === active ? "cmdk__item--active" : "",
                ].join(" ")}
                onMouseEnter={() => setActive(idx)}
                onClick={() => setOpen(false)}
              >
                <span className="cmdk__label">{it.label}</span>
                {it.hint ? <span className="cmdk__meta">{it.hint}</span> : null}
              </Link>
            ))
          ) : (
            <div className="cmdk__empty">No matches.</div>
          )}
        </div>
      </div>
    </div>
  );
}

