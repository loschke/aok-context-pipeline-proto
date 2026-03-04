export interface ModelConfig {
  /** Gateway ID, e.g. "anthropic/claude-sonnet-4-6" */
  id: string
  /** Display name shown in UI */
  name: string
  /** Provider slug for ModelSelectorLogo (resolves to models.dev logo) */
  provider: string
  /** Human-readable provider label for grouping */
  providerLabel: string
  /** Whether the model supports extended thinking */
  supportsThinking: boolean
  /** Whether the model supports Anthropic-specific tools (web_search, web_fetch) */
  supportsAnthropicTools: boolean
}

export const MODELS: ModelConfig[] = [
  {
    id: "meta/llama-3.3-70b",
    name: "Llama 3.3 70B",
    provider: "llama",
    providerLabel: "Meta",
    supportsThinking: false,
    supportsAnthropicTools: false,
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT OSS 120B",
    provider: "openai",
    providerLabel: "OpenAI",
    supportsThinking: false,
    supportsAnthropicTools: false,
  },
  {
    id: "mistral/mistral-large-3",
    name: "Mistral Large 3",
    provider: "mistral",
    providerLabel: "Mistral",
    supportsThinking: false,
    supportsAnthropicTools: false,
  },
  {
    id: "anthropic/claude-opus-4.6",
    name: "Claude Opus 4.6",
    provider: "anthropic",
    providerLabel: "Anthropic",
    supportsThinking: true,
    supportsAnthropicTools: true,
  },
  {
    id: "anthropic/claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "anthropic",
    providerLabel: "Anthropic",
    supportsThinking: false,
    supportsAnthropicTools: true,
  },
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    provider: "anthropic",
    providerLabel: "Anthropic",
    supportsThinking: false,
    supportsAnthropicTools: true,
  },
]

export const ALLOWED_MODEL_IDS = new Set(MODELS.map((m) => m.id))

export const DEFAULT_MODEL_ID = "anthropic/claude-sonnet-4-6"

export function getModelConfig(id: string): ModelConfig | undefined {
  return MODELS.find((m) => m.id === id)
}
