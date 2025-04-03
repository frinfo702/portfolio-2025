"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

// プロジェクトデータの型定義
type Project = {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  longDescription: string
  features: string[]
  github?: string
  liveDemo?: string
  year: number
  images?: string[] // 複数の画像を追加
}

// サンプルプロジェクトデータ - バックエンド開発者向けに更新
const projects: Project[] = [
  {
    id: "project-1",
    title: "Aurelia - Job Board",
    description: "A job posting platform built with Go (Echo) and PostgreSQL",
    image: "/project/aurelia-home.png",
    technologies: ["Go", "Echo", "PostgreSQL", "RESTful API", "JWT"],
    longDescription:
      "Aurelia is a comprehensive job board platform that allows companies to post job openings and job seekers to find and apply for positions. Built with Go using the Echo framework and PostgreSQL for data storage, it features a robust backend API with authentication, job search, and application management.",
    features: [
      "User authentication and authorization with JWT",
      "Company and job seeker profiles",
      "Job posting and application management",
      "Advanced search and filtering",
      "Responsive API design",
      "Database optimization for performance",
    ],
    github: "https://github.com/frinfo702/Aurelia",
    year: 2024,
    images: [
      "/project/aurelia-home.png",
      "/placeholder.svg?height=400&width=600&text=Database+Schema",
      "/placeholder.svg?height=400&width=600&text=API+Endpoints",
    ],
  },
  {
    id: "project-2",
    title: "BlogAPIGo",
    description: "A blog API service built with Go and MySQL",
    image: "/placeholder.svg?height=160&width=320&text=BlogAPIGo",
    technologies: ["Go", "MySQL", "RESTful API", "Docker"],
    longDescription:
      "BlogAPIGo is a backend service for blog platforms, providing a complete API for creating, managing, and serving blog content. It uses Go for the backend implementation and MySQL for data storage, with a focus on performance and scalability.",
    features: [
      "Content management API",
      "User authentication and authorization",
      "Comment and interaction system",
      "Category and tag management",
      "Search functionality",
      "Docker containerization for easy deployment",
    ],
    github: "https://github.com/frinfo702/BlogAPIGo",
    year: 2024,
    images: [
      "/placeholder.svg?height=400&width=600&text=API+Structure",
      "/placeholder.svg?height=400&width=600&text=Database+Design",
      "/placeholder.svg?height=400&width=600&text=Performance+Metrics",
    ],
  },
  {
    id: "project-3",
    title: "SaBA Browser",
    description: "A lightweight browser implementation in Rust and Shell",
    image: "/placeholder.svg?height=160&width=320&text=SaBA+Browser",
    technologies: ["Rust", "Shell", "WebKit", "UI Development"],
    longDescription:
      "SaBA is a lightweight browser implementation built with Rust for core functionality and Shell scripts for automation. It focuses on performance and minimalism, providing a streamlined browsing experience without unnecessary features.",
    features: [
      "Lightweight rendering engine",
      "Minimalist user interface",
      "Performance optimization",
      "Cross-platform compatibility",
      "Customizable user experience",
      "Privacy-focused design",
    ],
    github: "https://github.com/frinfo702/SaBA",
    year: 2025,
    images: [
      "/placeholder.svg?height=400&width=600&text=Browser+Interface",
      "/placeholder.svg?height=400&width=600&text=Architecture+Diagram",
      "/placeholder.svg?height=400&width=600&text=Performance+Comparison",
    ],
  },
  {
    id: "project-4",
    title: "Claude Deep Research",
    description: "A research tool using Claude AI for deep information analysis",
    image: "/project/claude-deepresearch-demo.png?height=160&width=320&text=Claude+Deep+Researc",
    technologies: ["Python", "Claude AI", "NLP", "Data Processing"],
    longDescription:
      "Claude Deep Research is a tool that leverages the Claude AI model for in-depth research and information analysis. Built with Python, it processes and analyzes large volumes of text data to extract insights and generate comprehensive research outputs.",
    features: [
      "AI-powered research assistance",
      "Deep text analysis",
      "Information synthesis",
      "Citation and source tracking",
      "Custom research workflows",
      "Export in multiple formats",
    ],
    github: "https://github.com/frinfo702/claude-deepresearch",
    year: 2025,
    images: [
      "/placeholder.svg?height=400&width=600&text=Research+Interface",
      "/placeholder.svg?height=400&width=600&text=Analysis+Pipeline",
      "/placeholder.svg?height=400&width=600&text=Output+Examples",
    ],
  },
  {
    id: "project-5",
    title: "C Compiler",
    description: "A compiler for the C programming language",
    image: "/placeholder.svg?height=160&width=320&text=C+Compiler",
    technologies: ["C", "Compiler Design", "Assembly", "Optimization"],
    longDescription:
      "A custom C compiler implementation that translates C code into assembly language. This project focuses on compiler design principles, optimization techniques, and low-level system interactions.",
    features: [
      "Lexical analysis and parsing",
      "Abstract syntax tree generation",
      "Code optimization",
      "Assembly code generation",
      "Error handling and reporting",
      "Support for C language features",
    ],
    year: 2025,
    images: [
      "/placeholder.svg?height=400&width=600&text=Compiler+Architecture",
      "/placeholder.svg?height=400&width=600&text=Parsing+Process",
      "/placeholder.svg?height=400&width=600&text=Optimization+Examples",
    ],
  },
  {
    id: "project-6",
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and TailwindCSS",
    image: "/placeholder.svg?height=160&width=320&text=Portfolio",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
    longDescription:
      "A personal portfolio website showcasing projects and skills. Built with Next.js and TailwindCSS, it features a clean, minimalist design with responsive layouts and interactive components.",
    features: [
      "Responsive design for all device sizes",
      "Dark and light mode support",
      "Project showcase with detailed information",
      "Skills and experience section",
      "GitHub integration for live stats",
      "Blog section with markdown support",
    ],
    year: 2025,
    images: [
      "/placeholder.svg?height=400&width=600&text=Homepage",
      "/placeholder.svg?height=400&width=600&text=Projects+Gallery",
      "/placeholder.svg?height=400&width=600&text=Dark+Mode+View",
    ],
  },
]

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0) // 画像インデックスをリセット
    setIsDialogOpen(true)
  }

  // 次の画像に進む
  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images!.length)
    }
  }

  // 前の画像に戻る
  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + selectedProject.images!.length) % selectedProject.images!.length,
      )
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:border-[#ff5722] dark:hover:border-[#ff5722] transition-colors cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <div className="h-40 bg-zinc-100 dark:bg-zinc-800 relative">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-mono font-bold mb-1 text-zinc-900 dark:text-zinc-50">{project.title}</h4>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 2).map((tech) => (
                  <Badge
                    key={tech}
                    className="font-mono text-xs bg-[#ff5722] text-white hover:bg-[#ff5722]/90 dark:bg-[#ff5722] dark:text-white"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 2 && (
                  <Badge variant="outline" className="font-mono text-xs">
                    +{project.technologies.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-mono text-lg flex items-center justify-between">
              {selectedProject?.title}
              <span className="text-xs px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono">
                {selectedProject?.year}
              </span>
            </DialogTitle>
            <DialogDescription className="font-mono text-xs">{selectedProject?.description}</DialogDescription>
          </DialogHeader>

          {/* 画像ギャラリー */}
          {selectedProject?.images && selectedProject.images.length > 0 && (
            <div className="mb-4">
              <div className="relative h-64 md:h-80 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                <Image
                  src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />

                {/* 画像ナビゲーションボタン */}
                {selectedProject.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}

                {/* 画像インジケーター */}
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {selectedProject.images.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 w-1.5 rounded-full ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* サムネイルギャラリー */}
              {selectedProject.images.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                  {selectedProject.images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative h-16 w-24 flex-shrink-0 cursor-pointer rounded-sm overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-[#ff5722]"
                          : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono font-bold mb-1 text-zinc-900 dark:text-zinc-50">DESCRIPTION</h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">{selectedProject?.longDescription}</p>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold mb-1 text-zinc-900 dark:text-zinc-50">FEATURES</h4>
              <ul className="list-disc pl-4">
                {selectedProject?.features.map((feature, index) => (
                  <li key={index} className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold mb-1 text-zinc-900 dark:text-zinc-50">TECHNOLOGIES</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="font-mono text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              {selectedProject?.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="font-mono text-xs flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </a>
              )}
              {selectedProject?.liveDemo && (
                <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    className="font-mono text-xs flex items-center gap-1 bg-[#ff5722] hover:bg-[#ff5722]/90 text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
