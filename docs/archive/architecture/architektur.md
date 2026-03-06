AI-Assistenten für die AOK Sachsen-Anhalt: Architektur und Methodik

**Grundlagendokument für die Entwicklung intelligenter Gesundheitsassistenten**

Version: 0.2 Draft Stand: Februar 2025 Autoren: queonext / loschke.ai Projekt: Mission SAVA – AI-Assistenten AOK Sachsen-Anhalt

--------------------------------------------------------------------------------

Über dieses Dokument

Dieses Dokument beschreibt die Gesamtarchitektur für AI-gestützte Assistenten der AOK Sachsen-Anhalt. Es ist die gemeinsame Grundlage für alle Beteiligten – Auftraggeber, Fachredaktion, Entwicklung, Projektleitung – und dient als Blaupause für jedes Teilprojekt.

**Was dieses Dokument leistet:**

Es erklärt, wie ein AI-Assistent funktioniert, der nicht nur Fragen beantwortet, sondern Versicherte in ihrer konkreten Situation begleitet. Dafür braucht es drei Dinge: ein Verständnis dafür, was der Nutzer braucht (Intentionen), ein Regelwerk dafür, wie das System antwortet (Kommunikations-Layer), und eine Wissensbasis, auf die das System zugreift (Context Engineering).

**Was dieses Dokument nicht leistet:**

Es ersetzt nicht die operative Methodik einzelner Teilprojekte. Für die konkrete Umsetzung – etwa die Transformation von Website-Content in eine Wissensbasis – gibt es eigene, detaillierte Leitfäden. Dieses Dokument beschreibt das Gesamtbild und die Prinzipien, die für alle Teilprojekte gelten.

**Wie dieses Dokument zu lesen ist:**

Kapitel 1–4 erklären die drei Ebenen der Architektur und ihr Zusammenspiel. Kapitel 5 enthält die Blaupause: ein wiederverwendbares Template für jedes neue Assistenten-Teilprojekt. Kapitel 6 zeigt die Blaupause an einem konkreten Beispiel.

--------------------------------------------------------------------------------

Inhaltsübersicht

1. Das Gesamtbild: Drei Ebenen, ein System
2. Ebene 1 – Intentionen: Was braucht der Nutzer?
3. Ebene 2 – Kommunikations-Layer: Wie antwortet das System?
4. Ebene 3 – Context Engineering: Worauf greift das System zu?
5. Die Blaupause: Template für jedes Teilprojekt
6. Anwendungsbeispiel: Pflege-Assistent
7. Von der Vision zur Umsetzung

--------------------------------------------------------------------------------

1. Das Gesamtbild: Drei Ebenen, ein System

Die zentrale Idee

Menschen, die sich an ihre Krankenkasse wenden, fragen nicht nach Paragraphen. Sie fragen: "Was passiert jetzt mit mir?", "Muss ich das selbst bezahlen?", "Wie geht es weiter?" Hinter jeder Frage steht eine Situation, ein Bedürfnis, oft eine Emotion.

Ein AI-Assistent, der nur Fakten wiedergibt, ist nicht besser als eine FAQ-Seite. Ein Assistent, der versteht, was der Mensch in seiner Situation braucht, und darauf angemessen reagiert – das ist das Ziel.

Dafür braucht das System drei Ebenen, die aufeinander aufbauen:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   EBENE 1: INTENTIONEN                                  │
│   Was braucht der Nutzer?                               │
│                                                         │
│   → 7 Kern-Intentionen von akuter Angst                 │
│     bis präventiver Vorsorge                            │
│   → Bestimmt: Welches Grundbedürfnis wird bedient       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   EBENE 2: KOMMUNIKATIONS-LAYER                         │
│   Wie antwortet das System?                             │
│                                                         │
│   → Layer 1: Leitplanken (Was darf gesagt werden?)      │
│   → Layer 2: Inhaltsstrategie (Was wird gesagt?)        │
│   → Layer 3: Delivery (Wie kommt es an?)                │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   EBENE 3: CONTEXT ENGINEERING                          │
│   Worauf greift das System zu?                          │
│                                                         │
│   → Wissensbasis (aufbereiteter Content)                │
│   → Tools und Rechner (Funktionalitäten)                │
│   → Echtzeit-Daten (aktuelle Informationen)             │
│   → Nutzerprofil (persönlicher Kontext)                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Warum drei Ebenen?

Jede Ebene beantwortet eine andere Frage. Fehlt eine, funktioniert das System nicht:

| Wenn fehlt...        | Dann passiert...                                                     | Beispiel                                |
| -------------------- | -------------------------------------------------------------------- | --------------------------------------- |
| Intentionserkennung  | System antwortet technisch korrekt, aber am Bedürfnis vorbei         | Nutzer hat Angst, bekommt Paragraphen   |
| Kommunikations-Layer | System hat den richtigen Inhalt, liefert ihn aber falsch aus         | Gestresster Nutzer bekommt Textwand     |
| Context Engineering  | System will richtig antworten, hat aber keine verlässliche Grundlage | Assistent halluziniert Leistungsbeträge |

Die Ebenen sind bewusst getrennt, weil sie unterschiedliche Kompetenzen erfordern: Intentionen brauchen Verständnis für Nutzerbedürfnisse (UX, Fachberatung), Kommunikations-Layer brauchen Designentscheidungen (Tonalität, Formatierung), Context Engineering braucht inhaltliche und technische Aufbereitung (Fachredaktion, Entwicklung).

Wie die Ebenen zusammenspielen

Am Beispiel einer konkreten Anfrage:

**Nutzer fragt:** "Meine Mutter braucht einen Pflegedienst. Was zahlt die AOK?"

