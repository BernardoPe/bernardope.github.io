import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useThemeContext } from '../Context/ThemeContext';
import { commonStyles, getHoverEffect } from '../Styles/constants';

export const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const themeToggleStyles = {
    ...commonStyles.iconButton,
    position: 'fixed' as const,
    bottom: 30,
    right: 30,
    zIndex: 2000,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    ...getHoverEffect(theme, 4),
    '&:hover': {
      ...getHoverEffect(theme, 4)['&:hover'],
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  };

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`} placement="left">
      <IconButton onClick={toggleTheme} sx={themeToggleStyles} aria-label="toggle theme">
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};
