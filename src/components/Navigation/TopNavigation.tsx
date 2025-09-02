import React from 'react';
import { AppBar, Toolbar, Box, useTheme, alpha } from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Email as EmailIcon,
  Handyman,
} from '@mui/icons-material';
import { getGlassEffect, SPACING } from '../../Styles/constants';
import type { Section } from '../../App';
import { NavigationItem } from './NavigationItem';
import { UserProfile } from './UserProfile';

interface TopNavigationProps {
  sections: Section[];
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const navigationIcons = [HomeIcon, Handyman, WorkIcon, SchoolIcon, CodeIcon, EmailIcon];

export const TopNavigation: React.FC<TopNavigationProps> = ({
  sections,
  currentSection,
  onSectionClick,
}) => {
  const theme = useTheme();

  const appBarStyles = {
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
  };

  const navBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.sm, // Reduced from SPACING.lg to bring items closer
    flex: 1,
  };

  return (
    <AppBar position="static" sx={appBarStyles}>
      <Toolbar disableGutters sx={{ px: SPACING.lg, minHeight: 56 }}>
        {' '}
        <Box sx={navBoxStyles}>
          {sections.map((section, index) => {
            const Icon = navigationIcons[index];
            return (
              <NavigationItem
                key={section.id}
                icon={Icon}
                title={section.title}
                isActive={currentSection === index}
                onClick={() => onSectionClick(index)}
              />
            );
          })}
        </Box>
        <UserProfile name="Bernardo Pereira" />
      </Toolbar>
    </AppBar>
  );
};
