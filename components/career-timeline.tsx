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
    id: "finatext-intern",
    company: "Finatext Holdings",
    position: "Backend Engineer (Intern)",
    location: "Tokyo, Japan (Remote)",
    startDate: "2025-01",
    endDate: null,
    description:
      "Responsible for developing Public APIs and Admin APIs for analysts within the NISA team for the Smartplus product.",
    achievements: [
      "Gained practical backend development skills through API design and implementation.",
      "Learned the importance of code reviews and documentation in team development.",
      "Gained exposure to infrastructure construction and operation using AWS and MySQL.",
    ],
    technologies: ["Go", "AWS", "MySQL", "API Development"],
    logo: "/finatext-logo.png",
    type: "internship",
    images: [],
  },
  {
    id: "rione-project",
    company: "Ri-one (University Circle)",
    position: "Server Developer",
    location: "University",
    startDate: "2024-04",
    endDate: "2024-06",
    description:
      "Developed a Go server for a university circle project that receives HTTP requests over the network and sends control information to a robot.",
    achievements: [
      "Experienced basic implementation of an HTTP server using Go.",
      "Learned about network communication and data transmission mechanisms.",
      "Experienced a simple team development process through the project.",
    ],
    technologies: ["Go", "HTTP", "Networking"],
    logo: "/placeholder.svg",
    type: "project",
    images: [],
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
                {formatDate(selectedExperience?.startDate || null)} - {formatDate(selectedExperience?.endDate || null)}
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
