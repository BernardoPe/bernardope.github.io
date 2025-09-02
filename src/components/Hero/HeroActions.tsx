import React from 'react';
import { Box, Button } from '@mui/material';
import { Download, Email } from '@mui/icons-material';
import { commonStyles } from '../../Styles/constants';
import './Hero.css';

interface HeroActionsProps {
  onDownloadCV: () => void;
  onContactClick: () => void;
}

export const HeroActions: React.FC<HeroActionsProps> = ({ onDownloadCV, onContactClick }) => {
  return (
    <Box className="hero-actions-container" sx={{ mt: 3 }}>
      <Button
        variant="contained"
        size="large"
        startIcon={<Download />}
        onClick={onDownloadCV}
        sx={commonStyles.buttonPrimary}
      >
        Download CV
      </Button>
      <Button
        variant="outlined"
        size="large"
        startIcon={<Email />}
        onClick={onContactClick}
        sx={commonStyles.buttonPrimary}
      >
        Contact Me
      </Button>
    </Box>
  );
};
