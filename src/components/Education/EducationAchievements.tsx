import React from 'react';
import { Box, Typography, useTheme, alpha, Chip } from '@mui/material';
import './Education.css';

interface EducationAchievementsProps {
  achievements: string[];
}

export const EducationAchievements: React.FC<EducationAchievementsProps> = ({ achievements }) => {
  const theme = useTheme();

  const sectionTitleStyles = {
    color: theme.palette.text.primary,
  };

  return (
    <>
      <Typography variant="h6" className="education-section-title" sx={sectionTitleStyles}>
        Achievements
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {achievements.map((achievement, index) => (
          <Chip
            key={index}
            label={achievement}
            size="small"
            className="education-achievement"
            sx={{
              backgroundColor: alpha(theme.palette.warning.main, 0.1),
              color: theme.palette.warning.main,
              border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: alpha(theme.palette.warning.main, 0.2),
              },
            }}
          />
        ))}
      </Box>
    </>
  );
};

export const Bullet: React.FC<{ text: string }> = ({ text }) => {
  const theme = useTheme();

  const bulletDotStyles = {
    backgroundColor: theme.palette.primary.main,
  };

  return (
    <Box className="bullet-container">
      <Box sx={bulletDotStyles} className="bullet-dot" />
      <Typography variant="subtitle2" className="bullet-text">
        {text}
      </Typography>
    </Box>
  );
};
