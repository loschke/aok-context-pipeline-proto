# Context Pipeline v2.0 — Implementierungsplan

> Stand: 05. Maerz 2026 | Status: Entwurf zur Abstimmung

## Context

Die Pipeline v1.0 funktioniert technisch, basiert aber auf veralteter Methodik: 6 statt 8 Schritte, 7 alte Bausteintypen (LEISTUNG, PROZESS, WARNUNG, TIPP, VERWEIS), keine Build/Runtime-Unterscheidung, keine Kompass-Integration in Prompts. Die SAVA Engine wurde umfassend ueberarbeitet und definiert jetzt 8 Schritte, 8 neue Bausteintypen (FAKT, EMPFEHLUNG, ANLEITUNG, FAQ, CHECKLISTE, VERGLEICH, GLOSSAR, NAVIGATION) und ein durchgaengiges Qualitaetsmodell. v2.0 setzt diese Methodik als eigene Route um. v1.0 bleibt unberuehrt.

## Architektur-Entscheidungen

- **Separate Route** `/pipeline-v2` — eigene Komponenten, API-Routes, Data-Ordner
- **Separate Prompt-Dateien** in `src/lib/pipeline/prompts/` — leichter zu reviewen und iterieren
- **Shared File-Ops** — `files.ts` wird parametrisiert (Factory), v2 nutzt eigene Wrapper
- **Shared UI-Primitives** — FilePreview, Streaming-Output, File-Selector als Shared Components

---

## Dateistruktur

```
src/
  types/
    pipeline-v2.ts                     # 8 Steps, 8 Bausteintypen, Interfaces

  lib/pipeline/
    files.ts                           # AENDERN: createPipelineFileOps() Factory
    files-v2.ts                        # NEU: v2 Wrapper (base: data/pipeline-v2)
    state-v2.ts                        # NEU: 8-Step State-Logik
    prompts/                           # NEU: Ordner fuer alle AI-Prompts
      extract-v2.ts                    # Step 2: Baustein-Extraktion (8 Typen)
      taxonomize-v2.ts                 # Step 3: Taxonomie
      recategorize-v2.ts               # Step 4: Re-Kategorisierung
      group-v2.ts                      # Step 5: Gruppierung & Duplikate
      consolidate-v2.ts               # Step 6: Konsolidierung
      enrich-v2.ts                     # Step 7: Kontext-Anreicherung

  app/(app)/pipeline-v2/
    page.tsx                           # Server Component, laedt Batches + State

  app/api/pipeline-v2/
    state/route.ts                     # GET: 8-Step Pipeline-State
    files/route.ts                     # GET: Datei-Inhalt lesen
    scrape/route.ts                    # POST: Firecrawl Scrape
    extract/route.ts                   # POST: Baustein-Extraktion
    taxonomize/route.ts                # POST: Taxonomie-Konsolidierung
    recategorize/route.ts              # POST: Re-Kategorisierung
    group/route.ts                     # POST: Gruppierung & Duplikate
    consolidate/route.ts               # POST: Konsolidierung
    enrich/route.ts                    # POST: Kontext-Anreicherung

  components/pipeline/shared/          # NEU: extrahierte Shared Components
    file-preview.tsx                   # Markdown-Preview mit Frontmatter
    streaming-output.tsx               # Streamdown-Rendering
    source-file-selector.tsx           # Checkbox-Dateiauswahl

  components/pipeline-v2/
    pipeline-v2-workbench.tsx          # Haupt-Client-Component (8 Steps + Config)
    step-rail-v2.tsx                   # Step-Navigation (8 Steps + Config-Bereich)
    batch-selector-v2.tsx              # Batch-Auswahl
    step-1-scrape.tsx
    step-2-extract.tsx
    step-3-taxonomize.tsx
    step-4-recategorize.tsx
    step-5-group.tsx
    step-6-consolidate.tsx
    step-7-enrich.tsx
    step-8-review.tsx
    config-panel.tsx                   # Cluster-Konfiguration (4 Karten)
    config-card.tsx                    # Einzelne Konfigurations-Karte

data/pipeline-v2/                      # NEU: eigener Data-Ordner
  batch-{name}/
    scraping/                          # Step 1
    bausteine/                         # Step 2
    taxonomie/                         # Step 3
    rekategorisierung/                 # Step 4 (NEU)
    gruppierung/                       # Step 5 (NEU)
    konsolidierung/                    # Step 6
    output/                            # Step 7
    qs/                                # Step 8
    _config/                           # Cluster-Konfiguration
      intentionsprofil.md
      kontextquellen.md
      kompass.md
      retrieval.md
```

