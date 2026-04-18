import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

export function AboutSection() {
  const { about } = site;

  return (
    <Section id="about" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-5">
        <Reveal y={16}>
          <SectionHeading
            eyebrow="About"
            title={`Hi, I’m ${about.name}`}
            description={about.lede}
          />
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_minmax(280px,460px)] lg:gap-16">
          <Reveal className="order-2 flex flex-col gap-6 lg:order-1" y={18} delay={0.06}>
            <p className="text-sm font-medium tracking-wide text-[color:var(--foreground)]/90">
              {about.role}
            </p>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-pretty text-base leading-8 text-muted sm:text-[17px] sm:leading-8"
              >
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="order-1 lg:order-2" y={18} delay={0.1}>
            <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div className="glass neo-border hud-frame relative overflow-hidden rounded-[2rem] p-1.5 sm:rounded-[2.25rem]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.65rem] bg-black/20 sm:rounded-[2rem]">
                  <Image
                    src={about.avatarSrc}
                    alt={about.avatarAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 460px"
                    priority={false}
                  />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(420px 320px at 40% 30%, rgba(124,92,255,0.22), transparent 65%), radial-gradient(380px 280px at 70% 70%, rgba(45,212,191,0.14), transparent 60%)",
                }}
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
