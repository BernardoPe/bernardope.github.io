/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import type { Theme } from '@mui/material';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

interface ThemeContextProviderProps {
  children: ReactNode;
}

const createAppTheme = (isDarkMode: boolean): Theme => {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#10b981', // Green-500
        light: '#34d399', // Green-400
        dark: '#059669', // Green-600
      },
      secondary: {
        main: '#3b82f6', // Blue-500
        light: '#60a5fa', // Blue-400
        dark: '#2563eb', // Blue-600
      },
      background: {
        default: isDarkMode ? '#0f172a' : '#f8fafc', // Slate-900 : Slate-50
        paper: isDarkMode ? '#1e293b' : '#ffffff', // Slate-800 : White
      },
      text: {
        primary: isDarkMode ? '#f8fafc' : '#1e293b', // Slate-50 : Slate-800 (darker for better contrast)
        secondary: isDarkMode ? '#94a3b8' : '#475569', // Slate-400 : Slate-600 (darker for better contrast)
      },
      divider: isDarkMode ? '#334155' : '#cbd5e1', // Slate-700 : Slate-300 (more visible)
    },
    typography: {
      fontFamily:
        '"JetBrains Mono", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl: 1921,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode ? '#475569 #1e293b' : '#cbd5e1 #f1f5f9',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDarkMode ? '#1e293b' : '#f1f5f9',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDarkMode ? '#475569' : '#cbd5e1',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: isDarkMode ? '#64748b' : '#94a3b8',
            },
          },
        },
      },
    },
  });
};

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme-preference');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme-preference', isDarkMode ? 'dark' : 'light');
    // Apply theme attribute to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = createAppTheme(isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