---

## v1.0 → v2.0: Was aendert sich inhaltlich

### Step-Mapping

| v1.0 (6 Steps) | v2.0 (8 Steps) | Aenderung |
|---|---|---|
| 1. Content-Extraktion | 1. Content-Extraktion | Identisch (Firecrawl) |
| 2. Baustein-Extraktion (7 alte Typen) | 2. Baustein-Extraktion (8 neue Typen) | **Neuer Prompt** |
| 3. Taxonomie-Konsolidierung | 3. Taxonomie-Konsolidierung | Leicht angepasster Prompt |
| 4. Re-Kat. & Duplikate (merged) | 4. Re-Kategorisierung (nur Remapping) | **Aufgespalten** |
| — | 5. Gruppierung & Duplikat-Erkennung | **Neuer Step** |
| 5. Kontext-Anreicherung (merged) | 6. Konsolidierung (Duplikate mergen) | **Neuer Step** |
| — | 7. Kontext-Anreicherung & Struktur | **Aufgespalten** |
| 6. QS durch AOK | 8. QS durch AOK | Identisch (View-only) |

### Bausteintypen-Migration

| ALT (v1.0) | NEU (v2.0) | Mapping |
|---|---|---|
| FAKT | FAKT | Bleibt |
| LEISTUNG | — | → FAKT (Sachinformation) |
| EMPFEHLUNG | EMPFEHLUNG | Bleibt |
| WARNUNG | — | → EMPFEHLUNG (mit Hinweis-Kontext) |
| TIPP | — | → EMPFEHLUNG |
| VERWEIS | NAVIGATION | Umbenannt |
| PROZESS | ANLEITUNG | Umbenannt |
| — | FAQ | Neu |
| — | CHECKLISTE | Neu |
| — | VERGLEICH | Neu |
| — | GLOSSAR | Neu |

### Frontmatter-Schema (Engine-aligned)

```yaml
---
titel: "Pflegegeld"
typ: FAKT
cluster: pflege
kategorie: geldleistungen
stand: "2026-03-01"
volatilitaet: hoch              # hoch/mittel/niedrig
validiert: false
quellen:
  - url: "https://..."
    crawl_datum: "2026-03-01"
zielgruppe:
  - pflegebeduerftige
  - angehoerige
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
  setting: "haeuslich"
  leistungsform: "geldleistung"
haftungshinweis: "Allgemeine Information. Individuelle Ansprueche koennen abweichen."
rechtsgrundlage: "§ 37 SGB XI"
relationen:
  - typ: alternative_zu
    ziel: pflegesachleistung
    details: "Entweder Geld- ODER Sachleistung oder beides via Kombination"
---
```

---

## Prompt-Strategie pro Step

Alle Prompts bekommen gegenueber v1.0 diese Engine-Elemente:

1. **8 Bausteintypen** mit klaren Definitionen und Beispielen
2. **Kompass-Awareness**: Haftungshinweise, Hard Constraints, Eskalationsregeln
3. **Build/Runtime-Bewusstsein**: Volatilitaet korrekt einschaetzen
4. **5 Dimensionen** explizit in der Anreicherung

### Step 2: Baustein-Extraktion (`extract-v2.ts`)
- 8 neue Typen mit Definitionen und Abgrenzungsbeispielen
- Anweisung: FAQ als Frage-Antwort-Paare erkennen, CHECKLISTE bei Aufzaehlungen, VERGLEICH bei Gegenuberstellungen, GLOSSAR bei Definitionen
- Kompass: Keine Interpretation, nur Fakten aus Quelltext

### Step 3: Taxonomie-Konsolidierung (`taxonomize-v2.ts`)
- 6 Qualitaetskriterien: Schaerfe, Vollstaendigkeit, Granularitaet, Nutzerzentrierung, Konsistenz, Cluster-Passung
- Ziel: 15-20 Kategorien pro Cluster

### Step 4: Re-Kategorisierung (`recategorize-v2.ts`)
- Input: Bausteine + Taxonomie
- Nur Remapping, kein Merging
- Output: Tabelle mit alten → neuen Kategorien

### Step 5: Gruppierung & Duplikate (`group-v2.ts`)
- Semantische Gruppierung nach Kategorie
- Duplikat-Erkennung: Echte Duplikate vs. komplementaere Perspektiven
- Output: Gruppierungsbericht mit Aehnlichkeits-Begruendung

### Step 6: Konsolidierung (`consolidate-v2.ts`)
- Duplikate zusammenfuehren, Konflikte aufloesen
- Alle Quellen erhalten, beste Formulierung waehlen
- Output: Konsolidierte Bausteine

