import type { Session, User } from "@supabase/supabase-js"
import { enrolledCourses } from "@/lib/courses-data"
import { isSupabaseConfigured, supabase } from "@/lib/supabase"

export type CourseProgress = Record<string, string[]>
export type AssignmentProgress = Record<string, "pending" | "submitted" | "graded">

export type LearningStreak = {
  current: number
  weeklyGoal: number
  lastActiveDate: string
}

export type StudentProfile = {
  id: string
  name: string
  email: string
  role: string
  enrolledCourses: string[]
  progress: CourseProgress
  assignments: AssignmentProgress
  streak: LearningStreak
}

const PROFILE_STORAGE_KEY = "lumina-lms-student-profile"

export const demoStudentProfile: StudentProfile = {
  id: "demo-sony",
  name: "Sony",
  email: "sony@lumina.edu",
  role: "AIML Student",
  enrolledCourses: enrolledCourses.map((course) => course.slug),
  progress: {},
  assignments: {},
  streak: {
    current: 14,
    weeklyGoal: 5,
    lastActiveDate: new Date().toISOString().slice(0, 10),
  },
}

function profileFromUser(user: User): StudentProfile {
  return {
    id: user.id,
    name:
      typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()
        ? user.user_metadata.name
        : user.email?.split("@")[0] || demoStudentProfile.name,
    email: user.email || demoStudentProfile.email,
    role:
      typeof user.user_metadata?.role === "string"
        ? user.user_metadata.role
        : demoStudentProfile.role,
    enrolledCourses: Array.isArray(user.user_metadata?.enrolledCourses)
      ? user.user_metadata.enrolledCourses
      : demoStudentProfile.enrolledCourses,
    progress:
      user.user_metadata?.progress &&
      typeof user.user_metadata.progress === "object" &&
      !Array.isArray(user.user_metadata.progress)
        ? (user.user_metadata.progress as CourseProgress)
        : {},
    assignments:
      user.user_metadata?.assignments &&
      typeof user.user_metadata.assignments === "object" &&
      !Array.isArray(user.user_metadata.assignments)
        ? (user.user_metadata.assignments as AssignmentProgress)
        : {},
    streak:
      user.user_metadata?.streak &&
      typeof user.user_metadata.streak === "object" &&
      !Array.isArray(user.user_metadata.streak)
        ? (user.user_metadata.streak as LearningStreak)
        : demoStudentProfile.streak,
  }
}

function readCachedProfile(): StudentProfile {
  if (typeof window === "undefined") return demoStudentProfile
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as StudentProfile) : demoStudentProfile
  } catch {
    return demoStudentProfile
  }
}

function cacheProfile(profile: StudentProfile) {
  if (typeof window === "undefined") return
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}

export function getCachedStudentProfile(): StudentProfile {
  return readCachedProfile()
}

export function profileFromSession(session: Session | null): StudentProfile {
  if (!session?.user) return readCachedProfile()
  const profile = profileFromUser(session.user)
  cacheProfile(profile)
  return profile
}

export async function getCurrentStudentProfile(): Promise<StudentProfile> {
  if (!isSupabaseConfigured || !supabase) return readCachedProfile()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const profile = profileFromSession(session)
  if (!session?.user) return profile

  const { data } = await supabase
    .from("student_profiles")
    .select("name,email,role,enrolled_courses,progress,assignments,streak")
    .eq("id", session.user.id)
    .maybeSingle()

  if (!data) return profile

  const storedProfile: StudentProfile = {
    ...profile,
    name: typeof data.name === "string" ? data.name : profile.name,
    email: typeof data.email === "string" ? data.email : profile.email,
    role: typeof data.role === "string" ? data.role : profile.role,
    enrolledCourses: Array.isArray(data.enrolled_courses)
      ? data.enrolled_courses
      : profile.enrolledCourses,
    progress:
      data.progress && typeof data.progress === "object" && !Array.isArray(data.progress)
        ? (data.progress as CourseProgress)
        : profile.progress,
    assignments:
      data.assignments &&
      typeof data.assignments === "object" &&
      !Array.isArray(data.assignments)
        ? (data.assignments as AssignmentProgress)
        : profile.assignments,
    streak:
      data.streak && typeof data.streak === "object" && !Array.isArray(data.streak)
        ? (data.streak as LearningStreak)
        : profile.streak,
  }

  cacheProfile(storedProfile)
  return storedProfile
}

export async function saveStudentProfile(profile: StudentProfile) {
  cacheProfile(profile)

  if (!isSupabaseConfigured || !supabase || profile.id === demoStudentProfile.id) {
    return
  }

  await supabase.auth.updateUser({
    data: {
      name: profile.name,
      role: profile.role,
      enrolledCourses: profile.enrolledCourses,
      progress: profile.progress,
      assignments: profile.assignments,
      streak: profile.streak,
    },
  })

  await supabase.from("student_profiles").upsert({
    id: profile.id,
    name: profile.name,
    email: profile.email,
    role: profile.role,
    enrolled_courses: profile.enrolledCourses,
    progress: profile.progress,
    assignments: profile.assignments,
    streak: profile.streak,
    updated_at: new Date().toISOString(),
  })
}

export async function signInStudent(email: string, password: string) {
  if (!isSupabaseConfigured || !supabase) {
    cacheProfile({
      ...demoStudentProfile,
      email,
      name: email.trim().toLowerCase().startsWith("sony")
        ? "Sony"
        : demoStudentProfile.name,
    })
    return { profile: readCachedProfile(), needsEmailConfirmation: false }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)

  const profile = profileFromSession(data.session)
  return { profile, needsEmailConfirmation: false }
}

export async function signUpStudent(name: string, email: string, password: string) {
  const baseProfile = {
    name,
    email,
    role: demoStudentProfile.role,
    enrolledCourses: demoStudentProfile.enrolledCourses,
    progress: {},
    assignments: {},
    streak: demoStudentProfile.streak,
  }

  if (!isSupabaseConfigured || !supabase) {
    const profile = { ...baseProfile, id: "local-student" }
    cacheProfile(profile)
    return { profile, needsEmailConfirmation: false }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: baseProfile,
    },
  })

  if (error) throw new Error(error.message)

  const profile = data.user
    ? profileFromUser(data.user)
    : ({ ...baseProfile, id: "pending-email-confirmation" } as StudentProfile)

  cacheProfile(profile)
  await saveStudentProfile(profile)

  return { profile, needsEmailConfirmation: !data.session }
}

export async function signOutStudent() {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut()
  }
  cacheProfile(demoStudentProfile)
}

export async function sendPasswordReset(email: string) {
  if (!isSupabaseConfigured || !supabase) return

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      typeof window === "undefined"
        ? undefined
        : `${window.location.origin}/login`,
  })

  if (error) throw new Error(error.message)
}
