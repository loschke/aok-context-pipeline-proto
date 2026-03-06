Context Storage & Retrieval: Technische Architektur

**Entscheidungsgrundlage für das Projektteam**

Version: 0.2 Draft Stand: Februar 2025 Projekt: Mission SAVA – AI-Assistenten AOK Sachsen-Anhalt

--------------------------------------------------------------------------------

Worum es geht

Wir haben eine Methodik, um AOK-Website-Content in strukturierte Context-Bausteine zu transformieren. Jeder Baustein ist ein Markdown-Dokument mit strukturiertem Frontmatter (Metadaten) und lesbarem Fließtext – Inhalt, Typ, Taxonomie-Kategorie und fünf Kontextdimensionen (Bedeutung, Struktur, Qualität, Regeln, Zielgruppe).

Dieses Dokument beantwortet zwei Fragen:

**1. Wo liegen die Bausteine?** (Storage – die Source of Truth, die gepflegt und versioniert wird)

**2. Wie kommt der Assistent an die richtigen Bausteine?** (Retrieval – wie das AI-System zur Laufzeit den passenden Kontext findet)

Beide Fragen werden oft vermischt. Sie erfordern aber unterschiedliche Lösungen und können unabhängig voneinander entschieden werden.

--------------------------------------------------------------------------------

Baustein-Format: Markdown mit Frontmatter

Jeder Context-Baustein ist eine `.md`-Datei. Der Kopf enthält strukturierte Metadaten im YAML-Frontmatter (zwischen `---`), der Body den eigentlichen Inhalt als lesbaren Fließtext. Das Format ist gleichzeitig menschenlesbar und maschinell parsbar.

**Beispiel eines Bausteins:**

```
---
typ: LEISTUNG
kategorie: Pflegegeld & Pflegesachleistung
rechtsgrundlage: SGB XI §37
stand: 2025-01
volatilitaet: hoch
validiert: false
zielgruppe:
  - Pflegebedürftige
  - Angehörige
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
haftungshinweis: >
  Allgemeine Leistungsinformation. Individueller Anspruch
  abhängig von Begutachtung durch Medizinischen Dienst.
relationen:
  - typ: voraussetzung
    ziel: pflege/grundlagen/pflegegrade
  - typ: kombinierbar_mit
    ziel: pflege/leistungen/pflegesachleistung
  - typ: alternative_zu
    ziel: pflege/leistungen/pflegesachleistung
  - typ: verwandt_mit
    ziel: pflege/leistungen/verhinderungspflege
---

# Pflegegeld

Geldleistung der Pflegeversicherung für Pflegebedürftige ab
Pflegegrad 2, die ihre Pflege durch Angehörige oder andere
nicht-professionelle Pflegepersonen organisieren.

## Voraussetzungen

- Anerkannter Pflegegrad 2, 3, 4 oder 5
- Pflege nicht durch professionellen Pflegedienst
- Häusliche Pflege (nicht stationär)

## Leistungsumfang

| Pflegegrad | Betrag/Monat |
|------------|-------------|
| Pflegegrad 2 | 332 € |
| Pflegegrad 3 | 573 € |
| Pflegegrad 4 | 765 € |
| Pflegegrad 5 | 947 € |

Pflegegrad 1: kein Anspruch auf Pflegegeld.

## Kombinierbarkeit

Pflegegeld und Pflegesachleistung sind kombinierbar über die
Kombinationsleistung. Die Anteile werden prozentual verrechnet.
```

**Warum dieses Format:**

- **Menschenlesbar:** Jeder kann die Datei öffnen und den Inhalt verstehen – AOK-Fachredaktion, Projektteam, Stakeholder. Kein technisches Vorwissen nötig.
- **Maschinell parsbar:** Frontmatter ist Standard-YAML und wird von jedem Parser erkannt. Der Body ist Markdown und kann 1:1 ins Context Window geladen werden.
- **Tooling-kompatibel:** Frontmatter+Markdown ist Standard in Static-Site-Generatoren, Obsidian, Keystatic, und vielen CMS-Systemen. Der Migrationspfad zu jedem späteren System bleibt offen.
- **AI-freundlich:** LLMs verstehen Markdown nativ. Die Kombination aus strukturierten Metadaten (Frontmatter) und Fließtext (Body) entspricht genau dem, was ein Modell braucht, um Kontext einzuordnen und zu nutzen.

