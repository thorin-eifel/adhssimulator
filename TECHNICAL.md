# Technical Documentation

## Architecture

Pure static HTML/CSS/JS. No framework, no bundler, no package.json. Every page is a self-contained file that can be opened directly in a browser or served from any static host (GitHub Pages, Netlify, a USB stick).

```
adhs-simulator-kinder.html   ← main simulator shell (HTML + CSS)
adhs-simulator-kinder.css    ← simulator styles (imported via <link>)
js/00-state.js … js/57-*.js  ← 58 numbered module files (loaded with defer)
adhd-simulator.html          ← adult simulator (self-contained monolith)
adhs-praesentation.html      ← presentation (self-contained monolith)
doku.css / doku.js           ← shared styles/script for all doku pages
*.mp3                        ← ambient audio assets
```

---

## Kinder-Simulator — JS module system

The simulator is split into 58 small files in `js/`, each loaded with `<script defer>` in numeric order. They share a single global scope — there is no module system or bundler. The load order defines the dependency order.

| Range | Concern |
|---|---|
| `00` | Global state variables |
| `01` | Translation strings (`T` object, `de`/`en`) |
| `02` | Task pool (all task definitions) |
| `03` | Sound engine (`SFX` object) |
| `04` | Timer manager (`TM` object) |
| `05–06` | Task renderers (MC tasks, memory tasks) |
| `07–08` | Answer checkers |
| `09–11` | UI updaters (countdown, focus dots, concentration meter) |
| `12` | Focus drain loop |
| `13–16` | Coping system (show prompt, use, dismiss, defer) |
| `17–18` | Thought and notification spawners |
| `19–21` | Teacher interruption system |
| `22–25` | Hyperfocus (trap / release focus, start / end) |
| `26–27` | Day-note system |
| `28` | Teacher panel view |
| `29–30` | Pause / mute toggles |
| `31–34` | Simulation start sequence (start → countdown → ADHD transition → launch) |
| `35` | Main tick (runs every second) |
| `36` | End simulation |
| `37–39` | Mood check (show, select, skip) |
| `40–42` | Debrief builder and reveal |
| `43` | Restart |
| `44` | Duration selector |
| `45–47` | Result encoding / decoding / copy |
| `48–52` | Result card, aggregate view, link copy, code parser |
| `53` | UI helpers (`show()`, `t()`) |
| `54` | Language setter |
| `55` | Init (keyboard shortcuts, startup) |
| `56` | OpenDyslexic toggle |
| `57` | Back-to-presentation button visibility |

---

## State machine

Global variable `phase` drives the simulation:

```
'welcome' → 'baseline' → 'calm' → 'mild' → 'moderate' → 'intense' → 'debrief'
```

Hyperfocus is a transient overlay state (`hyperfocusActive = true`) that can occur within `calm`/`mild`/`moderate`. Medication mode reduces drain multipliers and extends phase transition times.

Phase transitions are scheduled via `setTimeout` using offsets from `DIFF_CFG`:

```js
const DIFF_CFG = {
  leicht:   { drainMul: .45, phaseAt: [210000, 450000, 640000], … },
  mittel:   { drainMul: 1.0, phaseAt: [110000, 290000, 530000], … },
  intensiv: { drainMul: 1.6, phaseAt: [55000,  165000, 350000], … },
};
```

---

## Sound engine (`SFX`)

Two-layer audio system:

1. **Background loop** — HTML5 `<audio>` element, one of four MP3s or procedural ambient pings via WebAudio
2. **Chaos overlay** — `bg-classroom-chaos.mp3` cross-fades in during intense phase via `SFX.startChaos()` / `SFX.stopChaos()`
3. **UI feedback** — WebAudio API synthesised tones: `sfxCorrect()`, `sfxWrong()`, `sfxPhase()`, `sfxFidget()`
4. **Speech** — `SpeechSynthesisUtterance` for teacher voice lines

Audio files:

