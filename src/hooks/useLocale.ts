import { useEffect, useState } from "react";
import type { Locale } from "../types";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "zh";

    const saved = localStorage.getItem("locale");
    if (saved === "zh" || saved === "en") return saved;

    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("zh") ? "zh" : "en";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale === "zh" ? "zh-Hant" : "en";
  }, [locale]);

  return { locale, setLocale };
}