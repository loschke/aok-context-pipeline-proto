# Cluster-Dokument-Pipeline: Technische Spezifikation

## Kontext

Wir betreiben zwei Pipelines zur Content-Aufbereitung fuer die SAVA Engine:

1. **Baustein-Pipeline** (existiert, funktioniert) — Zerlegt Webseiten-Content in atomare Wissensbausteine mit Frontmatter-Metadaten. 8 Schritte, aufwaendig, produziert granulare Einheiten fuer praezises Retrieval.

2. **Cluster-Pipeline** (dieses Dokument) — Transformiert Webseiten-Content in ein gut strukturiertes Markdown-Dokument pro Themencluster. Weniger granular, dafuer schnell erstellbar und direkt als LLM-Context nutzbar.

Beide Pipelines arbeiten mit demselben Ausgangsmaterial: Webseiten von `deine-gesundheitswelt.de` (AOK Sachsen-Anhalt).

**Langfristige Perspektive:** In einer Ausbaustufe koennen die Cluster-Dokumente als Startpunkt fuer die Baustein-Pipeline dienen. Das Cluster-Dokument ist dann das validierte Zwischenprodukt, aus dem die Atomarisierung erfolgt. Aber: Dieser Pfad ist Zukunft. Beide Pipelines funktionieren erst mal unabhaengig.

---

## Ziel der Cluster-Pipeline

Aus N Webseiten eines Themenclusters ein einzelnes, LLM-optimiertes Markdown-Dokument erzeugen, das:

- **Informationsdicht** ist — kein Marketing-Filler, kein SEO-Rauschen
- **Vollstaendig** ist — alle Fakten aus allen Quellseiten zusammengefuehrt
- **Strukturiert** ist — logische Gliederung nach Themen, nicht nach Quellseiten
- **Dedupliziert** ist — gleiche Info von 5 Seiten nur einmal enthalten
- **Direkt nutzbar** ist — kann komplett ins Context Window geladen werden

---

## Abgrenzung zur Baustein-Pipeline

| Aspekt | Baustein-Pipeline | Cluster-Pipeline |
|--------|-------------------|------------------|
| Output | Viele kleine Dateien mit Frontmatter | Ein Markdown-Dokument pro Cluster |
| Granularitaet | Atomar (1 Baustein = 1 Frage) | Thematisch (1 Abschnitt = 1 Unterthema) |
| Metadaten | Volles Frontmatter-Schema (5 Dimensionen) | Minimale Header-Metadaten |
| Retrieval | Ueber Metadaten-Filter + Vektorsuche | Full Context Loading (alles laden) |
| Erstellungsaufwand | Tage pro Cluster | Stunden pro Cluster |
| Einsatz | Produktion, Multi-Modell, KI-Inseln | PoC, Fokus-Assistenten, Validierung |

---

## Pipeline-Schritte

### Schritt 1: Content-Extraktion

Identisch zur Baustein-Pipeline. Firecrawl scraped die Quellseiten.

- **Input:** URL-Liste oder Sitemap-Segment fuer den Cluster
- **Output:** Ein Markdown-File pro Quellseite
- **Werkzeug:** Firecrawl SDK (scrape oder crawl)
- **Speicherort:** `data/raw/{cluster-name}/`

### Schritt 2: Analyse und Themenstruktur

LLM analysiert alle Rohseiten und erstellt eine Themenstruktur fuer das Cluster-Dokument.

- **Input:** Alle Markdown-Files des Clusters
- **Output:** Vorgeschlagene Gliederung (Outline) als Markdown
- **Aufgabe des LLM:**
  - Alle Quellseiten lesen
  - Themen identifizieren und gruppieren (nicht nach Quellseite, sondern nach inhaltlicher Logik)
  - Duplikate erkennen (gleiche Info auf mehreren Seiten)
  - Luecken identifizieren (Themen die fehlen oder unvollstaendig sind)
  - Gliederung vorschlagen mit Abschnittstiteln

**Prompt-Hinweise:**
- "Gruppiere nach Themen, nicht nach Quellseiten"
- "Identifiziere Informationen die auf mehreren Seiten vorkommen — diese nur einmal aufnehmen"
- "Markiere Luecken: Wo fehlen Informationen?"
- "Die Gliederung soll der Logik eines Nutzers folgen, nicht der Seitenstruktur der Website"

