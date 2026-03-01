import { LayoutDashboard, Target, Workflow, MessageCircleHeart, BookOpen, HelpCircle, BotMessageSquare } from "lucide-react"
import type { NavItem, ModuleItem } from "@/types"

export const primaryModules: ModuleItem[] = [
  {
    title: "Dashboard",
    url: "/pipeline",
    icon: LayoutDashboard,
    description: "Fortschritt und Status der Pipeline",
    chatContext: "pipeline",
    variant: "compact",
  },
  {
    title: "Intentionen",
    url: "/intentionen",
    icon: Target,
    description: "7 Kernintentionen der AOK-Versicherten",
  },
  {
    title: "Context Pipeline",
    url: "/context-pipeline",
    icon: Workflow,
    description: "Methodik, Bausteine und Workflow",
  },
  {
    title: "Pflegeberatung",
    url: "/assistant?expert=pflegeberater",
    icon: MessageCircleHeart,
    description: "Assistent zum Ausprobieren",
    badge: "Demo",
  },
]

export const assistantNavItem = {
  title: "SAVA Experten",
  url: "/assistant",
  icon: BotMessageSquare,
  description: "9 Experten fuer Methodik, QS, Demo und Onboarding",
}

export const secondaryNavigation: NavItem[] = [
  {
    title: "Dokumentation",
    url: "/docs",
    icon: BookOpen,
  },
  {
    title: "Hilfe & FAQ",
    url: "/help",
    icon: HelpCircle,
  },
]
