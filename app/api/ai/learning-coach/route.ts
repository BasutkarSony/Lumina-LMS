import { NextResponse } from "next/server"
import { generateLearningCoachResponse, type LearningCoachRequest } from "@/lib/ai"

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LearningCoachRequest

    // Basic minimal validation (keep lightweight)
    if (!body?.course?.title) {
      return NextResponse.json(
        { error: "Missing course context" },
        { status: 400 }
      )
    }

    const { data, source } = await generateLearningCoachResponse(body)

    return NextResponse.json({ data, source }, { status: 200 })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : undefined

    // Never leak internals to client.
    return NextResponse.json(
      {
        error: "Failed to generate learning coach response",
        detail: typeof message === "string" ? message : undefined,

      },
      { status: 500 }
    )
  }
}

