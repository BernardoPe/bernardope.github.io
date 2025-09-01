import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import type { Education } from './types';
import { EducationGrade } from './EducationGrade';
import './Education.css';

interface EducationHeaderProps {
  education: Education;
}

export const EducationHeader: React.FC<EducationHeaderProps> = ({ education }) => {
  const theme = useTheme();

  const degreeStyles = {
    color: theme.palette.primary.main,
  };

  const institutionStyles = {
    color: theme.palette.text.primary,
  };

  const periodStyles = {
    color: theme.palette.text.secondary,
  };

  return (
    <Box className="header-container">
      {education.logo && (
        <Box
          component="img"
          src={education.logo}
          alt={`${education.institution} logo`}
          className="logo logo-large"
        />
      )}

      <Box className="text-container">
        <Typography variant="h5" className="education-degree" sx={degreeStyles}>
          {education.degree}
        </Typography>

        <Typography variant="h6" className="education-institution" sx={institutionStyles}>
          {education.institution}
        </Typography>

        <Box className="meta-container">
          <Typography variant="body2" className="period-text" sx={periodStyles}>
            {education.startYear} - {education.endYear}
          </Typography>
          {education.grade && <EducationGrade grade={education.grade} />}
        </Box>
      </Box>
    </Box>
  );
};
