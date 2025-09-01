import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface ScrollSectionTrackerOptions {
  sectionRefs: RefObject<HTMLDivElement | null>[];
  rootMargin?: string;
  threshold?: number;
}

export const useScrollSectionTracker = ({
  sectionRefs,
  rootMargin = '-20% 0px -20% 0px',
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
          const index = sectionRefs.findIndex((ref) => ref.current === entry.target);
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

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, [sectionRefs, rootMargin, threshold]);

  return activeSection;
};
