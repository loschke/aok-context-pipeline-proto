# Schicht 1: Der Context — Was ist wahr? Was steht zur Verfuegung?

## Definition

Context ist alles, was der Assistent braucht, um eine Frage zu beantworten. Das sind nicht nur Wissenseinheiten mit fachlich geprueften Fakten, sondern auch Tools und Datenbanken der AOK: Krankenhaussuche, Pflegeheim-Finder, BMI-Rechner und viele mehr. Context beschreibt was verfuegbar ist und wann es relevant wird.

**Kernprinzip: Ein Context weiss nicht, wer ihn nutzt. Er weiss nur, was wahr ist und was zur Verfuegung steht.**

## Zwei Typen von Context

### Wissens-Context
Atomare Wissenseinheiten. Beantworten genau eine Frage vollstaendig. Keine Tonalitaet, keine Empathie. Nur fachlich gepruefte Fakten.

### Tool-Context
Beschreibungen von AOK-Tools und Datenbanken. Wann ist welches Tool relevant? Krankenhaussuche bei Behandlungsfragen, Pflegeheim-Finder bei Angehoerigen-Sorge.

## 4 Eigenschaften eines guten Context

1. **Eigenstaendig** — verstaendlich ohne den Quellartikel
2. **Informationsdicht** — jeder Satz hat Substanz, kein Marketing
3. **Eindeutig typisiert** — Wissen oder Tool, klar zugeordnet
4. **Vollstaendig im Kontext** — Metadaten gefuellt fuer Auffindbarkeit

## Metadaten sind Retrieval-Infrastruktur

Felder wie `zielgruppe`, `kontext_tags` und `typ` helfen, den richtigen Context zur Laufzeit zu finden. Sie sind **keine Intentions-Zuordnung**. Der Context bleibt neutral — die Kommunikation liegt woanders.

Derselbe Context kann fuer voellig verschiedene Intentionen genutzt werden. Ein Diabetes-Context bedient gleichzeitig "Frische Diagnose" (Orientierung geben), "Langzeit-Management" (Alltagstipps) und "Leistungsklaerung" (AOK-Programme nennen).

## Beispiel: Wissens-Context-Struktur

```yaml
titel: "Diabetes mellitus Typ 2"
typ: erkrankung
cluster: stoffwechsel
kategorie: chronische-erkrankungen
stand: "2026-03-01"
zielgruppe:
  - versicherte
  - angehoerige
kontext_tags:
  bereich: innere-medizin
  chronisch: true
```

Inhalt:
- Chronische Stoffwechselerkrankung: Blutzucker dauerhaft erhoeht
- Diagnose: HbA1c-Wert > 6,5%
- Behandlung: Ernaehrung, Bewegung, ggf. Metformin
- AOK-Leistungen: DMP Diabetes, Ernaehrungsberatung, Blutzuckermessgeraete

## 5 Kontext-Dimensionen (Anreicherung)

Jeder Context wird mit fuenf Dimensionen angereichert:

| Dimension | Felder | Zweck |
|---|---|---|
| **Bedeutung** | quellen, cluster, kategorie | Woher kommt die Information? |
| **Struktur** | relationen | Wie haengt der Context mit anderen zusammen? |
| **Qualitaet** | stand, volatilitaet, validiert | Wie aktuell und zuverlaessig? |
| **Regeln** | haftungshinweis, rechtsgrundlage | Welche rechtlichen Einschraenkungen? |
| **Zielgruppe** | zielgruppe, kontext_tags | Fuer wen? Unter welchen Bedingungen? |

## Warum "einmal pflegen, ueberall nutzen"

Ohne SAVA Engine: Pro Thema x7 Intentionen = 7 verschiedene Texte. Redundanz, Inkonsistenz, Pflegehoelle.
Mit SAVA Engine: Ein Context pro Thema. Die Kommunikationsschicht steuert die Anpassung zur Laufzeit.
