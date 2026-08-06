import { currency } from '../utils/constants';
import type { StatsGridProps } from '../utils/types';
import Card from './Card';
import Stat from './Stat';
;

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <Card eyebrow="Trading Performance" title="This account, in numbers">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
        <Stat label="Winning trades" value={stats.winningTrades} tone="positive" />
        <Stat label="Losing trades" value={stats.losingTrades} tone="negative" />
        <Stat label="Win rate" value={`${stats.winRate.toFixed(0)}%`} />
        <Stat
          label="Largest win"
          value={stats.largestWin ? `+${currency(stats.largestWin.pnl)}` : '—'}
          tone="positive"
        />
        <Stat
          label="Largest loss"
          value={stats.largestLoss ? currency(stats.largestLoss.pnl) : '—'}
          tone="negative"
        />
        <Stat
          label="Total P&L"
          value={`${stats.totalPnl >= 0 ? '+' : ''}${currency(stats.totalPnl)}`}
          tone={stats.totalPnl >= 0 ? 'positive' : 'negative'}
        />
      </div>
    </Card>
  );
}
