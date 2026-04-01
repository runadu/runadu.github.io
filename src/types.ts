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

export type IntroData = {
  description: LocalizedText;
};

export type WorkLink = {
  label: LocalizedText;
  url: string;
};

export type WorkItem = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  tags?: LocalizedStringArray;
  year?: string;
  images?: string[];
  video?: string;
  links?: WorkLink[];
  note?: LocalizedText;
};

export type SectionData = {
  id: string;
  title: LocalizedText;
  items: WorkItem[];
};

export type HeroContent = {
  title: LocalizedText;
  description: LocalizedText;
  cta: LocalizedText;
  sectionLabel: LocalizedText;
  skills: string[];
  backendSkills: string[];
};

export type FooterContent = {
  copyright: string;
};

export function getLocalizedText(locale: Locale, value?: LocalizedText): string {
  if (!value) return "";
  return value[locale];
}

export function getLocalizedArray(
  locale: Locale,
  value?: LocalizedStringArray
): string[] {
  if (!value) return [];
  return value[locale];
}