--------------------------------------------------------------------------------

Die Optionen im Überblick

|                   | Option A: Flat Files          | Option B: Payload CMS         | Option C: Vector Database |
| ----------------- | ----------------------------- | ----------------------------- | ------------------------- |
| **Storage**       | Markdown-Dateien in Git-Repo  | Payload Collections           | MD-Export → Vector DB     |
| **Retrieval**     | Full Context Loading oder MCP | API / MCP                     | Hybride Vektorsuche       |
| **Wer pflegt**    | Projektteam (Editor/IDE)      | Redaktion (Web-Interface)     | Projektteam (Pipeline)    |
| **Setup-Aufwand** | Stunden                       | Tage                          | Tage bis Wochen           |
| **Geeignet für**  | Demo, erster Prototyp         | Prototyp mit Kunden-Interface | Produktionssystem         |

--------------------------------------------------------------------------------

Option A: Flat Files + Full Context Loading / MCP

Das Prinzip

Die Bausteine liegen als einzelne Markdown-Dateien in einer Ordnerstruktur, die der Taxonomie folgt. Für den Assistenten werden sie entweder komplett ins Context Window geladen oder über einen MCP Server abgefragt.

Storage: Ordnerstruktur

```
/context/pflege/
  _taxonomie.md                    # Kategorie-Definitionen
  _relationen.md                   # Cluster-weite Relationen
  pflegegrade/
    pflegebeduerftigkeit.md
    pflegegrad-1.md
    pflegegrad-2.md
    ...
  leistungen/
    pflegegeld.md
    pflegesachleistung.md
    kombinationsleistung.md
    verhinderungspflege.md
    kurzzeitpflege.md
    ...
  antragsprozess/
    pflegegrad-beantragen.md
    begutachtung.md
    widerspruch.md
    ...
  angehoerige/
    pflegekurse.md
    rentenansprueche.md
    entlastungsangebote.md
    ...
```

Versionierung über Git. Jede Änderung nachvollziehbar, Branching für Review-Prozesse möglich.

Retrieval-Variante 1: Full Context Loading

Alle Bausteine eines Clusters werden als ein Dokument zusammengefasst und komplett ins Context Window des Assistenten geladen – als System-Prompt-Anhang, Claude Project Knowledge oder äquivalent.

**Größenordnung am Beispiel Pflege:**

| Parameter                                 | Schätzung                 |
| ----------------------------------------- | ------------------------- |
| Bausteine im Cluster                      | 80–150                    |
| Ø Tokens pro Baustein (inkl. Frontmatter) | 250–400                   |
| Gesamtgröße Cluster                       | 20.000–60.000 Tokens      |
| System-Prompt + Layer-Konfiguration       | ~5.000 Tokens             |
| Konversationshistorie (5 Turns)           | ~3.000 Tokens             |
| **Gesamt pro Anfrage**                    | **~30.000–70.000 Tokens** |

Das passt problemlos in aktuelle Modelle (Claude: 200k Context, GPT-4o: 128k). Der Assistent hat den gesamten Cluster "im Kopf" und entscheidet selbst, welche Bausteine relevant sind.

**Warum das funktioniert:** Die Bausteine sind kompakt, informationsdicht und strukturiert. Aktuelle LLMs sind sehr gut darin, aus einem großen Kontext die relevanten Teile zu finden – besonders wenn die Bausteine sauber typisiert und getaggt sind. De facto übernimmt das Modell das Retrieval.

