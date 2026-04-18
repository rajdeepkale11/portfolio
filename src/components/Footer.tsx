import { site } from "@/lib/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-[color:var(--foreground)]">
            {site.brand}
          </p>
          <p className="text-sm text-muted">
            {new Date().getFullYear()} • Built with Next.js
          </p>
        </div>
        <SocialLinks links={site.socials} />
      </div>
    </footer>
  );
}