### Step 7: Kontext-Anreicherung (`enrich-v2.ts`)
- Engine-aligned Frontmatter (siehe Schema oben)
- 5 Dimensionen: Bedeutung, Struktur, Qualitaet, Regeln, Zielgruppe
- 6 Relationstypen: voraussetzung, kombinierbar_mit, alternative_zu, verwandt_mit, teil_von, ersetzt_durch
- `---SPLIT---` Marker fuer Einzel-Dateien (Pattern aus v1)

---

## Shared Library: files.ts Umbau

Bestehende `files.ts` bekommt eine Factory-Funktion:

```typescript
// NEU: Factory fuer parametrisierten Base-Path
export function createPipelineFileOps(basePath: string) {
  const resolvedBase = path.resolve(basePath)
  function resolveSafe(relativePath: string): string { ... }
  return { listBatches, listStepFiles, readPipelineFile, writePipelineFile, ensureDir, dirHasFiles }
}

// Bestehende Exporte bleiben (v1 Backward Compatibility)
const v1Ops = createPipelineFileOps(path.join(process.cwd(), "data/pipeline"))
export const { listBatches, listStepFiles, ... } = v1Ops
```

`files-v2.ts` importiert und nutzt die Factory mit `data/pipeline-v2`.

---

## Types (`pipeline-v2.ts`)

```typescript
import type { StepStatus, PipelineFile, ScrapeProgress } from "./pipeline"
export type { StepStatus, PipelineFile, ScrapeProgress }

export const BAUSTEIN_TYPEN_V2 = [
  "FAKT", "EMPFEHLUNG", "ANLEITUNG", "FAQ",
  "CHECKLISTE", "VERGLEICH", "GLOSSAR", "NAVIGATION",
] as const

export type BausteinTypV2 = typeof BAUSTEIN_TYPEN_V2[number]

export const PIPELINE_STEPS_V2 = [
  { id: 1, name: "Content-Extraktion", description: "Firecrawl scrapt AOK-Webseiten", dirName: "scraping" },
  { id: 2, name: "Baustein-Extraktion", description: "8 Bausteintypen mit freier Kategorisierung", dirName: "bausteine" },
  { id: 3, name: "Taxonomie-Konsolidierung", description: "Kategorien zu finaler Taxonomie vereinheitlichen", dirName: "taxonomie" },
  { id: 4, name: "Re-Kategorisierung", description: "Bausteine der finalen Taxonomie zuordnen", dirName: "rekategorisierung" },
  { id: 5, name: "Gruppierung & Duplikate", description: "Nach Kategorie gruppieren, Ueberschneidungen finden", dirName: "gruppierung" },
  { id: 6, name: "Konsolidierung", description: "Duplikate zusammenfuehren, Konflikte aufloesen", dirName: "konsolidierung" },
  { id: 7, name: "Kontext-Anreicherung", description: "5 Dimensionen, Relationen, finale Struktur", dirName: "output" },
  { id: 8, name: "QS durch AOK", description: "AOK-Fachexperten pruefen Korrektheit", dirName: "qs" },
] as const
```

---

## Cluster-Konfiguration (nach Pipeline)

Nach den 8 Pipeline-Steps gibt es einen optionalen Konfigurations-Bereich fuer den Cluster-Rollout. Dieser basiert auf der Blaupause aus der Engine und dokumentiert die nicht-Content-Aspekte des Clusters.

### UI-Konzept

Im Step-Rail erscheint nach Step 8 ein separater Bereich "Cluster-Konfiguration" (visuell abgesetzt, z.B. durch Trennlinie). Dieser besteht aus 4 Konfigurations-Karten, die jeweils ein Formular/Editor enthalten:

### Karte 1: Intentionsprofil
- Welche der 7 Intentionen bedient dieser Cluster?
- UI: Checkboxen fuer I1-I7 mit Kategorisierung (Primaer/Sekundaer/Nicht im Scope)
- Gespeichert als `{batch}/_config/intentionsprofil.md`

### Karte 2: Kontextquellen-Inventar
- Dokumentation aller 4 Quelltypen inkl. Tools
- Pro Quelle: Name, Typ (Build/Hybrid/Runtime), Status (verfuegbar/teilweise/geplant), Beschreibung
- Speziell fuer Tools: API-Endpoint, Input/Output-Beschreibung, Hybrid-Erklaerung
- UI: Editierbare Tabelle oder strukturiertes Formular
- Gespeichert als `{batch}/_config/kontextquellen.md`

