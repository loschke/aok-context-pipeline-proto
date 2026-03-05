import { LayoutDashboard, Workflow, BotMessageSquare, Compass, Layers, BrainCircuit, MessageCircle, Shield } from "lucide-react"
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
    title: "SAVA Engine",
    url: "/assistant?expert=engine",
    icon: BrainCircuit,
    description: "Architektur, Schichten und Zusammenspiel",
    variant: "compact",
    badge: "Chat",
  },
  {
    title: "Context Pipeline",
    url: "/context-pipeline",
    icon: Workflow,
    description: "Methodik, Bausteine und Workflow",
    variant: "compact",
    badge: "Tool",
  },
  {
    title: "7 Kernintentionen",
    url: "/intentionen",
    icon: Compass,
    description: "Warum kommen Menschen zur AOK? 7 Motive, 3 Ebenen",
    badge: "Info",
  },
  {
    title: "Agent Context",
    url: "/agent-context",
    icon: BrainCircuit,
    description: "Build- und Runtime-Wissen, Retrieval, Cluster-Konfiguration",
    badge: "Info",
  },
  {
    title: "Kompass",
    url: "/kompass",
    icon: Shield,
    description: "Verfassung, Werte und Compliance-Regeln",
    badge: "Info",
  },
  {
    title: "Contextualisierung",
    url: "/contextualisierung",
    icon: Layers,
    description: "8-Schritte-Pipeline von Content zu Context",
    badge: "Info",
  },
  {
    title: "Kommunikation",
    url: "/kommunikation",
    icon: MessageCircle,
    description: "Tonalitaet, Kanaele und Situations-Anpassung",
    badge: "Info",
  },
]

export const assistantNavItem = {
  title: "SAVA Experten",
  url: "/assistant",
  icon: BotMessageSquare,
  description: "6 Experten fuer Methodik, QS, Demo und Onboarding",
}

export const secondaryNavigation: NavItem[] = []
