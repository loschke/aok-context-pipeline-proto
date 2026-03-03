# Schicht 1: Der Baustein — Was ist wahr?

## Definition

Ein Baustein ist eine atomare Wissenseinheit. Er beantwortet genau eine Frage vollstaendig, ohne dass zusaetzlicher Kontext noetig ist. Keine Tonalitaet. Keine Empathie. Nur fachlich gepruefte Fakten.

**Kernprinzip: Ein Baustein weiss nicht, wer ihn liest. Er weiss nur, was wahr ist.**

## 4 Eigenschaften eines guten Bausteins

1. **Eigenstaendig** — verstaendlich ohne den Quellartikel
2. **Informationsdicht** — jeder Satz hat Substanz, kein Marketing
3. **Eindeutig typisiert** — genau ein Typ, der korrekt ist
4. **Vollstaendig im Kontext** — Metadaten gefuellt fuer Auffindbarkeit

## Metadaten sind Retrieval-Infrastruktur

Felder wie `zielgruppe`, `kontext_tags` und `typ` helfen, den richtigen Baustein zur Laufzeit zu finden. Sie sind **keine Intentions-Zuordnung**. Der Baustein bleibt neutral — die Kommunikation liegt woanders.

Derselbe Baustein kann fuer voellig verschiedene Intentionen genutzt werden. Ein Diabetes-Baustein bedient gleichzeitig "Frische Diagnose" (Orientierung geben), "Langzeit-Management" (Alltagstipps) und "Leistungsklaerung" (AOK-Programme nennen).

## Beispiel: Baustein-Struktur

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

Jeder Baustein wird mit fuenf Dimensionen angereichert:

| Dimension | Felder | Zweck |
|---|---|---|
| **Bedeutung** | quellen, cluster, kategorie | Woher kommt die Information? |
| **Struktur** | relationen | Wie haengt der Baustein mit anderen zusammen? |
| **Qualitaet** | stand, volatilitaet, validiert | Wie aktuell und zuverlaessig? |
| **Regeln** | haftungshinweis, rechtsgrundlage | Welche rechtlichen Einschraenkungen? |
| **Zielgruppe** | zielgruppe, kontext_tags | Fuer wen? Unter welchen Bedingungen? |

## Warum "einmal pflegen, ueberall nutzen"

Ohne Pipeline: Pro Thema x7 Intentionen = 7 verschiedene Texte. Redundanz, Inkonsistenz, Pflegehoelle.
Mit Pipeline: Ein Baustein pro Thema. Die Intention Engine steuert die Kommunikation zur Laufzeit.
