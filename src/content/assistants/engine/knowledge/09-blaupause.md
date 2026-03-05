# Die Blaupause: Template fuer jedes Teilprojekt

Jeder neue Themencluster (Pflege, Schwangerschaft, Diabetes etc.) durchlaeuft dasselbe Template. Die Blaupause stellt sicher, dass nichts vergessen wird und der Assistent fuer jeden Cluster korrekt konfiguriert ist.

## 6 Abschnitte der Blaupause

### 1. Intentionsprofil

Welche der 7 Intentionen bedient dieser Cluster?

| Frage | Beispiel Pflege-Cluster |
|-------|------------------------|
| Primaere Intentionen | I4 Leistungsklaerung, I6 Angehoerigen-Sorge, I5 Langzeit-Management |
| Sekundaere Intentionen | I2 Frische Diagnose (erster Pflegegrad), I1 Akute Sorge (Pflegenotfall) |
| Nicht im Scope | I7 Praeventive Vorsorge (eigener Cluster) |

Nicht jeder Assistent bedient alle Intentionen. Das Profil bestimmt, welche Antwort-Strategien konfiguriert werden muessen.

### 2. Kontextquellen-Inventar

Welche Quellen stehen fuer diesen Cluster zur Verfuegung — Build, Runtime, Hybrid?

| Quelle | Typ | Pflege-Beispiel | Status |
|--------|-----|----------------|--------|
| **Wissensbausteine** | Build | 15 Bausteine aus 10 Webseiten | Vorhanden (PoC) |
| **Tools** | Hybrid | Pflegegradrechner, Pflegestuetzpunkt-Finder | AOK-Tools existieren, Anbindung offen |
| **Echtzeit-Daten** | Runtime | Wartezeiten Begutachtung | Nicht verfuegbar |
| **Nutzerprofil** | Runtime | Pflegegrad, PLZ, genutzte Leistungen | Nicht verfuegbar (MGW) |

### 3. Kompass-Konfiguration

Welche Leitplanken sind fuer diesen Cluster besonders relevant?

| Aspekt | Pflege-Beispiel |
|--------|----------------|
| Hard Constraints | Keine Pflegegrad-Zusagen, keine Diagnosen, Eskalation bei Einzelfall |
| Konfigurierbare Verhaltensweisen | Proaktive Hinweise auf Entlastungsleistungen aktivieren |
| Vertrauens-Hierarchie | SGB XI vor AOK-Empfehlungen vor Erfahrungswissen |

### 4. Kontextdimensionen-Check

Sind alle 5 Dimensionen fuer jeden Baustein gefuellt?

| Dimension | Checkliste |
|-----------|-----------|
| Bedeutung | Eindeutiger Titel? Typ korrekt? Cluster/Kategorie zugeordnet? |
| Struktur | Relationen definiert? Keine einseitigen Verweise? |
| Qualitaet | Stand-Datum gesetzt? Volatilitaet bewertet? Validierung geplant? |
| Regeln | Haftungshinweis wo noetig? Rechtsgrundlage wo moeglich? |
| Zielgruppe | Zielgruppen definiert? Kontext-Tags (Pflegegrade, Setting) gesetzt? |

### 5. Retrieval-Konfiguration

Welche Retrieval-Stufe wird fuer diesen Cluster eingesetzt?

| Phase | Pflege-Beispiel |
|-------|----------------|
| PoC | Stufe 1 (Full Context Loading), 15 Bausteine passen komplett ins Context Window |
| Naechster Schritt | Stufe 2 (MCP Server) fuer cluster-uebergreifende Suche |
| Tool-APIs | Pflegegradrechner und Pflegenavigator parallel anbinden (Stufe 4) |

### 6. Abnahme und Freigabe

Wer prueft, wer gibt frei, was ist das Qualitaetskriterium?

| Pruefung | Verantwortlich | Kriterium |
|----------|---------------|-----------|
| Fachlich | AOK-Fachredaktion | Inhaltliche Korrektheit, Aktualitaet |
| Technisch | Projektteam | Dimensionen vollstaendig, Relationen konsistent, Retrieval-Test bestanden |
| Freigabe | Beide Seiten | Erst wenn fachliche und technische Pruefung bestanden |

## Anwendungsbeispiel: Pflege-Assistent

| Aspekt | Konfiguration |
|--------|--------------|
| Primaer-Intentionen | I4 Leistungsklaerung, I6 Angehoerigen-Sorge, I5 Langzeit-Management |
| Quell-Content | deine-gesundheitswelt.de/pflege (~24 Seiten) |
| Bausteine (PoC) | 73 extrahiert, 15 als Knowledge Base live |
| Kompass | Keine PG-Zusagen. Keine Diagnosen. Eskalation bei Einzelfall. Proaktive Entlastungshinweise an. |
| Retrieval | Stufe 1 (Full Context Loading). Stufe 4 (Tool-APIs) in Vorbereitung. |
| Naechste Cluster | Schwangerschaft, Zahngesundheit (geplant) |