### Schritt 3: Synthese zum Cluster-Dokument

LLM erzeugt aus den Rohseiten das finale Cluster-Dokument entlang der Gliederung aus Schritt 2.

- **Input:** Alle Rohseiten + Gliederung
- **Output:** Ein Markdown-Dokument
- **Aufgabe des LLM:**
  - Informationen aus allen Quellseiten entlang der Gliederung zusammenfuehren
  - Marketing-Sprache entfernen, nur Fakten behalten
  - Duplikate eliminieren (beste/vollstaendigste Version behalten)
  - Konkrete Zahlen, Betraege, Fristen immer uebernehmen
  - Bei widersprüchlichen Angaben zwischen Seiten: beide nennen und markieren
  - Quellseiten-URLs als Referenz am Ende jedes Abschnitts (nicht inline)

**Qualitaetskriterien fuer den Output:**
- Kein Satz der nur Marketing ist ("Wir sind fuer Sie da")
- Jeder Absatz enthaelt mindestens einen konkreten Fakt
- Betraege und Zahlen sind immer mit Kontext (Pflegegrad, Voraussetzung, Stand)
- Keine Wiederholungen zwischen Abschnitten

### Schritt 4: Menschliche Pruefung und Freigabe

Projektteam und/oder AOK-Fachredaktion pruefen das Dokument.

- **Pruefpunkte:**
  - Inhaltliche Korrektheit (stimmen die Betraege? die Voraussetzungen?)
  - Vollstaendigkeit (fehlen wichtige Themen?)
  - Keine Halluzinationen (hat das LLM etwas erfunden, das nicht in den Quellen steht?)
  - Strukturelle Logik (ist die Gliederung nachvollziehbar?)
  - Widersprueche zwischen Quellen aufgeloest?

---

## Dokumentformat: Cluster-Dokument

### Header-Metadaten (minimal)

```yaml
---
cluster: pflege
titel: "Pflege — Vollstaendiger Context"
quellen:
  - url: "https://www.deine-gesundheitswelt.de/pflege/pflegegeld"
    crawl_datum: "2026-03-01"
  - url: "https://www.deine-gesundheitswelt.de/pflege/sachleistung"
    crawl_datum: "2026-03-01"
  # ... alle Quell-URLs
stand: "2026-03-01"
seitenanzahl_quelle: 24
status: entwurf | geprueft | freigegeben
---
```

Nur die Felder, die fuer Identifikation und Wartung noetig sind. Kein volles Frontmatter-Schema.

### Dokumentstruktur

```markdown
# {Cluster-Titel}

## {Thema 1}

{Fliesstext mit allen relevanten Fakten zu diesem Thema}

**Betraege / Zahlen:**
{Tabellarisch wo sinnvoll}

> Rechtsgrundlage: § XX SGB XI

Quellen: [URL 1], [URL 2]

---

## {Thema 2}

{...}

---

## Haeufige Fragen

{FAQ-Abschnitt mit den wichtigsten Fragen, die ueber mehrere Quellseiten verteilt beantwortet werden}

---

## Hinweise

- Alle Betraege entsprechen der aktuellen Gesetzeslage (Stand: {datum}).
- Individuelle Ansprueche koennen abweichen.
- Fuer persoenliche Beratung: AOK-Geschaeftsstelle oder Pflegestuetzpunkt.
```

### Richtlinien fuer die Dokumentstruktur

- **Ueberschriften-Hierarchie:** Maximal 3 Ebenen (H1 = Cluster, H2 = Thema, H3 = Unterthema)
- **Abschnittslaenge:** 200-500 Woerter pro H2-Abschnitt. Nicht laenger — das LLM muss scannen koennen.
- **Tabellen:** Fuer Betraege, Vergleiche, Stufungen (Pflegegrade etc.) immer Tabellen verwenden
- **Rechtsgrundlagen:** Als Blockquote am Ende des relevanten Abschnitts
- **FAQ-Abschnitt:** Am Ende, fuer Fragen die themenuebergreifend sind oder sich nicht einem Abschnitt zuordnen lassen
- **Keine Redundanz:** Wenn Pflegegeld-Betraege im Abschnitt "Pflegegeld" stehen, nicht nochmal im Abschnitt "Leistungsuebersicht" wiederholen. Stattdessen: "Siehe Abschnitt Pflegegeld."

