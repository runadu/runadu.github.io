import { navItems } from "@/config/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { useState } from "react";

import { sections } from "../data";
import type { Locale, ThemeMode } from "@/types";
import type { SectionData } from "../types";

type ScrollIndicatorProps = {
  theme: ThemeMode;
  selectedProjectIndices: Record<string, number>;
  onSelectProject: (sectionId: string, index: number) => void;
  locale: Locale;
  activeSectionId: string;
  workSection?: SectionData;
  activeWorkId?: string;
};

export default function ScrollIndicator({
  theme,
  selectedProjectIndices,
  onSelectProject,
  locale,
  activeSectionId,
  workSection,
  activeWorkId,
}: ScrollIndicatorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isDark = theme === "dark";
  const reduceMotion = useReducedMotion();
  const anchors = navItems.map((item) => {
    const id = item.href.slice(1);
    return {
      id,
      title:
        sections.find((section) => section.id === id)?.title[locale] ??
        item.label,
    };
  });
  const dashColor = isDark ? "bg-white/25" : "bg-zinc-900/22";
  const activeDashColor = isDark ? "bg-brand-dark" : "bg-brand";

  const activeIndex = Math.max(
    0,
    anchors.findIndex(({ id }) => id === activeSectionId),
  );

  const backToTop = (
    <button
      type="button"
      aria-label={locale === "zh" ? "回到頁面最上方" : "Back to top"}
      title={locale === "zh" ? "回到頁面最上方" : "Back to top"}
      onClick={() => {
        const behavior = reduceMotion ? "instant" : "smooth";
        if (!workSection) window.location.hash = "about";
        document.querySelector("main")?.scrollTo({ top: 0, behavior });
        document.querySelectorAll("main > section").forEach((section) => {
          section.scrollTo({ top: 0, behavior });
        });
        window.scrollTo({ top: 0, behavior });
      }}
      className="focus-ring group pointer-events-auto relative flex h-full min-h-16 w-full cursor-pointer flex-col items-start pb-4 text-brand/75 transition-colors duration-200 hover:text-brand-strong dark:text-brand-dark/70 dark:hover:text-brand-dark"
    >
      <span className="flex min-h-10 shrink-0 items-center gap-3">
        <span className="grid h-8 w-8 place-items-center">
          <ArrowUp
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none"
          />
        </span>
        <span className="font-mono text-xs uppercase tracking-widest">
          Back to top
        </span>
      </span>
      <span
        aria-hidden="true"
        className="ml-4 w-px flex-1 bg-current opacity-35 transition-opacity duration-200 group-hover:opacity-75 group-focus-visible:opacity-75"
      />
    </button>
  );

  const navigationOrnament = (
    <div
      aria-hidden="true"
      className="pointer-events-none mt-6 flex items-center gap-3 pl-1 text-zinc-400/70 dark:text-white/25"
    >
      <span className="project-mark navigation-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span className="font-mono text-xs uppercase leading-5 tracking-[0.08em]">
        Portfolio / 2026
        <span className="block font-sans normal-case tracking-normal">
          Design & development
        </span>
      </span>
    </div>
  );

  if (workSection) {
    return (
      <nav
        aria-label={
          locale === "zh" ? "同分類作品" : "Projects in this category"
        }
        className="pointer-events-none fixed bottom-8 left-6 top-20 z-40 hidden w-52 grid-rows-[1fr_auto_1fr] overflow-y-auto xl:grid"
      >
        <div className="min-h-12">{backToTop}</div>
        <ol className="pointer-events-auto flex flex-col items-start gap-1 py-2">
          <li className="relative mb-3 w-full">
            <a
              href={`#${workSection.id}`}
              className="focus-ring group inline-flex min-h-8 items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-brand-strong dark:text-white/50 dark:hover:text-brand-dark"
            >
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5 motion-reduce:transform-none"
              />
              {locale === "zh" ? "返回作品列表" : "All projects"}
            </a>
          </li>
          {workSection.items.map((item, index) => {
            const active = item.id === activeWorkId;
            const hovered = index === hoveredIndex;
            return (
              <li key={item.id} className="relative w-full">
                <a
                  href={`#work/${item.id}`}
                  aria-current={active ? "page" : undefined}
                  title={item.title[locale]}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  className="group relative flex min-h-8 items-center gap-1.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand dark:focus-visible:ring-brand-dark"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      opacity: active ? 1 : hovered ? 0.75 : 0.55,
                      scaleX: active || hovered ? 1 : 0.8,
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 320, damping: 26 }
                    }
                    className={`h-px w-3 shrink-0 origin-right ${active ? activeDashColor : dashColor}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`w-4 shrink-0 font-mono text-xs tracking-wide transition-colors ${active ? "text-brand-strong dark:text-brand-dark" : "text-zinc-400 dark:text-white/35"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`min-w-0 truncate text-xs tracking-wide transition-colors ${active ? "font-semibold text-brand-strong dark:text-brand-dark" : "text-zinc-600 group-hover:text-zinc-950 dark:text-white/70 dark:group-hover:text-white"}`}
                  >
                    {item.title[locale]}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
        <div className="self-end">{navigationOrnament}</div>
      </nav>
    );
  }

  return (
    <nav
      aria-label={
        workSection
          ? locale === "zh"
            ? "同分類作品"
            : "Projects in this category"
          : locale === "zh"
            ? "頁面區塊"
            : "Page sections"
      }
      className="pointer-events-none fixed bottom-8 left-6 top-20 z-40 hidden w-52 grid-rows-[1fr_auto_1fr] overflow-y-auto xl:grid"
    >
      <div className="min-h-12">{backToTop}</div>
      <ol className="pointer-events-auto flex flex-col items-start gap-1 py-2">
        {anchors.map((anchor, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoveredIndex;
          const projectSection = isActive
            ? sections.find((section) => section.id === anchor.id)
            : undefined;

          return (
            <li key={anchor.id} className="relative w-full">
              <a
                href={`#${anchor.id}`}
                aria-label={anchor.title}
                title={anchor.title}
                aria-current={isActive ? "location" : undefined}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                className={`group relative flex min-h-8 items-center gap-1.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand dark:focus-visible:ring-brand-dark `}
              >
                <motion.span
                  aria-hidden="true"
                  animate={{
                    opacity: isActive ? 1 : isHovered ? 0.75 : 0.55,
                    scaleX: isActive || isHovered ? 1 : 0.8,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className={`h-px w-3 shrink-0 origin-right ${isActive ? activeDashColor : dashColor}`}
                />
                <span
                  className={`w-4 shrink-0 font-mono text-xs tracking-wide transition-colors ${isActive ? "text-brand-strong dark:text-brand-dark" : "text-zinc-400 dark:text-white/35"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`pointer-events-none min-w-0 truncate text-xs tracking-wide transition-colors duration-150 ${
                    isActive
                      ? "font-semibold text-brand-strong dark:text-brand-dark"
                      : isDark
                        ? "text-white/70 group-hover:text-white"
                        : "text-zinc-600 group-hover:text-zinc-950"
                  }`}
                >
                  {anchor.title}
                </span>
              </a>
              {projectSection && (
                <ol
                  aria-label={
                    locale === "zh"
                      ? `${anchor.title}作品`
                      : `${anchor.title} projects`
                  }
                  className="my-2 ml-8"
                >
                  {projectSection.items.map((item, projectIndex) => {
                    const selected =
                      (selectedProjectIndices[projectSection.id] ?? 0) ===
                      projectIndex;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() =>
                            onSelectProject(projectSection.id, projectIndex)
                          }
                          aria-pressed={selected}
                          className={`focus-ring flex min-h-9 w-full items-start gap-2 py-2 text-left transition-colors ${selected ? "text-brand-strong dark:text-brand-dark" : "text-zinc-500 hover:text-zinc-900 dark:text-white/50 dark:hover:text-white"}`}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current opacity-50"
                          />
                          <span
                            className={`min-w-0 text-xs leading-5 ${selected ? "font-medium" : ""}`}
                          >
                            {item.title[locale]}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
      <div className="self-end">{navigationOrnament}</div>
    </nav>
  );
}
