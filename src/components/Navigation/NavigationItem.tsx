import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, useTheme, alpha } from '@mui/material';
import { SPACING } from '../../styles/constants';

interface NavigationItemProps {
  icon: React.ComponentType;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon: Icon,
  title,
  isActive,
  onClick,
}) => {
  const theme = useTheme();

  const listItemButtonStyles = {
    borderRadius: 2,
    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
    color: isActive ? theme.palette.primary.main : 'inherit',
    maxWidth: 'fit-content',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
    pr: SPACING.md, // Reduced from SPACING.lg to bring items closer
  };

  const listItemIconStyles = {
    color: isActive ? theme.palette.primary.main : 'inherit',
    minWidth: 40,
  };

  const listItemTextStyles = {
    '& .MuiListItemText-primary': {
      fontWeight: isActive ? 600 : 400,
    },
  };

  return (
    <ListItemButton onClick={onClick} sx={listItemButtonStyles}>
      <ListItemIcon sx={listItemIconStyles}>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={title} sx={listItemTextStyles} />
    </ListItemButton>
  );
};
