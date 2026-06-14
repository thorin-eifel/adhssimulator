# ADHS Simulator

An interactive empathy tool that lets pupils, parents, and teachers experience what a school day feels like with ADHD. Runs entirely in the browser — no server, no build step, no dependencies.

---

## Pages

| Page | File | Description |
|---|---|---|
| Landing | `index.html` | Overview and entry point |
| Kinder-Simulator | `adhs-simulator-kinder.html` | 12-minute classroom simulation for ages 8–10 |
| Adult Simulator | `adhd-simulator.html` | Extended workplace simulation for teenagers and adults |
| Lehrer-Präsentation | `adhs-praesentation.html` | Slide deck for classroom use (DE) |
| Dokumentation | `dokumentation.html` | Documentation hub |
| Doku — Kinder | `doku-kinder.html` | Guide to the children's simulator |
| Doku — Erwachsene | `doku-erwachsene.html` | Guide to the adult simulator |
| Doku — Unterricht | `doku-unterricht.html` | Lesson planning and teaching notes |
| Doku — Info | `doku-info.html` | ADHD background info and DACH support organisations |

---

## Features

**Kinder-Simulator**
- Simulated school tasks: maths, reading, writing, memory
- Four ADHD phases: calm → mild → moderate → intense, plus hyperfocus
- Intrusive random thoughts and notifications that interrupt focus
- Teacher interruptions with mandatory responses
- Concentration meter that drains in real time
- Medication mode (reduces drain and distraction frequency)
- Day-form setting (well-rested / normal / tired)
- Adjustable difficulty (Leicht / Mittel / Intensiv) and duration (8 / 12 / 16 min)
- Five soundscapes (classroom, schoolyard, rain, library, silent)
- Structured debrief with reflection prompts and class discussion questions
- Result card and shareable result code for class aggregation
- OpenDyslexic font toggle (persists via `localStorage`)
- "Back to presentation" button when launched from the teacher slide deck

**Adult Simulator**
- Workplace context (open-plan office)
- Themes, language selector, calibration mode
- Same OpenDyslexic toggle, shared `localStorage` key

**Teacher Presentation**
- 15 slides covering ADHD basics, the simulation walkthrough, and debrief
- Keyboard navigation (← →) and laser pointer mode
- Direct link to the kinder simulator with `?ref=praesentation` parameter

---

## Usage

Open `index.html` in any modern browser. No installation required.

```bash
# macOS quick-start
open index.html

# or serve locally to avoid audio autoplay restrictions
npx serve .
python3 -m http.server 8080
```

> Audio autoplay is blocked by most browsers on `file://` URLs. A local server (any will do) resolves this.

---

## Accessibility

- **OpenDyslexic** font toggle on every page, persisted in `localStorage` under the key `adhs_dyslexic`
- All interactive elements are keyboard-accessible
- OKLCH colour space used throughout for perceptually uniform contrast
- Reduced-motion: animations are subtle and non-essential

---

## Disclaimer

This simulation illustrates *one possible* experience of ADHD. ADHD manifests differently in every person. It is not a diagnostic tool and makes no medical claims. Use it to build empathy, not to draw conclusions.

---

## Licence

MIT — free to use, adapt, and share with attribution.
