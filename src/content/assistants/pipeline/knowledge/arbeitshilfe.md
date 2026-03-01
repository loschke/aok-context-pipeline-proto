Context Engineering: Arbeitshilfe

**Praktischer Leitfaden für die Erarbeitung und Qualitätssicherung von Context Clustern**

Version: 0.2 Draft Stand: Februar 2025 Zielgruppe: Projektteam queonext / loschke.ai Projekt: Mission SAVA – AI-Assistenten AOK Sachsen-Anhalt

--------------------------------------------------------------------------------

Über dieses Dokument

Dieses Dokument ist eine Arbeitshilfe. Es erklärt, wie man guten Kontext erkennt, erstellt und prüft. Es setzt voraus, dass die Gesamtarchitektur (Architektur-Dokument) und die technische Pipeline (Methodik-Dokument) bekannt sind.

**Was dieses Dokument beantwortet:**

- Was unterscheidet einen guten Baustein von einem schlechten?
- Wie baue ich eine Taxonomie auf und woran erkenne ich, dass sie taugt?
- Wie prüfe ich, ob alle fünf Kontextdimensionen abgedeckt sind?
- Welche typischen Fehler passieren und wie vermeide ich sie?

**Was dieses Dokument nicht abdeckt:**

- Technische Schritte (Scraping, Embedding, Vector Store)
- Gesamtarchitektur (Intentionen, Layer-Modell)
- Projektplanung und Aufwandsschätzung

--------------------------------------------------------------------------------

Inhaltsübersicht

1. Was ist ein guter Baustein?
2. Bausteine extrahieren: Vom Quelltext zum Baustein
3. Taxonomie: Ordnung schaffen
4. Die fünf Dimensionen prüfen
5. Relationen: Zusammenhänge explizit machen
6. Typische Fehler und wie man sie erkennt
7. Prompts zum Arbeiten
8. Checklisten

--------------------------------------------------------------------------------

1. Was ist ein guter Baustein?

Ein Context-Baustein ist eine atomare Wissenseinheit: Er beantwortet genau eine Frage vollständig, ohne dass der Leser (oder das LLM) zusätzlichen Kontext braucht.

Die vier Eigenschaften eines guten Bausteins

**Eigenständig:** Der Baustein ist ohne den Quellartikel verständlich. Jemand, der nur diesen Baustein liest, versteht den Sachverhalt vollständig.

**Informationsdicht:** Jeder Satz hat Substanz. Kein Marketing, keine Überleitungen, keine emotionale Rahmung. Was übrig bleibt, sind Fakten, Bedingungen, Handlungsanweisungen.

**Eindeutig typisiert:** Der Baustein hat genau einen Typ (FAKT, LEISTUNG, PROZESS, EMPFEHLUNG, WARNUNG, TIPP, VERWEIS) und der Typ stimmt.

**Vollständig im Kontext:** Die Metadaten sind befüllt – wer braucht das, wann gilt es, wie verlässlich ist es, was darf damit getan werden.

Gut vs. Schlecht: Drei Beispiele

**Beispiel 1: Leistungsinformation**

Schlecht:

```
Die AOK Sachsen-Anhalt unterstützt Sie bei der häuslichen Pflege. 
Pflegegeld erhalten Pflegebedürftige, die zu Hause versorgt werden. 
Die Höhe richtet sich nach dem Pflegegrad. Sprechen Sie uns an – 
wir beraten Sie gerne!
```

Probleme: Marketing-Sprache ("unterstützt Sie"), keine konkreten Beträge, keine Voraussetzungen, kein Antragsprozess, CTA statt Substanz.

Gut:

```
---
typ: LEISTUNG
kategorie: Pflegegeld & Pflegesachleistung
rechtsgrundlage: SGB XI §37
---

# Pflegegeld

Geldleistung der Pflegeversicherung für Pflegebedürftige ab
Pflegegrad 2, die ihre Pflege durch Angehörige oder andere
nicht-professionelle Pflegepersonen organisieren.

## Voraussetzungen

- Anerkannter Pflegegrad 2, 3, 4 oder 5
- Pflege nicht durch professionellen Pflegedienst
- Häusliche Pflege (nicht stationär)

## Leistungsumfang

| Pflegegrad | Betrag/Monat |
|------------|-------------|
| Pflegegrad 2 | 332 € |
| Pflegegrad 3 | 573 € |
| Pflegegrad 4 | 765 € |
| Pflegegrad 5 | 947 € |

Pflegegrad 1: kein Anspruch auf Pflegegeld.
```

Warum gut: Eigenständig (man versteht alles ohne Kontext), informationsdicht (kein Füllwort), eindeutig typisiert (LEISTUNG), alle relevanten Fakten enthalten. Metadaten im Frontmatter, Inhalt als lesbarer Fließtext.

**Beispiel 2: Medizinische Empfehlung**

Schlecht:

```
Viele Schwangere fragen sich, wie sie am besten schlafen können. 
Experten empfehlen die linke Seitenlage. Das ist besonders im 
zweiten und dritten Trimester wichtig.
```

