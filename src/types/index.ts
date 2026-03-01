import type { LucideIcon } from "lucide-react"

export type { BrandId, BrandConfig } from "@/config/brand"

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  description?: string
  badge?: string
  isActive?: boolean
}

export interface ModuleItem extends NavItem {
  description: string
  /** Slug fuer Chat-Kontext-Dateien in content/guides/<guide>/modules/<slug>.md */
  chatContext?: string
  /** compact = einzeilige Zeile ohne Description-Card */
  variant?: "compact"
}

export interface AppLink {
  name: string
  url: string
  icon: LucideIcon
  description: string
  active?: boolean
}
