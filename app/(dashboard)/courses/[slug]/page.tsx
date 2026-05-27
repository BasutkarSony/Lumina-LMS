import { notFound } from "next/navigation"
import { getCourseBySlug } from "@/lib/course-data"
import { CourseDetailPage } from "@/components/course/course-detail-page"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CourseSlugPage({ params }: PageProps) {
  const { slug } = await params
  const course = getCourseBySlug(slug)
  if (!course) notFound()
  return <CourseDetailPage course={course} />
}
