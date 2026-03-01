"use client"

import type { UIMessage, ChatStatus } from "ai"

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"
import {
  Attachments,
  Attachment,
  AttachmentPreview,
  AttachmentInfo,
} from "@/components/ai-elements/attachments"
import { getStatusBadge, type ToolPart } from "./tool"
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "./reasoning"
import type { ExpertConfig } from "@/lib/assistant/types"
import { ArtifactCard } from "./artifact-card"
import {
  extractArtifactTitle,
  extractArtifactPreview,
  extractChatSummary,
} from "./artifact-utils"

const WEB_TOOL_LABELS: Record<string, string> = {
  web_search: "Websuche",
  web_fetch: "Seite abrufen",
}

interface AssistantMessagesProps {
  messages: UIMessage[]
  turnExperts: string[]
  turnCanvas: boolean[]
  turnThinking: boolean[]
  expertsMap: Map<string, ExpertConfig>
  currentExpert: ExpertConfig | undefined
  status: ChatStatus
  activeArtifactMessageId: string | null
  onOpenArtifact: (messageId: string, content: string) => void
}

export function AssistantMessages({
  messages,
  turnExperts,
  turnCanvas,
  turnThinking,
  expertsMap,
  currentExpert,
  status,
  activeArtifactMessageId,
  onOpenArtifact,
}: AssistantMessagesProps) {
  // Build a turn index as we iterate: each user message increments it
  let turnIndex = -1

  return (
    <>
      {messages.map((message) => {
        const isUser = message.role === "user"
        if (isUser) turnIndex++

        // For assistant messages, look up the expert that was active for this turn
        const turnExpertSlug = turnExperts[turnIndex]
        const turnExpert = turnExpertSlug
          ? expertsMap.get(turnExpertSlug)
          : currentExpert

        const textContent =
          message.parts
            ?.filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("") ?? ""
        const fileParts = isUser
          ? message.parts?.filter((part) => part.type === "file") ?? []
          : []

        return (
          <Message from={message.role} key={message.id}>
            {!isUser && turnExpert && (
              <div className="bg-primary/10 flex size-7 shrink-0 items-center justify-center rounded-full text-sm">
                {turnExpert.emoji}
              </div>
            )}
            <MessageContent>
              {isUser ? (
                <>
                  {fileParts.length > 0 && (
                    <Attachments variant="inline">
                      {fileParts.map((part, i) => (
                        <Attachment
                          key={`${message.id}-file-${i}`}
                          data={{
                            ...part,
                            id: `${message.id}-file-${i}`,
                          }}
                        >
                          <AttachmentPreview />
                          <AttachmentInfo />
                        </Attachment>
                      ))}
                    </Attachments>
                  )}
                  {textContent && (
                    <p className="whitespace-pre-wrap">{textContent}</p>
                  )}
                </>
              ) : turnCanvas[turnIndex] ? (
                <>
                  <MessageResponse className="chat-prose">
                    {extractChatSummary(textContent)}
                  </MessageResponse>
                  <ArtifactCard
                    title={extractArtifactTitle(textContent)}
                    preview={extractArtifactPreview(textContent)}
                    isActive={activeArtifactMessageId === message.id}
                    onClick={() => onOpenArtifact(message.id, textContent)}
                  />
                </>
              ) : (
                <>
                  {turnThinking[turnIndex] && (() => {
                    const reasoningParts = message.parts?.filter(
                      (p) => p.type === "reasoning"
                    ) ?? []
                    const reasoningText = reasoningParts
                      .map((p) => (p as { type: "reasoning"; text: string }).text)
                      .join("\n\n")
                    if (!reasoningText) return null
                    const isLastMsg =
                      message.id === messages[messages.length - 1]?.id
                    const lastPart = message.parts?.[message.parts.length - 1]
                    const isReasoningStreaming =
                      status === "streaming" &&
                      isLastMsg &&
                      lastPart?.type === "reasoning"
                    return (
                      <Reasoning isStreaming={isReasoningStreaming}>
                        <ReasoningTrigger />
                        <ReasoningContent>{reasoningText}</ReasoningContent>
                      </Reasoning>
                    )
                  })()}
                  {message.parts?.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <MessageResponse
                          key={`${message.id}-${i}`}
                          className="chat-prose"
                          isAnimating={
                            status === "streaming" &&
                            message.id === messages[messages.length - 1]?.id
                          }
                        >
                          {part.text}
                        </MessageResponse>
                      )
                    }

                    if (part.type.startsWith("tool-")) {
                      const toolPart = part as unknown as ToolPart
                      const toolName = part.type.slice(5)
                      return (
                        <div
                          key={`${message.id}-tool-${i}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span>{WEB_TOOL_LABELS[toolName] ?? toolName}</span>
                          {getStatusBadge(toolPart.state)}
                        </div>
                      )
                    }

                    if (part.type === "reasoning") return null

                    return null
                  })}
                </>
              )}
            </MessageContent>
          </Message>
        )
      })}
      {status === "submitted" &&
        messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-2">
            <div className="bg-primary/10 flex size-7 shrink-0 items-center justify-center rounded-full text-sm">
              {currentExpert?.emoji}
            </div>
            <div className="bg-muted flex items-center gap-1 rounded-2xl rounded-bl-md px-4 py-3">
              <span className="bg-muted-foreground/40 size-1.5 animate-bounce rounded-full [animation-delay:0ms]" />
              <span className="bg-muted-foreground/40 size-1.5 animate-bounce rounded-full [animation-delay:150ms]" />
              <span className="bg-muted-foreground/40 size-1.5 animate-bounce rounded-full [animation-delay:300ms]" />
            </div>
          </div>
        )}
    </>
  )
}
