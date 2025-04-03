"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// GitHubData型を拡張して、コミット内容を含めるようにする
type GitHubData = {
  user: {
    name: string
    login: string
    avatar_url: string
    followers: number
    following: number
    public_repos: number
  }
  languages: Record<string, number>
  activityData: number[]
  activityTypes: Record<string, number>
  totalCommits: number
  totalPRs: number
  totalIssues: number
  // 最近のコミット情報を追加
  recentCommits?: {
    message: string
    date: string
    repo: string
  }[]
}

interface GitHubStatsProps {
  accentColor?: string
  darkAccentColor?: string
}

export function GitHubStats({ accentColor = "#ff5722", darkAccentColor = "#ff5722" }: GitHubStatsProps) {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if dark mode is active
    setIsDarkMode(document.documentElement.classList.contains("dark"))

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"))
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch("/api/github")
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub data")
        }
        const fetchedData = await response.json()
        setData(fetchedData)
      } catch (err) {
        setError("Could not load GitHub data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: isDarkMode ? darkAccentColor : accentColor }} />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center p-6 text-zinc-500 dark:text-zinc-400 font-mono">{error || "No data available"}</div>
    )
  }

  // 言語データの準備
  const languageEntries = Object.entries(data.languages)
  const totalLanguages = languageEntries.reduce((acc, [_, count]) => acc + count, 0)
  const languagePercentages = languageEntries.map(([name, count]) => ({
    name,
    percentage: Math.round((count / totalLanguages) * 100),
  }))

  // 色のマッピング - バックエンド言語向けに調整
  const languageColors = {
    Go: "#00ADD8",
    Rust: "#DEA584",
    Python: "#3572A5",
    C: "#555555",
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    // その他の言語は地味な色に変更
    default: "#8a8a8a", // 地味なグレー
  }

  // アクティビティデータの最大値
  const maxActivity = Math.max(...data.activityData, 1)

  // コミットタイプの色
  const commitTypeColors = {
    feature: "#4CAF50",
    fix: "#FF9800",
    docs: "#2196F3",
    refactor: "#9C27B0",
    test: "#795548",
    other: "#607D8B",
  }

  // コミットタイプを判別する関数
  const getCommitType = (message: string) => {
    if (
      message.toLowerCase().includes("add") ||
      message.toLowerCase().includes("feature") ||
      message.toLowerCase().includes("implement")
    ) {
      return { type: "feature", color: commitTypeColors.feature }
    } else if (
      message.toLowerCase().includes("fix") ||
      message.toLowerCase().includes("bug") ||
      message.toLowerCase().includes("issue")
    ) {
      return { type: "fix", color: commitTypeColors.fix }
    } else if (message.toLowerCase().includes("doc") || message.toLowerCase().includes("readme")) {
      return { type: "docs", color: commitTypeColors.docs }
    } else if (
      message.toLowerCase().includes("refactor") ||
      message.toLowerCase().includes("clean") ||
      message.toLowerCase().includes("improve")
    ) {
      return { type: "refactor", color: commitTypeColors.refactor }
    } else if (message.toLowerCase().includes("test")) {
      return { type: "test", color: commitTypeColors.test }
    } else {
      return { type: "other", color: commitTypeColors.other }
    }
  }

  return (
    <div className="space-y-6">
      {/* 概要情報 - フォロワー情報を控えめに */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <div className="text-3xl font-mono font-bold" style={{ color: isDarkMode ? darkAccentColor : accentColor }}>
            {data.user.public_repos}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase">Repos</div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <div className="text-3xl font-mono font-bold" style={{ color: isDarkMode ? darkAccentColor : accentColor }}>
            {data.totalCommits}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase">Commits</div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <div className="text-3xl font-mono font-bold" style={{ color: isDarkMode ? darkAccentColor : accentColor }}>
            {data.totalPRs}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase">PRs</div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <div className="text-3xl font-mono font-bold" style={{ color: isDarkMode ? darkAccentColor : accentColor }}>
            {data.totalIssues}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase">Issues</div>
        </Card>
      </div>

      {/* アクティビティグラフ - より視覚的に */}
      <Card className="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        <h4 className="text-xs font-mono font-bold mb-3 text-zinc-900 dark:text-zinc-50">ACTIVITY (LAST 30 DAYS)</h4>
        <div className="h-32 flex items-end gap-[2px]">
          {data.activityData.map((count, index) => (
            <div
              key={index}
              className="flex-1 relative group transition-all duration-200 hover:opacity-80"
              style={{
                height: `${Math.max((count / maxActivity) * 100, 4)}%`,
                backgroundColor:
                  count > 0
                    ? `rgba(${Number.parseInt(isDarkMode ? darkAccentColor : accentColor, 16) >> 16}, ${(Number.parseInt(isDarkMode ? darkAccentColor : accentColor, 16) >> 8) & 0xff}, ${Number.parseInt(isDarkMode ? darkAccentColor : accentColor, 16) & 0xff}, ${0.3 + (count / maxActivity) * 0.7})`
                    : "rgba(0,0,0,0.1)",
              }}
            >
              <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-zinc-800 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-800 text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {count} activities
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">30 DAYS AGO</span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">TODAY</span>
        </div>
      </Card>

      {/* 最近のコミット */}
      <Card className="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        <h4 className="text-xs font-mono font-bold mb-3 text-zinc-900 dark:text-zinc-50">RECENT COMMITS</h4>
        <div className="space-y-3">
          {data.recentCommits?.slice(0, 5).map((commit, index) => {
            const commitType = getCommitType(commit.message)
            return (
              <div key={index} className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: commitType.color }}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 font-mono line-clamp-1">
                      {commit.message}
                    </p>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono ml-2 flex-shrink-0">
                      {new Date(commit.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">{commit.repo}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* 言語分布 - より視覚的に */}
      <Card className="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        <h4 className="text-xs font-mono font-bold mb-3 text-zinc-900 dark:text-zinc-50">LANGUAGES</h4>
        <div className="h-6 w-full flex overflow-hidden rounded-sm mb-3">
          {languagePercentages.map(({ name, percentage }) => (
            <div
              key={name}
              className="h-full relative group transition-all duration-200 hover:opacity-80"
              style={{
                width: `${percentage}%`,
                backgroundColor:
                  name in languageColors ? languageColors[name as keyof typeof languageColors] : languageColors.default,
                minWidth: "4px",
              }}
            >
              <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-zinc-800 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-800 text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {name}: {percentage}%
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {languagePercentages.slice(0, 6).map(({ name, percentage }) => (
            <div key={name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor:
                    name in languageColors
                      ? languageColors[name as keyof typeof languageColors]
                      : languageColors.default,
                }}
              ></div>
              <span className="text-xs text-zinc-700 dark:text-zinc-300 font-mono truncate">{name}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono ml-auto">{percentage}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* コミットタイプの分布 */}
      <Card className="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        <h4 className="text-xs font-mono font-bold mb-3 text-zinc-900 dark:text-zinc-50">COMMIT TYPES</h4>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(commitTypeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
              <span className="text-xs text-zinc-700 dark:text-zinc-300 font-mono capitalize">{type}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

