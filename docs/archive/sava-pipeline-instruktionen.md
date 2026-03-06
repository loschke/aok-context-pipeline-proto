# SAVA Content-to-Context Pipeline – Instruktionen für Claude Code

## Projektkontext

Wir entwickeln einen AI-Assistenten für die AOK Sachsen-Anhalt (Projekt "SAVA"), der Versicherten fundierte Antworten auf Gesundheitsfragen geben soll. Der bestehende Website-Content (deine-gesundheitswelt.de) ist für menschliche Leser optimiert, nicht für LLMs. Er muss in strukturierte, atomare Wissensbausteine transformiert werden.

Dieses Dokument beschreibt die **Pipeline für den ersten technischen Test**: Vom Crawl der AOK-Website bis zu fertigen Context-Bausteinen im Markdown+Frontmatter-Format.

---

## Tooling: Firecrawl CLI

### Setup

```bash
npx -y firecrawl-cli@latest init --all --browser
```

Installiert CLI, authentifiziert via Browser, schreibt Skill-File für Claude Code.

### Relevante Commands

```bash
# Einzelne Seite scrapen
firecrawl scrape <URL> --format markdown -o <datei>.md

# Mehrere Seiten crawlen (z.B. ganzer Cluster)
firecrawl crawl <URL> --wait --progress -o output.json

# Sitemap einer Domain
firecrawl map <URL> -o sitemap.json
```

### Bekannt & getestet

- Accordion-Inhalte werden erkannt (JavaScript-Rendering funktioniert bei AOK-Seite).
- Navigation/Footer/CTAs kommen mit im Output und müssen beim Verarbeiten herausgefiltert werden.

---

## Test-Scope: Pflege-Cluster

### Warum Pflege

- Überschaubarer Umfang (~24 Leistungsseiten statt ~80 Artikel bei Schwangerschaft)
- Faktenbasierter, strukturierter Content (besser für ersten Pipeline-Test)
- Bestehendes Referenz-Beispiel (Pflegegeld-Baustein) zum Abgleich

### Startseiten für den Pilot (2–3 eng verwandte Seiten)

Empfehlung: Pflegegeld, Pflegesachleistung, Kombinationsleistung – hängen inhaltlich zusammen und erzeugen echtes Material für Duplikat-Erkennung und Relationen.

URLs müssen von deine-gesundheitswelt.de/krankheit-behandlung-und-pflege/ geholt werden.

### Hub-Seite als Strukturquelle

Die Pflege-Hub-Seite (`/pflege-wir-sind-an-ihrer-seite`) ist **keine Content-Quelle**, sondern eine **Strukturquelle**. Sie liefert:

- Vollständige Liste aller Unterseiten im Cluster (als URL-Liste für den Crawl)
- Cluster-Taxonomie: Die Gruppierung auf der Hub-Seite (Pflege zu Hause, Ambulant betreute Wohngruppe, Pflege im Heim, Palliativpflege) ist ein erster Anhaltspunkt für die Kategorien
- Nachbarschaftsbeziehungen: Welche Seiten stehen in derselben Gruppe?

---

## Pipeline: 8 Schritte, iterativ

Jeden Schritt einzeln ausführen, Ergebnis prüfen, dann weiter. Nicht alles auf einmal.

### Schritt 1: Content-Extraktion + Link-Erfassung

**Ziel:** Seiten als Markdown extrahieren. Dabei interne Links mit Kontext erfassen.

**Vorgehen:**

1. Firecrawl scrape auf jede URL → Markdown-Datei
2. Pro Datei als Metadaten festhalten: Original-URL, Crawl-Datum
3. **Link-Extraktion** (neu, wichtig): Alle internen Links mit ihrem Kontext erfassen

**Link-Klassifizierung:**

Beim Extrahieren von internen Links aus jeder Seite diese in Klassen einteilen:

| Klasse | Wo auf der Seite | Beispiel | Nutzen für Context |
|---|---|---|---|
| `inhaltlich` | Im Fließtext oder FAQ eingebettet | "...bei der Beantragung von [Pflegeleistungen](/...)" | Direkte Relation zum Ziel-Baustein |
| `redaktionell` | "Weitere Leistungen", "Gut zu wissen"-Blöcke | Hausnotrufsystem, Kombinationsleistung am Seitenende | Kuratiierte Nähe, muss inhaltlich geprüft werden |
| `service` | Terminbuchung, Online-Portal, Telefonnummern | Videoberatung, Pflegenavigator, Formularcenter | Wird Kontextquelle vom Typ "Tool/Service" |
| `hub-struktur` | Kacheln/Linklisten der Hub-Seite | Alle 24 Leistungslinks auf der Pflege-Hub-Seite | Cluster-Zugehörigkeit, Kategorisierungs-Input |

**Output pro Seite:** Eine Markdown-Datei + eine Metadaten-Datei (oder Frontmatter-Block) mit URL, Crawl-Datum und klassifizierter Link-Liste.