**Grenzen:** Skaliert nicht über einen Cluster hinaus. Drei Cluster gleichzeitig (Pflege + Schwangerschaft + Prävention) würden 100k–200k Tokens nur für Content bedeuten – das wird eng. Token-Kosten pro Anfrage sind höher, weil immer der gesamte Cluster mitgeschickt wird.

Retrieval-Variante 2: MCP auf Flat Files

Ein MCP Server liest die Markdown-Dateien, parst das Frontmatter und stellt dem Assistenten strukturierte Such-Tools zur Verfügung.

**Tools, die der MCP Server bereitstellt:**

```
suche_bausteine(
  kategorie: "leistungen",        # optional: Taxonomie-Kategorie
  typ: "LEISTUNG",                # optional: Baustein-Typ
  zielgruppe: "angehoerige",      # optional: Zielgruppen-Tag
  pflegegrad: 3,                  # optional: Kontext-Tag
  stichwort: "Verhinderungspflege" # optional: Volltextsuche
) → Liste relevanter Bausteine

hole_baustein(
  id: "pflege/leistungen/pflegegeld"
) → Einzelner Baustein mit allen Metadaten

zeige_relationen(
  id: "pflege/leistungen/pflegegeld"
) → Alle verknüpften Bausteine
```

Der Assistent entscheidet auf Basis der Nutzerfrage, welche Tool-Calls er macht. Er lädt nur die Bausteine, die er gerade braucht – nicht den gesamten Cluster. Das spart Tokens und skaliert besser.

**Aufwand MCP Server:** Ein einfacher MCP Server, der Markdown-Dateien einliest, Frontmatter parst und nach Metadaten filtert, ist mit FastMCP (Python) oder dem MCP SDK (TypeScript) in wenigen Stunden umsetzbar. Frontmatter-Parsing ist ein Einzeiler mit Standardbibliotheken (`gray-matter` in JS, `python-frontmatter` in Python). Es braucht keine Datenbank – der Server liest direkt vom Dateisystem.

Aufwand und Eignung

| Aspekt               | Einschätzung                                          |
| -------------------- | ----------------------------------------------------- |
| Setup-Zeit           | Full Context: 1–2 Stunden. MCP: 4–8 Stunden.          |
| Infrastruktur        | Keine. Git-Repo + lokales Dateisystem.                |
| Team-Anforderung     | Markdown und Git – Standard-Skills                    |
| Redaktions-Interface | Keines. Bearbeitung in IDE, Texteditor oder Obsidian. |
| Geeignet für         | Interne Demos, Proof of Concept, Content-Validierung  |

Wann diese Option wählen

- Ihr wollt so schnell wie möglich testen, ob die Bausteine funktionieren
- Der Fokus liegt auf Content-Qualität, nicht auf Infrastruktur
- Es gibt noch kein Redaktionsteam, das mitarbeiten muss
- Ein Cluster reicht für den ersten Test

Wann diese Option nicht mehr reicht

- Die AOK-Fachredaktion soll selbst pflegen und freigeben
- Mehrere Cluster sollen gleichzeitig bedient werden
- Der Prototyp soll dem Kunden vorgeführt werden (mit Interface)

Variante: Git-basiertes CMS (Keystatic)

Zwischen nackten Flat Files und einem vollwertigen CMS wie Payload gibt es einen Zwischenschritt: Git-basierte CMS-Systeme wie **Keystatic** (Thinkmill). Diese generieren aus einer Schema-Definition ein visuelles Admin-Interface, speichern aber weiterhin Markdown-Dateien mit Frontmatter ins Git-Repo. Kein Server, keine Datenbank – die Files bleiben die Source of Truth.

**Was das bringt:** Die Fachredaktion bekommt ein Web-Interface zum Bearbeiten und Reviewen, ohne Git oder Markdown-Syntax lernen zu müssen. Änderungen werden als Git-Commits gespeichert, Versionierung inklusive.

**Was es nicht liefert:** Payload-Niveau Workflow (Draft/Published mit Rollen), native Relationen zwischen Bausteinen, oder ein API-Backend für den Assistenten. Keystatic ist ein Editing-Layer auf Git, kein Application-Backend.

