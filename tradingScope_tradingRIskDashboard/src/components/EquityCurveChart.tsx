import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import Card from './Card';
import { currency } from '../utils/constants';
import CustomTooltip, { type EquityPoint } from './CustomToolTip';

interface EquityCurveChartProps {
  equityCurve: EquityPoint[];
  startingBalance: number;
  drawdownFloor: number;
}

export default function EquityCurveChart({
  equityCurve,
  startingBalance,
  drawdownFloor,
}: EquityCurveChartProps) {
  return (
    <Card
      eyebrow="Additional Feature · Equity Curve"
      title="Balance trajectory across trades"
    >
      <p className="text-sm text-ink-secondary mb-5 max-w-lg">
        The risk indicator above shows where the account stands right now. This shows how it
        got there — useful for spotting a losing streak building before a limit is actually hit.
      </p>

      <div className="h-56 md:h-64 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={equityCurve} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 5" />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--color-ink-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={{ stroke: 'var(--color-border)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--color-ink-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              width={64}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              domain={['dataMin - 1000', 'dataMax + 1000']}
            />
            <Tooltip content={CustomTooltip} />
            <ReferenceLine
              y={startingBalance}
              stroke="var(--color-ink-muted)"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="url(#equityFill)"
              dot={{ r: 3, fill: 'var(--color-accent)', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: 'var(--color-accent)', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-ink-muted font-mono mt-2">
        dashed line = starting balance ({currency(startingBalance)})
      </p>
    </Card>
  );
}
