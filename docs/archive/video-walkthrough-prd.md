# Video Walkthrough Generator — PRD

> Eigenständiges Tool-Projekt zur automatisierten Erstellung von Walkthrough-Videos aus Web-Applikationen.

---

## Problem

Für Stakeholder-Präsentationen, Dokumentation und Social Content brauchen wir regelmäßig kurze Videos, die eine Web-App visuell durchlaufen. Manuelles Screen-Recording ist zeitaufwendig, inkonsistent und schlecht reproduzierbar. Ein automatisierter Workflow spart Zeit und liefert gleichbleibende Qualität.

## Ziel

Ein standalone CLI-Tool, das:
1. Eine laufende Web-App per Browser-Automation besucht und Screenshots macht
2. Aus den Screenshots ein Video mit Animationen, Übergängen und Text-Overlays rendert
3. Für verschiedene Projekte wiederverwendbar ist (nicht an ein Repo gebunden)

## Kernkonzept

```
URL + Scrollplan → Screenshots → Video-Rendering → MP4
```

Der Workflow besteht aus zwei unabhängigen Phasen:
- **Capture** — Browser navigiert eine URL, scrollt zu definierten Positionen, macht Screenshots
- **Render** — Screenshots werden zu einem Video mit Ken-Burns-Effekten, Fade-Übergängen und Titel-Overlays zusammengesetzt

---

## Architektur

### Projekt-Struktur

```
video-walkthrough/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # CLI Entry Point
│   ├── capture.ts            # Browser-Automation (Playwright)
│   ├── render-remotion.ts    # Remotion Video-Rendering
│   ├── render-ffmpeg.ts      # FFmpeg Video-Rendering (Alternative)
│   ├── remotion/
│   │   ├── Root.tsx
│   │   ├── WalkthroughVideo.tsx
│   │   └── ScreenSlide.tsx
│   └── types.ts
├── manifests/                # Pro-Projekt Konfigurationsdateien
│   └── sava-landingpage.json
└── output/                   # Generierte Videos und Screenshots
    ├── screens/
    └── videos/
```

### Manifest-Format

Jedes Projekt bekommt eine JSON-Manifest-Datei, die den gesamten Walkthrough beschreibt:

```json
{
  "name": "SAVA Landingpage",
  "url": "http://localhost:3000",
  "viewport": { "width": 1920, "height": 1080 },
  "video": {
    "fps": 30,
    "slideSeconds": 4,
    "transitionFrames": 15
  },
  "screens": [
    {
      "id": "hero",
      "title": "Dasselbe Thema. Verschiedene Antworten.",
      "description": "Die SAVA Engine trennt Wissen von Kommunikation",
      "scroll": { "selector": null, "y": 0 },
      "waitMs": 500
    },
    {
      "id": "architektur",
      "title": "Drei Schichten. Ein Fundament.",
      "description": "Context, Intention, Kommunikation und der Kompass",
      "scroll": { "selector": "#architektur", "y": -50 },
      "waitMs": 500
    },
    {
      "id": "context",
      "title": "Der Context",
      "description": "Wissen, Tools und Datenbanken",
      "scroll": { "selector": "h2", "text": "Der Context", "y": -80 },
      "waitMs": 500
    },
    {
      "id": "intentionen",
      "title": "Die Intentionen",
      "description": "7 Kernintentionen hinter jeder Frage",
      "scroll": { "selector": "h2", "text": "Die Intentionen", "y": -80 },
      "waitMs": 500
    }
  ]
}
```

---

## Rendering: Zwei Ansätze

Das Tool soll beide Rendering-Engines unterstützen. Die Wahl hängt vom Anwendungsfall ab.

### Option A: Remotion (React-basiert)

**Stärken:**
- Volle programmatische Kontrolle über jeden Frame
- React-Komponenten für komplexe Layouts (Split-Screen, Annotations, Hotspots)
- Remotion Studio für visuelles Preview und Feintuning
- Spring-Animationen für natürliche Bewegung
- Einfach erweiterbar (Progress-Bar, Logo-Wasserzeichen, Kapitelmarken)

**Schwächen:**
- Eigenes React-Projekt mit separatem Bundler
- Chrome Headless Shell Download (~108 MB) beim ersten Render
- Langsamer bei einfachen Slideshows (React-Overhead pro Frame)