**Einordnung:** Relevant, wenn ihr ein Frontend (Astro, Next.js) aufbaut, an das Keystatic andocken kann, und die AOK früh in die Content-Pflege einbinden wollt, ohne sofort Payload-Infrastruktur aufzusetzen. Weniger relevant, wenn Payload ohnehin geplant ist – in dem Fall wäre es eine Zwischenlösung mit eigener Schema-Definition, die später abgelöst wird.

--------------------------------------------------------------------------------

Option B: Payload CMS via API / MCP

Das Prinzip

Die Bausteine werden als strukturierte Content-Typen in Payload CMS gepflegt. Payload liefert automatisch eine REST API und ein Admin-Interface. Der Assistent greift über die API oder einen MCP Server auf die Bausteine zu.

Storage: Payload Collections

Die Baustein-Struktur wird als Payload Collection definiert. Jedes Feld aus dem Frontmatter wird ein Payload-Feld:

**Collection:** **context-bausteine**

| Feld            | Typ                                   | Entsprechung im Frontmatter |
| --------------- | ------------------------------------- | --------------------------- |
| titel           | Text                                  | Markdown-Überschrift (H1)   |
| typ             | Select (FAKT, LEISTUNG, PROZESS, ...) | `typ`                       |
| cluster         | Relationship → Cluster                | Ordnerstruktur / Zuweisung  |
| kategorie       | Relationship → Taxonomie              | `kategorie`                 |
| inhalt          | Rich Text / JSON                      | Markdown-Body               |
| zielgruppe      | Select (multi)                        | `zielgruppe`                |
| kontext_tags    | JSON                                  | `kontext_tags`              |
| stand           | Date                                  | `stand`                     |
| volatilitaet    | Select (hoch, mittel, niedrig)        | `volatilitaet`              |
| validiert       | Checkbox                              | `validiert`                 |
| haftungshinweis | Textarea                              | `haftungshinweis`           |
| rechtsgrundlage | Text                                  | `rechtsgrundlage`           |
| relationen      | Relationship → Bausteine (multi)      | `relationen`                |

**Collection:** **taxonomie**

| Feld       | Typ                    |
| ---------- | ---------------------- |
| name       | Text                   |
| cluster    | Relationship → Cluster |
| definition | Textarea               |
| abgrenzung | Textarea               |

**Collection:** **cluster**

| Feld         | Typ                                     |
| ------------ | --------------------------------------- |
| name         | Text (z.B. "Pflege", "Schwangerschaft") |
| beschreibung | Textarea                                |
| status       | Select (in Arbeit, Review, freigegeben) |

Import: Markdown → Payload

Der Import der Markdown-Bausteine nach Payload ist automatisierbar: Ein Script liest die `.md`-Dateien, parst das Frontmatter (Metadaten → Payload-Felder) und den Body (Markdown → Rich Text), und schreibt die Bausteine über die Payload API in die Collections. Der umgekehrte Weg (Payload → Markdown-Export) ist ebenso möglich und sinnvoll als Backup-Strategie.

Retrieval: API oder MCP

**Variante 1: Direkter API-Zugriff**

Payload generiert automatisch REST-Endpoints. Der Assistent nutzt Function Calling, um die API abzufragen:

```
GET /api/context-bausteine?where[cluster][equals]=pflege
    &where[typ][equals]=LEISTUNG
    &where[kontext_tags.pflegegrade][contains]=3
```

Das liefert alle Leistungsbausteine für Pflegegrad 3 im Pflege-Cluster. Kein Embedding, keine Vektorsuche – reine strukturierte Abfrage auf den Metadaten, die ihr ohnehin pflegt.

**Variante 2: MCP Server als Wrapper**

Ein MCP Server, der die Payload API kapselt und dem Assistenten dieselben Tools wie in Option A bereitstellt – aber mit Payload als Backend statt Flat Files. Vorteil: Der Assistent merkt keinen Unterschied, ob darunter Files oder ein CMS liegen. Ihr könnt von A nach B migrieren, ohne den Assistenten umzubauen.

