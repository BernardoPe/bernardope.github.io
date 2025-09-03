import { useState, useEffect } from 'react';

interface UseMediaQueryOptions {
  defaultValue?: boolean;
}

/**
 * Hook to detect if the current screen size matches a media query
 * @param query - The media query string (e.g., '(max-width: 768px)')
 * @param options - Configuration options
 * @returns boolean indicating if the query matches
 */
export const useMediaQuery = (query: string, options: UseMediaQueryOptions = {}): boolean => {
  const { defaultValue = false } = options;

  const [matches, setMatches] = useState<boolean>(defaultValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};

/**
 * Hook to detect mobile screen sizes
 * Uses Material-UI's breakpoint for consistency
 * @returns boolean indicating if the screen is mobile size
 */
export const useIsMobile = (): boolean => {
  return useMediaQuery('(max-width: 899px)', { defaultValue: false });
};
