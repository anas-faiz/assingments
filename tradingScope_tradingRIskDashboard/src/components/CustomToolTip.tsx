import type { TooltipContentProps } from 'recharts';
import { currency } from '../utils/constants';

export interface EquityPoint {
  step: number;
  label: string;
  balance: number;
  pnl: number;
}

export default function CustomTooltip({
  active,
  payload,
}: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload as EquityPoint;

  return (
    <div className="bg-surface-2 border border-border-strong rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-ink-muted mb-1">{point.label}</p>

      <p className="font-mono text-sm text-ink-primary font-medium">
        {currency(point.balance)}
      </p>

      {point.pnl !== 0 && (
        <p
          className={`font-mono text-xs ${
            point.pnl > 0 ? 'text-safe' : 'text-at-risk'
          }`}
        >
          {point.pnl > 0 ? '+' : ''}
          {currency(point.pnl)}
        </p>
      )}
    </div>
  );
}