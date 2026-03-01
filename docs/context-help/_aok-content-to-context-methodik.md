Content-to-Context: Methodik zur LLM-Aufbereitung von AOK-Inhalten

**Leitfaden für die Transformation von Website-Content in strukturierte Wissensbasen für AI-Assistenten**

Version: 0.4 Draft Stand: Februar 2025 Autoren: queonext / loschke.ai

--------------------------------------------------------------------------------

1. Warum dieses Dokument?

Die AOK Sachsen-Anhalt entwickelt AI-Assistenten, die Versicherten und Angehörigen fundierte Antworten auf Gesundheitsfragen liefern sollen. Der bestehende Website-Content (deine-gesundheitswelt.de) ist dafür nicht direkt nutzbar. Er ist für menschliche Leser optimiert, nicht für LLMs.

Dieses Dokument beschreibt zwei Dinge:

Erstens das konzeptionelle Fundament: Was braucht ein AI-System, um verlässlich zu antworten, und warum reicht bestehender Website-Content dafür nicht aus? (Kapitel 2–4)

Zweitens die operative Methodik: Wie transformieren wir Website-Content systematisch in eine LLM-taugliche Wissensbasis? (Kapitel 5–9)

Die Bausteine werden als Markdown-Dateien mit strukturiertem Frontmatter (Metadaten) erstellt – menschenlesbar und maschinell parsbar zugleich.

Die Methodik wird am Themencluster Schwangerschaft (~80 Artikel) pilotiert und auf weitere Cluster (Pflege, Vorsorge etc.) ausgerollt.

--------------------------------------------------------------------------------

2. Das Grundproblem: Content ≠ Context

Was auf der Website steht

Die AOK-Gesundheitswelt folgt klassischen Web-Patterns. Am Beispiel des Pflege-Bereichs:

**Hub-Seiten** mit emotionaler Rahmung ("Wir sind an Ihrer Seite"), Teaser-Absätzen und Links auf ~20 Unterseiten. Die Hub-Seite selbst enthält kaum verwertbare Fakten.

**Leistungsseiten** mit einer Mischung aus erklärendem Text, Marketing-Elementen, CTAs und den eigentlichen Sachinformationen – oft in Accordions versteckt.

**Artikel** (besonders im Schwangerschafts-Bereich) mit redaktionellem Content, der Fakten, Empfehlungen und Tipps in Fließtext verpackt.

Warum ein LLM damit nicht arbeiten kann

| Problem                     | Beispiel                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| Niedrige Informationsdichte | "Die AOK Sachsen-Anhalt ist in einem solchen Fall für Sie da" – null Informationsgehalt   |
| Fragmentiertes Wissen       | Pflegegeld-Beträge auf Seite A, Voraussetzungen auf Seite B, Kombinierbarkeit auf Seite C |
| Fehlende Relationen         | "Mehr Informationen finden Sie hier" statt expliziter Zusammenhänge                       |
| Marketing-Rauschen          | CTAs, emotionale Rahmung, SEO-Texte verwässern die Fakten                                 |
| Accordion-Inhalte           | Oft nicht im Standard-Crawl enthalten                                                     |

Das Kernproblem lässt sich auf einen Satz reduzieren: Die Website hat Content, aber dem AI-System fehlt der Kontext.

--------------------------------------------------------------------------------

3. Was ist Context Engineering?

Context Engineering ist die systematische Aufbereitung von Informationen, damit AI-Systeme sie nicht nur finden, sondern auch verstehen und angemessen nutzen können.

Es geht nicht um bessere Prompts. Es geht darum, was das System *weiß*, bevor eine Frage überhaupt gestellt wird.

**Prompt Engineering fragt:** "Wie formuliere ich meine Anfrage optimal?"

**Context Engineering fragt:** "Welches Wissen und welche Rahmenbedingungen braucht das System, um sinnvoll zu antworten?"

Für die AOK bedeutet das: Nicht nur die Fakten aus der Website extrahieren, sondern diese Fakten mit allem anreichern, was ein menschlicher Berater implizit weiß – Zusammenhänge, Gültigkeiten, Einschränkungen, Zielgruppen.

Fünf Dimensionen von Kontext

Vollständiger Kontext beantwortet fünf grundlegende Fragen. Jede Dimension, die fehlt, erzeugt eine spezifische Art von Fehler im AI-System.

| Dimension      | Kernfrage                       | Was passiert, wenn sie fehlt?                        |
| -------------- | ------------------------------- | ---------------------------------------------------- |
| **Bedeutung**  | Was ist das inhaltlich?         | System gibt generische oder falsche Antworten        |
| **Struktur**   | Wie hängt es zusammen?          | System liefert fragmentierte Teilantworten           |
| **Qualität**   | Kann ich mich darauf verlassen? | System nutzt veraltete oder ungeprüfte Informationen |
| **Regeln**     | Was gilt?                       | System überschreitet Grenzen (Haftung, Datenschutz)  |
| **Zielgruppe** | Für wen?                        | System antwortet am Bedarf vorbei                    |

Im Folgenden wird jede Dimension am AOK-Content illustriert.

--------------------------------------------------------------------------------

3.1 Bedeutungskontext: Was ist das inhaltlich?

**Problem:** Dieselben Begriffe meinen auf der AOK-Website je nach Seite etwas anderes.

"Pflegegeld" kann den gesetzlichen Anspruch meinen (SGB XI §37), den konkreten Betrag (332 € bei Pflegegrad 2), den Antragsprozess oder die Unterscheidung zur Sachleistung. Auf der Website ist das kein Problem – der Leser navigiert und erschließt sich den Kontext selbst. Für ein LLM, das einen einzelnen Chunk abruft, ist es fatal.

