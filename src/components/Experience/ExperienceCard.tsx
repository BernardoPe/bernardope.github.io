import React from 'react';
import { Box, Card, CardContent, Typography, useTheme, alpha } from '@mui/material';
import { commonStyles } from '../../styles/constants';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperienceAchievements } from './ExperienceAchievements';
import { ExperienceTechnologies } from './ExperienceTechnologies';
import type { Experience } from './types';
import './Experience.css';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const theme = useTheme();

  const cardStyles = {
    background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.95)})`,
    border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
    borderRadius: commonStyles.card.borderRadius,
    transition:
      'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform, box-shadow',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.1)'}`,
    },
  };

  const headerContainerStyles = {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
    borderColor: theme.palette.divider,
  };

  const descriptionStyles = {
    color: 'text.primary',
  };

  return (
    <Card sx={cardStyles} className="experience-card">
      {/* Header Section */}
      <Box sx={headerContainerStyles} className="experience-card-header">
        <ExperienceHeader experience={experience} />
      </Box>

      {/* Content Section */}
      <CardContent className="experience-card-content">
        <Typography variant="body1" sx={descriptionStyles} className="experience-description">
          {experience.description}
        </Typography>

        {/* Achievements Section */}
        {experience.achievements && experience.achievements.length > 0 && (
          <Box className="experience-card-section">
            <ExperienceAchievements achievements={experience.achievements} />
          </Box>
        )}

        {/* Technologies Section - moved to end */}
        <Box className="experience-card-section experience-technologies-section">
          <ExperienceTechnologies technologies={experience.technologies} />
        </Box>
      </CardContent>
    </Card>
  );
};
