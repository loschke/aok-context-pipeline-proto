import { LayoutDashboard, Workflow, BookOpen, HelpCircle, BotMessageSquare, Building2 } from "lucide-react"
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
    title: "Context Pipeline",
    url: "/context-pipeline",
    icon: Workflow,
    description: "Methodik, Bausteine und Workflow",
  },
  {
    title: "SAVA Projektberater",
    url: "/assistant?expert=ueberblick",
    icon: Building2,
    description: "Architektur, Methodik und Projektstatus",
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
