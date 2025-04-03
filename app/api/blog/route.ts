import { NextResponse } from "next/server"
import { getAllBlogPosts, createSampleBlogPosts } from "@/lib/blog"

export async function GET() {
  try {
    // サンプルのブログ記事を作成（初回のみ）
    createSampleBlogPosts()

    // すべてのブログ記事を取得
    const posts = getAllBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

