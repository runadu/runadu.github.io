export type Locale = "zh" | "en";
export type ThemeMode = "dark" | "light";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type LocalizedStringArray = {
  zh: string[];
  en: string[];
};

export type NavItem = {
  href: string;
  label: string;
  subLabel?: string;
};
