import React, { useState } from 'react';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { getGlassEffect, SPACING } from '../../styles/constants';
import type { Section } from '../../App';
import { useNavigation } from '../../hooks/useNavigation';

interface MobileNavigationProps {
  sections: Section[];
}

const navigationIcons = [HomeIcon, PersonIcon, WorkIcon, SchoolIcon, CodeIcon, EmailIcon];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ sections }) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sectionRefs = sections.map((section) => section.ref);
  const { currentSection, navigateTo } = useNavigation({ sectionRefs });

  const handleSectionClick = (index: number) => {
    navigateTo(index);
    setIsDrawerOpen(false);
  };

  const floatingButtonStyles = {
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: isDrawerOpen ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1,
    display: { md: 'none' },
    ...getGlassEffect(theme),
    borderRadius: '50%',
    width: 56,
    height: 56,
    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
    opacity: isDrawerOpen ? 0 : 1,
    transition: 'opacity 0.3s ease, z-index 0.3s ease',
  };

  const drawerStyles = {
    '& .MuiDrawer-paper': {
      width: 280,
      ...getGlassEffect(theme),
      borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
    },
    '& .MuiBackdrop-root': {
      backgroundColor: alpha(theme.palette.background.default, 0.5),
      backdropFilter: 'blur(4px)',
    },
  };

  const listItemButtonStyles = (isActive: boolean) => ({
    borderRadius: 2,
    mb: SPACING.sm,
    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
    color: isActive ? theme.palette.primary.main : 'inherit',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  });

  const listItemIconStyles = (isActive: boolean) => ({
    color: isActive ? theme.palette.primary.main : 'inherit',
    minWidth: 40,
  });

  const listItemTextStyles = (isActive: boolean) => ({
    '& .MuiListItemText-primary': {
      fontWeight: isActive ? 600 : 400,
    },
  });

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={floatingButtonStyles}
        aria-label="open navigation menu"
      >
        <MenuIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer} sx={drawerStyles}>
        <Box sx={{ p: SPACING.md }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: SPACING.lg,
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {sections.map((section, index) => {
              const Icon = navigationIcons[index];
              const isActive = currentSection === index;

              return (
                <ListItem key={section.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleSectionClick(index)}
                    sx={listItemButtonStyles(isActive)}
                  >
                    <ListItemIcon sx={listItemIconStyles(isActive)}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={section.title} sx={listItemTextStyles(isActive)} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
