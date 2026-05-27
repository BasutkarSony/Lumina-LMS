"use client"

import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"
import { Moon, Sun, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(isDark)
    if (isDark) document.documentElement.classList.add("dark")
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent p-10 text-primary-foreground lg:flex lg:w-[44%] lg:flex-col lg:justify-between xl:w-[42%]">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="auth-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#auth-grid)" />
          </svg>
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">
              Lumina <span className="opacity-90">LMS</span>
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-70">
              AI-Powered Learning
            </p>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-balance xl:text-4xl">
            Learn smarter with your cohort
          </h1>
          <p className="text-sm leading-relaxed opacity-90">
            Track courses, live classes, and AIML projects — all in one modern workspace built
            for ambitious learners.
          </p>
        </div>

        <p className="relative z-10 text-xs opacity-60">
          Trusted by students and educators worldwide
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">
              Lumina <span className="text-primary">LMS</span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-[400px] space-y-6">
            <div className="space-y-1 text-center lg:text-left">
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
