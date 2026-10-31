import { useState } from "react";
import TagList from "@/components/ui/TagList";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Expand,
  ExternalLink,
} from "lucide-react";
import type { Locale } from "@/types";
import type { OpenLightbox, SectionData, WorkItem } from "../types";
import { getLocalizedArray, getLocalizedText } from "@/utils/i18n";

type WorkDetailProps = {
  item: WorkItem;
  section: SectionData;
  locale: Locale;
  onBack: () => void;
  onOpenLightbox: OpenLightbox;
};

export default function WorkDetail({
  item,
  section,
  locale,
  onBack,
  onOpenLightbox,
}: WorkDetailProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const title = getLocalizedText(locale, item.title);
  const description = getLocalizedText(locale, item.description);
  const tags = getLocalizedArray(locale, item.tags);
  const note = getLocalizedText(locale, item.note);
  const role = getLocalizedText(locale, item.caseStudy?.role);
  const images = item.images ?? [];
  const number = (value: number) => String(value).padStart(2, "0");
  const sections = [
    {
      title: locale === "zh" ? "專案挑戰" : "Challenge",
      text: getLocalizedText(locale, item.caseStudy?.problem),
    },
    {
      title: locale === "zh" ? "負責內容與做法" : "Role & approach",
      text: getLocalizedText(locale, item.caseStudy?.approach),
    },
    {
      title: locale === "zh" ? "交付成果" : "Outcome",
      text: getLocalizedText(locale, item.caseStudy?.outcome),
    },
  ].filter((entry) => entry.text);

  return (
    <article className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 md:px-8 xl:ml-56 xl:mr-8 xl:w-auto xl:max-w-none 2xl:mx-auto 2xl:w-full 2xl:max-w-6xl">
      <div className="mb-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-10 items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-brand-strong dark:text-white/50 dark:hover:text-brand-dark focus-ring"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {locale === "zh" ? "返回作品列表" : "All projects"}
        </button>
      </div>

      <div className="min-w-0">
        <header className="grid gap-5 border-b border-zinc-200 pb-6 dark:border-white/10 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:pb-8">
          <div className="min-w-0">
            {item.year && (
              <p className="mb-3 font-mono text-xs tracking-[0.16em] text-zinc-400 dark:text-white/35">
                {item.year}
              </p>
            )}
            <h1 className="section-heading break-words">{title}</h1>
            {item.subtitle && (
              <p className="mt-2 text-sm leading-6 text-brand-emphasis">
                {getLocalizedText(locale, item.subtitle)}
              </p>
            )}
            {role && (
              <div className="mt-5">
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400 dark:text-white/35">
                  {locale === "zh" ? "負責範圍" : "My role"}
                </p>
                <p className="text-sm leading-6 text-zinc-700 dark:text-white/75">
                  {role}
                </p>
              </div>
            )}
          </div>
          <div className="min-w-0">
            {description && (
              <p className="text-pretty text-sm leading-7 text-zinc-600 dark:text-white/60">
                {description}
              </p>
            )}
            {tags.length > 0 && (
              <div className="mt-4">
                <TagList tags={tags} />
              </div>
            )}
            {!!item.links?.length && (
              <nav
                aria-label={locale === "zh" ? "專案連結" : "Project links"}
                className="mt-4 flex flex-wrap gap-x-4 gap-y-1"
              >
                {item.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group inline-flex min-h-10 items-center gap-3 border-b border-zinc-300/80 text-xs text-zinc-500 transition-colors hover:border-brand hover:text-brand-strong dark:border-white/20 dark:text-white/50 dark:hover:border-brand-dark dark:hover:text-brand-dark"
                  >
                    {getLocalizedText(locale, link.label)}
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                ))}
              </nav>
            )}
          </div>
        </header>

        {images.length === 0 && !item.video && (
          <section
            className="content-section"
            aria-label={
              locale === "zh" ? "專案預設封面" : "Default project cover"
            }
          >
            <div className="project-placeholder project-placeholder-detail">
              <span
                className="project-mark project-mark-detail mt-8 md:mt-12"
                aria-hidden="true"
              >
                <span />
                <span />
              </span>
              <span className="relative text-center font-mono text-xs uppercase leading-6 tracking-[0.25em] text-brand-strong/70 dark:text-brand-dark/70">
                {locale === "zh" ? "圖片準備中" : "Images coming soon"}
              </span>
            </div>
          </section>
        )}

        {images.length > 0 && (
          <section
            className="content-section"
            aria-label={locale === "zh" ? "專案圖片" : "Project images"}
          >
            <div className="mx-auto w-full max-w-3xl">
              <figure>
                <button
                  type="button"
                  onClick={() => onOpenLightbox(images, imageIndex, title)}
                  aria-label={
                    locale === "zh"
                      ? `放大檢視 ${title} 圖片 ${imageIndex + 1}`
                      : `Open ${title} image ${imageIndex + 1}`
                  }
                  className="focus-ring group relative block aspect-[3/2] w-full cursor-zoom-in overflow-hidden border border-zinc-200 bg-page/60 transition-colors hover:border-brand/60 dark:border-white/10 dark:bg-page-dark/60 dark:hover:border-brand-dark/60"
                >
                  <img
                    src={images[imageIndex]}
                    alt={`${title} ${imageIndex + 1}`}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute bottom-3 right-3 flex items-center gap-2 border border-zinc-200 bg-page/95 px-3 py-2 text-xs text-zinc-600 dark:border-white/15 dark:bg-page-dark/95 dark:text-white/65">
                    <Expand size={14} aria-hidden="true" />
                    {locale === "zh" ? "放大檢視" : "Enlarge"}
                  </span>
                </button>
                <figcaption
                  aria-live="polite"
                  aria-atomic="true"
                  className="mt-3 flex items-center justify-between gap-3"
                >
                  <span className="font-mono text-xs tracking-widest text-zinc-400 dark:text-white/40">
                    {number(imageIndex + 1)} / {number(images.length)}
                  </span>
                  {images.length > 1 && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setImageIndex(
                            (index) =>
                              (index - 1 + images.length) % images.length,
                          )
                        }
                        aria-label={
                          locale === "zh" ? "上一張圖片" : "Previous image"
                        }
                        className="icon-button"
                      >
                        <ChevronLeft size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setImageIndex((index) => (index + 1) % images.length)
                        }
                        aria-label={
                          locale === "zh" ? "下一張圖片" : "Next image"
                        }
                        className="icon-button"
                      >
                        <ChevronRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </figcaption>
              </figure>
              {images.length > 1 && (
                <div
                  role="group"
                  aria-label={
                    locale === "zh" ? "選擇專案圖片" : "Choose project image"
                  }
                  className="mt-4 flex gap-3 overflow-x-auto px-1 py-2"
                >
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setImageIndex(index)}
                      aria-label={
                        locale === "zh"
                          ? `顯示圖片 ${index + 1}`
                          : `Show image ${index + 1}`
                      }
                      aria-pressed={imageIndex === index}
                      className={`focus-ring relative aspect-[3/2] w-24 shrink-0 overflow-hidden border transition-colors sm:w-28 ${imageIndex === index ? "border-brand ring-1 ring-brand dark:border-brand-dark dark:ring-brand-dark" : "border-zinc-200 opacity-60 hover:border-brand/50 hover:opacity-100 dark:border-white/15 dark:hover:border-brand-dark/50"}`}
                    >
                      <img
                        loading="lazy"
                        src={image}
                        alt=""
                        className="h-full w-full object-cover object-top"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 right-0 bg-page/90 px-1.5 py-0.5 font-mono text-xs text-zinc-600 dark:bg-page-dark/90 dark:text-white/65"
                      >
                        {number(index + 1)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {item.video && (
          <section
            className="content-section"
            aria-label={locale === "zh" ? "專案影片" : "Project video"}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400 dark:text-white/35">
              Project walkthrough
            </p>
            <video
              controls
              playsInline
              preload="metadata"
              aria-label={title}
              className="max-h-[70vh] w-full border border-zinc-200 bg-black dark:border-white/10"
            >
              <source src={item.video} type="video/mp4" />
              <a href={item.video}>
                {locale === "zh" ? "開啟影片" : "Open video"}
              </a>
            </video>
          </section>
        )}
        {note && (
          <p className="mt-5 text-xs leading-6 text-zinc-500 dark:text-white/45">
            {note}
          </p>
        )}

        {sections.length > 0 && (
          <section
            className="content-section border-t border-zinc-200 pt-6 dark:border-white/10 md:pt-8"
            aria-label={locale === "zh" ? "案例說明" : "Case study"}
          >
            {sections.map((entry) => (
              <section
                key={entry.title}
                className="border-b border-zinc-200/70 py-6 first:pt-0 last:border-0 dark:border-white/10"
              >
                <h2 className="content-heading">{entry.title}</h2>
                <p className="whitespace-pre-line text-sm leading-7 text-zinc-600 dark:text-white/60">
                  {entry.text}
                </p>
              </section>
            ))}
          </section>
        )}
      </div>
    </article>
  );
}
