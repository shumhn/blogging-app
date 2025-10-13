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
  const { font, isDark, setTheme, resolvedTheme } = useContext(AppContext);
  const isDarkMode = Boolean(isDark);

  const baseClasses = isDarkMode
    ? "bg-[#0c0c0c] text-[#f3f4f6]"
    : "bg-[#f9f7f4] text-[#1b1b1b]";

  const accentSwatch = isDarkMode
    ? "bg-gradient-to-r from-white via-white/60 to-white/20"
    : "bg-gradient-to-r from-[#dfc89f] via-[#f8e9c0] to-white";

  const navLinkClass = isDarkMode
    ? "text-white/50 hover:text-white"
    : "text-[#5f5f5f] hover:text-[#161616]";

  const heroHeadingClass = isDarkMode ? "text-white" : "text-[#161616]";
  const heroSubcopyClass = isDarkMode ? "text-white/50" : "text-[#6f6f6f]";

  const cardBackground = isDarkMode
    ? "bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#050505]"
    : "bg-gradient-to-br from-white via-[#fdfbf6] to-[#f3eee4]";

  const cardOverlay = isDarkMode
    ? "bg-gradient-to-b from-white/5 via-transparent to-black/30"
    : "bg-gradient-to-b from-white/70 via-transparent to-white/30";

  const paragraphClass = isDarkMode ? "text-white/80" : "text-[#2c2c2c]";

  const timelineItemClass = isDarkMode
    ? "border-white/10 bg-white/[0.04]"
    : "border-black/5 bg-white/70";

  const timelineTitleClass = isDarkMode ? "text-white" : "text-[#1d1d1d]";
  const timelineMetaClass = isDarkMode ? "text-white/50" : "text-[#7f7f7f]";
  const timelineBodyClass = isDarkMode ? "text-white/60" : "text-[#4b4b4b]";

  const badgeClass = isDarkMode
    ? "border-white/20 bg-gradient-to-br from-white via-white/65 to-white/30 text-[#0c0c0c]"
    : "border-black/5 bg-gradient-to-br from-white via-[#fdf3dc] to-[#f1e2c3] text-[#1b1b1b]";

  const badgeShadow = isDarkMode
    ? "shadow-[0_18px_35px_-18px_rgba(255,255,255,0.35)]"
    : "shadow-[0_18px_32px_-18px_rgba(214,198,166,0.55)]";

  const reachMeLabelClass = isDarkMode ? "text-white/45" : "text-[#808080]";
  const linkClass = isDarkMode ? "text-white hover:text-gray-200" : "text-[#1f1f1f] hover:text-[#5a4c32]";
  const linkDecoration = isDarkMode ? "decoration-white" : "decoration-[#ccb07c]";

  return (
    <main className={`h-screen overflow-hidden transition-colors duration-300 font-blog ${baseClasses} ${font}`}>
      <div className="mx-auto flex h-full max-w-4xl flex-col gap-8 px-5 sm:px-8 py-12 sm:py-14">
        <div className="flex justify-end flex-shrink-0">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs uppercase tracking-[0.3em] backdrop-blur transition-colors duration-300 ${
              isDarkMode
                ? "border-white/10 bg-black/40 text-white/60"
                : "border-black/10 bg-white/60 text-black/60"
            }`}
          >
            <button
              type="button"
              onClick={() => setTheme?.("light")}
              className={`rounded-full px-3 py-1 transition-colors ${
                resolvedTheme === "light"
                  ? isDarkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDarkMode
                    ? "hover:text-white"
                    : "hover:text-black"
              }`}
            >
              Light
            </button>
            <span className={isDarkMode ? "text-white/30" : "text-black/30"}>/</span>
            <button
              type="button"
              onClick={() => setTheme?.("dark")}
              className={`rounded-full px-3 py-1 transition-colors ${
                resolvedTheme === "dark"
                  ? isDarkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDarkMode
                    ? "hover:text-white"
                    : "hover:text-black"
              }`}
            >
              Dark
            </button>
          </div>
        </div>
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between flex-shrink-0">
          <div className="space-y-2">
            <div className={`h-6 w-20 rounded-full ${accentSwatch}`} />
            <h1 className={`text-4xl sm:text-5xl font-semibold tracking-tight font-blog ${heroHeadingClass}`}>
              Hi, I'm Devsh - Shumhn
            </h1>
            <p className={`text-sm uppercase tracking-[0.3em] ${heroSubcopyClass}`}>
              Systems engineer · builder · writer
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.3em]">
            {NAV_LINKS.map(({ href, label, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`transition-colors ${navLinkClass}`}
                >
                  {label}
                </a>
              ) : (
                <Link key={label} href={href} className={`transition-colors ${navLinkClass}`}>
                  {label}
                </Link>
              ),
            )}
          </nav>
        </header>

        <section
          className={`relative flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 px-6 sm:px-12 py-10 sm:py-12 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.75)] transition-colors duration-300 ${cardBackground}`}
        >
          <div className={`pointer-events-none absolute inset-0 opacity-50 transition-colors duration-300 ${cardOverlay}`} />
          <div className="relative z-10 flex h-full flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="flex h-full flex-col gap-6 md:flex-1 min-h-0">
              <p className={`text-base sm:text-lg leading-relaxed ${paragraphClass}`}>
                I build resilient systems, craft thoughtful interfaces, and document the journey in public.
                Currently at
                <a
                  href="https://zalient.me/"
                  target="_blank"
                  rel="noreferrer"
                  className={`ml-1 underline underline-offset-4 transition-colors ${linkDecoration} ${linkClass}`}
                >
                  Zalient
                </a>
                , shipping AI-driven experiences from prototype to production.
              </p>

              <ul className="flex flex-col gap-4 min-h-0">
                {TIMELINE_ITEMS.map((item, idx) => (
                  <li
                    key={idx}
                    className={`rounded-2xl border backdrop-blur px-5 py-4 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.85)] transition-colors duration-300 ${timelineItemClass}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className={`text-lg font-semibold ${timelineTitleClass}`}>{item.title}</h2>
                      <span className={`text-xs uppercase tracking-[0.25em] ${timelineMetaClass}`}>{item.timeframe}</span>
                    </div>
                    <p className={`mt-2 text-sm leading-relaxed ${timelineBodyClass}`}>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="flex flex-col gap-4 md:w-48 flex-shrink-0">
              <div className={`h-24 w-24 rounded-full border flex items-center justify-center text-3xl font-semibold transition-colors duration-300 ${badgeClass} ${badgeShadow}`}>
                SR
              </div>
              <div className="space-y-2 text-sm">
                <p className={`uppercase tracking-[0.3em] ${reachMeLabelClass}`}>Reach me</p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="https://x.com/shumanh_"
                    target="_blank"
                    rel="noreferrer"
                    className={`underline underline-offset-4 transition-colors ${linkClass} ${linkDecoration}`}
                  >
                    x.com/shumanh_
                  </Link>
                  <Link
                    href="mailto:theshumanhere@gmail.com"
                    className={`underline underline-offset-4 transition-colors ${linkClass} ${linkDecoration}`}
                  >
                    theshumanhere@gmail.com
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

