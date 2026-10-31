import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type LightboxProps = {
  images: string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
};

export default function Lightbox({
  images,
  initialIndex,
  title,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const galleryRef = useRef<HTMLDivElement>(null);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const handleWheelStep = (event: Event) => {
      const direction = (event as CustomEvent<number>).detail;
      setCurrentIndex(
        (current) => (current + direction + images.length) % images.length,
      );
    };
    gallery.addEventListener("portfolio-gallery-step", handleWheelStep);
    return () =>
      gallery.removeEventListener("portfolio-gallery-step", handleWheelStep);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, prevImage, nextImage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      ref={galleryRef}
      data-wheel-gallery
      data-wheel-trap
      data-current-index={currentIndex}
      data-gallery-count={images.length}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/85 p-3 backdrop-blur-md sm:p-5 md:p-8"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative flex h-[min(88dvh,900px)] w-full max-w-7xl flex-col border border-white/15 bg-zinc-950/55 p-3 shadow-2xl sm:p-5 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 pb-3 sm:pb-4">
          <div className="min-w-0">
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-brand-dark/80">
              Project gallery
            </p>
            <h2 className="truncate text-sm font-medium text-white/90 sm:text-base">
              {title}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <p className="font-mono text-xs tracking-[0.16em] text-white/45 sm:text-xs">
              <span className="text-white/90">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="px-1.5 text-white/25">/</span>
              {String(images.length).padStart(2, "0")}
            </p>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center border border-white/15 text-white/65 transition hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
              aria-label="Close lightbox"
            >
              <X size={17} />
            </button>
          </div>
        </header>

        <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black/35 sm:my-4">
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center border border-white/15 bg-black/45 text-white/75 transition hover:border-brand-dark/70 hover:bg-black/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark sm:left-4 sm:h-10 sm:w-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <div className="flex h-full w-full items-center justify-center p-2 sm:p-4 md:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                layoutId={`portfolio-image-${images[currentIndex]}`}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="max-h-full max-w-full object-contain"
              />
            </AnimatePresence>
          </div>
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center border border-white/15 bg-black/45 text-white/75 transition hover:border-brand-dark/70 hover:bg-black/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark sm:right-4 sm:h-10 sm:w-10"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {images.length > 1 && (
          <nav
            aria-label="Choose gallery image"
            className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-white/10 pt-3 sm:pt-4"
          >
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={currentIndex === index}
                className={`group relative shrink-0 border p-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark ${currentIndex === index ? "border-brand-dark" : "border-white/15 opacity-55 hover:border-white/40 hover:opacity-100"}`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-11 w-16 object-cover object-top sm:h-12 sm:w-20 md:h-14 md:w-24"
                />
                {currentIndex === index && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-dark" />
                )}
              </button>
            ))}
          </nav>
        )}
      </motion.div>
    </motion.div>
  );
}
