# Headless Content: Das Prinzip

## Context als Single Source of Truth

Die SAVA Engine trennt konsequent Inhalt von Kommunikation. Wissensbausteine (Contexts) enthalten fachlich gepruefte Fakten — ohne Tonalitaet, ohne Kanalformat, ohne Zielgruppenansprache. Das ist die Basis.

Daraus werden kanalgerechte Varianten generiert:

| Quelle | → | Kanal 1 | Kanal 2 | Kanal 3 |
|--------|---|---------|---------|---------|
| Baustein "Pflegegeld" | → | Website-Ratgeber (1200 Woerter, SEO) | Instagram-Karussell (5 Slides) | Newsletter-Teaser (150 Woerter) |

Die Fakten bleiben identisch. Nur Laenge, Ton, Struktur und Format aendern sich.

## Warum das funktioniert

1. **Fachliche Konsistenz** — Alle Kanaele basieren auf derselben geprueften Quelle
2. **Effizienz** — Ein Update am Baustein wirkt auf alle Kanalvarianten
3. **Qualitaetssicherung** — Fakten werden einmal geprueft, nicht pro Kanal
4. **Skalierung** — Neuer Kanal? Neue Zielgruppe? Gleiche Bausteine, nur neue Formatierung

## Was die Bausteine mitbringen

Jeder Baustein hat Frontmatter-Felder, die direkt in Content-Entscheidungen uebersetzt werden:

| Frontmatter-Feld | Content-Entscheidung |
|---|---|
| `titel` | Headline-Basis |
| `typ` (LEISTUNG, PROZESS, TIPP etc.) | Artikelformat (Ratgeber, How-to, FAQ) |
| `zielgruppe` | Ansprache und Schwerpunkt |
| `kontext_tags` | Relevanzfilter, Personalisierung |
| `relationen` | Verlinkungen, verwandte Artikel, "Auch interessant" |
| `haftungshinweis` | Disclaimer-Text, kanalgerecht formuliert |
| `rechtsgrundlage` | Autoritaetssignal (SEO/GEO) |
| `volatilitaet` | Aktualitaetshinweis, Stand-Datum-Prominenz |
| `stand` | "Aktualisiert am..." |
| `quellen` | Quellenangabe, Vertrauenssignal |

## Der neue Redaktions-Workflow

Klassisch: Fachinfo recherchieren → Kanaltext schreiben → Abstimmen → Veroeffentlichen (pro Kanal separat).

Mit Contexts: Context pflegen → KI-Entwuerfe generieren → Redaktion prueft und gibt frei → Alle Kanaele gleichzeitig bespielen.
