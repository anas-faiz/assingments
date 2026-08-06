import type { StatusLevel, StatusPillProps } from "../utils/types";

const STYLES: Record<
  StatusLevel,
  {
    dot: string;
    text: string;
    bg: string;
    border: string;
  }
> = {
  safe: {
    dot: 'bg-safe',
    text: 'text-safe',
    bg: 'bg-safe/10',
    border: 'border-safe/30',
  },
  approaching: {
    dot: 'bg-approaching',
    text: 'text-approaching',
    bg: 'bg-approaching/10',
    border: 'border-approaching/30',
  },
  at_risk: {
    dot: 'bg-at-risk',
    text: 'text-at-risk',
    bg: 'bg-at-risk/10',
    border: 'border-at-risk/30',
  },
};

export default function StatusPill({
  level,
  label,
  size = 'md',
}: StatusPillProps) {
  const style = STYLES[level];

  const sizeClasses =
    size === 'lg' ? 'text-sm px-4 py-2 gap-2.5' : 'text-xs px-3 py-1.5 gap-2';

  return (
    <span
      className={`inline-flex items-center rounded-full border font-mono font-medium ${style.bg} ${style.border} ${style.text} ${sizeClasses}`}
    >
      <span
        className={`inline-block rounded-full ${style.dot} ${
          size === 'lg' ? 'w-2 h-2' : 'w-1.5 h-1.5'
        } ${level === 'at_risk' ? 'animate-pulse' : ''}`}
      />
      {label}
    </span>
  );
}