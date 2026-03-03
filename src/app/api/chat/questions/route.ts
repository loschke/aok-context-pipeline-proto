import { NextRequest } from "next/server"

import { features } from "@/config/features"
import { chatConfig } from "@/config/chat"
import { getUser } from "@/lib/auth"
import { loadQuestions } from "@/lib/chat/load-questions"

export async function GET(req: NextRequest) {
  if (!features.chat.enabled) {
    return Response.json([])
  }

  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const moduleSlug = req.nextUrl.searchParams.get("module")
  if (!moduleSlug || !/^[a-z0-9-]+$/.test(moduleSlug)) {
    return Response.json([])
  }

  const questions = await loadQuestions(chatConfig.guidePath, moduleSlug)
  return Response.json(questions)
}
