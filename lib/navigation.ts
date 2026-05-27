import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Video,
  TrendingUp,
  Award,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  icon: LucideIcon
  label: string
  href: string
}

export const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: BookOpen, label: "My Courses", href: "/courses" },
  { icon: ClipboardList, label: "Assignments", href: "/assignments" },
  { icon: Video, label: "Live Classes", href: "/live-classes" },
  { icon: TrendingUp, label: "Progress", href: "/progress" },
  { icon: Award, label: "Certificates", href: "/certificates" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}
