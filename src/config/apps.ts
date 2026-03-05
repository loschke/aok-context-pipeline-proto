import { Workflow, Globe, FolderHeart } from "lucide-react"
import type { AppLink } from "@/types"

export const apps: AppLink[] = [
  {
    name: "SAVA Engine",
    url: "/pipeline",
    icon: Workflow,
    description: "Werkbank fuer die SAVA Engine",
    active: true,
  },
  {
    name: "AOK Gesundheitswelt",
    url: "https://www.aok.de/pk/gesundheitswelt/",
    icon: Globe,
    description: "Quell-Website fuer Content-Extraktion",
  },
  {
    name: "Pflege-Cluster",
    url: "https://www.aok.de/pk/pflege/",
    icon: FolderHeart,
    description: "Pilot-Themencluster Pflege",
  },
]

export const currentApp = apps.find((app) => app.active) ?? apps[0]
