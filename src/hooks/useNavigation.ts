import { useCallback, useState, useEffect, type RefObject } from 'react';
import { useArrowNavigation } from './useArrowNavigation';
import { useScrollSectionTracker } from './useScrollSectionTracker';

interface UseNavigationOptions {
  sectionRefs: RefObject<HTMLDivElement | null>[];
  initialIndex?: number;
  offset?: number;
}

export const useNavigation = ({ sectionRefs, initialIndex = 0 }: UseNavigationOptions) => {
  const totalSections = sectionRefs.length;

  const observedActive = useScrollSectionTracker({
    sectionRefs,
  });

  const [currentSection, setCurrentSection] = useState<number>(initialIndex);

  const navigateTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections) return;
      const element = sectionRefs[index].current;
      element?.scrollIntoView({ behavior: 'smooth' });
    },
    [sectionRefs, totalSections]
  );

  useArrowNavigation({
    currentSection,
    totalSections,
    onNavigate: navigateTo,
  });

  useEffect(() => {
    if (typeof observedActive === 'number' && observedActive !== currentSection) {
      setCurrentSection(observedActive);
    }
  }, [observedActive, currentSection]);

  return { currentSection, navigateTo, totalSections };
};
