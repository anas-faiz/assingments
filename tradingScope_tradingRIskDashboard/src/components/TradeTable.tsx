import { currency } from '../utils/constants';
import type { TradeTableProps } from '../utils/types';
import Card from './Card';


export default function TradeTable({ trades }: TradeTableProps) {
  return (
    <Card eyebrow="Trade Log" title="Individual trades">
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm min-w-[360px]">
          <thead>
            <tr className="text-left text-ink-muted text-xs uppercase tracking-wide">
              <th className="font-medium px-1 pb-3">Trade</th>
              <th className="font-medium px-1 pb-3">Asset</th>
              <th className="font-medium px-1 pb-3">Direction</th>
              <th className="font-medium px-1 pb-3 text-right">P&amp;L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => {
              const positive = t.pnl >= 0;
              return (
                <tr key={t.id} className="border-t border-border">
                  <td className="px-1 py-3 text-ink-primary font-medium">{t.label}</td>
                  <td className="px-1 py-3 text-ink-secondary font-mono">{t.asset}</td>
                  <td className="px-1 py-3 text-ink-secondary">{t.direction}</td>
                  <td
                    className={`px-1 py-3 text-right font-mono font-medium tabular-nums ${
                      positive ? 'text-safe' : 'text-at-risk'
                    }`}
                  >
                    {positive ? '+' : ''}
                    {currency(t.pnl)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
