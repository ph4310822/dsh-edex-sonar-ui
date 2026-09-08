# Analysis — SONAR (silent-abyss submarine sonar station)

**Reference**: web — https://idgmatrix.github.io/silent-abyss/ ("submarine sonar station", query "sonar visualization web app dark theme"), captured to `reference-shot.png` (1600×900).
**Method**: `vision_glance` (gpt-5.5 via `scripts/vision-call-file.sh` — native vision tools 503'd, 5-retry rule honored) + `vision_dominant_colors` on 6 regions + pixel-exact BMP measurement (`scripts/analyze-ui.py`, `scripts/measure-accent2.py`, targeted pixel scans).

## Layout

- **Command bar** (full width, ~12% height): `SILENT ABYSS // TACTICAL` station title, maneuver controls (left), propulsion controls (center), visualization toggles + SONAR STATUS `PASSIVE MODE` + mission timer (right).
- **Left column (~25%)**: MAIN DRIVE CONTROL, TARGET ACOUSTIC INTELLIGENCE, LOFAR (NARROWBAND FREQUENCY), DEMON (PROPELLER SIGNATURE).
- **Center column (~50%)**: large tactical 3D sonar view (perspective wireframe grid, own-ship icon, green/cyan contact markers, circular compass top-right), WATER COLUMN depth gauge docked right, BTR (BEARING TIME RECORDER) below.
- **Right column (~25%)**: CONTACT REGISTRY, MANUAL SOLUTION, CAMPAIGN, BROADBAND WATERFALL (AMBIENT).

## Theme

| Token | Value | Evidence |
|---|---|---|
| background (canvas) | `#060B10` | page gutters measured `#02070C`–`#070D12`; canvas darker than panels (inverse of typical dashboards); scanline + dotted-noise texture |
| panelTone (card fill) | `#141F26` | left `#161F26`, center `#121F23`, right `#172129` |
| title band | `#18222A` | measured fill below the 1px top rule |
| primaryAccent (phosphor cyan) | `#8ED5DF` | label modal `#7AC0C7`, bright `#A9D6DC` — bracket contains it |
| secondaryAccent | `#4E929B` | dim cyan-gray-teal |
| textPrimary | `#C9D6D8` | pale softened-white readings |
| textSecondary | `#5C7684` | muted gray-teal captions |
| success (green) | `#03E877` | BTR lines bright avg (modal `#07F00A`); contact markers use a separate teal-green `#22D083` inside the scope |
| warn (amber) | `#FACD78` | DEMON modal |
| error (red) | `#E54344` | left-col ping top-avg (right-col buttons `#D66566`–`#EB6D6E`) |
| info (blue) | `#74CEFF` | broadband waterfall (modal `#83DAFF`) |
| glow | `#00E6D0` | bright turquoise active traces / selected modes, subtle |

## Border language

- **Cards/widgets** (`borderFeatures.cards`): **full** rectangles, `1px solid #2C4853`, **0px radius**, no chrome glow. Exact single-pixel border runs measured at three independent edges (`#304C55`, `#2C4853`, `#2C4751`). Title strip `#18222A` (~24px) with a **brighter top-edge accent** and hairline `#22323C` separator; titles are tiny uppercase tracked mono in pale cyan.
- **Frame** (`borderFeatures.frame`): panels sit on the near-black canvas with 4–8px gutters; the same 1px `#2C4853` rule closes each panel — treatment lives at the **per-widget card level**, panel cells stay canvas.
- **Dividers**: `1px #22323C` hairlines between data groups/rows.
- **Inputs**: square 1px `#2C4853` outlined controls, dark `#0F151E` fills; selected/checked take `#00E6D0`/`#74CEFF`.
- **Active indicators**: `partial-top`, 2px brighter cyan-teal top/edge emphasis (`#00E6D0`), not left bars.
- **Glow**: subtle, plot content only (traces/markers), never card chrome.

## Widget reconciliation

- Matched (replace with reference-styled implementation, same hooks): MAIN DRIVE CONTROL→`cpu`, TARGET ACOUSTIC INTELLIGENCE→`info`, CONTACT REGISTRY→`processes`, SONAR STATUS→`network-status`, BROADBAND WATERFALL→`traffic`.
- Unmatched (left as-is): LOFAR, DEMON, WATER COLUMN, BTR, CAMPAIGN, MANUAL SOLUTION.
- **Featured**: **TACTICAL SONAR** — the tactical 3D sonar scope (perspective rings/grid, rotating bearing sweep, teal-green `#22D083` + cyan contact markers, own-ship icon, compass ring, scanline texture) replaces the `WORLD VIEW` globe.