**Wann Remotion:**
- Komplexe Animationen (Zoom auf UI-Elemente, annotierte Highlights)
- Layouts mit mehreren Ebenen (Bild + Text + Fortschrittsanzeige)
- Iteratives Arbeiten mit Preview im Studio

**Dependencies:**
```json
{
  "remotion": "^4.0.0",
  "@remotion/cli": "^4.0.0",
  "@remotion/transitions": "^4.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

**Render-Kommando:**
```bash
npx remotion render src/remotion/index.ts WalkthroughVideo output/videos/walkthrough.mp4
```

### Option B: FFmpeg (CLI-basiert)

**Stärken:**
- Kein JavaScript-Projekt nötig, reines CLI-Tool
- Extrem schlank, keine React/Bundler-Overhead
- Schneller für einfache Slideshows
- Überall verfügbar (jede CI/CD Pipeline hat FFmpeg)
- Direkte Kontrolle über Codec, Bitrate, Qualität

**Schwächen:**
- Filter-Syntax ist kryptisch und fehleranfällig
- Kein visuelles Preview (Trial-and-Error)
- Komplexe Layouts (Multi-Layer, Annotations) werden schnell unhandlich
- Ken-Burns-Effekt braucht vorheriges Hochskalieren (langsam, speicherintensiv)

**Wann FFmpeg:**
- Einfache Slideshows mit Fade-Übergängen
- CI/CD-Integration (kein Node.js nötig)
- Schnelle Prototypen ohne Setup-Overhead

**FFmpeg Pipeline (Zwei-Pass):**

```bash
# Pass 1: Ken-Burns-Clips pro Screenshot
ffmpeg -loop 1 -t 4.5 -i screens/hero.png \
  -vf "scale=8000:-1,zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=135:fps=30:s=1920x1080,format=yuv420p" \
  -c:v libx264 -r 30 -preset fast clip-hero.mp4

# Pass 2: Clips mit xfade zusammenfügen + Text-Overlays
ffmpeg \
  -i clip-hero.mp4 -i clip-architektur.mp4 -i clip-context.mp4 -i clip-intentionen.mp4 \
  -filter_complex "
    [0][1]xfade=transition=fade:duration=0.5:offset=4.0[x01];
    [x01][2]xfade=transition=fade:duration=0.5:offset=8.0[x012];
    [x012][3]xfade=transition=fade:duration=0.5:offset=12.0[xall];
    [xall]drawtext=text='Titel':fontsize=48:fontcolor=white:x=80:y=H-100:box=1:boxcolor=black@0.5:boxborderw=14:enable='between(t,0,4)'[out]
  " \
  -map "[out]" -c:v libx264 -r 30 -crf 18 walkthrough.mp4
```

**Wichtige FFmpeg-Details:**
- `zoompan` braucht eine hochskalierte Quelle (`scale=8000:-1`), weil es croppt statt zoomt
- `xfade` offset-Formel für gleichlange Clips: `offset_n = n * (clip_dauer - transition_dauer)`
- `format=yuv420p` nach zoompan nötig, weil PNG-Inputs oft RGBA sind
- Font-Pfad ist plattformspezifisch: Windows `C\:/Windows/Fonts/arial.ttf`, macOS `/System/Library/Fonts/Helvetica.ttc`
- Verfügbare xfade-Transitions: `fade`, `fadeblack`, `fadewhite`, `dissolve`, `wipeleft`, `slideright`, `circleopen`, `pixelize`

### Empfehlung: Beide als Render-Backend

```bash
# Einfache Slideshow → FFmpeg
walkthrough render --engine ffmpeg --manifest sava-landingpage.json

# Komplexes Video mit Annotations → Remotion
walkthrough render --engine remotion --manifest sava-landingpage.json
```

---

## CLI-Interface

```bash
# Nur Screenshots machen
walkthrough capture --manifest manifests/sava-landingpage.json

# Nur Video rendern (Screenshots müssen existieren)
walkthrough render --manifest manifests/sava-landingpage.json --engine remotion

# Alles in einem Schritt
walkthrough run --manifest manifests/sava-landingpage.json --engine ffmpeg

# Remotion Studio für Preview starten
walkthrough preview --manifest manifests/sava-landingpage.json --port 3100
```

---

## Capture-Phase (Playwright)

Die Screenshot-Automation nutzt Playwright direkt (kein agent-browser nötig):

```typescript
import { chromium } from 'playwright';

