import { useEffect, useState } from 'react';

interface ScrollSectionTrackerOptions {
  sectionIds: string[];
  rootMargin?: string;
  threshold?: number;
}

export const useScrollSectionTracker = ({
  sectionIds,
  rootMargin = '-10% 0px -10% 0px',
  threshold = 0.3,
}: ScrollSectionTrackerOptions) => {
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin,
      threshold,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const intersectingSections = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => {
          const index = sectionIds.findIndex((id) => id === entry.target.id);
          return {
            index,
            intersectionRatio: entry.intersectionRatio,
            boundingClientRect: entry.boundingClientRect,
          };
        })
        .filter((section) => section.index !== -1);

      if (intersectingSections.length > 0) {
        intersectingSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (intersectingSections.length > 1) {
          const viewportCenter = window.innerHeight / 2;

          intersectingSections.sort((a, b) => {
            const aCenter = Math.abs(
              a.boundingClientRect.top + a.boundingClientRect.height / 2 - viewportCenter
            );
            const bCenter = Math.abs(
              b.boundingClientRect.top + b.boundingClientRect.height / 2 - viewportCenter
            );
            return aCenter - bCenter;
          });
        }

        setActiveSection(intersectingSections[0].index);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
};
