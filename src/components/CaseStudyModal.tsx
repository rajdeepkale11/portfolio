"use client";

import Link from "next/link";
import * as React from "react";
import type { ProjectCaseStudy } from "@/lib/site";

type Props = {
  open: boolean;
  project: ProjectCaseStudy | null;
  onClose: () => void;
};

export function CaseStudyModal({ open, project, onClose }: Props) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div
      className="cs-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onMouseDown={onClose}
    >
      <div className="cs-modal__panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cs-modal__head">
          <div>
            <p className="cs-modal__eyebrow">Case study</p>
            <p className="cs-modal__title">{project.title}</p>
            <p className="mt-1 text-xs text-muted">{project.tagline}</p>
          </div>
          <button type="button" className="cs-modal__close focus-ring" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="cs-modal__body">
          <div className="cs-modal__hero" style={{ background: project.heroGradient }} />
          <div className="cs-modal__grid">
            <div className="cs-modal__block">
              <p className="cs-modal__label">Problem</p>
              <p className="cs-modal__text">{project.problem}</p>
            </div>
            <div className="cs-modal__block">
              <p className="cs-modal__label">Solution</p>
              <p className="cs-modal__text">{project.solution}</p>
            </div>
            <div className="cs-modal__block">
              <p className="cs-modal__label">Outcome</p>
              <p className="cs-modal__text">{project.outcome}</p>
            </div>
          </div>
          {project.link ? (
            <div className="flex flex-wrap justify-end gap-3 pt-1">
              <Link
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--foreground)]/90 ring-1 ring-white/15 transition hover:bg-white/15"
              >
                {project.link.label}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
