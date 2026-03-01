import { aiDefaults } from "./ai"

export const chatConfig = {
  ...aiDefaults,
  /** Maximale Output-Tokens pro Antwort */
  maxTokens: 1024,
  /** Welcher Guide aus src/content/guides/ geladen wird */
  guidePath: "sava-pipeline",
  /** Name des Experten im Chat-Panel Header */
  expertName: "Pipeline-Assistent",
  /** Emoji des Experten im Chat-Panel Header */
  expertEmoji: "🏗️",
} as const
