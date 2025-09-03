import React, { useMemo, useCallback } from 'react';
import { AppBar, Toolbar, Box, useTheme, alpha } from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Email as EmailIcon,
  Handyman,
} from '@mui/icons-material';
import { getGlassEffect, SPACING } from '../../styles/constants';
import type { Section } from '../../App';
import { NavigationItem } from './NavigationItem';
import { UserProfile } from './UserProfile';
import { useNavigation } from '../../hooks/useNavigation';

interface TopNavigationProps {
  sections: Section[];
}

const navigationIcons = [HomeIcon, Handyman, WorkIcon, SchoolIcon, CodeIcon, EmailIcon];

const staticNavBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
} as const;

const staticToolbarStyles = {
  minHeight: 56,
} as const;

export const TopNavigation: React.FC<TopNavigationProps> = ({ sections }) => {
  const theme = useTheme();

  const appBarStyles = useMemo(
    () => ({
      ...getGlassEffect(theme),
      boxShadow: 'none',
      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: theme.zIndex.drawer + 1,
      display: { xs: 'none', md: 'block' },
      px: {
        xs: SPACING.md * 2,
        sm: SPACING.lg * 4,
      },
    }),
    [theme]
  );

  const navBoxStyles = useMemo(
    () => ({
      ...staticNavBoxStyles,
      gap: SPACING.sm,
    }),
    []
  );

  const toolbarStyles = useMemo(
    () => ({
      ...staticToolbarStyles,
      px: SPACING.lg,
    }),
    []
  );

  const sectionRefs = useMemo(() => sections.map((section) => section.ref), [sections]);

  const { currentSection, navigateTo } = useNavigation({ sectionRefs });

  const handleNavigation = useCallback(
    (index: number) => {
      navigateTo(index);
    },
    [navigateTo]
  );

  const navigationItems = useMemo(
    () =>
      sections.map((section, index) => {
        const Icon = navigationIcons[index];
        return (
          <NavigationItem
            key={section.id}
            icon={Icon}
            title={section.title}
            isActive={currentSection === index}
            onClick={() => handleNavigation(index)}
          />
        );
      }),
    [sections, currentSection, handleNavigation]
  );

  return (
    <AppBar position="static" sx={appBarStyles}>
      <Toolbar disableGutters sx={toolbarStyles}>
        <Box sx={navBoxStyles}>{navigationItems}</Box>
        <UserProfile name="Bernardo Pereira" />
      </Toolbar>
    </AppBar>
  );
};
