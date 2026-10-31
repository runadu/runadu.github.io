import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { href: "#about", label: "About", subLabel: "Design approach & background" },
  { href: "#ui-ux", label: "UI/UX Design", subLabel: "Flows & interfaces" },
  { href: "#web-dev", label: "Web Development", subLabel: "Web builds" },
  { href: "#side-projects", label: "Side Projects", subLabel: "Experiments" },
  { href: "#skills", label: "Skills", subLabel: "Design & frontend" },
];

export function getSectionNumber(sectionId: string): string {
  return String(
    navItems.findIndex((item) => item.href === `#${sectionId}`) + 1,
  ).padStart(2, "0");
}