Probleme: Einleitung ohne Substanz ("Viele fragen sich..."), "Experten" ohne Quelle, unvollständig (warum links? Was ist das Risiko bei Rückenlage?).

Gut:

```
---
typ: EMPFEHLUNG
kategorie: Schlaf & Ruhe
zielgruppe:
  - Schwangere
kontext_tags:
  trimester: [2, 3]
---

# Schlafposition in der Schwangerschaft

## Empfehlung

Ab dem 2. Trimester ist die linke Seitenlage die optimale
Schlafposition. Sie fördert die Durchblutung der Plazenta
und entlastet die untere Hohlvene.

## Begründung

In Rückenlage kann das Gewicht des Uterus die untere Hohlvene
komprimieren, was zu Schwindel und reduzierter Blutversorgung
des Kindes führen kann.
```

Warum gut: Keine Einleitung, direkt zur Empfehlung. Begründung vorhanden. Zielgruppe und Zeitrahmen im Frontmatter klar definiert.

**Beispiel 3: Prozessbeschreibung**

Schlecht:

```
Wenn Sie einen Pflegegrad beantragen möchten, wenden Sie sich 
an Ihre Pflegekasse. Ein Gutachter wird Sie dann besuchen.
```

Probleme: Unvollständig (was passiert beim Besuch? Wie lange dauert es? Was muss man vorbereiten?), zu vage.

Gut:

```
---
typ: PROZESS
kategorie: Antrags- & Begutachtungsprozess
rechtsgrundlage: SGB XI §18
---

# Pflegegrad beantragen

## Schritte

1. **Antrag bei der Pflegekasse stellen** (AOK Sachsen-Anhalt).
   Formlos möglich – Anruf, Brief oder Online.
2. **Pflegekasse beauftragt den Medizinischen Dienst** (MD).
3. **MD vereinbart Begutachtungstermin** (Hausbesuch).
   Frist: innerhalb von 25 Arbeitstagen nach Antragstellung.
4. **Begutachtung:** Der Gutachter prüft Selbstständigkeit in
   6 Lebensbereichen (Mobilität, kognitive Fähigkeiten,
   Verhaltensweisen, Selbstversorgung, Krankheitsumgang,
   Alltagsgestaltung).
5. **Pflegekasse erteilt Bescheid** mit Pflegegrad.

## Dauer

Gesamtprozess in der Regel 4–6 Wochen.

## Benötigte Dokumente

- Vorhandene Arztberichte, Krankenhausentlassungsberichte
- Pflegetagebuch (empfohlen, nicht Pflicht)
- Liste der eingenommenen Medikamente

## Hinweis

Bei Ablehnung innerhalb von 4 Wochen Widerspruch möglich.
```

Warum gut: Vollständiger Prozess mit Fristen, Dokumenten, nächsten Schritten. Jemand kann danach handeln.

Der Schnelltest: Drei Fragen an jeden Baustein

Bevor ein Baustein als fertig gilt, diese drei Fragen stellen:

**1. Kann ein Versicherter auf Basis dieses Bausteins handeln?** Wenn ja: Baustein ist eigenständig genug. Wenn nein: Was fehlt, damit er handeln kann?

**2. Enthält der Baustein ein einziges Wort, das man streichen könnte, ohne Information zu verlieren?** Wenn ja: Streichen. Jeder Satz muss tragen.

**3. Würde ich das einem Kollegen so erklären, der das Thema nicht kennt?** Wenn nein: Ist es zu vage, zu technisch oder setzt es Vorwissen voraus, das nicht im Baustein steht?

--------------------------------------------------------------------------------

2. Bausteine extrahieren: Vom Quelltext zum Baustein

Was passiert bei der Extraktion?

Aus einem Website-Artikel (oft 500-1500 Wörter) werden mehrere Bausteine (typisch: 3-10 pro Artikel). Dabei wird:

- Marketing-Sprache entfernt
- Fließtext in strukturierte Felder zerlegt
- Implizites Wissen explizit gemacht
- Jeder Baustein einem Typ zugeordnet

Woran erkenne ich, dass die Extraktion gut war?

**Informationsverlust:** Wenn man alle extrahierten Bausteine nebeneinanderlegt, sollten alle Fakten aus dem Quellartikel enthalten sein. Die einzigen Dinge, die fehlen dürfen, sind: Einleitungen, Überleitungen, CTAs, Marketing-Sätze und Formatierungselemente.

**Informationsgewinn:** Gute Extraktion macht implizites Wissen explizit. Der Quellartikel sagt "Die Höhe richtet sich nach dem Pflegegrad" – der Baustein enthält die konkreten Beträge. Wenn die Beträge nicht im Quellartikel stehen, muss die Information aus einer anderen Quelle ergänzt werden (und die Quelle dokumentiert werden).

**Korrekte Typisierung:** Jeder Baustein hat genau einen Typ. Im Zweifel lieber zwei separate Bausteine als einen Mischtyp.

