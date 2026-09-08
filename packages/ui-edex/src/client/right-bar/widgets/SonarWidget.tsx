/**
 * TACTICAL SONAR widget: the sonar-station scope from the reference — a
 * near-black teal plot field with perspective range rings, bearing spokes,
 * a rotating turquoise sweep, teal-green/cyan/amber contact markers, and a
 * pale own-ship icon at the center, plus a one-line contact readout.
 * Static/sample content (the reference's markers are scenario contacts, not
 * host data), per the analysis's featured-widget decision.
 */
import { Fragment } from 'react'
import type { JSX } from 'react'
import type { RightWidgetHooks } from '../../widgets/types.ts'
import css from './SonarWidget.module.css'

/** Sample contacts: bearing (deg) / range (0..1 of max ring) / tone. */
const CONTACTS: readonly { brg: number; rng: number; tone: 'green' | 'cyan' | 'amber' }[] = [
  { brg: 47, rng: 0.62, tone: 'green' },
  { brg: 128, rng: 0.38, tone: 'cyan' },
  { brg: 213, rng: 0.78, tone: 'green' },
  { brg: 305, rng: 0.5, tone: 'amber' },
]

const SIZE = 320
const C = SIZE / 2
const RMAX = C - 14

/** Polar helper: bearing degrees (0 = up, clockwise) + range 0..1 → x/y. */
function polar(brg: number, rng: number): { x: number; y: number } {
  const rad = ((brg - 90) * Math.PI) / 180
  return { x: C + Math.cos(rad) * RMAX * rng, y: C + Math.sin(rad) * RMAX * rng }
}

/** The tone → SVG color mapping (the analysis's scope tones). */
function toneColor(tone: 'green' | 'cyan' | 'amber'): string {
  if (tone === 'green') return '#22d083'
  if (tone === 'amber') return '#facd78'
  return '#74ceff'
}

/** The rotating sweep: a 60° turquoise wedge fading to transparent plus a
 *  bright leading edge line. Rotates about the disc center (view-box origin
 *  — the bounding box is the full square, so the pivot is symmetric). */
function Sweep(): JSX.Element {
  const edge = polar(0, 1)
  return (
    <g className={css.sweep}>
      {/* Invisible full-radius circle: makes the rotating group's bounding
          box symmetric about the disc center, so the sweep pivots exactly
          about the scope center (the MECHA-validated symmetric-bbox rule). */}
      <circle cx={C} cy={C} r={RMAX} fill="none" opacity={0} />
      <path
        d={`M ${C} ${C} L ${C + RMAX} ${C} A ${RMAX} ${RMAX} 0 0 0 ${C + RMAX * Math.cos((-60 * Math.PI) / 180)} ${C + RMAX * Math.sin((-60 * Math.PI) / 180)} Z`}
        fill="url(#sonar-sweep-fill)"
      />
      <line x1={C} y1={C} x2={edge.x} y2={edge.y} stroke="#00e6d0" strokeWidth="1.5" opacity="0.9" />
    </g>
  )
}

/** The TACTICAL SONAR scope: rings, spokes, sweep, contacts, own ship. */
export function SonarWidget(_hooks: RightWidgetHooks) {
  return (
    <>
      <div className={css.scopeHost} data-testid="edex-sonar-scope">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Tactical sonar scope">
          <defs>
            <radialGradient id="sonar-field" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#0c1a20" />
              <stop offset="100%" stopColor="#060e12" />
            </radialGradient>
            <linearGradient id="sonar-sweep-fill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00e6d0" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00e6d0" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Plot field */}
          <circle cx={C} cy={C} r={RMAX} fill="url(#sonar-field)" stroke="#2c4853" strokeWidth="1" />
          {/* Range rings (perspective: compressed toward the rim) */}
          {[0.3, 0.55, 0.75, 0.9, 1].map(r => (
            <circle
              key={r}
              cx={C}
              cy={C}
              r={RMAX * r}
              fill="none"
              stroke="#2c4853"
              strokeOpacity={r === 1 ? 0.9 : 0.5}
              strokeWidth="1"
            />
          ))}
          {/* Bearing spokes every 45° */}
          {Array.from({ length: 8 }, (_, i) => {
            const spoke = polar(i * 45, 1)
            return <line key={i} x1={C} y1={C} x2={spoke.x} y2={spoke.y} stroke="#22323c" strokeWidth="1" />
          })}
          {/* Bearing tick marks on the rim (every 15°) */}
          {Array.from({ length: 24 }, (_, i) => {
            const a = ((i * 15 - 90) * Math.PI) / 180
            const inner = C + Math.cos(a) * (RMAX - 4)
            const outer = C + Math.cos(a) * RMAX
            return (
              <line
                key={`t${i}`}
                x1={inner}
                y1={C + Math.sin(a) * (RMAX - 4)}
                x2={outer}
                y2={C + Math.sin(a) * RMAX}
                stroke="#4e929b"
                strokeWidth="1"
              />
            )
          })}
          {/* N/E/S/W bearing letters */}
          {[
            { label: 'N', brg: 0 }, { label: 'E', brg: 90 }, { label: 'S', brg: 180 }, { label: 'W', brg: 270 },
          ].map(({ label, brg }) => {
            const p = polar(brg, 1.11)
            return (
              <text
                key={label}
                x={p.x}
                y={p.y + 3}
                textAnchor="middle"
                fontSize="9"
                fill="#8ed5df"
                opacity="0.85"
                style={{ letterSpacing: '1px' }}
              >
                {label}
              </text>
            )
          })}
          {/* Rotating sweep */}
          <Sweep />
          {/* Contact markers: halo (blinking) + dot, direct SVG children so
              the scope svg is their clipping parent */}
          {CONTACTS.map((contact, index) => {
            const p = polar(contact.brg, contact.rng)
            const color = toneColor(contact.tone)
            const halo = index === 0 ? css.haloA : index === 1 ? css.haloB : index === 2 ? css.haloC : undefined
            return (
              <Fragment key={`${contact.brg}-${index}`}>
                {halo !== undefined && <circle className={halo} cx={p.x} cy={p.y} r={7} fill="none" stroke={color} strokeWidth="1" />}
                <circle cx={p.x} cy={p.y} r={2.5} fill={color} />
              </Fragment>
            )
          })}
          {/* Own ship: pale diamond + bow tick at the center */}
          <g>
            <path
              d={`M ${C} ${C - 7} L ${C + 5} ${C} L ${C} ${C + 7} L ${C - 5} ${C} Z`}
              fill="#c9d6d8"
              opacity="0.92"
            />
            <line x1={C} y1={C - 7} x2={C} y2={C - 12} stroke="#c9d6d8" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
      <div className={css.readout}>
        <span>BRG 047</span>
        <span>RNG 6.2<span>k</span></span>
        <span>CLASS <b>SUBMERGED</b></span>
        <span>TRACK #04</span>
      </div>
    </>
  )
}
