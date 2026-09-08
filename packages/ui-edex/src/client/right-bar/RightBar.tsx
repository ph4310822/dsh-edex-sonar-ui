/**
 * Right bar: a vertical stack of swappable sonar-station widgets — sonar
 * status, the tactical sonar scope, and the broadband waterfall. The
 * composition lives in the RIGHT_WIDGETS registry below: add, remove, or
 * reorder a widget by editing one line (its implementation lives in its own
 * folder under widgets/), and every section shares the same chrome via
 * WidgetSection.
 */
import type { RightWidgetHooks, RightWidgetSlot } from '../widgets/types.ts'
import { WidgetSection } from '../widgets/WidgetSection.tsx'
import { SonarWidget } from './widgets/SonarWidget.tsx'
import { NetworkStatusWidget } from './widgets/NetworkStatusWidget.tsx'
import { TrafficWidget } from './widgets/TrafficWidget.tsx'
import css from './RightBar.module.css'

/** The right panel's widget composition (top to bottom). */
const RIGHT_WIDGETS: RightWidgetSlot[] = [
  { id: 'network-status', title: 'SONAR STATUS', Component: NetworkStatusWidget },
  // Compact padding so the square sonar scope fills more of the bar.
  { id: 'sonar', title: 'TACTICAL SONAR', compact: true, Component: SonarWidget },
  // Flex-fills the bar's leftover height (screen − bottom panel − other sections).
  { id: 'traffic', title: 'BROADBAND WATERFALL', fill: true, Component: TrafficWidget },
]

/** The right column content (rendered inside the eDEX shell's right bar). */
export function RightBar({ useNetwork, color }: RightWidgetHooks) {
  return (
    <div className={css.panel} data-testid="edex-right-bar">
      {RIGHT_WIDGETS.map(widget => (
        <WidgetSection key={widget.id} slot={widget}>
          <widget.Component useNetwork={useNetwork} color={color} />
        </WidgetSection>
      ))}
    </div>
  )
}