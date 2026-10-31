import { getSectionNumber } from "@/config/navigation";
import TagList from "@/components/ui/TagList";
import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/types";
import type { OpenLightbox, SectionData } from "../types";
import { getLocalizedArray, getLocalizedText } from "@/utils/i18n";

type ProjectsSectionProps = {
  section: SectionData;
  selectedIndex: number;
  onSelectProject: (index: number) => void;
  locale: Locale;
  onOpenLightbox: OpenLightbox;
};

export default function ProjectsSection({
  section,
  selectedIndex,
  onSelectProject,
  locale,
  onOpenLightbox,
}: ProjectsSectionProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const galleryRef = useRef<HTMLElement>(null);
  const item = section.items[selectedIndex];
  const title = getLocalizedText(locale, item.title);
  const subtitle = getLocalizedText(locale, item.subtitle);
  const description = getLocalizedText(locale, item.description);
  const tags = getLocalizedArray(locale, item.tags);
  const images = item.images ?? [];
  const currentImage = images[imageIndex];
  const changeImage = (direction: number) =>
    setImageIndex(
      (index) => (index + direction + images.length) % images.length,
    );

  const selectProject = (index: number) => {
    onSelectProject(index);
    setImageIndex(0);
  };

  useEffect(() => {
    setImageIndex(0);
  }, [selectedIndex]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const handleWheelStep = (event: Event) => {
      const direction = (event as CustomEvent<number>).detail;
      onSelectProject(
        Math.max(
          0,
          Math.min(section.items.length - 1, selectedIndex + direction),
        ),
      );
      setImageIndex(0);
    };
    gallery.addEventListener("portfolio-gallery-step", handleWheelStep);
    return () =>
      gallery.removeEventListener("portfolio-gallery-step", handleWheelStep);
  }, [section.items.length, selectedIndex, onSelectProject]);

  return (
    <section
      ref={galleryRef}
      id={section.id}
      data-wheel-gallery
      data-current-index={selectedIndex}
      data-gallery-count={section.items.length}
      className="flex h-full w-full flex-col self-stretch overflow-hidden"
    >
      <SectionHeader
        eyebrow="Projects"
        title={getLocalizedText(locale, section.title)}
        meta={`Projects / ${getSectionNumber(section.id)}`}
      />

      <article className="flex min-h-0 flex-1 flex-col overflow-hidden border border-zinc-200 bg-white/25 p-3 dark:border-white/10 dark:bg-white/[0.02] xl:hidden">
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-200/70 pb-3 dark:border-white/10">
          <div className="min-w-0">
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-brand-emphasis">
              Project {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(section.items.length).padStart(2, "0")}
              {item.year && ` · ${item.year}`}
            </p>
            <h3 className="line-clamp-1 text-base font-semibold leading-5 tracking-tight text-zinc-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-2 text-sm leading-5 text-brand-emphasis">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                selectProject(
                  (selectedIndex - 1 + section.items.length) %
                    section.items.length,
                )
              }
              aria-label={locale === "zh" ? "上一個專案" : "Previous project"}
              className="grid h-9 w-9 place-items-center border border-zinc-200 text-zinc-600 transition-colors hover:border-brand/40 hover:text-brand-strong dark:border-white/10 dark:text-white/65 dark:hover:border-brand-dark/40 dark:hover:text-brand-dark"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() =>
                selectProject((selectedIndex + 1) % section.items.length)
              }
              aria-label={locale === "zh" ? "下一個專案" : "Next project"}
              className="grid h-9 w-9 place-items-center border border-zinc-200 text-zinc-600 transition-colors hover:border-brand/40 hover:text-brand-strong dark:border-white/10 dark:text-white/65 dark:hover:border-brand-dark/40 dark:hover:text-brand-dark"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </header>
        <p className="mt-2 shrink-0 text-xs leading-5 text-zinc-600 dark:text-white/60">
          {description}
        </p>
        <div
          className="mt-3 grid min-h-0 flex-1 content-start gap-1.5 md:h-48 md:max-h-[28dvh] md:flex-none md:auto-rows-fr md:content-stretch lg:h-56"
          style={{
            gridTemplateColumns: `repeat(${Math.max(1, Math.min(images.length, 3))}, minmax(0, 1fr))`,
          }}
          aria-label={locale === "zh" ? "專案圖片" : "Project images"}
        >
          {images.length === 0 && (
            <div className="project-placeholder">
              <span className="project-mark" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="relative text-center font-mono text-xs uppercase leading-6 tracking-[0.25em] text-brand-strong/70 dark:text-brand-dark/70">
                {locale === "zh" ? "圖片準備中" : "Images coming soon"}
              </span>
            </div>
          )}
          {images.map((image, index) => (
            <button
              key={`${item.id}-mobile-${image}`}
              type="button"
              onClick={() => onOpenLightbox(images, index, title)}
              aria-label={
                locale === "zh"
                  ? `放大檢視 ${title} 圖片 ${index + 1}`
                  : `Open ${title} image ${index + 1}`
              }
              className="group relative aspect-[3/2] min-w-0 overflow-hidden md:aspect-auto md:min-h-0 border border-zinc-200 bg-zinc-100/50 transition-colors hover:border-brand/60 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-brand-dark/60"
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03] md:object-contain md:object-center"
              />
              <span className="absolute bottom-1 right-1 bg-page/85 px-1.5 py-0.5 font-mono text-xs text-zinc-600 dark:bg-page-dark/85 dark:text-white/60">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
        {tags.length > 0 && (
          <div className="mt-4 shrink-0 border-t border-zinc-200/70 pt-3 dark:border-white/10">
            <TagList tags={tags.slice(0, 4)} />
          </div>
        )}
        <div className="mt-auto flex shrink-0 flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-zinc-200/70 pt-3 dark:border-white/10">
          <a
            href={`#work/${item.id}`}
            className="focus-ring inline-flex min-h-10 items-center gap-2 text-xs font-medium text-brand-emphasis"
          >
            <span>{locale === "zh" ? "查看作品案例" : "View case study"}</span>
            <ChevronRight size={16} aria-hidden="true" />
          </a>
          {!!item.links?.length && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {item.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring group inline-flex min-h-10 items-center gap-3 border-b border-zinc-300/80 text-xs font-medium text-zinc-600 transition-colors hover:border-brand hover:text-brand-strong dark:border-white/20 dark:text-white/55 dark:hover:border-brand-dark dark:hover:text-brand-dark"
                >
                  {getLocalizedText(locale, link.label)}
                  <ExternalLink
                    size={13}
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </article>

      <div className="hidden min-h-0 flex-1 grid-cols-[minmax(0,1.35fr)_minmax(15rem,1.05fr)] grid-rows-1 gap-5 xl:grid">
        <div className="tech-panel relative hidden min-h-0 min-w-0 flex-col overflow-hidden p-2.5 lg:flex lg:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(#AF5F3C_0.65px,transparent_0.65px)] [background-size:18px_18px] dark:opacity-20"
          />
          <span className="relative z-10 mb-1 shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400 dark:text-white/35 sm:mb-2 sm:text-xs">
            Screen / {String(imageIndex + 1).padStart(2, "0")}
          </span>
          {currentImage ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.button
                key={`${item.id}-${currentImage}`}
                type="button"
                layoutId={`portfolio-image-${currentImage}`}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                onClick={() => onOpenLightbox(images, imageIndex, title)}
                className="group/image relative z-[1] flex min-h-0 flex-1 items-center justify-center"
                aria-label={
                  locale === "zh"
                    ? `放大檢視 ${title} 圖片`
                    : `Open ${title} image gallery`
                }
              >
                <img
                  src={currentImage}
                  alt={`${title} ${imageIndex + 1}`}
                  className="max-h-full max-w-full object-contain object-top"
                />
                <span className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center border border-zinc-300/80 bg-page/90 text-zinc-700 opacity-0 transition group-hover/image:opacity-100 dark:border-white/15 dark:bg-page-dark/90 dark:text-white">
                  <Expand size={14} />
                </span>
              </motion.button>
            </AnimatePresence>
          ) : (
            <div className="project-placeholder">
              <span className="project-mark" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="relative text-center font-mono text-xs uppercase leading-6 tracking-[0.25em] text-brand-strong/70 dark:text-brand-dark/70">
                {locale === "zh" ? "圖片準備中" : "Images coming soon"}
              </span>
            </div>
          )}
          {images.length > 1 && (
            <div className="relative z-10 mt-3 flex shrink-0 items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => changeImage(-1)}
                aria-label={locale === "zh" ? "上一張" : "Previous image"}
                className="grid h-8 w-8 place-items-center border border-zinc-300/80 bg-page/90 text-zinc-700 transition hover:border-brand/50 dark:border-white/15 dark:bg-page-dark/90 dark:text-white/75 dark:hover:border-brand-dark/50"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1.5">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setImageIndex(index)}
                    aria-label={
                      locale === "zh"
                        ? `顯示圖片 ${index + 1}`
                        : `Show image ${index + 1}`
                    }
                    aria-pressed={imageIndex === index}
                    className={`h-1.5 transition-all ${imageIndex === index ? "w-6 bg-brand dark:bg-brand-dark" : "w-1.5 bg-zinc-400/70 hover:bg-brand/70 dark:bg-white/35 dark:hover:bg-brand-dark/70"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => changeImage(1)}
                aria-label={locale === "zh" ? "下一張" : "Next image"}
                className="grid h-8 w-8 place-items-center border border-zinc-300/80 bg-page/90 text-zinc-700 transition hover:border-brand/50 dark:border-white/15 dark:bg-page-dark/90 dark:text-white/75 dark:hover:border-brand-dark/50"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <motion.aside
          key={`details-${item.id}`}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex min-h-0 flex-col border-t border-zinc-200 pt-2.5 dark:border-white/10 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0"
        >
          <p className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-brand-emphasis">
            {item.year && `${item.year} / `}
            {section.id === "ui-ux" ? "UI·UX" : "Web"}
          </p>
          <h3 className="mt-3 shrink-0 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white sm:text-lg lg:text-2xl">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 shrink-0 text-sm leading-6 text-brand-emphasis">
              {subtitle}
            </p>
          )}
          <p className="mt-3 shrink-0 text-xs leading-5 text-zinc-600 dark:text-white/60 lg:line-clamp-none lg:text-sm lg:leading-6">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="mt-4 shrink-0">
              <TagList tags={tags} />
            </div>
          )}
          <div className="mt-5 flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={`#work/${item.id}`}
              className="focus-ring group inline-flex min-h-10 items-center gap-2 border-b border-brand/50 text-xs font-medium text-brand-emphasis transition-colors hover:border-brand dark:border-brand-dark/50 dark:hover:border-brand-dark"
            >
              {locale === "zh" ? "查看作品案例" : "View case study"}
              <ChevronRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </a>
            {item.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="focus-ring group inline-flex min-h-10 items-center gap-3 border-b border-zinc-300/80 text-xs font-medium text-zinc-600 transition-colors hover:border-brand hover:text-brand-strong dark:border-white/20 dark:text-white/55 dark:hover:border-brand-dark dark:hover:text-brand-dark"
              >
                {getLocalizedText(locale, link.label)}
                <ExternalLink
                  size={13}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                />
              </a>
            ))}
          </div>
          <p className="mt-auto pt-5 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400 dark:text-white/35">
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(section.items.length).padStart(2, "0")}
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
