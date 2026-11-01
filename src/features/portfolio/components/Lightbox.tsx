import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Scan, ZoomIn, X } from "lucide-react";
import type { Locale } from "@/types";

type LightboxProps = {
  images: string[];
  initialIndex: number;
  title: string;
  locale: Locale;
  onClose: () => void;
};

export default function Lightbox({
  images,
  initialIndex,
  title,
  locale,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [fitWidth, setFitWidth] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbnailsRef = useRef<HTMLElement>(null);
  const labels =
    locale === "zh"
      ? {
          gallery: "作品圖片",
          close: "關閉圖片預覽",
          previous: "上一張圖片",
          next: "下一張圖片",
          fit: "完整圖片",
          width: "等寬放大",
          choose: "選擇圖片",
          scroll: "放大圖片，可上下捲動閱讀",
          hint: "← → 切換圖片 · Esc 關閉",
          scrollHint: "上下捲動閱讀 · 可隨時切回完整圖片",
          image: "圖片",
        }
      : {
          gallery: "Project gallery",
          close: "Close lightbox",
          previous: "Previous image",
          next: "Next image",
          fit: "Fit image",
          width: "Fit width",
          choose: "Choose gallery image",
          scroll: "Enlarged image, scroll to explore",
          hint: "← → Navigate · Esc Close",
          scrollHint: "Scroll to read · Switch back to fit the full image",
          image: "Image",
        };

  const prevImage = useCallback(
    () =>
      setCurrentIndex((index) => (index - 1 + images.length) % images.length),
    [images.length],
  );
  const nextImage = useCallback(
    () => setCurrentIndex((index) => (index + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    thumbnailsRef.current
      ?.querySelector('[aria-pressed="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [currentIndex]);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevImage();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextImage();
      }
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex="0"]',
        );
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !dialogRef.current?.contains(document.activeElement))
        ) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !dialogRef.current?.contains(document.activeElement))
        ) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, [onClose, prevImage, nextImage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-navigation-overlay
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 p-2 backdrop-blur-md md:p-4"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} — ${labels.gallery}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative flex h-[calc(100dvh-1rem)] w-full flex-col border border-white/15 bg-zinc-950/70 p-3 shadow-2xl md:h-[calc(100dvh-2rem)] md:p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 pb-2">
          <h2 className="min-w-0 truncate text-sm font-medium text-white/90 sm:text-base">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            title={labels.close}
            className="grid h-11 w-11 shrink-0 place-items-center text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 py-2">
          <div
            role="group"
            aria-label={locale === "zh" ? "圖片顯示方式" : "Image display mode"}
            className="inline-flex bg-white/5 p-1"
          >
            {[
              { value: false, label: labels.fit, Icon: Scan },
              { value: true, label: labels.width, Icon: ZoomIn },
            ].map(({ value, label, Icon }) => (
              <button
                key={label}
                type="button"
                aria-pressed={fitWidth === value}
                onClick={() => setFitWidth(value)}
                className={`inline-flex min-h-10 items-center gap-2 px-3 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark ${fitWidth === value ? "bg-brand-dark/20 text-brand-dark" : "text-white/55 hover:text-white"}`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {images.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                aria-label={labels.previous}
                title={labels.previous}
                className="grid h-11 w-11 place-items-center text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            )}
            <span
              aria-live="polite"
              aria-atomic="true"
              className="min-w-16 text-center font-mono text-xs tabular-nums text-white/60"
            >
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            {images.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                aria-label={labels.next}
                title={labels.next}
                className="grid h-11 w-11 place-items-center text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden bg-black/35">
          <div
            key={`${currentIndex}-${fitWidth}`}
            tabIndex={fitWidth ? 0 : undefined}
            role={fitWidth ? "region" : undefined}
            aria-label={fitWidth ? labels.scroll : undefined}
            className={
              fitWidth
                ? "h-full w-full overflow-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-dark"
                : "flex h-full w-full items-center justify-center"
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  fitWidth
                    ? "block h-auto w-full max-w-none"
                    : "h-full w-full object-contain"
                }
              />
            </AnimatePresence>
          </div>
        </div>
        <p className="shrink-0 py-2 text-center text-xs leading-5 text-white/45">
          {fitWidth ? labels.scrollHint : labels.hint}
        </p>
        {images.length > 1 && (
          <nav
            ref={thumbnailsRef}
            aria-label={labels.choose}
            className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-white/10 px-1 pb-1 pt-2"
          >
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`${labels.image} ${index + 1}`}
                aria-pressed={currentIndex === index}
                className={`relative shrink-0 border p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark ${currentIndex === index ? "border-brand-dark" : "border-white/15 opacity-55 hover:border-white/40 hover:opacity-100"}`}
              >
                <img
                  loading="lazy"
                  src={image}
                  alt=""
                  className="h-11 w-16 object-cover object-top sm:h-12 sm:w-20"
                />
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 right-0 px-1 font-mono text-xs ${currentIndex === index ? "bg-brand-dark text-zinc-950" : "bg-zinc-950/80 text-white/65"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </nav>
        )}
      </motion.div>
    </motion.div>
  );
}
