// Mock data for the Trader Risk Dashboard.
// In a real product this would come from a broker/prop-firm API;
// here it stands in for that so the UI can be built against a stable shape.

export const account = {
  startingBalance: 100000,
  maxDrawdown: 10000, // absolute $ the account is allowed to fall from its peak equity
  dailyLossLimit: 5000, // absolute $ allowed to lose within a single trading day
};

// Assumption: since no timestamps were supplied, all trades below are treated as
// having occurred on the same trading day (see README).
export const trades = [
  { id: 1, asset: 'BTC', direction: 'Long', label: 'BTC Long', pnl: 1200 },
  { id: 2, asset: 'ETH', direction: 'Short', label: 'ETH Short', pnl: -450 },
  { id: 3, asset: 'BTC', direction: 'Short', label: 'BTC Short', pnl: 800 },
  { id: 4, asset: 'SOL', direction: 'Long', label: 'SOL Long', pnl: -300 },
  { id: 5, asset: 'ETH', direction: 'Long', label: 'ETH Long', pnl: 2000 },
];
