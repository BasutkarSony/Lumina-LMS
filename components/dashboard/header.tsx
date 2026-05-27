"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Search, Bell, Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { currentUser } from "@/lib/user"
import { signOutStudent } from "@/lib/student-profile"
import { useStudentProfile } from "@/hooks/use-student-profile"

interface HeaderProps {
  sidebarCollapsed: boolean
  darkMode: boolean
  onToggleDarkMode: () => void
  onToggleMobileSidebar: () => void
  mobileSidebarOpen?: boolean
}

export function Header({
  sidebarCollapsed,
  darkMode,
  onToggleDarkMode,
  onToggleMobileSidebar,
  mobileSidebarOpen = false,
}: HeaderProps) {
  const router = useRouter()
  const { profile } = useStudentProfile()
  const displayName = profile.name || currentUser.fullName
  const displayRole = profile.role || currentUser.role
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || currentUser.initials

  const handleSignOut = async () => {
    await signOutStudent()
    router.push("/login")
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 sm:gap-3 sm:px-4",
        "lg:left-64",
        sidebarCollapsed && "lg:left-[72px]"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 lg:hidden"
        onClick={onToggleMobileSidebar}
        aria-expanded={mobileSidebarOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="relative min-w-0 flex-1 sm:max-w-md">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="h-9 border-0 bg-secondary pl-8 text-sm transition-colors focus-visible:bg-background sm:placeholder:visible"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-medium text-primary-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[min(20rem,calc(100vw-2rem))]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-0.5 py-2.5">
              <span className="text-sm font-medium">New assignment posted</span>
              <span className="text-xs text-muted-foreground">
                Training Diagnostics Case Study due in 2 days
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-0.5 py-2.5">
              <span className="text-sm font-medium">Live class reminder</span>
              <span className="text-xs text-muted-foreground">
                Transformer Attention Analysis starts in 30 minutes
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-0.5 py-2.5">
              <span className="text-sm font-medium">Course completed!</span>
              <span className="text-xs text-muted-foreground">
                You earned a certificate in React Foundations
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-1.5 transition-colors">
              <Avatar className="h-7 w-7 ring-2 ring-transparent transition-[box-shadow] hover:ring-primary/20">
                <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium leading-none">{displayName}</span>
                <span className="text-[11px] text-muted-foreground">{displayRole}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/settings">Profile & Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={handleSignOut}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
