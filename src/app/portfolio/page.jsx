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
  SiGit 
} from "react-icons/si";
import { AppContext } from "@/app/providers";

const experience = [
  {
    company: "Zalient",
    role: "Intern",
    period: "August 2025 – Present",
    href: "https://zalient.me/",
    logo: "https://zalient.me/favicon.ico",
  },
];

const projects = [
  {
    name: "OwnTheWeb Blog Platform",
    category: "web",
    blurb: "Full-stack blog platform with rich text editor, authentication, and admin dashboard",
    href: "/",
    year: "2025"
  },
  {
    name: "Solana NFT Marketplace",
    category: "solana", 
    blurb: "Decentralized NFT marketplace built on Solana blockchain with wallet integration",
    href: "#",
    year: "2024"
  },
  {
    name: "AI Content Generator",
    category: "ai",
    blurb: "AI-powered content generation tool with natural language processing capabilities",
    href: "#",
    year: "2024"
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

  const baseClasses = useMemo(
    () => (isDarkMode ? "bg-[#0b0b0b] text-[#f5f5f5]" : "bg-[#f7f5f0] text-[#151515]"),
    [isDarkMode],
  );

  const cardClass = useMemo(
    () => (isDarkMode ? "border-white/10 bg-white/[0.05]" : "border-black/5 bg-white/80"),
    [isDarkMode],
  );

  const headlineAccent = isDarkMode
    ? "bg-gradient-to-r from-white via-white/60 to-white/10"
    : "bg-gradient-to-r from-[#d6c29b] via-[#efddba] to-white";

  const subcopyTint = isDarkMode ? "text-white/60" : "text-[#6b6b6b]";
  const linkAccent = isDarkMode ? "text-white hover:text-gray-200" : "text-[#1f1f1f] hover:text-[#4f3f28]";
  const underlineAccent = isDarkMode ? "decoration-white" : "decoration-[#c9aa72]";
  const chipClass = isDarkMode ? "bg-white/[0.08] text-white/80 border-white/10" : "bg-white text-[#2c2c2c] border-black/5";
  const spinnerClass = isDarkMode ? "border-white/30" : "border-black/30";

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs/view", { method: "GET" });
        const data = await response.json();
        if (!data.error && data.data) {
          const formattedBlogs = data.data.map((blog) => ({
            title: blog.title,
            date: new Date(blog.createdAt).toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "2-digit", 
              day: "2-digit" 
            }),
            href: `/blogs/${blog.slug}`,
          }));
          setBlogPosts(formattedBlogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
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
            className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.35em] backdrop-blur transition-colors duration-300 ${
              isDarkMode ? "border-white/10 bg-black/40 text-white/60" : "border-black/10 bg-white/70 text-black/60"
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

        {/* Hero Section */}
        <section
          className={`relative overflow-hidden rounded-[2.25rem] border px-8 py-10 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.55)] transition-colors duration-300 ${cardClass}`}
        >
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isDarkMode
                ? "bg-gradient-to-br from-white/5 via-transparent to-black/30 opacity-45"
                : "bg-gradient-to-br from-white/70 via-transparent to-white/30 opacity-60"
            }`}
          />
          <div className="relative z-10 space-y-6">
            <p className={`text-base sm:text-lg leading-relaxed ${subcopyTint}`}>
              A backend engineer guided by first-principles thinking and a curiosity for the inner workings of complex systems. I love to research, experiment, and iterate—breaking and building systems to uncover how they work and improve them. I document and share insights to deepen understanding and inspire better solutions.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
              <Link
                href="https://x.com/shumanh_"
                target="_blank"
                rel="noreferrer"
                className={`underline underline-offset-4 transition-colors ${linkAccent} ${underlineAccent}`}
              >
                twitter/x
              </Link>
              <Link
                href="https://github.com/Shumanh"
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
              <Link href="mailto:theshumanhere@gmail.com" className={`underline underline-offset-4 transition-colors ${linkAccent} ${underlineAccent}`}>
                mail
              </Link>
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
                <div
                  key={item.company}
                  className={`flex flex-col gap-3 rounded-2xl border p-5 transition-colors duration-300 md:flex-row md:items-center md:justify-between ${cardClass}`}
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="space-y-1">
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-sm font-medium transition-colors ${linkAccent}`}
                      >
                        {item.company}
                      </Link>
                      <p className={`text-xs ${subcopyTint}`}>{item.role}</p>
                    </div>
                  </div>
                  <span className={`text-xs uppercase tracking-[0.25em] ${subcopyTint}`}>{item.period}</span>
                </div>
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
                      ? isDarkMode
                        ? "bg-white text-black border-white"
                        : "bg-black text-white border-black"
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
                      className={`rounded-2xl border p-5 transition-colors duration-300 ${cardClass}`}
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <Link href={project.href} target="_blank" rel="noreferrer" className={`text-sm font-medium transition-colors ${linkAccent}`}>
                          {project.name} ↗
                        </Link>
                        <span className={`text-[10px] uppercase tracking-[0.3em] ${subcopyTint}`}>{project.year ?? "2025"}</span>
                      </div>
                      <p className={`mt-2 text-xs leading-relaxed ${subcopyTint}`}>{project.blurb}</p>
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
                    style={isDarkMode ? undefined : { boxShadow: "0 12px 24px -18px rgba(0,0,0,0.25)" }}
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
                    <Link href={post.href} className={`text-sm font-medium transition-colors ${linkAccent}`}>
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