"Verhinderungspflege" wird auf einer Seite als eigenständige Leistung beschrieben, auf einer anderen als Teil einer Aufzählung von Entlastungsangeboten, und auf einer dritten im Kontext von "was tun, wenn die Pflegeperson ausfällt?". Drei Seiten, drei Perspektiven auf denselben Begriff – ohne explizite Verbindung.

**Was der Kontext liefern muss:**

- Eindeutige Definitionen pro Begriff, die über alle Bausteine konsistent sind
- Taxonomien, die klären: Pflegegeld ist eine *Leistung*, gehört zur Kategorie *Pflegeleistungen*, setzt *Pflegegrad 2+* voraus
- Semantische Verknüpfungen: Pflegegeld ist die *Alternative zu* Sachleistung, *kombinierbar mit* Sachleistung über die *Kombinationsleistung*
- Übersetzung zwischen Fachsprache und Versichertensprache: "ambulante Pflege" = "Pflege zu Hause durch einen Pflegedienst"

3.2 Strukturkontext: Wie hängt es zusammen?

**Problem:** Die Website-Architektur suggeriert Zusammenhänge, die für ein LLM unsichtbar sind.

Auf der Pflege-Hub-Seite stehen 24 Kacheln nebeneinander. Ein Mensch erkennt: Pflegegeld, Sachleistung und Kombinationsleistung gehören zusammen, weil sie nah beieinander stehen und ähnlich heißen. Ein LLM, das nur die Pflegegeld-Seite im Kontext hat, weiß davon nichts.

Schlimmer noch: Die eigentlich entscheidende Information – dass Pflegegeld und Sachleistung nicht einfach addiert, sondern prozentual verrechnet werden – steht auf der Seite "Kombinationsleistung". Wer nach Pflegegeld fragt, bekommt diese Info nicht mitgeliefert.

Im Schwangerschafts-Bereich ist es ähnlich: Ein Artikel über Ernährung in der Schwangerschaft enthält einen Halbsatz über Toxoplasmose. Der ausführliche Toxoplasmose-Artikel steht woanders, ist aber nicht explizit verlinkt. Die Information existiert – aber die Verbindung ist implizit.

**Was der Kontext liefern muss:**

- Explizite Relationen zwischen Bausteinen: "kombinierbar_mit", "voraussetzung_für", "alternative_zu", "gehört_zu"
- Hierarchien: Pflegegeld → Pflegeleistungen → Leistungen bei Pflegebedürftigkeit → Pflege
- Herkunft: Dieser Baustein wurde aus welchen Quellseiten extrahiert?
- Versionierung: Stand der Information (relevant bei Gesetzesänderungen)

3.3 Qualitätskontext: Kann ich mich darauf verlassen?

**Problem:** Nicht alle Informationen auf der Website sind gleich verlässlich – aber ein LLM behandelt sie alle gleich.

Die Pflegegeld-Beträge auf der Website könnten aus dem Vorjahr stammen. Ein allgemeiner Ratgeber-Satz wie "Sprechen Sie mit Ihrem Arzt" ist zeitlos gültig, ein konkreter Betrag nicht. Ein redaktioneller Schwangerschafts-Artikel basiert möglicherweise auf einer Studie, deren Empfehlungen inzwischen überholt sind.

Für eine Krankenkasse ist das keine theoretische Sorge. Ein Assistent, der veraltete Leistungsbeträge nennt, erzeugt konkrete Probleme: falsche Erwartungen, Beschwerden, Vertrauensverlust.

**Was der Kontext liefern muss:**

- Aktualitätsmarker pro Baustein: "Stand: 2025-01", "Prüfintervall: bei Gesetzesänderung"
- Volatilitätskennzeichnung: Beträge sind hochvolatil (ändern sich bei Gesetzesänderungen), medizinische Empfehlungen sind mittel-volatil, SGB-Paragraphen-Verweise sind stabil
- Validierungsstatus: Geprüft durch AOK-Fachredaktion vs. aus Web-Crawl extrahiert und noch nicht validiert
- Quellenpriorisierung: Bei widersprüchlichen Angaben gilt die Fachredaktions-Version, nicht der Marketing-Text

3.4 Regelkontext: Was gilt?

**Problem:** Ein AI-Assistent einer Krankenkasse bewegt sich in einem regulierten Umfeld. Ohne explizite Regeln wird er Grenzen überschreiten.

Der Assistent darf allgemeine Informationen über Pflegeleistungen geben. Er darf nicht beurteilen, ob eine konkrete Person Anspruch auf einen bestimmten Pflegegrad hat – das ist Aufgabe des Medizinischen Dienstes. Wo genau die Grenze liegt, ist auf der Website nirgendwo definiert, weil ein menschlicher Berater sie intuitiv kennt.

Im Schwangerschafts-Bereich: Der Assistent darf Ernährungstipps geben, aber keine medizinischen Diagnosen stellen. Er darf auf die Kostenübernahme für bestimmte Untersuchungen hinweisen, aber keine individuellen Zusagen machen.

**Was der Kontext liefern muss:**

- Haftungsgrenzen pro Baustein: "Allgemeine Information, keine Einzelfallberatung"
- Eskalationsregeln: Bei welchen Fragen verweist der Assistent an persönliche Beratung?
- Tonalitäts-Vorgaben: Professionell, empathisch, aber keine Heilversprechen, keine Diagnosen
- Compliance-Marker: Welche Aussagen darf der Assistent machen, welche nicht?
- Rechtsgrundlagen: SGB XI Paragraphen, auf die sich Leistungsaussagen stützen

