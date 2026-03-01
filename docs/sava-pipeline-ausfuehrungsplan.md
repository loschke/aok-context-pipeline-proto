# Plan: SAVA Content-to-Context Pipeline — Iterative Ausfuehrung

## Context

Die App-Shell steht (SAVA-Branding, Navigation, Assistenten). Jetzt geht es an die eigentliche Pipeline: AOK-Webinhalte aus dem Pflege-Cluster extrahieren und in strukturierte Wissensbausteine transformieren.

Quelle: `docs/sava-pipeline-instruktionen.md` beschreibt 8 Schritte, die wir einzeln durchlaufen. Ergebnisse werden als Dateien in `data/pipeline/` gespeichert. Kein DB-Schema noetig fuer den ersten Test.

**Pilot-Scope:** 2-3 Seiten aus dem Pflege-Cluster (Pflegegeld, Pflegesachleistung, Kombinationsleistung).

> **Hinweis zur Nummerierung:** Dieser Ausfuehrungsplan folgt der Schritt-Nummerierung aus `sava-pipeline-instruktionen.md` (Schritte 1-8). Schritt 1 (Content-Extraktion) wird in zwei Teilschritte 1a und 1b aufgeteilt, weil Hub-Scraping und Pilot-Scraping jeweils eigene Checkpoints haben. Die Schritte 4-6 werden fuer den Pilot-Scope (2-3 Seiten) zusammengefasst.

---

## Arbeitsweise

- **File-basiert:** Jeder Schritt schreibt Output-Dateien in `data/pipeline/schritt-N/`
- **Checkpoint nach jedem Schritt:** Du pruefst das Ergebnis, gibst Feedback, wir gehen erst dann weiter
- **Claude verarbeitet:** Extraktion und Anreicherung laeuft ueber Claude — kein separates LLM-Setup noetig
- **Firecrawl CLI** fuer Scraping (direkt im Terminal, schneller als ueber die App-UI)

---

## Voraussetzung: Firecrawl Setup

API-Key ist in `.env` vorhanden. Noch zu tun:

1. Firecrawl CLI installieren: `npx -y firecrawl-cli@latest init --all --browser`
2. Verzeichnisstruktur anlegen: `data/pipeline/`

---

## Schritt 1a: Hub-Seite scrapen + URL-Liste

*Methodik-Referenz: Schritt 1 (Content-Extraktion + Link-Erfassung) — Teil 1*

**Ziel:** Cluster-Struktur verstehen, URL-Liste fuer Pilot-Seiten definieren.

**Aktion:**

- Hub-Seite `deine-gesundheitswelt.de/krankheit-behandlung-und-pflege/pflege-wir-sind-an-ihrer-seite` scrapen
- Roh-Markdown der Hub-Seite aufheben (Referenz fuer Taxonomie in Schritt 3)
- Alle Unterseiten-URLs extrahieren und nach Gruppen ordnen (Pflege zu Hause, Ambulant, Heim, Palliativ)
- Output:
  - `data/pipeline/schritt-1/hub-raw.md` (Roh-Markdown der Hub-Seite)
  - `data/pipeline/schritt-1/hub-struktur.md` (URL-Liste mit Gruppierung)

**Dein Checkpoint:** Sind die URLs korrekt? Welche 2-3 Seiten nehmen wir als Pilot?

---

## Schritt 1b: Pilot-Seiten scrapen + Links klassifizieren

*Methodik-Referenz: Schritt 1 (Content-Extraktion + Link-Erfassung) — Teil 2*

**Ziel:** 2-3 Seiten als sauberes Markdown extrahieren, interne Links klassifizieren.

**Aktion:**

- Jede Pilot-URL per Firecrawl scrapen -> Markdown-Datei
- Pro Seite: Links extrahieren und klassifizieren (inhaltlich, redaktionell, service, hub-struktur)
- Output pro Seite:
  - `data/pipeline/schritt-1/pflegegeld-raw.md` (Roh-Markdown)
  - `data/pipeline/schritt-1/pflegegeld-links.yaml` (klassifizierte Links)

**Dein Checkpoint:** Ist der Markdown-Output sauber? Alle Accordion-Inhalte erfasst? Links korrekt klassifiziert?

---

## Schritt 2: Baustein-Extraktion (Pass 1)

*Methodik-Referenz: Schritt 2 (Baustein-Extraktion)*

**Ziel:** Jede Seite in typisierte, atomare Bausteine zerlegen.

**Aktion:**

