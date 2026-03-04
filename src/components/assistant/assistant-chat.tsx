"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Plus, PanelRight, BrainCircuit, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputHeader,
  PromptInputFooter,
  PromptInputButton,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input"
import type { ExpertConfig } from "@/lib/assistant/types"
import { assistantConfig } from "@/config/assistants"
import { DEFAULT_MODEL_ID, getModelConfig } from "@/config/models"
import { ExpertPicker } from "./expert-picker"
import { ModelPicker } from "./model-picker"
import { ArtifactPanel } from "./artifact-panel"
import { extractArtifactTitle } from "./artifact-utils"
import { AssistantMessages } from "./assistant-messages"
import { AssistantSuggestions } from "./assistant-suggestions"
import { UploadButton, AttachmentPreviews } from "./assistant-input-helpers"

const MAX_MESSAGES_PER_SESSION = 50
const DESKTOP_BREAKPOINT = 1024

interface ArtifactState {
  messageId: string
  title: string
  content: string
  isOpen: boolean
}

interface AssistantChatProps {
  experts: ExpertConfig[]
  initialExpert?: string
}

export function AssistantChat({ experts, initialExpert }: AssistantChatProps) {
  const resolvedInitial = initialExpert && experts.some((e) => e.slug === initialExpert)
    ? initialExpert
    : assistantConfig.defaultExpert
  const [expertSlug, setExpertSlug] = useState<string>(resolvedInitial)
  const [input, setInput] = useState("")
  const [messageCount, setMessageCount] = useState(0)
  const [artifact, setArtifact] = useState<ArtifactState | null>(null)

  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL_ID)
  const [canvasMode, setCanvasMode] = useState(false)
  const [thinkingMode, setThinkingMode] = useState(false)

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    check()
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    mql.addEventListener("change", check)
    return () => mql.removeEventListener("change", check)
  }, [])

  // Per-turn tracking: index = turn number
  const [turnExperts, setTurnExperts] = useState<string[]>([])
  const [turnModels, setTurnModels] = useState<string[]>([])
  const [turnCanvas, setTurnCanvas] = useState<boolean[]>([])
  const [turnThinking, setTurnThinking] = useState<boolean[]>([])

  const currentExpert = experts.find((e) => e.slug === expertSlug) ?? experts[0]
  const isNonDefault = expertSlug !== assistantConfig.defaultExpert

  // Stable map for quick expert lookup by slug
  const expertsMap = useMemo(() => {
    const map = new Map<string, ExpertConfig>()
    for (const e of experts) map.set(e.slug, e)
    return map
  }, [experts])

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/assistant/chat",
      }),
    []
  )

  const { messages, sendMessage, status, setMessages, stop } = useChat({
    transport,
    id: "assistant",
  })

  const handleExpertChange = useCallback((slug: string) => {
    setExpertSlug(slug)
  }, [])

  const handleResetExpert = useCallback(() => {
    setExpertSlug(assistantConfig.defaultExpert)
  }, [])

  const handleNewChat = useCallback(() => {
    setMessages([])
    setMessageCount(0)
    setInput("")
    setArtifact(null)
    setTurnExperts([])
    setTurnModels([])
    setTurnCanvas([])
    setTurnThinking([])
    setCanvasMode(false)
    setThinkingMode(false)
    setSelectedModelId(DEFAULT_MODEL_ID)
    setExpertSlug(assistantConfig.defaultExpert)
  }, [setMessages])

  // Ref to capture expertSlug at the moment of sending
  const expertSlugRef = useRef(expertSlug)
  expertSlugRef.current = expertSlug

  const selectedModelIdRef = useRef(selectedModelId)
  selectedModelIdRef.current = selectedModelId

  const canvasModeRef = useRef(canvasMode)
  canvasModeRef.current = canvasMode

  const thinkingModeRef = useRef(thinkingMode)
  thinkingModeRef.current = thinkingMode

  const handleModelChange = useCallback((modelId: string) => {
    setSelectedModelId(modelId)
    const config = getModelConfig(modelId)
    if (!config?.supportsThinking) {
      setThinkingMode(false)
    }
  }, [])

  const handleSuggestionSelect = useCallback(
    (text: string) => {
      const slug = expertSlugRef.current
      const modelId = selectedModelIdRef.current
      const canvas = canvasModeRef.current
      const thinking = thinkingModeRef.current
      setMessageCount((prev) => prev + 1)
      setTurnExperts((prev) => [...prev, slug])
      setTurnModels((prev) => [...prev, modelId])
      setTurnCanvas((prev) => [...prev, canvas])
      setTurnThinking((prev) => [...prev, thinking])
      sendMessage({ text }, { body: { expertSlug: slug, thinking, model: modelId } })
    },
    [sendMessage]
  )

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const hasText = message.text.trim().length > 0
      const hasFiles = message.files.length > 0
      if ((hasText || hasFiles) && messageCount < MAX_MESSAGES_PER_SESSION) {
        const slug = expertSlugRef.current
        const modelId = selectedModelIdRef.current
        const canvas = canvasModeRef.current
        const thinking = thinkingModeRef.current
        setMessageCount((prev) => prev + 1)
        setTurnExperts((prev) => [...prev, slug])
        setTurnModels((prev) => [...prev, modelId])
        setTurnCanvas((prev) => [...prev, canvas])
        setTurnThinking((prev) => [...prev, thinking])
        sendMessage(
          { text: message.text, files: message.files },
          { body: { expertSlug: slug, thinking, model: modelId } }
        )
        setInput("")
      }
    },
    [messageCount, sendMessage]
  )

  const handleOpenArtifact = useCallback(
    (messageId: string, content: string) => {
      setArtifact({
        messageId,
        title: extractArtifactTitle(content),
        content,
        isOpen: true,
      })
    },
    []
  )

  const handleCloseArtifact = useCallback(() => {
    setArtifact((prev) => (prev ? { ...prev, isOpen: false } : null))
  }, [])

  // Auto-open artifact panel when canvas mode is active for the current turn
  useEffect(() => {
    if (status !== "streaming") return
    if (!turnCanvas[turnCanvas.length - 1]) return
    const lastMsg = messages[messages.length - 1]
    if (!lastMsg || lastMsg.role !== "assistant") return

    const textContent =
      lastMsg.parts
        ?.filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("") ?? ""
    if (!textContent) return

    if (!artifact || artifact.messageId !== lastMsg.id) {
      setArtifact({
        messageId: lastMsg.id,
        title: extractArtifactTitle(textContent),
        content: textContent,
        isOpen: true,
      })
    }
  }, [status, messages, turnCanvas, artifact])

  // Sync artifact content while panel is open (during and after streaming)
  useEffect(() => {
    if (!artifact?.isOpen) return
    const msg = messages.find((m) => m.id === artifact.messageId)
    if (!msg) return

    const textContent =
      msg.parts
        ?.filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("") ?? ""

    if (textContent && textContent !== artifact.content) {
      setArtifact((prev) =>
        prev
          ? {
              ...prev,
              title: extractArtifactTitle(textContent),
              content: textContent,
            }
          : null
      )
    }
  }, [messages, artifact])

  const isLimitReached = messageCount >= MAX_MESSAGES_PER_SESSION

  return (
    <div
      className={cn(
        "grid h-full w-full transition-[grid-template-columns] duration-300 ease-in-out",
        isDesktop && artifact?.isOpen ? "grid-cols-2" : "grid-cols-1"
      )}
    >
      {/* Chat-Bereich */}
      <div className="flex min-w-0 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentExpert?.emoji}</span>
            <span className="text-sm font-semibold">
              {currentExpert?.name}
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="gap-1.5"
          >
            <Plus className="size-3.5" />
            Neuer Chat
          </Button>
        </div>

        {/* Messages */}
        <Conversation className="flex-1">
          <ConversationContent
            className={cn(
              "mx-auto w-full gap-6 p-6",
              isDesktop && artifact?.isOpen ? "max-w-none px-8" : "max-w-3xl"
            )}
          >
            {messages.length === 0 && currentExpert ? (
              <div className="flex flex-1 flex-col">
                <div className="flex-1" />
                <AssistantSuggestions
                  expert={currentExpert}
                  onSelect={handleSuggestionSelect}
                />
              </div>
            ) : (
              <AssistantMessages
                messages={messages}
                turnExperts={turnExperts}
                turnModels={turnModels}
                turnCanvas={turnCanvas}
                turnThinking={turnThinking}
                expertsMap={expertsMap}
                currentExpert={currentExpert}
                status={status}
                activeArtifactMessageId={artifact?.isOpen ? artifact.messageId : null}
                onOpenArtifact={handleOpenArtifact}
              />
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Input */}
        <div className={cn(
          "mx-auto w-full pb-6",
          isDesktop && artifact?.isOpen ? "max-w-none px-8" : "max-w-3xl px-6"
        )}>
          {isLimitReached ? (
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground text-center text-sm">
                Du hast das Limit fuer diese Sitzung erreicht.
              </p>
            </div>
          ) : (
            <PromptInput
              onSubmit={handleSubmit}
              accept={assistantConfig.upload.accept}
              multiple
              maxFiles={assistantConfig.upload.maxFiles}
              maxFileSize={assistantConfig.upload.maxFileSize}
              className="rounded-lg border shadow-sm"
            >
              <AttachmentPreviews />
              {isNonDefault && currentExpert && (
                <PromptInputHeader>
                  <Badge
                    variant="secondary"
                    className="gap-1.5 border-primary/20 bg-primary/10 text-primary pl-2 pr-1"
                  >
                    <span>{currentExpert.emoji}</span>
                    <span>@{currentExpert.name}</span>
                    <button
                      type="button"
                      className="hover:bg-primary/20 ml-0.5 rounded-full p-0.5 transition-colors"
                      onClick={handleResetExpert}
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                </PromptInputHeader>
              )}
              <PromptInputTextarea
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                placeholder="Nachricht an den Assistenten..."
                maxLength={2000}
              />
              <PromptInputFooter>
                <div className="flex items-center gap-1">
                  <UploadButton />
                  <PromptInputButton
                    tooltip={canvasMode ? "Canvas deaktivieren" : "In Canvas oeffnen"}
                    onClick={() => setCanvasMode((prev) => !prev)}
                    className={canvasMode ? "bg-primary/10 text-primary" : ""}
                  >
                    <PanelRight className="size-4" />
                  </PromptInputButton>
                  {getModelConfig(selectedModelId)?.supportsThinking && (
                    <PromptInputButton
                      tooltip={thinkingMode ? "Thinking deaktivieren" : "Thinking aktivieren"}
                      onClick={() => setThinkingMode((prev) => !prev)}
                      className={thinkingMode ? "bg-primary/10 text-primary" : ""}
                    >
                      <BrainCircuit className="size-4" />
                    </PromptInputButton>
                  )}
                  <ModelPicker
                    selectedModelId={selectedModelId}
                    onSelect={handleModelChange}
                  />
                  <ExpertPicker
                    experts={experts}
                    onSelect={handleExpertChange}
                  />
                </div>
                <PromptInputSubmit
                  status={status}
                  onStop={stop}
                  disabled={!input.trim() || isLimitReached}
                />
              </PromptInputFooter>
            </PromptInput>
          )}
        </div>
      </div>

      {/* Artifact-Panel: Desktop inline im Grid */}
      {isDesktop && artifact?.isOpen && (
        <div className="overflow-hidden border-l">
          <ArtifactPanel
            content={artifact.content}
            title={artifact.title}
            isStreaming={
              status === "streaming" &&
              artifact.messageId === messages[messages.length - 1]?.id
            }
            onClose={handleCloseArtifact}
          />
        </div>
      )}

      {/* Artifact-Panel: Mobile/Tablet als Sheet-Overlay */}
      {!isDesktop && artifact !== null && (
        <Sheet open={artifact.isOpen} onOpenChange={(open) => !open && handleCloseArtifact()}>
          <SheetContent side="right" showCloseButton={false} className="w-[85vw] max-w-[480px] p-0 sm:max-w-none">
            <SheetTitle className="sr-only">{artifact.title}</SheetTitle>
            <ArtifactPanel
              content={artifact.content}
              title={artifact.title}
              isStreaming={
                status === "streaming" &&
                artifact.messageId === messages[messages.length - 1]?.id
              }
              onClose={handleCloseArtifact}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
