"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { ExpertConfig } from "@/lib/assistant/types"
import { cn } from "@/lib/utils"

interface ExpertOverviewProps {
  experts: ExpertConfig[]
}

const GROUP_ORDER = [
  {
    label: "Information & Zusammenarbeit",
    sublabel: "Fuer das AOK-Projektteam",
    slugs: ["zusammenarbeit"],
  },
  {
    label: "Simulation & Demo",
    sublabel: "Live-Demonstration des Assistenten-Systems",
    slugs: ["pflegeberater", "simulator"],
  },
  {
    label: "Methodik & Qualitaet",
    sublabel: "Werkzeuge fuer die Pipeline-Arbeit",
    slugs: ["pipeline", "qualitaet"],
  },
]

export function ExpertOverview({ experts }: ExpertOverviewProps) {
  const expertsBySlug = new Map(experts.map((e) => [e.slug, e]))

  return (
    <div className="space-y-6">
      {GROUP_ORDER.map((group) => {
        const groupExperts = group.slugs
          .map((slug) => expertsBySlug.get(slug))
          .filter(Boolean) as ExpertConfig[]

        if (groupExperts.length === 0) return null

        return (
          <div key={group.label}>
            <div className="mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <p className="text-xs text-muted-foreground/70">{group.sublabel}</p>
            </div>
            <div className={cn(
              "grid gap-2",
              groupExperts.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
            )}>
              {groupExperts.map((expert) => (
                <Link
                  key={expert.slug}
                  href={`/assistant?expert=${expert.slug}`}
                  className="group flex items-start gap-3 border bg-card p-3 transition-all hover:border-primary/30 hover:bg-accent/50 hover:shadow-sm"
                >
                  <span className="mt-0.5 text-lg leading-none">{expert.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold group-hover:text-primary">
                      {expert.name}
                    </span>
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                      {expert.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
