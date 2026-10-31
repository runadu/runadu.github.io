import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title?: string;
  meta?: string;
  children?: ReactNode;
  divided?: boolean;
};

/** Shared spacing for the page eyebrow, title, and optional summary. */
export default function SectionHeader({
  eyebrow,
  title,
  meta,
  children,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div className="flex items-start justify-between gap-4">
        <p className="tech-eyebrow">{eyebrow}</p>
        {meta && <span className="section-meta shrink-0">{meta}</span>}
      </div>
      {(title || children) && (
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          {title && <h2 className="section-heading">{title}</h2>}
          {children}
        </div>
      )}
    </header>
  );
}