**Variante 3: Full Context Loading aus Payload**

Auch hier möglich: Ein Script exportiert alle Bausteine eines Clusters aus Payload als ein Markdown-Dokument und lädt es ins Context Window. Identisch zu Option A, nur dass die Source of Truth in Payload liegt statt in Files.

Was Payload zusätzlich liefert

**Admin-Interface:** Die AOK-Fachredaktion bekommt ein Web-Interface, in dem sie Bausteine ansehen, bearbeiten und freigeben kann – ohne Git, ohne Frontmatter, ohne Technik-Kenntnisse.

**Workflow:** Payload unterstützt Draft/Published-Status. Ein Baustein kann bearbeitet werden, ohne dass die Live-Version betroffen ist. Freigabe über die `validiert`-Checkbox oder einen eigenen Workflow.

**Versionierung:** Payload speichert Versionen. Änderungen sind nachvollziehbar – wer hat wann was geändert.

**User-Rollen:** Unterschiedliche Berechtigungen für queonext (alles), AOK-Fachredaktion (eigene Cluster bearbeiten, freigeben), AOK-Leitung (nur lesen).

Aufwand und Eignung

| Aspekt               | Einschätzung                                                                        |
| -------------------- | ----------------------------------------------------------------------------------- |
| Setup-Zeit           | 2–4 Tage (Collection-Definitionen, Deployment, Datenimport)                         |
| Infrastruktur        | Payload-Instanz (Self-hosted oder Payload Cloud), Datenbank (MongoDB oder Postgres) |
| Team-Anforderung     | Jemand muss Payload konfigurieren und deployen können                               |
| Redaktions-Interface | Ja – Admin-Panel out of the box                                                     |
| Geeignet für         | Prototyp mit Kunden-Beteiligung, mittelfristiger Betrieb                            |

Wann diese Option wählen

- Die AOK-Fachredaktion soll am Review- und Freigabeprozess beteiligt werden
- Ihr wollt dem Kunden ein System zeigen, nicht nur einen Chat
- Die Infrastruktur (Payload) existiert ohnehin oder ist geplant
- Mehrere Cluster sollen parallel gepflegt werden

Wann diese Option nicht mehr reicht

- Tausende Bausteine über viele Cluster mit semantischer Suche
- Anfragen, die nicht über Metadaten-Filter lösbar sind ("Finde alles, was mit Überforderung bei Pflege zu tun hat" – das ist semantisch, nicht strukturiert)
- Performance-Anforderungen im Produktivbetrieb mit hoher Last

--------------------------------------------------------------------------------

Option C: Vector Database mit Markdown-Import

Das Prinzip

Die Bausteine werden als Embeddings in einer Vector Database gespeichert. Jeder Baustein wird vektorisiert (über ein Embedding-Modell), die Frontmatter-Metadaten werden als filterbare Felder mitgespeichert. Der Assistent sucht hybrid: semantische Ähnlichkeit + Metadaten-Filter.

Warum hybride Suche?

Reine Vektorsuche findet semantisch ähnliche Texte – "Wer zahlt mein Pflegegeld?" findet den Baustein "Pflegegeld", weil die Embeddings ähnlich sind.

Aber: "Zeig mir alle Leistungen für Pflegegrad 3" ist keine Ähnlichkeitsfrage. Das ist ein Metadaten-Filter. Und "Was steht meiner Mutter zu, die Pflegegrad 4 hat und von mir zu Hause gepflegt wird?" braucht beides: semantisches Verständnis (Pflege durch Angehörige → Pflegegeld, Verhinderungspflege, Entlastungsbetrag) plus Metadaten-Filter (Pflegegrad 4, Zielgruppe Angehörige).

Deshalb: **hybrides Retrieval** – Vektorsuche für "Was meint der Nutzer?" kombiniert mit Metadaten-Filtern für die strukturierten Dimensionen.

