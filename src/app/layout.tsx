import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { CursorGlow } from "@/components/CursorGlow";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeFxProvider } from "@/components/ThemeFx";
import { CommandPalette } from "@/components/CommandPalette";
import { ScrollChrome } from "@/components/ScrollChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s — ${site.brand}`,
  },
  description: `${site.brand} — ${site.tagline} Portfolio, projects, and contact.`,
  openGraph: {
    title: `${site.brand} — ${site.tagline}`,
    description: `${site.brand} builds modern web apps, mobile experiences, and cloud-forward delivery.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col app-shell">
        <ThemeProvider>
          <ThemeFxProvider>
            <div className="bg-cyber" aria-hidden="true" />
            <div className="snowfall" aria-hidden="true" />
            <div className="noise" aria-hidden="true" />
            <div className="scanline" aria-hidden="true" />
            <div className="vignette" aria-hidden="true" />
            <div className="light-ambient" aria-hidden="true" />
            <CursorGlow />
            <ScrollChrome />
            <CommandPalette />
            {children}
          </ThemeFxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
