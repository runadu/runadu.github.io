import type { LocalizedText, LocalizedStringArray } from "@/types";

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
  subtitle?: LocalizedText;
  description?: LocalizedText;
  tags?: LocalizedStringArray;
  year?: string;
  images?: string[];
  video?: string;
  links?: WorkLink[];
  note?: LocalizedText;
  caseStudy?: {
    role?: LocalizedText;
    problem?: LocalizedText;
    approach?: LocalizedText;
    outcome?: LocalizedText;
  };
};

export type SectionData = {
  id: string;
  title: LocalizedText;
  items: WorkItem[];
};

export type HeroContent = {
  title: LocalizedText;
  description: LocalizedText;
  sectionLabel: LocalizedText;
};

export type FooterContent = {
  copyright: string;
};

export type OpenLightbox = (
  images: string[],
  startIndex: number,
  title: string,
) => void;
