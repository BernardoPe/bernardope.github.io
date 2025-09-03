import React, { useMemo } from 'react';
import { Button, SvgIcon, useTheme, alpha } from '@mui/material';
import { SPACING } from '../../styles/constants';

interface NavigationItemProps {
  icon: typeof SvgIcon;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavigationItem = React.memo<NavigationItemProps>(
  ({ icon: Icon, title, isActive, onClick }) => {
    const theme = useTheme();
    const buttonStyles = useMemo(
      () => ({
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.xs,
        px: SPACING.md,
        py: SPACING.sm,
        borderRadius: 2,
        textTransform: 'none' as const,
        minWidth: 'auto',
        color: isActive ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.7),
        backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
        '&:hover': {
          backgroundColor: isActive
            ? alpha(theme.palette.primary.main, 0.15)
            : alpha(theme.palette.action.hover, 0.08),
          color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
        },
        transition: theme.transitions.create(['background-color', 'color'], {
          duration: theme.transitions.duration.short,
        }),
      }),
      [theme, isActive]
    );

    const iconStyles = useMemo(
      () => ({
        fontSize: 20,
      }),
      []
    );

    return (
      <Button onClick={onClick} sx={buttonStyles} startIcon={<Icon sx={iconStyles} />}>
        {title}
      </Button>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';
