import type { StatProps } from "../utils/types";

export default function Stat({ label, value, tone = 'default' }: StatProps) {
  const toneClass =
    tone === 'positive' ? 'text-safe' : tone === 'negative' ? 'text-at-risk' : 'text-ink-primary';

  return (
    <div>
      <p className="text-xs text-ink-muted mb-1.5">{label}</p>
      <p className={`font-mono text-xl font-semibold tabular-nums ${toneClass}`}>{value}</p>
    </div>
  );
}
