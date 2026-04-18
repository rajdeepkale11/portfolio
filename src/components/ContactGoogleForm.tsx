"use client";

import * as React from "react";
import { site } from "@/lib/site";

const inputClass =
  "w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-[color:var(--foreground)] ring-1 ring-white/10 placeholder:text-muted outline-none transition focus:ring-2 focus:ring-[color:var(--ring)] light:bg-black/[0.04] light:ring-black/10";

const labelClass = "text-xs font-medium tracking-wide text-muted";

type Status = { kind: "idle" } | { kind: "loading" } | { kind: "ok" } | { kind: "err"; message: string };

export function ContactGoogleForm() {
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [applicationType, setApplicationType] = React.useState<"Website" | "Mobile App" | "Other">("Website");
  const [applicationOther, setApplicationOther] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [timeline, setTimeline] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          mobile,
          applicationType,
          applicationOther: applicationType === "Other" ? applicationOther : "",
          description,
          timeline,
          budget,
          _company: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus({ kind: "err", message: data.error || "Something went wrong." });
        return;
      }
      setStatus({ kind: "ok" });
      setEmail("");
      setMobile("");
      setApplicationType("Website");
      setApplicationOther("");
      setDescription("");
      setTimeline("");
      setBudget("");
      setHoneypot("");
    } catch {
      setStatus({ kind: "err", message: "Network error. Try again in a moment." });
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(420px 220px at 20% 0%, rgba(124,92,255,0.12), transparent 55%), radial-gradient(380px 200px at 95% 40%, rgba(45,212,191,0.1), transparent 50%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 40%)",
        }}
      />
      <div className="relative rounded-2xl border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md light:border-black/10 light:bg-white/50">
        <p className="text-xs tracking-[0.18em] uppercase text-muted">Same form as Google</p>
        <p className="mt-1 text-sm text-[color:var(--foreground)]/90">
          Responses are delivered to your Google Form — styled to match this site.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-1.5">
            <span className={labelClass}>Email *</span>
            <input
              className={inputClass}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </label>

          <label className="grid gap-1.5">
            <span className={labelClass}>Mobile number *</span>
            <input
              className={inputClass}
              type="tel"
              name="mobile"
              autoComplete="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+91 …"
            />
          </label>

          <label className="grid gap-1.5">
            <span className={labelClass}>Application type *</span>
            <select
              className={inputClass}
              value={applicationType}
              onChange={(e) =>
                setApplicationType(e.target.value as "Website" | "Mobile App" | "Other")
              }
            >
              <option value="Website">Website</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Other">Other</option>
            </select>
          </label>

          {applicationType === "Other" ? (
            <label className="grid gap-1.5">
              <span className={labelClass}>Describe other *</span>
              <input
                className={inputClass}
                value={applicationOther}
                onChange={(e) => setApplicationOther(e.target.value)}
                placeholder="e.g. API platform + admin dashboard"
              />
            </label>
          ) : null}

          <label className="grid gap-1.5">
            <span className={labelClass}>Short description of the project *</span>
            <textarea
              className={`${inputClass} min-h-[120px] resize-y`}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Goals, users, integrations, constraints…"
            />
          </label>

          <label className="grid gap-1.5">
            <span className={labelClass}>Expected completion *</span>
            <select className={inputClass} required value={timeline} onChange={(e) => setTimeline(e.target.value)}>
              <option value="" disabled>
                Select timeline
              </option>
              <option value="1 Week">1 Week</option>
              <option value="2 Weeks">2 Weeks</option>
              <option value="1 Month">1 Month</option>
              <option value="More Than 1 Month">More Than 1 Month</option>
            </select>
          </label>

          <label className="grid gap-1.5">
            <span className={labelClass}>Initial budget (INR) *</span>
            <input
              className={inputClass}
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 150000"
            />
          </label>

          {/* Honeypot — leave hidden; bots often fill visible-only CSS-hidden fields */}
          <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Company
              <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>

          {status.kind === "ok" ? (
            <p className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 light:text-emerald-900">
              Thanks — your response was sent. Check the Google Form responses tab to confirm.
            </p>
          ) : null}
          {status.kind === "err" ? (
            <p className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200 light:text-rose-900">
              {status.message}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status.kind === "loading"}
              className="focus-ring inline-flex min-h-[44px] items-center justify-center rounded-full bg-white/90 px-6 py-2.5 text-sm font-semibold text-black transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 light:bg-black/90 light:text-white light:enabled:hover:bg-black"
            >
              {status.kind === "loading" ? "Sending…" : "Submit inquiry"}
            </button>
            <a
              href={site.contact.googleFormViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-center text-xs text-muted underline decoration-[color:var(--card-border)] underline-offset-4 hover:decoration-[color:var(--foreground)]/40 sm:text-left"
            >
              Open original Google Form
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
