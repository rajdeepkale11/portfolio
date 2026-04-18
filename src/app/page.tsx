import { Footer } from "@/components/Footer";
import { GlowButton } from "@/components/GlowButton";
import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import { Section, SectionHeading } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { HeroGlowScope } from "@/components/HeroGlowScope";
import { ProjectMarquee } from "@/components/ProjectMarquee";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col" id="top">
      <Nav />

      <HeroGlowScope>
        <div className="fx-layer" aria-hidden="true">
          <div className="fx-fire" />
          <div className="fx-water" />
          <div className="fx-thunder" />
        </div>

        <Section className="pt-14 pb-16 sm:pt-20">
          <div className="mx-auto w-full max-w-6xl px-5">
            <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal className="flex flex-col gap-6" y={18}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="glass neo-border inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-[color:var(--foreground)]/80">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-zinc-400"
                    style={{ boxShadow: "0 0 14px rgba(200,200,210,0.35)" }}
                  />
                  {site.availability}
                </span>
                <span className="glass inline-flex items-center rounded-full px-4 py-2 text-xs text-muted">
                  {site.location}
                </span>
              </div>

              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[color:var(--foreground)] sm:text-6xl sm:tracking-tight">
                Build products that feel{" "}
                <span
                  className="hero-futuristic bg-gradient-to-r from-white via-[color:var(--foreground)] to-[color:var(--foreground)]/55 bg-clip-text text-transparent"
                  style={{
                    textShadow:
                      "0 0 42px rgba(255,255,255,0.12), 0 0 80px rgba(160,160,175,0.08)",
                  }}
                >
                  futuristic
                </span>
                .
              </h1>

              <p className="text-balance text-base leading-7 text-muted sm:text-lg">
                {site.tagline}. I design, build, deploy, and maintain
                production‑grade apps — fast, secure, and scalable.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <GlowButton href={site.cta.primary.href}>
                  {site.cta.primary.label}
                </GlowButton>
                <GlowButton href={site.cta.secondary.href} variant="secondary">
                  {site.cta.secondary.label}
                </GlowButton>
                <SocialLinks links={site.socials} className="pt-2 sm:pt-0" />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Frontend", v: "React • Next.js • UX" },
                  { k: "Backend", v: "APIs • DB • Auth" },
                  { k: "DevOps", v: "CI/CD • Cloud • Observability" },
                ].map((it) => (
                  <div
                    key={it.k}
                    className="glass neo-border hud-frame rounded-2xl p-4 transition hover:translate-y-[-2px] hover:bg-white/[0.075] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                  >
                    <p className="text-xs tracking-[0.18em] uppercase text-muted">
                      {it.k}
                    </p>
                    <p className="mt-2 text-sm font-medium text-[color:var(--foreground)]/85">
                      {it.v}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative" delay={0.08} y={18}>
                <div className="glass neo-border hud-frame tilt-card relative overflow-hidden rounded-3xl p-6">
                <div
                  aria-hidden="true"
                  className="absolute -left-24 -top-24 h-56 w-56 rounded-full blur-3xl float-slow"
                  style={{ background: "rgba(200,200,210,0.14)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full blur-3xl float-slow-2"
                  style={{ background: "rgba(90,90,98,0.2)" }}
                />

                <p className="text-xs tracking-[0.22em] uppercase text-muted">
                  What I do
                </p>
                <p className="mt-3 text-lg font-semibold text-[color:var(--foreground)]">
                  End‑to‑end delivery
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  From pixel‑perfect UI to resilient infra. You get a clean code
                  base, automated deployments, and a product you can confidently
                  scale.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    "Modern UI + motion that converts",
                    "API + database + authentication",
                    "CI/CD + cloud + monitoring",
                  ].map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: "rgba(124,92,255,0.9)",
                          boxShadow: "0 0 20px rgba(124,92,255,0.35)",
                        }}
                      />
                      <span className="text-sm text-[color:var(--foreground)]/80">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(500px 240px at 30% 20%, rgba(124,92,255,0.22), transparent 60%), radial-gradient(420px 260px at 70% 70%, rgba(45,212,191,0.14), transparent 60%)",
                }}
              />
            </Reveal>
          </div>
            </div>
        </Section>

        <AboutSection />

        <Section id="services" className="py-16">
          <div className="mx-auto w-full max-w-6xl px-5">
            <Reveal y={16}>
              <SectionHeading
                eyebrow="Services"
                title="Everything you need to ship"
                description="Clean architecture, great UX, and production DevOps — delivered as a single, cohesive service."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Web Apps",
                desc: "Marketing sites, dashboards, SaaS platforms, payments, and admin panels.",
              },
              {
                title: "Mobile Apps",
                desc: "Cross‑platform apps, delightful UI, and a release pipeline that won’t break.",
              },
              {
                title: "DevOps & Cloud",
                desc: "Containers, CI/CD, infra automation, monitoring, and performance tuning.",
              },
            ].map((card, idx) => (
              <Reveal key={card.title} delay={0.06 + idx * 0.06} y={16}>
                <div className="glass neo-border hud-frame tilt-card relative rounded-3xl p-6 transition hover:translate-y-[-3px] hover:bg-white/[0.075]">
                  <p className="text-lg font-semibold text-[color:var(--foreground)]">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {card.desc}
                  </p>
                  <div className="mt-6 h-px w-full bg-white/10" />
                  <p className="mt-4 text-xs tracking-[0.18em] uppercase text-muted">
                    Fast • Reliable • Maintainable
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </Section>

        <Section id="skills" className="py-16">
          <div className="mx-auto w-full max-w-6xl px-5">
            <Reveal y={16}>
              <SectionHeading
                eyebrow="Skills"
                title="Tooling that scales with you"
                description="A pragmatic stack — chosen for speed, stability, and long‑term maintainability."
              />
            </Reveal>
          </div>

          <div className="mt-10">
            <Marquee
              speedSeconds={26}
              className="py-2 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
            >
              {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "REST / GraphQL",
              "PostgreSQL",
              "Redis",
              "Docker",
              "CI/CD",
              "AWS / GCP",
              "Nginx",
              "Terraform",
              "Monitoring",
              "Security",
              "Kubernetes",
              "Stripe",
              "WebSockets",
            ].map((s) => (
                <span
                  key={s}
                  className="glass neo-border rounded-full px-4 py-2 text-sm text-[color:var(--foreground)]/80 transition hover:translate-y-[-2px] hover:bg-white/[0.075]"
                >
                  {s}
                </span>
              ))}
            </Marquee>
            <div className="mx-auto w-full max-w-6xl px-5">
              <p className="mt-4 text-sm text-muted">Hover to pause.</p>
            </div>
          </div>
        </Section>

        <Section id="projects" className="py-16">
          <div className="mx-auto w-full max-w-6xl px-5">
            <Reveal y={16}>
              <SectionHeading
                eyebrow="Projects"
                title="Work that speaks for itself"
                description="Selected case studies — swap in your own ships, metrics, and live links in site.projects."
              />
            </Reveal>
          </div>

          <div className="mt-10">
            <ProjectMarquee />
            <div className="mx-auto w-full max-w-6xl px-5">
              <p className="mt-4 text-sm text-muted">Hover to pause.</p>
            </div>
          </div>
        </Section>

        <Section id="contact" className="py-16 pb-24">
          <div className="mx-auto w-full max-w-6xl px-5">
            <Reveal y={16}>
              <SectionHeading
                eyebrow="Contact"
                title="Let’s build something impressive"
                description="Tell me what you’re shipping, your timeline, and your budget range."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <Reveal y={16} delay={0.05}>
              <div className="glass neo-border rounded-3xl p-6">
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                Quick contact
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">
                Email:{" "}
                <a
                  className="focus-ring rounded underline decoration-[color:var(--card-border)] underline-offset-4 hover:decoration-[color:var(--foreground)]/40"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <GlowButton href={`mailto:${site.email}`}>
                  Email me
                </GlowButton>
                <GlowButton href="#services" variant="secondary">
                  See services
                </GlowButton>
                <SocialLinks links={site.socials} className="pt-2 sm:pt-0" />
              </div>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.1}>
              <div className="glass neo-border rounded-3xl p-6">
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                Lead form (placeholder)
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">
                We can connect this to a free form backend (Formspree / Tally /
                Google Forms) later.
              </p>
              <div className="mt-6 grid gap-3">
                {["Name", "Email", "Message"].map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-muted ring-1 ring-white/10"
                  >
                    {label}
                  </div>
                ))}
              </div>
              </div>
            </Reveal>
          </div>
          </div>
        </Section>
      </HeroGlowScope>

      <Footer />
    </div>
  );
}
