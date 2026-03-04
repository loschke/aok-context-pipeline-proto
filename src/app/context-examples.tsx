"use client"

import { useState } from "react"

const tabs = [
  { id: "typen", label: "Typen" },
  { id: "wissen", label: "Wissens-Context" },
  { id: "tool", label: "Tool-Context" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function ContextExamples() {
  const [active, setActive] = useState<TabId>("typen")

  return (
    <div className="overflow-hidden border border-emerald-200 bg-white">
      {/* Tab Bar */}
      <div className="flex border-b border-emerald-100 bg-emerald-50/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              active === tab.id
                ? "border-b-2 border-emerald-600 text-emerald-800 bg-white"
                : "text-emerald-500 hover:text-emerald-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {active === "typen" && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 p-4 text-xs">
          {[
            { typ: "LEISTUNG", desc: "AOK-Angebot" },
            { typ: "FAKT", desc: "Objektive Information" },
            { typ: "PROZESS", desc: "Schritt-für-Schritt" },
            { typ: "WARNUNG", desc: "Risiko, Arztbesuch" },
            { typ: "EMPFEHLUNG", desc: "Best Practice" },
            { typ: "TOOL", desc: "Datenbank, Rechner" },
          ].map((item) => (
            <div key={item.typ} className="flex items-center gap-2">
              <code className="rounded bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-800">
                {item.typ}
              </code>
              <span className="text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </div>
      )}

      {active === "wissen" && (
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-emerald-950">
          <code>{`titel: "Pflegegeld"
typ: LEISTUNG
cluster: pflege
kategorie: geldleistungen
stand: "2026-03-01"
volatilitaet: hoch
rechtsgrundlage: "§ 37 SGB XI"
zielgruppe:
  - pflegebeduerftige
  - angehoerige
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
  setting: "haeuslich"
relationen:
  - typ: alternative_zu
    ziel: pflegesachleistung
  - typ: kombinierbar_mit
    ziel: kombinationsleistung
  - typ: voraussetzung
    ziel: pflegegrade

## Inhalt

Monatliche Geldleistung fuer
Pflegebeduerftige ab Pflegegrad 2.
Voraussetzung: haeusliche Pflege
durch private Pflegepersonen.

## Betraege

| Grad | Monatlich |
|------|-----------|
| 2    | 347 €     |
| 3    | 599 €     |
| 4    | 800 €     |
| 5    | 990 €     |`}</code>
        </pre>
      )}

      {active === "tool" && (
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-emerald-950">
          <code>{`titel: "Pflegedienstsuche"
typ: TOOL
cluster: pflege
kategorie: datenbank-services
zielgruppe:
  - pflegebeduerftige
  - angehoerige
kontext_tags:
  setting: "haeuslich"
  region: "sachsen-anhalt"
tool_config:
  url: "https://www.aok.de/...
    /pflegedienstsuche"
  eingabe:
    - postleitzahl
    - leistungsart
  ausgabe: "Liste mit Pflegediensten,
    Entfernung, Leistungsspektrum"

## Wann relevant

Versicherte suchen konkreten
Pflegedienst in ihrer Naehe.
Typisch bei Intention I3
(Behandlungssuche) und I6
(Angehoerigen-Sorge).

## Hinweis fuer Assistenten

Immer nach PLZ oder Ort fragen,
bevor der Link ausgegeben wird.
Keine Empfehlung einzelner
Pflegedienste.`}</code>
        </pre>
      )}
    </div>
  )
}
