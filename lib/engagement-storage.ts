import { getCachedStudentProfile, saveStudentProfile } from "@/lib/student-profile"

const STORAGE_KEY = "lumina-lms-engagement"

type EngagementStore = {
  reminders: Record<string, boolean>
  lastVisitDate?: string
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function readStore(): EngagementStore {
  if (typeof window === "undefined") return { reminders: {} }
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"reminders":{}}') as EngagementStore
  } catch {
    return { reminders: {} }
  }
}

function writeStore(store: EngagementStore) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getReminderStates() {
  return readStore().reminders
}

export function toggleReminder(id: string) {
  const store = readStore()
  const reminders = {
    ...store.reminders,
    [id]: !store.reminders[id],
  }
  writeStore({ ...store, reminders })
  return reminders
}

export function recordLearnerActivity() {
  const profile = getCachedStudentProfile()
  const currentDate = today()
  if (profile.streak.lastActiveDate === currentDate) return profile.streak

  const updatedStreak = {
    ...profile.streak,
    current: profile.streak.current + 1,
    lastActiveDate: currentDate,
  }

  void saveStudentProfile({
    ...profile,
    streak: updatedStreak,
  })

  writeStore({ ...readStore(), lastVisitDate: currentDate })
  return updatedStreak
}
