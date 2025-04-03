import { getAllBlogPosts } from "@/lib/blog"
import { createSampleBlogPosts } from "@/lib/blog"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my latest articles and thoughts",
}

// 日付をフォーマットする関数
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function BlogPage() {
  // サンプルブログ記事を作成
  createSampleBlogPosts()

  // サーバーサイドでブログ記事を取得
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-zinc-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-50">BLOG</h1>
          <Link href="/" passHref>
            <Button
              variant="ghost"
              size="sm"
              className="font-mono text-xs flex items-center gap-1 hover:text-[#ff5722] dark:hover:text-[#ff5722]"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-center py-10 text-zinc-500 dark:text-zinc-400 font-mono">
              No blog posts found. Add markdown files to the content/blog directory.
            </p>
          ) : (
            posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} passHref>
                <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:border-[#ff5722] dark:hover:border-[#ff5722] transition-colors">
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
                        <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.date)}
                        </div>
                        <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <h2 className="text-sm font-mono font-bold mb-2 text-zinc-900 dark:text-zinc-50">{post.title}</h2>
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
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

