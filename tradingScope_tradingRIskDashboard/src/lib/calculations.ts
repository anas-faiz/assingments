// All dashboard numbers are derived from raw trade data here -- nothing in the
// UI hardcodes a computed value. Every function is pure (data in, data out),
// which makes them easy to unit test and easy to reason about independent of React.

import type { AssetBreakdown, DailyLoss, Drawdown, EquityPoint, RiskStatus, Trade, TradeStats } from "../utils/types";

/**
 * Core trade statistics: totals, win/loss counts, win rate, largest win/loss.
 */
export function computeTradeStats(
  trades: Trade[],
  startingBalance: number
): TradeStats {
  if (!trades || trades.length === 0) {
    return {
      totalPnl: 0,
      currentBalance: startingBalance,
      winningTrades: 0,
      losingTrades: 0,
      breakEvenTrades: 0,
      winRate: 0,
      largestWin: null,
      largestLoss: null,
    };
  }

  const winning = trades.filter((t) => t.pnl > 0);
  const losing = trades.filter((t) => t.pnl < 0);
  const breakEven = trades.filter((t) => t.pnl === 0);

  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);

  // Win rate is computed against decisive trades (wins + losses); break-even
  // trades neither help nor hurt the trader's hit rate, so they're excluded
  // from the denominator rather than silently counted as losses.
  const decisiveCount = winning.length + losing.length;
  const winRate = decisiveCount > 0 ? (winning.length / decisiveCount) * 100 : 0;

  const largestWin = winning.length > 0
    ? winning.reduce((max, t) => (t.pnl > max.pnl ? t : max))
    : null;
  const largestLoss = losing.length > 0
    ? losing.reduce((min, t) => (t.pnl < min.pnl ? t : min))
    : null;

  return {
    totalPnl,
    currentBalance: startingBalance + totalPnl,
    winningTrades: winning.length,
    losingTrades: losing.length,
    breakEvenTrades: breakEven.length,
    winRate,
    largestWin,
    largestLoss,
  };
}

/**
 * Reconstructs account balance after each trade, in sequence, starting from
 * the account's starting balance. Point 0 is the starting balance itself so
 * charts have a clean origin.
 */
export function computeEquityCurve(
  trades: Trade[],
  startingBalance: number
): EquityPoint[] {
  let running = startingBalance;
  const points = [{ step: 0, label: 'Start', balance: running, pnl: 0 }];

  trades.forEach((t, i) => {
    running += t.pnl;
    points.push({ step: i + 1, label: t.label, balance: running, pnl: t.pnl });
  });

  return points;
}

/**
 * Drawdown is measured from the account's PEAK equity (high-water mark) to its
 * current balance -- not from the starting balance. This mirrors how funded
 * trading accounts actually enforce max drawdown: once you've locked in gains,
 * the rule cares about how far you fall from your best point, not from zero.
 */
export function computeDrawdown(
  equityCurve: EquityPoint[],
  maxDrawdown: number
): Drawdown {
  const peak = equityCurve.reduce((max, p) => Math.max(max, p.balance), -Infinity);
  const current = equityCurve[equityCurve.length - 1].balance;

  const currentDrawdown = Math.max(peak - current, 0);
  const remainingDrawdown = Math.max(maxDrawdown - currentDrawdown, 0);
  const usagePct = maxDrawdown > 0 ? (currentDrawdown / maxDrawdown) * 100 : 0;

  return {
    peak,
    currentDrawdown,
    remainingDrawdown,
    usagePct: Math.min(usagePct, 100),
  };
}

/**
 * Daily loss is the sum of all losing trades within the current trading day.
 * Assumption: since trades carry no timestamps, all supplied trades are
 * treated as one trading day (documented in the README).
 */
export function computeDailyLoss(
  trades: Trade[],
  dailyLossLimit: number
): DailyLoss {
  const loss = trades
    .filter((t) => t.pnl < 0)
    .reduce((sum, t) => sum + Math.abs(t.pnl), 0);

  const remaining = Math.max(dailyLossLimit - loss, 0);
  const usagePct = dailyLossLimit > 0 ? (loss / dailyLossLimit) * 100 : 0;

  return {
    currentDayLoss: loss,
    remainingDailyLoss: remaining,
    usagePct: Math.min(usagePct, 100),
  };
}

/**
 * Overall account risk status, driven by whichever limit (drawdown or daily
 * loss) is closer to being breached. Thresholds are intentionally simple and
 * named as constants so they're easy to tune.
 */
export const RISK_THRESHOLDS = {
  approaching: 60, // % of a limit consumed before we start warning
  atRisk: 85, // % of a limit consumed before we call it "at risk"
};

export function computeRiskStatus(
  drawdownUsagePct: number,
  dailyLossUsagePct: number
): RiskStatus {
  const worst = Math.max(drawdownUsagePct, dailyLossUsagePct);

  if (worst >= RISK_THRESHOLDS.atRisk) {
    return { level: 'at_risk', label: 'At Risk', worstUsagePct: worst };
  }
  if (worst >= RISK_THRESHOLDS.approaching) {
    return { level: 'approaching', label: 'Approaching Limit', worstUsagePct: worst };
  }
  return { level: 'safe', label: 'Safe', worstUsagePct: worst };
}

/**
 * Groups trades by asset, for a quick "where is this account making/losing
 * money" breakdown.
 */
export function computeAssetBreakdown(
  trades: Trade[]
): AssetBreakdown[] {
  const byAsset = new Map();

  trades.forEach((t) => {
    const existing = byAsset.get(t.asset) || { asset: t.asset, pnl: 0, trades: 0 };
    existing.pnl += t.pnl;
    existing.trades += 1;
    byAsset.set(t.asset, existing);
  });

  return Array.from(byAsset.values()).sort((a, b) => b.pnl - a.pnl);
}
