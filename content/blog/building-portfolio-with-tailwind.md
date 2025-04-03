---
title: "Building a Portfolio with Tailwind CSS"
date: "2023-03-22"
excerpt: "Learn how to create a modern, responsive portfolio website using Tailwind CSS and React components."
coverImage: "/placeholder.svg?height=400&width=800"
readTime: "6 min read"
tags: ["Tailwind CSS","React","Portfolio"]
---


# Building a Portfolio with Tailwind CSS

Creating a professional portfolio website is essential for showcasing your work and skills to potential clients or employers. Tailwind CSS provides a utility-first approach that makes it easy to build beautiful, responsive designs without writing custom CSS.

## Setting Up Tailwind CSS

To get started with Tailwind CSS in a Next.js project, you can use the following commands:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then, configure your `tailwind.config.js` file:

```js
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
```

And add the Tailwind directives to your CSS:

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Creating a Hero Section

The hero section is the first thing visitors see when they land on your portfolio. Here's how to create a simple hero section with Tailwind CSS:

```tsx
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
```

## Creating a Projects Section

The projects section is where you showcase your work. Here's a simple implementation:

```tsx
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
```

## Responsive Design with Tailwind

Tailwind makes it easy to create responsive designs with its built-in breakpoint prefixes:

- `sm:` for small screens (640px and up)
- `md:` for medium screens (768px and up)
- `lg:` for large screens (1024px and up)
- `xl:` for extra large screens (1280px and up)
- `2xl:` for 2x extra large screens (1536px and up)

For example, to create a layout that changes from a single column on mobile to two columns on desktop:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-white p-4 rounded shadow">Item 1</div>
  <div className="bg-white p-4 rounded shadow">Item 2</div>
</div>
```

## Conclusion

Tailwind CSS provides a powerful and flexible way to build beautiful portfolio websites without writing custom CSS. By leveraging its utility classes, you can create responsive, modern designs that showcase your work effectively.

Remember to check the [Tailwind CSS documentation](https://tailwindcss.com/docs) for more information on available utilities and customization options.
