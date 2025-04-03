"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// スキルデータの型定義
type Skill = {
  name: string
  category: "language" | "framework" | "tool"
  experience: number
  level: "beginner" | "intermediate" | "advanced" | "expert"
  description: string
  projects?: string[]
}

// サンプルスキルデータ - バックエンド開発者向けに更新
const skills: Skill[] = [
  {
    name: "Go",
    category: "language",
    experience: 0.5,
    level: "intermediate",
    description: "High-performance backend development with Go, including web services, APIs, and microservices.",
    projects: ["Aurelia (Job Board)", "BlogAPIGo", "Various microservices"],
  },
  {
    name: "Rust",
    category: "language",
    experience: 0.3,
    level: "beginner",
    description: "Systems programming with Rust for performance-critical applications and tools.",
    projects: ["SaBA (Browser)", "CLI tools", "Performance-critical components"],
  },
  {
    name: "Python",
    category: "language",
    experience: 1.5,
    level: "intermediate",
    description: "Data processing, automation, and backend development with Python.",
    projects: ["claude-deepresearch", "Data Processing Scripts", "API Development"],
  },
  {
    name: "C",
    category: "language",
    experience: 1,
    level: "intermediate",
    description: "Low-level systems programming and compiler development with C.",
    projects: ["C Compiler", "System Utilities", "Performance-critical components"],
  },
  {
    name: "JavaScript",
    category: "language",
    experience: 1,
    level: "intermediate",
    description: "Modern JavaScript for web development and Node.js applications.",
    projects: ["Portfolio Website", "Web Applications", "Node.js Scripts"],
  },
  {
    name: "TypeScript",
    category: "language",
    experience: 0.5,
    level: "beginner",
    description: "Type-safe JavaScript development with interfaces and advanced type features.",
    projects: ["Portfolio Website", "Frontend Components", "Node.js APIs"],
  },
  {
    name: "SQL",
    category: "language",
    experience: 1,
    level: "intermediate",
    description: "Database query optimization, schema design, and complex data operations.",
    projects: ["Aurelia (PostgreSQL)", "BlogAPIGo (MySQL)", "Various data-driven applications"],
  },
  {
    name: "Shell",
    category: "language",
    experience: 0.5,
    level: "beginner",
    description: "Automation, system administration, and DevOps scripting with Bash and other shells.",
    projects: ["Deployment Scripts", "System Administration", "Development Tooling"],
  },
  {
    name: "Docker",
    category: "tool",
    experience: 0.5,
    level: "intermediate",
    description: "Containerization of applications and services for consistent deployment.",
    projects: ["Microservices", "Development Environments", "Deployment Pipelines"],
  },
  {
    name: "PostgreSQL",
    category: "tool",
    experience: 0.5,
    level: "intermediate",
    description: "Advanced database design, optimization, and administration with PostgreSQL.",
    projects: ["Aurelia (Job Board)", "Data-intensive Applications", "Complex Query Optimization"],
  },
  {
    name: "MySQL",
    category: "tool",
    experience: 0.5,
    level: "intermediate",
    description: "Database management, optimization, and scaling with MySQL.",
    projects: ["BlogAPIGo", "Content Management Systems", "Data Storage Solutions"],
  },
  {
    name: "Git",
    category: "tool",
    experience: 2,
    level: "intermediate",
    description: "Version control, branching strategies, and collaborative development workflows.",
    projects: ["All Projects", "Open Source Contributions", "Team Collaboration"],
  },
  {
    name: "Linux",
    category: "tool",
    experience: 1,
    level: "beginner",
    description: "System administration, performance tuning, and development on Linux platforms.",
    projects: ["Server Management", "Development Environment", "Deployment Targets"],
  },
  {
    name: "Echo",
    category: "framework",
    experience: 0.5,
    level: "intermediate",
    description: "High-performance web framework for Go, used for building RESTful APIs and web services.",
    projects: ["Aurelia (Job Board)", "RESTful APIs", "Microservices"],
  },
  {
    name: "Next.js",
    category: "framework",
    experience: 0.5,
    level: "beginner",
    description: "React framework for building server-rendered and static websites.",
    projects: ["Portfolio Website", "Frontend Applications"],
  },
  {
    name: "AWS",
    category: "tool",
    experience: 0.5,
    level: "beginner",
    description: "Cloud infrastructure including EC2, S3, Lambda, and more.",
    projects: ["Serverless Applications", "Web Hosting", "Data Storage Solutions"],
  },
]

