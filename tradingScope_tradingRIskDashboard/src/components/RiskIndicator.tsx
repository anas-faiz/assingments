import type { RiskIndicatorProps, RiskLevel, Thresholds } from '../utils/types';
import Card from './Card';
import LimitBar from './LimitBar';
import StatusPill from './StatusPill';

function levelForUsage(pct: number, thresholds: Thresholds): RiskLevel {
  if (pct >= thresholds.atRisk) return 'at_risk';
  if (pct >= thresholds.approaching) return 'approaching';
  return 'safe';
}

const BORDER_COLOR = {
  safe: 'var(--color-safe)',
  approaching: 'var(--color-approaching)',
  at_risk: 'var(--color-at-risk)',
};

export default function RiskIndicator({ drawdown, dailyLoss, riskStatus, thresholds, maxDrawdown, dailyLossLimit }: RiskIndicatorProps) {
  return (
    <Card
      eyebrow="Rule Compliance"
      title="Am I in danger of violating my account rules?"
      className="border-l-[3px]"
      style={{ borderLeftColor: BORDER_COLOR[riskStatus.level] }}
    >
      <div className="flex items-center justify-between mb-6 -mt-1">
        <p className="text-sm text-ink-secondary max-w-md">
          Measured against the two hard limits on this account: max drawdown from your
          peak balance, and today&apos;s realized loss.
        </p>
        <StatusPill level={riskStatus.level} label={riskStatus.label} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <LimitBar
          label="Drawdown from peak"
          used={drawdown.currentDrawdown}
          remaining={drawdown.remainingDrawdown}
          limit={maxDrawdown}
          usagePct={drawdown.usagePct}
          level={levelForUsage(drawdown.usagePct, thresholds)}
        />
        <LimitBar
          label="Today's realized loss"
          used={dailyLoss.currentDayLoss}
          remaining={dailyLoss.remainingDailyLoss}
          limit={dailyLossLimit}
          usagePct={dailyLoss.usagePct}
          level={levelForUsage(dailyLoss.usagePct, thresholds)}
        />
      </div>
    </Card>
  );
}
