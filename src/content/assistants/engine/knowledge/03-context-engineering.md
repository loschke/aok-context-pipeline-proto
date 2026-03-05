# Schicht 1: Context Engineering — Das Gedaechtnis

## Definition

Context ist alles, was der Assistent braucht, um eine Frage zu beantworten. Das sind nicht nur Wissenseinheiten mit fachlich geprueften Fakten, sondern auch Tools und Datenbanken der AOK: Krankenhaussuche, Pflegeheim-Finder, BMI-Rechner.

**Kernprinzip:** Ein Context weiss nicht, wer ihn nutzt. Er weiss nur, was wahr ist und was zur Verfuegung steht. Tonalitaet, Empathie, Medienanpassung — das ist Sache der anderen Schichten.

## Zwei Typen von Context: Build und Runtime

### Build Context
Vor dem Gespraech aufgebaut. Redaktionell geprueft, versioniert, aendert sich nur durch bewusste Aktualisierung. Die Redaktion kontrolliert, was der Assistent weiss.

Beispiele:
- Wissensbausteine aus der Content-to-Context Pipeline
- Statisch hinterlegte Daten (z.B. Filial-Oeffnungszeiten)
- Tool-Beschreibungen (wann ist welches Tool relevant)

### Runtime Context
Existiert erst im Moment der Anfrage. Haengt von Nutzereingabe, Zeitpunkt oder Standort ab. Die Anfrage bestimmt, was zurueckkommt.

Beispiele:
- Berechnungen (Pflegegradrechner mit Nutzereingaben)
- Echtzeit-Daten (Wartezeiten, Verfuegbarkeit)
- Nutzerdaten (Pflegegrad, PLZ, genutzte Leistungen)

**Entscheidender Unterschied:** Bei Build Context kontrolliert die Redaktion, was der Assistent weiss. Bei Runtime Context bestimmt die Anfrage, was zurueckkommt.

## Vier Kontextquellen

| Quelle | Typ | Beispiel | Verfuegbarkeit |
|--------|-----|---------|---------------|
| **Wissensbausteine** | Build | Pflegegeld-Betraege, Antragsverfahren | Heute (Content Pipeline) |
| **Tools & Datenbanken** | Hybrid | Pflegegradrechner, Pflegenavigator, Filial-Oeffnungszeiten | Teilweise |
| **Echtzeit-Daten** | Runtime | Warteschlangen, Terminverfuegbarkeit | Zukunft (API-Anbindung noetig) |
| **Nutzerprofil** | Runtime | Pflegegrad, Versichertenstatus, PLZ | Zukunft (MGW, Auth noetig) |

Tools & Datenbanken sind hybrid, weil derselbe Tool-Call je nach Aufruf Build oder Runtime sein kann: `filiale_oeffnungszeiten("Dresden")` holt statisch hinterlegte Daten (Build). `pflegegradrechner(eingaben)` berechnet etwas Neues auf Basis von Nutzereingaben (Runtime).

### Dazu kommt: der Kompass

Unabhaengig von Typ und Quelle gilt fuer jede Antwort die Verfassung des Assistenten: 5 Kernwerte, 5 Hard Constraints, Vertrauens-Hierarchie. Der Kompass ist kein Context im klassischen Sinn, sondern die Leitplanke, die bestimmt, was der Assistent mit dem Context tun darf und was nicht.

## Die 5 Kontext-Dimensionen

Jeder Baustein wird mit 5 Dimensionen angereichert. Sie beantworten 5 verschiedene Fragen:

### Dimension 1: Bedeutung
**Frage:** Was ist das inhaltlich?
**Felder:** titel, typ, cluster, kategorie, quellen
**Wenn fehlt:** Generische oder falsche Antworten. System weiss nicht, worueber es spricht.

### Dimension 2: Struktur
**Frage:** Wie haengt es zusammen?
**Felder:** relationen (6 Typen: voraussetzung, kombinierbar_mit, alternative_zu, verwandt_mit, teil_von, ersetzt_durch)
**Wenn fehlt:** Fragmentierte Teilantworten. System erkennt keine Zusammenhaenge zwischen Bausteinen.

### Dimension 3: Qualitaet
**Frage:** Kann ich mich darauf verlassen?
**Felder:** stand, volatilitaet, validiert
**Wenn fehlt:** Veraltete oder ungepruefte Informationen. System weiss nicht, ob Betraege noch stimmen.

| Level | Bedeutung | Pruefintervall | Beispiel |
|-------|-----------|---------------|---------|
| hoch | Aendert sich durch Gesetzgebung | Jaehrlich oder bei Reform | Pflegegeld-Betraege |
| mittel | Aendert sich gelegentlich | Alle 6 Monate | Antragsverfahren |
| niedrig | Stabil ueber Jahre | Jaehrlich | Grundlegende Definitionen |

### Dimension 4: Regeln
**Frage:** Was gilt?
**Felder:** haftungshinweis, rechtsgrundlage
**Wenn fehlt:** System ueberschreitet Grenzen. Keine Einordnung, ob ein Disclaimer noetig ist.

### Dimension 5: Zielgruppe
**Frage:** Fuer wen?
**Felder:** zielgruppe, kontext_tags
**Wenn fehlt:** System antwortet am Bedarf vorbei. Gibt Angehoerigen-Info an Pflegebeduerftige.

## Metadaten sind Retrieval-Infrastruktur, nicht Intentions-Zuordnung

Wichtiges Architekturprinzip: Felder wie zielgruppe und kontext_tags helfen den richtigen Context zur Laufzeit zu FINDEN. Sie bestimmen nicht, WIE der Context kommuniziert wird.

Derselbe Pflegegeld-Baustein bedient gleichzeitig:
- I2 Frische Diagnose → "Was bedeutet Pflegegrad 2?" → Orientierung geben, Pflegegeld als eine von mehreren Leistungen einordnen
- I4 Leistungsklaerung → "Wie viel Pflegegeld gibt es?" → Direkt die Betraege nennen, Kombinierbarkeit erwaehnen
- I5 Langzeit-Management → "Wie organisiere ich die Pflege dauerhaft?" → Pflegegeld als Teil des Gesamtpakets

Gleicher Content, voellig anderer Output. Die Kommunikationsschicht steuert das.

## 8 Bausteintypen

| Typ | Zweck | Beispiel |
|-----|-------|---------|
| **FAKT** | Objektive, faktenbasierte Sachinformation | Pflegegeld Grad 2: 332 EUR monatlich |
| **EMPFEHLUNG** | Handlungsorientierte Einordnung mit klarer Richtung | Kombinationsleistung pruefen: oft guenstiger als reines Pflegegeld |
| **ANLEITUNG** | Schritt-fuer-Schritt-Ablauf | Pflegegrad beantragen in 5 Schritten |
| **FAQ** | Haeufige Frage direkt beantworten | Wird Pflegegeld auf Sozialhilfe angerechnet? |
| **CHECKLISTE** | Strukturierte Pruefpunkte | Checkliste: Was vor dem MD-Termin vorbereiten |
| **VERGLEICH** | Zwei Optionen gegeneinanderstellen | Pflegegeld vs. Pflegesachleistung |
| **GLOSSAR** | Begriff definieren | Was bedeutet Kombinationsleistung? |
| **NAVIGATION** | Weiterleitung an Stelle/Ressource | AOK-Pflegeberatung: Kontakt und Oeffnungszeiten |

## Beispiel: Vollstaendiger Baustein

```yaml
---
titel: "Pflegegeld"
typ: FAKT
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
