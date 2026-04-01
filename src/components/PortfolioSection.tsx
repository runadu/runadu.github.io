import type { Locale, SectionData } from "../types";
import { getLocalizedText } from "../types";
import WorkCard from "./WorkCard";

type PortfolioSectionProps = {
  section: SectionData;
  locale: Locale;
  onOpenLightbox: (images: string[], startIndex: number, title: string) => void;
};

export default function PortfolioSection({
  section,
  locale,
  onOpenLightbox,
}: PortfolioSectionProps) {
  const sectionTitle = getLocalizedText(locale, section.title);

  return (
    <section id={section.id} className="scroll-mt-24">
      <div className="mb-8 md:mb-10">
        <p className="mb-2 text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-white/30">
          Projects
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
          {sectionTitle}
        </h2>
      </div>

      <div className="space-y-6">
        {section.items.map((item) => (
          <div key={item.id}>
            <WorkCard
              item={item}
              locale={locale}
              onOpenLightbox={onOpenLightbox}
            />
          </div>
        ))}
      </div>
    </section>
  );
}