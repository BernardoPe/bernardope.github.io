import React from 'react';
import { Box, Avatar, useTheme, alpha } from '@mui/material';
import image from '../../assets/images/me.jpg';
import './Hero.css';

interface HeroAvatarProps {
  src: string;
  alt: string;
}

export const HeroAvatar: React.FC<HeroAvatarProps> = () => {
  const theme = useTheme();

  const avatarStyles = {
    width: {
      xs: 250,
      md: 350,
      xxl: 400,
    },
    height: {
      xs: 250,
      md: 350,
      xxl: 400,
    },
    border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: `0 25px 50px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
  };

  return (
    <Box className="hero-avatar-container">
      <Avatar sx={avatarStyles} src={image} />
    </Box>
  );
};