Entscheidungshilfe: Welcher Baustein-Typ?

| Frage an den Text                                   | Typ        | Kernmerkmal                                                          |
| --------------------------------------------------- | ---------- | -------------------------------------------------------------------- |
| Ist das eine objektive, überprüfbare Aussage?       | FAKT       | Kann verifiziert werden. Enthält keine Bewertung.                    |
| Beschreibt das eine Leistung der AOK?               | LEISTUNG   | Enthält: Wer bekommt was, unter welchen Bedingungen, wie viel.       |
| Empfiehlt das eine Handlung?                        | EMPFEHLUNG | Enthält ein "Sollte" oder "Ist empfehlenswert". Hat eine Begründung. |
| Warnt das vor einem Risiko?                         | WARNUNG    | Enthält ein Risiko und eine Handlungsanweisung.                      |
| Beschreibt das einen Ablauf mit Schritten?          | PROZESS    | Hat eine Reihenfolge. Man kann die Schritte abarbeiten.              |
| Ist das ein praktischer Hinweis ohne Dringlichkeit? | TIPP       | Nützlich, aber nicht kritisch. Kein Risiko wenn ignoriert.           |
| Verweist das auf ein anderes Thema?                 | VERWEIS    | Enthält keine eigene Information, nur einen Zusammenhang.            |

**Grenzfälle:**

"Pflegegeld beträgt bei Pflegegrad 2 monatlich 332 €" – ist das FAKT oder LEISTUNG? **LEISTUNG**, weil es eine AOK-Leistung beschreibt. Ein FAKT wäre: "In Deutschland gibt es 5 Pflegegrade."

"Sprechen Sie mit Ihrem Arzt über Folsäure" – ist das EMPFEHLUNG oder TIPP? **EMPFEHLUNG**, weil es eine medizinisch begründete Handlungsanweisung ist. Ein TIPP wäre: "Ingwertee kann bei Übelkeit helfen."

"Bei Blutungen in der Schwangerschaft sofort den Notruf wählen" – ist das EMPFEHLUNG oder WARNUNG? **WARNUNG**, weil ein akutes Risiko besteht.

--------------------------------------------------------------------------------

3. Taxonomie: Ordnung schaffen

Was ist eine Taxonomie und warum ist sie wichtig?

Die Taxonomie ist das Ordnungssystem für alle Bausteine eines Clusters. Sie definiert, welche Kategorien es gibt und was in welche Kategorie gehört. Für das AI-System ist sie der Bedeutungskontext – ohne Taxonomie kann das System nicht unterscheiden, ob eine Frage zur Leistung, zum Prozess oder zur Voraussetzung gehört.

Wie eine gute Taxonomie entsteht

**Schritt 1: Frei kategorisieren lassen.** Bei der ersten Extraktion vergeben Mensch oder LLM freie Kategorie-Labels. Das Ergebnis ist bewusst unordentlich: "Schlaf", "Schlafposition", "Nachtruhe", "Ruhe & Erholung" für ähnliche Themen.

**Schritt 2: Muster erkennen.** Alle freien Labels sammeln, Häufigkeiten zählen, Synonyme identifizieren. Welche Labels meinen dasselbe? Welche sind zu breit, welche zu eng?

**Schritt 3: Konsolidieren.** Aus den freien Labels eine finale Taxonomie mit 12-20 Kategorien pro Cluster ableiten. Jede Kategorie braucht: einen Namen, eine Kurzdefinition und die Abgrenzung zu ähnlichen Kategorien.

**Schritt 4: Rückwärts testen.** Für jede Kategorie prüfen: Kann ich ad hoc 3-5 Fragen formulieren, die ein Versicherter stellen würde und die in diese Kategorie fallen? Wenn nicht, ist die Kategorie entweder zu abstrakt oder unnötig.

Qualitätskriterien für eine Taxonomie

| Kriterium             | Test                                                         | Warnsignal                                                                                        |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Trennscharf**       | Kann jeder Baustein genau einer Kategorie zugeordnet werden? | Baustein passt in zwei Kategorien gleichzeitig                                                    |
| **Vollständig**       | Lässt sich jeder Baustein zuordnen?                          | Baustein passt in keine Kategorie                                                                 |
| **Granular genug**    | Hat jede Kategorie mindestens 3 Bausteine?                   | Kategorie enthält nur 1-2 Bausteine → mit anderer zusammenlegen                                   |
| **Nicht zu granular** | Hat keine Kategorie mehr als 30 Bausteine?                   | Kategorie enthält >30 Bausteine → aufteilen                                                       |
| **Nutzernah**         | Entsprechen die Kategorien Fragen, die Versicherte stellen?  | Kategorie klingt wie ein internes Organigramm                                                     |
| **Konsistent**        | Gleiche Benennungslogik über alle Kategorien?                | Mischung aus Themen ("Ernährung"), Aktionen ("Antrag stellen") und Zielgruppen ("Für Angehörige") |

Beispiel: Taxonomie Pflege-Cluster

