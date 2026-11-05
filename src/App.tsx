import { navItems } from "@/config/navigation";
import { useSectionNavigation } from "@/features/portfolio/hooks/useSectionNavigation";
import AboutSection from "@/features/portfolio/components/AboutSection";
import SkillsSection from "@/features/portfolio/components/SkillsSection";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "motion/react";

import Navbar from "@/components/layout/Navbar";
import MobileNavbar from "@/components/layout/MobileNavbar";
import BackgroundControlsPanel from "@/components/layout/BackgroundControlsPanel";
import ProjectsSection from "@/features/portfolio/components/ProjectsSection";
import Lightbox from "@/features/portfolio/components/Lightbox";
import ScrollIndicator from "@/features/portfolio/components/ScrollIndicator";
import SiteMotionBackground from "@/components/layout/SiteMotionBackground";
import WorkDetail from "@/features/portfolio/components/WorkDetail";

import { sections } from "@/features/portfolio/data";
import { useLocale } from "@/hooks/useLocale";
import { useTheme } from "@/hooks/useTheme";

const idleDelay = 3 * 60 * 1000;

type LightboxState = {
  images: string[];
  startIndex: number;
  title: string;
} | null;

export default function App() {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = Boolean(useReducedMotion());
  const [isIdle, setIsIdle] = useState(false);
  const [cursorEffectsEnabled, setCursorEffectsEnabled] = useState(true);
  useEffect(() => {
    setIsIdle(false);
    if (reduceMotion) return;
    let lastActivity = Date.now();
    let timer: number | undefined;
    const checkIdle = () => {
      const remaining = idleDelay - (Date.now() - lastActivity);
      if (remaining <= 0) {
        setIsIdle(true);
        timer = undefined;
      } else {
        timer = window.setTimeout(checkIdle, remaining);
      }
    };
    const onActivity = () => {
      lastActivity = Date.now();
      setIsIdle(false);
      if (timer === undefined && !document.hidden)
        timer = window.setTimeout(checkIdle, idleDelay);
    };
    const onVisibilityChange = () => {
      window.clearTimeout(timer);
      timer = undefined;
      setIsIdle(false);
      if (!document.hidden) onActivity();
    };
    const events = [
      "pointermove",
      "pointerdown",
      "click",
      "keydown",
      "wheel",
      "touchstart",
      "scroll",
      "focus",
    ] as const;
    events.forEach((event) =>
      window.addEventListener(event, onActivity, {
        capture: true,
        passive: true,
      }),
    );
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!document.hidden) timer = window.setTimeout(checkIdle, idleDelay);
    return () => {
      window.clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, onActivity, true),
      );
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduceMotion]);

  const [selectedProjectIndices, setSelectedProjectIndices] = useState<
    Record<string, number>
  >({});
  const selectProject = useCallback((sectionId: string, index: number) => {
    setSelectedProjectIndices((current) => ({
      ...current,
      [sectionId]: index,
    }));
  }, []);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [showGridBackground, setShowGridBackground] = useState(true);
  const [textScale, setTextScale] = useState(1);
  const { activeSectionId, activeWorkId } = useSectionNavigation();
  const mainRef = useRef<HTMLElement>(null);
  const previousSectionId = useRef(activeSectionId);
  const activeWork = sections
    .flatMap((section) => section.items.map((item) => ({ section, item })))
    .find(({ item }) => item.id === activeWorkId);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
    const sectionChanged = previousSectionId.current !== activeSectionId;
    previousSectionId.current = activeSectionId;
    if (sectionChanged && !activeWorkId) {
      const heading = document
        .getElementById(activeSectionId)
        ?.querySelector<HTMLElement>("h1, h2");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
    if (activeWork) {
      const index = activeWork.section.items.findIndex(
        (item) => item.id === activeWorkId,
      );
      setSelectedProjectIndices((current) =>
        current[activeWork.section.id] === index
          ? current
          : { ...current, [activeWork.section.id]: index },
      );
    }
  }, [activeWorkId, activeSectionId]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--text-scale",
      String(textScale),
    );

    return () => {
      document.documentElement.style.removeProperty("--text-scale");
    };
  }, [textScale]);

  const handleOpenLightbox = (
    images: string[],
    startIndex: number,
    title: string,
  ) => {
    setLightbox({ images, startIndex, title });
  };

  const handleCloseLightbox = () => {
    setLightbox(null);
  };

  const visualControls = (
    <BackgroundControlsPanel
      locale={locale}
      showGridBackground={showGridBackground}
      onShowGridBackgroundChange={setShowGridBackground}
      textScale={textScale}
      onTextScaleChange={setTextScale}
      cursorEffectsEnabled={cursorEffectsEnabled}
      onCursorEffectsChange={setCursorEffectsEnabled}
      onReset={() => {
        setShowGridBackground(true);
        setTextScale(1);
        setCursorEffectsEnabled(true);
      }}
    />
  );

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
      <div
        className={`relative min-h-screen overflow-hidden text-zinc-900 transition-colors dark:text-white ${reduceMotion ? "reduce-motion" : ""} ${showGridBackground ? "bg-page/88 dark:bg-page-dark/88" : "bg-page dark:bg-page-dark"}`}
      >
        <SiteMotionBackground
          theme={theme}
          showGridBackground={showGridBackground}
          reduceMotion={reduceMotion}
          cursorEffectsEnabled={cursorEffectsEnabled}
        />

        <Navbar
          visualControls={visualControls}
          locale={locale}
          activeSectionId={activeSectionId}
          theme={theme}
          onChangeLocale={setLocale}
          onToggleTheme={toggleTheme}
        />

        <MobileNavbar
          visualControls={visualControls}
          locale={locale}
          activeSectionId={activeSectionId}
          theme={theme}
          onChangeLocale={setLocale}
          onToggleTheme={toggleTheme}
        />

        <ScrollIndicator
          selectedProjectIndices={selectedProjectIndices}
          onSelectProject={selectProject}
          workSection={activeWork?.section}
          activeWorkId={activeWork?.item.id}
          theme={theme}
          locale={locale}
          activeSectionId={activeSectionId}
        />

        <main
          ref={mainRef}
          className={`fixed inset-x-0 bottom-0 z-10 mx-auto w-full overflow-y-auto ${activeWork ? "top-16 py-4 sm:py-6 md:py-8" : "top-16 overflow-hidden"}`}
        >
          {activeWork ? (
            <WorkDetail
              key={activeWork.item.id}
              onOpenLightbox={handleOpenLightbox}
              item={activeWork.item}
              section={activeWork.section}
              locale={locale}
              onBack={() => {
                window.location.hash = activeWork.section.id;
              }}
            />
          ) : (
            <>
              {navItems.map((navItem) => {
                const id = navItem.href.slice(1);
                const active = activeSectionId === id;
                if (id === "about")
                  return (
                    <AboutSection key={id} locale={locale} active={active} />
                  );
                if (id === "skills")
                  return (
                    <SkillsSection key={id} locale={locale} active={active} />
                  );
                const section = sections.find((entry) => entry.id === id);
                if (!section) return null;
                return (
                  <div
                    key={id}
                    className={`${active ? "flex section-view-enter" : "hidden"} section-shell items-center overflow-hidden`}
                  >
                    <ProjectsSection
                      selectedIndex={selectedProjectIndices[id] ?? 0}
                      onSelectProject={(index) => selectProject(id, index)}
                      section={section}
                      locale={locale}
                      onOpenLightbox={handleOpenLightbox}
                    />
                  </div>
                );
              })}
            </>
          )}
        </main>

        <AnimatePresence>
          {isIdle && !reduceMotion && (
            <motion.div
              key="idle-scene"
              data-idle-overlay
              aria-hidden="true"
              initial={{ opacity: 0, backdropFilter: "grayscale(0)" }}
              animate={{
                opacity: 1,
                backdropFilter: "grayscale(1)",
              }}
              exit={{ opacity: 0, backdropFilter: "grayscale(0)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="pointer-events-none fixed inset-0 z-[120]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {lightbox && (
            <Lightbox
              locale={locale}
              images={lightbox.images}
              initialIndex={lightbox.startIndex}
              title={lightbox.title}
              onClose={handleCloseLightbox}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