export function SkillsGrid() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill)
    setIsDialogOpen(true)
  }

  const getLevelColor = (level: Skill["level"]) => {
    switch (level) {
      case "beginner":
        return "bg-zinc-300 dark:bg-zinc-600"
      case "intermediate":
        return "bg-zinc-400 dark:bg-zinc-500"
      case "advanced":
        return "bg-zinc-600 dark:bg-zinc-400"
      case "expert":
        return "bg-[#ff5722] dark:bg-[#ff5722]"
      default:
        return "bg-zinc-300 dark:bg-zinc-600"
    }
  }

  // カテゴリーごとにスキルをグループ化
  const languages = skills.filter((skill) => skill.category === "language")
  const frameworks = skills.filter((skill) => skill.category === "framework")
  const tools = skills.filter((skill) => skill.category === "tool")

  return (
    <>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-mono font-bold mb-2 text-zinc-900 dark:text-zinc-50">LANGUAGES</h4>
          <div className="flex flex-wrap gap-2">
            {languages.map((skill) => (
              <Badge
                key={skill.name}
                variant="outline"
                className="font-mono text-xs cursor-pointer hover:border-[#ff5722] hover:text-[#ff5722] dark:hover:border-[#ff5722] dark:hover:text-[#ff5722] transition-colors"
                onClick={() => handleSkillClick(skill)}
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-mono font-bold mb-2 text-zinc-900 dark:text-zinc-50">FRAMEWORKS</h4>
          <div className="flex flex-wrap gap-2">
            {frameworks.map((skill) => (
              <Badge
                key={skill.name}
                variant="outline"
                className="font-mono text-xs cursor-pointer hover:border-[#ff5722] hover:text-[#ff5722] dark:hover:border-[#ff5722] dark:hover:text-[#ff5722] transition-colors"
                onClick={() => handleSkillClick(skill)}
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-mono font-bold mb-2 text-zinc-900 dark:text-zinc-50">TOOLS</h4>
          <div className="flex flex-wrap gap-2">
            {tools.map((skill) => (
              <Badge
                key={skill.name}
                variant="outline"
                className="font-mono text-xs cursor-pointer hover:border-[#ff5722] hover:text-[#ff5722] dark:hover:border-[#ff5722] dark:hover:text-[#ff5722] transition-colors"
                onClick={() => handleSkillClick(skill)}
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-lg flex items-center justify-between">
              {selectedSkill?.name}
              <span
                className={`text-xs px-2 py-1 rounded text-white ${getLevelColor(selectedSkill?.level || "beginner")}`}
              >
                {selectedSkill?.level?.toUpperCase()}
              </span>
            </DialogTitle>
            <DialogDescription className="font-mono text-xs">
              {selectedSkill?.experience} years of experience
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono font-bold mb-1 text-zinc-900 dark:text-zinc-50">DESCRIPTION</h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">{selectedSkill?.description}</p>
            </div>
            {selectedSkill?.projects && selectedSkill.projects.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold mb-1 text-zinc-900 dark:text-zinc-50">PROJECTS</h4>
                <ul className="list-disc pl-4">
                  {selectedSkill.projects.map((project, index) => (
                    <li key={index} className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff5722]"
                style={{
                  width:
                    selectedSkill?.level === "beginner"
                      ? "25%"
                      : selectedSkill?.level === "intermediate"
                        ? "50%"
                        : selectedSkill?.level === "advanced"
                          ? "75%"
                          : "100%",
                }}
              ></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
