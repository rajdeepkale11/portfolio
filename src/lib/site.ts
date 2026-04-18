/** Case-study card + modal content for the projects section */
export type ProjectCaseStudy = {
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly summary: string;
  readonly stack: string;
  /** Card preview (16:10 area) */
  readonly thumbGradient: string;
  /** Modal hero strip */
  readonly heroGradient: string;
  readonly problem: string;
  readonly solution: string;
  readonly outcome: string;
  readonly link?: { readonly label: string; readonly href: string };
};

export const site = {
  brand: "Kale Developers",
  tagline: "Full‑stack developer • Web, Mobile & DevOps",
  location: "Remote · Worldwide",
  availability: "Open for freelance & contracts",
  email: "hello@kaledevelopers.dev",
  socials: {
    github: "https://github.com/rajdeepkale11",
    linkedin: "https://www.linkedin.com/in/rajdeepkale11/",
    instagram: "https://www.instagram.com/rajdeepkale11/",
  },
  /** Contact + Google Form wiring (submitted via /api/contact). */
  contact: {
    googleFormEmbedSrc:
      "https://docs.google.com/forms/d/e/1FAIpQLSd2whDfojV7M2IE7EE6vez2j8C1cRFynlbf6DyC2ZnAwqBfXA/viewform?embedded=true",
    googleFormViewUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd2whDfojV7M2IE7EE6vez2j8C1cRFynlbf6DyC2ZnAwqBfXA/viewform",
    /** Path segment after https://docs.google.com/forms (used by API to post responses). */
    googleFormPath: "/d/e/1FAIpQLSd2whDfojV7M2IE7EE6vez2j8C1cRFynlbf6DyC2ZnAwqBfXA",
    googleFormEntries: {
      mobile: "entry.1047711222",
      applicationType: "entry.2144009972",
      shortDescription: "entry.1937506072",
      timeline: "entry.1681867448",
      budget: "entry.729449544",
    },
  },
  cta: {
    primary: { label: "Book a call", href: "#contact" },
    secondary: { label: "View projects", href: "#projects" },
  },
  about: {
    name: "Kale",
    role: "Full‑stack engineer · Kale Developers",
    avatarSrc: "/about/ai-avatar.svg",
    avatarAlt: "Kale's AI avatar, stylized digital persona",
    lede:
      "I design and ship end‑to‑end products — crisp interfaces, solid APIs, and cloud infrastructure you can scale with confidence.",
    paragraphs: [
      "My focus is clarity: readable code, predictable deployments, and UX that feels intentional. I’ve worked across SaaS, dashboards, and mobile surfaces, usually owning features from schema to pixels.",
      "When I’m not building, I’m refining systems — performance budgets, observability, and the small details that keep teams moving fast without breaking production.",
    ] as const,
  },
  projects: [
    {
      id: "pulse-stream",
      title: "PulseStream",
      tagline: "Next.js • Go • Kafka",
      summary:
        "Fleet observability console: live metrics, deploy timelines, and alert routing for multi-region services.",
      stack: "Real-time UI • APIs • Event streaming",
      thumbGradient:
        "radial-gradient(120% 100% at 10% 0%, rgba(124,92,255,0.35), transparent 55%), radial-gradient(100% 80% at 90% 100%, rgba(45,212,191,0.22), transparent 50%), linear-gradient(165deg, rgba(15,18,32,0.95), rgba(8,10,18,0.98))",
      heroGradient:
        "radial-gradient(560px 240px at 22% 18%, rgba(124,92,255,0.35), transparent 58%), radial-gradient(480px 200px at 78% 28%, rgba(45,212,191,0.22), transparent 55%), linear-gradient(185deg, rgba(255,255,255,0.08), rgba(5,6,12,0.92))",
      problem:
        "Ops teams were jumping between three tools for logs, metrics, and deploys — slow incident response and noisy paging.",
      solution:
        "Unified Next.js dashboard with Go ingestion workers, Kafka-backed pipelines, and RBAC. Designed dense-but-readable data views and saved filter sets per team.",
      outcome:
        "Median time-to-triage dropped sharply; on-call load felt lighter because context lived in one surface instead of six browser tabs.",
    },
    {
      id: "orbit-pay",
      title: "OrbitPay Checkout",
      tagline: "Next.js • Stripe • Edge",
      summary:
        "Embeddable checkout for SaaS: tax-aware pricing, trials, and localized payment methods with a tiny JS footprint.",
      stack: "UX • Payments • Edge delivery",
      thumbGradient:
        "radial-gradient(100% 120% at 80% -10%, rgba(251,191,36,0.18), transparent 45%), radial-gradient(90% 90% at 0% 100%, rgba(124,92,255,0.28), transparent 55%), linear-gradient(200deg, rgba(12,14,24,0.96), rgba(6,8,16,1))",
      heroGradient:
        "radial-gradient(520px 220px at 70% 12%, rgba(251,191,36,0.2), transparent 55%), radial-gradient(500px 200px at 20% 70%, rgba(124,92,255,0.28), transparent 58%), linear-gradient(195deg, rgba(255,255,255,0.06), rgba(8,9,18,0.94))",
      problem:
        "Conversion dipped on mobile: the legacy iframe checkout felt slow, failed Lighthouse budgets, and didn’t support modern wallets.",
      solution:
        "Edge-hosted widget bundle, optimistic UI states, Stripe Payment Element, and schema-driven pricing tables synced from the merchant API.",
      outcome:
        "Faster first interactive paint and fewer abandoned carts; support tickets about “payment stuck” basically disappeared.",
    },
    {
      id: "northwind-field",
      title: "Northwind Field",
      tagline: "React Native • GraphQL • Offline",
      summary:
        "Offline-first companion for technicians: work orders, signatures, parts scans, and sync when connectivity returns.",
      stack: "Mobile • Sync • Field UX",
      thumbGradient:
        "radial-gradient(85% 90% at 50% 110%, rgba(45,212,191,0.25), transparent 50%), radial-gradient(70% 70% at 0% 0%, rgba(99,102,241,0.22), transparent 55%), linear-gradient(160deg, rgba(10,12,22,0.98), rgba(5,7,14,1))",
      heroGradient:
        "radial-gradient(480px 200px at 40% 20%, rgba(45,212,191,0.26), transparent 60%), radial-gradient(420px 180px at 85% 75%, rgba(99,102,241,0.22), transparent 55%), linear-gradient(175deg, rgba(255,255,255,0.05), rgba(6,8,16,0.95))",
      problem:
        "Crews lost work in dead zones; duplicate submissions happened when sync retried wrong, and managers lacked a live ops picture.",
      solution:
        "Normalized local store with conflict rules, background sync queue, and GraphQL deltas. Added a supervisor web pulse for fleet status.",
      outcome:
        "Zero lost-ticket reports after ship; crews stopped carrying paper runbooks for routine installs.",
    },
    {
      id: "ledger-lab",
      title: "LedgerLab Trace",
      tagline: "Node • PostgreSQL • Kubernetes",
      summary:
        "Batch-to-web traceability for regulated supply chains: immutable audit trails and exportable compliance packs.",
      stack: "Data model • APIs • Compliance UX",
      thumbGradient:
        "radial-gradient(100% 100% at 100% 0%, rgba(56,189,248,0.18), transparent 48%), radial-gradient(110% 90% at 0% 90%, rgba(124,92,255,0.2), transparent 52%), linear-gradient(210deg, rgba(11,13,22,0.97), rgba(4,6,12,1))",
      heroGradient:
        "radial-gradient(500px 200px at 75% 15%, rgba(56,189,248,0.22), transparent 58%), radial-gradient(460px 200px at 15% 65%, rgba(124,92,255,0.2), transparent 56%), linear-gradient(190deg, rgba(255,255,255,0.05), rgba(7,8,16,0.96))",
      problem:
        "Auditors needed lineage in hours, but spreadsheets and ad-hoc SQL meant days of prep before every review window.",
      solution:
        "Append-only event ledger in Postgres, deterministic projections, Kubernetes workers for heavy exports, and a guided “evidence package” UI.",
      outcome:
        "Audit prep shrank from days to under an hour; customer trust became a sales differentiator instead of a fire drill.",
    },
    {
      id: "aether-docs",
      title: "AetherDocs",
      tagline: "TypeScript • CRDT • WebSockets",
      summary:
        "Low-latency collaborative editor with comments, mentions, and version snapshots for product + eng teams.",
      stack: "Real-time • Editor • Collaboration",
      thumbGradient:
        "radial-gradient(90% 100% at 50% -5%, rgba(244,244,255,0.12), transparent 42%), radial-gradient(100% 80% at 100% 60%, rgba(124,92,255,0.22), transparent 55%), linear-gradient(175deg, rgba(14,16,28,0.96), rgba(6,7,14,1))",
      heroGradient:
        "radial-gradient(520px 220px at 50% 0%, rgba(244,244,255,0.12), transparent 50%), radial-gradient(480px 200px at 10% 80%, rgba(124,92,255,0.24), transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(8,9,18,0.94))",
      problem:
        "Teams outgrew Notion-style blocks for specs: merge conflicts, no offline safety, and comment threads broke under load.",
      solution:
        "CRDT-backed doc model, WebSocket rooms with backoff, snapshotting to object storage, and optimistic UI with clear conflict surfaces.",
      outcome:
        "Sub-100ms perceived typing sync on good networks; writers stayed in flow during week-long design reviews.",
    },
  ] satisfies readonly ProjectCaseStudy[],
} as const;

export type Site = typeof site;
