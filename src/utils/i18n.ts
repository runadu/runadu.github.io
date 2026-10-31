import type { Locale, LocalizedText, LocalizedStringArray } from "@/types";

export function getLocalizedText(
  locale: Locale,
  value?: LocalizedText,
): string {
  if (!value) return "";
  return value[locale];
}

export function getLocalizedArray(
  locale: Locale,
  value?: LocalizedStringArray,
): string[] {
  if (!value) return [];
  return value[locale];
}
