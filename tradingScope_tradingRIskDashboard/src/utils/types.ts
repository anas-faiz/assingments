export type StatusLevel = 'safe' | 'approaching' | 'at_risk';
export type StatusSize = 'md' | 'lg';

 export interface StatusPillProps {
  level: StatusLevel;
  label: string;
  size?: StatusSize;
}