import type { LimitBarProps } from "../utils/types";

const currency = (n : number) =>
  Math.abs(n).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

function LimitBar({ label, used, remaining, limit, usagePct, level }: LimitBarProps) {
  const barColor =
    level === 'at_risk' ? 'bg-at-risk' : level === 'approaching' ? 'bg-approaching' : 'bg-safe';

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm text-ink-secondary">{label}</span>
        <span className="font-mono text-sm text-ink-primary tabular-nums">
          {currency(used)} <span className="text-ink-muted">/ {currency(limit)}</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${Math.min(usagePct, 100)}%` }}
        />
      </div>
      <p className="text-xs text-ink-muted mt-1.5 font-mono">
        {currency(remaining)} remaining before this limit is hit
      </p>
    </div>
  );
}

export default LimitBar;