| Kategorie                         | Definition                                                                    | Abgrenzung                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Pflegebedürftigkeit & Pflegegrade | Was Pflegebedürftigkeit ist, die 5 Grade, die Bewertungskriterien             | Nicht: Wie man den Grad beantragt (→ Antrags- & Begutachtungsprozess)        |
| Antrags- & Begutachtungsprozess   | Ablauf vom Antrag bis zum Bescheid, Gutachterbesuch, Widerspruch              | Nicht: Welche Leistungen man danach bekommt (→ jeweilige Leistungskategorie) |
| Pflegegeld & Pflegesachleistung   | Geldleistung vs. Sachleistung, Beträge, Voraussetzungen, Kombinationsleistung | Nicht: Verhinderungspflege, Kurzzeitpflege (→ Ergänzende Leistungen)         |
| Ergänzende Leistungen             | Verhinderungspflege, Kurzzeitpflege, Tages-/Nachtpflege, Entlastungsbetrag    | Nicht: Pflegegeld/Sachleistung (→ eigene Kategorie)                          |
| Wohnen & Umbau                    | Wohnraumanpassung, Pflegehilfsmittel, Wohngruppen-Zuschlag                    | Nicht: Pflegeheim (→ Stationäre Pflege)                                      |
| Stationäre Pflege                 | Vollstationäre Pflege, Eigenanteil, Pflegeheim-Auswahl                        | Nicht: Kurzzeitpflege (→ Ergänzende Leistungen)                              |
| Pflegende Angehörige              | Rentenansprüche, Pflegekurse, Freistellungen, Entlastungsangebote             | Nicht: Die Leistungen selbst (→ jeweilige Kategorie)                         |
| AOK-spezifische Services          | Pflegeberatung, Pflegestützpunkte, digitale Angebote der AOK SA               | Nicht: Gesetzliche Leistungen (→ jeweilige Kategorie)                        |

Beachten: Die Abgrenzungs-Spalte ist das Wichtigste. Ohne sie wird die Taxonomie im Alltag aufgeweicht.

--------------------------------------------------------------------------------

4. Die fünf Dimensionen prüfen

Jeder Baustein muss in fünf Dimensionen geprüft werden. Die folgende Checkliste ist als Review-Werkzeug gedacht: Jede Dimension durchgehen, Status festhalten, Lücken markieren.

Dimension 1: Bedeutungskontext

**Prüffrage:** Ist eindeutig, was der Baustein inhaltlich aussagt?

| Prüfpunkt                                                                                | ✓/✗ | Notiz |
| ---------------------------------------------------------------------------------------- | --- | ----- |
| Der Titel ist selbsterklärend                                                            |     |       |
| Alle Fachbegriffe sind definiert oder in Alltagssprache übersetzt                        |     |       |
| Der Baustein ist genau einer Kategorie zugeordnet                                        |     |       |
| Bei mehrfach verwendeten Begriffen: die spezifische Bedeutung in diesem Kontext ist klar |     |       |

**Typisches Problem:** "Verhinderungspflege" steht im Baustein, aber der Begriff wird nicht erklärt. Ein Versicherter, der zum ersten Mal davon hört, versteht ihn nicht. Lösung: Kurzdefinition im Baustein oder Verweis-Relation auf den Grundlagen-Baustein.

Dimension 2: Strukturkontext

**Prüffrage:** Sind die Zusammenhänge zu anderen Bausteinen explizit?

| Prüfpunkt                                                                | ✓/✗ | Notiz |
| ------------------------------------------------------------------------ | --- | ----- |
| Voraussetzungen benannt (was muss vorher gelten?)                        |     |       |
| Kombinierbarkeiten dokumentiert (was geht zusammen?)                     |     |       |
| Alternativen markiert (was gibt es stattdessen?)                         |     |       |
| Verwandte Themen verknüpft                                               |     |       |
| Hierarchie klar (gehört der Baustein zu einer übergeordneten Kategorie?) |     |       |

**Typisches Problem:** Baustein "Pflegegeld" existiert, aber die Information "Pflegegeld und Sachleistung werden über die Kombinationsleistung prozentual verrechnet" fehlt oder steht nur im Baustein "Kombinationsleistung" ohne Rücklink. Lösung: Bidirektionale Relationen setzen.

Dimension 3: Qualitätskontext

**Prüffrage:** Kann ich mich auf diese Information verlassen – jetzt, in diesem Moment?

| Prüfpunkt                                                     | ✓/✗ | Notiz |
| ------------------------------------------------------------- | --- | ----- |
| Stand-Datum vorhanden (wann zuletzt geprüft?)                 |     |       |
| Volatilität bewertet (wie oft ändert sich das?)               |     |       |
| Quelle(n) dokumentiert (woher stammt die Information?)        |     |       |
| Validierungsstatus gesetzt (von AOK-Fachredaktion geprüft?)   |     |       |
| Bei widersprüchlichen Quellen: die verlässlichere priorisiert |     |       |

**Volatilitäts-Bewertung:**

