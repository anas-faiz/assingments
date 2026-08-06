import AccountHeader from "../components/AccountHeader";
import EquityCurveChart from "../components/EquityCurveChart";
import RiskIndicator from "../components/RiskIndicator";
import StatsGrid from "../components/StatusGrid";
import TradeTable from "../components/TradeTable";
import { account, trades } from "../data/tradingData";
import { computeDailyLoss, computeDrawdown, computeEquityCurve, computeRiskStatus, computeTradeStats, RISK_THRESHOLDS} from "../lib/calculations";

function Hero() {
  // Everything below is derived from `trades` + `account` -- nothing here is
  // a hardcoded number. Swap the mock data and every figure on screen updates.
  const stats = computeTradeStats(trades, account.startingBalance);
  const equityCurve = computeEquityCurve(trades, account.startingBalance);
  const drawdown = computeDrawdown(equityCurve, account.maxDrawdown);
  const dailyLoss = computeDailyLoss(trades, account.dailyLossLimit);
  const riskStatus = computeRiskStatus(drawdown.usagePct, dailyLoss.usagePct);

  return (
    <div className="min-h-screen bg-surface-0">
      <main className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-14 flex flex-col gap-8">
        <AccountHeader account={account} stats={stats} riskStatus={riskStatus} />

        <RiskIndicator
          drawdown={drawdown}
          dailyLoss={dailyLoss}
          riskStatus={riskStatus}
          thresholds={RISK_THRESHOLDS}
          maxDrawdown={account.maxDrawdown}
          dailyLossLimit={account.dailyLossLimit}
        />

        <EquityCurveChart
          equityCurve={equityCurve}
          startingBalance={account.startingBalance}
          drawdownFloor={account.maxDrawdown}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <StatsGrid stats={stats} />
          <TradeTable trades={trades} />
        </div>

        <footer className="text-xs text-ink-muted font-mono pt-4 border-t border-border">
          Tradescape Trader Risk Dashboard · mock data for evaluation purposes
        </footer>
      </main>
    </div>
  );
}

export default Hero;