Import-Pipeline

```
Markdown-Dateien / Payload-Export
        ↓
    Preprocessing
    (Frontmatter → Metadaten-Felder,
     Body → Text für Embedding)
        ↓
    Embedding-Modell
    (z.B. text-embedding-3-small)
        ↓
    Vector Database
    (Vektor + Metadaten pro Baustein)
```

Jeder Baustein wird zu einem Eintrag in der Vector DB:

| Feld         | Inhalt                               | Verwendung                          |
| ------------ | ------------------------------------ | ----------------------------------- |
| vector       | Embedding des Markdown-Body          | Semantische Suche                   |
| content      | Volltext des Bausteins (Body)        | Wird an den Assistenten übergeben   |
| typ          | LEISTUNG, PROZESS etc.               | Metadaten-Filter (aus Frontmatter)  |
| kategorie    | Taxonomie-Kategorie                  | Metadaten-Filter (aus Frontmatter)  |
| cluster      | pflege, schwangerschaft etc.         | Metadaten-Filter (aus Frontmatter)  |
| zielgruppe   | ["angehoerige", "pflegebeduerftige"] | Metadaten-Filter (aus Frontmatter)  |
| kontext_tags | {"pflegegrade": [2,3,4,5]}           | Metadaten-Filter (aus Frontmatter)  |
| volatilitaet | hoch / mittel / niedrig              | Priorisierung                       |
| validiert    | true / false                         | Nur validierte Bausteine ausliefern |

Retrieval-Ablauf

```
Nutzeranfrage: "Meine Mutter hat Pflegegrad 3, 
was steht ihr an Geld zu?"
        ↓
    Schritt 1: Intent-Erkennung
    → Leistungsklärung (I4)
    → Zielgruppe: Angehörige
    → Kontext: Pflegegrad 3
        ↓
    Schritt 2: Hybride Suche
    → Vektorsuche: "Geldleistung Pflege Pflegegrad"
    → Filter: typ=LEISTUNG, pflegegrade contains 3,
              validiert=true
    → Top-K: 5 Bausteine
        ↓
    Schritt 3: Bausteine + Relationen laden
    → Pflegegeld + Kombinationsleistung + 
      Entlastungsbetrag (via Relationen)
        ↓
    Schritt 4: Context an LLM
    → System-Prompt + Layer-Konfiguration + 
      gefundene Bausteine → Antwort
```

Produkt-Empfehlungen nach Einsatzzweck

**Für Demos und interne Tests:**

| Lösung                  | Vorteile                                                          | Nachteile                                   | Kosten    |
| ----------------------- | ----------------------------------------------------------------- | ------------------------------------------- | --------- |
| **ChromaDB** (lokal)    | Kein Account nötig, läuft lokal, Python-nativ, schnell aufgesetzt | Nicht produktionsfähig, kein Multi-User     | Kostenlos |
| **SQLite + sqlite-vss** | Alles in einer Datei, extrem portabel, kein Server nötig          | Begrenzte Filteroptionen, Community-Projekt | Kostenlos |

ChromaDB ist die Empfehlung für den allerersten Vektor-Test: `pip install chromadb`, ein paar Zeilen Python, fertig. Gut, um zu validieren, ob hybrides Retrieval tatsächlich besser ist als Full Context Loading.

**Für Prototypen mit Kundenzugang:**

| Lösung                | Vorteile                                                                   | Nachteile                                                                   | Kosten                                  |
| --------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------- |
| **Pinecone**          | Managed Service, hybride Suche nativ, gute Docs, schnell produktiv         | Vendor Lock-in, US-Cloud (DSGVO-Diskussion)                                 | Free Tier für Prototyp ausreichend      |
| **Supabase pgvector** | Postgres-basiert, EU-Hosting möglich, SQL + Vektorsuche kombiniert         | Weniger spezialisiert als dedizierte Vector DBs, Performance bei Skalierung | Free Tier verfügbar, danach ~25$/Monat  |
| **Qdrant Cloud**      | EU-Hosting (Hetzner), spezialisierte Vector DB, hybride Suche, Open Source | Weniger bekannt, kleineres Ökosystem                                        | Free Tier (1GB), danach nutzungsbasiert |