### Karte 3: Kompass-Konfiguration
- Cluster-spezifische Leitplanken
- Hard Constraints, konfigurierbare Verhaltensweisen, Vertrauens-Hierarchie
- UI: Strukturierter Markdown-Editor
- Gespeichert als `{batch}/_config/kompass.md`

### Karte 4: Retrieval-Konfiguration
- Welche Retrieval-Stufe fuer diesen Cluster
- Stufe 1-4 mit Begruendung
- UI: Radio-Buttons + Freitext
- Gespeichert als `{batch}/_config/retrieval.md`

### Datenstruktur

```
data/pipeline-v2/
  batch-{name}/
    scraping/           # Step 1-8 wie gehabt
    ...
    qs/
    _config/            # NEU: Cluster-Konfiguration
      intentionsprofil.md
      kontextquellen.md
      kompass.md
      retrieval.md
```

Kein API-Route fuer AI noetig — die Konfiguration ist manuell (oder AI-assisted als optionaler Entwurf). Lesen/Schreiben ueber die bestehenden `/api/pipeline-v2/files` Route.

---

## Navigation

```typescript
// Bestehender v1 Eintrag aendern:
{ title: "Context Pipeline", url: "/context-pipeline", icon: Workflow, variant: "compact", badge: "v1" },

// Neuer v2 Eintrag:
{ title: "Pipeline v2", url: "/pipeline-v2", icon: Workflow, variant: "compact", badge: "Tool" },
```

Dashboard-Seite: Tools-Abschnitt um v2 ergaenzen, v1 als "(Legacy)" markieren.

---

## Implementierungsreihenfolge

### Phase 1: Foundation
1. `src/types/pipeline-v2.ts` — Types und Step-Definitionen
2. `src/lib/pipeline/files.ts` — Factory-Funktion ergaenzen
3. `src/lib/pipeline/files-v2.ts` — v2 Wrapper
4. `src/lib/pipeline/state-v2.ts` — 8-Step State-Machine
5. `data/pipeline-v2/` — Verzeichnis anlegen
6. API: `/api/pipeline-v2/state` + `/api/pipeline-v2/files`

### Phase 2: Shared Components
7. `src/components/pipeline/shared/file-preview.tsx` — aus v1 extrahieren
8. `src/components/pipeline/shared/streaming-output.tsx` — Streaming-Pattern
9. `src/components/pipeline/shared/source-file-selector.tsx` — Dateiauswahl

### Phase 3: Workbench-Skeleton
10. `pipeline-v2-workbench.tsx` — Haupt-Component mit 8-Step-Routing
11. `step-rail-v2.tsx` — Step-Navigation
12. `batch-selector-v2.tsx` — Batch-Auswahl
13. `src/app/(app)/pipeline-v2/page.tsx` — Route
14. Navigation aktualisieren

### Phase 4: Steps 1-3 (gleich wie v1, neue Prompts)
15. Step 1: Scrape (API + Component, fast identisch zu v1)
16. Step 2: Extract (Prompt + API + Component, **neuer Prompt**)
17. Step 3: Taxonomize (Prompt + API + Component, leicht angepasst)

### Phase 5: Steps 4-6 (neue Steps)
18. Step 4: Recategorize (Prompt + API + Component, **neu**)
19. Step 5: Group (Prompt + API + Component, **neu**)
20. Step 6: Consolidate (Prompt + API + Component, **neu**)

### Phase 6: Steps 7-8
21. Step 7: Enrich (Prompt + API + Component, **neuer Prompt**)
22. Step 8: Review (Component, View-only)

### Phase 7: Cluster-Konfiguration
23. `config-panel.tsx` + `config-card.tsx` — 4 Konfigurations-Karten
24. Markdown-Editor fuer Karten (CodeMirror oder Textarea)
25. Lesen/Schreiben ueber bestehende Files-API (`_config/` Pfad)

### Phase 8: Integration
26. Dashboard und Navigation aktualisieren
27. Full-Flow Test mit Pflege-URLs

---

## Verifikation

1. `pnpm build` — Build erfolgreich
2. `pnpm dev` → `/pipeline-v2` aufrufen — Workbench laedt
3. v1.0 Test: `/context-pipeline` funktioniert weiterhin unveraendert
4. Pflege-URLs durch alle 8 Steps durchlaufen
5. Output-Bausteine pruefen: Haben korrektes Frontmatter-Schema, 8 Typen, 5 Dimensionen, Relationen
6. Step-Rail zeigt korrekte Status-Badges (locked → ready → completed)
7. Batch-Wechsel funktioniert
