import Link from "next/link";
import { site } from "@/lib/site";

function FuturisticK({ className }: { className?: string }) {
  /* Classic K: full-height stem + both arms from one vertex on the stem (not from the top — that reads as “F”). */
  return (
    <svg
      className={className}
      viewBox="0 0 44 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brand-k-stroke" x1="6" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="0.5" stopColor="#5eead4" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path
        d="M10 5 L10 43 M10 26 L40 7 M10 26 L40 41"
        stroke="url(#brand-k-stroke)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Nav mark: futuristic “K”; full “Kale Developers” expands on K hover (see globals `.brand-kale`). */
export function BrandKaleLink() {
  return (
    <Link
      href="#top"
      aria-label={`${site.brand} — home`}
      className="brand-kale focus-ring inline-flex items-center gap-0 rounded-full px-2.5 py-2 text-sm font-semibold tracking-tight text-[color:var(--foreground)]"
    >
      <span className="brand-kale__k k-mark inline-flex shrink-0 items-center justify-center rounded-lg p-0.5 transition-[transform,filter] duration-300 ease-out hover:scale-[1.03]">
        <FuturisticK className="brand-kale__svg h-8 w-[2.25rem] sm:h-9 sm:w-[2.55rem]" />
      </span>
      <span className="brand-kale__rest text-[color:var(--foreground)]/90" aria-hidden="true">
        ale Developers
      </span>
    </Link>
  );
}
