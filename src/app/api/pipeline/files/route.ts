import { NextRequest } from "next/server"

import { getUser } from "@/lib/auth"
import { readPipelineFile } from "@/lib/pipeline"

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const filePath = req.nextUrl.searchParams.get("path")
  if (!filePath) {
    return new Response("Missing path parameter", { status: 400 })
  }

  // Path traversal protection: no "..", must end with .md, only safe chars
  if (
    filePath.includes("..") ||
    !filePath.endsWith(".md") ||
    !/^[a-z0-9/_.-]+$/.test(filePath)
  ) {
    return new Response("Invalid path", { status: 400 })
  }

  try {
    const content = await readPipelineFile(filePath)
    return new Response(content, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    })
  } catch {
    return new Response("File not found", { status: 404 })
  }
}
