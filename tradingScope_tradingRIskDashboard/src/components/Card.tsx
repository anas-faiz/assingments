import type { CardProps } from "../utils/types";

export default function Card({ title, eyebrow, children, className = '', style }: CardProps) {
  return (
    <div
      className={`bg-surface-1 border border-border rounded-xl p-5 md:p-6 ${className}`}
      style={style}
    >
      {(title || eyebrow) && (
        <div className="mb-4">
          {eyebrow && (
            <p className="text-[11px] tracking-[0.14em] uppercase text-ink-muted font-mono mb-1">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-ink-primary text-base font-semibold">{title}</h2>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
