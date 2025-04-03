"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Github, Code, BookOpen, User, BarChart2, Briefcase, Linkedin, Twitter, FileText, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GitHubStats } from "@/components/github-stats"
import { SkillsGrid } from "@/components/skills-grid"
import { ProjectsGrid } from "@/components/projects-grid"
import { BlogList } from "@/components/blog-list"
import { CareerTimeline } from "@/components/career-timeline"
import type { BlogPost } from "@/lib/blog"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch("/api/blog")
        if (response.ok) {
          const data = await response.json()
          setBlogPosts(data)
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-zinc-900 flex flex-col items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <header className="p-4 md:p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50">PORTFOLIO</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">BACKEND DEVELOPER // SYSTEMS ENGINEER</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <a href="https://github.com/frinfo702" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-700 dark:text-zinc-300 hover:text-[#ff5722] dark:hover:text-[#ff5722]"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/frinfo702/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-700 dark:text-zinc-300 hover:text-[#ff5722] dark:hover:text-[#ff5722]"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>
            <a href="https://x.com/noe_k_en" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-700 dark:text-zinc-300 hover:text-[#ff5722] dark:hover:text-[#ff5722]"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr]">
          <aside className="p-4 md:p-6 border-r border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-2 border-[#ff5722] dark:border-[#ff5722]">
                <Image src="/profile.png" alt="Profile" width={128} height={128} className="object-cover" />
              </div>
              <h2 className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-50 text-center">
                  KENICIRO
                  (FRINFO702)
                </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">BACKEND DEVELOPER</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("about")}
                className={`flex items-center w-full px-3 py-2 text-left rounded-md font-mono text-xs ${activeTab === "about" ? "bg-[#ff5722] text-white dark:bg-[#ff5722] dark:text-white" : ""}`}
              >
                <User className="h-4 w-4 mr-2" />
                ABOUT
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`flex items-center w-full px-3 py-2 text-left rounded-md font-mono text-xs ${activeTab === "skills" ? "bg-[#ff5722] text-white dark:bg-[#ff5722] dark:text-white" : ""}`}
              >
                <Code className="h-4 w-4 mr-2" />
                SKILLS
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`flex items-center w-full px-3 py-2 text-left rounded-md font-mono text-xs ${activeTab === "experience" ? "bg-[#ff5722] text-white dark:bg-[#ff5722] dark:text-white" : ""}`}
              >
                <Clock className="h-4 w-4 mr-2" />
                EXPERIENCE
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center w-full px-3 py-2 text-left rounded-md font-mono text-xs ${activeTab === "projects" ? "bg-[#ff5722] text-white dark:bg-[#ff5722] dark:text-white" : ""}`}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                PROJECTS
              </button>
              <button
                onClick={() => setActiveTab("blog")}
                className={`flex items-center w-full px-3 py-2 text-left rounded-md font-mono text-xs ${activeTab === "blog" ? "bg-[#ff5722] text-white dark:bg-[#ff5722] dark:text-white" : ""}`}
              >
                <FileText className="h-4 w-4 mr-2" />
                BLOG
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex items-center w-full px-3 py-2 text-left rounded-md font-mono text-xs ${activeTab === "stats" ? "bg-[#ff5722] text-white dark:bg-[#ff5722] dark:text-white" : ""}`}
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                STATS
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`flex items-center w-full px-3 py-2 text-left rounded-md font-mono text-xs ${activeTab === "education" ? "bg-[#ff5722] text-white dark:bg-[#ff5722] dark:text-white" : ""}`}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                EDUCATION
              </button>
            </nav>
          </aside>

          <main className="w-full">
            <div
              className={`p-4 md:p-6 h-[calc(100vh-12rem)] overflow-auto ${activeTab === "about" ? "block" : "hidden"}`}
            >
              <h3 className="text-lg font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">ABOUT</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 font-mono leading-relaxed">
                Welcome to my portfolio. I am a backend developer specializing in Go, Rust, Python, and C. My focus is
                on building robust, efficient, and scalable backend systems and tools. I enjoy tackling complex problems
                and creating solutions that prioritize performance and reliability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <h4 className="text-xs font-mono font-bold mb-2 text-zinc-900 dark:text-zinc-50">LOCATION</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">Osaka, Japan</p>
                </Card>
                <Card className="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <h4 className="text-xs font-mono font-bold mb-2 text-zinc-900 dark:text-zinc-50">EMAIL</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">kenichiro3114@gmail.com</p>
                </Card>
              </div>
            </div>

            <div
              className={`p-4 md:p-6 h-[calc(100vh-12rem)] overflow-auto ${activeTab === "skills" ? "block" : "hidden"}`}
            >
              <h3 className="text-lg font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">SKILLS</h3>
              <SkillsGrid />
            </div>

            <div
              className={`p-4 md:p-6 h-[calc(100vh-12rem)] overflow-auto ${activeTab === "experience" ? "block" : "hidden"}`}
            >
              <h3 className="text-lg font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">EXPERIENCE</h3>
              <CareerTimeline />
            </div>

            <div
              className={`p-4 md:p-6 h-[calc(100vh-12rem)] overflow-auto ${activeTab === "projects" ? "block" : "hidden"}`}
            >
              <h3 className="text-lg font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">PROJECTS</h3>
              <ProjectsGrid />
            </div>

            <div
              className={`p-4 md:p-6 h-[calc(100vh-12rem)] overflow-auto ${activeTab === "blog" ? "block" : "hidden"}`}
            >
              <h3 className="text-lg font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">BLOG</h3>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ff5722]"></div>
                </div>
              ) : (
                <BlogList internalPosts={blogPosts} />
              )}
            </div>

            <div
              className={`p-4 md:p-6 h-[calc(100vh-12rem)] overflow-auto ${activeTab === "stats" ? "block" : "hidden"}`}
            >
              <h3 className="text-lg font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">GITHUB STATS</h3>
              <GitHubStats accentColor="#ff5722" darkAccentColor="#ff5722" />
            </div>

            <div
              className={`p-4 md:p-6 h-[calc(100vh-12rem)] overflow-auto ${activeTab === "education" ? "block" : "hidden"}`}
            >
              <h3 className="text-lg font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">EDUCATION</h3>

              <div className="space-y-4">
                <Card className="p-4 border border-zinc-200 dark:border-zinc-700 hover:border-[#ff5722] dark:hover:border-[#ff5722] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-50">
                      RITSUMEIKAN UNIVERSITY 
                    </h4>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">2023-2027</span>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-1">
                    Bachelor of Science in Computer Science
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    Focused on systems programming and backend development
                  </p>
                </Card>

                <Card className="p-4 border border-zinc-200 dark:border-zinc-700 hover:border-[#ff5722] dark:hover:border-[#ff5722] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-50">
                      ONLINE CERTIFICATIONS
                    </h4>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">2023-Present</span>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-1">
                    Various technical certifications
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    Including Go, Rust, and Systems Architecture
                  </p>
                </Card>
              </div>
            </div>
          </main>
        </div>

        <footer className="p-3 border-t border-zinc-200 dark:border-zinc-700 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            © {new Date().getFullYear()} FRINFO702. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </div>
  )
}
