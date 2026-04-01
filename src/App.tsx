import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Moon, Sun, ExternalLink } from "lucide-react";

import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import PortfolioSection from "./components/PortfolioSection";
import Lightbox from "./components/Lightbox";

import { footerContent, heroContent, intro, sections } from "./data/portfolio";
import { useLocale } from "./hooks/useLocale";
import { useTheme } from "./hooks/useTheme";
import type { Locale } from "./types";
import { getLocalizedText } from "./types";

type LightboxState = {
  images: string[];
  startIndex: number;
  title: string;
} | null;

const switchButtonBase =
  "inline-flex h-8 items-center justify-center rounded-full border px-3 text-xs transition-colors";
const switchButtonIdle =
  "border-zinc-200 text-zinc-700 hover:bg-[#AF5F3C]/10 hover:text-zinc-900 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white";
const switchButtonActive =
  "border-[#AF5F3C]/90 bg-[#AF5F3C]/90 text-white dark:border-white dark:bg-white dark:text-black";

function DesktopControls({
  locale,
  theme,
  onChangeLocale,
  onToggleTheme,
}: {
  locale: Locale;
  theme: "dark" | "light";
  onChangeLocale: (locale: Locale) => void;
  onToggleTheme: () => void;
}) {
  return (
    <div className="fixed right-4 top-4 z-[99] hidden items-center gap-2 md:flex">
      <button
        onClick={() => onChangeLocale("zh")}
        className={`${switchButtonBase} ${
          locale === "zh" ? switchButtonActive : switchButtonIdle
        }`}
        type="button"
        aria-pressed={locale === "zh"}
      >
        中文
      </button>

      <button
        onClick={() => onChangeLocale("en")}
        className={`${switchButtonBase} ${
          locale === "en" ? switchButtonActive : switchButtonIdle
        }`}
        type="button"
        aria-pressed={locale === "en"}
      >
        EN
      </button>

      <button
        type="button"
        onClick={onToggleTheme}
        className={`${switchButtonBase} ${switchButtonIdle} gap-1 px-0`}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        <span className="text-sm">
          {theme === "dark"
            ? locale === "zh"
              ? "淺色模式"
              : "Light Mode"
            : locale === "zh"
            ? "深色模式"
            : "Dark Mode"}
        </span>
      </button>
    </div>
  );
}

export default function App() {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const handleOpenLightbox = (
    images: string[],
    startIndex: number,
    title: string
  ) => {
    setLightbox({ images, startIndex, title });
  };

  const handleCloseLightbox = () => {
    setLightbox(null);
  };

  return (
    
    <div className="min-h-screen bg-white text-zinc-900 transition-colors dark:bg-[#1a1a1a]/95 dark:text-white">
      
      
      <DesktopControls
        locale={locale}
        theme={theme}
        onChangeLocale={setLocale}
        onToggleTheme={toggleTheme}
      />

      <Navbar
        locale={locale}
        description={getLocalizedText(locale, intro.description)}
      />

      <MobileNavbar
        locale={locale}
        theme={theme}
        onToggleTheme={toggleTheme}
        onChangeLocale={setLocale}
        description={getLocalizedText(locale, intro.description)}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 md:ml-80 md:px-8 md:py-12 lg:px-10">
        <section id="about" className="scroll-mt-24 py-6 md:py-10">
          <div className="mb-8 md:mb-10">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-white/30">
              {getLocalizedText(locale, heroContent.sectionLabel)}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl p-6  md:p-8 dark:from-white/[0.06] dark:to-white/[0.02]"
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                  {getLocalizedText(locale, heroContent.title)}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-white/70">
                  {getLocalizedText(locale, heroContent.description)}
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-zinc-600 dark:text-white/60">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-white/40">
                    Frontend
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {heroContent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-zinc-200 px-2.5 py-1 text-sm text-zinc-600 dark:border-white/10 dark:text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-white/40">
                    Backend
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {heroContent.backendSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-zinc-200 px-2.5 py-1 text-sm text-zinc-600 dark:border-white/10 dark:text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#projects"
                  className="
                    inline-flex items-center gap-2 rounded-full border 
                    border-zinc-200 bg-white text-zinc-800
                    dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100
                    px-4 py-2 text-sm font-medium transition
                    hover:border-[#AF5F3C]/90 hover:bg-[#AF5F3C]/90 hover:text-white
                    dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                >
                  {getLocalizedText(locale, heroContent.cta)}
                  <ExternalLink size={16} />
                </a>
              </div> */}
            </div>
          </motion.div>
        </section>

        <div className="space-y-20 py-12">
          {sections.map((section) => (
            <div key={section.id}>
              <PortfolioSection
                section={section}
                locale={locale}
                onOpenLightbox={handleOpenLightbox}
              />
            </div>
          ))}
        </div>

        <footer id="contact" className="py-10">
          <div className="flex flex-col gap-4 border-t border-zinc-200 pt-6 text-sm dark:border-white/10 md:flex-row md:items-center md:justify-between">
            <div className="text-center text-zinc-400 dark:text-white/30">
              {footerContent.copyright}
            </div>
          </div>
        </footer>
      </main>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.startIndex}
          title={lightbox.title}
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  );
}