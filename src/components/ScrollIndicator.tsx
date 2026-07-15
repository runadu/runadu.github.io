import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";

import type { ThemeMode } from "../types";

type ScrollIndicatorProps = {
  theme: ThemeMode;
};

export default function ScrollIndicator({ theme }: ScrollIndicatorProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = theme === "dark";
  const segments = 8;
  const dashColor = isDark ? "bg-white/18" : "bg-zinc-900/16";
  const activeDashColor = isDark ? "bg-white/82" : "bg-zinc-900/70";

  useMotionValueEvent(progress, "change", (value) => {
    const nextIndex = Math.round(value * (segments - 1));
    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  });

  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden w-6 -translate-y-1/2 items-center justify-center md:flex">
      <div className="flex h-[55vh] max-h-60 min-h-24 w-full flex-col items-center justify-between py-3">
        {Array.from({ length: segments }, (_, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              animate={{
                opacity: isActive ? 1 : 0.9,
                scaleX: isActive ? 1.25 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
              }}
              className={`h-[4px] rounded-full ${isActive ? activeDashColor : dashColor} ${
                isActive ? "w-[12px]" : "w-[10px]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
