# Die Blaupause: Template fuer jedes Teilprojekt

Jeder neue Themencluster (Pflege, Schwangerschaft, Diabetes etc.) durchlaeuft dasselbe Template. Die Blaupause stellt sicher, dass nichts vergessen wird.

## 5 Abschnitte der Blaupause

### 1. Scope und Intentionsprofil

Welche der 7 Intentionen bedient dieser Cluster?

| Frage | Beispiel Pflege-Cluster |
|-------|------------------------|
| Primaere Intentionen | I4 Leistungsklaerung, I6 Angehoerigen-Sorge, I5 Langzeit-Management |
| Sekundaere Intentionen | I2 Frische Diagnose (erster Pflegegrad), I1 Akute Sorge (Pflegenotfall) |
| Nicht im Scope | I7 Praeventive Vorsorge (eigener Cluster) |

Nicht jeder Assistent bedient alle Intentionen. Das Profil bestimmt, welche Antwort-Strategien konfiguriert werden muessen.

### 2. Kontextquellen-Inventar

Was steht zur Verfuegung?

| Quelle | Pflege-Beispiel | Status |
|--------|----------------|--------|
| **Wissensbausteine** | 15 Bausteine aus 10 Webseiten | Vorhanden (PoC) |
| **Tools** | Pflegegradrechner, Pflegestuetzpunkt-Finder | AOK-Tools existieren, Anbindung offen |
| **Echtzeit-Daten** | Wartezeiten Begutachtung | Nicht verfuegbar |
| **Nutzerprofil** | Pflegegrad, PLZ, genutzte Leistungen | Nicht verfuegbar (MGW) |

### 3. Kontextdimensionen-Check

Sind alle 5 Dimensionen fuer jeden Baustein gefuellt?

| Dimension | Checkliste |
|-----------|-----------|
| Bedeutung | Eindeutiger Titel? Typ korrekt? Cluster/Kategorie zugeordnet? |
| Struktur | Relationen definiert? Keine einseitigen Verweise? |
| Qualitaet | Stand-Datum gesetzt? Volatilitaet bewertet? Validierung geplant? |
| Regeln | Haftungshinweis wo noetig? Rechtsgrundlage wo moeglich? |
| Zielgruppe | Zielgruppen definiert? Kontext-Tags (Pflegegrade, Setting) gesetzt? |

### 4. Kommunikations-Layer-Konfiguration

| Layer | Konfiguration Pflege |
|-------|---------------------|
| Layer 1 (Unternehmen) | Keine PG-Zusagen. Keine Diagnosen. Eskalation bei Einzelfall. |
| Layer 2 (Intention) | I4 = direkt + praezise. I6 = unterstuetzend + proaktiv. |
| Layer 3 (Delivery) | Desktop-Chat als Standard. PDF fuer Checklisten. Wizard fuer Antraege. |

### 5. Aufwand und Abhaengigkeiten

| Phase | Aufwand Projektteam | Aufwand AOK |
|-------|--------------------|-----------|
| A: Content-Extraktion | 4-8h | 2-4h (URL-Listen, Priorisierung) |
| B: Pipeline-Verarbeitung | 8-16h | 0h |
| C: Anreicherung + QS-Vorbereitung | 12-20h | 2-4h (Fachfragen klaeren) |
| D: QS + Freigabe | 4-8h (Einarbeitung Feedback) | 8-16h (Inhaltliche Pruefung) |
| **Gesamt pro Cluster** | **28-52h** | **12-24h** |

Skalierungseffekt: Ab dem 2. Cluster sinkt der Aufwand fuer Projektteam um ~30% (Pipeline steht, Templates wiederverwendbar). AOK-Aufwand bleibt aehnlich (inhaltliche Pruefung laesst sich nicht abkuerzen).

## Anwendungsbeispiel: Pflege-Assistent

| Aspekt | Konfiguration |
|--------|--------------|
| Primaer-Intentionen | I4 Leistungsklaerung, I6 Angehoerigen-Sorge, I5 Langzeit-Management |
| Quell-Content | deine-gesundheitswelt.de/pflege (~24 Seiten) |
| Bausteine (PoC) | 73 extrahiert, 15 als Knowledge Base live |
| Layer 1 | Keine PG-Zusagen. Keine Diagnosen. Eskalation bei Einzelfall. |
| Layer 2 | I4 = direkt + praezise. I6 = unterstuetzend + proaktiv auf Entlastung. |
| Naechste Cluster | Schwangerschaft, Zahngesundheit (geplant) |
