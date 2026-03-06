# Kundenkontext: AOK Sachsen-Anhalt

## Die AOK Sachsen-Anhalt als Eigenmarke

Die AOK Sachsen-Anhalt (AOK SAN) ist eine von 11 Landes-AOKs in Deutschland. Sie hat sich bewusst teilweise vom AOK-Bundesverband abgekoppelt und positioniert sich als eigenstaendige Marke mit eigener digitaler Infrastruktur.

**Kernunterscheidung:** Die Domain `www.aok.de` wird vom AOK-Bundesverband in Zusammenarbeit mit den anderen Landesverbaenden bespielt. Informationen zur AOK SAN finden sich dort nur teilweise. Die AOK SAN betreibt stattdessen ein eigenes digitales Oekosystem unter eigener Domain.

## Zwei digitale Welten

| Kuerzel | Name | URL | Zugang | Funktion |
|---------|------|-----|--------|----------|
| **DGW** | Deine Gesundheitswelt | www.deine-gesundheitswelt.de | Oeffentlich | Website-Portal mit Content, Informationen, Services |
| **MGW** | Meine Gesundheitswelt | Login-Bereich | Nur fuer Mitglieder | Persoenlicher Bereich mit internen Services und Versichertendaten |

Die DGW ist die primaere Content-Plattform und Quellbasis fuer die SAVA Engine. Die AOK SAN ist im SEO-Bereich stark als Eigenmarke unter dieser Domain positioniert und betreibt ein eigenes grosses Content-Team, das die Inhalte pflegt.

Die MGW ist der authentifizierte Bereich fuer Versicherte. Fuer die SAVA Engine ist die MGW langfristig relevant als Quelle fuer Nutzerprofil-Daten (Runtime Context): Pflegegrad, PLZ, genutzte Leistungen, Versichertenstatus.

## Warum das fuer die SAVA Engine relevant ist

### Kassenspezifisches Wissen ist entscheidend

Als gesetzliche Krankenkasse bietet die AOK SAN zwei Arten von Leistungen:

- **Gesetzliche Leistungen** (SGB V, SGB XI) — identisch bei allen gesetzlichen Krankenkassen. Beispiel: Pflegegeld-Betraege nach Pflegegrad.
- **Satzungsleistungen** — kassenspezifisch, von jeder AOK individuell gestaltet. Beispiel: Zuschuss zur professionellen Zahnreinigung, Osteopathie, Bonusprogramme.

Ein generisches LLM (ChatGPT, Gemini) kann gesetzliche Leistungen oft korrekt beantworten. Bei Satzungsleistungen halluziniert es oder liefert Informationen einer anderen Kasse. Genau hier entsteht der Unterschied zwischen "plausibel" und "verlaesslich" — und genau hier braucht es die SAVA Engine mit geprueftem, kassenspezifischem Context.

### Content-Quelle ist nicht aok.de

Die Content-to-Context Pipeline bezieht ihre Rohdaten primaer von `deine-gesundheitswelt.de`, nicht von `aok.de`. Das bedeutet: Crawling, Extraktion und Baustein-Erstellung arbeiten mit dem Content-Oekosystem der AOK SAN, nicht mit dem Bundesverband-Portal.

## Vision 2030

Die AOK Sachsen-Anhalt hat das Ziel, bis 2030 eine der digitalsten und KI-gestuetzten Gesundheitsbegleiterinnen unter den gesetzlichen Krankenkassen zu werden.

**SAVA** (Arbeitstitel, offizieller Missionsname in Arbeit) beschreibt den Weg dorthin: Ein agentisches System, das Versicherte situationsgerecht begleitet — mit geprueftem Wissen, erkannten Beduerfnissen und angemessener Kommunikation.

Die SAVA Engine ist die technisch-konzeptionelle Architektur dieses Systems. Sie definiert, wie der Assistent funktioniert, was er braucht, wie er wirkt und wie er kommuniziert.
