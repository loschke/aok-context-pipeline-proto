"use client"

import { ConfigCard } from "./config-card"

interface ConfigPanelProps {
  cluster: string
}

const CONFIG_CARDS = [
  {
    title: "Intentionsprofil",
    description: "Welche der 7 Kernintentionen sind fuer diesen Cluster relevant?",
    filename: "intentionsprofil.md",
  },
  {
    title: "Kontextquellen-Inventar",
    description: "Welche Quellen werden fuer diesen Cluster genutzt?",
    filename: "kontextquellen.md",
  },
  {
    title: "Kompass-Konfiguration",
    description: "Hard Constraints, Vertrauens-Hierarchie und Eskalationsregeln.",
    filename: "kompass.md",
  },
  {
    title: "Retrieval-Konfiguration",
    description: "Retrieval-Stufe und Begruendung fuer die Konfiguration.",
    filename: "retrieval.md",
  },
]

export function ConfigPanel({ cluster }: ConfigPanelProps) {
  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Cluster-Konfiguration</h2>
        <p className="text-sm text-muted-foreground">
          Engine-Konfiguration fuer den Cluster. Wird in <code className="text-xs">_config/</code> gespeichert.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {CONFIG_CARDS.map((card) => (
          <ConfigCard
            key={card.filename}
            title={card.title}
            description={card.description}
            filename={card.filename}
            cluster={cluster}
          />
        ))}
      </div>
    </div>
  )
}
