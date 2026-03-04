# Storage & Retrieval: Wo liegen die Bausteine?

## 3 Optionen im Ueberblick

| | Option A: Flat Files | Option B: Payload CMS | Option C: Vector DB |
|---|---|---|---|
| **Storage** | Markdown in Git | Payload Collections | MD-Export in Vector DB |
| **Retrieval** | Full Context Loading / MCP | API / MCP | Hybride Vektorsuche |
| **Wer pflegt** | Projektteam (Editor) | Redaktion (Web-Interface) | Projektteam (Pipeline) |
| **Setup** | Stunden | Tage | Tage bis Wochen |
| **Geeignet fuer** | Demo, erster Prototyp | Prototyp mit Kunden-Interface | Produktionssystem |

## Option A: Flat Files + Full Context Loading

Aktueller Stand. Markdown-Dateien in Git, sortiert nach Cluster.

**Wie Full Context Loading funktioniert:**
Alle Bausteine eines Clusters werden komplett ins Context Window geladen. Kein Retrieval-Algorithmus noetig — das LLM durchsucht den gesamten Context selbst.

**Groessenordnung:** 80–150 Bausteine pro Cluster, 250–400 Tokens pro Baustein = 20.000–60.000 Tokens. Passt in Claude (200k Context Window).

**Grenze:** Skaliert nicht ueber 1-2 Cluster. 3 Cluster gleichzeitig = 100k–200k Tokens nur fuer Content. Kein Platz mehr fuer Konversation.

**Alternative: MCP Server**
Model Context Protocol als Schnittstelle. Der Assistent ruft aktiv Bausteine ab statt alles vorzuladen.
- Tools: suche_bausteine(), hole_baustein(), zeige_relationen()
- Vorteil: Skaliert besser, Cluster-uebergreifend moeglich
- Setup: 4–8 Stunden

## Option B: Payload CMS

Headless CMS mit Web-Interface. Die AOK-Fachredaktion bekommt ein Dashboard zum Reviewen und Freigeben.

**Collections:**
- context-bausteine (Titel, Typ, Cluster, Content, Frontmatter-Felder)
- taxonomie (Cluster, Kategorien, Hierarchien)
- cluster (Name, Status, Verantwortlicher)

**Vorteile:** Admin-Interface, Workflow (Draft → Review → Published), Versionierung, User-Rollen
**Import:** Markdown-Dateien → Frontmatter parsen → Payload-Collections fuellen

## Option C: Vector Database

Hybride Suche: Semantische Aehnlichkeit (Vektorsuche) + Metadaten-Filter (Frontmatter-Felder).

**Warum hybrid:** "Was steht meiner Mutter zu?" braucht beides:
- Semantik: "Mutter" → Angehoerigen-Kontext, "zustehen" → Leistungsanspruch
- Filter: Zielgruppe=Angehoerige, Typ=LEISTUNG

**Retrieval-Ablauf:**
1. Anfrage kommt rein
2. Vektorsuche findet semantisch aehnliche Bausteine
3. Metadaten-Filter grenzt ein (Cluster, Zielgruppe, Pflegegrad)
4. Re-Ranking: Relevanteste Bausteine zuerst

**Produkt-Empfehlungen:**
- EU-Hosting (DSGVO): Qdrant Cloud EU, Supabase pgvector (EU-Region)
- Global: Pinecone, Weaviate, Azure AI Search

## Empfohlener Stufenplan

### Stufe 1: Content validieren (aktuell)
Flat Files + Full Context Loading. Aufwand: 1–2 Stunden.
Wichtigste Frage: Funktionieren die Bausteine?

### Stufe 2: Kunden-Prototyp (naechster Schritt)
Payload CMS. AOK bekommt Web-Interface. MCP oder API-Anbindung.
Aufwand: 2–4 Tage.

### Stufe 3: Produktionsvorbereitung (ab Monat 3)
Payload bleibt Source of Truth. Vector DB fuer hybrides Retrieval. Automatische Sync-Pipeline.
Aufwand: 1–3 Wochen.

## DSGVO

Fuer AOK-Daten: EU-Hosting Pflicht. Qdrant Cloud EU oder Supabase EU-Region als sichere Wahl. US-basierte Anbieter (Pinecone) muessten mit AOK geklaert werden.