---

## Zielgroesse

| Cluster-Typ | Quellseiten | Erwartete Dokumentgroesse | Tokens (ca.) |
|---|---|---|---|
| Klein (z.B. Pubertaet) | 5-10 Seiten | 3.000-6.000 Woerter | 4.000-8.000 |
| Mittel (z.B. Zahngesundheit) | 10-20 Seiten | 6.000-12.000 Woerter | 8.000-16.000 |
| Gross (z.B. Pflege) | 20-40 Seiten | 12.000-20.000 Woerter | 16.000-27.000 |

Alles ueber 30.000 Tokens ist kritisch — das ist der Punkt, ab dem der Cluster-Ansatz an seine Grenzen stoesst und die Baustein-Pipeline uebernehmen sollte.

---

## Dateistruktur

```
sava-contexts/
├── clusters/
│   ├── pflege.md              # Cluster-Dokument (Output)
│   ├── zahngesundheit.md
│   └── schwangerschaft.md
├── data/
│   └── raw/
│       ├── pflege/            # Gecrawlte Rohseiten
│       │   ├── pflegegeld.md
│       │   ├── sachleistung.md
│       │   └── ...
│       └── zahngesundheit/
│           └── ...
└── pipeline/
    ├── cluster-pipeline.js    # Pipeline-Script
    ├── prompts/
    │   ├── analyse.md         # Prompt fuer Schritt 2
    │   └── synthese.md        # Prompt fuer Schritt 3
    └── config.yaml            # Cluster-Definitionen (URLs, Name)
```

---

## Pipeline-Konfiguration

```yaml
# config.yaml
clusters:
  - name: pflege
    urls:
      - https://www.deine-gesundheitswelt.de/pflege/pflegegeld
      - https://www.deine-gesundheitswelt.de/pflege/sachleistung
      - https://www.deine-gesundheitswelt.de/pflege/kombinationsleistung
      # ... alle URLs des Clusters
    
  - name: zahngesundheit
    urls:
      - https://www.deine-gesundheitswelt.de/zahngesundheit/...
```

---

## Abhaengigkeiten

- **Firecrawl SDK** — fuer Content-Extraktion (bereits in der Baustein-Pipeline im Einsatz)
- **LLM-API** — fuer Analyse (Schritt 2) und Synthese (Schritt 3)
- **Kein Vector-DB noetig** — das Cluster-Dokument wird komplett geladen, kein Retrieval

---

## Ausbaustufe: Cluster als Startpunkt fuer Baustein-Pipeline

In einer spaeteren Phase koennen die Cluster-Dokumente als Input fuer die bestehende Baustein-Pipeline dienen:

```
Webseiten → [Cluster-Pipeline] → Cluster-Dokument (geprueft, validiert)
                                        ↓
                                [Baustein-Pipeline ab Schritt 2]
                                        ↓
                                Atomare Bausteine mit Frontmatter
```

Der Vorteil: Die Baustein-Pipeline arbeitet dann mit bereits bereinigtem, dedupliziertem, menschlich geprüftem Content statt mit rohem Webseiten-Scrape. Das verbessert die Qualitaet der Bausteine und reduziert den Pruefaufwand in den spaeteren Pipeline-Schritten.

**Aber: Dieser Pfad ist Zukunft. Beide Pipelines funktionieren erst mal unabhaengig voneinander.**

---

## Zusammenfassung

| Was | Detail |
|---|---|
| Ziel | Ein LLM-optimiertes Markdown-Dokument pro Themencluster |
| Schritte | 4 (Extraktion → Analyse → Synthese → Pruefung) |
| Aufwand | Stunden pro Cluster (vs. Tage bei der Baustein-Pipeline) |
| Output | `clusters/{name}.md` |
| Einsatz | Full Context Loading, PoC, Fokus-Assistenten |
| Grenze | ~30.000 Tokens pro Dokument, darueber Baustein-Pipeline nutzen |
