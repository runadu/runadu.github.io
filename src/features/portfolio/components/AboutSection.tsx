import { sections } from "../data";
import { getSectionNumber, navItems } from "@/config/navigation";
import { motion } from "motion/react";
import { ChevronRight, Codepen, Mail } from "lucide-react";
import { getLocalizedText } from "@/utils/i18n";
import { type Locale } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AboutSection({
  locale,
  active,
}: {
  locale: Locale;
  active: boolean;
}) {
  const firstProjectHref = navItems.find((item) =>
    sections.some((section) => item.href === `#${section.id}`),
  )?.href;

  return (
    <section
      id="about"
      className={`section-shell items-stretch overflow-y-auto md:overflow-hidden ${active ? "flex section-view-enter" : "hidden"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex min-h-full w-full flex-col md:h-full md:min-h-0"
      >
        <SectionHeader
          eyebrow="About"
          meta={`Profile / ${getSectionNumber("about")}`}
          divided
        />
        <div className="grid min-h-0 flex-1 content-start gap-5 md:grid-cols-[1.1fr_0.9fr] md:content-normal md:gap-16">
          <div className="self-start">
            <h1 className="text-3xl leading-[0.98] tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-7xl">
              Runa Du
            </h1>
            <h2 className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-brand-emphasis md:mt-4 md:text-sm">
              UI/UX Designer
            </h2>
            <p className="mt-4 max-w-[24ch] text-pretty text-xl font-medium leading-[1.2] tracking-tight text-zinc-800 dark:text-white/85 sm:text-2xl md:mt-12 md:max-w-[20ch] md:text-4xl">
              {locale === "zh"
                ? "設計直覺且貼近需求的數位體驗"
                : "Designing intuitive digital experiences around real user needs"}
            </p>
          </div>
          <div className="relative min-w-0 max-w-lg self-start border-t border-zinc-300/80 px-0 pb-0 pt-3 dark:border-white/15 md:self-end md:p-7">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400 dark:text-white/35 md:mb-5">
              Design approach
            </p>
            <p className="max-w-[34ch] text-pretty text-sm font-medium leading-6 text-zinc-800 dark:text-white/80 md:text-lg md:leading-8">
              {locale === "zh"
                ? "將使用者需求轉化為清晰易用的介面，並兼顧實作可行性"
                : "I turn user needs into clear, usable interfaces built for real-world implementation."}
            </p>
            <p className="mt-2 max-w-[48ch] text-pretty text-xs leading-5 text-zinc-600 dark:text-white/55 md:mt-4 md:text-sm md:leading-7">
              {locale === "zh"
                ? "以 UI/UX 設計為核心，從理解使用者需求、規劃資訊架構與操作流程，到打造清晰易用的介面；並運用前端開發經驗，讓設計兼具可行性與一致性"
                : "Focused on UI/UX design, from understanding user needs and shaping information architecture and flows to creating clear, usable interfaces. Front-end experience helps ensure each design is practical and consistent."}
            </p>
            <a href={firstProjectHref} className="button-primary mt-4 md:mt-6">
              {locale === "zh" ? "查看作品" : "Explore work"}
              <ChevronRight size={16} aria-hidden="true" />
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
              <a
                href="https://codepen.io/collection/yyNZdE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CodePen collection"
                className="focus-ring inline-flex min-h-11 items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-brand-strong dark:text-white/55 dark:hover:text-brand-dark"
              >
                <Codepen size={15} aria-hidden="true" />
                CodePen
              </a>
              <a
                href="mailto:dapkou@gmail.com"
                className="focus-ring inline-flex min-h-11 items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-brand-strong dark:text-white/55 dark:hover:text-brand-dark"
              >
                <Mail size={15} aria-hidden="true" />
                dapkou@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