3.5 Zielgruppenkontext: Für wen?

**Problem:** Die AOK-Website richtet sich an ein breites Publikum. Ein AI-Assistent muss differenzieren können.

Eine pflegebedürftige Person fragt anders als ein pflegender Angehöriger. Ein Angehöriger, der gerade erst mit dem Thema konfrontiert wird, braucht eine andere Antworttiefe als jemand, der seit zwei Jahren pflegt und nach Verhinderungspflege fragt, weil er weiß, dass es sie gibt.

Im Schwangerschafts-Bereich: Eine Erstgebärende im 1. Trimester hat andere Fragen als eine Zweitgebärende im 3. Trimester. Beide lesen denselben Website-Artikel – der Assistent sollte unterschiedlich antworten können.

**Was der Kontext liefern muss:**

- Zielgruppen-Tags pro Baustein: "pflegebedürftige", "angehörige", "beruflich Pflegende"
- Kontext-Tags: Pflegegrade, Trimester, Lebenssituation
- Sprachebene: Fachsprache vs. Alltagssprache – der Baustein selbst ist faktisch, aber der Assistent muss die Metadaten haben, um die Antwort anzupassen
- Relevanz-Marker: Dieses Thema ist besonders relevant für Personen in Situation X

--------------------------------------------------------------------------------

3.6 Zusammenfassung: Von Website-Text zu vollständigem Kontext

Das folgende Beispiel zeigt den Unterschied am Thema Pflegegeld:

**Website-Content (Ist-Zustand):**

*Pflegegeld erhalten Pflegebedürftige, die zu Hause von Angehörigen oder Freunden gepflegt werden. Die Höhe richtet sich nach dem Pflegegrad. [Link: Mehr erfahren]*

Fünf Sätze, eine Verlinkung. Für einen Website-Leser ausreichend. Für ein LLM fehlen: der konkrete Betrag, die genaue Voraussetzung, die Abgrenzung zur Sachleistung, die Kombinierbarkeit, der Antragsprozess, die Rechtsgrundlage, die Zielgruppe, der Aktualitätsstatus, die Haftungsgrenze.

**Context-Baustein (Ziel-Zustand):**

```
---
typ: LEISTUNG
kategorie: Pflegeleistungen
rechtsgrundlage: SGB XI §37
stand: 2025-01
volatilitaet: hoch               # Beträge ändern sich bei Gesetzesänderung
validiert: true                   # Durch AOK-Fachredaktion geprüft
zielgruppe:
  - pflegebedürftige
  - angehörige
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
haftungshinweis: >
  Allgemeine Leistungsinformation. Individueller Anspruch
  abhängig von Begutachtung durch Medizinischen Dienst.
relationen:
  - typ: kombinierbar_mit
    ziel: pflege/leistungen/pflegesachleistung
    hinweis: Anteilige Verrechnung über Kombinationsleistung
  - typ: alternative_zu
    ziel: pflege/leistungen/pflegesachleistung
  - typ: voraussetzung
    ziel: pflege/grundlagen/pflegegrade
  - typ: verwandt_mit
    ziel: pflege/leistungen/verhinderungspflege
    hinweis: Pflegegeld wird bei Verhinderungspflege anteilig weitergezahlt
---

# Pflegegeld

Geldleistung der Pflegeversicherung für Pflegebedürftige ab
Pflegegrad 2, die ihre Pflege selbst organisieren – in der Regel
durch Angehörige, Freunde oder andere nicht-professionelle Pflegepersonen.

## Voraussetzungen

- Anerkannter Pflegegrad 2, 3, 4 oder 5
- Pflege wird nicht durch professionellen Pflegedienst erbracht
- Häusliche Pflege (nicht stationär)

## Leistungsumfang

| Pflegegrad | Betrag/Monat |
|------------|-------------|
| Pflegegrad 2 | 332 € |
| Pflegegrad 3 | 573 € |
| Pflegegrad 4 | 765 € |
| Pflegegrad 5 | 947 € |

Pflegegrad 1: kein Anspruch auf Pflegegeld.

## Antragstellung

Antrag bei der Pflegekasse (AOK Sachsen-Anhalt).
Pflegegrad muss anerkannt sein oder gleichzeitig beantragt werden.

## Kombinierbarkeit

Pflegegeld und Pflegesachleistung sind kombinierbar über die
Kombinationsleistung. Die Anteile werden prozentual verrechnet:
Wird 60% der Sachleistung ausgeschöpft, werden 40% des
Pflegegeldes ausgezahlt.

## Besonderheiten

- Pflegegeld wird direkt an die pflegebedürftige Person gezahlt,
  nicht an die Pflegeperson
- Regelmäßige Beratungseinsätze sind Pflicht (§37.3 SGB XI)
- Bei Krankenhausaufenthalt: Weiterzahlung für 28 Tage
```

Derselbe Sachverhalt – aber mit allen fünf Dimensionen angereichert. Die Metadaten stehen im Frontmatter (maschinell parsbar), der Inhalt als lesbarer Fließtext darunter. Der Assistent kann auf Basis dieses Bausteins eine Frage zum Pflegegeld korrekt, vollständig und im richtigen Rahmen beantworten.

--------------------------------------------------------------------------------

4. Das Zwei-Ebenen-Modell: Content und Context

Kerngedanke

Zukünftig braucht die AOK zwei Ausspielungsebenen für ihr Wissen:

