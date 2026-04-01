import { Moon, Sun } from "lucide-react";
import { navItems } from "../data/portfolio";
import type { Locale, ThemeMode } from "../types";

type MobileNavbarProps = {
  locale: Locale;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onChangeLocale: (locale: Locale) => void;
  description?: string;
};

const chipBase =
  "inline-flex h-9 items-center justify-center rounded-full border px-3 text-xs font-medium transition-colors";
const chipIdle =
  "border-zinc-200 bg-white text-zinc-700 hover:border-[#AF5F3C]/30 hover:bg-[#AF5F3C]/8 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/75 dark:hover:border-white/20 dark:hover:bg-white/[0.06] dark:hover:text-white";
const chipActive =
  "border-[#AF5F3C]/90 bg-[#AF5F3C]/90 text-white dark:border-white dark:bg-white dark:text-black";

export default function MobileNavbar({
  locale,
  theme,
  onToggleTheme,
  onChangeLocale,
  description,
}: MobileNavbarProps) {
  return (
    <>
      <header className="border-b border-zinc-200 bg-white dark:border-white/10 dark:bg-[#1a1a1a] md:hidden">
        <div className="p-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <a href="about" className="block">
                <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-400 dark:text-white/30">
                  Portfolio
                </p>
                <h1 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Runa Du
                </h1>
              </a>

              <p className="text-sm text-zinc-600 dark:text-white/60">
                Frontend Engineer
              </p>

              {description && (
                <p className="max-w-[36ch] text-sm leading-6 text-zinc-500 dark:text-white/45">
                  {description}
                </p>
              )}
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-zinc-200/80 bg-white/70 px-4 py-3 transition hover:border-[#AF5F3C]/25 hover:bg-[#AF5F3C]/6 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/15 dark:hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-medium tracking-[0.18em] text-zinc-400 dark:text-white/25">
                          {String(index).padStart(2, "0")}
                        </span>
                        <span className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">
                          {item.label}
                        </span>
                      </div>

                      {item.subLabel && (
                        <p className="mt-1 pl-8 text-sm leading-6 text-zinc-500 dark:text-white/45">
                          {item.subLabel}
                        </p>
                      )}
                    </div>

                    <span className="mt-0.5 shrink-0 text-zinc-400 transition duration-200 group-hover:translate-x-1 group-hover:text-[#AF5F3C]/90 dark:text-white/20 dark:group-hover:text-white/50">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/92 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-[#1a1a1a]/92 md:hidden">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex items-center gap-2 rounded-full border border-zinc-200 p-1 dark:border-white/10">
            <button
              type="button"
              onClick={() => onChangeLocale("zh")}
              aria-pressed={locale === "zh"}
              className={`${chipBase} ${
                locale === "zh"
                  ? chipActive
                  : "border-transparent text-zinc-700 dark:text-white/75"
              }`}
            >
              中文
            </button>

            <button
              type="button"
              onClick={() => onChangeLocale("en")}
              aria-pressed={locale === "en"}
              className={`${chipBase} ${
                locale === "en"
                  ? chipActive
                  : "border-transparent text-zinc-700 dark:text-white/75"
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className={`${chipBase} ${chipIdle} gap-2 px-4`}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            <span>
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
      </div>
    </>
  );
}