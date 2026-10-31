import type { CSSProperties } from "react";
import type { Locale } from "@/types";

type BackgroundControlsPanelProps = {
  locale: Locale;
  showGridBackground: boolean;
  onShowGridBackgroundChange: (show: boolean) => void;
  cursorEffectsEnabled: boolean;
  onCursorEffectsChange: (enabled: boolean) => void;
  onReset: () => void;
  textScale: number;
  onTextScaleChange: (value: number) => void;
};

export default function BackgroundControlsPanel({
  locale,
  showGridBackground,
  onShowGridBackgroundChange,
  textScale,
  cursorEffectsEnabled,
  onCursorEffectsChange,
  onReset,
  onTextScaleChange,
}: BackgroundControlsPanelProps) {
  const labels =
    locale === "zh"
      ? {
          title: "顯示設定",
          reset: "恢復預設",
          background: "背景",
          textSize: "文字縮放",
          cursor: "游標效果",
          on: "開",
          off: "關",
        }
      : {
          title: "Display settings",
          reset: "Reset",
          background: "Background",
          textSize: "Text scale",
          cursor: "Cursor effects",
          on: "On",
          off: "Off",
        };

  return (
    <section
      aria-label={labels.title}
      className="display-settings w-72 overflow-hidden rounded border border-zinc-300/70 bg-page shadow-md dark:border-white/10 dark:bg-page-dark"
    >
      <header className="flex min-h-9 items-center justify-between gap-3 border-b border-zinc-200/80 px-3 dark:border-white/10">
        <h2 className="text-xs font-medium text-zinc-700 dark:text-white/80">
          {labels.title}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="focus-ring min-h-7 rounded-sm px-1.5 text-xs text-zinc-500 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/80"
        >
          {labels.reset}
        </button>
      </header>
      <div className="space-y-0.5 p-2">
        <label className="settings-row">
          <span className="settings-label">{labels.textSize}</span>
          <span className="grid min-w-0 grid-cols-[minmax(0,1fr)_3rem] items-center gap-1.5">
            <input
              type="range"
              min="0.85"
              max="1.2"
              step="0.05"
              value={textScale}
              onChange={(event) =>
                onTextScaleChange(Number(event.target.value))
              }
              aria-label={labels.textSize}
              className="settings-range"
              style={
                {
                  "--range-progress": `${((textScale - 0.85) / 0.35) * 100}%`,
                } as CSSProperties
              }
            />
            <output className="rounded-sm bg-zinc-200/65 px-1 py-1 text-right font-mono text-xs leading-4 tabular-nums text-zinc-600 dark:bg-white/[0.06] dark:text-white/65">
              {Math.round(textScale * 100)}%
            </output>
          </span>
        </label>
        <div className="settings-row">
          <span className="settings-label">{labels.background}</span>
          <button
            type="button"
            role="switch"
            aria-label={labels.background}
            aria-checked={showGridBackground}
            onClick={() => onShowGridBackgroundChange(!showGridBackground)}
            className="focus-ring flex min-h-6 items-center justify-end gap-2 rounded-sm px-1 text-xs text-zinc-500 dark:text-white/55"
          >
            <span>{showGridBackground ? labels.on : labels.off}</span>
            <span
              aria-hidden="true"
              className={`relative h-4 w-7 rounded-sm ${showGridBackground ? "bg-brand dark:bg-brand-dark" : "bg-zinc-300 dark:bg-white/20"}`}
            >
              <span
                className={`absolute left-0 top-0.5 h-3 w-3 rounded-[1px] bg-white transition-transform dark:bg-page-dark ${showGridBackground ? "translate-x-3.5" : "translate-x-0.5"}`}
              />
            </span>
          </button>
        </div>
        <div className="settings-row">
          <span className="settings-label">{labels.cursor}</span>
          <button
            type="button"
            role="switch"
            aria-label={labels.cursor}
            aria-checked={cursorEffectsEnabled}
            onClick={() => onCursorEffectsChange(!cursorEffectsEnabled)}
            className="focus-ring flex min-h-6 items-center justify-end gap-2 rounded-sm px-1 text-xs text-zinc-500 dark:text-white/55"
          >
            <span>{cursorEffectsEnabled ? labels.on : labels.off}</span>
            <span
              aria-hidden="true"
              className={`relative h-4 w-7 rounded-sm ${cursorEffectsEnabled ? "bg-brand dark:bg-brand-dark" : "bg-zinc-300 dark:bg-white/20"}`}
            >
              <span
                className={`absolute left-0 top-0.5 h-3 w-3 rounded-[1px] bg-white transition-transform dark:bg-page-dark ${cursorEffectsEnabled ? "translate-x-3.5" : "translate-x-0.5"}`}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
