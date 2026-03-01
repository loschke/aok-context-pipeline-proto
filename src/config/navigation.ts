import { LayoutDashboard, Globe, Layers, CheckCircle, BookOpen, HelpCircle, MessageSquare } from "lucide-react"
import type { NavItem, ModuleItem } from "@/types"

export const primaryModules: ModuleItem[] = [
  {
    title: "Pipeline Dashboard",
    url: "/pipeline",
    icon: LayoutDashboard,
    description: "Fortschritt und Status der Pipeline",
    chatContext: "pipeline",
  },
  {
    title: "Content Extraktion",
    url: "/extraktion",
    icon: Globe,
    description: "Webinhalte scrapen und aufbereiten",
    chatContext: "extraktion",
  },
  {
    title: "Context Builder",
    url: "/context-builder",
    icon: Layers,
    description: "Wissensbausteine strukturieren",
    badge: "Kern",
    chatContext: "context-builder",
  },
  {
    title: "Qualitaetssicherung",
    url: "/qualitaet",
    icon: CheckCircle,
    description: "Bausteine validieren und freigeben",
    chatContext: "qualitaet",
  },
]

export const secondaryNavigation: NavItem[] = [
  {
    title: "Assistent",
    url: "/assistant",
    icon: MessageSquare,
  },
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
