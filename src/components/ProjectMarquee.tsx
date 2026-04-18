"use client";

import * as React from "react";
import { site } from "@/lib/site";
import type { ProjectCaseStudy } from "@/lib/site";
import { Marquee } from "@/components/Marquee";
import { CaseStudyModal } from "@/components/CaseStudyModal";

const LOOP = 2;

export function ProjectMarquee() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<ProjectCaseStudy | null>(null);

  const cards = React.useMemo(
    () => Array.from({ length: LOOP }, () => site.projects).flat(),
    [],
  );

  return (
    <>
      <Marquee
        speedSeconds={36}
        className="py-2 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      >
        {cards.map((p, i) => (
          <button
            key={`${p.id}-${i}`}
            type="button"
            className="glass neo-border hud-frame tilt-card group w-[320px] shrink-0 rounded-3xl p-6 text-left transition hover:bg-white/[0.075] sm:w-[360px]"
            onClick={() => {
              setActive(p);
              setOpen(true);
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[color:var(--foreground)]/90">{p.title}</p>
              <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs text-muted ring-1 ring-white/10">
                View
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">{p.tagline}</p>
            <div
              className="mt-5 aspect-[16/10] rounded-2xl ring-1 ring-white/10 transition group-hover:ring-white/20"
              style={{ background: p.thumbGradient }}
            />
            <p className="mt-4 text-sm leading-7 text-muted">{p.summary}</p>
            <div className="mt-6 h-px w-full bg-white/10" />
            <p className="mt-4 text-xs tracking-[0.18em] uppercase text-muted">{p.stack}</p>
          </button>
        ))}
      </Marquee>

      <CaseStudyModal
        open={open}
        project={active}
        onClose={() => {
          setOpen(false);
          setActive(null);
        }}
      />
    </>
  );
}