```
EBENE 1 erkennt:
  Primär-Intention: Leistungsklärung ("Was zahlt die AOK?")
  Sekundär-Intention: Angehörigen-Sorge ("Meine Mutter")
  → Das System weiß jetzt: Hier braucht es Fakten UND Empathie

EBENE 2 entscheidet:
  Layer 1 prüft: Keine Einzelfall-Zusage, allgemeine Leistungsinfo
  Layer 2 steuert: Tonalität empathisch-sachlich, Tiefe mittel,
    proaktiv auf Beratungsangebote hinweisen
  Layer 3 passt an: Nutzer scheint unter Zeitdruck, kompaktes Format

EBENE 3 liefert:
  Wissensbasis: Baustein "Pflegesachleistung" mit Beträgen,
    Voraussetzungen, Pflegegrad-Staffelung
  Relationen: Verweis auf Kombinationsleistung, Verhinderungspflege
  Regelkontext: Haftungshinweis, Eskalation an persönliche Beratung
  Tools: Verweis auf Pflegegradrechner, Pflegestützpunktfinder
```

**Ergebnis:** Der Assistent gibt eine empathische, faktenbasierte Antwort mit konkreten Beträgen, weist auf verwandte Leistungen hin, bietet einen Pflegestützpunkt in der Nähe an und formuliert einen Haftungshinweis – alles in kompakter Form.

Ohne Ebene 1 wäre die Antwort rein sachlich und würde die Angehörigen-Perspektive ignorieren. Ohne Ebene 2 wäre sie vielleicht empathisch, aber unstrukturiert. Ohne Ebene 3 wäre sie warmherzig formuliert, aber ohne verlässliche Zahlen.

--------------------------------------------------------------------------------

2. Ebene 1 – Intentionen: Was braucht der Nutzer?

Der Grundgedanke

Menschen wenden sich an ihre Krankenkasse in sehr unterschiedlichen Situationen. Jemand, der gerade eine Krebsdiagnose erhalten hat, braucht etwas fundamental anderes als jemand, der wissen will, ob die AOK eine Zahnreinigung bezuschusst.

Die Intentionserkennung ist die erste und wichtigste Entscheidung des Systems: In welcher Situation befindet sich dieser Mensch, und was braucht er von uns?

Die 7 Kern-Intentionen

Aus der Analyse typischer Krankenkassen-Interaktionen ergeben sich sieben Grund-Intentionen. Sie decken das Spektrum von akuter Krise bis langfristiger Gesundheitsoptimierung ab. Jede Intention beschreibt ein Grundbedürfnis, das die Kommunikationsstrategie bestimmt.

| #   | Intention           | Grundbedürfnis            | Typische Frage                      |
| --- | ------------------- | ------------------------- | ----------------------------------- |
| 1   | Akute Sorge         | Sicherheit & Entlastung   | "Bin ich krank?"                    |
| 2   | Frische Diagnose    | Orientierung & Kontrolle  | "Was bedeutet das für mich?"        |
| 3   | Behandlungssuche    | Qualität & Effizienz      | "Wer kann mir helfen?"              |
| 4   | Leistungsklärung    | Sicherheit & Pragmatismus | "Zahlt die AOK das?"                |
| 5   | Langzeit-Management | Autonomie & Stabilität    | "Wie lebe ich damit?"               |
| 6   | Angehörigen-Sorge   | Verantwortung & Fürsorge  | "Wie helfe ich meinem Angehörigen?" |
| 7   | Präventive Vorsorge | Selbstverwirklichung      | "Wie bleibe ich gesund?"            |

**Intention 1: Akute Sorge** → Sicherheit & Entlastung "Bin ich krank? Ist das gefährlich?"

Der Nutzer ist beunruhigt, möglicherweise verängstigt. Er braucht schnelle Einordnung und klare Handlungsanweisungen. Das System muss beruhigen, ohne zu verharmlosen, und bei echten Warnsignalen konsequent an medizinische Hilfe verweisen.

Typische Auslöser: Unklare Symptome, besorgniserregende Suchergebnisse, akute Schmerzen.

**Intention 2: Frische Diagnose** → Orientierung & Kontrolle "Was bedeutet das für mein Leben?"

Der Nutzer ist überwältigt von einer neuen Information. Er braucht Orientierung, Struktur und die Gewissheit, dass es einen Weg gibt. Das System muss die wichtigsten nächsten Schritte klar benennen, ohne mit Details zu überfluten.

Typische Auslöser: Arztgespräch mit Befund, Diagnose eines Familienmitglieds, Gutachten-Ergebnis (z.B. Pflegegrad).

**Intention 3: Behandlungssuche** → Qualität & Effizienz "Wer kann mir helfen?"

Der Nutzer weiß, was er hat, und sucht die beste Versorgung. Er braucht qualifizierte Empfehlungen und praktische Unterstützung bei der Organisation. Das System muss konkret werden: Namen, Orte, Termine, Qualitätsmerkmale.

Typische Auslöser: Überweisung zum Facharzt, Reha-Bedarf, Suche nach Spezialklinik.

**Intention 4: Leistungsklärung** → Sicherheit & Pragmatismus "Zahlt die AOK das?"

Der Nutzer will wissen, welche Leistungen ihm zustehen, was sie kosten und wie er sie bekommt. Er braucht präzise Fakten ohne Umschweife. Das System muss exakte Beträge, Bedingungen und Antragsverfahren liefern können – und transparent sein, wenn etwas nicht übernommen wird.

Typische Auslöser: Behandlungskosten, Hilfsmittel-Bedarf, Ablehnung eines Antrags, Pflegeleistungen.

**Intention 5: Langzeit-Management** → Autonomie & Stabilität "Wie lebe ich damit?"

Der Nutzer hat eine chronische Erkrankung oder dauerhafte Einschränkung und braucht Unterstützung im Alltag. Er braucht keine einmalige Antwort, sondern kontinuierliche Begleitung. Das System muss Routinen unterstützen, motivieren und bei Rückschlägen auffangen.

Typische Auslöser: Chronische Erkrankungen, langfristige Pflege-Situationen, Rehabilitation.

**Intention 6: Angehörigen-Sorge** → Verantwortung & Fürsorge "Wie helfe ich meinem Angehörigen?"

Der Nutzer fragt nicht für sich selbst, sondern für jemand anderen – Kind, Elternteil, Partner. Er braucht Informationen, die auf die Situation des Angehörigen zugeschnitten sind, aber auch Unterstützung für sich selbst. Das System muss beide Perspektiven bedienen.

Typische Auslöser: Pflegebedürftigkeit eines Elternteils, Erkrankung eines Kindes, Überlastung als pflegende Person.

