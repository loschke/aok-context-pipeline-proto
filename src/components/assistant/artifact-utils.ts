/**
 * Extract a title from markdown content.
 * Uses the first heading (any level) or falls back to the first non-empty line.
 * Truncated to 60 characters.
 */
export function extractArtifactTitle(content: string): string {
  const lines = content.split("\n")

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // Match markdown headings: # Title, ## Title, etc.
    const headingMatch = trimmed.match(/^#{1,6}\s+(.+)$/)
    if (headingMatch) {
      const title = headingMatch[1].trim()
      return title.length > 60 ? title.slice(0, 57) + "..." : title
    }

    // First non-empty line as fallback
    return trimmed.length > 60 ? trimmed.slice(0, 57) + "..." : trimmed
  }

  return "Artifact"
}

/**
 * Extract a short summary for the chat bubble when canvas mode is active.
 * Skips headings, takes the first paragraph, cuts at sentence boundaries.
 */
export function extractChatSummary(content: string, maxLength = 300): string {
  const lines = content.split("\n")
  const bodyLines: string[] = []
  let foundBody = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!foundBody && !trimmed) continue
    if (!foundBody && /^#{1,6}\s+/.test(trimmed)) continue
    if (trimmed.startsWith("```")) break
    if (foundBody && !trimmed) break
    foundBody = true
    bodyLines.push(trimmed)
  }

  let summary = bodyLines.join(" ")

  if (!summary) {
    for (const line of lines) {
      const match = line.trim().match(/^#{1,6}\s+(.+)$/)
      if (match) {
        summary = match[1].trim()
        break
      }
    }
  }

  if (!summary) summary = content.trim().slice(0, maxLength)
  if (summary.length <= maxLength) return summary

  const truncated = summary.slice(0, maxLength)
  const sentenceEnd = Math.max(
    truncated.lastIndexOf(". "),
    truncated.lastIndexOf("! "),
    truncated.lastIndexOf("? ")
  )

  if (sentenceEnd > maxLength * 0.4) {
    return truncated.slice(0, sentenceEnd + 1) + " ..."
  }

  const lastSpace = truncated.lastIndexOf(" ")
  if (lastSpace > maxLength * 0.4) {
    return truncated.slice(0, lastSpace) + " ..."
  }

  return truncated + "..."
}

/**
 * Extract a preview snippet from markdown content.
 * Skips headings and returns the first body text, max 120 characters.
 */
export function extractArtifactPreview(content: string): string {
  const lines = content.split("\n")

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    // Skip headings
    if (/^#{1,6}\s+/.test(trimmed)) continue
    // Skip code fences
    if (trimmed.startsWith("```")) continue

    return trimmed.length > 120 ? trimmed.slice(0, 117) + "..." : trimmed
  }

  return ""
}
