import {
  getCachedStudentProfile,
  saveStudentProfile,
} from "@/lib/student-profile"

const STORAGE_KEY = "lumina-lms-lesson-progress"
const LEGACY_STORAGE_KEY = "cohortiq-lesson-progress"

type ProgressStore = Record<string, string[]>

function readStore(): ProgressStore {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem(LEGACY_STORAGE_KEY) ||
        "{}"
    ) as ProgressStore
  } catch {
    return {}
  }
}

function writeStore(store: ProgressStore) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getCompletedLessonIds(courseSlug: string): string[] {
  return readStore()[courseSlug] ?? []
}

export function markLessonComplete(courseSlug: string, lessonId: string): string[] {
  const store = readStore()
  const existing = new Set(store[courseSlug] ?? [])
  existing.add(lessonId)
  const updated = Array.from(existing)
  store[courseSlug] = updated
  writeStore(store)
  void saveStudentProfile({
    ...getCachedStudentProfile(),
    progress: store,
  })
  return updated
}

export function isLessonCompleted(
  courseSlug: string,
  lessonId: string,
  defaultCompleted = false
): boolean {
  if (typeof window === "undefined") return defaultCompleted
  const ids = getCompletedLessonIds(courseSlug)
  if (ids.length > 0) return ids.includes(lessonId)
  return defaultCompleted
}
