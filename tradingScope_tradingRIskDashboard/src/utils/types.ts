import type { CSSProperties, ReactNode } from 'react';

export type StatusLevel = 'safe' | 'approaching' | 'at_risk';
export type StatusSize = 'md' | 'lg';

 export interface StatusPillProps {
  level: StatusLevel;
  label: string;
  size?: StatusSize;
}

export type RiskLevel = 'safe' | 'approaching' | 'at_risk';

export interface Account {
  startingBalance: number;
}

export interface Stats {
  currentBalance: number;
  totalPnl: number;
}

export interface RiskStatus {
  level: RiskLevel;
  label: string;
}

export interface AccountHeaderProps {
  account: Account;
  stats: Stats;
  riskStatus: RiskStatus;
}

        

export interface CardProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface LimitBarProps {
  label: string;
  used: number;
  remaining: number;
  limit: number;
  usagePct: number;
  level: RiskLevel;
}

export interface Thresholds {
  approaching: number;
  atRisk: number;
}

export interface Drawdown {
  currentDrawdown: number;
  remainingDrawdown: number;
  usagePct: number;
}

export interface DailyLoss {
  currentDayLoss: number;
  remainingDailyLoss: number;
  usagePct: number;
}

export interface RiskStatus {
  level: RiskLevel;
  label: string;
}

export  interface RiskIndicatorProps {
  drawdown: Drawdown;
  dailyLoss: DailyLoss;
  riskStatus: RiskStatus;
  thresholds: Thresholds;
  maxDrawdown: number;
  dailyLossLimit: number;
}

type StatTone = 'default' | 'positive' | 'negative';

export interface StatProps {
  label: string;
  value: ReactNode;
  tone?: StatTone;
}

export interface Trade {
  pnl: number;
}

export interface Stats {
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  largestWin: Trade | null;
  largestLoss: Trade | null;
  totalPnl: number;
}

export interface StatsGridProps {
  stats: Stats;
}