|                        | Content-Ebene (Website)               | Context-Ebene (AI-Assistent)                |
| ---------------------- | ------------------------------------- | ------------------------------------------- |
| **Zweck**              | Menschen informieren, SEO, Conversion | LLMs mit strukturiertem Wissen versorgen    |
| **Format**             | HTML, Bilder, Videos, CTAs            | Strukturierte Markdown-Chunks mit Metadaten |
| **Sprache**            | Emotional, Marketing, Storytelling    | Faktisch, präzise, vollständig              |
| **Struktur**           | Teaser → Klickpfade → Unterseiten     | Atomare Bausteine, gruppiert nach Taxonomie |
| **Pflege**             | Redaktionsteam                        | Fachteam + Redaktion                        |
| **Kontextdimensionen** | Implizit (Leser erschließt selbst)    | Explizit (alle 5 Dimensionen als Metadaten) |

Beide Ebenen haben ihre Berechtigung. SEO-optimierte Artikel und emotional ansprechende Landingpages bleiben wichtig. Aber der AI-Assistent braucht eine eigene Datengrundlage.

Zukunftsvision: Write Once, Publish Twice

Idealzustand: Eine gemeinsame Wissensquelle ("Single Source of Truth"), aus der beide Ebenen gespeist werden. Der Fachredakteur pflegt strukturierte Fakten einmal, daraus entstehen sowohl Website-Texte als auch LLM-Chunks. Die fünf Kontextdimensionen werden dabei zur gemeinsamen Metadaten-Schicht, die beiden Kanälen dient.

Pragmatischer Weg (jetzt)

Den umgekehrten Weg gehen: Vom bestehenden Website-Content die Fakten extrahieren, strukturieren und mit Kontextdimensionen anreichern. Das erzeugt zunächst zwei getrennte Pflegeprozesse, liefert aber sofort eine nutzbare Wissensbasis.

**Wichtig:** Auch der pragmatische Weg sollte die fünf Dimensionen von Anfang an mitdenken – nicht erst im Nachgang ergänzen. Jeder Baustein, der ohne Qualitätskontext (Stand, Validierung) oder Regelkontext (Haftungsgrenze) entsteht, muss später nachbearbeitet werden. Das Mehr an Aufwand bei der Erstellung spart ein Vielfaches bei der Korrektur.

--------------------------------------------------------------------------------

5. Die Transformations-Pipeline

Der Prozess ist als Multi-Step-Pipeline angelegt, um Qualität sicherzustellen und auf beliebige Themencluster skalieren zu können.

```
SCHRITT 1: Content-Extraktion
  Firecrawl → Artikel als Markdown
                    ↓
SCHRITT 2: Baustein-Extraktion (Pass 1)
  LLM extrahiert atomare Bausteine + freie Kategorisierung
                    ↓
SCHRITT 3: Taxonomie-Konsolidierung
  LLM analysiert alle Kategorien → schlägt finale Taxonomie vor
                    ↓
SCHRITT 4: Re-Kategorisierung (Pass 2)
  Bausteine werden finaler Taxonomie zugeordnet
                    ↓
SCHRITT 5: Gruppierung & Duplikat-Erkennung
  Bausteine nach Kategorie gruppieren, Überschneidungen finden
                    ↓
SCHRITT 6: Konsolidierung
  LLM schlägt Zusammenführungen vor, Mensch prüft
                    ↓
SCHRITT 7: Kontext-Anreicherung & Struktur-Aufbau
  Fünf Dimensionen als Metadaten, Relationen, finale Struktur
                    ↓
SCHRITT 8: QS durch AOK
  Fachredakteure prüfen Bausteine auf Korrektheit
```

--------------------------------------------------------------------------------

5.1 Schritt 1: Content-Extraktion

**Ziel:** Alle Artikel eines Themenclusters als sauberen Markdown extrahieren.

**Tool:** Firecrawl oder vergleichbar.

**Input:** Liste der Artikel-URLs zum jeweiligen Themencluster.

**Herausforderungen:**

- **Accordion-Inhalte:** Die AOK-Website verwendet Accordions, die im Standard-Crawl möglicherweise nicht geöffnet werden. Vorab testen, ob Firecrawl JavaScript rendert, ggf. alternative Extraktion nötig.
- **Navigation/Footer:** Crawl-Output enthält Website-Struktur-Elemente, die gefiltert werden müssen.
- **Interne Verlinkungen:** Links zu anderen Artikeln oder Leistungsseiten erfassen – werden später als Relationen gebraucht.

**Output:** Markdown-Dateien, eine pro Artikel/Seite. Pro Datei: Original-URL und Crawl-Datum als Metadaten.

**Scope-Übersicht nach Themencluster:**

| Cluster         | Geschätzter Umfang  | Content-Typ                                  |
| --------------- | ------------------- | -------------------------------------------- |
| Schwangerschaft | ~80 Artikel         | Überwiegend redaktioneller Content, Ratgeber |
| Pflege          | ~24 Leistungsseiten | Überwiegend Leistungsbeschreibungen, Fakten  |
| Vorsorge        | tbd                 | Mischung                                     |

Hinweis: Die Content-Typen unterscheiden sich erheblich. Schwangerschafts-Artikel sind textlastig mit eingestreuten Fakten. Pflege-Seiten sind strukturierter, aber fragmentiert über viele Unterseiten. Die Pipeline muss mit beiden Typen umgehen können.

--------------------------------------------------------------------------------

5.2 Schritt 2: Baustein-Extraktion (Pass 1)

**Ziel:** Jeden Artikel in typisierte, atomare Bausteine zerlegen – mit freier Kategorisierung.

**Bausteintypen:**