| Stufe   | Bedeutung                                      | Beispiele                                                           | Prüfintervall                              |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------ |
| Hoch    | Ändert sich bei Gesetzesänderung oder jährlich | Beträge, Fristen, Zuzahlungsgrenzen                                 | Bei jeder Gesetzesänderung, mind. jährlich |
| Mittel  | Ändert sich gelegentlich                       | Prozessabläufe, Zuständigkeiten, Formulare                          | Halbjährlich                               |
| Niedrig | Ändert sich selten bis nie                     | Grunddefinitionen, Pflegegrad-Systematik, Rechtsgrundlagen-Verweise | Jährlich oder bei Bedarf                   |

**Typisches Problem:** Pflegegeld-Beträge aus dem Crawl stammen von 2024, die aktuellen Werte ab 2025 sind anders. Aber im Baustein steht kein Datum, also merkt es niemand. Lösung: Jeder Baustein mit konkreten Beträgen oder Fristen braucht ein Stand-Datum und die Volatilitätsstufe "hoch".

Dimension 4: Regelkontext

**Prüffrage:** Weiß das System, was es mit dieser Information tun darf – und was nicht?

| Prüfpunkt                                                                 | ✓/✗ | Notiz |
| ------------------------------------------------------------------------- | --- | ----- |
| Haftungshinweis vorhanden (wo nötig)                                      |     |       |
| Klarheit darüber, ob die Information allgemein oder einzelfallbezogen ist |     |       |
| Eskalationspfad definiert (wann an menschliche Beratung verweisen?)       |     |       |
| Rechtsgrundlage angegeben (bei Leistungen und Prozessen)                  |     |       |

**Wann braucht ein Baustein welchen Regelkontext?**

| Baustein-Typ | Regelkontext-Bedarf | Warum?                                              |
| ------------ | ------------------- | --------------------------------------------------- |
| LEISTUNG     | Hoch                | Beträge können individuell abweichen, keine Zusagen |
| PROZESS      | Mittel-Hoch         | Fristen und Abläufe können variieren                |
| WARNUNG      | Hoch                | Medizinische Abgrenzung: keine Diagnosen            |
| EMPFEHLUNG   | Mittel              | Medizinische Empfehlung ≠ ärztliche Anordnung       |
| FAKT         | Niedrig             | Allgemeine Fakten brauchen selten Disclaimer        |
| TIPP         | Niedrig             | Praktische Tipps sind unkritisch                    |

**Typisches Problem:** Der Baustein beschreibt, wie man einen Pflegegrad beantragt, enthält aber keinen Hinweis, dass der Assistent keine Einschätzung geben darf, welcher Pflegegrad "herauskommen wird". Lösung: Expliziter Regelkontext: "Allgemeine Prozessinformation. Individuelle Pflegegrad-Einschätzung nur durch den Medizinischen Dienst."

Dimension 5: Zielgruppenkontext

**Prüffrage:** Ist klar, für wen diese Information relevant ist?

| Prüfpunkt                                                        | ✓/✗ | Notiz |
| ---------------------------------------------------------------- | --- | ----- |
| Zielgruppe(n) getaggt                                            |     |       |
| Kontext-Tags gesetzt (Pflegegrad, Trimester, Altersgruppe etc.)  |     |       |
| Sprachebene angemessen (faktisch, aber verständlich)             |     |       |
| Relevanz-Marker: Für welche Situation ist das besonders wichtig? |     |       |

**Typisches Problem:** Ein Baustein über Verhinderungspflege ist nur für pflegebedürftige Personen getaggt. Aber die Hauptzielgruppe sind pflegende Angehörige – sie sind es, die Verhinderungspflege organisieren und beantragen. Lösung: Beide Zielgruppen taggen, aber mit unterschiedlichen Perspektiven markieren.

--------------------------------------------------------------------------------

5. Relationen: Zusammenhänge explizit machen

Warum Relationen so wichtig sind

Relationen sind der Strukturkontext in Aktion. Sie sorgen dafür, dass das AI-System bei einer Frage nicht nur den direkt relevanten Baustein findet, sondern auch verwandte Informationen mitliefern kann.

Ohne Relationen: "Was ist Pflegegeld?" → Baustein Pflegegeld. Fertig. Mit Relationen: "Was ist Pflegegeld?" → Baustein Pflegegeld + Hinweis auf Kombinationsleistung + Verweis auf Pflegegrade als Voraussetzung + Hinweis auf Verhinderungspflege als ergänzende Leistung.

Die Relationstypen

| Typ                | Bedeutung                                 | Beispiel                                      |
| ------------------ | ----------------------------------------- | --------------------------------------------- |
| `voraussetzung`    | A setzt B voraus                          | Pflegegeld → setzt Pflegegrad voraus          |
| `kombinierbar_mit` | A und B können zusammen genutzt werden    | Pflegegeld → kombinierbar mit Sachleistung    |
| `alternative_zu`   | A oder B, nicht beides (in vollem Umfang) | Pflegegeld → Alternative zu Sachleistung      |
| `verwandt_mit`     | A und B hängen thematisch zusammen        | Pflegegeld → verwandt mit Verhinderungspflege |
| `teil_von`         | A gehört zu B                             | Pflegegeld → Teil von Pflegeleistungen        |
| `ersetzt_durch`    | A wurde durch B abgelöst                  | Pflegestufe → ersetzt durch Pflegegrad        |

