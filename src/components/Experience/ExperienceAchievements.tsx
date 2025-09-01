import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import './Experience.css';

interface ExperienceAchievementsProps {
  achievements: string[];
}

export const ExperienceAchievements: React.FC<ExperienceAchievementsProps> = ({ achievements }) => {
  const theme = useTheme();
  return (
    <Box component="ul" className="experience-bullet-points">
      {achievements.map((point, index) => (
        <Box key={index} component="li" className="experience-bullet-point">
          <Box className="experience-bullet" sx={{ backgroundColor: theme.palette.primary.main }} />
          <Typography className="experience-bullet-text" sx={{ color: 'text.secondary' }}>
            {point}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