- Claude analysiert jede Roh-Markdown-Datei
- Zerlegt in Bausteine mit: Typ (FAKT/EMPFEHLUNG/WARNUNG/LEISTUNG/TIPP/VERWEIS/PROZESS), freie Kategorie, Inhalt, Quell-URL
- Marketing-Sprache entfernen, CTAs weglassen, Fakten beibehalten
- Output: `data/pipeline/schritt-2/pflegegeld-bausteine.md`

**Dein Checkpoint:** Sind die Bausteintypen sinnvoll? Granularitaet richtig (nicht zu grob, nicht zu fein)? Keine Informationen verloren?

---

## Schritt 3: Taxonomie-Konsolidierung

*Methodik-Referenz: Schritt 3 (Taxonomie-Konsolidierung)*

**Ziel:** Aus den frei vergebenen Kategorien eine konsistente Taxonomie ableiten.

**Aktion:**

- Alle Kategorien aus Schritt 2 sammeln
- Synonyme identifizieren, Hierarchie vorschlagen
- Hub-Seiten-Struktur (aus `hub-raw.md`) als Orientierung einbeziehen
- Output: `data/pipeline/schritt-3/taxonomie.md` (max. 15-20 Kategorien)

**Dein Checkpoint:** Taxonomie freigeben oder anpassen. Dieser Schritt ist bewusst nicht vollautomatisch.

---

## Schritt 4-6: Re-Kategorisierung + Duplikate + Konsolidierung

*Methodik-Referenz: Schritte 4 (Re-Kategorisierung), 5 (Gruppierung & Duplikat-Erkennung), 6 (Konsolidierung) — zusammengefasst fuer Pilot-Scope*

**Ziel:** Bausteine final zuordnen, Ueberschneidungen aufloesen.

**Aktion:**

- Bausteine gegen finale Taxonomie re-kategorisieren
- Duplikate und Ueberschneidungen zwischen Seiten identifizieren
- Zusammenfuehrungsvorschlaege erstellen
- Output: `data/pipeline/schritt-4-6/bausteine-konsolidiert.md` + `duplikate-report.md`

**Dein Checkpoint:** Zusammenfuehrungen pruefen — keine automatische Zusammenfuehrung ohne Freigabe.

---

## Schritt 7: Kontext-Anreicherung

*Methodik-Referenz: Schritt 7 (Kontext-Anreicherung)*

**Ziel:** Jeden Baustein mit 5 Dimensionen + Relationen versehen -> Zielformat.

**Aktion:**

- Pro Baustein: Bedeutung, Struktur, Qualitaet, Regeln, Zielgruppe befuellen
- Relationen aus Link-Daten (Schritt 1b) ableiten
- Zielformat: Markdown + YAML-Frontmatter (wie in Pipeline-Instruktionen definiert)
- Output: `data/pipeline/schritt-7/` — ein `.md` pro Baustein im Zielformat

**Dein Checkpoint:** Sind die Dimensionen vollstaendig? Relationen korrekt? Format sauber?

---

## Schritt 8: QS gegen Original-Website

*Methodik-Referenz: Schritt 8 (QS durch AOK)*

**Ziel:** Fertige Bausteine gegen Original-Webseite pruefen.

**Aktion:**

- Baustein-Inhalte mit Original-Seite vergleichen
- Faktische Korrektheit, Vollstaendigkeit, Verfassungs-Konformitaet pruefen
- QS-Report erstellen
- Output: `data/pipeline/schritt-8/qs-report.md`

---

## Dateien die entstehen

```
data/
└── pipeline/
    ├── schritt-1/
    │   ├── hub-raw.md                      (Roh-Markdown Hub-Seite, Referenz fuer Taxonomie)
    │   ├── hub-struktur.md                 (URL-Liste mit Gruppierung)
    │   ├── pflegegeld-raw.md
    │   ├── pflegegeld-links.yaml
    │   ├── pflegesachleistung-raw.md
    │   ├── pflegesachleistung-links.yaml
    │   ├── kombinationsleistung-raw.md
    │   └── kombinationsleistung-links.yaml
    ├── schritt-2/
    │   ├── pflegegeld-bausteine.md
    │   ├── pflegesachleistung-bausteine.md
    │   └── kombinationsleistung-bausteine.md
    ├── schritt-3/
    │   └── taxonomie.md
    ├── schritt-4-6/
    │   ├── bausteine-konsolidiert.md
    │   └── duplikate-report.md
    ├── schritt-7/
    │   ├── pflegegeld.md                   (Zielformat)
    │   ├── pflegesachleistung.md            (Zielformat)
    │   └── ...                              (weitere Bausteine)
    └── schritt-8/
        └── qs-report.md
```
