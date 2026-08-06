# Trader Risk Dashboard — Tradescape

A dashboard that answers the one question a trader actually wants answered:
**"Am I in danger of violating my account rules?"** — plus the performance
numbers and trajectory that explain how they got there.

Live: _add your deployed URL here after deploying_
Repo: [_GitHub_](https://github.com/anas-faiz/assingments/tree/main/tradingScope_tradingRIskDashboard)

## What I Built

- **Account header** — current balance and total P&L, computed from the
  starting balance plus every trade's P&L (never hardcoded).
- **Rule Compliance panel** — the core ask. Shows drawdown consumed from the
  account's *peak* balance and today's realized loss, each against its limit,
  with a **Safe / Approaching Limit / At Risk** status driven by whichever
  limit is closer to being breached.
- **Equity curve** (my one additional feature — see below).
- **Trading performance** — win rate, winning/losing trade counts, largest
  win/loss, all derived from the trade list.
- **Trade log** — the individual trades, color-coded by outcome.

All calculations live in `src/lib/calculations.js` as small, pure,
independently-readable functions (`computeTradeStats`, `computeEquityCurve`,
`computeDrawdown`, `computeDailyLoss`, `computeRiskStatus`,
`computeAssetBreakdown`) that take the raw trade array and account limits as
input. Swap the mock data in `src/data/tradingData.js` and every number on
screen updates — nothing is hardcoded.

## My Additional Feature: Equity Curve

I added a **balance-over-time chart** showing account balance after each
trade in sequence.

**Why**: the Rule Compliance panel is necessarily a snapshot — it tells you
where you stand *right now*, but not how you got there. A trader who's down
$4,800 of a $5,000 daily limit needs to know if that happened on one bad
trade or crept up gradually, because that changes what "safe" behavior looks
like for the rest of the day. The equity curve makes that trajectory visible
at a glance, and it's also what makes the drawdown math legible: the chart's
dashed reference line is the starting balance, and the account's peak point
on the curve is exactly what drawdown is measured from.

I considered "performance by asset" and "average win vs. average loss" too —
both would be straightforward additions on top of the same trade data (see
`computeAssetBreakdown`, already written but not wired into the UI) — but the
equity curve felt like the highest-leverage addition given the assignment's
framing around risk awareness specifically.

## Product Questions

**1. What is drawdown in trading?**
Drawdown is how far an account's balance has fallen from its highest
previous point (its "peak" or "high-water mark") — not from its starting
balance. If an account grows from $100k to $110k and then drops to $104k,
that's a $6k drawdown, even though the account is still up $4k overall. Prop
and funded-trading firms enforce max drawdown as a hard rule because it
caps how much of a trader's gains they're allowed to give back before
losing the account.

**2. Why would a trader care about remaining drawdown rather than just
current P&L?**
P&L tells you how you're doing; remaining drawdown tells you how much room
you have left to be wrong. Two traders can have identical P&L but very
different risk of getting cut off — one sitting near their peak with lots
of room left, another who ran up a big gain and has since given most of it
back. Remaining drawdown is the number that actually answers "can I keep
trading the way I've been trading," which is the decision a trader is
making in the moment, not "how did I do so far."

**3. If I had another day, what would I improve?**
- Wire up the asset-breakdown function that's already written (which asset
  is actually making/losing money) and add basic trade filtering by asset
  or outcome.
- Add a light/dark toggle and a denser "compact" table view for accounts
  with many more trades than this sample.
- Write unit tests for `calculations.js` (Vitest) — the functions are pure
  and were designed to be trivially testable, I just ran out of time budget.
- Add a real "time" dimension to trades (timestamps) instead of assuming a
  single trading day, so daily loss resets correctly across multiple days.
- Small interaction polish: hovering a trade in the table highlighting its
  point on the equity curve.

## Assumptions

- **All five trades are treated as happening on the same trading day**,
  since no timestamps were supplied and the daily loss limit needs a
  day boundary to mean anything. In a real version, trades would carry
  timestamps and daily loss would reset at each new trading day.
- **Risk thresholds** (`Approaching` at 60% of a limit consumed, `At Risk`
  at 85%) are a reasonable default I picked, not a value given in the brief
  — easy to tune in `RISK_THRESHOLDS` in `calculations.js`.
- Trade direction/asset are parsed from the trade list as given (e.g. "BTC
  Long" → asset `BTC`, direction `Long`).

## Architecture

- **React + Vite**, no backend — this is a pure frontend dashboard over
  mock data, per the assignment's scope.
- **Tailwind CSS v4** for styling, with a small custom design-token theme
  (colors, fonts) in `src/index.css` rather than default Tailwind styling.
- **Recharts** for the equity curve chart.
- Components are split by responsibility and reusable: `Card`, `StatusPill`,
  and the risk-bar building block inside `RiskIndicator` are all generic
  enough to reuse elsewhere in the dashboard.

```
src/
  data/tradingData.ts       mock account + trades
  lib/calculations.ts       all derived-number logic (pure functions)
  pages/Hero.tsx            composes everything, computes derived data once
  utils/
    constants.ts
    types.ts
  components/
    AccountHeader.tsx
    RiskIndicator.tsx       the core "am I at risk" panel
    LimitBar.tsx
    EquityCurveChart.tsx    the additional feature
    CustomToolTip.tsx
    Stat.tsx
    StatsGrid.tsx
    TradeTable.tsx
    Card.tsx, StatusPill.tsx  shared building blocks
  App.tsx                   
```

## How to Run

```bash
npm install
npm run dev       # http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview   # serve the production build locally
```

## Deploying

Any static host works since there's no backend. Fastest path with Vercel:

```bash
npm install -g vercel
vercel
```

Or drag the `dist/` folder (after `npm run build`) into Netlify's deploy UI.
