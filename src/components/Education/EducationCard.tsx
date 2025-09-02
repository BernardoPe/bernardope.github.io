import React from 'react';
import { Box, Card, CardContent, Typography, useTheme, alpha } from '@mui/material';
import { commonStyles } from '../../Styles/constants';
import { EducationHeader } from './EducationHeader';
import { EducationAchievements } from './EducationAchievements';
import { EducationCourses } from './EducationCourses';
import EducationFinalProject from './EducationFinalProject';
import type { Education } from './types';
import './Education.css';

interface EducationCardProps {
  education: Education;
}

export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
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
    borderBottom: `1px solid`,
    borderColor: 'divider',
    paddingBottom: 2,
    marginBottom: 2,
  };

  return (
    <Card sx={cardStyles} className="education-card">
      {/* Header Section */}
      <Box sx={headerContainerStyles} className="education-card-header card-header">
        <EducationHeader education={education} />
      </Box>

      {/* Content Section */}
      <CardContent className="education-card-content card-content">
        <Typography variant="body1" sx={descriptionStyles} className="education-description">
          {education.description}
        </Typography>

        {/* Achievements Section */}
        {education.achievements && education.achievements.length > 0 && (
          <Box className="education-card-section">
            <EducationAchievements achievements={education.achievements} />
          </Box>
        )}

        {/* Final Project Section */}
        {education.finalProject && (
          <Box className="education-card-section">
            <EducationFinalProject project={education.finalProject} />
          </Box>
        )}

        {/* Divider before Courses - only show if there are achievements or final project */}
        {((education.achievements && education.achievements.length > 0) ||
          education.finalProject) && (
          <Box
            sx={{
              height: '1px',
              backgroundColor: alpha(theme.palette.divider, 0.5),
            }}
          />
        )}

        {/* Courses Section - moved to end */}
        <Box className="education-card-section education-courses-section">
          <EducationCourses courses={education.courses} />
        </Box>
      </CardContent>
    </Card>
  );
};
