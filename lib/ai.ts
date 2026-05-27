import type { CourseDetail, CourseLesson, CourseModule } from "@/lib/course-data"
import type { StudentProfile } from "@/lib/student-profile"

export type LearningSection =
  | "explain_simplified"
  | "lesson_summary"
  | "revision_notes"
  | "mini_quiz"
  | "interview_questions"
  | "practical_applications"

export type MiniQuizQuestion = {
  id: string
  type: "multiple_choice" | "short_answer"
  question: string
  options?: string[]
  answer?: string
}

export type InterviewQuestion = {
  id: string
  question: string
  followUps?: string[]
}

export type PracticalApplication = {
  id: string
  title: string
  steps: string[]
  successCriteria?: string[]
}

export type LearningCoachResponse = {
  explainSimplified: string
  lessonSummary: string
  revisionNotes: string[]
  miniQuiz: {
    instructions: string
    questions: MiniQuizQuestion[]
  }
  interviewQuestions: {
    instructions: string
    questions: InterviewQuestion[]
  }
  practicalApplications: {
    instructions: string
    applications: PracticalApplication[]
  }
}

export type LearningCoachRequest = {
  course: Pick<CourseDetail, "title" | "provider" | "slug" | "aiInsights">
  module?: Pick<CourseModule, "id" | "title">
  lesson?: Pick<CourseLesson, "id" | "title">
  student: Pick<StudentProfile, "name" | "role" | "enrolledCourses" | "progress" | "assignments" | "streak">
  progress: {
    completedLessonIds: string[]
    completedCount: number
    courseLessonCount: number
    completionPercent: number
  }
  userQuery?: string
}

function safeString(v: unknown): string {
  if (typeof v === "string") return v
  if (v === null || v === undefined) return ""
  return String(v)
}

export function isGoogleApiKeyConfigured(): boolean {
  return Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
}

function buildSystemPrompt(): string {
  return [
    "You are Lumina LMS's real-time learning coach.",
    "You must respond with STRICT JSON matching the provided schema.",
    "You must tailor content to the given course, module, lesson, and student progress.",
    "Write in a clear, educational tone suitable for a student.",
    "Do not mention internal policy or schema constraints in the final content.",
  ].join(" ")
}

function buildLearningCoachPrompt(req: LearningCoachRequest): {
  system: string
  user: string
} {
  const courseTitle = req.course?.title ?? "Unknown course"
  const provider = req.course?.provider ?? "Unknown provider"
  const moduleTitle = req.module?.title ?? "(module not specified)"
  const lessonTitle = req.lesson?.title ?? "(lesson not specified)"

  const completedLessons = req.progress?.completedLessonIds ?? []
  const completionPercent = req.progress?.completionPercent ?? 0

  const studentProgressHint = completedLessons.length
    ? `Student has completed ${completedLessons.length} lessons so far (≈${completionPercent}% complete).`
    : `Student has not completed any lessons yet (≈0% complete).`

  const studentWeakHint = (() => {
    const assignments = req.student.assignments ?? {}
    // If any assignment looks pending, bias toward practical guidance.
    const hasPending = Object.values(assignments).some((s) => s === "pending")
    const hasSubmitted = Object.values(assignments).some((s) => s === "submitted" || s === "graded")
    if (hasSubmitted && !hasPending) return "Focus on consolidation and interview readiness."
    if (hasPending) return "Focus on actionable learning steps and practical mastery."
    return "Focus on understanding the key concepts and strengthening weak areas."
  })()

  const userQuery = safeString(req.userQuery).trim()
  const queryLine = userQuery ? `Student asked: ${userQuery}` : "Student asked for standard learning help from the LMS coach."

  const fallbackConcept = req.course.aiInsights?.conceptExplanation

  const user = [
    "Return a LearningCoachResponse for the active LMS context.",
    queryLine,
    "",
    "ACTIVE CONTEXT:",
    `- Course: ${courseTitle}`,
    `- Provider: ${provider}`,
    `- Module: ${moduleTitle}`,
    `- Lesson: ${lessonTitle}`,
    "",
    "STUDENT CONTEXT:",
    `- Student name: ${req.student.name}`,
    `- Student role: ${req.student.role}`,
    `- ${studentProgressHint}`,
    `- Learning preference hint: ${studentWeakHint}`,
    "",
    "CONTENT REQUIREMENTS:",
    "- Explain Simply: 3-6 sentences max. No bullet spam.",
    "- Lesson Summary: 5-9 sentences, explicitly referencing the lesson title.",
    "- Revision Notes: 5-9 short bullets; include at least one 'common mistake' and one 'memory hook'.",
    "- Mini Quiz: 2-4 questions. Mix multiple choice and short answer when appropriate.",
    "- Interview Questions: 2-3 questions + optional follow-ups.",
    "- Practical Applications: 1-2 mini projects with steps + success criteria.",
    "",
    `If needed, use this course baseline concept as a reference (may be outdated but keep it aligned): ${fallbackConcept ?? ""}`,
  ].join("\n")

  return { system: buildSystemPrompt(), user }
}

