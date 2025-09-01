import React from 'react';
import { Drawer, List, useTheme, alpha } from '@mui/material';
import {
  Home as HomeIcon,
  Build as BuildIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { NavigationItem } from './NavigationItem';
import { UserProfile } from './UserProfile';
import { LAYOUT, getGlassEffect, SPACING } from '../../styles/constants';
import type { Section } from '../../App';

interface SideNavigationProps {
  sections: Section[];
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const navigationIcons = [HomeIcon, BuildIcon, SchoolIcon, CodeIcon, EmailIcon];

export const SideNavigation: React.FC<SideNavigationProps> = ({
  sections,
  currentSection,
  onSectionClick,
}) => {
  const theme = useTheme();

  const drawerStyles = {
    width: LAYOUT.sidebarWidth.desktop,
    flexShrink: 0,
    display: { xs: 'none', md: 'block' },
    '& .MuiDrawer-paper': {
      width: LAYOUT.sidebarWidth.desktop,
      boxSizing: 'border-box',
      ...getGlassEffect(theme),
      borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
    },
  };

  const listStyles = {
    px: SPACING.md,
  };

  return (
    <Drawer variant="permanent" sx={drawerStyles}>
      <List sx={listStyles}>
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
      </List>
      <UserProfile name="Bernardo Pereira" />
    </Drawer>
  );
};
