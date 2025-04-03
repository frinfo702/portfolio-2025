import { type NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function GET(request: NextRequest) {
  try {
    // URLパラメータを取得
    const url = request.nextUrl.searchParams.get("url")

    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
    }

    // URLからメタデータを取得
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0; +http://example.com)",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: response.status })
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // メタデータを抽出
    const title = $("title").text() || $('meta[property="og:title"]').attr("content") || ""
    const description =
      $('meta[name="description"]').attr("content") || $('meta[property="og:description"]').attr("content") || ""
    const siteName = $('meta[property="og:site_name"]').attr("content") || ""

    // ファビコンを探す
    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      $('link[rel="apple-touch-icon"]').attr("href") ||
      "/favicon.ico"

    // 相対URLを絶対URLに変換
    if (favicon && !favicon.startsWith("http")) {
      const urlObj = new URL(url)
      favicon = favicon.startsWith("/")
        ? `${urlObj.protocol}//${urlObj.host}${favicon}`
        : `${urlObj.protocol}//${urlObj.host}/${favicon}`
    }

    return NextResponse.json({
      title,
      description,
      siteName,
      favicon,
    })
  } catch (error) {
    console.error("Error fetching metadata:", error)
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 })
  }
}

