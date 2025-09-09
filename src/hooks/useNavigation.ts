import { useCallback, useState, useEffect } from 'react';
import { useArrowNavigation } from './useArrowNavigation';
import { useScrollSectionTracker } from './useScrollSectionTracker';

interface UseNavigationOptions {
  sectionIds: string[];
  initialIndex?: number;
  offset?: number;
}

export const useNavigation = ({ sectionIds, initialIndex = 0 }: UseNavigationOptions) => {
  const totalSections = sectionIds.length;

  const observedActive = useScrollSectionTracker({
    sectionIds,
  });

  const [currentSection, setCurrentSection] = useState<number>(initialIndex);

  const navigateTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections) return;
      const element = document.getElementById(sectionIds[index]);
      element?.scrollIntoView({ behavior: 'smooth' });
    },
    [sectionIds, totalSections]
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