| Typ        | Beschreibung                                     | Beispiel                                                    |
| ---------- | ------------------------------------------------ | ----------------------------------------------------------- |
| FAKT       | Objektive, überprüfbare Information              | "Pflegegeld Grad 2: 332 € monatlich"                        |
| EMPFEHLUNG | Handlungsanweisung, Best Practice                | "Linke Seitenlage ist optimal ab dem 2. Trimester"          |
| WARNUNG    | Risiko, Kontraindikation, Symptom für Arztbesuch | "Bei Schwindel in Rückenlage sofort Position wechseln"      |
| LEISTUNG   | AOK-spezifisches Angebot                         | "Toxoplasmose-Test wird bezuschusst"                        |
| TIPP       | Praktischer Hinweis                              | "Stillkissen zwischen den Knien hilft beim Schlafen"        |
| VERWEIS    | Hinweis auf anderes Thema/Leistung               | "Siehe auch: Kombinationsleistung"                          |
| PROZESS    | Schritt-für-Schritt-Anleitung                    | "Pflegegrad beantragen: 1. Antrag stellen, 2. MD-Besuch..." |

**Extraktions-Prompt (Entwurf):**

```
Du bist ein Experte für Content-Strukturierung im Gesundheitsbereich.

Deine Aufgabe: Extrahiere aus dem folgenden Artikel alle relevanten 
Informationen als atomare Bausteine.

## Regeln für Bausteine:

1. Jeder Baustein enthält EINE konkrete Information
2. Bausteine sind ohne den Artikel-Kontext verständlich
3. Entferne Marketing-Sprache, Einleitungen, Überleitungen
4. Behalte medizinische/rechtliche Präzision bei
5. Wenn der Artikel auf andere Themen verweist, erstelle VERWEIS-Bausteine
6. Bei Leistungen: Beträge, Voraussetzungen und Pflegegrade explizit nennen
7. Bei Prozessen: Schritte klar nummerieren

## Ausgabeformat pro Baustein:

- typ: [FAKT|EMPFEHLUNG|WARNUNG|LEISTUNG|TIPP|VERWEIS|PROZESS]
  kategorie: [Freie Vergabe – was beschreibt das Thema am besten?]
  titel: [Kurzer, prägnanter Titel]
  inhalt: |
    [Der eigentliche Inhalt]
  quelle: [Dateiname des Artikels]

## Artikel:

{artikel_inhalt}
```

**Erwartung:** In Pass 1 entstehen inkonsistente Kategorien (z.B. "Schlaf" vs. "Schlafposition" vs. "Nachtruhe"). Das ist gewollt – die freie Vergabe liefert Material für die Taxonomie-Bildung in Schritt 3.

--------------------------------------------------------------------------------

5.3 Schritt 3: Taxonomie-Konsolidierung

**Ziel:** Aus allen frei vergebenen Kategorien eine konsistente Taxonomie pro Themencluster ableiten.

**Input:** Liste aller vergebenen Kategorien mit Häufigkeit und Beispiel-Bausteinen.

**Prompt (Entwurf):**

```
Du hast folgende Kategorien aus der Extraktion von {n} Artikeln 
zum Thema {themencluster} erhalten:

{liste_kategorien_mit_häufigkeit}

Aufgabe:
1. Identifiziere Synonyme und Überschneidungen
2. Schlage eine konsolidierte Taxonomie vor (max. 15-20 Kategorien)
3. Für jede Kategorie: Definiere kurz, was hineingehört
4. Zeige, welche Original-Kategorien auf welche neue Kategorie mappen

Beachte:
- Die Taxonomie muss für einen AI-Assistenten geeignet sein
- Kategorien sollten trennscharf sein
- Lieber etwas gröber als zu feingranular
```

**Bezug zu den Kontextdimensionen:** Die Taxonomie ist der Kern des Bedeutungskontexts. Sie definiert, wie das System Themen versteht und abgrenzt. Eine schlechte Taxonomie zieht sich durch alle Folgeschritte – hier lohnt sich besondere Sorgfalt.

**Menschlicher Review:** Taxonomie-Vorschlag prüfen, ggf. Kategorien zusammenlegen oder trennen, finale Taxonomie freigeben.

--------------------------------------------------------------------------------

5.4 Schritt 4: Re-Kategorisierung (Pass 2)

**Ziel:** Alle Bausteine mit der finalen Taxonomie neu taggen.

**Zwei Varianten:**

**Variante A: Automatisches Mapping** – Wenn Original-Kategorie eindeutig mappt, automatisch umschreiben. Nur uneindeutige Fälle an LLM. Schneller, aber fehleranfälliger.

**Variante B: Vollständiger Re-Run** – Alle Bausteine erneut durch LLM, diesmal mit vorgegebener Taxonomie. Gründlicher, höhere API-Kosten.

Empfehlung: Variante A mit stichprobenartiger Kontrolle. Bei >10% Zuordnungsfehlern auf Variante B wechseln.

--------------------------------------------------------------------------------

5.5 Schritt 5: Gruppierung & Duplikat-Erkennung

**Ziel:** Bausteine nach Kategorie gruppieren, inhaltliche Duplikate und Überschneidungen identifizieren.

**Duplikat-Erkennung – zwei Ansätze:**

**Ansatz A: Embedding-basiert** – Alle Bausteine einer Kategorie embedden, Cosine Similarity berechnen. Hohe Ähnlichkeit (>0.85) als potenzielle Duplikate flaggen. Gut skalierbar, aber erkennt nur semantische Nähe, nicht inhaltliche Widersprüche.