**Beispiel-Output Link-Liste:**

```yaml
quell_url: /krankheit-behandlung-und-pflege/pflegeberatung
links:
  inhaltlich:
    - url: /krankheit-behandlung-und-pflege/pflegeleistungen-beantragen
      linktext: "Beantragung von Pflegeleistungen"
      kontext: "FAQ – Pflegeberater helfen bei der Beantragung"
  redaktionell:
    - url: /krankheit-behandlung-und-pflege/hausnotrufsystem
      linktext: "Hausnotrufsystem"
      kontext: "Weitere Leistungen-Block"
    - url: /krankheit-behandlung-und-pflege/technische-pflegehilfsmittel
      linktext: "Technische Pflegehilfsmittel"
      kontext: "Weitere Leistungen-Block"
    - url: /krankheit-behandlung-und-pflege/kombinationsleistung
      linktext: "Kombinationsleistung"
      kontext: "Weitere Leistungen-Block"
  service:
    - url: https://videocall.deine-gesundheitswelt.de/aoksan/videoberatung
      linktext: "Videoberatung buchen"
    - url: /service/online-terminvereinbarung
      linktext: "Termin vereinbaren"
    - url: https://pflege.aok.de/
      linktext: "Familiencoach Pflege"
      kontext: "Externes Tool für pflegende Angehörige"
```

### Schritt 2: Baustein-Extraktion (Pass 1)

**Ziel:** Jeden Artikel in typisierte, atomare Bausteine zerlegen – mit freier Kategorisierung.

**Bausteintypen:**

| Typ | Beschreibung |
|---|---|
| FAKT | Objektive, überprüfbare Information |
| EMPFEHLUNG | Handlungsanweisung, Best Practice |
| WARNUNG | Risiko, Kontraindikation |
| LEISTUNG | AOK-spezifisches Angebot |
| TIPP | Praktischer Hinweis |
| VERWEIS | Hinweis auf anderes Thema/Leistung |
| PROZESS | Schritt-für-Schritt-Anleitung |

**Regeln für die Extraktion:**

1. Jeder Baustein muss eigenständig verständlich sein – keine Verweise wie "wie oben beschrieben"
2. Marketing-Sprache entfernen ("Wir sind für Sie da", "Profitieren Sie von...")
3. CTAs und Werbetexte weglassen
4. Konkrete Fakten, Beträge, Fristen, Voraussetzungen beibehalten
5. Einen Baustein pro klar abgrenzbarem Informationsgehalt
6. Kategorien frei vergeben (was fühlt sich richtig an) – wird in Schritt 3 konsolidiert
7. Quell-URL als Herkunft am Baustein vermerken

**Output:** Liste von Bausteinen pro Seite, jeweils mit Typ, freier Kategorie, Inhalt und Quell-URL.

### Schritt 3: Taxonomie-Konsolidierung

**Ziel:** Aus den frei vergebenen Kategorien eine konsistente Cluster-Taxonomie ableiten.

**Vorgehen:**

1. Alle Kategorien aus Schritt 2 sammeln
2. Gruppieren, Synonyme identifizieren, Hierarchie vorschlagen
3. Taxonomie auf max. 15–20 Kategorien pro Cluster begrenzen
4. **Mensch prüft und gibt frei** – dieser Schritt ist nicht vollautomatisch

**Input aus Hub-Seite nutzen:** Die Gruppierung der Hub-Seite (Pflege zu Hause, Ambulant betreute Wohngruppe, etc.) als Orientierung, aber nicht als Zwang – die Bausteine könnten eine andere Ordnung nahelegen.

### Schritt 4: Re-Kategorisierung (Pass 2)

**Ziel:** Alle Bausteine der finalen Taxonomie zuordnen.

### Schritt 5: Gruppierung & Duplikat-Erkennung

**Ziel:** Bausteine nach Kategorie gruppieren, inhaltliche Überschneidungen finden.

Hier wird relevant, dass wir mehrere Seiten gecrawlt haben: Dieselbe Information (z.B. "Pflegegrad 2 ist Voraussetzung") kann auf mehreren Seiten stehen.

### Schritt 6: Konsolidierung

**Ziel:** Duplikate und Überschneidungen auflösen.

- LLM schlägt Zusammenführungen vor
- **Mensch prüft** – keine automatische Zusammenführung

### Schritt 7: Kontext-Anreicherung

**Ziel:** Jeden Baustein mit fünf Kontextdimensionen als Metadaten versehen.

**Die fünf Dimensionen:**

| Dimension | Frage | Beispiel-Metadaten |
|---|---|---|
| Bedeutung | Was heißt das inhaltlich? | Kurzdefinition, Fachbegriff-Übersetzung |
| Struktur | Wie hängt es zusammen? | Relationen (siehe unten) |
| Qualität | Kann ich mich darauf verlassen? | Stand-Datum, Volatilität, Validierungsstatus |
| Regeln | Was darf das System damit tun? | Haftungshinweis, Eskalationsregel |
| Zielgruppe | Für wen ist das relevant? | Zielgruppen-Tags, Kontext-Marker |

