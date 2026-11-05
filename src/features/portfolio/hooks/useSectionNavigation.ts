import { useEffect, useRef, useState } from "react";
import { navItems } from "@/config/navigation";
import { sections } from "../data";

export const mainSectionIds = navItems.map((item) => item.href.slice(1));

function readRoute() {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return "";
  }
}

export function useSectionNavigation() {
  const [route, setRoute] = useState(readRoute);
  const activeWorkId = route.startsWith("work/") ? route.slice(5) : "";
  const workSection = sections.find((section) =>
    section.items.some((item) => item.id === activeWorkId),
  );
  const isWorkDetail = Boolean(workSection);
  const activeSectionId =
    workSection?.id ?? (mainSectionIds.includes(route) ? route : "about");
  const activeSectionIndex = mainSectionIds.indexOf(activeSectionId);
  const activeSectionIndexRef = useRef(activeSectionIndex);

  useEffect(() => {
    activeSectionIndexRef.current = activeSectionIndex;
  }, [activeSectionIndex]);

  useEffect(() => {
    const syncRoute = () => setRoute(readRoute());
    window.addEventListener("hashchange", syncRoute);
    syncRoute();
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    if (isWorkDetail) return;

    let wheelLocked = false;
    let touchStartY = 0;
    let touchStartedInOverlay = false;
    const scrollToSection = (nextIndex: number) => {
      const boundedIndex = Math.max(
        0,
        Math.min(mainSectionIds.length - 1, nextIndex),
      );
      if (boundedIndex === activeSectionIndexRef.current) return;
      activeSectionIndexRef.current = boundedIndex;
      setRoute(mainSectionIds[boundedIndex]);
      window.location.hash = mainSectionIds[boundedIndex];
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      const target = event.target instanceof Element ? event.target : null;
      const project = target?.closest<HTMLElement>("[data-project-scroll]");
      if (
        target?.closest("[data-navigation-overlay]") ||
        (project && project.scrollHeight > project.clientHeight)
      ) {
        return;
      }
      event.preventDefault();
      if (wheelLocked) return;
      wheelLocked = true;
      const direction = event.deltaY > 0 ? 1 : -1;
      const gallery = target?.closest<HTMLElement>("[data-wheel-gallery]");
      if (gallery) {
        const current = Number(gallery.dataset.currentIndex ?? 0);
        const count = Number(gallery.dataset.galleryCount ?? 0);
        const next = current + direction;
        if (next >= 0 && next < count) {
          gallery.dispatchEvent(
            new CustomEvent("portfolio-gallery-step", { detail: direction }),
          );
        } else if (!gallery.hasAttribute("data-wheel-trap")) {
          scrollToSection(activeSectionIndexRef.current + direction);
        }
      } else {
        scrollToSection(activeSectionIndexRef.current + direction);
      }
      window.setTimeout(() => {
        wheelLocked = false;
      }, 850);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest("[data-navigation-overlay]") ||
        target?.isContentEditable ||
        target?.matches("input, textarea, select, button, a")
      ) {
        return;
      }
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        scrollToSection(activeSectionIndexRef.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        scrollToSection(activeSectionIndexRef.current - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        scrollToSection(0);
      } else if (event.key === "End") {
        event.preventDefault();
        scrollToSection(mainSectionIds.length - 1);
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      touchStartedInOverlay = Boolean(
        target?.closest("[data-navigation-overlay]"),
      );
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartedInOverlay) return;
      const deltaY =
        touchStartY - (event.changedTouches[0]?.clientY ?? touchStartY);
      if (Math.abs(deltaY) > 50) {
        scrollToSection(activeSectionIndexRef.current + (deltaY > 0 ? 1 : -1));
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isWorkDetail]);
  return { activeSectionId, activeSectionIndex, activeWorkId };
}
