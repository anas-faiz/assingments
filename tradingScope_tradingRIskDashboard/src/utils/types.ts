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