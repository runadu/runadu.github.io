import { navItems } from "@/config/navigation";
import { useSectionNavigation } from "@/features/portfolio/hooks/useSectionNavigation";
import AboutSection from "@/features/portfolio/components/AboutSection";
import SkillsSection from "@/features/portfolio/components/SkillsSection";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";

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

type LightboxState = {
  images: string[];
  startIndex: number;
  title: string;
} | null;

export default function App() {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = Boolean(useReducedMotion());
  const [cursorEffectsEnabled, setCursorEffectsEnabled] = useState(true);
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
  const activeWork = sections
    .flatMap((section) => section.items.map((item) => ({ section, item })))
    .find(({ item }) => item.id === activeWorkId);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
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