Für einen DSGVO-relevanten Prototypen mit AOK-Daten wäre **Qdrant Cloud** (EU-hosted) oder **Supabase pgvector** (EU-Region wählbar) die sicherere Wahl. Pinecone ist technisch am komfortabelsten, aber die Datenhaltung in den USA muss mit der AOK geklärt werden.

**Für das Produktionssystem:**

| Lösung                                | Vorteile                                                          | Nachteile                                    | Kosten                                     |
| ------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------ |
| **Qdrant** (Self-hosted)              | Volle Kontrolle, EU-Hosting, Open Source, sehr gute hybride Suche | Eigene Infrastruktur nötig, Wartung          | Infrastrukturkosten                        |
| **Weaviate** (Self-hosted oder Cloud) | Multi-Modal, GraphQL API, gut für komplexe Schemas                | Höhere Komplexität, steilere Lernkurve       | Cloud: nutzungsbasiert, Self-hosted: Infra |
| **Supabase pgvector** (Dedicated)     | Wenn Postgres ohnehin im Stack ist, alles in einer DB             | Bei >100k Vektoren: Performance-Tuning nötig | Ab ~75$/Monat für Dedicated                |
| **Azure AI Search**                   | Enterprise-Grade, DSGVO mit EU-Region, Hybrid Search              | Teurer, Azure-Ökosystem nötig                | Ab ~250$/Monat                             |

Für ein Produktionssystem bei einer Krankenkasse wird die Hosting-Frage entscheidend sein: Entweder Self-hosted in der AOK-Infrastruktur (Qdrant oder Weaviate) oder ein Managed Service mit EU-Hosting und DSGVO-Konformität (Azure AI Search, Qdrant Cloud EU).

Aufwand und Eignung

| Aspekt               | Einschätzung                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Setup-Zeit           | Demo (ChromaDB): 4–8 Stunden. Prototyp (Pinecone/Qdrant): 2–3 Tage. Produktion: 1–3 Wochen.       |
| Infrastruktur        | Demo: Keine (lokal). Prototyp: Managed Service. Produktion: Dedicated oder Self-hosted.           |
| Team-Anforderung     | Grundverständnis von Embeddings, API-Integration, Pipeline-Scripting                              |
| Redaktions-Interface | Keines – die Vector DB ist kein CMS. Braucht eine vorgelagerte Pflegeumgebung (Payload, Git etc.) |
| Geeignet für         | Multi-Cluster-Betrieb, semantische Suche, Produktionssystem                                       |

Wann diese Option wählen

- Mehrere Cluster mit Hunderten bis Tausenden Bausteinen
- Semantische Suche nötig (Nutzer formuliert frei, System muss "verstehen")
- Performance-Anforderungen (schnelle Antwortzeiten bei vielen gleichzeitigen Anfragen)
- Das System soll langfristig produktiv betrieben werden

Wann diese Option nicht wählen

- Für den ersten Prototypen (Overkill – Full Context Loading oder MCP reichen)
- Wenn die Bausteine noch nicht stabil sind (jede Änderung erfordert Re-Embedding)
- Wenn das Team keine Erfahrung mit Embeddings und Vector DBs hat und der Fokus auf Content-Qualität liegen soll

--------------------------------------------------------------------------------

Empfohlener Stufenplan

Stufe 1: Content validieren (Wochen 1–2)

**Ziel:** Beweisen, dass die Bausteine funktionieren.

| Entscheidung | Empfehlung                                      |
| ------------ | ----------------------------------------------- |
| Storage      | Flat Files (Markdown in Git-Repo)               |
| Retrieval    | Full Context Loading                            |
| Modell       | Claude Project oder API mit System-Prompt       |
| Aufwand      | 1–2 Stunden Setup, dann rein inhaltliche Arbeit |

