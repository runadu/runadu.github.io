import { getSectionNumber } from "@/config/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { skillGroups, supportingSkills } from "../data";
import { getLocalizedText } from "@/utils/i18n";
import { type Locale } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import TagList from "@/components/ui/TagList";

export default function SkillsSection({
  locale,
  active,
}: {
  locale: Locale;
  active: boolean;
}) {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const changeSkill = (direction: number) =>
    setActiveSkillIndex(
      (index) => (index + direction + skillGroups.length) % skillGroups.length,
    );

  return (
    <section
      id="skills"
      className={`section-shell flex-col overflow-y-auto ${active ? "flex section-view-enter" : "hidden"}`}
    >
      <SectionHeader
        eyebrow="Capabilities"
        title="Skills"
        meta={`Skills / ${getSectionNumber("skills")}`}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6">
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <strong className="font-mono text-sm font-medium text-brand-emphasis sm:text-base">
              3yrs
            </strong>
            <span className="text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-white/50">
              UI/UX Design
            </span>
          </span>

          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <strong className="font-mono text-sm font-medium text-brand-emphasis sm:text-base">
              1.5yrs
            </strong>
            <span className="text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-white/50">
              Frontend Development
            </span>
          </span>
        </div>
      </SectionHeader>
      <div className="mb-5 flex shrink-0 items-center justify-between md:hidden">
        <div
          className="flex gap-1"
          aria-label={locale === "zh" ? "技能分類" : "Skill categories"}
        >
          {skillGroups.map((group, index) => (
            <button
              key={group.mark}
              type="button"
              onClick={() => setActiveSkillIndex(index)}
              aria-label={getLocalizedText(locale, group.title)}
              aria-pressed={activeSkillIndex === index}
              className="focus-ring grid h-11 w-8 place-items-center"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 transition-all ${activeSkillIndex === index ? "w-8 bg-brand dark:bg-brand-dark" : "w-3 bg-zinc-300 dark:bg-white/20"}`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => changeSkill(-1)}
            aria-label={
              locale === "zh" ? "上一個技能分類" : "Previous skill category"
            }
            className="icon-button"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => changeSkill(1)}
            aria-label={
              locale === "zh" ? "下一個技能分類" : "Next skill category"
            }
            className="icon-button"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex min-h-min flex-1 flex-col md:mt-auto md:block md:flex-none md:shrink-0">
        <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4 xl:items-end xl:gap-x-10">
          {skillGroups.map((group, index) => (
            <article
              key={group.mark}
              data-skill-card
              className={`group col-start-1 row-start-1 min-w-0 border-t border-zinc-300/80 pt-5 transition-colors duration-200 hover:border-brand motion-reduce:transition-none dark:border-white/15 dark:hover:border-brand-dark md:col-auto md:row-auto ${["xl:min-h-112", "xl:min-h-96", "xl:min-h-80", "xl:min-h-64"][index]} ${activeSkillIndex === index ? "visible" : "pointer-events-none invisible md:pointer-events-auto md:visible"}`}
            >
              <h3 className="mb-4 text-base font-semibold tracking-tight text-zinc-800 transition-colors duration-200 group-hover:text-brand-strong motion-reduce:transition-none dark:text-white/85 dark:group-hover:text-brand-dark md:text-sm">
                {getLocalizedText(locale, group.title)}
              </h3>
              <p className="mb-5 max-w-[38ch] text-sm leading-7 text-zinc-500 dark:text-white/45 md:min-h-10 md:text-xs md:leading-5">
                {getLocalizedText(locale, group.description)}
              </p>
              <TagList tags={group.items} />
            </article>
          ))}
        </div>
        <footer className="mt-auto pt-8 md:mt-0 md:pt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-zinc-200 pt-4 dark:border-white/10">
            <span className="section-meta">Tools</span>
            {supportingSkills.tools.map((item) => (
              <span
                key={item}
                className="text-xs text-zinc-500 dark:text-white/50"
              >
                {item}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
