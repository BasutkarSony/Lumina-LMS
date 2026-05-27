"use client"

import { useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { RightSidebar } from "@/components/dashboard/right-sidebar"
import { recordLearnerActivity } from "@/lib/engagement-storage"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const showRightSidebar = pathname === "/"
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
    recordLearnerActivity()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileSidebarOpen])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
    document.documentElement.classList.toggle("dark")
  }

  const closeMobileSidebar = () => setMobileSidebarOpen(false)

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="hidden lg:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileSidebarOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
            mobileSidebarOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={closeMobileSidebar}
        />
        <div
          id="mobile-sidebar"
          className={cn(
            "absolute left-0 top-0 h-full w-[min(18rem,88vw)] shadow-xl transition-transform duration-300 ease-out",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar
            collapsed={false}
            onToggle={closeMobileSidebar}
            onNavigate={closeMobileSidebar}
            isMobile
          />
        </div>
      </div>

      <Header
        sidebarCollapsed={sidebarCollapsed}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onToggleMobileSidebar={() => setMobileSidebarOpen((open) => !open)}
        mobileSidebarOpen={mobileSidebarOpen}
      />

      <div
        className={cn(
          "flex min-h-[calc(100vh-3.5rem)] min-w-0 overflow-hidden transition-[margin] duration-300",
          sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-64"
        )}
      >
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-14">
          <div className="mx-auto w-full max-w-[1600px] p-3 sm:p-4 lg:p-5">{children}</div>
        </main>
        {showRightSidebar && <RightSidebar />}
      </div>
    </div>
  )
}