Vorgehen: Pflege-Cluster extrahieren, Markdown-Bausteine zusammenfassen, in Claude Project laden, System-Prompt mit Layer-1-Regeln schreiben, testen. Jede schlechte Antwort ist ein Hinweis auf fehlenden oder falschen Kontext in den Bausteinen – nicht auf fehlende Infrastruktur.

Stufe 2: Kunden-Prototyp (Wochen 3–6)

**Ziel:** Der AOK etwas Vorzeigbares liefern, Redaktions-Workflow testen.

| Entscheidung | Empfehlung                                    |
| ------------ | --------------------------------------------- |
| Storage      | Payload CMS (Bausteine als Collection)        |
| Retrieval    | MCP auf Payload API oder Full Context Loading |
| Interface    | Einfaches Chat-Interface (z.B. Streamlit, v0) |
| Aufwand      | 2–4 Tage Setup, dann laufende Content-Pflege  |

Vorgehen: Payload-Collections definieren, Markdown-Bausteine importieren (Frontmatter → Payload-Felder, Body → Rich Text), MCP Server oder API-Anbindung bauen, Chat-Interface aufsetzen. Die AOK-Fachredaktion bekommt Zugang zum Payload-Admin und kann Bausteine reviewen und freigeben.

Stufe 3: Produktionsvorbereitung (ab Monat 3)

**Ziel:** Skalierbares System für mehrere Cluster und produktiven Betrieb.

| Entscheidung | Empfehlung                                                 |
| ------------ | ---------------------------------------------------------- |
| Storage      | Payload CMS (bleibt Source of Truth)                       |
| Retrieval    | Vector DB (Qdrant oder Supabase pgvector) mit Payload-Sync |
| Pipeline     | Automatischer Export aus Payload → Embedding → Vector DB   |
| Hosting      | EU-hosted (DSGVO-konform), Entscheidung mit AOK            |
| Aufwand      | 1–3 Wochen Setup, dann Betrieb                             |

Vorgehen: Embedding-Pipeline aufsetzen, die bei Änderungen in Payload automatisch die Vector DB aktualisiert. Hybrides Retrieval implementieren. Performance-Tests mit realistischen Anfragen. DSGVO-Dokumentation für die AOK.

--------------------------------------------------------------------------------

Zusammenfassung: Was empfehlen wir wann?

| Frage                 | Stufe 1            | Stufe 2                         | Stufe 3                                 |
| --------------------- | ------------------ | ------------------------------- | --------------------------------------- |
| **Wie schnell live?** | Stunden            | Tage                            | Wochen                                  |
| **Storage**           | Markdown + Git     | Payload CMS                     | Payload CMS                             |
| **Retrieval**         | Full Context       | MCP / API                       | Vector DB (hybrid)                      |
| **Wer pflegt?**       | Wir                | Wir + AOK-Review                | AOK-Redaktion                           |
| **Interface**         | Claude Project     | Chat-Interface                  | Produktiv-Assistent                     |
| **Cluster**           | 1 (Pflege)         | 1–2                             | Alle                                    |
| **DSGVO**             | Intern, unkritisch | Klärung beginnen                | Vollständig gelöst                      |
| **Kosten**            | 0 €                | Payload-Hosting (~20–50€/Monat) | Infra abhängig von Hosting-Entscheidung |

**Die wichtigste Erkenntnis:** Stufe 1 kostet fast nichts und liefert die wertvollste Information – funktionieren die Bausteine? Jede Stunde, die in Infrastruktur fließt, bevor diese Frage beantwortet ist, ist eine Stunde, die am falschen Problem arbeitet.

--------------------------------------------------------------------------------

*Dokument erstellt: Februar 2025* *Teil von: Mission SAVA – AI-Assistenten AOK Sachsen-Anhalt* *Verwandte Dokumente: Architektur-Dokument, Content-to-Context-Methodik (v3), Context Engineering Arbeitshilfe, Assistent-Verfassung (Layer 1)*