**Ansatz B: LLM-basiert** – Alle Bausteine einer Kategorie an LLM, der inhaltliche Überschneidungen identifiziert. Präziser, aber teurer bei vielen Bausteinen.

**Erwartete Duplikat-Rate:** 20-30% Überschneidung, besonders bei Themen, die in mehreren Artikeln behandelt werden.

**Output pro Kategorie:** Liste von Duplikat-Clustern mit allen betroffenen Bausteinen und ihren Quellen.

--------------------------------------------------------------------------------

5.6 Schritt 6: Konsolidierung

**Ziel:** Aus Duplikat-Clustern jeweils einen finalen, vollständigen Baustein erstellen.

**Prompt (Entwurf):**

```
Die folgenden Bausteine enthalten überlappende Informationen zum 
gleichen Thema. Erstelle daraus EINEN konsolidierten Baustein, der:

1. Alle relevanten Informationen enthält
2. Die präziseste Formulierung verwendet
3. Keine Redundanz hat
4. Die Quellen als Liste aufführt
5. Bei widersprüchlichen Angaben: den Widerspruch benennen

## Bausteine zur Konsolidierung:

{duplikat_cluster}
```

**Menschlicher Review:** Sicherstellen, dass keine Information verloren geht. Widersprüche auflösen (ggf. mit AOK-Fachteam). Medizinische/rechtliche Korrektheit validieren.

Dieser Schritt ist der aufwändigste – hier entsteht die eigentliche Qualität der Knowledge Base.

--------------------------------------------------------------------------------

5.7 Schritt 7: Kontext-Anreicherung & Struktur-Aufbau

**Ziel:** Konsolidierte Bausteine mit den fünf Kontextdimensionen als Metadaten anreichern und als finale Context-Cluster-Struktur zusammenbauen.

Dieser Schritt macht den Unterschied zwischen einer einfachen FAQ-Sammlung und einer echten Wissensbasis. Hier werden aus extrahierten Fakten kontextualisierte Wissenseinheiten.

**Schema pro Baustein (Markdown mit Frontmatter):**

```
---
typ: LEISTUNG
kategorie: Pflegeleistungen
# --- Zielgruppenkontext ---
zielgruppe:
  - pflegebedürftige
  - angehörige
kontext_tags:
  pflegegrade: [2, 3, 4, 5]       # Pflege-Cluster
  # trimester: [1, 2, 3]           # Schwangerschafts-Cluster
# --- Qualitätskontext ---
stand: 2025-01
volatilitaet: hoch                 # hoch | mittel | niedrig
validiert: true
naechste_pruefung: bei Gesetzesänderung
# --- Regelkontext ---
rechtsgrundlage: SGB XI §37
haftungshinweis: Allgemeine Leistungsinformation
# --- Strukturkontext (Quellen) ---
quellen:
  - artikel-pflegegeld.md
  - artikel-leistungen-ueberblick.md
quelle_url: https://www.deine-gesundheitswelt.de/...
# --- Strukturkontext (Relationen) ---
relationen:
  - typ: kombinierbar_mit
    ziel: pflege/leistungen/pflegesachleistung
    hinweis: Anteilige Verrechnung über Kombinationsleistung
  - typ: voraussetzung
    ziel: pflege/grundlagen/pflegegrade
  - typ: alternative_zu
    ziel: pflege/leistungen/pflegesachleistung
---

# Pflegegeld

[Definition: Was ist das?]

## Voraussetzungen

[Wer hat Anspruch?]

## Leistungsumfang

[Beträge, Staffelung, Zeiträume]

## Antragstellung

[Wie beantragt man es?]

## Kombinierbarkeit

[Mit welchen anderen Leistungen kombinierbar?]

## Besonderheiten

[Sonderfälle, häufige Missverständnisse]
```

Die Metadaten (alle fünf Kontextdimensionen) stehen im Frontmatter, der eigentliche Inhalt als lesbarer Markdown-Fließtext darunter. Die Datei ist gleichzeitig menschenlesbar und maschinell parsbar – Frontmatter-Parser (`gray-matter` in JS, `python-frontmatter` in Python) trennen Metadaten und Body automatisch.

**Hinweis:** Das Schema muss flexibel genug sein, um verschiedene Themencluster abzudecken. Pflege-Bausteine brauchen Pflegegrade und Rechtsgrundlagen, Schwangerschafts-Bausteine brauchen Trimester-Zuordnungen und ggf. Evidenz-Level. Die Grundstruktur (Frontmatter mit Metadaten + Markdown-Body mit Inhalt) bleibt gleich, die clusterspezifischen Felder im Frontmatter variieren.

**Inhaltliche Felder je nach Bausteintyp:**

| Typ        | Typische Inhalt-Felder                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| LEISTUNG   | definition, voraussetzungen, leistungsumfang, antragstellung, kombinierbarkeit |
| FAKT       | kernaussage, evidenz, einschraenkungen                                         |
| EMPFEHLUNG | empfehlung, begruendung, zielgruppe                                            |
| WARNUNG    | risiko, symptome, massnahmen                                                   |
| PROZESS    | schritte, voraussetzungen, dauer, dokumente                                    |
| TIPP       | tipp, kontext                                                                  |

**Kontext-Dimensionen pro Bausteintyp – was ist besonders wichtig:**