async function capture(manifest: Manifest) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize(manifest.viewport);
  await page.goto(manifest.url);

  for (const screen of manifest.screens) {
    if (screen.scroll.selector) {
      // Scroll zu Element (optional mit Text-Match)
      const el = await page.locator(screen.scroll.selector,
        screen.scroll.text ? { hasText: screen.scroll.text } : {}
      ).first();
      await el.scrollIntoViewIfNeeded();
      await page.evaluate((y) => window.scrollBy(0, y), screen.scroll.y ?? 0);
    }
    await page.waitForTimeout(screen.waitMs);
    await page.screenshot({ path: `output/screens/${screen.id}.png` });
  }

  await browser.close();
}
```

---

## Tech Stack

| Komponente | Technologie | Zweck |
|------------|-------------|-------|
| CLI | Node.js + Commander | Kommandozeilen-Interface |
| Capture | Playwright | Browser-Automation, Screenshots |
| Render A | Remotion | Komplexe Video-Komposition |
| Render B | FFmpeg | Schnelle Slideshows |
| Config | JSON Manifests | Pro-Projekt Konfiguration |

**Dependencies:**
```json
{
  "playwright": "^1.50.0",
  "commander": "^13.0.0",
  "remotion": "^4.0.0",
  "@remotion/cli": "^4.0.0",
  "@remotion/transitions": "^4.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

FFmpeg wird als System-Dependency vorausgesetzt (nicht als npm-Paket).

---

## PoC-Erkenntnisse

Aus dem Proof of Concept im SAVA-Projekt:

| Thema | Erkenntnis |
|-------|------------|
| Remotion Setup | Braucht ein vollständiges React-Projekt mit eigenem Bundler. Kann nicht in ein Next.js-Projekt eingebettet werden. |
| staticFile() | Pfade ohne `public/`-Prefix. `staticFile("assets/screens/hero.png")` statt `staticFile("public/...")` |
| Chrome Download | Remotion lädt beim ersten Render Chrome Headless Shell (~108 MB). Danach gecached. |
| Playwright Screenshots | 1920x1080 Screenshots direkt aus MCP oder Playwright CLI. Viewport muss explizit gesetzt werden. |
| Scroll-Positionen | Am besten per CSS-Selector + Offset statt absolute Pixel-Werte. Robuster bei Layout-Änderungen. |
| Port-Konflikt | Remotion Studio Default-Port 3000 kollidiert mit Next.js Dev Server. Port 3100 nutzen. |
| Render-Dauer | 435 Frames (14.5s Video) in ~30 Sekunden auf Windows. Akzeptabel für PoC. |
| Video-Qualität | 1920x1080 Screenshots ergeben scharfe Videos. Text gut lesbar. |

---

## Scope

### MVP (Phase 1)
- [ ] CLI mit `capture` und `render` Kommandos
- [ ] Playwright-basierte Screenshot-Capture
- [ ] Remotion-Rendering mit Fade-Übergängen und Ken-Burns-Zoom
- [ ] JSON-Manifest pro Projekt
- [ ] Text-Overlays (Titel + Beschreibung pro Slide)

### Phase 2
- [ ] FFmpeg als alternatives Render-Backend
- [ ] `run`-Kommando (Capture + Render in einem Schritt)
- [ ] Remotion Studio Preview (`preview`-Kommando)
- [ ] Konfigurierbare Animations-Typen pro Slide (zoom-in, zoom-out, pan)

### Phase 3
- [ ] Annotation-Overlays (Kreise, Pfeile auf UI-Elemente)
- [ ] Progress-Bar Komponente
- [ ] Audio/Voiceover-Track
- [ ] CI/CD Integration (GitHub Actions Workflow)
- [ ] Batch-Verarbeitung (mehrere Manifests in einem Durchlauf)

---

## Offene Fragen

1. **Mono-Repo oder eigenes Repo?** Eigenständiges Repo macht Wiederverwendung einfacher. Mono-Repo mit dem jeweiligen Projekt bindet es enger an den Kontext.
2. **FFmpeg als npm-Wrapper?** Pakete wie `fluent-ffmpeg` oder `@ffmpeg/ffmpeg` (WASM) könnten die System-Dependency vermeiden, sind aber langsamer.
3. **Auth-geschützte Seiten?** Playwright kann Cookies setzen. Das Manifest bräuchte ein optionales `auth`-Feld mit Cookie/Token-Konfiguration.
4. **Responsive Varianten?** Manifests könnten mehrere Viewport-Größen definieren und pro Viewport ein Video generieren (Desktop + Mobile).