Prüffragen für Relationen

Für jeden Baustein fragen:

- **Was muss vorher gelten**, damit dieser Baustein relevant ist? → `voraussetzung`
- **Was gibt es stattdessen?** → `alternative_zu`
- **Was kann gleichzeitig genutzt werden?** → `kombinierbar_mit`
- **Was gehört zum selben Thema**, ist aber ein eigener Baustein? → `verwandt_mit`
- **Ist dieser Baustein Teil eines größeren Ganzen?** → `teil_von`

Häufiger Fehler: Einseitige Relationen

Wenn Baustein A auf Baustein B verweist, muss B auch auf A zurückverweisen. Sonst findet das System die Verbindung nur in eine Richtung.

Schlecht: Pflegegeld → kombinierbar_mit → Sachleistung. Aber Sachleistung hat keinen Rückverweis.

Gut: Pflegegeld → kombinierbar_mit → Sachleistung. Sachleistung → kombinierbar_mit → Pflegegeld. Beide → verwandt_mit → Kombinationsleistung.

--------------------------------------------------------------------------------

6. Typische Fehler und wie man sie erkennt

Fehler bei der Extraktion

| Fehler                                                 | Symptom                                                   | Lösung                                                                     |
| ------------------------------------------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Marketing nicht entfernt**                           | Sätze wie "Wir sind für Sie da", "Profitieren Sie von..." | Jeden Satz fragen: Enthält er eine konkrete Information? Nein → streichen. |
| **Baustein nicht eigenständig**                        | Sätze wie "Wie oben beschrieben...", "In diesem Fall..."  | Bezüge auflösen. Der Baustein darf nichts voraussetzen.                    |
| **Zu große Bausteine**                                 | Baustein beantwortet 3+ verschiedene Fragen               | Aufteilen. Eine Frage = ein Baustein.                                      |
| **Zu kleine Bausteine**                                | Baustein ist ein einzelner Fakt ohne Kontext              | Zusammenführen oder als Teil eines größeren Bausteins eingliedern.         |
| **Falscher Typ**                                       | EMPFEHLUNG, die eigentlich eine WARNUNG ist               | Typisierungs-Entscheidungshilfe in Kapitel 2 nutzen.                       |
| **Information ergänzt, die nicht in der Quelle steht** | Beträge oder Details hinzugefügt ohne Quellenangabe       | Alle ergänzten Informationen müssen eine dokumentierte Quelle haben.       |

Fehler bei der Taxonomie

| Fehler               | Symptom                                        | Lösung                                  |
| -------------------- | ---------------------------------------------- | --------------------------------------- |
| **Zu feingranular**  | Kategorien mit 1-2 Bausteinen                  | Zusammenlegen mit verwandter Kategorie. |
| **Zu grobkörnig**    | Kategorien mit 30+ Bausteinen                  | Aufteilen nach sinnvollem Kriterium.    |
| **Überlappend**      | Baustein passt in zwei Kategorien              | Abgrenzungsdefinitionen schärfen.       |
| **Am Nutzer vorbei** | Kategorien klingen wie Abteilungsbezeichnungen | Kategorien an Nutzerfragen orientieren. |

Fehler bei den Kontextdimensionen

| Fehler                     | Symptom                                                                | Lösung                                                         |
| -------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Qualitätskontext fehlt** | Kein Stand-Datum, keine Volatilität                                    | Nachrüsten. Ist schnell gemacht und verhindert große Probleme. |
| **Regelkontext vergessen** | LEISTUNG-Baustein ohne Haftungshinweis                                 | Regelkontext-Bedarf pro Typ prüfen (Tabelle in Kapitel 4).     |
| **Einseitige Zielgruppe**  | Pflege-Baustein nur für Pflegebedürftige getaggt, nicht für Angehörige | Für jeden Baustein fragen: Wer fragt typischerweise danach?    |
| **Relationen fehlen**      | Baustein steht isoliert, obwohl Zusammenhänge offensichtlich sind      | Relationen-Checkliste aus Kapitel 5 durchgehen.                |

--------------------------------------------------------------------------------

7. Prompts zum Arbeiten

Die folgenden Prompts sind produktionsreif – Platzhalter in `{geschweiften Klammern}` ersetzen und direkt verwenden.

Prompt 1: Baustein-Extraktion

Für die Erstextraktion aus einem gecrawlten Artikel.