**Intention 7: Präventive Vorsorge** → Selbstverwirklichung "Wie bleibe ich gesund?"

Der Nutzer ist aktuell gesund und will es bleiben. Er ist motiviert, aber braucht Orientierung und konkrete Angebote. Das System muss individuell passende Vorsorgeleistungen und Gesundheitsangebote empfehlen.

Typische Auslöser: Vorsorgeuntersuchungen, Gesundheitskurse, Lebensstiländerung, familiäre Vorbelastung.

Intentionen in der Praxis: Was das für die Umsetzung bedeutet

Drei Aspekte sind für die Implementierung entscheidend:

**Intentionen sind nicht exklusiv.** Eine Anfrage kann mehrere Intentionen enthalten. "Meine Mutter hat Demenz und ich bin am Ende meiner Kräfte" enthält Angehörigen-Sorge (Intention 6), Behandlungssuche (Intention 3) und möglicherweise akute Sorge um die eigene Belastbarkeit (Intention 1). Das System muss die dominante Intention erkennen und die sekundären mitbedienen.

**Intentionen verändern sich im Gespräch.** Ein Nutzer startet mit Leistungsklärung ("Zahlt die AOK Physiotherapie?"), die Rückfrage offenbart eine frische Diagnose ("Mein Arzt hat gesagt, ich brauche eine neue Hüfte"). Das System muss Intentionswechsel erkennen und die Kommunikationsstrategie anpassen.

**Nicht jeder Assistent muss alle Intentionen bedienen.** Ein Pflege-Assistent wird vor allem die Intentionen 4 (Leistungsklärung), 5 (Langzeit-Management) und 6 (Angehörigen-Sorge) abdecken. Ein Schwangerschaftsbegleiter bedient primär die Intentionen 2 (frische "Diagnose" Schwangerschaft), 5 (Begleitung über 9 Monate) und 7 (Vorsorge). Das Intentionsmodell ist das Gesamtbild; jedes Teilprojekt definiert seinen Ausschnitt.

--------------------------------------------------------------------------------

3. Ebene 2 – Kommunikations-Layer: Wie antwortet das System?

Der Grundgedanke

Die Intentionserkennung weiß, was der Nutzer braucht. Aber das allein reicht nicht. Die gleiche Information muss je nach Situation, Person und Kanal unterschiedlich aufbereitet werden. Dafür sorgen drei aufeinander aufbauende Layer.

**Wichtiges Prinzip:** Die Layer überschreiben sich nicht. Sie verfeinern das Ergebnis Schritt für Schritt. Layer 1 setzt Grenzen, die nie verletzt werden. Layer 2 bestimmt den Inhalt. Layer 3 passt die Übermittlung an.

Layer 1: Unternehmenslayer – Das nicht verhandelbare Fundament

Layer 1 ist kein Layer wie die anderen. Er ist das Gate, durch das jede Antwort hindurch muss, bevor sie überhaupt zu Layer 2 und 3 gelangt. Wenn eine Antwort Layer 1 nicht besteht, wird sie nicht gegeben – unabhängig davon, wie gut die Intention erkannt wurde oder wie passend das Format wäre.

Layer 1 hat zwei Seiten: harte Constraints und eine Kommunikationshaltung.

**Die harten Constraints** sind binär – erfüllt oder nicht erfüllt. Es gibt keinen Spielraum.

| Constraint                   | Bedeutung                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Fachlich & rechtlich korrekt | Medizinische, versicherungstechnische und rechtliche Aussagen müssen stimmen. Konformität mit SGB, Satzung und geltenden Regelungen. |
| Vertraulich & sicher         | Schutz aller persönlichen und medizinischen Daten. Keine ungesicherte Weitergabe.                                                    |
| Standardisiert               | Konsistente, wiederholbare Basis-Aussagen. Die gleiche Faktenfrage führt immer zur gleichen Faktenantwort.                           |

**Die Kommunikationshaltung** ist kein starres Regelwerk, sondern ein Prinzipien-Kompass. Sie definiert, *wie* das System grundsätzlich kommuniziert.

Das Kernprinzip heißt: **Transparent mit Empfehlung.** Das bedeutet zwei Dinge gleichzeitig: Das System zeigt Alternativen auf (Transparenz – der Nutzer sieht seine Optionen) und gibt eine klare Einordnung (Entlastung – der Nutzer muss nicht selbst recherchieren, was am besten passt). Es nimmt dem Nutzer aber keine Entscheidungen ab.

Beispiel: "Für Ihre Situation gibt es drei Möglichkeiten. ✓ Empfehlung: Stationäre Reha (passt am besten). Option B: Ambulante Reha (möglich). Option C: Gemischte Form (möglich)."

Diese Haltung vereint Transparenz (Alternativen zeigen) und Entlastung (Orientierung geben). Sie gilt für jede Antwort, in jedem Themenbereich, für jeden Nutzer.

**Warum Layer 1 so zentral ist:** Im regulierten Umfeld einer Krankenkasse ist Layer 1 nicht nur ein Design-Prinzip, sondern eine Compliance-Anforderung. Layer 2 und 3 personalisieren die Kommunikation – aber diese Personalisierung darf nie die Grundregeln verletzen. Layer 1 ist die sichere Basis, auf der alle weitere Individualisierung stattfindet.

Layer 2: Intentionslayer – Was wird kommuniziert?

Dieser Layer übersetzt die erkannte Intention in konkrete Antwort-Parameter. Er ist das Herzstück der personalisierten Kommunikation und steuert drei Dimensionen:

**Tonalität** – die emotionale Richtung der Antwort. Wird von der Intention bestimmt, nicht vom Format oder Kanal.

**Informationstiefe** – wie viel Kontext muss rüber? Von minimal (nur Handlungsanweisung) bis hoch (voller Überblick mit Details).

**Proaktivität** – wie aktiv denkt das System voraus? Von reaktiv (antwortet nur auf die Frage) bis proaktiv (antizipiert Folgefragen und bietet Struktur).

Jede Intention hat ein charakteristisches Profil über diese drei Dimensionen:

| Intention              | Tonalität                    | Informationstiefe        | Proaktivität   |
| ---------------------- | ---------------------------- | ------------------------ | -------------- |
| 1. Akute Sorge         | Beruhigend, empathisch       | Minimal                  | Hoch           |
| 2. Frische Diagnose    | Strukturiert, sachlich-warm  | Mittel-hoch              | Mittel         |
| 3. Behandlungssuche    | Sachlich, kompetent          | Hoch                     | Mittel         |
| 4. Leistungsklärung    | Direkt, klar                 | Niedrig                  | Niedrig-mittel |
| 5. Langzeit-Management | Partnerschaftlich            | Anpassbar (Nutzer wählt) | Gering         |
| 6. Angehörigen-Sorge   | Unterstützend, wertschätzend | Mittel                   | Hoch           |
| 7. Präventive Vorsorge | Motivierend, einladend       | Mittel                   | Mittel-hoch    |

Diese Zuordnung ist kein starres Schema. Sie beschreibt die Grundtendenz – im konkreten Gespräch kann das System die Parameter dynamisch anpassen, wenn sich die Intention verschiebt oder die Situation es erfordert.

Layer 3: Kommunikationslayer – Wie wird übermittelt?

Layer 2 hat bestimmt, *was* gesagt wird. Layer 3 entscheidet, *wie* es beim individuellen Nutzer im aktuellen Moment ankommt. Er ist der letzte Filter vor der Zustellung und passt die Antwort an drei Dimensionen an – in dieser Prioritätsreihenfolge:

**1. Kognitive Kapazität (Der "Gatekeeper"):** Wie aufnahmefähig ist der Nutzer gerade? Wenn jemand in Panik ist, kommt selbst die beste Nachricht nicht an. Diese Dimension hat Vorrang vor allen anderen.

| Kapazität                 | System-Reaktion                                                |
| ------------------------- | -------------------------------------------------------------- |
| Niedrig (Stress, Krise)   | Radikal kürzen. Ein-Satz-Antworten. Handlungsoption im Fokus.  |
| Mittel (Belastet)         | Portionieren. Wichtigstes zuerst. Expand-Optionen für Details. |
| Hoch (Routine, Entspannt) | Vollständige Information. Details und Hintergründe möglich.    |

**2. Format (Der "Wahrnehmungs-Entscheider"):** Bestimmt, ob die Information überhaupt wahrgenommen wird.

| Format                    | System-Reaktion                                               |
| ------------------------- | ------------------------------------------------------------- |
| Quick-Scan (Mobil, Eilig) | Kürzestformat, klickbare Aktionen. Keine Textblöcke.          |
| Deep-Dive (Desktop, Zeit) | Ausführlich, mit Kontext, Grafiken und weiterführenden Links. |

**3. Sprachregister (Das "Feintuning"):** Bestimmt Verständnis und Vertrauen.

| Register           | System-Reaktion                                                           |
| ------------------ | ------------------------------------------------------------------------- |
| Einfach (Laie)     | Alltagssprache, kurze Sätze. Fachbegriffe vermeiden oder sofort erklären. |
| Fachlich (Experte) | Präzise Terminologie. Fachsprache ohne Erklärung.                         |

Die Abgrenzung zwischen Layer 2 und Layer 3

Diese Unterscheidung ist entscheidend, weil sie oft verwechselt wird. Layer 2 trifft *inhaltliche* Entscheidungen, Layer 3 trifft *Delivery*-Entscheidungen.

| Layer 2: Was & Warum (Inhalt)                   | Layer 3: Wie & Wo (Delivery)                         |
| ----------------------------------------------- | ---------------------------------------------------- |
| Tonalität: Emotionale Richtung ("beruhigend")   | Sprachregister: Konkrete Wortwahl (einfach/fachlich) |
| Informationstiefe: Wie viel Kontext muss rüber? | Kapazität: Wie viel kann gerade ankommen?            |
| Proaktivität: Ob vorausgedacht wird             | Format: Wie es dargestellt wird                      |

**Das Kernprinzip:** Die Informationstiefe bleibt hoch (Layer 2), aber das Format portioniert sie (Layer 3), um die aktuelle Kapazität nicht zu überfordern.

Ein Beispiel: Die Intention "Orientierung & Kontrolle" (Layer 2) sagt: Diese Person braucht viel Information, um sich sicher zu fühlen. Der Kommunikationslayer (Layer 3) erkennt: Diese Person ist gestresst und mobil unterwegs. Die Lösung: Erst das Wichtigste in kurzen Sätzen und einfacher Sprache. Dann ein Button "Mehr Details anzeigen", der die volle Informationstiefe nachladen lässt.

--------------------------------------------------------------------------------

4. Ebene 3 – Context Engineering: Worauf greift das System zu?

Der Grundgedanke

Intentionen und Kommunikations-Layer beschreiben, wie das System denken und kommunizieren soll. Aber keines von beidem funktioniert ohne eine solide Grundlage: das Wissen, auf das das System zugreift.

Context Engineering ist die systematische Aufbereitung aller Informationen, die ein AI-System braucht, um verlässlich zu arbeiten. Es geht nicht um bessere Prompts. Es geht darum, was das System *weiß*, bevor eine Frage überhaupt gestellt wird.

Warum reicht "guter Content" nicht?

Die AOK hat Informationen in vielen Systemen: Website, Leistungskatalog, Formulare, interne Datenbanken, Rechner und Tools. Aber diese Informationen sind für Menschen aufbereitet, nicht für AI-Systeme.

Ein menschlicher Berater weiß implizit:

- dass "Pflegegeld" je nach Kontext den Anspruch, den Betrag oder den Antragsprozess meint
- dass Pflegegeld und Sachleistung kombinierbar sind, auch wenn sie auf verschiedenen Seiten beschrieben werden
- dass die Beträge sich bei Gesetzesänderungen ändern und welche Werte aktuell gelten
- dass er keine Einzelfall-Zusagen machen darf, sondern an den Medizinischen Dienst verweisen muss
- dass ein Angehöriger andere Informationen braucht als die pflegebedürftige Person selbst

Dieses implizite Wissen muss für ein AI-System explizit gemacht werden. Das ist Context Engineering.

