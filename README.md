# ADHS Simulator

Ein interaktives Empathie-Werkzeug, das Schüler:innen, Eltern und Lehrkräften erfahrbar macht, wie sich ein Schultag mit ADHS anfühlt. Läuft vollständig im Browser — kein Server, kein Build-Schritt, keine Abhängigkeiten.

---

## Seiten

| Seite | Datei | Beschreibung |
|---|---|---|
| Startseite | `index.html` | Übersicht und Einstieg |
| Kinder-Simulator | `adhs-simulator-kinder.html` | 12-minütige Schulstunden-Simulation für Klasse 3/4 |
| Erwachsenen-Simulator | `adhd-simulator.html` | Ausführliche Arbeitsplatz-Simulation für Jugendliche und Erwachsene |
| Lehrer-Präsentation | `adhs-praesentation.html` | Fertige Unterrichtspräsentation (15 Folien) |
| Dokumentation | `dokumentation.html` | Dokumentations-Übersicht |
| Doku — Kinder | `doku-kinder.html` | Anleitung zum Kinder-Simulator |
| Doku — Erwachsene | `doku-erwachsene.html` | Anleitung zum Erwachsenen-Simulator |
| Doku — Unterricht | `doku-unterricht.html` | Stundenplanung und didaktische Hinweise |
| Doku — Info | `doku-info.html` | ADHS-Grundwissen und Anlaufstellen im DACH-Raum |

---

## Funktionen

**Kinder-Simulator**
- Schulaufgaben zum Mitmachen: Rechnen, Lesen, Schreiben, Merken
- Vier ADHS-Phasen: ruhig → leicht → mittel → intensiv, plus Hyperfokus
- Zufällige Gedanken und Benachrichtigungen, die die Konzentration unterbrechen
- Lehrerunterbrechungen mit Pflichtantworten
- Konzentrationsanzeige, die in Echtzeit sinkt
- Medikamenten-Modus (reduziert Abfall und Ablenkungshäufigkeit)
- Tagesform-Einstellung (gut geschlafen / normal / schlecht geschlafen)
- Einstellbare Intensität (Leicht / Mittel / Intensiv) und Dauer (8 / 12 / 16 Min.)
- Fünf Klangkulissen (Klassenzimmer, Schulhof, Regen, Bibliothek, Lautlos)
- Strukturierte Auswertung mit Reflexionsfragen und Diskussionsimpulsen
- Ergebnis-Karte und teilbarer Ergebnis-Code für die Klassen-Gesamtauswertung
- OpenDyslexic-Schriftumschalter (wird über `localStorage` gespeichert)
- „Zurück zur Präsentation"-Button, wenn die Simulation aus der Lehrerpräsentation gestartet wird

**Erwachsenen-Simulator**
- Büroarbeitsplatz-Kontext (Großraumbüro)
- Farbthemen, Sprachauswahl, Kalibrierungsmodus
- Gleicher OpenDyslexic-Schalter, gemeinsamer `localStorage`-Schlüssel

**Lehrer-Präsentation**
- 15 Folien zu ADHS-Grundlagen, Simulationsdurchführung und Auswertung
- Tastaturnavigation (← →) und Laserpointer-Modus
- Direktlink zum Kinder-Simulator mit `?ref=praesentation`-Parameter

---

## Verwendung

### Direkt im Browser

`index.html` in einem modernen Browser öffnen. Keine Installation erforderlich.

```bash
# macOS
open index.html

# Lokal servieren (empfohlen, um Audio-Autoplay-Einschränkungen zu umgehen)
npx serve .
python3 -m http.server 8080
```

> Audio-Autoplay wird von den meisten Browsern bei `file://`-URLs blockiert. Ein lokaler Server löst das Problem.

### Desktop-App (macOS / Windows)

Fertige Installationspakete stehen unter [Releases](https://github.com/thorin-eifel/adhssimulator/releases) bereit:

- **macOS Apple Silicon** → `ADHS Simulator-*-arm64.dmg`
- **macOS Intel** → `ADHS Simulator-*.dmg`
- **Windows** → `ADHS Simulator Setup *.exe`

> Da die App nicht mit einem Apple-Entwicklerzertifikat signiert ist, erscheint beim ersten Start unter macOS eine Sicherheitswarnung. Rechtsklick → „Öffnen" umgeht diese Einschränkung.

### Docker

Das offizielle Image wird bei jedem Push automatisch auf GitHub Container Registry veröffentlicht.

```bash
docker run -p 8080:80 ghcr.io/thorin-eifel/adhssimulator:latest
```

Danach im Browser öffnen: `http://localhost:8080`

**Verfügbare Tags:**

| Tag | Beschreibung |
|---|---|
| `latest` | Aktueller Stand von `main` |
| `1.0.1`, `1.0` | Versionierte Releases |

**Selbst bauen:**

```bash
git clone https://github.com/thorin-eifel/adhssimulator.git
cd adhssimulator
docker build -t adhs-simulator .
docker run -p 8080:80 adhs-simulator
```

---

## Barrierefreiheit

- **OpenDyslexic**-Schriftumschalter auf jeder Seite, gespeichert in `localStorage` unter dem Schlüssel `adhs_dyslexic`
- Alle interaktiven Elemente sind per Tastatur bedienbar
- OKLCH-Farbraum durchgehend für wahrnehmungsuniformen Kontrast
- Animationen sind dezent und nicht inhaltsentscheidend

---

## Hinweis

Diese Simulation zeigt *eine mögliche* Erfahrung mit ADHS. ADHS äußert sich bei jedem Menschen anders. Das Tool ist kein Diagnoseinstrument und erhebt keinen medizinischen Anspruch. Es soll Empathie fördern — keine Schlussfolgerungen liefern.

---

## Lizenz

MIT — kostenlos nutzbar, anpassbar und weitergabe mit Namensnennung.