function fallbackResponse(req: LearningCoachRequest): LearningCoachResponse {
  const courseTitle = req.course.title
  const moduleTitle = req.module?.title
  const lessonTitle = req.lesson?.title
  const completionPercent = req.progress.completionPercent

  return {
    explainSimplified: [
      `Here’s a simple explanation for your active lesson: ${lessonTitle ?? "(lesson)"}.`,
      `This fits into the ${moduleTitle ?? "module"} part of ${courseTitle} provided by ${req.course.provider}.`,
      `Based on your progress (~${Math.round(completionPercent)}% complete), focus on the core idea first, then connect it to how you’ll use it.`,
    ].join(" "),
    lessonSummary: [
      `Lesson focus: ${lessonTitle ?? "(lesson not specified)"}.`,
      "You’ll learn the key idea, understand why it matters, and practice it through revision and application.",
      "As you revisit, pay attention to the most common mistakes and the conditions under which the concept works best.",
      "Finally, use the mini quiz to check understanding and the practical application to make it real.",
    ].join(" "),
    revisionNotes: [
      "Define the core concept in one sentence.",
      "Explain why it works (the 'reason', not just the 'steps').",
      "Name one common mistake learners make and how to avoid it.",
      "Use a quick memory hook (analogy, formula, or checklist).",
      "Try a small example and check your result.",
    ],
    miniQuiz: {
      instructions: "Answer briefly. If unsure, revisit the lesson notes before you answer.",
      questions: [
        {
          id: "q1",
          type: "short_answer",
          question: `What is the main takeaway from: ${lessonTitle ?? "your lesson"}?`,
          answer: undefined,
        },
        {
          id: "q2",
          type: "multiple_choice",
          question: "Which approach best helps you revise effectively?",
          options: [
            "Reread only once, without checking mistakes",
            "Summarize + create 1 example + test with a quiz",
            "Memorize terms but skip understanding",
            "Practice only at the end",
          ],
        },
      ],
    },
    interviewQuestions: {
      instructions: "Think like you’re explaining to a teammate.",
      questions: [
        {
          id: "iq1",
          question: `How would you explain ${lessonTitle ?? "this lesson"} to a beginner using a real-world analogy?`,
          followUps: [
            "What would you do if they misunderstand the key part?",
            "What is one situation where this concept does NOT apply?",
          ],
        },
      ],
    },
    practicalApplications: {
      instructions: "Use this as a quick practice sprint (15–30 min).",
      applications: [
        {
          id: "pa1",
          title: `Mini project: Apply ${lessonTitle ?? "the lesson concept"}`,
          steps: [
            "Write a 5-sentence summary in your own words.",
            "Create one simple example or scenario that uses the concept.",
            "List 2 common mistakes and how you’d detect them in your example.",
            "Answer the mini quiz questions to verify your understanding.",
          ],
          successCriteria: [
            "Your example is correct and explains why",
            "You can identify at least one common mistake",
            "You can teach it back in 30–60 seconds",
          ],
        },
      ],
    },
  }
}

export async function generateLearningCoachResponse(
  req: LearningCoachRequest
): Promise<{ data: LearningCoachResponse; source: "gemini" | "fallback" }> {
  if (!isGoogleApiKeyConfigured()) {
    return { data: fallbackResponse(req), source: "fallback" }
  }

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  // Using Google AI Studio REST API.
  // Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=...
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

  const { system, user } = buildLearningCoachPrompt(req)

  const body = {
    systemInstruction: { role: "system", parts: [{ text: system }] },
    contents: [
      {
        role: "user",
        parts: [{ text: user }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      maxOutputTokens: 900,
    },
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return { data: fallbackResponse(req), source: "fallback" }
  }

  const json = (await res.json()) as unknown
  
  // Expected Gemini response shape; we only access optional fields.

  const text = (json as any)?.candidates?.[0]?.content?.parts?.[0]?.text


  if (typeof text !== "string" || !text.trim()) {
    return { data: fallbackResponse(req), source: "fallback" }
  }

  try {
    // Model should return strict JSON; attempt direct parse.
    const parsed = JSON.parse(text)
    return { data: parsed as LearningCoachResponse, source: "gemini" }
  } catch {
    // If model returns wrapped text, try to extract JSON.
    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      const parsed = JSON.parse(match[0])
      return { data: parsed as LearningCoachResponse, source: "gemini" }
    }
    return { data: fallbackResponse(req), source: "fallback" }
  }
}

