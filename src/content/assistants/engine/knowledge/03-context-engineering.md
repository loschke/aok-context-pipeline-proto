# Schicht 1: Context Engineering — Das Gedaechtnis

## Definition

Context ist alles, was der Assistent braucht, um eine Frage zu beantworten. Das sind nicht nur Wissenseinheiten mit fachlich geprueften Fakten, sondern auch Tools und Datenbanken der AOK: Krankenhaussuche, Pflegeheim-Finder, BMI-Rechner.

**Kernprinzip:** Ein Context weiss nicht, wer ihn nutzt. Er weiss nur, was wahr ist und was zur Verfuegung steht. Tonalitaet, Empathie, Medienanpassung — das ist Sache der anderen Schichten.

## Zwei Typen von Context

### Wissens-Context
Atomare Wissenseinheiten. Beantworten genau eine Frage vollstaendig. Keine Tonalitaet, keine Empathie. Nur fachlich gepruefte Fakten.

### Tool-Context
Beschreibungen von AOK-Tools und Datenbanken. Wann ist welches Tool relevant? Krankenhaussuche bei Behandlungsfragen, Pflegeheim-Finder bei Angehoerigen-Sorge.

## 4 Eigenschaften eines guten Bausteins

1. **Eigenstaendig** — verstaendlich ohne den Quellartikel
2. **Informationsdicht** — jeder Satz hat Substanz, kein Marketing
3. **Eindeutig typisiert** — einer der 7 Bausteintypen
4. **Vollstaendig im Kontext** — Metadaten gefuellt fuer Auffindbarkeit

## Die 5 Kontext-Dimensionen

Jeder Baustein wird mit 5 Dimensionen angereichert. Sie beantworten 5 verschiedene Fragen:

### Dimension 1: Bedeutung
**Frage:** Was ist das inhaltlich?
**Felder:** titel, typ, cluster, kategorie, quellen
**Wenn fehlt:** Generische oder falsche Antworten. System weiss nicht, worueber es spricht.
**Beispiel:** Ein Pflegegeld-Baustein hat cluster: pflege, kategorie: geldleistungen, typ: LEISTUNG. Damit ist eindeutig klar, worum es geht.

### Dimension 2: Struktur
**Frage:** Wie haengt es zusammen?
**Felder:** relationen (6 Typen: voraussetzung, kombinierbar_mit, alternative_zu, verwandt_mit, teil_von, ersetzt_durch)
**Wenn fehlt:** Fragmentierte Teilantworten. System erkennt keine Zusammenhaenge zwischen Bausteinen.
**Beispiel:** Pflegegeld hat Relation "alternative_zu: pflegesachleistung" und "kombinierbar_mit: kombinationsleistung". Das ermoeglicht vollstaendige Antworten.

### Dimension 3: Qualitaet
**Frage:** Kann ich mich darauf verlassen?
**Felder:** stand, volatilitaet, validiert
**Wenn fehlt:** Veraltete oder ungepruefte Informationen. System weiss nicht, ob Betraege noch stimmen.
**Volatilitaets-Bewertung:**

| Level | Bedeutung | Pruefintervall | Beispiel |
|-------|-----------|---------------|---------|
| hoch | Aendert sich durch Gesetzgebung | Jaehrlich oder bei Reform | Pflegegeld-Betraege |
| mittel | Aendert sich gelegentlich | Alle 6 Monate | Antragsverfahren |
| niedrig | Stabil ueber Jahre | Jaehrlich | Grundlegende Definitionen |

### Dimension 4: Regeln
**Frage:** Was gilt?
**Felder:** haftungshinweis, rechtsgrundlage
**Wenn fehlt:** System ueberschreitet Grenzen. Keine Einordnung, ob ein Disclaimer noetig ist.
**Beispiel:** rechtsgrundlage: "§ 37 SGB XI", haftungshinweis: "Betraege gemaess aktueller Gesetzeslage. Individuelle Ansprueche koennen abweichen."

### Dimension 5: Zielgruppe
**Frage:** Fuer wen?
**Felder:** zielgruppe, kontext_tags
**Wenn fehlt:** System antwortet am Bedarf vorbei. Gibt Angehoerigen-Info an Pflegebeduerftige.
**Beispiel:** zielgruppe: [pflegebeduerftige, angehoerige], kontext_tags: { pflegegrade: [2,3,4,5], setting: "haeuslich" }

