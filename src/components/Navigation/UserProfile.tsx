import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { SPACING } from '../../styles/constants';

interface UserProfileProps {
  name: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ name }) => {
  const theme = useTheme();

  const containerStyles = {
    p: SPACING.md,
  };

  const nameStyles = {
    color: theme.palette.primary.main,
    fontFamily: 'Motterdam',
  };

  return (
    <Box sx={containerStyles}>
      <Typography variant="h5" sx={nameStyles}>
        {name}
      </Typography>
    </Box>
  );
};
