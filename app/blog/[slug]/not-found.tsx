import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] dark:bg-zinc-900 py-8 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-mono font-bold mb-4 text-zinc-900 dark:text-zinc-50">404 - Blog Post Not Found</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 font-mono">
          The blog post you are looking for does not exist or has been moved.
        </p>
        <Link href="/blog" passHref>
          <Button
            variant="default"
            className="font-mono text-sm flex items-center gap-2 bg-[#ff5722] hover:bg-[#ff5722]/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    </div>
  )
}

