/**
 * SONAR STATUS widget: the station status block from the reference — the
 * green PASSIVE MODE pip line (link state), interface, route (IP), and the
 * active-ping latency readout, all from the live network snapshot.
 */
import type { RightWidgetHooks } from '../../widgets/types.ts'
import css from './NetworkStatusWidget.module.css'

/** Sonar status widget: mode + interface/route/ping readout. */
export function NetworkStatusWidget({ useNetwork }: RightWidgetHooks) {
  const network = useNetwork(s => s)
  return (
    <>
      <div className={css.modeLine}>
        <span className={css.modePip} />
        <span>{network.network.state === 'up' ? 'PASSIVE MODE' : 'STANDBY'}</span>
      </div>
      <div className={css.specLine}><span className={css.key}>ARRAY</span><span>{network.network.interfaceName}</span></div>
      <div className={css.specLine}><span className={css.key}>ROUTE</span><span>{network.network.ip ?? '—'}</span></div>
      <div className={css.specLine}><span className={css.key}>ECHO</span><span>{network.network.pingMs === null ? '—' : `${network.network.pingMs.toFixed(0)}ms`}</span></div>
    </>
  )
}
