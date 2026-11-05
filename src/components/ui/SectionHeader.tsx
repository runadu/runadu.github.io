import { ArrowRight, ArrowUp } from "lucide-react";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title?: string;
  meta?: string;
  children?: ReactNode;
  mobileLink?: { href: string; label: string; returnToStart?: boolean };
  divided?: boolean;
};

/** Shared spacing for the page eyebrow, title, and optional summary. */
export default function SectionHeader({
  eyebrow,
  title,
  meta,
  children,
  mobileLink,
}: SectionHeaderProps) {
  const LinkIcon = mobileLink?.returnToStart ? ArrowUp : ArrowRight;

  return (
    <header className="section-header">
      <div className="flex items-start justify-between gap-4">
        <p className="tech-eyebrow">{eyebrow}</p>
        {meta && <span className="section-meta shrink-0">{meta}</span>}
      </div>
      {(title || children) && (
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          {title && (
            <h2
              className={`section-heading ${mobileLink ? "min-w-0 flex-1 md:flex-none" : ""}`}
            >
              {title}
            </h2>
          )}
          {mobileLink && (
            <a
              href={mobileLink.href}
              className="focus-ring inline-flex min-h-11 shrink-0 items-center gap-1 text-xs font-medium text-brand-emphasis md:hidden"
            >
              {mobileLink.label}
              <LinkIcon size={14} aria-hidden="true" />
            </a>
          )}
          {children}
        </div>
      )}
    </header>
  );
}
