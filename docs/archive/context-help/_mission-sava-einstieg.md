Mission SAVA – Das Einstiegsdokument

**Warum AI-Assistenten für eine Krankenkasse mehr brauchen als ein LLM und eine Website**

Version: 0.1 Draft Stand: Februar 2026 Projekt: Mission SAVA – AI-Assistenten AOK Sachsen-Anhalt Autoren: queonext / loschke.ai

--------------------------------------------------------------------------------

Bevor es losgeht: Die eine Erkenntnis, die alles trägt

Es gibt einen fundamentalen Unterschied zwischen "ein LLM kann Text generieren" und "ein Assistent kann verlässlich beraten".

ChatGPT kann auf Basis von Internetinhalten plausibel klingende Antworten geben. Aber plausibel ist nicht korrekt. Korrekt ist nicht hilfreich. Und hilfreich ist nicht sicher.

Für eine Krankenkasse, die Menschen in verletzlichen Situationen berät – nach einer Diagnose, in der Pflege eines Angehörigen, während einer Schwangerschaft – reicht plausibel nicht.

Der gesamte Aufwand, den dieses Projekt beschreibt, ist die Differenz zwischen **plausibel** und **verlässlich**.

Was braucht ein AI-Assistent, um diese Differenz zu überbrücken? Vier Dinge.

--------------------------------------------------------------------------------

Die vier Elemente

1 – Der Kompass

*"Wer ist dieser Assistent – und was darf er nicht?"*

Ein Assistent ohne Wertesystem ist wie ein Mitarbeiter am ersten Tag ohne Einarbeitung. Er hat vielleicht Fachwissen, aber er weiß nicht, wie das Haus tickt. Er macht mal Zusagen, mal nicht. Er ist mal übervorsichtig, mal fahrlässig. Nicht aus böser Absicht – sondern weil ihm die Orientierung fehlt.

Der Kompass gibt dem Assistenten eine Haltung. Nicht durch hunderte Einzelregeln, sondern durch Werte und klare, nicht verhandelbare Grenzen.

**Was der Kompass regelt:**

- Harte Grenzen: Keine Diagnosen, keine Leistungszusagen, keine Täuschung über die eigene Natur als AI-System
- Kernwerte: Fachliche Korrektheit, Ehrlichkeit, echte Hilfsbereitschaft (nicht übervorsichtige Nichtssagerei)
- Entscheidungslogik in Grenzfällen: "Wie würde eine erfahrene, kompetente AOK-Beraterin reagieren?"
- Autoritätshierarchie: Gesetz > AOK > Fachredaktion > Nutzerwunsch

**Warum das nicht trivial ist:**

Ohne Kompass halluziniert ein LLM nicht nur Fakten – es halluziniert auch Haltung. Die Verfassung löst genau das: Sie gibt dem System eine stabile Identität, die auch in Situationen trägt, die niemand vorhergesehen hat.