Die fünf Kontextdimensionen

Jede Information, die das System nutzt, braucht fünf Arten von Kontext. Jede fehlende Dimension erzeugt eine spezifische Art von Fehler.

**Dimension 1: Bedeutungskontext** – Was ist das inhaltlich?

Eindeutige Definitionen, konsistente Taxonomien, Abgrenzungen zwischen verwandten Begriffen, Übersetzung zwischen Fach- und Alltagssprache. Ohne Bedeutungskontext gibt das System generische oder widersprüchliche Antworten.

Beispiel: "Verhinderungspflege" wird auf der AOK-Website einmal als eigenständige Leistung beschrieben, einmal als Teil einer Aufzählung, einmal im Kontext "Pflegeperson fällt aus". Drei Seiten, drei Perspektiven, keine explizite Verbindung.

**Dimension 2: Strukturkontext** – Wie hängt es zusammen?

Relationen zwischen Informationen: was setzt was voraus, was ist kombinierbar, was ist eine Alternative, was gehört zu welcher Kategorie. Ohne Strukturkontext liefert das System isolierte Teilantworten ohne Gesamtbild.

Beispiel: Pflegegeld und Sachleistung werden prozentual verrechnet über die Kombinationsleistung. Diese Information steht auf einer dritten Seite. Wer nach Pflegegeld fragt, bekommt sie nicht mitgeliefert.

**Dimension 3: Qualitätskontext** – Kann ich mich darauf verlassen?

Aktualität, Validierungsstatus, Volatilität (wie oft ändert sich das?), Quellenpriorisierung bei Widersprüchen. Ohne Qualitätskontext behandelt das System alle Informationen gleich – veraltete Beträge genauso wie geprüfte Fakten.

Beispiel: Pflegegeld-Beträge ändern sich bei Gesetzesänderungen. Allgemeine Definitionen ("Was ist Pflegegeld?") bleiben stabil. Beides steht auf derselben Seite, ohne Kennzeichnung der unterschiedlichen Haltbarkeit.

**Dimension 4: Regelkontext** – Was darf das System damit tun?

Haftungsgrenzen, Eskalationsregeln, Compliance-Vorgaben, Tonalitätsregeln. Ohne Regelkontext überschreitet das System Grenzen, die ein menschlicher Berater intuitiv kennt.

Beispiel: Der Assistent darf allgemeine Informationen über Pflegeleistungen geben, aber nicht beurteilen, ob eine konkrete Person Anspruch auf einen bestimmten Pflegegrad hat. Auf der Website steht diese Grenze nirgendwo.

**Dimension 5: Zielgruppenkontext** – Für wen ist das relevant?

Zielgruppen-Tags, Kontext-Marker (Pflegegrad, Trimester, Altersgruppe), Relevanz-Indikatoren. Ohne Zielgruppenkontext gibt das System jedem die gleiche Antwort, unabhängig von seiner Situation.

Beispiel: Auf die Frage "Was steht meiner Mutter zu?" muss das System Informationen für pflegebedürftige Personen und zugleich für Angehörige liefern – eine andere Zusammenstellung als bei "Was steht mir zu?".

Kontextquellen: Nicht nur Content

Die fünf Dimensionen beschreiben, wie einzelne Informationen aufbereitet werden. Aber ein Assistent braucht mehr als aufbereiteten Text. Er braucht verschiedene Arten von Kontextquellen:

**Kontextquelle 1: Wissensbausteine (Content)**

Aufbereitete, strukturierte Informationseinheiten mit vollständigen Metadaten. Das ist der Kern der Content-to-Context-Methodik: Website-Content wird in atomare Bausteine zerlegt, konsolidiert und mit allen fünf Kontextdimensionen angereichert.

Beispiele: Leistungsbeschreibungen, Faktenwissen, Empfehlungen, Prozessbeschreibungen, Warnhinweise.

Eigenschaften: Statisch bis mittel-volatil. Werden redaktionell gepflegt. Bilden das Grundwissen des Systems.

**Kontextquelle 2: Tools und Rechner (Funktionalität)**

Anwendungen, die dem System ermöglichen, über reine Informationswiedergabe hinauszugehen. Der Assistent *weiß* nicht nur, was Pflegegeld ist – er kann den konkreten Betrag berechnen oder einen Pflegestützpunkt in der Nähe finden.

Beispiele: Pflegegradrechner, SSW-Rechner, Leistungsrechner, Anbieter- und Beratersuche, Antragsgeneratoren.

Eigenschaften: Benötigen Nutzereingaben. Liefern individuelle Ergebnisse. Müssen als verfügbare Aktionen im System hinterlegt sein.

**Kontextquelle 3: Echtzeit-Daten (Aktualität)**

Informationen, die sich häufig ändern und zum Zeitpunkt der Anfrage aktuell sein müssen. Hier reicht eine statische Wissensbasis nicht – das System braucht Zugriff auf Live-Datenquellen.

Beispiele: Verfügbarkeiten von Beratern, aktuelle Veranstaltungen und Kurse, Bearbeitungsstatus von Anträgen, Öffnungszeiten von Geschäftsstellen.

Eigenschaften: Hochvolatil. Erfordern API-Anbindungen. Können nicht in der Wissensbasis vorgehalten werden.

**Kontextquelle 4: Nutzerprofil (Personalisierung)**

Informationen über den konkreten Nutzer, die eine individuelle Antwort ermöglichen. Je mehr das System über die Person weiß, desto relevanter wird die Antwort – aber auch desto sensibler wird der Umgang.

Beispiele: Versichertenstatus, Alter, bestehende Erkrankungen (wenn freigegeben), laufende Anträge, bisherige Interaktionen.

Eigenschaften: Hochsensibel (Datenschutz). Erfordern Authentifizierung. Ermöglichen den Sprung von allgemeiner Information zu individueller Beratung.

Wie Kontextquellen und Kontextdimensionen zusammenspielen

Jede Kontextquelle muss mit den fünf Dimensionen angereichert werden – aber die Schwerpunkte unterscheiden sich:

