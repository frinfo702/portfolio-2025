import fs from "fs"
import path from "path"
import matter from "gray-matter"

// ブログディレクトリのパス
const blogsDirectory = path.join(process.cwd(), "content/blog")

// ブログ記事の型定義
export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage?: string
  readTime: string
  tags: string[]
  content: string
}

// すべてのブログ記事のスラッグを取得
export function getAllBlogSlugs() {
  try {
    // content/blogディレクトリが存在しない場合は作成
    if (!fs.existsSync(blogsDirectory)) {
      fs.mkdirSync(blogsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(blogsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        return {
          slug: fileName.replace(/\.md$/, ""),
        }
      })
  } catch (error) {
    console.error("Error reading blog directory:", error)
    return []
  }
}

// すべてのブログ記事を取得
export function getAllBlogPosts(): BlogPost[] {
  try {
    // content/blogディレクトリが存在しない場合は作成
    if (!fs.existsSync(blogsDirectory)) {
      fs.mkdirSync(blogsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(blogsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        // ファイル名からスラッグを取得
        const slug = fileName.replace(/\.md$/, "")

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(blogsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // gray-matterを使用してメタデータセクションを解析
        const matterResult = matter(fileContents)

        // データをBlogPost型に変換
        return {
          slug,
          title: matterResult.data.title || "Untitled",
          date: matterResult.data.date || new Date().toISOString(),
          excerpt: matterResult.data.excerpt || "",
          coverImage: matterResult.data.coverImage,
          readTime: matterResult.data.readTime || "5 min read",
          tags: matterResult.data.tags || [],
          content: matterResult.content,
        }
      })

    // 日付でソート
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error getting all blog posts:", error)
    return []
  }
}

// 特定のスラッグのブログ記事を取得
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    // サンプルブログ記事を作成（確実に存在するようにする）
    createSampleBlogPosts()

    const fullPath = path.join(blogsDirectory, `${slug}.md`)

    console.log(`Attempting to read blog post: ${fullPath}`)

    if (!fs.existsSync(fullPath)) {
      console.error(`Blog post file not found: ${fullPath}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")

    // gray-matterを使用してメタデータセクションを解析
    const matterResult = matter(fileContents)

    // データをBlogPost型に変換
    return {
      slug,
      title: matterResult.data.title || "Untitled",
      date: matterResult.data.date || new Date().toISOString(),
      excerpt: matterResult.data.excerpt || "",
      coverImage: matterResult.data.coverImage,
      readTime: matterResult.data.readTime || "5 min read",
      tags: matterResult.data.tags || [],
      content: matterResult.content,
    }
  } catch (error) {
    console.error(`Error getting blog post with slug ${slug}:`, error)
    return null
  }
}

// サンプルのブログ記事を作成する関数
export function createSampleBlogPosts() {
  try {
    // content/blogディレクトリが存在しない場合は作成
    if (!fs.existsSync(blogsDirectory)) {
      console.log(`Creating blog directory: ${blogsDirectory}`)
      fs.mkdirSync(blogsDirectory, { recursive: true })
    }

    // サンプルのブログ記事データ
    const samplePosts = [
      {
        slug: "getting-started-with-nextjs-typescript",
        title: "Getting Started with Next.js and TypeScript",
        date: "2023-04-15",
        excerpt:
          "A comprehensive guide to setting up a new project with Next.js and TypeScript, including best practices and common pitfalls to avoid.",
        coverImage: "/placeholder.svg?height=400&width=800",
        readTime: "8 min read",
        tags: ["Next.js", "TypeScript", "Web Development"],
        content: `
# Getting Started with Next.js and TypeScript

Next.js is a powerful React framework that enables functionality such as server-side rendering and static site generation. When combined with TypeScript, it provides a robust development experience with type safety and improved developer tooling.

## Setting Up Your Project

To create a new Next.js project with TypeScript, you can use the following command:

\`\`\`bash
npx create-next-app@latest my-app --typescript
\`\`\`

This will create a new Next.js project with TypeScript configuration already set up for you.

## Project Structure

A typical Next.js project with TypeScript has the following structure:

- \`pages/\`: Contains your application's pages
- \`public/\`: Static assets like images and fonts
- \`styles/\`: CSS or SCSS files
- \`components/\`: Reusable React components
- \`types/\`: TypeScript type definitions
- \`next.config.js\`: Next.js configuration
- \`tsconfig.json\`: TypeScript configuration

## Creating Your First Page

In Next.js, pages are React components exported from files in the \`pages\` directory. Here's a simple example of a TypeScript page:

\`\`\`tsx
// pages/index.tsx
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Created with Next.js and TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to my Next.js app!</h1>
      </main>
    </div>
  )
}

export default Home
\`\`\`

## Type Safety with TypeScript

TypeScript provides type checking for your JavaScript code. Here's an example of how you can use TypeScript with React components:

\`\`\`tsx
// components/Button.tsx
import React from 'react'

interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {text}
    </button>
  )
}

export default Button
\`\`\`

## API Routes

Next.js allows you to create API endpoints as serverless functions. With TypeScript, you can type your request and response objects:

\`\`\`tsx
// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
\`\`\`

## Conclusion

Next.js and TypeScript provide a powerful combination for building modern web applications. With type safety and improved developer experience, you can build robust applications with confidence.

Remember to check the official documentation for both [Next.js](https://nextjs.org/docs) and [TypeScript](https://www.typescriptlang.org/docs/) for more detailed information and advanced features.
`,
      },
      {
        slug: "building-portfolio-with-tailwind",
        title: "Building a Portfolio with Tailwind CSS",
        date: "2023-03-22",
        excerpt: "Learn how to create a modern, responsive portfolio website using Tailwind CSS and React components.",
        coverImage: "/placeholder.svg?height=400&width=800",
        readTime: "6 min read",
        tags: ["Tailwind CSS", "React", "Portfolio"],
        content: `
# Building a Portfolio with Tailwind CSS

Creating a professional portfolio website is essential for showcasing your work and skills to potential clients or employers. Tailwind CSS provides a utility-first approach that makes it easy to build beautiful, responsive designs without writing custom CSS.

## Setting Up Tailwind CSS

To get started with Tailwind CSS in a Next.js project, you can use the following commands:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Then, configure your \`tailwind.config.js\` file:

\`\`\`js
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

And add the Tailwind directives to your CSS:

\`\`\`css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Creating a Hero Section

The hero section is the first thing visitors see when they land on your portfolio. Here's how to create a simple hero section with Tailwind CSS:

\`\`\`tsx
// components/Hero.tsx
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-20 px-4 md:px-10">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I'm <span className="text-blue-600">Your Name</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A passionate web developer specializing in creating beautiful and functional websites.
        </p>
        <div className="flex space-x-4">
          <Link href="/projects">
            <a className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              View My Work
            </a>
          </Link>
          <Link href="/contact">
            <a className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
              Contact Me
            </a>
          </Link>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
          <Image
            src="/profile.jpg"
            alt="Profile"
            layout="fill"
            className="rounded-full"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
\`\`\`

## Creating a Projects Section

The projects section is where you showcase your work. Here's a simple implementation:

\`\`\`tsx
// components/Projects.tsx
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'A fully functional e-commerce website built with Next.js and Stripe.',
    image: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'Stripe', 'Tailwind CSS'],
    link: 'https://example.com'
  },
  // More projects...
]

const Projects = () => {
  return (
    <div className="py-20 px-4 md:px-10">
      <h2 className="text-3xl font-bold mb-10 text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
\`\`\`

## Responsive Design with Tailwind

Tailwind makes it easy to create responsive designs with its built-in breakpoint prefixes:

- \`sm:\` for small screens (640px and up)
- \`md:\` for medium screens (768px and up)
- \`lg:\` for large screens (1024px and up)
- \`xl:\` for extra large screens (1280px and up)
- \`2xl:\` for 2x extra large screens (1536px and up)

For example, to create a layout that changes from a single column on mobile to two columns on desktop:

\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-white p-4 rounded shadow">Item 1</div>
  <div className="bg-white p-4 rounded shadow">Item 2</div>
</div>
\`\`\`

## Conclusion

Tailwind CSS provides a powerful and flexible way to build beautiful portfolio websites without writing custom CSS. By leveraging its utility classes, you can create responsive, modern designs that showcase your work effectively.

Remember to check the [Tailwind CSS documentation](https://tailwindcss.com/docs) for more information on available utilities and customization options.
`,
      },
      {
        slug: "power-of-server-components",
        title: "The Power of Server Components in Next.js",
        date: "2023-02-10",
        excerpt:
          "Exploring the benefits and use cases of Server Components in Next.js applications for improved performance and developer experience.",
        coverImage: "/placeholder.svg?height=400&width=800",
        readTime: "10 min read",
        tags: ["Next.js", "Server Components", "Performance"],
        content: `
# The Power of Server Components in Next.js

React Server Components represent a paradigm shift in how we build React applications. With Next.js adopting this technology, developers now have powerful new tools to improve performance and user experience.

## What Are Server Components?

Server Components are React components that render exclusively on the server. Unlike traditional React components that render on the client, Server Components:

- Never run on the client
- Have access to server-side resources (databases, file system, etc.)
- Don't increase your JavaScript bundle size
- Can fetch data without client-side waterfalls

## Server Components vs. Client Components

In Next.js App Router, components are Server Components by default. Here's a comparison:

**Server Components:**
- Can fetch data directly
- Can access backend resources directly
- Don't add to the JavaScript bundle
- Can't use hooks or browser APIs
- Can't use event handlers (onClick, etc.)

**Client Components:**
- Can use React hooks (useState, useEffect, etc.)
- Can use browser APIs
- Can handle user events
- Must be explicitly marked with the "use client" directive
- Increase the JavaScript bundle size

## Using Server Components for Data Fetching

One of the most powerful use cases for Server Components is data fetching:

\`\`\`tsx
// app/users/page.tsx
import { db } from '@/lib/db'

export default async function UsersPage() {
  // This data fetching happens on the server
  const users = await db.user.findMany()
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
\`\`\`

Notice how we can directly use \`await\` in the component without needing useEffect or other client-side data fetching patterns.

## Mixing Server and Client Components

In real applications, you'll often need to mix Server and Client Components:

\`\`\`tsx
// app/products/page.tsx
import { db } from '@/lib/db'
import ProductCard from '@/components/ProductCard' // Server Component
import AddToCartButton from '@/components/AddToCartButton' // Client Component

export default async function ProductsPage() {
  const products = await db.product.findMany()
  
  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product}>
            <AddToCartButton productId={product.id} />
          </ProductCard>
        ))}
      </div>
    </div>
  )
}
\`\`\`

\`\`\`tsx
// components/AddToCartButton.tsx
"use client"

import { useState } from 'react'

export default function AddToCartButton({ productId }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleAddToCart = async () => {
    setIsLoading(true)
    // Add to cart logic
    setIsLoading(false)
  }
  
  return (
    <button 
      onClick={handleAddToCart}
      disabled={isLoading}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
\`\`\`

## Performance Benefits

Server Components offer significant performance benefits:

1. **Reduced JavaScript**: Server Components don't send any JavaScript to the client, reducing bundle size
2. **Faster Initial Load**: Content can be rendered on the server and streamed to the client
3. **Improved SEO**: Content is available in the initial HTML
4. **Reduced Waterfall Requests**: Data fetching happens on the server, eliminating client-side fetch waterfalls

## Streaming and Suspense

Next.js leverages React Suspense to stream UI from the server to the client:

\`\`\`tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import UserProfile from '@/components/UserProfile'
import RecentOrders from '@/components/RecentOrders'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Suspense fallback={<LoadingSpinner />}>
        <UserProfile />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <RecentOrders />
      </Suspense>
    </div>
  )
}
\`\`\`

This allows parts of the page to load as they become available, improving perceived performance.

## Conclusion

Server Components in Next.js represent a powerful new approach to building React applications. By moving more logic to the server, we can create faster, more efficient applications with improved developer experience.

As you build with Next.js, consider which parts of your application would benefit from Server Components and which require client-side interactivity. The right balance will lead to optimal performance and user experience.
`,
      },
    ]

    // サンプルのブログ記事をファイルに書き込む
    for (const post of samplePosts) {
      const fullPath = path.join(blogsDirectory, `${post.slug}.md`)

      // ファイルが存在しない場合のみ作成
      if (!fs.existsSync(fullPath)) {
        console.log(`Creating sample blog post: ${post.slug}`)
        const fileContent = `---
title: "${post.title}"
date: "${post.date}"
excerpt: "${post.excerpt}"
coverImage: "${post.coverImage}"
readTime: "${post.readTime}"
tags: ${JSON.stringify(post.tags)}
---

${post.content}`

        fs.writeFileSync(fullPath, fileContent)
        console.log(`Sample blog post created: ${fullPath}`)
      } else {
        console.log(`Sample blog post already exists: ${fullPath}`)
      }
    }

    // 作成されたファイルを確認
    const files = fs.readdirSync(blogsDirectory)
    console.log(`Files in blog directory: ${files.join(", ")}`)

    return true
  } catch (error) {
    console.error("Error creating sample blog posts:", error)
    return false
  }
}

