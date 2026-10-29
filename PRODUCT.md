# Product

<!-- impeccable:product-schema 1 -->

> Aus README, TECHNICAL.md und Projektentscheidungen abgeleitet, nicht per Interview bestätigt. Mit `/impeccable init` prüfen und ergänzen.

## Platform

web (zusätzlich als Electron-Desktop-App und Docker/nginx-Image verpackt)

## Stack

Statisches HTML/CSS/JS, kein Build-Schritt, keine Laufzeit-Abhängigkeiten. Kinder-Simulator: eine HTML-Datei plus 58 nummerierte `js/*.js`-Module. Erwachsenen-Simulator und Präsentation sind einzelne HTML-Dateien. Gemeinsame Basis in `assets/` (Tokens, Schriften, Icons, Audio). Muss ohne Netz und auch über `file://` laufen.

## Users

- Schüler:innen der Klasse 3/4, die den Kinder-Simulator im Unterricht erleben.
- Lehrkräfte, die Simulation, Präsentation und Dokumentation für den Unterricht, Elternabende und Fortbildungen einsetzen (Beamer, Tablets, Schul-Rechner).
- Jugendliche, Erwachsene und Eltern, die den ausführlichen Erwachsenen-Simulator zur Selbsterfahrung nutzen.

## Product Purpose

Empathie-Werkzeug: macht erfahrbar, wie sich ein Schultag oder Arbeitstag mit ADHS anfühlt. Ziel ist weder Diagnose noch Vereinfachung, sondern ein Moment des Verstehens, mit Auswertung und Gesprächsimpulsen für das Klassengespräch.

## Positioning

Erleben statt Erklären: echte Aufgaben, Ablenkungen und Unterbrechungen statt Informationstext, dazu fertiges Unterrichtsmaterial. Läuft komplett im Browser, kostenlos, ohne Anmeldung, ohne Datenübertragung.

## Constraints

- Sprache: Deutsch (Kinder-Simulator, Präsentation, Doku); Erwachsenen-Simulator mehrsprachig.
- Barrierefreiheit: OpenDyslexic-Lesehilfe (Schalter in `localStorage`, Schlüssel `adhs_dyslexic`), `prefers-reduced-motion` beachten, Ton abschaltbar, Simulation pausier- und abbrechbar.
- Thema ist sensibel: keine Vergleiche, keine Beschämung, Hinweis auf individuelle Unterschiede bleibt sichtbar. Die Simulation darf Kinder nicht überfordern.
- Schriften und Medien sind lokal eingebunden, keine externen Anfragen zur Laufzeit.

## Brand commitments

Ruhiger, warmer Ton, teal-blaue Palette, Merriweather (Überschriften) und Nunito Sans (Text). Hintergrund-Orbs bleiben sehr dezent (Opazität höchstens 0.10).
