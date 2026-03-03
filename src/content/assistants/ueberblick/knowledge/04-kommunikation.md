# Schicht 3: Die Kommunikation — Wie muss es klingen?

## Die Intention Engine

Die Intention Engine ist das Herzstueck. Sie bekommt zwei Inputs:
1. Die **erkannte Intention** vom Sensor
2. Die **Rohdaten** aus dem Baustein

Und uebersetzt beides in einen menschlichen, situationsgerechten Output.

## 4 Steuerparameter

Die Kommunikationsschicht steuert nicht nur wie eine Antwort klingt, sondern auch wodurch sie den Nutzer erreicht.

| Parameter | Beschreibung |
|---|---|
| **Tonalitaet** | Beruhigend, sachlich, motivierend, partnerschaftlich — abhaengig von der emotionalen Lage |
| **Informationstiefe** | Minimal bei Ueberforderung, maximal bei Fakten-Hunger. Der Mensch bestimmt das Tempo |
| **Proaktivitaet** | Aktives Hinweisen auf verwandte Leistungen vs. abwarten. Bei Krisen hoch, bei Routine niedrig |
| **Ausgabemedium** | Der Kanal, ueber den die Antwort den Nutzer erreicht — abhaengig von Situation, Geraet und Informationstyp |

## Ausgabemedien — Die letzte Meile

Dieselbe Antwort kann den Nutzer auf voellig unterschiedlichen Wegen erreichen:

| Medium | Beschreibung |
|---|---|
| **Chat-Antwort** | Strukturierter Text im Dialog. Standard bei direkten Fragen. |
| **Dokument / PDF** | Druckfaehige Zusammenfassung zum Mitnehmen. Arztgespraeche, Checklisten. |
| **Push-Nachricht** | Kurzer Impuls aufs Smartphone. Erinnerungen, Fristen, proaktive Hinweise. |
| **Audio / Vorlese** | Gesprochene Antwort. Unterwegs, bei Seheinschraenkung, wenn Lesen nicht geht. |
| **Schritt-fuer-Schritt** | Interaktiver Wizard. Komplexe Prozesse wie Antragsstellung oder Arztwechsel. |
| **Visuelle Uebersicht** | Infografik, Zeitstrahl, Vergleichstabelle. Wenn ein Bild mehr sagt als Text. |

Das Ausgabemedium ist die Bruecke zum Headless-Content-Prinzip: Weil der Baustein keine Kanal-Bindung hat, kann dieselbe Information als Chat-Text, als PDF, als Push oder als Audio ausgespielt werden.

## Kommunikationsparameter pro Intention

| Intention | Tonalitaet | Tiefe | Proaktivitaet | Typisches Medium |
|---|---|---|---|---|
| I1 Akute Sorge | Beruhigend, empathisch | Minimal | Hoch | Chat, Push, Audio |
| I2 Frische Diagnose | Strukturiert, sachlich-warm | Mittel | Mittel | Chat, PDF, Wizard |
| I3 Behandlungssuche | Sachlich, kompetent | Hoch | Mittel | Chat, Uebersicht, PDF |
| I4 Leistungsklaerung | Direkt, klar | Praezise | Niedrig | Chat, PDF |
| I5 Langzeit-Management | Partnerschaftlich | Anpassbar | Gering | Push, Audio, Chat |
| I6 Angehoerigen-Sorge | Unterstuetzend | Mittel | Hoch | PDF, Wizard, Chat |
| I7 Praeventive Vorsorge | Motivierend | Mittel | Mittel | Push, Audio, Uebersicht |

## Situation beeinflusst Kommunikation

Neben der Intention beruecksichtigt die Kommunikationsschicht auch die aeussere Situation:

| Situation | Anpassung | Bevorzugtes Medium |
|---|---|---|
| **Mobil unterwegs** | Kurze, scanbare Antworten. Listen statt Fliesstext. | Push, Audio, Chat (kompakt) |
| **Am Desktop** | Ausfuehrlicher, mit Tabellen und Vergleichen. | Chat, PDF, Uebersicht |
| **Unter Stress** | Beruhigender Ton. Ein naechster Schritt. Keine Informationsflut. | Chat (kurz), Audio |
| **Recherche-Modus** | Alle Details. Rechtsgrundlagen. Verknuepfungen. | Chat (ausfuehrlich), PDF, Uebersicht |

## Beispiel: Derselbe Baustein, drei Outputs, drei Medien

Baustein: Diabetes mellitus Typ 2 (identische Fakten)

**I2 — Frische Diagnose** (Ton: orientierend, beruhigend / Medium: Chat + PDF):
"Eine neue Diagnose kann sich ueberwaeltigend anfuehlen. Der wichtigste erste Schritt: ein Gespraech mit deinem Hausarzt. Die AOK bietet das Diabetes-Programm DMP an, das dich langfristig begleitet."
→ Als PDF: Einseiter "Meine neue Diagnose — die naechsten Schritte" zum Mitnehmen ins Arztgespraech.

**I5 — Langzeit-Management** (Ton: partnerschaftlich, alltagsnah / Medium: Push + Audio):
"Mit den richtigen Routinen laesst sich Diabetes gut in den Alltag integrieren. Neben Bewegung und Ernaehrung unterstuetzt dich das AOK-DMP mit strukturierten Checks. Kennst du die Selbsthilfegruppen in deiner Region?"
→ Als Push: "Dein naechster DMP-Check steht an. Hier findest du, was du mitbringen solltest."
→ Als Audio: Vorgelesene Kurzfassung fuer den Weg zur Arbeit.

**I4 — Leistungsklaerung** (Ton: direkt, sachlich, praezise / Medium: Chat + Uebersicht):
"Die AOK uebernimmt im Rahmen des DMP Diabetes: Vorsorgeuntersuchungen, Ernaehrungsberatung und bei Bedarf Blutzuckermessgeraete. Fuer deinen konkreten Anspruch wende dich an deine AOK-Geschaeftsstelle."
→ Als visuelle Uebersicht: Tabelle mit allen DMP-Leistungen, Haeufigkeit und Voraussetzungen.

Dieselben Fakten. Drei voellig verschiedene Antworten auf voellig verschiedenen Wegen. Die Kommunikationsschicht bestimmt nicht nur wie es klingt, sondern auch wodurch es den Nutzer erreicht.
