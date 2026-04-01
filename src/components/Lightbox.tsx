import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm dark:bg-black/85"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-6xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-0 top-[-3rem] rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X size={16} />
        </button>

        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-2 z-10 rounded-full border border-white/15 bg-black/50 px-4 py-3 text-white transition hover:bg-black/70"
            aria-label="Previous image"
          >
            ←
          </button>
        )}

        <div className="w-full">
          <img
            src={images[currentIndex]}
            alt={`${title} ${currentIndex + 1}`}
            className="max-h-[80vh] w-full rounded-md object-contain"
          />

          <div className="mt-4 flex items-center justify-between text-sm text-white/70">
            <p>{title}</p>
            <p>
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>

        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-2 z-10 rounded-full border border-white/15 bg-black/50 px-4 py-3 text-white transition hover:bg-black/70"
            aria-label="Next image"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}