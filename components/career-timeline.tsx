"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Briefcase,
  Calendar,
  MapPin,
  GraduationCap,
  Code,
  Coffee,
  Heart,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// 職歴データの型定義
type Experience = {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
  type: "work" | "education" | "internship" | "volunteer" | "freelance" | "project"
  images?: string[] // 画像の配列を追加
}

// サンプルの職歴データ
const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Tech Innovations Inc.",
    position: "Senior Frontend Developer",
    location: "Tokyo, Japan",
    startDate: "2022-03",
    endDate: null, // null は現在も継続中を意味する
    description:
      "Leading the frontend development team in building modern web applications using React and Next.js. Responsible for architecture decisions and implementing best practices.",
    achievements: [
      "Reduced page load time by 40% through code optimization and lazy loading strategies",
      "Implemented a component library used across 5 different projects",
      "Mentored 3 junior developers who are now mid-level contributors",
      "Led the migration from Create React App to Next.js, improving SEO and performance",
    ],
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "GraphQL"],
    logo: "/placeholder.svg?height=48&width=48",
    type: "work",
    images: [
      "/placeholder.svg?height=400&width=600&text=Team+Meeting",
      "/placeholder.svg?height=400&width=600&text=Product+Demo",
      "/placeholder.svg?height=400&width=600&text=Code+Review+Session",
    ],
  },
  {
    id: "exp-2",
    company: "Digital Solutions Co.",
    position: "Frontend Developer",
    location: "Osaka, Japan",
    startDate: "2020-06",
    endDate: "2022-02",
    description:
      "Worked on multiple client projects developing responsive web applications. Collaborated with designers and backend developers to implement features and ensure consistent user experience.",
    achievements: [
      "Developed a dashboard application that increased client productivity by 25%",
      "Implemented automated testing that caught 30% more bugs before production",
      "Contributed to the company's internal design system",
      "Optimized rendering performance in a data-heavy application",
    ],
    technologies: ["React", "JavaScript", "SCSS", "Redux", "Jest"],
    logo: "/placeholder.svg?height=48&width=48",
    type: "work",
    images: [
      "/placeholder.svg?height=400&width=600&text=Dashboard+Project",
      "/placeholder.svg?height=400&width=600&text=Client+Meeting",
    ],
  },
  {
    id: "exp-3",
    company: "Creative Web Agency",
    position: "Junior Web Developer",
    location: "Kyoto, Japan",
    startDate: "2018-09",
    endDate: "2020-05",
    description:
      "Started as an intern and grew into a full-time role. Worked on various client websites and e-commerce platforms, focusing on frontend development and responsive design.",
    achievements: [
      "Developed 15+ client websites from design to deployment",
      "Implemented responsive designs that improved mobile conversion rates by 20%",
      "Created custom WordPress themes and plugins for clients",
      "Assisted in transitioning the team from jQuery to modern JavaScript frameworks",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress", "PHP"],
    logo: "/placeholder.svg?height=48&width=48",
    type: "internship",
    images: [
      "/placeholder.svg?height=400&width=600&text=Office+Space",
      "/placeholder.svg?height=400&width=600&text=Team+Photo",
      "/placeholder.svg?height=400&width=600&text=Client+Website+Screenshot",
    ],
  },
  {
    id: "exp-4",
    company: "University of Technology",
    position: "Computer Science Student",
    location: "Tokyo, Japan",
    startDate: "2014-04",
    endDate: "2018-03",
    description:
      "Studied Computer Science with a focus on web technologies and software development. Participated in various coding competitions and hackathons.",
    achievements: [
      "Graduated with honors (GPA 3.8/4.0)",
      "Won 2nd place in the annual coding competition",
      "Completed a thesis on 'Optimizing Frontend Performance in Single Page Applications'",
      "Served as a teaching assistant for Introduction to Web Development",
    ],
    technologies: ["Java", "Python", "C++", "Data Structures", "Algorithms", "Web Development"],
    logo: "/placeholder.svg?height=48&width=48",
    type: "education",
    images: [
      "/placeholder.svg?height=400&width=600&text=Graduation+Ceremony",
      "/placeholder.svg?height=400&width=600&text=Campus+View",
      "/placeholder.svg?height=400&width=600&text=Hackathon+Event",
      "/placeholder.svg?height=400&width=600&text=Computer+Lab",
    ],
  },
  {
    id: "exp-5",
    company: "Open Source Community",
    position: "Contributor",
    location: "Remote",
    startDate: "2019-01",
    endDate: "2021-12",
    description:
      "Contributed to various open source projects in my free time, focusing on frontend libraries and developer tools.",
    achievements: [
      "Created and maintained a popular React component library with 500+ stars on GitHub",
      "Fixed critical bugs in several widely-used open source projects",
      "Improved documentation and examples for beginners",
      "Participated in code reviews and mentored new contributors",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "Git", "GitHub Actions"],
    logo: "/placeholder.svg?height=48&width=48",
    type: "volunteer",
    images: [
      "/placeholder.svg?height=400&width=600&text=GitHub+Contributions",
      "/placeholder.svg?height=400&width=600&text=Component+Library+Demo",
    ],
  },
  {
    id: "exp-6",
    company: "Self-employed",
    position: "Freelance Web Developer",
    location: "Remote",
    startDate: "2017-06",
    endDate: "2018-08",
    description: "Worked as a freelance web developer for various clients, building websites and web applications.",
    achievements: [
      "Completed 20+ projects for clients across different industries",
      "Maintained long-term relationships with 5 recurring clients",
      "Developed a custom CMS for a small business that reduced their content update time by 70%",
      "Implemented SEO best practices that improved client search rankings",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP", "SEO"],
    logo: "/placeholder.svg?height=48&width=48",
    type: "freelance",
    images: [
      "/placeholder.svg?height=400&width=600&text=Client+Project+1",
      "/placeholder.svg?height=400&width=600&text=Client+Project+2",
      "/placeholder.svg?height=400&width=600&text=Home+Office+Setup",
    ],
  },
  {
    id: "exp-7",
    company: "Personal Project",
    position: "Lead Developer",
    location: "Remote",
    startDate: "2021-03",
    endDate: "2021-09",
    description: "Developed a personal project, a productivity app for developers to track their time and tasks.",
    achievements: [
      "Built and launched a full-stack application from concept to deployment",
      "Acquired 500+ users in the first month without marketing budget",
      "Implemented user feedback system that guided feature development",
      "Optimized performance for mobile devices",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "PWA", "Firebase"],
    logo: "/placeholder.svg?height=48&width=48",
    type: "project",
    images: [
      "/placeholder.svg?height=400&width=600&text=App+Screenshot+1",
      "/placeholder.svg?height=400&width=600&text=App+Screenshot+2",
      "/placeholder.svg?height=400&width=600&text=User+Dashboard",
      "/placeholder.svg?height=400&width=600&text=Mobile+View",
    ],
  },
]

export function CareerTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience)
    setCurrentImageIndex(0) // 画像インデックスをリセット
    setIsDialogOpen(true)
  }

  // 日付をフォーマットする関数
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  // 経験タイプに基づいてアイコンを取得する関数
  const getIconForExperienceType = (type: Experience["type"]) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-4 w-4 text-[#ff5722] dark:text-[#ff5722]" />
      case "education":
        return <GraduationCap className="h-4 w-4 text-[#ff5722] dark:text-[#ff5722]" />
      case "internship":
        return <Coffee className="h-4 w-4 text-[#ff5722] dark:text-[#ff5722]" />
      case "volunteer":
        return <Heart className="h-4 w-4 text-[#ff5722] dark:text-[#ff5722]" />
      case "freelance":
        return <Globe className="h-4 w-4 text-[#ff5722] dark:text-[#ff5722]" />
      case "project":
        return <Code className="h-4 w-4 text-[#ff5722] dark:text-[#ff5722]" />
      default:
        return <Briefcase className="h-4 w-4 text-[#ff5722] dark:text-[#ff5722]" />
    }
  }

  // 経験タイプに基づいてラベルを取得する関数
  const getLabelForExperienceType = (type: Experience["type"]) => {
    switch (type) {
      case "work":
        return "Work"
      case "education":
        return "Education"
      case "internship":
        return "Internship"
      case "volunteer":
        return "Volunteer"
      case "freelance":
        return "Freelance"
      case "project":
        return "Project"
      default:
        return "Experience"
    }
  }

  // 次の画像に進む
  const nextImage = () => {
    if (selectedExperience?.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedExperience.images!.length)
    }
  }

  // 前の画像に戻る
  const prevImage = () => {
    if (selectedExperience?.images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + selectedExperience.images!.length) % selectedExperience.images!.length,
      )
    }
  }

  return (
    <>
      <div className="relative space-y-8 before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-700 ml-4">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="relative pl-8">
            <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 z-10">
              {getIconForExperienceType(experience.type)}
            </div>

            <Card
              className="overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:border-[#ff5722] dark:hover:border-[#ff5722] transition-colors cursor-pointer"
              onClick={() => handleExperienceClick(experience)}
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h4 className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-50">
                      {experience.position}
                    </h4>
                    <Badge
                      variant="outline"
                      className="ml-2 font-mono text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {getLabelForExperienceType(experience.type)}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 mr-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center">
                    {experience.logo ? (
                      <img
                        src={experience.logo || "/placeholder.svg"}
                        alt={experience.company}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-mono">{experience.company.charAt(0)}</span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 font-mono">
                    {experience.company}
                  </span>
                  <div className="flex items-center ml-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <MapPin className="h-3 w-3 mr-1" />
                    {experience.location}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono line-clamp-2 mb-3">
                  {experience.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="font-mono text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {experience.technologies.length > 3 && (
                    <Badge variant="outline" className="font-mono text-xs">
                      +{experience.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle className="font-mono text-lg flex items-center justify-between">
                {selectedExperience?.position}
              </DialogTitle>
              <Badge
                variant="outline"
                className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              >
                {selectedExperience && getLabelForExperienceType(selectedExperience.type)}
              </Badge>
            </div>
            <DialogDescription className="font-mono text-xs flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium">{selectedExperience?.company}</span>
                <span className="mx-2">•</span>
                <span>{selectedExperience?.location}</span>
              </div>
              <Badge
                variant="outline"
                className="font-mono text-xs bg-[#ff5722] text-white hover:bg-[#ff5722]/90 dark:bg-[#ff5722] dark:text-white"
              >
                {formatDate(selectedExperience?.startDate)} - {formatDate(selectedExperience?.endDate)}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          {/* 画像ギャラリー */}
          {selectedExperience?.images && selectedExperience.images.length > 0 && (
            <div className="mb-4">
              <div className="relative h-64 md:h-80 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                <Image
                  src={selectedExperience.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${selectedExperience.company} image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />

                {/* 画像ナビゲーションボタン */}
                {selectedExperience.images.length > 1 && (
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
                {selectedExperience.images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {selectedExperience.images.map((_, index) => (
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
              {selectedExperience.images.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                  {selectedExperience.images.map((image, index) => (
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
              <p className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">{selectedExperience?.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold mb-1 text-zinc-900 dark:text-zinc-50">KEY ACHIEVEMENTS</h4>
              <ul className="list-disc pl-4">
                {selectedExperience?.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm text-zinc-700 dark:text-zinc-300 font-mono mb-1">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold mb-1 text-zinc-900 dark:text-zinc-50">TECHNOLOGIES</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExperience?.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="font-mono text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

