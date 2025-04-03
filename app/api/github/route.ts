import { NextResponse } from "next/server"

// GitHubのAPIからデータを取得する関数
export async function GET() {
  try {
    // GitHubのユーザー名
    const username = "frinfo702"

    // GitHubのAPIエンドポイント
    const userUrl = `https://api.github.com/users/${username}`
    const reposUrl = `https://api.github.com/users/${username}/repos`
    const eventsUrl = `https://api.github.com/users/${username}/events?per_page=100`

    // GitHub APIのトークンがある場合は認証ヘッダーを追加
    const headers: HeadersInit = {}
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`
    }

    // 並行してリクエストを実行
    const [userResponse, reposResponse, eventsResponse] = await Promise.all([
      fetch(userUrl, { headers }),
      fetch(reposUrl, { headers }),
      fetch(eventsUrl, { headers, cache: 'no-store' }),
    ])

    // レスポンスをJSONに変換
    const userData = await userResponse.json()
    const reposData = await reposResponse.json()
    let eventsData = await eventsResponse.json()

    // イベントデータが配列でない場合のエラーハンドリング
    if (!Array.isArray(eventsData)) {
      console.error("Events data is not an array:", eventsData)
      eventsData = []
    }
    
    // イベントを日付順にソート（新しい順）
    eventsData.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // 言語の使用状況を集計
    const languages: Record<string, number> = {}

    // リポジトリごとに言語情報を取得
    for (const repo of reposData) {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1
      }

      // 複数の言語を持つリポジトリの場合、言語APIを呼び出して詳細を取得
      try {
        const languagesUrl = repo.languages_url
        const languagesResponse = await fetch(languagesUrl, { headers })
        const languagesData = await languagesResponse.json()

        for (const [lang, bytes] of Object.entries(languagesData)) {
          languages[lang] = (languages[lang] || 0) + 1
        }
      } catch (error) {
        console.error(`Error fetching languages for ${repo.name}:`, error)
      }
    }

    // 過去のアクティビティを日付ごとに集計（UTC基準で日付比較）
    const now = new Date()
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    const activityMap = new Map<string, number>() // YYYY-MM-DD形式の日付文字列をキーにする

    eventsData.forEach((event: any) => {
      const eventDate = new Date(event.created_at)
      // イベントの日付をYYYY-MM-DD形式のUTC文字列にする
      const eventDateStr = eventDate.toISOString().split('T')[0]
      
      // 30日以内のイベントかチェック（UTC基準で比較）
      const eventDayUTC = new Date(Date.UTC(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate()))
      const daysDiff = Math.floor((todayUTC.getTime() - eventDayUTC.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff >= 0 && daysDiff < 30) {
        // その日付に活動があったことを記録（イベント数をカウント）
        activityMap.set(eventDateStr, (activityMap.get(eventDateStr) || 0) + 1)
      }
    })

    // 過去30日分の日付配列を生成し、Mapからアクティビティを取得
    const activityData = Array(30).fill(0)
    for (let i = 0; i < 30; i++) {
      const date = new Date(todayUTC)
      date.setUTCDate(todayUTC.getUTCDate() - i) // UTC日付で計算
      const dateStr = date.toISOString().split('T')[0]
      activityData[i] = activityMap.get(dateStr) || 0 // Mapに存在すればそのカウント、なければ0
    }

    // アクティビティタイプを集計
    const activityTypes: Record<string, number> = {}
    eventsData.forEach((event: any) => {
      activityTypes[event.type] = (activityTypes[event.type] || 0) + 1
    })

    // 最近のコミット情報を抽出
    interface CommitInfo {
      message: string;
      date: string;
      repo: string;
    }
    
    const recentCommits: CommitInfo[] = []
    eventsData.forEach((event: any) => {
      if (event.type === "PushEvent" && event.payload.commits) {
        event.payload.commits.forEach((commit: any) => {
          recentCommits.push({
            message: commit.message,
            date: event.created_at,
            repo: event.repo.name.split("/")[1],
          })
        })
      }
    })

    return NextResponse.json({
      user: {
        name: userData.name || username,
        login: userData.login,
        avatar_url: userData.avatar_url,
        followers: userData.followers,
        following: userData.following,
        public_repos: userData.public_repos,
      },
      languages,
      activityData: activityData.reverse(), // 古い日付から新しい日付の順に
      activityTypes,
      totalCommits: eventsData.reduce((count: number, event: any) => 
        count + (event.type === "PushEvent" && event.payload.commits ? event.payload.commits.length : 0), 0),
      totalPRs: eventsData.filter((event: any) => event.type === "PullRequestEvent").length,
      totalIssues: eventsData.filter((event: any) => event.type === "IssuesEvent").length,
      recentCommits: recentCommits.slice(0, 10), // 最新の10件のコミット情報を返す
    })
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
  }
}
