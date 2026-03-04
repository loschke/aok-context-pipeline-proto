# Content-to-Context Pipeline: Die 8 Schritte

Die Transformation von AOK-Website-Inhalten in strukturierte Wissensbausteine.

## Kernthese: Content ist nicht Context

Website-Content ist fuer Google und Menschen optimiert (SEO, Marketing, fragmentiert). LLMs brauchen strukturierten, informationsdichten Context mit Metadaten.

## Die 8 Schritte

### 1. Content-Extraktion

Firecrawl scraped AOK-Webseiten. Ergebnis: Roher Seiteninhalt als Markdown.

### 2. Baustein-Extraktion (Pass 1)

LLM zerlegt den Rohtext in atomare Wissensbausteine. Freie Kategorisierung. Jeder Baustein beantwortet genau eine Frage vollstaendig.

### 3. Taxonomie-Konsolidierung

Kategorien aus Pass 1 werden vereinheitlicht. Ziel: Konsistente Themenstruktur fuer den gesamten Cluster.

### 4. Re-Kategorisierung (Pass 2)

Bausteine werden gegen die konsolidierte Taxonomie geprueft und zugeordnet.

### 5. Gruppierung und Duplikat-Erkennung

Aehnliche Bausteine werden identifiziert. Echte Duplikate vs. ergaenzende Perspektiven unterscheiden.

### 6. Konsolidierung

Duplikate zusammenfuehren, Luecken fuellen, Informationen ergaenzen.

### 7. Context-Anreicherung

Jeder Baustein wird mit 5 Kontextdimensionen angereichert:

| Dimension | Was wird ergaenzt |
|-----------|------------------|
| Bedeutung | Eindeutige Definition, Taxonomie-Kategorie, Fachbegriffe |
| Struktur | Relationen zu verwandten Bausteinen |
| Qualitaet | Stand-Datum, Volatilitaet, Validierungsstatus |
| Regeln | Haftungshinweis, Rechtsgrundlage, Eskalationsregeln |
| Zielgruppe | Zielgruppen-Tags, Kontext-Tags (Pflegegrad, Alter etc.) |

### 8. QS durch AOK

Fachredaktion prueft Inhalt, Betraege, Vorsichtshinweise. Formale Freigabe.

## 7 Bausteintypen

| Typ | Zweck | Beispiel |
|-----|-------|---------|
| FAKT | Neutrale Sachinformation | "Pflegegeld gibt es ab Pflegegrad 2" |
| EMPFEHLUNG | Handlungsorientierte Einordnung | "Kombinationsleistung pruefen" |
| WARNUNG | Risiko, Frist, Konsequenz | "Ohne Beratungseinsatz wird Pflegegeld gekuerzt" |
| LEISTUNG | Konkrete AOK-Leistung mit Betraegen | Pflegegeld-Tabelle |
| TIPP | Praktischer Alltagshinweis | "Pflegetagebuch fuehren" |
| VERWEIS | Weiterleitung an Stelle/Ressource | "AOK-Pflegeberatung: 0800..." |
| PROZESS | Schritt-fuer-Schritt-Ablauf | "Pflegegrad beantragen" |

## Automatisierungsgrad

Schritte 1–6: Ueberwiegend automatisiert (LLM + Pipeline Workbench)
Schritte 7–8: Human-in-the-loop (Anreicherung braucht Fachwissen, QS braucht AOK)

## Proof of Concept

Der Pflege-Cluster wurde mit dieser Pipeline verarbeitet: 10 Seiten ergaben 73 Bausteine. 15 davon sind als Knowledge Base im Pflegeberater-Prototyp live und funktionieren.
