import { navItems } from "../data/portfolio";
import type { Locale } from "../types";
import { Mail } from "lucide-react";

type NavbarProps = {
  locale: Locale;
  description?: string;
};

export default function Navbar({ locale, description }: NavbarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-80 border-r border-zinc-200 bg-white/80 px-8 py-10 text-zinc-900 backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1a1a]/95 dark:text-white md:block">
      <div className="flex h-full flex-col justify-between">
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div className="h-72 w-72 rounded-full bg-[#AF5F3C]/40 opacity-30 blur-3xl animate-pulse sm:h-80 sm:w-80" />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <a href="#about" className="block">
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
                      <p className="mt-1 pl-8 text-xs text-zinc-500 dark:text-white/45">
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
        <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-white/55">
          <a
            href="https://codepen.io/collection/yyNZdE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-zinc-900 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16V8a1 1 0 0 0-.469-.844l-8-5a1 1 0 0 0-1.062 0l-8 5A1 1 0 0 0 3 8v8a1 1 0 0 0 .469.844l8 5a1 1 0 0 0 1.062 0l8-5A1 1 0 0 0 21 16zM12 22v-6.5M12 2v6.5M3.27 6.96l8.23 5.54M20.73 6.96l-8.23 5.54M3.27 17.04l8.23-5.54M20.73 17.04l-8.23-5.54"
              />
            </svg>
            CodePen
          </a>
          <a
            href="mailto:dapkou@gmail.com"
            className="flex items-center gap-2 transition hover:text-zinc-900 dark:hover:text-white"
          >
            <Mail size={16} />
            dapkou@gmail.com
          </a>
        </div>

      </div>
    </aside>
  );
}