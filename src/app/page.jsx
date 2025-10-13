"use client";

import { useContext } from "react";
import Link from "next/link";
import { AppContext } from "@/app/providers";

const NAV_LINKS = [
  { href: "/", label: "home" },
  { href: "/blogs/view", label: "blog" },
  { href: "/portfolio", label: "portfolio" },
];

const TIMELINE_ITEMS = [
  {
    title: "Intern @ Zalient",
    timeframe: "Aug 2025 → Present",
    description: "Building AI-first product experiences with a fast-paced infra team.",
  },
  {
    title: "Backend systems in public",
    timeframe: "Daily",
    description: "Share notes, metrics, and ops learnings from real projects on X.",
  },
  {
    title: "Collaborate with me",
    timeframe: "Let’s build",
    description: "Reach out for consulting, prototyping, or scaling your next system.",
  },
];

export default function Home() {
  const { font } = useContext(AppContext);
  return (
    <main className={`min-h-screen bg-[#fef6eb] text-[#1a202c] font-blog ${font}`}>
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 py-12 sm:py-16 space-y-10">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-6 w-16 rounded-full bg-[#2c5282]" />
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1a365d] font-blog">
              Hi, I'm Devsh - Shumhn
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] text-[#2c2c2c]">Systems engineer · builder · writer</p>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#2c2c2c]">
            {NAV_LINKS.map(({ href, label, external }) =>
              external ? (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="hover:text-[#1a365d] transition-colors">
                  {label}
                </a>
              ) : (
                <Link key={label} href={href} className="hover:text-[#1a365d] transition-colors">
                  {label}
                </Link>
              ),
            )}
          </nav>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-[#1a365d] bg-[#c7def5] px-6 sm:px-10 py-10">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#f8cfa2]" />
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-6 max-w-xl">
              <p className="text-base sm:text-lg leading-relaxed text-[#1a202c]">
                I build resilient systems, craft thoughtful interfaces, and document the journey in public.
                Currently at <a href="https://zalient.me/" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-[#1a365d]">Zalient</a>,
                shipping AI-driven experiences from prototype to production.
              </p>

              <ul className="space-y-4">
                {TIMELINE_ITEMS.map((item, idx) => (
                  <li key={idx} className="rounded-2xl border border-[#1a365d] bg-white/80 px-4 py-3 shadow-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-lg font-semibold text-[#1a365d]">{item.title}</h2>
                      <span className="text-xs uppercase tracking-[0.25em] text-[#2c2c2c]">{item.timeframe}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#2d3748] leading-relaxed">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="flex flex-col gap-4">
              <div className="h-24 w-24 rounded-full border-4 border-[#1a365d] bg-[#f8cfa2] text-[#1a365d] flex items-center justify-center text-3xl font-semibold">
                SR
              </div>
              <div className="space-y-2 text-sm">
                <p className="uppercase tracking-[0.3em] text-[#2c2c2c]">Reach me</p>
                <div className="flex flex-col gap-1">
                  <Link href="https://x.com/shumanh_" target="_blank" rel="noreferrer" className="text-[#1a365d] underline underline-offset-4 decoration-[#1a365d] hover:text-[#102a43]">
                    x.com/shumanh_
                  </Link>
                  <Link href="mailto:theshumanhere@gmail.com" className="text-[#1a365d] underline underline-offset-4 decoration-[#1a365d] hover:text-[#102a43]">
                    theshumanhere@gmail.com
                  </Link>
                </div>
              </div>
            </aside>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-2 bg-[#f8cfa2]" />
        </section>
      </div>
    </main>
  );
}

