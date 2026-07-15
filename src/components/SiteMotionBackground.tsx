import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import type { ThemeMode } from "../types";

type SiteMotionBackgroundProps = {
  theme: ThemeMode;
};

const orbitLayers = [
  {
    size: "h-[30rem] w-[30rem]",
    border: "border-[#AF5F3C]/18 dark:border-[#AF5F3C]/22",
    duration: 28,
  },
  {
    size: "h-[44rem] w-[44rem]",
    border: "border-zinc-900/8 dark:border-white/8",
    duration: 42,
  },
];

export default function SiteMotionBackground({
  theme,
}: SiteMotionBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  const [canTrackPointer, setCanTrackPointer] = useState(false);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const progressX = useSpring(rawX, { stiffness: 110, damping: 22, mass: 0.35 });
  const progressY = useSpring(rawY, { stiffness: 110, damping: 24, mass: 0.4 });

  const gridOpacity = useTransform(progressY, [0, 1], [0.3, 0.55]);
  const glowX = useTransform(progressX, [0, 1], ["18%", "82%"]);
  const glowY = useTransform(progressY, [0, 1], ["18%", "82%"]);
  const secondaryGlowX = useTransform(progressX, [0, 1], ["84%", "16%"]);
  const secondaryGlowY = useTransform(progressY, [0, 1], ["22%", "78%"]);
  const pointLeft = useTransform(rawX, (value) => `${value * 100}%`);
  const pointTop = useTransform(rawY, (value) => `${value * 100}%`);
  const meshTranslateX = useTransform(progressX, [0, 1], [-72, 72]);
  const meshTranslateY = useTransform(progressY, [0, 1], [-54, 54]);
  const orbitX = useTransform(progressX, [0, 1], [-36, 36]);
  const orbitY = useTransform(progressY, [0, 1], [-28, 28]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const updatePointerMode = () => {
      setCanTrackPointer(mediaQuery.matches);
    };

    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !canTrackPointer) {
      rawX.set(0.5);
      rawY.set(0.5);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      rawX.set(Math.min(1, Math.max(0, event.clientX / window.innerWidth)));
      rawY.set(Math.min(1, Math.max(0, event.clientY / window.innerHeight)));
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [canTrackPointer, rawX, rawY, shouldReduceMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[linear-gradient(180deg,rgba(18,15,14,0.96),rgba(18,15,14,0.82))]"
            : "bg-[linear-gradient(180deg,rgba(247,243,238,0.96),rgba(248,245,241,0.82))]"
        }`}
      />

      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_right,rgba(175,95,60,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_26%)]"
            : "bg-[radial-gradient(circle_at_top_right,rgba(175,95,60,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(175,95,60,0.04),transparent_28%)]"
        }`}
      />

      <motion.div
        style={{
          x: meshTranslateX,
          y: meshTranslateY,
          willChange: "transform",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.05, 0.98, 1],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                ease: "easeInOut",
              }
        }
        className="absolute inset-[-12%]"
      >
        <div
          className={`absolute left-[8%] top-[6%] h-[26rem] w-[26rem] rounded-full blur-3xl ${
            isDark ? "bg-[#AF5F3C]/14" : "bg-[#AF5F3C]/12"
          }`}
        />
        <div
          className={`absolute bottom-[8%] right-[6%] h-[22rem] w-[22rem] rounded-full blur-3xl ${
            isDark ? "bg-white/[0.07]" : "bg-[#f1d7c8]/55"
          }`}
        />
        <div
          className={`absolute left-[34%] top-[30%] h-[18rem] w-[18rem] rounded-full blur-3xl ${
            isDark ? "bg-white/[0.04]" : "bg-white/75"
          }`}
        />
      </motion.div>

      <div
        className="absolute inset-0 md:hidden"
        style={{
          opacity: isDark ? 0.42 : 0.34,
          backgroundImage: `
            linear-gradient(to right, ${isDark ? "rgba(255,255,255,0.035)" : "rgba(24,24,27,0.035)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? "rgba(255,255,255,0.035)" : "rgba(24,24,27,0.035)"} 1px, transparent 1px),
            linear-gradient(to right, ${isDark ? "rgba(255,255,255,0.06)" : "rgba(24,24,27,0.05)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? "rgba(255,255,255,0.06)" : "rgba(24,24,27,0.05)"} 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 96px 96px, 96px 96px",
          backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
        }}
      />

      <motion.div
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 hidden md:block"
      >
        <motion.div
          style={{
            x: orbitX,
            y: orbitY,
            left: glowX,
            top: glowY,
            willChange: "transform",
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          {orbitLayers.map((layer) => (
            <motion.div
              key={layer.size}
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: layer.duration,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }
              }
              className={`absolute left-1/2 top-1/2 rounded-full border ${layer.border} ${layer.size}`}
              style={{ translateX: "-50%", translateY: "-50%" }}
            />
          ))}
        </motion.div>

        <motion.div
          style={{
            left: glowX,
            top: glowY,
            willChange: "transform",
          }}
          className={`absolute h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
            isDark ? "bg-[#AF5F3C]/10" : "bg-[#AF5F3C]/8"
          }`}
        />

        <motion.div
          style={{
            left: secondaryGlowX,
            top: secondaryGlowY,
            willChange: "transform",
          }}
          className={`absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
            isDark ? "bg-white/[0.06]" : "bg-white/75"
          }`}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${isDark ? "rgba(255,255,255,0.05)" : "rgba(24,24,27,0.05)"} 1px, transparent 1px),
              linear-gradient(to bottom, ${isDark ? "rgba(255,255,255,0.05)" : "rgba(24,24,27,0.05)"} 1px, transparent 1px),
              linear-gradient(to right, ${isDark ? "rgba(255,255,255,0.08)" : "rgba(24,24,27,0.08)"} 1px, transparent 1px),
              linear-gradient(to bottom, ${isDark ? "rgba(255,255,255,0.08)" : "rgba(24,24,27,0.08)"} 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px, 28px 28px, 112px 112px, 112px 112px",
            backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
          }}
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [-24, 0, -24],
                  y: [-18, 0, -18],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 14,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
          className={`absolute inset-[12%] rounded-[3rem] border ${
            isDark ? "border-white/8" : "border-zinc-900/7"
          }`}
        />

        <motion.div
          style={{ top: pointTop }}
          className="absolute left-0 right-0 h-px -translate-y-1/2 bg-[#AF5F3C]/75"
        />

        <motion.div
          style={{ left: pointLeft }}
          className="absolute top-0 bottom-0 w-px -translate-x-1/2 bg-[#AF5F3C]/75"
        />

        <motion.div
          style={{
            left: pointLeft,
            top: pointTop,
          }}
          className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#AF5F3C] bg-[#AF5F3C]/12 shadow-[0_0_28px_rgba(175,95,60,0.45)]"
        />
      </motion.div>

      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_center,transparent_58%,rgba(0,0,0,0.28)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_58%,rgba(120,93,74,0.10)_100%)]"
        }`}
      />
    </div>
  );
}