| Kontextquelle     | Kritische Dimensionen         | Warum?                                                      |
| ----------------- | ----------------------------- | ----------------------------------------------------------- |
| Wissensbausteine  | Bedeutung, Struktur, Qualität | Müssen eindeutig, verknüpft und aktuell sein                |
| Tools und Rechner | Regeln, Zielgruppe            | Müssen wissen, was sie dürfen und für wen sie relevant sind |
| Echtzeit-Daten    | Qualität                      | Müssen zuverlässig und aktuell sein                         |
| Nutzerprofil      | Regeln, Qualität              | Datenschutz und Datenaktualität sind entscheidend           |

--------------------------------------------------------------------------------

Context Engineering und die Kommunikations-Layer: Wer liefert was?

Die drei Ebenen der Architektur (Intention, Layer, Context) sind voneinander getrennt, aber sie verzahnen sich an konkreten Stellen. Diese Verzahnung zu verstehen ist wichtig, weil sie bestimmt, wo welche Information gepflegt wird.

**Regelkontext und Layer 1 arbeiten zusammen.**

Layer 1 definiert die Grundhaltung: "Keine Einzelfall-Zusagen", "Transparent mit Empfehlung". Der Regelkontext in den Wissensbausteinen setzt das pro Thema um: "Dieser Baustein enthält allgemeine Leistungsinformation. Haftungshinweis: Individueller Anspruch abhängig von Begutachtung." Die Grundregel lebt im System-Prompt (Layer 1), die themenspezifische Ausprägung lebt im Baustein (Regelkontext).

**Zielgruppenkontext und Layer 2/3 teilen sich die Arbeit.**

Der Zielgruppenkontext im Baustein ist statisch: "Dieser Baustein ist relevant für Angehörige, Pflegegrade 2–5." Layer 2 nutzt diese Information zusammen mit der erkannten Intention, um die Inhaltsstrategie zu bestimmen. Layer 3 passt auf Basis der Echtzeit-Signale des Nutzers (Stress, Format, Sprachregister) die Delivery an. Die statische Zielgruppen-Info kommt aus dem Kontext, die dynamische Anpassung aus den Layern.

**Bedeutungs- und Strukturkontext arbeiten** **vor** **den Layern.**

Die Taxonomie, die Relationen zwischen Bausteinen und die Retrieval-Logik sorgen dafür, dass die richtigen Bausteine überhaupt gefunden werden. Das passiert, bevor die Kommunikations-Layer greifen. Wenn das Retrieval den Baustein "Kombinationsleistung" nicht mitliefert, kann Layer 2 ihn nicht proaktiv erwähnen – egal wie gut die Intentionserkennung ist.

--------------------------------------------------------------------------------

5. Die Blaupause: Template für jedes Teilprojekt

Jeder neue Assistent oder Themenbereich durchläuft die gleiche Planungsphase. Das folgende Template stellt sicher, dass keine Dimension vergessen wird.

5.1 Scope und Intentionsprofil

**Leitfrage:** Welchen Ausschnitt der 7 Kern-Intentionen deckt dieser Assistent ab?

| Feld                  | Beschreibung                                                   |
| --------------------- | -------------------------------------------------------------- |
| Arbeitsname           | Wie heißt das Teilprojekt?                                     |
| Themenbereich         | Welcher Bereich der AOK wird abgedeckt?                        |
| Primär-Intentionen    | Welche 2–3 Intentionen stehen im Fokus?                        |
| Sekundär-Intentionen  | Welche Intentionen kommen ergänzend vor?                       |
| Nicht im Scope        | Welche Intentionen werden bewusst nicht bedient?               |
| Typische Nutzerfragen | 10–15 exemplarische Fragen, die der Assistent beantworten soll |

5.2 Kontextquellen-Inventar

**Leitfrage:** Welche Informationen und Funktionalitäten braucht der Assistent?

Für jede Kontextquelle prüfen:

**Wissensbausteine (Content):**

| Feld                | Beschreibung                                                             |
| ------------------- | ------------------------------------------------------------------------ |
| Quell-Content       | Welche Website-Bereiche, Dokumente, Datenbanken?                         |
| Umfang              | Wie viele Seiten/Artikel/Einträge?                                       |
| Content-Typ         | Redaktionell, Leistungsbeschreibung, FAQ, Prozess?                       |
| Aufbereitungsbedarf | Hoch (Fließtext extrahieren) / Mittel / Niedrig (schon strukturiert)     |
| Methodik            | Verweis auf Content-to-Context-Pipeline oder andere Aufbereitungsmethode |

**Tools und Rechner:**

| Feld             | Beschreibung                                                             |
| ---------------- | ------------------------------------------------------------------------ |
| Verfügbare Tools | Was gibt es bereits? (Rechner, Finder, Formulare)                        |
| Fehlende Tools   | Was müsste entwickelt werden?                                            |
| Integration      | Wie greift der Assistent auf das Tool zu? (API, Verlinkung, eingebettet) |

**Echtzeit-Daten:**

| Feld                 | Beschreibung                                                 |
| -------------------- | ------------------------------------------------------------ |
| Benötigte Live-Daten | Was muss zum Zeitpunkt der Anfrage aktuell sein?             |
| Datenquelle          | Woher kommt die Information? (Internes System, API, manuell) |
| Fallback             | Was passiert, wenn die Live-Daten nicht verfügbar sind?      |

**Nutzerprofil:**

| Feld                  | Beschreibung                                                   |
| --------------------- | -------------------------------------------------------------- |
| Benötigte Nutzerdaten | Welche Informationen über den Nutzer verbessern die Antwort?   |
| Authentifizierung     | Muss der Nutzer eingeloggt sein?                               |
| Datenschutz           | Welche Daten dürfen verwendet werden? Einwilligung nötig?      |
| Ohne Profil           | Was kann der Assistent auch ohne Nutzeridentifikation leisten? |

5.3 Kontextdimensionen-Check

**Leitfrage:** Sind alle fünf Dimensionen für die Wissensbausteine definiert?

