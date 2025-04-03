import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog"
import { createSampleBlogPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Home } from "lucide-react"
import type { Metadata, ResolvingMetadata } from "next"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"

type Props = {
  params: { slug: string }
}

// 静的パスの生成
export async function generateStaticParams() {
  // サンプルブログ記事を作成
  createSampleBlogPosts()
  const slugs = getAllBlogSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

// 動的メタデータの生成
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

// 日付をフォーマットする関数
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function BlogPost({ params }: Props) {
  // サンプルブログ記事を作成（ページレンダリング時にも実行）
  createSampleBlogPosts()

  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-zinc-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/blog" passHref>
            <Button
              variant="ghost"
              size="sm"
              className="font-mono text-xs flex items-center gap-1 hover:text-[#ff5722] dark:hover:text-[#ff5722]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

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

        <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-700 mb-8">
          {post.coverImage && (
            <div className="w-full h-64 md:h-80 relative">
              <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} className="font-mono text-xs bg-[#ff5722] text-white hover:bg-[#ff5722]/90">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-6 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

