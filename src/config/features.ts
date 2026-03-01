export const features = {
  chat: {
    enabled: process.env.NEXT_PUBLIC_CHAT_ENABLED !== "false",
  },
  assistant: {
    enabled: process.env.NEXT_PUBLIC_ASSISTANT_ENABLED !== "false",
  },
  mermaid: {
    enabled: process.env.NEXT_PUBLIC_MERMAID_ENABLED !== "false",
  },
  web: {
    enabled: !!process.env.FIRECRAWL_API_KEY,
  },
  storage: {
    enabled: !!process.env.R2_ACCESS_KEY_ID,
  },
} as const
