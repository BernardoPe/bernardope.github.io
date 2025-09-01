import { useEffect } from 'react';

interface UseArrowNavigationProps {
  currentSection: number;
  totalSections: number;
  onNavigate: (index: number) => void;
}

export const useArrowNavigation = ({
  currentSection,
  totalSections,
  onNavigate,
}: UseArrowNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          if (currentSection > 0) {
            onNavigate(currentSection - 1);
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          if (currentSection < totalSections - 1) {
            onNavigate(currentSection + 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, totalSections, onNavigate]);
};