→ *Detail-Dokument:* [Assistent-Verfassung](https://notebooklm.google.com/_aok-assistent-verfassung.md)

--------------------------------------------------------------------------------

2 – Der Sensor

*"Was braucht dieser Mensch gerade?"*

Eine gute Beraterin hört nicht nur die Frage, sie hört, was dahintersteckt. "Zahlt die AOK einen Pflegedienst?" kann Pragmatismus sein – ich will Zahlen. Es kann aber auch Überforderung sein – meine Mutter wird pflegebedürftig und ich weiß nicht weiter.

Dieselbe Frage, zwei völlig unterschiedliche Bedürfnisse, zwei unterschiedliche Antworten.

Der Sensor erkennt das Bedürfnis hinter der Frage. Nicht perfekt – aber systematisch genug, um die Antwort am richtigen Punkt anzusetzen.

**Was der Sensor regelt:**

- 7 Kernintentionen im Gesundheitswesen: Von akuter Sorge ("Bin ich krank?") über Leistungsklärung ("Zahlt die AOK das?") bis präventive Vorsorge ("Wie bleibe ich gesund?")
- Das Grundbedürfnis hinter jeder Intention: Sicherheit, Orientierung, Effizienz, Autonomie, Fürsorge
- Die Steuerung von Tonalität und Proaktivität: Wer Angst hat, braucht Beruhigung vor Information. Wer Fakten will, braucht keine emotionale Rahmung.

**Warum das nicht trivial ist:**

Ohne Sensor antwortet das System technisch korrekt, aber am Menschen vorbei. Jemand mit Angst bekommt Paragraphen. Jemand, der schnelle Fakten will, bekommt emotionale Rahmung. Das zerstört Vertrauen – auch wenn die Information stimmt.

→ *Detail-Dokumente:* [SAVA 7 Kernintentionen](https://notebooklm.google.com/_sava-7-kernintentionen.md), Ebene 1 in der [Architektur](https://notebooklm.google.com/_aok-ai-assistent-architektur.md)

--------------------------------------------------------------------------------

3 – Das Gedächtnis

*"Woher weiß der Assistent, was er weiß – und wie verlässlich ist es?"*

Stell dir vor, du setzt einen neuen Mitarbeiter an den Beratungsplatz und sagst: "Lies erstmal unsere Website." Der Mitarbeiter findet Marketingtexte, Teaser, versteckte Accordion-Inhalte, fragmentierte Informationen über dutzende Unterseiten verstreut. Er könnte irgendwann Antworten zusammenbauen – aber sie wären lückenhaft, inkonsistent und ohne Verständnis für Zusammenhänge.

Das Gedächtnis ist die aufbereitete, strukturierte Wissensbasis. Sie entsteht, indem Website-Content systematisch in Wissensbausteine transformiert wird – angereichert mit allem, was ein menschlicher Berater implizit weiß: Zusammenhänge zwischen Leistungen, Gültigkeitszeiträume, Haftungsgrenzen, Zielgruppen.

**Was das Gedächtnis regelt:**

- Die Transformation von Content zu Kontext: Extraktion, Taxonomie, Konsolidierung, Anreicherung mit fünf Kontextdimensionen (Bedeutung, Struktur, Qualität, Regeln, Zielgruppe)
- Speicherung und Retrieval: Von einfachen Markdown-Dateien im Prototyp bis zur Vector-Datenbank im Produktionssystem
- Qualitätssicherung: Was ist geprüft, was ist volatil, was muss bei Gesetzesänderungen aktualisiert werden?

**Warum das nicht trivial ist:**

Hier bricht die "ChatGPT kann das doch"-Annahme konkret. ChatGPT hat keinen Kontext zur AOK Sachsen-Anhalt. Es weiß nicht, dass Pflegegeld und Sachleistung prozentual verrechnet werden, nicht addiert. Es weiß nicht, welche Beträge aktuell gelten. Es weiß nicht, was es nicht weiß. Das Gedächtnis ist der aufwändigste Teil des Systems – und der, der den größten Unterschied macht.

→ *Detail-Dokumente:* [Content-to-Context-Methodik](https://notebooklm.google.com/_aok-content-to-context-methodik.md), [Context Engineering Arbeitshilfe](https://notebooklm.google.com/_context-engineering-arbeitshilfe.md), [Context Storage & Retrieval Architektur](https://notebooklm.google.com/_context-storage-retrieval-architektur.md)

--------------------------------------------------------------------------------

4 – Die Stimme

*"Wie kommt die Antwort beim Menschen an?"*

Du kannst das richtige Wissen haben und das Bedürfnis verstanden haben. Wenn die Antwort dann als Textwand kommt, wenn jemand unter Zeitdruck steht – oder als nüchterner Faktenblock, wenn jemand gerade eine Diagnose verarbeitet – dann hast du trotzdem verloren.

Die Stimme ist das Delivery-System. Sie bestimmt, wie der Assistent klingt, wie tief er geht, wie viel er von sich aus anbietet.

**Was die Stimme regelt:**

- Leitplanken: Was darf überhaupt gesagt werden? Wo muss eskaliert werden?
- Inhaltsstrategie: Wie tief geht die Antwort? Wie proaktiv bietet der Assistent verwandte Informationen an?
- Delivery: Format, Länge, Struktur – angepasst an Situation und Endgerät

**Warum das nicht trivial ist:**

Die Stimme ist das, was der Nutzer erlebt. Alles andere – Kompass, Sensor, Gedächtnis – ist für ihn unsichtbar. Wenn die Stimme nicht stimmt, ist alles andere egal. Eine fachlich perfekte Antwort im falschen Ton ist eine schlechte Antwort.

→ *Detail-Dokument:* Kommunikations-Layer (Ebene 2) in der [Architektur](https://notebooklm.google.com/_aok-ai-assistent-architektur.md)

--------------------------------------------------------------------------------

Wie die vier Elemente zusammenspielen

Die vier Elemente sind nicht gleichartig. Sie haben unterschiedliche Rollen und unterschiedliche Lebenszyklen.

**Kompass und Gedächtnis sind Infrastruktur.** Man baut sie einmal (pro Themencluster beim Gedächtnis, einmal grundsätzlich beim Kompass) und pflegt sie laufend. Sie bestimmen, was der Assistent *kann*.

**Sensor und Stimme sind Laufzeit.** Sie arbeiten in jeder einzelnen Interaktion. Sie bestimmen, was der Assistent in einer konkreten Situation *tut*.

Am Beispiel einer konkreten Anfrage:

*"Meine Mutter braucht einen Pflegedienst. Was zahlt die AOK?"*

1. **Sensor** erkennt: Primär Leistungsklärung ("Was zahlt die AOK?"), sekundär Angehörigen-Sorge ("Meine Mutter"). Das Bedürfnis ist eine Mischung aus Pragmatismus und Fürsorge.
2. **Kompass** prüft: Allgemeine Leistungsinformation ist erlaubt. Keine Einzelfall-Zusage. Haftungshinweis nötig. Empathie angemessen.
3. **Gedächtnis** liefert: Baustein "Pflegesachleistung" mit Beträgen und Pflegegrad-Staffelung. Über Relationen zusätzlich: Kombinationsleistung, Verhinderungspflege, Entlastungsbetrag.
4. **Stimme** formt die Antwort: Tonalität empathisch-sachlich, Format kompakt (Nutzer scheint unter Handlungsdruck), proaktiver Hinweis auf Beratungsangebote.

--------------------------------------------------------------------------------

Navigations-Übersicht: Welches Dokument wofür?

| Element    | Kernfrage                                 | Detail-Dokument(e)                                                                                                                                                                                                                                                                                               |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kompass    | Wer ist der Assistent, was darf er nicht? | [Assistent-Verfassung](https://notebooklm.google.com/_aok-assistent-verfassung.md)                                                                                                                                                                                                                               |
| Sensor     | Was braucht dieser Mensch gerade?         | [SAVA 7 Kernintentionen](https://notebooklm.google.com/_sava-7-kernintentionen.md)                                                                                                                                                                                                                               |
| Gedächtnis | Woher weiß er, was er weiß?               | [Content-to-Context-Methodik](https://notebooklm.google.com/_aok-content-to-context-methodik.md), [Context Engineering Arbeitshilfe](https://notebooklm.google.com/_context-engineering-arbeitshilfe.md), [Context Storage & Retrieval](https://notebooklm.google.com/_context-storage-retrieval-architektur.md) |
| Stimme     | Wie kommt die Antwort an?                 | Kommunikations-Layer in der [Architektur](https://notebooklm.google.com/_aok-ai-assistent-architektur.md)                                                                                                                                                                                                        |
| Gesamtbild | Wie hängt alles zusammen?                 | [Architektur](https://notebooklm.google.com/_aok-ai-assistent-architektur.md)                                                                                                                                                                                                                                    |

--------------------------------------------------------------------------------

Was dieses Dokument nicht ist

Dieses Dokument erklärt das Warum und die Logik. Es ersetzt nicht die operativen Detail-Dokumente. Wer einen Baustein schreiben will, braucht die Arbeitshilfe. Wer einen Haftungshinweis formulieren will, braucht die Verfassung. Wer die Retrieval-Architektur verstehen will, braucht das Storage-Dokument.

Dieses Dokument ist der Einstieg – die Tür, durch die man geht, bevor man sich in den Details verliert.

--------------------------------------------------------------------------------

*Dokument erstellt: Februar 2026* *Teil von: Mission SAVA – AI-Assistenten AOK Sachsen-Anhalt* *Status: Arbeitsdokument – wird angereichert um zielgruppenspezifische Versionen (queo intern, AOK Fachbereiche, Vortrag/Präsentation)*
