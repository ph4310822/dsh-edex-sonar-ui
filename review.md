# Review — SONAR (dsh-edex-ui-sonar)

**Verdict: PASS** (probe + vision compare + granularity zooms + workspace checks + animation probe + GIF all pass; 1 retry used for the animation pivot/extent fix)

**Reference**: web — https://idgmatrix.github.io/silent-abyss/ (submarine sonar station), captured `reference-shot.png` (1600×900).
**Boot**: DSH_HOME=/tmp/sonar-dsh redirect, profile `sonar-scratch`, port **3085** (3084 untouched — user's live server).

## Computed-style match (probe, review-raw.json)

| Token | Target (analysis) | Rendered | Match |
|---|---|---|---|
| `--edex-green` (accent) | `#8ED5DF` | `#8ed5df` | ✅ |
| `--edex-border` | `#2C4853` family | `#22494f` (derived L22 of accent — same family) | ✅ |
| `--edex-panel-2` (card fill) | `#141F26` family | `#152628` (derived L12 — same family) | ✅ |
| `--dsw-alias-label-primary` | `#8ED5DF` | `#8ed5df` | ✅ |
| `--dsw-alias-border-l1` | `#2C4853` family | `#22494f` | ✅ |
| `bodyBackground` | card surface (not black) | `rgb(21,38,40)` = `#152628` = panel-2 | ✅ workspace shares the card surface |

- Console errors: **0**. Page errors: **0**.
- `worldViewGone`: **true** (no `edex-world-view`); `widgetIds` includes **`sonar`** (the featured slot) + info/cpu/processes/network-status/traffic/files/preview/terminal/center.

## Visual comparison (vision)

- Two-image `vision_glance` (gpt-5.5, staged-file transport): **PASS** on all four questions — same near-black blue-teal family with pale-cyan phosphor accents; same thin 1px blue-gray rules with 0 radius and title bands; center shows the working app UI framed by a "SONAR WORKSPACE" title bar; circular sonar scope present in the right column, no globe/world map.
- `vision_pixel_diff`: **9.15%** overall difference (reference is a far denser instrument screen with 11 panels + 8 canvases; the shell is a 10-widget frame around a real workspace). Worst regions are the bottom-right terminal/prompt areas and left-column content — content differences, not palette/border divergence.

## Granularity check (per-element)

- **Left column crop**: 5 distinct card boxes, each a **full thin blue-teal rectangle** (no brackets), ~0–2px radius, **uppercase mono title band** at top, ~15px gaps between cards — matches `borderFeatures.cards` (full / 1px / `#2C4853` family / 0px / floating gaps) at the per-widget `WidgetSection` level. The red `ACTIVE PULSE (PING)` strip renders as the inset high-consequence status area inside MAIN DRIVE CONTROL, per the reference.
- **Right column crop**: 3 complete cards (SONAR STATUS, TACTICAL SONAR, BROADBAND WATERFALL) with the same full thin border + title band + gaps; the TACTICAL SONAR card contains the circular scope (rings, spokes, turquoise sweep, contact dots, N/E/S/W labels); **no globe/world map** — the featured replacement rendered.
- **Center crop**: sidebar visible left, conversation area, composer at bottom; `SONAR WORKSPACE` title strip present with a 1px framing border; **no occlusion**; background reads as the same dark surface (computed transparent center section + shared panel-2 body background).

## Workspace-present check (mandatory)

- `workspacePresent` **true** — sidebar `[data-slot="sidebar"]`, conversation `[data-conversation-scroll]`, composer `[data-composer-card]` all in DOM.
- Center `WidgetSection`: `background: rgba(0,0,0,0)`, `border: 0px none`, `margin: 0px` — the card chrome never leaked onto the workspace; the chrome (`.centerWidget` 1px border + `.centerTitle` 19px strip) lives on the container, and the reshaped frame is inset 20px below the strip (`CENTER_TITLE_INSET`), so nothing is covered.

## Animation Verification (Generic)

Static inventory (grep): `sonar-sweep` (6s linear rotate, `.sweep` `<g>`, `transform-box: view-box; transform-origin: 50% 50%` — bbox made symmetric by an invisible full-radius circle), 3× `sonar-blink` (2.2s opacity halos, staggered 0.7s), `sonar-ping` (2s opacity dot). All transform/opacity-only.

Runtime (`probe-animation.mjs`, after 1 retry):
- Attempt 1 FAIL: sweep AABB center drifted 167px (asymmetric rotating bbox — the documented SCANNER/FROST bug); blink halos nested in `<g>` didn't resolve a clipping parent for the extent check.
- Fix: added the invisible full-radius circle inside the rotating `<g>` (symmetric-bbox rule); halos hoisted to direct SVG children.
- Attempt 2: **PASS** — 5 animations (1 sweep rotation + 3 blinks + 1 ping dot), all `running`, sweep rate 60°/s ≈ 360°/6s (rateOk), pivot drift within tolerance (pivotOk), extent contained (extentOk), `reducedMotion: false`, **0 console errors**.

## GIF

`record-gif.mjs` → `preview.gif` (4.0s @ 12fps, 562 KB, **0 errors** during capture). Sweep rotation and marker blinks visible in the preview.

## Divergences (documented)

- The reference is a purpose-built sonar simulator with 11 dense panels; the shell reproduces its **theme language** (palette, 1px blue-gray card rules, title bands, scanlines, semantic green/amber/red/blue) and its **signature scope** as the featured widget — unmatched reference panels (LOFAR, DEMON, WATER COLUMN, BTR, CAMPAIGN, MANUAL SOLUTION) have no eDEX hook counterparts and are represented by the palette + the featured scope instead, per the analysis `widgets.matches` (all `partial`).
- Data-driven widgets (drive control, contact registry, waterfall) render live host telemetry in the reference's visual grammar rather than simulated sonar data — the standard hooks contract.
