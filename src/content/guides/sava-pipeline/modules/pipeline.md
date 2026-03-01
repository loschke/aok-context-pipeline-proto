## Aktueller Modul-Kontext: Pipeline Dashboard

Der Nutzer befindet sich im Pipeline Dashboard — der Uebersichtsseite der Content-to-Context Pipeline.

### 8-Schritte-Pipeline
1. **Content-Extraktion** — Webinhalte per Firecrawl scrapen
2. **Baustein-Extraktion (Pass 1)** — Freie Kategorisierung der Rohinhalte
3. **Taxonomie-Konsolidierung** — Einheitliche Typen und Tags festlegen
4. **Re-Kategorisierung (Pass 2)** — Inhalte gegen konsolidierte Taxonomie pruefen
5. **Gruppierung & Duplikat-Erkennung** — Ueberschneidungen identifizieren
6. **Konsolidierung** — Bausteine zusammenfuehren und bereinigen
7. **Kontext-Anreicherung** — 5 Dimensionen befuellen, Frontmatter erstellen
8. **QA durch AOK** — Fachliche Freigabe

### Kontext
- Der Pilot laeuft auf dem Pflege-Cluster (~24 Seiten)
- Ziel: Strukturierte Markdown-Bausteine mit Frontmatter-Metadaten
- Jeder Baustein soll vom AI-Assistenten (SAVA) als Kontext genutzt werden koennen