| Dimension  | Zu klären                                                                  | Wer klärt das?                |
| ---------- | -------------------------------------------------------------------------- | ----------------------------- |
| Bedeutung  | Taxonomie erstellt? Begriffe definiert? Synonyme gemappt?                  | Fachredaktion + Projektteam   |
| Struktur   | Relationen definiert? Hierarchien klar? Querverbindungen erfasst?          | Projektteam                   |
| Qualität   | Aktualitätsstatus bekannt? Volatilität bewertet? Prüfintervalle definiert? | Fachredaktion                 |
| Regeln     | Haftungsgrenzen definiert? Eskalationsregeln klar? Compliance geprüft?     | Rechtsabteilung + Fachbereich |
| Zielgruppe | Zielgruppen identifiziert? Kontext-Tags definiert? Sprachebenen klar?      | UX + Fachbereich              |

5.4 Kommunikations-Layer-Konfiguration

**Leitfrage:** Wie wird der Assistent für diesen Themenbereich konfiguriert?

**Layer 1 – Leitplanken:**

| Feld                  | Beschreibung                                   |
| --------------------- | ---------------------------------------------- |
| Harte Constraints     | Welche Aussagen darf der Assistent nie machen? |
| Eskalationspfade      | Wann und wohin verweist er an Menschen?        |
| Haftungshinweise      | Welche Disclaimer müssen erscheinen?           |
| Kommunikationshaltung | Besonderheiten gegenüber der Standardhaltung?  |

**Layer 2 – Inhaltsstrategie pro Intention:**

Für jede Primär-Intention des Assistenten definieren:

| Feld              | Beschreibung                              |
| ----------------- | ----------------------------------------- |
| Tonalität         | Empathisch / Sachlich / Motivierend / ... |
| Informationstiefe | Minimal / Mittel / Hoch                   |
| Proaktivität      | Reaktiv / Ergänzend / Antizipierend       |

**Layer 3 – Delivery-Einstellungen:**

| Feld                 | Beschreibung                                      |
| -------------------- | ------------------------------------------------- |
| Unterstützte Formate | Mobil, Desktop, Chat, Sprache?                    |
| Sprachregister       | Alltagssprache als Default? Fachsprache optional? |
| Kapazitäts-Erkennung | Wie erkennt das System Stress/Eile?               |

5.5 Aufwand und Abhängigkeiten

| Feld                 | Beschreibung                                       |
| -------------------- | -------------------------------------------------- |
| Content-Aufbereitung | Geschätzter Aufwand für die Wissensbasis           |
| Tool-Entwicklung     | Geschätzter Aufwand für Tools/Integrationen        |
| AOK-Aufwand          | QS, Regelkontext-Definition, Fachredaktions-Review |
| Abhängigkeiten       | Was muss zuerst fertig sein?                       |
| Risiken              | Was könnte die Umsetzung verzögern oder verteuern? |

--------------------------------------------------------------------------------

6. Anwendungsbeispiel: Pflege-Assistent

Das folgende Beispiel zeigt die Blaupause im Einsatz für einen konkreten Themenbereich.

6.1 Scope und Intentionsprofil

| Feld                  | Pflege-Assistent                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arbeitsname           | Pflege-Assistent AOK Sachsen-Anhalt                                                                                                                                                                                                                                                                                                                                                                       |
| Themenbereich         | Pflegeleistungen, Pflegebedürftigkeit, häusliche und stationäre Pflege                                                                                                                                                                                                                                                                                                                                    |
| Primär-Intentionen    | Leistungsklärung (I4), Angehörigen-Sorge (I6), Langzeit-Management (I5)                                                                                                                                                                                                                                                                                                                                   |
| Sekundär-Intentionen  | Frische Diagnose (I2, bei neuem Pflegegrad), Behandlungssuche (I3, Pflegedienst finden)                                                                                                                                                                                                                                                                                                                   |
| Nicht im Scope        | Akute Sorge (I1, kein medizinischer Notfall-Triage), Präventive Vorsorge (I7)                                                                                                                                                                                                                                                                                                                             |
| Typische Nutzerfragen | "Was steht meiner Mutter mit Pflegegrad 3 zu?" / "Wie beantrage ich einen Pflegegrad?" / "Was kostet ein Pflegeheim?" / "Kann ich Pflegegeld und einen Pflegedienst kombinieren?" / "Ich pflege meinen Vater und bin erschöpft – gibt es Hilfe?" / "Was passiert beim Gutachterbesuch?" / "Meine Mutter braucht Umbaumaßnahmen – zahlt die AOK?" / "Wie finde ich einen guten Pflegedienst in Magdeburg?" |

6.2 Kontextquellen-Inventar

**Wissensbausteine:**

| Feld                | Pflege-Assistent                                                            |
| ------------------- | --------------------------------------------------------------------------- |
| Quell-Content       | deine-gesundheitswelt.de/pflege (~24 Seiten), ggf. interne Dokumente        |
| Content-Typ         | Leistungsbeschreibungen, Prozessbeschreibungen, FAQ                         |
| Aufbereitungsbedarf | Hoch – fragmentiert über viele Unterseiten, Beträge in Accordions versteckt |
| Methodik            | Content-to-Context-Pipeline (siehe Methodik-Dokument v3)                    |

**Tools und Rechner:**

| Tool                    | Status                                    | Integration                              |
| ----------------------- | ----------------------------------------- | ---------------------------------------- |
| Pflegegradrechner       | Zu prüfen: Gibt es diesen bei der AOK?    | Einbettung oder Verlinkung               |
| Pflegestützpunkt-Finder | Zu prüfen                                 | Standortbasierte Suche                   |
| Pflegedienst-Suche      | Zu prüfen: regionale Datenbank vorhanden? | API oder Verlinkung                      |
| Antrags-Assistent       | Noch nicht vorhanden                      | Perspektivisch: geführter Antragsprozess |

**Echtzeit-Daten:**

| Daten                           | Quelle             | Fallback                                 |
| ------------------------------- | ------------------ | ---------------------------------------- |
| Beratungstermin-Verfügbarkeit   | AOK-Buchungssystem | "Rufen Sie für einen Termin an unter..." |
| Pflegestützpunkt-Öffnungszeiten | AOK-Datenbank      | Standardöffnungszeiten aus Wissensbasis  |

**Nutzerprofil:**

