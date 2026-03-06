# Baustein-Pipeline — Methodik und Kernkonzepte

Dieses Dokument beschreibt die Baustein-Pipeline (8 Schritte, atomare Wissensbausteine). Fuer die Cluster-Pipeline (4 Schritte, Cluster-Dokumente) siehe `cluster-pipeline.md`.

## Das Problem
Website-Content ist nicht direkt fuer LLMs nutzbar. Er hat niedrige Informationsdichte, fragmentiertes Wissen, fehlende Relationen, Marketing-Noise und versteckte Accordion-Inhalte. Die Website hat Content, aber dem AI-System fehlt der Kontext.

## Zwei-Ebenen-Modell
- **Content-Ebene:** Website, fuer Menschen optimiert (SEO, Marketing, Navigation)
- **Context-Ebene:** AI-Assistent, strukturierte Markdown-Chunks mit Metadaten (Bausteine) oder thematisch gegliedertes Dokument (Cluster)

## 5 Kontext-Dimensionen
1. **Bedeutung** — Was beschreibt dieser Baustein? Thema, Kernaussagen, Zusammenfassung
2. **Struktur** — Wie haengt er zusammen? Relationen zu anderen Bausteinen, Cluster-Zuordnung
3. **Qualitaet** — Ist er zuverlaessig? Quelle, Aktualitaet, Validierungsstatus
4. **Regeln** — Was gilt? Verfassungs-Constraints, Disclaimer-Pflichten
5. **Zielgruppe** — Fuer wen? Passende Intentionen, Sprachniveau, Lebenssituation

## Baustein-Format (Beispiel)
```yaml
---
titel: "Pflegegeld"
typ: FAKT
cluster: pflege
kategorie: geldleistungen
stand: "2026-03-01"
volatilitaet: hoch
validiert: false
quellen:
  - url: "https://www.deine-gesundheitswelt.de/pflege/pflegegeld"
    crawl_datum: "2026-03-01"
zielgruppe:
  - pflegebeduerftige
  - angehoerige
  - pflegepersonen
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
  setting: "haeuslich"
  leistungsform: "geldleistung"
haftungshinweis: "Betraege gemaess aktueller Gesetzeslage. Individuelle Ansprueche koennen abweichen."
rechtsgrundlage: "§ 37 SGB XI"
relationen:
  - typ: alternative_zu
    ziel: pflegesachleistung
    details: "Entweder Pflegegeld oder Sachleistung, oder beides ueber Kombinationsleistung"
  - typ: kombinierbar_mit
    ziel: kombinationsleistung
    details: "Ueber § 38 SGB XI, prozentuale Verrechnung"
---

# Pflegegeld

| Pflegegrad | Betrag/Monat |
|------------|-------------|
| 2 | 332 EUR |
| 3 | 573 EUR |
| 4 | 765 EUR |
| 5 | 947 EUR |

Voraussetzungen: Pflegegrad 2-5, haeusliche Pflege durch Angehoerige oder Ehrenamtliche.
Antragstellung: Formlos bei der Pflegekasse. Begutachtung durch MD.
Beratungspflicht: Pflegegeldempfaenger muessen regelmaessig Beratungseinsaetze nachweisen.
```

### 6 Relationstypen

| Typ | Bedeutung | Beispiel |
|-----|-----------|---------|
| `voraussetzung` | A setzt B voraus | Pflegegeld setzt Pflegegrad voraus |
| `kombinierbar_mit` | A und B koennen zusammen genutzt werden | Pflegegeld kombinierbar mit Sachleistung |
| `alternative_zu` | A oder B, nicht beides (in vollem Umfang) | Pflegegeld Alternative zu Sachleistung |
| `verwandt_mit` | A und B haengen thematisch zusammen | Pflegegeld verwandt mit Verhinderungspflege |
| `teil_von` | A gehoert zu B | Pflegegeld Teil von Pflegeleistungen |
| `ersetzt_durch` | A wurde durch B abgeloest | Pflegestufe ersetzt durch Pflegegrad |

## 8 Bausteintypen
| Typ | Zweck | Beispiel |
|-----|-------|---------|
| **FAKT** | Objektive, faktenbasierte Sachinformation | "Was ist ein Pflegegrad?" |
| **EMPFEHLUNG** | Handlungsorientierte Einordnung mit klarer Richtung | "Kombinationsleistung pruefen" |
| **ANLEITUNG** | Schritt-fuer-Schritt-Ablauf | "Pflegegrad beantragen in 5 Schritten" |
| **FAQ** | Haeufig gestellte Fragen direkt beantworten | "Wer zahlt Pflegehilfsmittel?" |
| **CHECKLISTE** | Abhakliste fuer komplexe Vorgaenge | "Dokumente fuer Pflegeantrag" |
| **VERGLEICH** | Gegenuberstellung von Optionen | "Pflegegeld vs. Sachleistung" |
| **GLOSSAR** | Begriffsdefinition | "Was bedeutet SGB XI?" |
| **NAVIGATION** | Verweis auf andere Themen oder Stellen | "Weiter zu Entlastungsbetrag" |