| Typ        | Kritische Dimensionen                                                 | Warum?                                 |
| ---------- | --------------------------------------------------------------------- | -------------------------------------- |
| LEISTUNG   | Qualität (Aktualität der Beträge), Regeln (Rechtsgrundlage, Haftung)  | Veraltete Beträge = konkreter Schaden  |
| FAKT       | Qualität (Evidenz, Quelle), Bedeutung (eindeutige Definition)         | Falsche Fakten = Vertrauensverlust     |
| WARNUNG    | Regeln (Eskalation an Arzt), Zielgruppe (für wen relevant?)           | Fehlende Warnung = Gesundheitsrisiko   |
| EMPFEHLUNG | Zielgruppe (wer soll das tun?), Qualität (Evidenzbasis)               | Falsche Empfehlung für falsche Person  |
| PROZESS    | Struktur (Reihenfolge, Abhängigkeiten), Qualität (aktueller Prozess?) | Veralteter Prozess = Frust beim Antrag |

**Ablage-Struktur:**

```
/context-clusters/
│
├── _schema.md                      # Template & Regeln (clusterübergreifend)
├── _kontextdimensionen.md          # Definition der fünf Dimensionen + Ausprägungen
│
├── pflege/
│   ├── _taxonomie.md               # Finale Taxonomie des Clusters
│   ├── _relationen.md              # Übersicht aller Querverbindungen
│   ├── _regelkontext.md            # Cluster-spezifische Regeln (Haftung, Eskalation)
│   ├── grundlagen/
│   │   ├── pflegebeduerftigkeit.md
│   │   ├── pflegebegutachtung.md
│   │   └── pflegegrade.md
│   ├── leistungen/
│   │   ├── pflegegeld.md
│   │   ├── pflegesachleistung.md
│   │   ├── kombinationsleistung.md
│   │   └── ...
│   ├── wohnformen/
│   ├── prozesse/
│   └── aok-services/
│
├── schwangerschaft/
│   ├── _taxonomie.md
│   ├── _relationen.md
│   ├── _regelkontext.md            # z.B.: keine Diagnosen, Disclaimer-Regeln
│   ├── phasen/
│   ├── ernaehrung/
│   ├── bewegung/
│   └── ...
│
└── vorsorge/                       # Zukünftige Cluster
    └── ...
```

--------------------------------------------------------------------------------

5.8 Schritt 8: QS durch AOK

**Was geprüft wird:**

- Medizinische/rechtliche Korrektheit der Bausteine
- Vollständigkeit (fehlt etwas Wichtiges?)
- AOK-spezifische Informationen aktuell?
- Beträge und Rechtsgrundlagen korrekt?
- Haftungshinweise angemessen?

**Feedback-Format:**

```
AOK markiert Baustein als:
├── ✓ Korrekt
├── ⚠ Änderung nötig → Korrekturhinweis
└── ✗ Falsch/Veraltet → Neuformulierung nötig
```

**Bezug zu Qualitätskontext:** Jeder geprüfte Baustein erhält den Status "validiert: true" mit Prüfdatum. Bausteine, die aus dem Crawl stammen und noch nicht geprüft wurden, bleiben auf "validiert: false" – das System kann diese Information nutzen, um bei unvalidierten Bausteinen vorsichtiger zu antworten.

**Wichtig:** Die QS ist kein einmaliger Schritt. Gesetzesänderungen (z.B. neue Pflegegeld-Sätze) erfordern regelmäßige Aktualisierung. Der Prozess muss so aufgesetzt sein, dass einzelne Bausteine aktualisiert werden können, ohne das gesamte Cluster neu zu bauen. Die Volatilitätskennzeichnung im Schema hilft dabei, Prüfintervalle sinnvoll zu priorisieren.

--------------------------------------------------------------------------------

6. Technischer Stack

Muss

- **Crawler:** Firecrawl oder vergleichbar (JavaScript-Rendering prüfen)
- **LLM-API:** Claude API für Extraktion, Konsolidierung, Re-Kategorisierung
- **Batch-Verarbeitung:** Skripte für die Pipeline-Automatisierung
- **Versionierung:** Git für die Knowledge Base
- **Embedding-Modell:** Für Duplikat-Erkennung und späteres Retrieval

Für den Assistenten

- **Vector Store:** Für semantisches Retrieval (Pinecone, Weaviate, pgvector – abhängig von AOK-Infrastruktur)
- **Metadaten-Filter:** Retrieval muss nach Cluster, Kategorie, Pflegegrad, Validierungsstatus etc. filtern können

Optional

- **Review-Interface:** Für AOK-QS (alternativ: Spreadsheet oder Markdown mit Kommentaren)

--------------------------------------------------------------------------------

7. Aufwandsschätzung

Pro Themencluster

| Schritt                            | Aufwand queonext/loschke.ai         | Aufwand AOK               |
| ---------------------------------- | ----------------------------------- | ------------------------- |
| 1. Content-Extraktion              | 2-4h Setup + Durchlauf              | –                         |
| 2. Baustein-Extraktion             | 4-8h Prompt-Entwicklung + Durchlauf | –                         |
| 3. Taxonomie-Konsolidierung        | 2-4h                                | 1-2h Review               |
| 4. Re-Kategorisierung              | 2-4h                                | –                         |
| 5. Duplikat-Erkennung              | 4-8h                                | –                         |
| 6. Konsolidierung                  | 8-16h (viel manueller Review)       | –                         |
| 7. Kontext-Anreicherung & Struktur | 6-10h                               | 2-4h Regelkontext-Input   |
| 8. QS                              | 2-4h Koordination                   | 8-16h inhaltliche Prüfung |

**Gesamt pro Cluster:** 32-58h queonext/loschke.ai + 12-22h AOK

Die Erstdurchführung (Schwangerschaft) wird am oberen Ende liegen. Folgecluster profitieren von etablierten Prompts, Schema und Tooling.

