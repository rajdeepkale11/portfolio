"use client";

import Link from "next/link";
import * as React from "react";
import { site } from "@/lib/site";
import { BrandKaleLink } from "./BrandKaleLink";
import { SocialLinks } from "./SocialLinks";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export function Nav() {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const read = () => setActive(document.documentElement.dataset.activeSection || null);
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-active-section"] });
    return () => mo.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl light:bg-white/40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <BrandKaleLink />

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={[
                "focus-ring nav-link rounded-full px-3 py-2 text-sm transition hover:bg-white/5 hover:text-[color:var(--foreground)]",
                active === it.href.slice(1)
                  ? "nav-link--active text-[color:var(--foreground)]/90"
                  : "text-muted",
              ].join(" ")}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SocialLinks links={site.socials} className="hidden sm:flex" />
          <ThemeToggle />
          <Link
            href={site.cta.primary.href}
            className="focus-ring inline-flex items-center justify-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black transition hover:bg-white light:bg-black/90 light:text-white light:hover:bg-black"
          >
            {site.cta.primary.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
