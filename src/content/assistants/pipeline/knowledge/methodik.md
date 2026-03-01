# Content-to-Context Methodik — Kernkonzepte

## Das Problem
Website-Content ist nicht direkt fuer LLMs nutzbar. Er hat niedrige Informationsdichte, fragmentiertes Wissen, fehlende Relationen, Marketing-Noise und versteckte Accordion-Inhalte. Die Website hat Content, aber dem AI-System fehlt der Kontext.

## Zwei-Ebenen-Modell
- **Content-Ebene:** Website, fuer Menschen optimiert (SEO, Marketing, Navigation)
- **Context-Ebene:** AI-Assistent, strukturierte Markdown-Chunks mit Metadaten

## 5 Kontext-Dimensionen
1. **Bedeutung** — Was beschreibt dieser Baustein? Thema, Kernaussagen, Zusammenfassung
2. **Struktur** — Wie haengt er zusammen? Relationen zu anderen Bausteinen, Cluster-Zuordnung
3. **Qualitaet** — Ist er zuverlaessig? Quelle, Aktualitaet, Validierungsstatus
4. **Regeln** — Was gilt? Verfassungs-Constraints, Disclaimer-Pflichten
5. **Zielgruppe** — Fuer wen? Passende Intentionen, Sprachniveau, Lebenssituation

## Baustein-Format (Beispiel)
```yaml
---
type: erklaerung
cluster: pflege
title: "Pflegegrad beantragen"
tags: [pflegegrad, antrag, mdk]
dimensions:
  bedeutung: "Erklaert den Prozess der Pflegegrad-Beantragung bei der AOK"
  struktur:
    related: [pflegegrad-voraussetzungen, mdk-begutachtung]
  qualitaet:
    source: "aok.de/pk/pflege/pflegegrad-beantragen"
    validated: false
  regeln:
    constraints: ["keine-leistungszusage", "verweis-pflegeberatung"]
  zielgruppe:
    intentionen: [angehoerigen-sorge, frische-diagnose]
---

# Pflegegrad beantragen

[Strukturierter Content hier...]
```

## 7 Bausteintypen
| Typ | Zweck | Beispiel |
|-----|-------|----------|
| Erklaerung | Was ist X? | "Was ist ein Pflegegrad?" |
| Anleitung | Wie mache ich X? | "Pflegegrad beantragen: Schritt fuer Schritt" |
| FAQ | Haeufige Fragen | "Haeufige Fragen zur Pflegebegutachtung" |
| Checkliste | Was beachten? | "Checkliste: Vorbereitung MDK-Besuch" |
| Vergleich | A vs. B | "Pflegegeld vs. Pflegesachleistung" |
| Glossar | Fachbegriffe | "Pflegebegriffe A-Z" |
| Navigation | Wegweiser | "Pflegeleistungen im Ueberblick" |
