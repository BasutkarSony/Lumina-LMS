import { courses, getAllLessons, computeProgressPercent } from "@/lib/course-data"

export type CourseCategory = "AIML" | "Full Stack"
export type CourseDifficulty = "Beginner" | "Intermediate" | "Advanced"

export type EnrolledCourse = {
  id: string
  slug: string
  title: string
  instructor: string
  category: CourseCategory
  difficulty: CourseDifficulty
  lessonCount: number
  duration: string
  progress: number
  coverImage: string
  imageAlt: string
  currentLesson: {
    title: string
    description: string
    lessonNumber: number
  }
  nextLessonTitle: string
  aiSummary: {
    overview: string
    keyConcepts: string[]
    revisionPoints: string[]
    practiceQuestions: string[]
  }
}

function buildEnrolledCourse(
  slug: string,
  id: string,
  progress: number,
  defaultCompletedIds: string[]
): EnrolledCourse {
  const course = courses.find((c) => c.slug === slug)!
  const lessons = getAllLessons(course)
  const completedCount = defaultCompletedIds.length
  const currentIndex = Math.min(completedCount, lessons.length - 1)
  const current = lessons[currentIndex]
  const next = lessons[currentIndex + 1]

  return {
    id,
    slug: course.slug,
    title: course.title,
    instructor: `Provider: ${course.provider}`,
    category: course.category,
    difficulty: course.difficulty,
    lessonCount: lessons.length,
    duration: course.duration,
    progress: progress || computeProgressPercent(course, defaultCompletedIds),
    coverImage: course.coverImage,
    imageAlt: course.imageAlt,
    currentLesson: {
      title: current?.title ?? "Getting started",
      description: course.description,
      lessonNumber: currentIndex + 1,
    },
    nextLessonTitle: next?.title ?? "Course complete",
    aiSummary: {
      overview: course.aiInsights.summary,
      keyConcepts: [course.aiInsights.conceptExplanation],
      revisionPoints: [course.aiInsights.revisionSuggestion],
      practiceQuestions: [course.aiInsights.weakTopicSuggestion],
    },
  }
}

export const enrolledCourses: EnrolledCourse[] = [
  buildEnrolledCourse("deep-learning-fundamentals", "dl-fundamentals", 0, [
    "dl-l1",
    "dl-l2",
  ]),
  buildEnrolledCourse("natural-language-processing", "nlp-transformers", 0, [
    "nlp-l1",
    "nlp-l2",
  ]),
  buildEnrolledCourse("computer-vision-cnns", "computer-vision", 0, []),
  buildEnrolledCourse("full-stack-react-nextjs", "react-nextjs", 0, [
    "fs-l1",
    "fs-l2",
    "fs-l3",
    "fs-l4",
  ]),
]
