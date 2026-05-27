"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mainNavItems, isNavActive } from "@/lib/navigation"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  onNavigate?: () => void
  isMobile?: boolean
}

export function Sidebar({ collapsed, onToggle, onNavigate, isMobile }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground transition-all duration-300",
        isMobile ? "w-full" : "fixed left-0 top-0 z-40 h-screen max-h-screen",
        !isMobile && (collapsed ? "w-[72px]" : "w-64")
      )}
    >
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-3.5">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex min-w-0 flex-1 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {(!collapsed || isMobile) && (
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold leading-tight tracking-tight">
                Lumina <span className="text-primary">LMS</span>
              </p>
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-sidebar-foreground/45">
                Learning Platform
              </p>
            </div>
          )}
        </Link>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={onToggle}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close menu</span>
          </Button>
        )}
      </div>

      <nav className="dashboard-panel-scroll flex-1 space-y-0.5 overflow-y-auto overscroll-contain p-2.5">
        {mainNavItems.map((item) => {
          const active = isNavActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "interactive-nav flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium",
                active
                  ? "bg-sidebar-accent text-sidebar-primary shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn("h-4 w-4 shrink-0", active && "text-sidebar-primary")}
              />
              {(!collapsed || isMobile) && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {!isMobile && (
        <div className="border-t border-sidebar-border p-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              "interactive-nav h-8 w-full justify-center text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              !collapsed && "justify-start gap-2.5"
            )}
          >
            <ChevronLeft
              className={cn("h-4 w-4 transition-transform duration-200", collapsed && "rotate-180")}
            />
            {!collapsed && <span className="text-sm">Collapse</span>}
          </Button>
        </div>
      )}
    </aside>
  )
}
