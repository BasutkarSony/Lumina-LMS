import { notFound } from "next/navigation"
import { getCourseBySlug, getLessonById } from "@/lib/course-data"
import { LessonPage } from "@/components/course/lesson-page"

interface PageProps {
  params: Promise<{ slug: string; lessonId: string }>
}

export default async function CourseLessonPage({ params }: PageProps) {
  const { slug, lessonId } = await params
  const course = getCourseBySlug(slug)
  if (!course) notFound()
  const lesson = getLessonById(course, lessonId)
  if (!lesson) notFound()
  return <LessonPage course={course} lesson={lesson} />
}
