import { NextRequest } from "next/server"

import { getUser } from "@/lib/auth"
import { readClusterFile, writeClusterFile } from "@/lib/pipeline/files-cluster"

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const filePath = req.nextUrl.searchParams.get("path")
  if (!filePath) {
    return new Response("Missing path parameter", { status: 400 })
  }

  if (
    filePath.includes("..") ||
    !filePath.endsWith(".md") ||
    !/^[a-z0-9/_.-]+$/.test(filePath)
  ) {
    return new Response("Invalid path", { status: 400 })
  }

  try {
    const content = await readClusterFile(filePath)
    return new Response(content, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    })
  } catch {
    return new Response("File not found", { status: 404 })
  }
}

export async function PUT(req: NextRequest) {
  const user = await getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const filePath = req.nextUrl.searchParams.get("path")
  if (!filePath) {
    return new Response("Missing path parameter", { status: 400 })
  }

  if (
    filePath.includes("..") ||
    !filePath.endsWith(".md") ||
    !/^[a-z0-9/_.-]+$/.test(filePath)
  ) {
    return new Response("Invalid path", { status: 400 })
  }

  const content = await req.text()
  if (!content) {
    return new Response("Empty content", { status: 400 })
  }

  try {
    await writeClusterFile(filePath, content)
    return new Response("OK", { status: 200 })
  } catch {
    return new Response("Failed to save file", { status: 500 })
  }
}
