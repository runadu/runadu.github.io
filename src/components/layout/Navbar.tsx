import { useEffect, useRef, useState, type ReactNode } from "react";
import { navItems } from "@/config/navigation";
import type { Locale } from "@/types";
import type { ThemeMode } from "@/types";
import { Moon, Sun, SlidersHorizontal } from "lucide-react";

type NavbarProps = {
  locale: Locale;
  visualControls: ReactNode;
  activeSectionId: string;
  theme: ThemeMode;
  onChangeLocale: (locale: Locale) => void;
  onToggleTheme: () => void;
};

export default function Navbar({
  locale,
  visualControls,
  activeSectionId,
  theme,
  onChangeLocale,
  onToggleTheme,
}: NavbarProps) {
  const [showVisualControls, setShowVisualControls] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showVisualControls) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !controlsRef.current?.contains(event.target)
      )
        setShowVisualControls(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowVisualControls(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showVisualControls]);

  return (
    <>
      <header className="sticky top-0 z-50 hidden border-b border-zinc-200 bg-page/95 backdrop-blur-xl dark:border-white/10 dark:bg-page-dark/95 md:block">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 lg:gap-8 sm:px-6 lg:px-8">
          <a
            href="#about"
            className="flex shrink-0 items-center gap-3 text-sm font-semibold tracking-[0.12em] text-zinc-900 dark:text-white"
          >
            <span className="h-3.5 w-3.5 rotate-45 bg-brand" />
            RUNA DU
          </a>
          <nav
            className="flex h-full min-w-0 flex-1 items-center justify-end gap-0.5 lg:gap-1"
            aria-label={locale === "zh" ? "主導覽" : "Main navigation"}
          >
            {navItems.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                aria-current={
                  activeSectionId === link.href.slice(1)
                    ? "location"
                    : undefined
                }
                className={`focus-ring group relative flex h-10 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-sm px-2 transition-colors ${activeSectionId === link.href.slice(1) ? "text-brand-strong dark:text-brand-dark" : "text-zinc-400 hover:text-zinc-900 dark:text-white/35 dark:hover:text-white"}`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px w-3 shrink-0 origin-right transition-transform duration-200 motion-reduce:transition-none ${activeSectionId === link.href.slice(1) ? "bg-brand dark:bg-brand-dark" : "scale-x-75 bg-zinc-900/22 group-hover:scale-x-100 group-focus-visible:scale-x-100 dark:bg-white/25"}`}
                />
                <span
                  aria-hidden="true"
                  className="font-mono text-xs tracking-wide"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-zinc-200 bg-page px-2.5 py-1.5 text-xs font-medium tracking-wide text-zinc-600 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-white/10 dark:bg-page-dark dark:text-white/70"
                >
                  {link.label}
                </span>
              </a>
            ))}
          </nav>
          <div className="ml-2 flex shrink-0 items-center gap-3 border-l border-zinc-200 pl-4 dark:border-white/10">
            <button
              type="button"
              role="switch"
              aria-checked={locale === "en"}
              aria-label={locale === "zh" ? "英文模式" : "English language"}
              title={locale === "zh" ? "切換為英文" : "Switch to Chinese"}
              onClick={() => onChangeLocale(locale === "zh" ? "en" : "zh")}
              className="focus-ring relative inline-flex h-10 w-24 shrink-0 items-center bg-zinc-200/65 p-1 dark:bg-white/10"
            >
              <span
                aria-hidden="true"
                className={`absolute left-1 top-1 h-8 w-11 bg-brand-strong shadow-sm transition-transform duration-200 ease-out motion-reduce:transition-none ${locale === "en" ? "translate-x-11" : "translate-x-0"}`}
              />
              <span
                aria-hidden="true"
                className={`relative z-10 flex h-8 w-11 items-center justify-center text-xs font-medium transition-colors ${locale === "zh" ? "text-page" : "text-zinc-500 dark:text-white/55"}`}
              >
                中文
              </span>
              <span
                aria-hidden="true"
                className={`relative z-10 flex h-8 w-11 items-center justify-center text-xs font-medium transition-colors ${locale === "en" ? "text-page" : "text-zinc-500 dark:text-white/55"}`}
              >
                EN
              </span>
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="focus-ring grid h-8 w-8 place-items-center border border-zinc-200 text-zinc-600 transition-colors hover:border-brand/30 hover:bg-brand/5 hover:text-brand-strong dark:border-white/10 dark:text-white/65 dark:hover:border-brand-dark/40 dark:hover:bg-brand-dark/10 dark:hover:text-brand-dark"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <div ref={controlsRef} className="relative" data-navigation-overlay>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setShowVisualControls((open) => !open)}
                aria-expanded={showVisualControls}
                aria-controls="desktop-visual-controls-panel"
                aria-label={locale === "zh" ? "顯示設定" : "Display settings"}
                title={locale === "zh" ? "顯示設定" : "Display settings"}
                className={`focus-ring grid h-8 w-8 place-items-center border transition-colors ${showVisualControls ? "border-brand/40 bg-brand/10 text-brand-strong dark:border-brand-dark/40 dark:bg-brand-dark/10 dark:text-brand-dark" : "border-zinc-200 text-zinc-600 hover:border-brand/30 hover:bg-brand/5 hover:text-brand-strong dark:border-white/10 dark:text-white/65 dark:hover:border-brand-dark/40 dark:hover:text-brand-dark"}`}
              >
                <SlidersHorizontal size={15} aria-hidden="true" />
              </button>
              {showVisualControls && (
                <div
                  id="desktop-visual-controls-panel"
                  className="absolute right-0 top-full mt-3 max-h-[calc(100dvh-6rem)] overflow-y-auto"
                >
                  {visualControls}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