```
Du bist Experte für die Strukturierung von Gesundheitsinformationen 
für AI-Systeme.

## Aufgabe

Extrahiere aus dem folgenden Artikel alle relevanten Informationen 
als atomare Bausteine.

## Regeln

1. Jeder Baustein enthält EINE konkrete Information oder beantwortet 
   EINE Frage vollständig
2. Jeder Baustein muss ohne den Artikel verständlich sein – keine 
   Rückverweise wie "wie oben beschrieben"
3. Entferne: Marketing-Sprache, Einleitungen, Überleitungen, CTAs, 
   emotionale Rahmung
4. Behalte: Medizinische und rechtliche Präzision, konkrete Beträge, 
   Fristen, Voraussetzungen
5. Wenn Informationen lückenhaft sind (z.B. "Die Höhe richtet sich 
   nach dem Pflegegrad" ohne konkrete Beträge), markiere die Lücke 
   mit [ERGÄNZEN: was fehlt]
6. Wenn der Artikel auf andere Themen verweist, erstelle 
   VERWEIS-Bausteine
7. Bei Leistungen: Beträge, Voraussetzungen und Pflegegrade/Trimester 
   explizit nennen
8. Bei Prozessen: Schritte klar nummerieren, Fristen und benötigte 
   Dokumente angeben

## Bausteintypen

- FAKT: Objektive, überprüfbare Information
- LEISTUNG: AOK-spezifisches Angebot mit Bedingungen
- EMPFEHLUNG: Medizinisch/fachlich begründete Handlungsanweisung
- WARNUNG: Risiko oder Symptom, das ärztliche Hilfe erfordert
- PROZESS: Ablauf mit Schritten und Reihenfolge
- TIPP: Praktischer Hinweis ohne medizinische Dringlichkeit
- VERWEIS: Hinweis auf anderes Thema oder Leistung

## Ausgabeformat pro Baustein

- typ: [Typ]
  kategorie: [Freie Vergabe – das Thema in 1-3 Worten]
  titel: [Kurzer, prägnanter Titel]
  inhalt: |
    [Strukturierter Inhalt – bei Leistungen mit Unterfeldern:
    definition, voraussetzungen, leistungsumfang etc.]
  quelle: {dateiname}
  luecken: [Nur wenn Information fehlt – was müsste ergänzt werden?]

## Artikel

{artikel_inhalt}
```

Prompt 2: Taxonomie-Konsolidierung

Für die Zusammenführung der freien Kategorien zu einer Taxonomie.

```
Du bist Experte für Informationsarchitektur im Gesundheitswesen.

## Aufgabe

Analysiere die folgenden Kategorien aus der Extraktion von 
{anzahl} Artikeln zum Thema {themencluster} und erstelle eine 
konsolidierte Taxonomie.

## Kategorien aus der Extraktion

{liste_kategorien_mit_häufigkeit_und_beispielen}

## Regeln für die Taxonomie

1. Maximal 15-20 Kategorien
2. Jede Kategorie braucht: Name, Kurzdefinition (1 Satz), 
   Abgrenzung (was gehört NICHT rein)
3. Kategorien müssen trennscharf sein – jeder Baustein passt 
   in genau eine
4. Kategorien müssen an Nutzerfragen orientiert sein, nicht an 
   internen Strukturen
5. Synonyme zusammenlegen (dokumentieren, welche Labels gemappt 
   werden)
6. Jede Kategorie sollte mindestens 3, maximal 30 Bausteine 
   enthalten

## Ausgabeformat

Für jede Kategorie:

### [Kategorie-Name]
- Definition: [Was gehört hier rein?]
- Abgrenzung: [Was gehört hier NICHT rein?]
- Gemappte Labels: [Welche Original-Kategorien werden hier 
  zusammengefasst?]
- Erwartete Größe: [Geschätzte Anzahl Bausteine]

Am Ende: Übersicht als Tabelle (Kategorie | Definition | 
Abgrenzung | Gemappte Labels)
```

Prompt 3: Kontextdimensionen-Anreicherung

Für die Nachbearbeitung extrahierter Bausteine mit den fünf Dimensionen.

```
Du bist Experte für Context Engineering im Gesundheitswesen.

## Aufgabe

Reichere den folgenden Baustein mit Kontextdimensionen an. 
Der Baustein stammt aus dem Cluster {themencluster}.

## Der Baustein

{baustein_inhalt}

## Für jede Dimension prüfen und ergänzen

1. BEDEUTUNG: Gibt es Fachbegriffe, die definiert oder übersetzt 
   werden müssen? Ist die Abgrenzung zu ähnlichen Konzepten klar?

2. STRUKTUR: Welche anderen Bausteine hängen mit diesem zusammen? 
   Nutze diese Relationstypen:
   - voraussetzung (A setzt B voraus)
   - kombinierbar_mit (A und B gehen zusammen)
   - alternative_zu (A oder B)
   - verwandt_mit (thematisch nah)
   - teil_von (A gehört zu B)

3. QUALITÄT: Wie volatil ist die Information? Setze:
   - stand: [Datum der Quelle oder "unbekannt"]
   - volatilitaet: hoch | mittel | niedrig
   - validiert: false (wird erst true nach AOK-Review)

4. REGELN: Braucht der Baustein einen Haftungshinweis? Eine 
   Eskalationsregel? Eine Rechtsgrundlage?

5. ZIELGRUPPE: Für wen ist das primär relevant? Setze:
   - zielgruppe: [z.B. pflegebedürftige, angehörige, beide]
   - kontext_tags: [z.B. pflegegrade: [2,3,4,5] oder 
     trimester: [1,2,3]]

## Ausgabeformat

Gib den vollständigen Baustein als Markdown-Datei mit 
Frontmatter aus: Metadaten (Typ, Kategorie, Zielgruppe, 
Qualität, Regeln, Relationen) im YAML-Frontmatter zwischen 
--- Markern, Inhalt als Markdown-Fließtext darunter.

Markiere ergänzte Felder mit # ERGÄNZT
Markiere unsichere Ergänzungen mit # ZU PRÜFEN
```

