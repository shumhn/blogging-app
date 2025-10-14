"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from "react";
import { 
  SiJavascript, 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiExpress, 
  SiNodedotjs, 
  SiMongodb, 
  SiGit,
  SiGithub
} from "react-icons/si";
import { AppContext } from "@/app/providers";

const experience = [
  {
    company: "Zalient",
    role: "Backend Software Dev",
    period: "Aug 2025 → Present",
    href: "https://zalient.me/",
    logo: "https://zalient.me/favicon.ico",
  },
];

const projects = [
  {
    name: "Agentic Chat Bot (Aichat)",
    category: "ai",
    blurb: "Node.js CLI chatbot powered by Google's Gemini API with robust error handling and typed UX.",
    href: "https://github.com/Shumanh/Aichat",
    year: "2025",
    deployed: null
  },
  {
    name: "ChainCred",
    category: "solana",
    blurb: "Customer loyalty program on Solana: businesses mint tokenized rewards; customers own and redeem on-chain.",
    href: "https://github.com/Shumanh/ChainCred",
    year: "2025",
    deployed: "https://chain-cred-five.vercel.app/"
  }
];

const skills = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Typescript", icon: SiTypescript, color: "#3178C6" },
  { name: "NextJs", icon: SiNextdotjs, color: "#000000" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Express", icon: SiExpress, color: "#000000" },
  { name: "Nodejs", icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

export default function PortfolioPage() {
  const { isDark, setTheme, resolvedTheme } = useContext(AppContext);
  const isDarkMode = Boolean(isDark);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseClasses = "bg-[#f7f5f0] text-[#151515] dark:bg-[#0b0b0b] dark:text-[#f5f5f5]";

  const cardClass = "border-black/5 bg-white/80 dark:border-white/10 dark:bg-white/[0.05]";

  const headlineAccent = "bg-gradient-to-r from-[#d6c29b] via-[#efddba] to-white dark:from-white dark:via-white/60 dark:to-white/10";

  const subcopyTint = "text-[#6b6b6b] dark:text-white/60";
  const linkAccent = "text-[#1f1f1f] hover:text-[#4f3f28] dark:text-white dark:hover:text-gray-200";
  const underlineAccent = "decoration-[#c9aa72] dark:decoration-white";
  const chipClass = "bg-white text-[#2c2c2c] border-black/5 dark:bg-white/[0.08] dark:text-white/80 dark:border-white/10";
  const spinnerClass = "border-black/30 dark:border-white/30";

  useEffect(() => {
    /**
     * Optimized blog fetching for portfolio page
     * - Uses dedicated list endpoint for better performance
     * - Only fetches essential fields needed for display
     * - Implements error handling and loading states
     */
    async function fetchBlogs() {
      try {
        // Use optimized list endpoint instead of full view endpoint
        const response = await fetch("/api/blogs/list", { 
          method: "GET",
          // Add cache headers for better performance
          headers: {
            'Cache-Control': 'max-age=300', // Cache for 5 minutes
          }
        });
        
        const data = await response.json();
        
        if (!data.error && data.data) {
          // Format blogs for portfolio display with optimized data
          const formattedBlogs = data.data.map((blog) => ({
            title: blog.title,
            date: new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "2-digit", 
              day: "2-digit" 
            }),
            href: blog.href, // Already formatted in the API
            author: blog.author, // Include author for potential display
          }));
          setBlogPosts(formattedBlogs);
        } else {
          console.warn("No blog data received or error in response:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        // Set empty array on error to prevent UI issues
        setBlogPosts([]);
      } finally {
        setBlogsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <main className={`min-h-screen transition-colors duration-300 font-blog ${baseClasses}`}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-14">
        {/* Header Section */}
        <div className="flex items-center justify-between gap-6 pb-2">
          <div className="flex flex-col gap-3">
            <div className={`h-5 w-16 rounded-full ${headlineAccent}`} />
            <Link href="/" className="text-3xl sm:text-4xl font-semibold tracking-tight transition-colors hover:opacity-80">
              Devsh – Shumhn
            </Link>
            <p className={`text-xs uppercase tracking-[0.4em] ${subcopyTint}`}>
              Systems engineer · Builder · <Link href="/blogs/view" className={`transition-colors ${linkAccent}`}>Writer</Link>
            </p>
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.35em] backdrop-blur transition-colors duration-300 border-black/10 bg-white/70 text-black/60 dark:border-white/10 dark:bg-black/40 dark:text-white/60"
          >
            <button
              type="button"
              onClick={() => setTheme?.("light")}
              className={`rounded-full px-3 py-1 transition-colors ${
                mounted && resolvedTheme === "light"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:text-black dark:hover:text-white"
              }`}
            >
              Light
            </button>
            <span className="text-black/30 dark:text-white/30">/</span>
            <button
              type="button"
              onClick={() => setTheme?.("dark")}
              className={`rounded-full px-3 py-1 transition-colors ${
                mounted && resolvedTheme === "dark"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:text-black dark:hover:text-white"
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section
          className={`relative overflow-hidden rounded-[2.25rem] border px-8 py-10 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.55)] transition-colors duration-300 ${cardClass}`}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-br from-white/70 via-transparent to-white/30 opacity-60 dark:from-white/5 dark:via-transparent dark:to-black/30 dark:opacity-45"
          />
          <div className="relative z-10 space-y-6">
            <p className={`text-base sm:text-lg leading-relaxed ${subcopyTint}`}>
              A backend engineer guided by first-principles thinking and a curiosity for the inner workings of complex systems. I love to research, experiment, and iterate—breaking and building systems to uncover how they work and improve them. I document and share insights to deepen understanding and inspire better solutions.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
              <Link
                href="https://x.com/devsh_"
                target="_blank"
                rel="noreferrer"
                className={`underline underline-offset-4 transition-colors ${linkAccent} ${underlineAccent}`}
              >
                twitter/x
              </Link>
              <Link
                href="https://github.com/shumhn"
                target="_blank"
                rel="noreferrer"
                className={`underline underline-offset-4 transition-colors ${linkAccent} ${underlineAccent}`}
              >
                github
              </Link>
              <Link
                href="https://www.linkedin.com/in/sumangiri"
                target="_blank"
                rel="noreferrer"
                className={`underline underline-offset-4 transition-colors ${linkAccent} ${underlineAccent}`}
              >
                linkedin
              </Link>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=theshumanhere@gmail.com&su=Hello%20from%20your%20portfolio"
                target="_blank"
                rel="noreferrer"
                className={`underline underline-offset-4 transition-colors ${linkAccent} ${underlineAccent}`}
              >
                mail
              </a>
            </div>
          </div>

        </section>

        {/* Experience Section */}
        <section
          className={`rounded-[2.25rem] border px-8 py-9 shadow-[0_18px_42px_-20px_rgba(0,0,0,0.45)] transition-colors duration-300 ${cardClass}`}
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-sm uppercase tracking-[0.35em]">Experience</h2>
            <div className="space-y-4">
              {experience.map((item) => (
                <Link
                  key={item.company}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex flex-col gap-3 rounded-2xl border p-5 transition-colors duration-300 md:flex-row md:items-center md:justify-between ${cardClass}`}
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="space-y-1">
                      <span className={`text-base sm:text-lg font-semibold transition-colors ${linkAccent}`}>{item.company}</span>
                      <p className={`text-sm ${subcopyTint}`}>{item.role}</p>
                    </div>
                  </div>
                  <span className={`text-xs uppercase tracking-[0.25em] ${subcopyTint}`}>{item.period}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          className={`rounded-[2.25rem] border px-8 py-9 shadow-[0_18px_42px_-20px_rgba(0,0,0,0.45)] transition-colors duration-300 ${cardClass}`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.35em]">Projects</h2>
              <Link href="/projects" className={`text-xs uppercase tracking-[0.25em] transition-colors ${linkAccent}`}>
                view all ↗
              </Link>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {["all", "web", "solana", "ai"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    selectedCategory === category
                      ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                      : chipClass
                  }`}
                >
                  {category === "all" ? "all projects" : `${category} projects`}
                </button>
              ))}
            </div>

            {projects.length === 0 ? (
              <p className={`text-sm ${subcopyTint}`}>Curating new builds—come back soon.</p>
            ) : (
              <div className="space-y-4">
                {projects
                  .filter((project) => selectedCategory === "all" || project.category === selectedCategory)
                  .map((project) => (
                    <div
                      key={project.name}
                      onClick={() => {
                        const url = project.deployed || project.href;
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }}
                      className={`rounded-2xl border p-5 transition-colors duration-300 cursor-pointer hover:shadow-lg ${cardClass}`}
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <h3 className={`text-base sm:text-lg font-semibold transition-colors ${linkAccent} text-left`}>
                            {project.name} ↗
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.href, '_blank', 'noopener,noreferrer');
                            }}
                            className={`p-1 rounded-full border transition-colors duration-300 hover:scale-110 ${chipClass}`}
                            title="View on GitHub"
                          >
                            <SiGithub className="w-4 h-4" />
                          </button>
                        </div>
                        <span className={`text-xs sm:text-sm uppercase tracking-[0.25em] ${subcopyTint}`}>{project.year ?? "2025"}</span>
                      </div>
                      <p className={`mt-2 text-sm sm:text-base leading-relaxed ${subcopyTint}`}>{project.blurb}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section
          className={`rounded-[2.25rem] border px-8 py-9 shadow-[0_18px_42px_-20px_rgba(0,0,0,0.45)] transition-colors duration-300 ${cardClass}`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-sm uppercase tracking-[0.35em]">Skills & Tools</h2>
              <span className={`text-xs uppercase tracking-[0.3em] ${subcopyTint}`}>shipping across the stack</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <span
                    key={skill.name}
                    className={`flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${chipClass}`}
                    style={{ boxShadow: "0 12px 24px -18px rgba(0,0,0,0.25)" }}
                  >
                    <Icon className="text-sm" style={{ color: skill.color }} />
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section
          className={`rounded-[2.25rem] border px-8 py-9 shadow-[0_18px_42px_-20px_rgba(0,0,0,0.45)] transition-colors duration-300 ${cardClass}`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.35em]">Latest writing</h2>
              <Link href="/blogs/view" className={`text-xs uppercase tracking-[0.25em] transition-colors ${linkAccent}`}>
                all posts ↗
              </Link>
            </div>

            {blogsLoading ? (
              <div className="flex items-center justify-center py-10">
                <div className={`h-10 w-10 animate-spin rounded-full border-b-2 ${spinnerClass}`} />
              </div>
            ) : blogPosts.length === 0 ? (
              <p className={`text-sm ${subcopyTint}`}>No writing live yet. The feed updates soon.</p>
            ) : (
              <div className="space-y-4">
                {blogPosts.slice(0, 4).map((post) => (
                  <div
                    key={post.title}
                    className={`flex flex-col gap-2 rounded-2xl border p-5 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between ${cardClass}`}
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    <Link href={post.href} className={`text-sm sm:text-base font-medium transition-colors ${linkAccent}`}>
                      {post.title} ↗
                    </Link>
                    <span className={`text-xs uppercase tracking-[0.25em] ${subcopyTint}`}>{post.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}