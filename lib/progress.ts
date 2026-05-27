import type { CourseDetail } from "@/lib/course-data"
import type { AssignmentProgress } from "@/lib/student-profile"

export function computeLearningProgress(
  course: CourseDetail,
  completedLessonIds: string[],
  assignmentProgress: AssignmentProgress = {}
): number {
  const lessonUnits = course.modules.flatMap((module) => module.lessons).length
  const assignmentUnits = course.assignments.length
  const totalUnits = lessonUnits + assignmentUnits
  if (totalUnits === 0) return 0

  const submittedAssignments = course.assignments.filter((assignment) => {
    const status = assignmentProgress[assignment.id] ?? assignment.status
    return status === "submitted" || status === "graded"
  }).length

  return Math.round(((completedLessonIds.length + submittedAssignments) / totalUnits) * 100)
}