**Relationen aufbauen (aus Link-Daten von Schritt 1):**

| Relationstyp | Bedeutung |
|---|---|
| `voraussetzung` | A setzt B voraus |
| `kombinierbar_mit` | A und B zusammen nutzbar |
| `alternative_zu` | A oder B, nicht beides voll |
| `verwandt_mit` | Thematischer Zusammenhang |
| `teil_von` | A gehört zu B |
| `ersetzt_durch` | A wurde durch B abgelöst |

**Wichtig:** Relationen sind bidirektional. Wenn Pflegegeld → kombinierbar_mit → Sachleistung, dann auch Sachleistung → kombinierbar_mit → Pflegegeld.

**Link-Klassen als Relationsquelle:**

- `inhaltlich`-Links → Direkte Relation (Typ aus Kontext ableiten)
- `redaktionell`-Links → Prüfen ob echte Relation oder nur redaktionelle Kuration
- `hub-struktur`-Links → `teil_von`-Relationen zur Cluster-Ebene
- `service`-Links → Werden keine Baustein-Relationen, sondern Verweise auf Service-Kontextquellen

### Schritt 8: QS durch AOK

**Ziel:** Fachredakteure prüfen Bausteine auf inhaltliche Korrektheit.

(Im ersten Test: Wir selbst prüfen gegen die Original-Website.)

---

## Zielformat: Markdown mit Frontmatter

Jeder fertige Baustein sieht so aus:

```markdown
---
titel: "Pflegegeld"
typ: LEISTUNG
cluster: pflege
kategorie: geldleistungen
stand: "2025-01-15"
volatilitaet: hoch
validiert: false
quellen:
  - url: "https://www.deine-gesundheitswelt.de/krankheit-behandlung-und-pflege/pflegegeld"
    crawl_datum: "2025-03-01"
zielgruppe:
  - pflegebeduerftige
  - angehoerige
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
  setting: "haeuslich"
haftungshinweis: "Beträge gemäß aktueller Gesetzeslage. Individuelle Ansprüche können abweichen."
rechtsgrundlage: "§ 37 SGB XI"
relationen:
  - typ: alternative_zu
    ziel: pflegesachleistung
  - typ: kombinierbar_mit
    ziel: pflegesachleistung
    details: "Über Kombinationsleistung, prozentuale Verrechnung"
  - typ: voraussetzung
    ziel: pflegegrade
  - typ: verwandt_mit
    ziel: verhinderungspflege
---

## Pflegegeld

Pflegegeld ist eine monatliche Geldleistung der Pflegekasse für
pflegebedürftige Personen, die zu Hause von Angehörigen oder anderen
privaten Pflegepersonen versorgt werden.

## Voraussetzungen

- Pflegegrad 2 oder höher
- Pflege erfolgt im häuslichen Umfeld
- Pflege wird durch private Pflegeperson erbracht (nicht durch Pflegedienst)

## Beträge (Stand 2025)

| Pflegegrad | Monatlich |
|---|---|
| 2 | 332 € |
| 3 | 573 € |
| 4 | 765 € |
| 5 | 947 € |

## Kombinierbarkeit

Pflegegeld und Pflegesachleistung sind kombinierbar über die
Kombinationsleistung. Die Anteile werden prozentual verrechnet.
```

---

## Arbeitsweise

- **Iterativ:** Jeden Schritt einzeln ausführen, Ergebnis prüfen, dann weiter
- **Zwischenergebnisse speichern:** Nach jedem Schritt Output in Dateien schreiben
- **Bei Unsicherheiten fragen:** Lieber nachfragen als falsche Annahmen treffen
- **Nicht overengineeren:** Für 2–3 Testseiten pragmatisch bleiben, Multi-Pass-Ansatz ist für Skalierung auf 80+ Artikel gedacht

---

## Referenz-Dokumente (im Projekt vorhanden)

| Dokument | Enthält |
|---|---|
| `_aok-content-to-context-methodik.md` | Vollständige Pipeline-Beschreibung, Extraktions-Prompts, Aufwandsschätzungen |
| `_context-engineering-arbeitshilfe.md` | Prüflisten für die 5 Kontextdimensionen, Relationstypen, typische Fehler |
| `_aok-ai-assistent-architektur.md` | Gesamtarchitektur des Assistenten (4 Ebenen) |
| `_aok-assistent-verfassung.md` | Systemverfassung (wird später der System-Prompt) |
| `_sava-7-kernintentionen.md` | Intentionen-Engine (7 Kernintentionen) |
| `_context-storage-retrieval-architektur.md` | Storage-Optionen und Stufenplan (wir sind in Stufe 1) |
