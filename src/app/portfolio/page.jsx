"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const experience = [
  {
    company: "OWASP Foundation",
    role: "Contributor under Google Summer of Code",
    period: "June 2025 – Present",
    href: "https://owasp.org/",
  },
  {
    company: "DotPro Labs",
    role: "Software Engineer Intern",
    period: "December 2024 – February 2025",
    href: "https://dotprolabs.com/",
  },
];

const projects = [
  { name: "syntax-snipp", blurb: "Manage your code snippets.", categories: ["All", "Web", "AI", "Fun"], href: "https://github.com/Shumanh/syntax-snipp" },
  { name: "Finvest Analysis", blurb: "Get investment insights with AI agent.", href: "https://github.com/Shumanh/finvest" },
  { name: "Skill Master content", blurb: "Learn to grow your social media.", href: "https://github.com/Shumanh/skill-master" },
  { name: "Deblomassi", blurb: "Fast commerce for digital businesses.", href: "https://github.com/Shumanh/deblomassi" },
  { name: "Get paid to cheat", blurb: "Get rewards by showcasing cheats.", href: "https://github.com/Shumanh/get-paid-to-cheat" },
  { name: "Talk to doc (RAG)", blurb: "RAG implementation using local models.", href: "https://github.com/Shumanh/talk-to-doc" },
  { name: "Customer support Agent", blurb: "AI agent to handle customer queries.", href: "https://github.com/Shumanh/customer-support-agent" },
  { name: "Type Trek", blurb: "Check your typing speed.", href: "https://github.com/Shumanh/typetrek" },
];

const skills = [
  "JavaScript",
  "Typescript",
  "React",
  "NextJs",
  "Express",
  "Nodejs",
  "Python",
  "Langchain",
  "Langgraph",
  "Postgres",
  "Prisma",
  "C",
  "Docker",
  "Kubernetes",
  "AWS",
  "Git",
];

export default function PortfolioPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs/view", { method: "GET" });
        const data = await response.json();
        if (!data.error && data.data) {
          // Map the blog data to match the expected format
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
    <main className="font-monoUi bg-white text-gray-900">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-0 py-12 sm:py-16 space-y-10">
        <header className="flex items-center justify-between">
          <nav className="flex items-center gap-6 text-sm sm:text-base">
            <Link href="/blogs/view" className="portfolio-link">Blogs</Link>
            <span className="text-gray-400">//</span>
            <Link href="/projects" className="portfolio-link">Projects</Link>
          </nav>
          <button className="border border-[color:var(--portfolio-border)] px-4 py-1 font-monoUi text-sm hover:bg-gray-100 transition-colors">
            Book a Call
          </button>
        </header>

        <section className="portfolio-section px-4 md:px-8 py-6 md:py-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex flex-col gap-4">
              <h2 className="portfolio-heading">About</h2>
              <h1 className="portfolio-subheading">Sumangiri R</h1>
              <div className="portfolio-text space-y-2">
                <p>&gt; Engineer, with a passion to convert ideas into code</p>
                <p>&gt; I trade comfort zone for bugs</p>
                <p>&gt; currently building AI agents</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="https://x.com/shumanh_" target="_blank" rel="noreferrer" className="portfolio-link">
                  twitter/x
                </Link>
                <Link href="https://github.com/Shumanh" target="_blank" rel="noreferrer" className="portfolio-link">
                  github
                </Link>
                <Link href="https://www.linkedin.com/in/sumangiri" target="_blank" rel="noreferrer" className="portfolio-link">
                  linkedIn
                </Link>
                <Link href="mailto:theshumanhere@gmail.com" className="portfolio-link">
                  mail
                </Link>
              </div>
            </div>
            <div className="mx-auto md:mx-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--portfolio-border)] bg-[color:var(--portfolio-blue)] text-white text-2xl font-semibold sm:h-24 sm:w-24 lg:h-[100px] lg:w-[100px]">
                SR
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-section px-4 md:px-10 py-6 md:py-10">
          <h2 className="portfolio-heading mb-6">Experience</h2>
          <div className="space-y-5">
            {experience.map((item) => (
              <div key={item.company} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--portfolio-border)] text-sm">◎</span>
                  <div>
                    <Link href={item.href} target="_blank" rel="noreferrer" className="portfolio-link text-base md:text-lg">
                      {item.company}
                    </Link>
                    <p className="portfolio-text text-xs md:text-sm">{item.role}</p>
                  </div>
                </div>
                <span className="portfolio-text text-xs md:text-sm text-gray-600">{item.period}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio-section px-4 md:px-10 py-6 md:py-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="portfolio-heading">Projects</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {['All projects', 'Web projects', 'AI projects', 'Fun projects'].map((label) => (
                <span key={label} className="portfolio-tag">{label}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {projects.map((project) => (
              <div key={project.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-dashed border-[color:var(--portfolio-border)] pb-3">
                <Link href={project.href} target="_blank" rel="noreferrer" className="portfolio-link text-base md:text-lg">
                  {project.name} ↗
                </Link>
                <p className="portfolio-text text-xs md:text-sm text-gray-600 sm:text-right">{project.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio-section px-4 md:px-10 py-6 md:py-10 space-y-5">
          <h2 className="portfolio-heading">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skills.map((skill) => (
              <span key={skill} className="portfolio-tag justify-center text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="portfolio-section px-4 md:px-10 py-6 md:py-10 space-y-5">
          <h2 className="portfolio-heading">Blogs</h2>
          {blogsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : blogPosts.length === 0 ? (
            <p className="portfolio-text text-gray-600">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid gap-3">
              {blogPosts.map((post) => (
                <div key={post.title} className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <Link href={post.href} className="portfolio-link text-base md:text-lg">
                    {post.title} ↗
                  </Link>
                  <span className="portfolio-text text-xs md:text-sm text-gray-600">{post.date}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}


