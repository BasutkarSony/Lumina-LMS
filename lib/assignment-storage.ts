import {
  getCachedStudentProfile,
  saveStudentProfile,
  type AssignmentProgress,
} from "@/lib/student-profile"

const STORAGE_KEY = "lumina-lms-assignment-progress"

function readStore(): AssignmentProgress {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as AssignmentProgress
  } catch {
    return {}
  }
}

function writeStore(store: AssignmentProgress) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getAssignmentProgress(): AssignmentProgress {
  return {
    ...readStore(),
    ...getCachedStudentProfile().assignments,
  }
}

export function markAssignmentSubmitted(assignmentId: string): AssignmentProgress {
  const store = {
    ...getAssignmentProgress(),
    [assignmentId]: "submitted" as const,
  }
  writeStore(store)
  void saveStudentProfile({
    ...getCachedStudentProfile(),
    assignments: store,
  })
  return store
}
