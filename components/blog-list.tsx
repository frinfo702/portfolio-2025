"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { BlogPost } from "@/lib/blog"

// 外部ブログリンクの型定義
type ExternalBlogPost = {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  type: "external"
  url: string
  favicon?: string
  siteName?: string
}

// 表示用のブログ記事型
type DisplayBlogPost = (BlogPost & { type: "internal" }) | ExternalBlogPost

// 外部ブログリンクのサンプルデータ
const externalBlogLinks: ExternalBlogPost[] = [
  {
    id: "external-1",
    title: "Modern JavaScript Explained For Dinosaurs",
    excerpt: "An overview of the modern JavaScript ecosystem and how it all fits together.",
    date: "2023-01-15",
    readTime: "12 min read",
    tags: ["JavaScript", "Web Development", "Tutorial"],
    type: "external",
    url: "https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70",
    siteName: "Medium",
    favicon: "https://medium.com/favicon.ico",
  },
  {
    id: "external-2",
    title: "Understanding TypeScript's Utility Types",
    excerpt: "A deep dive into TypeScript's built-in utility types and how to use them effectively in your projects.",
    date: "2022-12-05",
    readTime: "9 min read",
    tags: ["TypeScript", "Programming", "Tutorial"],
    type: "external",
    url: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
    siteName: "TypeScript",
    favicon: "https://www.typescriptlang.org/favicon-32x32.png",
  },
  {
    id: "external-3",
    title: "How to Build a CLI with Node.js",
    excerpt: "Learn how to create command-line interfaces with Node.js for automation and developer tools.",
    date: "2023-05-20",
    readTime: "7 min read",
    tags: ["Node.js", "CLI", "JavaScript"],
    type: "external",
    url: "https://zenn.dev/erukiti/articles/2503-cline-express",
    siteName: "Zenn",
    favicon: "https://zenn.dev/favicon.ico",
  },
]

interface BlogListProps {
  internalPosts: BlogPost[]
}

export function BlogList({ internalPosts }: BlogListProps) {
  // 内部ブログ記事を型変換
  const internalBlogPosts: DisplayBlogPost[] = internalPosts.map((post) => ({
    ...post,
    type: "internal" as const,
  }))

  // すべてのブログ記事を結合して日付順にソート
  const allBlogPosts = [...internalBlogPosts, ...externalBlogLinks].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const [posts, setPosts] = useState<DisplayBlogPost[]>(allBlogPosts)
  const [activeFilter, setActiveFilter] = useState<"all" | "internal" | "external">("all")
  const [metadataLoaded, setMetadataLoaded] = useState<Record<string, boolean>>({})

  // フィルター機能
  const filterPosts = (filter: "all" | "internal" | "external") => {
    setActiveFilter(filter)
    if (filter === "all") {
      setPosts(allBlogPosts)
    } else {
      setPosts(allBlogPosts.filter((post) => post.type === filter))
    }
  }

  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="space-y-6">
      {/* フィルターボタン */}
      <div className="flex space-x-2 mb-4">
        <Badge
          variant={activeFilter === "all" ? "default" : "outline"}
          className={`cursor-pointer font-mono text-xs ${activeFilter === "all" ? "bg-[#ff5722] hover:bg-[#ff5722]/90" : "hover:border-[#ff5722] hover:text-[#ff5722]"}`}
          onClick={() => filterPosts("all")}
        >
          ALL
        </Badge>
        <Badge
          variant={activeFilter === "internal" ? "default" : "outline"}
          className={`cursor-pointer font-mono text-xs ${activeFilter === "internal" ? "bg-[#ff5722] hover:bg-[#ff5722]/90" : "hover:border-[#ff5722] hover:text-[#ff5722]"}`}
          onClick={() => filterPosts("internal")}
        >
          INTERNAL
        </Badge>
        <Badge
          variant={activeFilter === "external" ? "default" : "outline"}
          className={`cursor-pointer font-mono text-xs ${activeFilter === "external" ? "bg-[#ff5722] hover:bg-[#ff5722]/90" : "hover:border-[#ff5722] hover:text-[#ff5722]"}`}
          onClick={() => filterPosts("external")}
        >
          EXTERNAL
        </Badge>
      </div>

      {/* ブログ記事リスト */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center py-10 text-zinc-500 dark:text-zinc-400 font-mono">
            No blog posts found for this filter.
          </p>
        ) : (
          posts.map((post) => (
            <Card
              key={post.type === "internal" ? post.slug : post.id}
              className="overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:border-[#ff5722] dark:hover:border-[#ff5722] transition-colors"
            >
              {post.type === "internal" ? (
                // 内部ブログ記事
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
                    {post.coverImage && (
                      <div className="h-40 md:h-full bg-zinc-100 dark:bg-zinc-800 relative">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          INTERNAL
                        </Badge>
                        <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.date)}
                        </div>
                        <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <h4 className="text-sm font-mono font-bold mb-2 text-zinc-900 dark:text-zinc-50">{post.title}</h4>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-mono text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                // 外部ブログリンク
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-mono text-xs flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        EXTERNAL
                      </Badge>
                      <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      {post.favicon ? (
                        <div className="flex-shrink-0 w-6 h-6 rounded overflow-hidden">
                          <Image
                            src={post.favicon || "/placeholder.svg"}
                            alt={post.siteName || ""}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <Skeleton className="w-6 h-6 rounded" />
                      )}

                      <div className="flex-1">
                        <h4 className="text-sm font-mono font-bold mb-2 text-zinc-900 dark:text-zinc-50 flex items-center">
                          {post.title}
                        </h4>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="font-mono text-[10px]">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>

                          {post.siteName && (
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                              {post.siteName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