| Feld                  | Pflege-Assistent                                                                      |
| --------------------- | ------------------------------------------------------------------------------------- |
| Benötigte Nutzerdaten | Rolle (Pflegebedürftig/Angehöriger), Pflegegrad wenn bekannt, PLZ für regionale Suche |
| Authentifizierung     | Nicht zwingend – Basisinformation auch ohne Login                                     |
| Ohne Profil           | Allgemeine Leistungsinformationen, generische Prozessbeschreibungen                   |

6.3 Kontextdimensionen-Check

| Dimension  | Status / Nächster Schritt                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Bedeutung  | Taxonomie muss erstellt werden (Teil der Content-to-Context-Pipeline, Schritt 3)                |
| Struktur   | Relationen zwischen Pflegeleistungen definieren (Kombinierbarkeit, Voraussetzungen)             |
| Qualität   | Beträge als hochvolatil markieren, Prüfintervall: bei Gesetzesänderung. Alles andere: jährlich  |
| Regeln     | Klären mit AOK: Darf der Assistent Pflegegrad-Einschätzungen geben? Haftungsgrenze definieren   |
| Zielgruppe | Primär: Angehörige (häufigste Nutzergruppe im Pflegebereich). Sekundär: Pflegebedürftige selbst |

6.4 Kommunikations-Layer

**Layer 1 – Leitplanken Pflege:**

| Feld              | Pflege-Assistent                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Harte Constraints | Keine Pflegegrad-Zusagen. Keine Empfehlung einzelner Pflegedienste ohne Qualitätsbasis. Keine medizinischen Diagnosen. |
| Eskalation        | Bei Einzelfall-Fragen → Pflegeberatung AOK. Bei Widerspruch → Fachabteilung. Bei akuter Krise → Krisentelefon.         |
| Haftungshinweis   | "Allgemeine Leistungsinformation. Individueller Anspruch wird durch den Medizinischen Dienst festgestellt."            |

**Layer 2 – Inhaltsstrategie:**

| Intention                | Tonalität                    | Tiefe                                | Proaktivität                                |
| ------------------------ | ---------------------------- | ------------------------------------ | ------------------------------------------- |
| Leistungsklärung (I4)    | Direkt, klar                 | Niedrig: Präzise Fakten + Beträge    | Niedrig-mittel: Verwandte Leistungen nennen |
| Angehörigen-Sorge (I6)   | Unterstützend, wertschätzend | Mittel: Überblick + nächste Schritte | Hoch: Entlastungsangebote proaktiv          |
| Langzeit-Management (I5) | Partnerschaftlich            | An Situation angepasst               | Gering: Nutzer steuert selbst               |

6.5 Aufwand und Abhängigkeiten

| Feld                 | Pflege-Assistent                                                                     |
| -------------------- | ------------------------------------------------------------------------------------ |
| Content-Aufbereitung | 32-58h (queonext/loschke.ai), 12-22h (AOK) – siehe Methodik-Dokument                 |
| Tool-Entwicklung     | Abhängig von Bestandsaufnahme vorhandener AOK-Tools                                  |
| AOK-Aufwand          | QS der Wissensbausteine + Definition Regelkontext + Freigabe                         |
| Abhängigkeiten       | Regelkontext-Definition muss vor Content-Aufbereitung abgeschlossen sein             |
| Risiken              | Accordion-Content nicht crawlbar, AOK-QS-Kapazität, Betragsänderungen während Aufbau |

--------------------------------------------------------------------------------

7. Von der Vision zur Umsetzung

Die Vision

Ein System aus spezialisierten Assistenten, die zusammen das gesamte Spektrum an Gesundheitsfragen der AOK-Versicherten abdecken. Jeder Assistent hat sein Themengebiet, sein Intentionsprofil und seine eigene Wissensbasis – aber alle teilen die gleiche Architektur, die gleichen Kommunikations-Layer und die gleichen Qualitätsstandards.

Der pragmatische Weg

Die Vision wird nicht als Gesamtsystem gebaut, sondern Themenbereich für Themenbereich. Jeder Teilbereich durchläuft die Blaupause aus Kapitel 5 und wird als eigenständiger Prototyp umgesetzt und getestet, bevor der nächste beginnt.

**Aktuell in Arbeit:**

Pflege und Schwangerschaft als erste Themencluster. Die Content-to-Context-Methodik ist dokumentiert. Die Intentionen und Kommunikations-Layer sind konzeptionell erarbeitet. Nächster Schritt ist die operative Umsetzung der Content-Transformation und der Aufbau eines ersten Prototyps.

**Was pro Teilprojekt entsteht:**

Für jeden Themenbereich gibt es am Ende drei Ergebnisse: eine aufbereitete Wissensbasis (Context Cluster), eine konfigurierte Kommunikationslogik (Layer-Einstellungen) und ein definiertes Intentionsprofil. Zusammen ergeben sie einen funktionsfähigen Assistenten für diesen Bereich.

**Was übergreifend wächst:**

Mit jedem Teilprojekt wächst das Gesamtsystem. Querschnitts-Wissen (z.B. allgemeine AOK-Leistungen, Geschäftsstellen-Informationen, Antragsverfahren) wird einmal aufbereitet und von allen Assistenten genutzt. Die Blaupause selbst wird mit jeder Anwendung geschärft.

Reihenfolge und Priorisierung

Die Auswahl der nächsten Themenbereiche sollte nach drei Kriterien erfolgen:

**Nutzerbedarf:** Wo entstehen die meisten Anfragen? Wo ist die Frustration am größten?

**Machbarkeit:** Wo ist der Content-Aufwand vertretbar? Wo gibt es bereits strukturierte Daten?

**Lerneffekt:** Wo entstehen die meisten Erkenntnisse für Folgeprojekte?

Die genaue Priorisierung ist eine gemeinsame Entscheidung mit der AOK.

--------------------------------------------------------------------------------

*Dokument erstellt: Februar 2025* *Teil von: Mission SAVA – AI-Assistenten AOK Sachsen-Anhalt* *Verwandte Dokumente: Content-to-Context-Methodik (v3), Kommunikationsarchitektur (Layer-Modell), Intent-Taxonomie*
