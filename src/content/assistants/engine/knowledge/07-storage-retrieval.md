# Retrieval-Architektur: Wie der Assistent den richtigen Context findet

## 4 Stufen im Ueberblick

Stufe 1-3 beschreiben, wie der Assistent Wissensbausteine findet — aufeinander aufbauend, jede loest ein Problem der vorherigen. Stufe 4 ergaenzt den zweiten Retrieval-Pfad: Live-Daten aus Tools, Datenbanken und externen Services.

| Stufe | Name | Prinzip | Geeignet fuer |
|-------|------|---------|--------------|
| 1 | Full Context Loading | Alles laden, LLM sucht selbst | Demo, PoC, Content-Validierung |
| 2 | MCP Server | Aktiv abrufen statt alles vorladen | Prototyp mit mehreren Clustern |
| 3 | Vector DB + Hybride Suche | Semantische + Metadaten-Suche | Produktionssystem, Multi-Cluster |
| 4 | Tool-APIs und Live-Daten | Datenbanken, Rechner, externe Services | Tool-Integration, Personalisierung |

## Stufe 1: Full Context Loading

Alle Bausteine eines Clusters komplett ins Context Window laden. Kein Retrieval-Algorithmus noetig — das LLM durchsucht den gesamten Context selbst und entscheidet, welche Bausteine relevant sind.

**Groessenordnung:** 80-150 Bausteine pro Cluster, je 250-400 Tokens = 20.000-60.000 Tokens. Passt in Claude (200k Context).

**Staerken:**
- Setup in 1-2 Stunden
- Kein Retrieval-Algorithmus noetig
- LLM findet selbst die relevanten Teile

**Grenzen:**
- Skaliert nicht ueber 1-2 Cluster
- 3 Cluster = 100k-200k Tokens nur fuer Content
- Hoehere Token-Kosten pro Anfrage

## Stufe 2: MCP Server

Model Context Protocol als Schnittstelle. Der Assistent ruft aktiv Bausteine ab statt alles vorzuladen.

Der MCP Server liest Markdown-Dateien, parst Frontmatter und stellt Such-Tools bereit: suche_bausteine(), hole_baustein(), zeige_relationen(). Der Assistent entscheidet per Tool-Call, welche Bausteine er braucht.

**Staerken:**
- Laedt nur relevante Bausteine
- Skaliert cluster-uebergreifend
- Setup in 4-8 Stunden

**Grenzen:**
- Suche nur ueber Metadaten, nicht semantisch
- Assistent muss wissen, wonach er suchen soll
- Kein Web-Interface fuer Redaktion

## Stufe 3: Vector DB + Hybride Suche

Semantische Aehnlichkeit (Vektorsuche) kombiniert mit Metadaten-Filtern (Frontmatter-Felder).

Jeder Baustein wird als Embedding gespeichert, Metadaten als filterbare Felder. Bei einer Anfrage: Vektorsuche findet semantisch aehnliche Bausteine, Metadaten-Filter grenzt ein (Cluster, Zielgruppe, Pflegegrad), Re-Ranking liefert die relevantesten.

**Warum hybrid:** "Was steht meiner Mutter zu?" braucht beides:
- Semantik: "Mutter" → Angehoerigen-Kontext, "zustehen" → Leistungsanspruch
- Filter: Zielgruppe=Angehoerige, Typ=FAKT oder CHECKLISTE

**Staerken:**
- Semantisches Verstehen freier Nutzerfragen
- Skaliert auf Tausende Bausteine
- Praezise durch hybride Filterung

**Grenzen:**
- Setup: Tage bis Wochen
- Jede Aenderung erfordert Re-Embedding
- DSGVO: EU-Hosting Pflicht fuer AOK-Daten

**Produkt-Empfehlungen:**
- EU-Hosting (DSGVO): Qdrant Cloud EU, Supabase pgvector (EU-Region)
- Global: Pinecone, Weaviate, Azure AI Search

## Stufe 4: Tool-APIs und Live-Daten

Der Assistent ruft ueber API-Schnittstellen Datenbanken, Rechner und externe Services auf und speist deren Ergebnisse in den Context ein.

Parallel zum Wissens-Retrieval erkennt der Assistent, ob die Anfrage Live-Daten erfordert. Ueber definierte Tool-Calls greift er auf AOK-Services zu: pflegenavigator_suche(plz, leistungsart) liefert konkrete Pflegedienste, pflegegradrechner(eingaben) berechnet eine Ersteinschaetzung, kundencenter_finden(region) zeigt Anlaufstellen.

**Staerken:**
- Konkrete, personalisierte Antworten statt generischer Infos
- Ergebnisse sind immer aktuell
- Kombinierbar mit jeder Wissens-Retrieval-Stufe

**Grenzen:**
- Pro Service eigene API-Anbindung noetig
- Abhaengig von Verfuegbarkeit der AOK-Systeme
- Latenz: API-Calls brauchen Zeit

## Zusammenspiel in der Praxis

In der Praxis laufen Wissens-Retrieval und Tool-Aufrufe parallel. Der Assistent sucht die passenden Bausteine (Stufe 1-3) und fragt gleichzeitig relevante Services ab (Stufe 4). Beides fliesst zusammen in den Context, aus dem die Antwort entsteht.

## Storage-Optionen

Unabhaengig von der Retrieval-Stufe brauchen die Bausteine ein Zuhause:

| Option | Storage | Wer pflegt | Geeignet fuer |
|--------|---------|-----------|--------------|
| Flat Files (Git) | Markdown in Git | Projektteam | Demo, Prototyp |
| Headless CMS | Payload Collections | Redaktion (Web-Interface) | Kunden-Prototyp |
| Vector DB | Embeddings + Metadaten | Projektteam (Pipeline) | Produktionssystem |

Empfohlener Pfad: Flat Files zum Validieren → CMS fuer AOK-Redaktion → Vector DB fuer Produktion. Jede Stufe baut auf der vorherigen auf.
