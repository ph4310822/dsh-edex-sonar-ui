# Changelog

## 0.1.0 (2026-09-09)

Initial release — **SONAR STATION**, the eDEX-UI shell themed as a submarine
sonar station from the [Silent Abyss](https://idgmatrix.github.io/silent-abyss/)
reference.

- Shell: near-black blue-teal canvas `#060B10` with scanline texture, widget
  cards `1px #2C4853` rules at 0px radius with `#18222A` title bands and
  brighter top edges, pale cyan `#8ED5DF` phosphor accents
- Featured widget: **TACTICAL SONAR** scope replacing the WORLD VIEW globe —
  range rings, bearing spokes, rotating turquoise sweep (symmetric-bbox pivot),
  teal-green/cyan/amber contact markers, own-ship icon
- Matched widgets: MAIN DRIVE CONTROL (`cpu`), TARGET ACOUSTIC INTEL (`info`),
  CONTACT REGISTRY (`processes`), SONAR STATUS (`network-status`),
  BROADBAND WATERFALL (`traffic`)
- Workspace: original DSH UI presented in the framed `SONAR WORKSPACE` center
  region, recolored via alias-token overrides to the same palette
- Opt-in Appearance theme (Settings → SONAR STATION) with the same sonar
  palette as alias-token overrides
- Theme color setting drives the whole palette (`paletteFor`/`tone`); semantic
  accents stay fixed (BTR green, DEMON amber, ping red, waterfall blue)

Published packages: `@danielng23/dsh-edex-sonar-ui`,
`@danielng23/dsh-sonar-client-ui-edex`,
`@danielng23/dsh-sonar-client-ui-theme-terminal`,
`@danielng23/dsh-sonar-host-system-metrics` — all `0.1.0`.
