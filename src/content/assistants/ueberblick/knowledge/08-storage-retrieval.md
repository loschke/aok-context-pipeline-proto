# Storage & Retrieval: 3-Stufen-Plan

Wo liegen die Wissensbausteine und wie kommt der Assistent an die richtigen?

## 3 Optionen

| | Option A: Flat Files | Option B: Payload CMS | Option C: Vector DB |
|---|---|---|---|
| Storage | Markdown in Git | Payload Collections | MD-Export in Vector DB |
| Retrieval | Full Context Loading / MCP | API / MCP | Hybride Vektorsuche |
| Wer pflegt | Projektteam (Editor) | Redaktion (Web-Interface) | Projektteam (Pipeline) |
| Setup | Stunden | Tage | Tage bis Wochen |
| Geeignet fuer | Demo, erster Prototyp | Prototyp mit Kunden-Interface | Produktionssystem |

## Aktueller Stand: Option A (Flat Files)

Wir nutzen aktuell Markdown-Dateien in Git. Der Pflegeberater laedt alle 15 Bausteine komplett ins Context Window. Das funktioniert fuer einen Cluster.

Groessenordnung: 80–150 Bausteine pro Cluster, 250–400 Tokens pro Baustein = 20.000–60.000 Tokens. Passt in Claude (200k).

Grenze: Skaliert nicht ueber 1 Cluster. 3 Cluster gleichzeitig = 100k–200k Tokens nur fuer Content.

## Empfohlener Stufenplan

### Stufe 1: Content validieren (aktuell)

Flat Files + Full Context Loading. Aufwand: 1–2 Stunden Setup. Wichtigste Frage: Funktionieren die Bausteine?

### Stufe 2: Kunden-Prototyp (naechster Schritt)

Payload CMS. AOK-Fachredaktion bekommt Web-Interface zum Reviewen und Freigeben. MCP Server oder API-Anbindung. Aufwand: 2–4 Tage Setup.

### Stufe 3: Produktionsvorbereitung (ab Monat 3)

Payload CMS bleibt Source of Truth. Vector DB (Qdrant EU oder Supabase pgvector) fuer hybrides Retrieval. Automatische Sync-Pipeline. Aufwand: 1–3 Wochen Setup.

## DSGVO-Thema

Fuer AOK-Daten: EU-Hosting Pflicht. Qdrant Cloud EU oder Supabase EU-Region als sichere Wahl. Pinecone (US) muesste mit AOK geklaert werden.

## Hybrides Retrieval (Stufe 3)

Kombination aus semantischer Aehnlichkeit (Vektorsuche) und Metadaten-Filtern (Frontmatter-Felder). "Was steht meiner Mutter zu?" braucht beides: Semantik (Pflege durch Angehoerige) + Filter (Pflegegrad, Zielgruppe Angehoerige).
