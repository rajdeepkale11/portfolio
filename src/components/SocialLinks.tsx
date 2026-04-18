import Link from "next/link";
import * as React from "react";
import { GithubIcon, InstagramIcon, LinkedInIcon } from "./icons";

type Props = {
  links: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  className?: string;
};

function SocialLink({
  href,
  label,
  children,
}: React.PropsWithChildren<{ href: string; label: string }>) {
  return (
    <Link
      className="focus-ring neo-border inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[color:var(--foreground)]/80 ring-1 ring-white/10 transition hover:bg-white/10"
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </Link>
  );
}

export function SocialLinks({ links, className }: Props) {
  return (
    <div className={["flex items-center gap-3", className ?? ""].join(" ")}>
      {links.github ? (
        <SocialLink href={links.github} label="GitHub">
          <GithubIcon className="h-5 w-5" />
        </SocialLink>
      ) : null}
      {links.linkedin ? (
        <SocialLink href={links.linkedin} label="LinkedIn">
          <LinkedInIcon className="h-5 w-5" />
        </SocialLink>
      ) : null}
      {links.instagram ? (
        <SocialLink href={links.instagram} label="Instagram">
          <InstagramIcon className="h-5 w-5" />
        </SocialLink>
      ) : null}
    </div>
  );
}