| File | Used for |
|---|---|
| `bg-classroom.mp3` | Default classroom ambience |
| `bg-classroom-chaos.mp3` | Intense-phase chaos layer |
| `bg-schoolyard.mp3` | Schoolyard soundscape option |
| `bg-library.mp3` | Library soundscape option |
| `bg-rain.mp3` | Rain soundscape option |
| `airport.mp3` · `coffeeshop.mp3` · `industrial.mp3` · `park.mp3` · `shoppingmall.mp3` · `subway.mp3` | Adult simulator environments |

---

## CSS approach

All pages use [OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) for colour — perceptually uniform, easy to lighten/darken by adjusting `L` only.

**Core palette** (defined as CSS variables in `:root`):
```css
--ctw-900: oklch(0.30 0.045 210)   /* near-black teal — headings */
--ctw-700: oklch(0.42 0.055 210)   /* dark teal — body text, links */
--ctw-500: oklch(0.52 0.04  210)   /* muted teal */
--ctw-300: oklch(0.72 0.03  210)   /* light teal */
```

**Glass morphism** recipe used on all cards:
```css
background: linear-gradient(180deg, rgba(255,255,255,.78), rgba(255,255,255,.52));
backdrop-filter: blur(24px) saturate(160%);
border: 1px solid rgba(255,255,255,.7);
box-shadow: var(--shadow-glass);
```

**Background orbs**: `position:fixed` pseudo-elements with `border-radius:50%`, `filter:blur(70px)`, opacity ≤ 0.10.

---

## Shared doku pages

`doku.css` and `doku.js` are loaded by all five documentation pages (`dokumentation.html`, `doku-kinder.html`, `doku-erwachsene.html`, `doku-unterricht.html`, `doku-info.html`).

`doku.js` exposes a single global function `toggleDyslexia()` and reads/writes the shared `adhs_dyslexic` key.

---

## localStorage keys

| Key | Pages | Values |
|---|---|---|
| `adhs_dyslexic` | All pages | `'1'` / `'0'` |
| `lg_kinder_theme` | Kinder simulator | theme name string |
| `adhd_theme` | Adult simulator | theme name string |

All reads/writes are wrapped in `try/catch` to handle private-browsing restrictions gracefully.

---

## URL parameters

| Parameter | Page | Effect |
|---|---|---|
| `?ref=praesentation` | `adhs-simulator-kinder.html` | Shows "Zurück zur Präsentation" button in debrief |
| `#aggregate` | `adhs-simulator-kinder.html` | Opens class aggregate view directly on load |
| `#<n>` | `adhs-praesentation.html` | Jumps to slide `n` (1-indexed) on load |

---

## Translation system

`js/01-translations.js` defines a `T` object keyed by language code (`de`, `en`). All UI strings are accessed via `T[lang].key`. The active language is stored in the global `lang` variable and switched with `setLang()` (`js/54-set-lang.js`).

To add a new language: add a matching key block to `T` in `01-translations.js` and add a button to the language selector UI.

---

## Result codes

Results are encoded as a compact base64-ish string by `js/45-encode-result.js` and decoded by `js/46-decode-result.js`. The string encodes:

- Score / tasks completed
- Focus values over time
- Phase durations
- Mood selection
- Settings used (difficulty, medication, day-form)

Multiple codes can be pasted into the class aggregate view (`js/52-parse-agg-codes.js`) to visualise whole-class results.

---

## Extending the simulator

**Add a task type**: add an entry to the task pool in `js/02-pool.js`, add a renderer in a new `js/05-*` file, and add an answer checker in a new `js/07-*` file.

**Add a soundscape**: add an MP3 to the root, register it in `_BG_MP3` in `js/03-sfx.js`, and add a button in the settings panel.

**Add a documentation page**: copy an existing `doku-*.html`, update the topbar label, link it from `dokumentation.html`.

---

## Deployment

The project is a static site — drop the files on any host:

```bash
# GitHub Pages (already set up via this repo)
# Netlify / Vercel: point root to /
# Local:
npx serve .
```

No environment variables, no secrets, no API calls. All data stays in the user's browser.
