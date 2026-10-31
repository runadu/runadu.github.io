import { Menu, Moon, SlidersHorizontal, Sun, X } from "lucide-react";
import { navItems } from "@/config/navigation";
import type { Locale, ThemeMode } from "@/types";
import { useState, type ReactNode } from "react";

type MobileNavbarProps = {
  locale: Locale;
  visualControls: ReactNode;
  activeSectionId: string;
  theme: ThemeMode;
  onChangeLocale: (locale: Locale) => void;
  onToggleTheme: () => void;
};

export default function MobileNavbar({
  locale,
  visualControls,
  activeSectionId,
  theme,
  onChangeLocale,
  onToggleTheme,
}: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVisualControls, setShowVisualControls] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[90] border-b border-zinc-200 bg-page/95 backdrop-blur-xl dark:border-white/10 dark:bg-page-dark/95 md:hidden">
        <div className="flex min-h-16 items-center justify-between px-5">
          <a
            href="#about"
            className="flex items-center gap-3 text-sm font-semibold tracking-[0.12em] text-zinc-900 dark:text-white"
          >
            <span className="h-3 w-3 rotate-45 bg-brand" />
            RUNA DU
          </a>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              aria-label={
                isMenuOpen
                  ? locale === "zh"
                    ? "關閉導覽選單"
                    : "Close navigation menu"
                  : locale === "zh"
                    ? "開啟導覽選單"
                    : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setIsMenuOpen((open) => !open);
                setShowVisualControls(false);
              }}
              className="inline-flex h-11 w-11 items-center justify-center border border-zinc-200 text-zinc-700 transition hover:border-brand/40 hover:bg-brand/8 dark:border-white/10 dark:text-white/80 dark:hover:border-brand-dark/40"
            >
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            data-navigation-overlay
            className="absolute inset-x-0 top-full z-10 flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto bg-page px-6 pb-8 pt-6 dark:bg-page-dark"
          >
            <nav className="mb-6 flex shrink-0 flex-col gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowVisualControls(false);
                  }}
                  aria-current={
                    item.href === `#${activeSectionId}` ? "location" : undefined
                  }
                  className={`group flex items-center gap-3 border-b border-zinc-200/70 py-4 text-left transition-colors dark:border-white/10 ${item.href === `#${activeSectionId}` ? "text-brand-strong dark:text-brand-dark" : "text-zinc-700 hover:text-zinc-950 dark:text-white/70 dark:hover:text-white"}`}
                >
                  <span
                    className={`h-px w-3 shrink-0 ${item.href === `#${activeSectionId}` ? "bg-brand dark:bg-brand-dark" : "bg-zinc-900/25 dark:bg-white/25"}`}
                  />
                  <span
                    className={`w-5 font-mono text-xs ${item.href === `#${activeSectionId}` ? "text-brand-strong dark:text-brand-dark" : "text-zinc-400 dark:text-white/35"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium tracking-wide">
                    {item.label}
                  </span>
                  {item.subLabel && (
                    <span className="ml-auto text-xs text-zinc-400 dark:text-white/35">
                      {item.subLabel}
                    </span>
                  )}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex shrink-0 flex-col items-stretch border-t border-zinc-200/70 pt-4 dark:border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-10 items-center border border-zinc-200 p-0.5 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => onChangeLocale("zh")}
                    aria-pressed={locale === "zh"}
                    aria-label="切換為中文"
                    className={`min-w-12 px-3 py-2 text-xs transition-colors ${locale === "zh" ? "bg-brand/10 font-medium text-brand-strong dark:bg-brand-dark/15 dark:text-brand-dark" : "text-zinc-500 dark:text-white/55"}`}
                  >
                    中文
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeLocale("en")}
                    aria-pressed={locale === "en"}
                    aria-label="Switch to English"
                    className={`min-w-12 px-3 py-2 text-xs transition-colors ${locale === "en" ? "bg-brand/10 font-medium text-brand-strong dark:bg-brand-dark/15 dark:text-brand-dark" : "text-zinc-500 dark:text-white/55"}`}
                  >
                    EN
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  aria-label={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  className="inline-flex h-10 items-center gap-2 border border-zinc-200 px-3 text-xs text-zinc-600 transition-colors hover:border-brand/30 hover:text-brand-strong dark:border-white/10 dark:text-white/65 dark:hover:border-brand-dark/40 dark:hover:text-brand-dark"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                  {theme === "dark"
                    ? locale === "zh"
                      ? "淺色模式"
                      : "Light mode"
                    : locale === "zh"
                      ? "深色模式"
                      : "Dark mode"}
                </button>
              </div>
              <div className="mt-4 border-t border-zinc-200/70 pt-3 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setShowVisualControls((open) => !open)}
                  aria-expanded={showVisualControls}
                  aria-controls="mobile-visual-controls-panel"
                  className="focus-ring inline-flex min-h-11 w-full items-center justify-between gap-3 text-sm text-zinc-600 dark:text-white/65"
                >
                  <span className="inline-flex items-center gap-2">
                    <SlidersHorizontal size={16} aria-hidden="true" />
                    {locale === "zh" ? "顯示設定" : "Display settings"}
                  </span>
                  <span aria-hidden="true" className="font-mono text-lg">
                    {showVisualControls ? "−" : "+"}
                  </span>
                </button>
                {showVisualControls && (
                  <div
                    id="mobile-visual-controls-panel"
                    className="mt-3 [&>section]:w-full [&>section]:shadow-none"
                  >
                    {visualControls}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