Prompt 4: Duplikat-Prüfung

Für die inhaltliche Prüfung von Bausteinen, die als potenzielle Duplikate identifiziert wurden.

```
Du bist Experte für Content-Konsolidierung im Gesundheitswesen.

## Aufgabe

Die folgenden Bausteine wurden als potenzielle Duplikate 
identifiziert. Prüfe für jedes Paar:

1. Sind sie echte Duplikate (gleiche Information, andere Worte)?
2. Ergänzen sie sich (verschiedene Aspekte desselben Themas)?
3. Widersprechen sie sich?

## Bausteine

{liste_der_bausteine}

## Für echte Duplikate

Erstelle EINEN konsolidierten Baustein, der:
- Die präziseste Formulierung verwendet
- Alle relevanten Details beider Bausteine enthält
- Die Quellen beider Bausteine aufführt
- Keine Information verliert

## Für sich ergänzende Bausteine

Entscheide: Sollen sie zusammengeführt werden (wenn sie 
zusammen eine Frage beantworten) oder getrennt bleiben (wenn 
sie verschiedene Fragen beantworten)? Begründe die Entscheidung.

## Für Widersprüche

Dokumentiere den Widerspruch exakt und markiere ihn mit 
[WIDERSPRUCH: Baustein A sagt X, Baustein B sagt Y – 
AOK-Klärung nötig].
```

--------------------------------------------------------------------------------

8. Checklisten

Checkliste pro Baustein (nach Extraktion)

```
□ Baustein ist ohne Quellartikel verständlich
□ Kein Marketing, keine Füllsätze, keine CTAs
□ Typ korrekt zugeordnet
□ Titel ist selbsterklärend
□ Bei LEISTUNG: Beträge, Voraussetzungen, Rechtsgrundlage vorhanden
□ Bei PROZESS: Schritte, Fristen, Dokumente vorhanden
□ Bei WARNUNG: Risiko und Handlungsanweisung klar
□ Informationslücken markiert mit [ERGÄNZEN]
```

Checkliste pro Baustein (nach Kontext-Anreicherung)

```
□ BEDEUTUNG: Fachbegriffe definiert, Kategorie zugeordnet
□ STRUKTUR: Relationen gesetzt, bidirektional
□ QUALITÄT: Stand-Datum, Volatilität, Validierungsstatus
□ REGELN: Haftungshinweis (wo nötig), Rechtsgrundlage (wo nötig)
□ ZIELGRUPPE: Zielgruppe getaggt, Kontext-Tags gesetzt
```

Checkliste pro Taxonomie (nach Konsolidierung)

```
□ 12-20 Kategorien pro Cluster
□ Jede Kategorie hat Definition und Abgrenzung
□ Jeder Baustein passt in genau eine Kategorie
□ Keine Kategorie mit weniger als 3 Bausteinen
□ Keine Kategorie mit mehr als 30 Bausteinen
□ Kategorien orientieren sich an Nutzerfragen
□ Synonyme dokumentiert
□ Rückwärts-Test bestanden (3-5 Nutzerfragen pro Kategorie formulierbar)
```

Checkliste pro Cluster (nach QS)

```
□ Alle Bausteine extrahiert und typisiert
□ Taxonomie konsolidiert und abgenommen
□ Duplikate identifiziert und konsolidiert
□ Alle fünf Dimensionen pro Baustein geprüft
□ Relationen gesetzt und bidirektional
□ Widersprüche dokumentiert und an AOK übergeben
□ Informationslücken dokumentiert und an AOK übergeben
□ Stand-Daten und Volatilitäten gesetzt
□ Validierungsstatus: "false" für alle (bis AOK-Review)
□ Ablagestruktur erstellt (Ordner, Dateien, _taxonomie.md, _relationen.md)
```

--------------------------------------------------------------------------------

*Dokument erstellt: Februar 2025* *Teil von: Mission SAVA – AI-Assistenten AOK Sachsen-Anhalt* *Verwandte Dokumente: Architektur-Dokument, Content-to-Context-Methodik (v4), Context Storage & Retrieval Architektur (v0.2), Assistent-Verfassung (Layer 1)*