## Metadaten sind Retrieval-Infrastruktur, nicht Intentions-Zuordnung

Wichtiges Architekturprinzip: Felder wie zielgruppe und kontext_tags helfen den richtigen Context zur Laufzeit zu FINDEN. Sie bestimmen nicht, WIE der Context kommuniziert wird.

Derselbe Diabetes-Context bedient gleichzeitig:
- I2 Frische Diagnose → "Was bedeutet das fuer mich?" → Orientierung geben
- I5 Langzeit-Management → "Wie lebe ich damit?" → Alltagstipps
- I4 Leistungsklaerung → "Zahlt die AOK das?" → DMP-Programme nennen

Gleicher Content, voellig anderer Output. Die Kommunikationsschicht steuert das.

## 7 Bausteintypen

| Typ | Zweck | Beispiel |
|-----|-------|---------|
| **FAKT** | Neutrale Sachinformation | "Pflegegeld gibt es ab Pflegegrad 2" |
| **EMPFEHLUNG** | Handlungsorientierte Einordnung | "Kombinationsleistung pruefen" |
| **WARNUNG** | Risiko, Frist, Konsequenz | "Ohne Beratungseinsatz wird Pflegegeld gekuerzt" |
| **LEISTUNG** | Konkrete AOK-Leistung mit Betraegen | Pflegegeld-Tabelle nach Pflegegrad |
| **TIPP** | Praktischer Alltagshinweis | "Pflegetagebuch fuehren" |
| **VERWEIS** | Weiterleitung an Stelle/Ressource | "AOK-Pflegeberatung: 0800..." |
| **PROZESS** | Schritt-fuer-Schritt-Ablauf | "Pflegegrad beantragen in 5 Schritten" |

## Beispiel: Vollstaendiger Baustein

```yaml
---
titel: "Pflegegeld"
typ: LEISTUNG
cluster: pflege
kategorie: geldleistungen
stand: "2026-03-01"
volatilitaet: hoch
validiert: false
quellen:
  - url: "https://www.deine-gesundheitswelt.de/pflege/pflegegeld"
    crawl_datum: "2026-03-01"
zielgruppe:
  - pflegebeduerftige
  - angehoerige
  - pflegepersonen
kontext_tags:
  pflegegrade: [2, 3, 4, 5]
  setting: "haeuslich"
  leistungsform: "geldleistung"
haftungshinweis: "Betraege gemaess aktueller Gesetzeslage. Individuelle Ansprueche koennen abweichen."
rechtsgrundlage: "§ 37 SGB XI"
relationen:
  - typ: alternative_zu
    ziel: pflegesachleistung
    details: "Entweder Pflegegeld oder Sachleistung, oder beides ueber Kombinationsleistung"
  - typ: kombinierbar_mit
    ziel: kombinationsleistung
    details: "Ueber § 38 SGB XI, prozentuale Verrechnung"
---

# Pflegegeld

| Pflegegrad | Betrag/Monat |
|------------|-------------|
| 2 | 332 € |
| 3 | 573 € |
| 4 | 765 € |
| 5 | 947 € |

Voraussetzungen: Pflegegrad 2-5, haeusliche Pflege durch Angehoerige oder Ehrenamtliche.
Antragstellung: Formlos bei der Pflegekasse. Begutachtung durch MD.
Beratungspflicht: Pflegegeldempfaenger muessen regelmaessig Beratungseinsaetze nachweisen.
```

## Vier Kontextquellen

| Quelle | Beispiel | Verfuegbarkeit |
|--------|---------|---------------|
| Wissensbausteine | Pflegegeld-Betraege, Antragsverfahren | Heute (Content Pipeline) |
| Tools und Rechner | Pflegegradrechner, Pflegestuetzpunkt-Finder | Teilweise (AOK-Tools existieren) |
| Echtzeit-Daten | Warteschlangen, Terminverfuegbarkeit | Zukunft (API-Anbindung noetig) |
| Nutzerprofil | Pflegegrad, Versichertenstatus, PLZ | Zukunft (MGW, Auth noetig) |