Gegenüber früheren Schätzungen ist Schritt 7 aufwändiger geworden, weil die systematische Kontext-Anreicherung (Regeln, Qualitätsmarker, Haftungshinweise) mehr Abstimmung mit der AOK erfordert. Das ist kein Overhead – ohne diese Anreicherung wäre die Knowledge Base unvollständig und der Assistent würde an genau diesen Stellen Fehler machen.

Scope-Unterschiede

| Cluster         | Artikel/Seiten | Besonderheit                                                               |
| --------------- | -------------- | -------------------------------------------------------------------------- |
| Schwangerschaft | ~80            | Viel Fließtext, wenig strukturierte Daten. Regelkontext: Disclaimer-lastig |
| Pflege          | ~24            | Mehr Fakten, fragmentiert. Regelkontext: Rechtsgrundlagen-lastig           |

--------------------------------------------------------------------------------

8. Risiken & Mitigationen

| Risiko                                                 | Mitigation                                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Accordion-Inhalte werden nicht gecrawlt                | Vorab testen, ggf. manuell extrahieren                                               |
| LLM halluziniert medizinische/rechtliche Informationen | QS durch AOK-Fachredaktion zwingend; Qualitätskontext ermöglicht Konfidenz-Abstufung |
| Taxonomie passt nicht                                  | Iterativ anpassen, nicht in Stein gemeißelt                                          |
| Zu viele Duplikate, Konsolidierung dauert ewig         | Kategorien ggf. gröber schneiden                                                     |
| AOK-Kapazität für QS nicht vorhanden                   | Frühzeitig klären, zeitlich planen                                                   |
| Beträge/Regelungen ändern sich                         | Volatilitätskennzeichnung + Prüfintervalle im Schema                                 |
| Content-Ebene und Context-Ebene driften auseinander    | Langfristig: Single Source of Truth anstreben                                        |
| Haftungsrisiko bei Einzelfallaussagen                  | Regelkontext mit klaren Eskalationsregeln pro Cluster                                |

--------------------------------------------------------------------------------

9. Erfolgskriterien

Für den Prozess

- [ ] Pipeline vollständig durchlaufen für mindestens ein Cluster
- [ ] Taxonomie von AOK abgenommen
- [ ] <10% der Bausteine als "unklar" markiert
- [ ] Duplikat-Rate nachvollziehbar dokumentiert (Erwartung: 20-30%)
- [ ] QS-Durchlauf in vertretbarer Zeit (<22h AOK-Aufwand)
- [ ] Prozess dokumentiert und wiederholbar für weitere Cluster

Für die Knowledge Base

- [ ] Alle fünf Kontextdimensionen pro Baustein befüllt
- [ ] Assistent kann typische Fragen zum Themencluster korrekt beantworten
- [ ] Keine Halluzinationen bei Fakten-Fragen (Beträge, Voraussetzungen)
- [ ] Relationen funktionieren (Assistent verweist korrekt auf verwandte Themen)
- [ ] Regelkontext greift (Assistent eskaliert bei Einzelfallfragen)
- [ ] Antwortqualität deutlich besser als mit Roh-Website-Content

--------------------------------------------------------------------------------

10. Nächste Schritte

Sofort

1. **Schwangerschafts-Cluster:** Pipeline mit 3 Pilot-Artikeln testen (Prompts validieren, Zeitaufwand schätzen)
2. **Pflege-Cluster:** 2-3 Unterseiten (Pflegegrade, Pflegegeld, Kombinationsleistung) exemplarisch transformieren
3. Vorher/Nachher-Vergleich dokumentieren als Entscheidungsgrundlage für AOK

Mittelfristig

1. Pipeline für jeweils ein volles Cluster durchlaufen
2. Integration in den Assistenten, Retrieval-Tests
3. QS-Prozess mit AOK-Fachteam etablieren
4. Regelkontext mit AOK-Rechtsabteilung abstimmen

Langfristig

1. Update-Prozess für Gesetzesänderungen definieren (gesteuert durch Volatilitätskennzeichnung)
2. Weitere Themencluster aufnehmen
3. "Write Once, Publish Twice"-Vision mit AOK-Redaktion diskutieren

--------------------------------------------------------------------------------

11. Offene Fragen für das AOK-Gespräch

**Regelkontext (Priorität hoch):** Welche Aussagen darf der Assistent treffen, welche nicht? Gibt es bereits Compliance-Richtlinien für digitale Beratung? Wer entscheidet über Haftungsgrenzen pro Themencluster?

**Redaktionsprozess:** Wer pflegt die Knowledge Base langfristig? Wie werden Gesetzesänderungen zeitnah eingepflegt? Kann der bestehende Redaktionsprozess erweitert werden?

**Inhaltliche Tiefe:** Reichen die Website-Inhalte als Faktenquelle? Brauchen wir Zugriff auf interne Fach-Dokumente? Wie weit darf der Assistent bei Einzelfallberatung gehen?

**Technische Infrastruktur:** Wo wird die Knowledge Base gehostet? Welcher Vector Store passt? Wie wird Versionierung gelöst?

**Skalierung:** Welche Themencluster sind nach Schwangerschaft und Pflege am wichtigsten? Gibt es Content-Bereiche, die besonders dringend aufbereitet werden müssen?

--------------------------------------------------------------------------------

*Dokument erstellt: Februar 2025* *Basiert auf: Extraktionsprozess-Entwurf (queonext, Januar 2025), Content-to-Context-Analyse (loschke.ai, Februar 2025) und Context Engineering Leitfaden (loschke.ai)* *Verwandte Dokumente: Context Storage & Retrieval Architektur, Assistent-Verfassung (Layer 1)*
