import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { getAnimatedTextGradient as getTextGradient } from '../../styles/constants';
import './Hero.css';

interface HeroContentProps {
  greeting: string;
  name: string;
  title: string;
  description: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ greeting, name, title, description }) => {
  const theme = useTheme();

  const greetingStyles = {
    color: theme.palette.primary.main,
  };

  const nameStyles = {
    ...getTextGradient(theme),
  };

  const titleStyles = {
    color: theme.palette.text.secondary,
  };

  return (
    <Box className="hero-content-container">
      <Typography className="hero-greeting" variant="h6" sx={greetingStyles}>
        {greeting}
      </Typography>
      <Typography className="hero-name" variant="h2" sx={nameStyles}>
        {name}
      </Typography>
      <Typography className="hero-title" variant="h5" sx={titleStyles}>
        {title}
      </Typography>
      <Typography className="hero-description" variant="body1">
        {description}
      </Typography>
    </Box>
  );
};
