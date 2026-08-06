import { currency } from '../utils/constants';
import type { AccountHeaderProps } from '../utils/types';
import StatusPill from './StatusPill';

export default function AccountHeader({ account, stats, riskStatus }: AccountHeaderProps) {
  const pnlPositive = stats.totalPnl >= 0;

  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[11px] tracking-[0.14em] uppercase text-ink-muted font-mono mb-2">
          Tradescape · Evaluation Account
        </p>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="font-mono text-4xl md:text-5xl font-semibold text-ink-primary tabular-nums">
            {currency(stats.currentBalance)}
          </h1>
          <span
            className={`font-mono text-lg md:text-xl font-medium tabular-nums ${
              pnlPositive ? 'text-safe' : 'text-at-risk'
            }`}
          >
            {pnlPositive ? '+' : ''}
            {currency(stats.totalPnl)}
          </span>
        </div>
        <p className="text-ink-secondary text-sm mt-2">
          Started at {currency(account.startingBalance)} · current balance shown live
        </p>
      </div>

      <StatusPill level={riskStatus.level} label={riskStatus.label} size="lg" />
    </header>
  );
}
