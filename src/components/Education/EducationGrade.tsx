import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { SPACING } from '../../styles/constants';

interface EducationGradeProps {
  grade: string;
}

export const EducationGrade: React.FC<EducationGradeProps> = ({ grade }) => {
  const theme = useTheme();

  const gradeBoxStyles = {
    backgroundColor: `rgba(16, 185, 129, 0.08)`,
    px: SPACING.md,
    py: '0.25rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    border: `1px solid rgba(16, 185, 129, 0.2)`,
  };

  const gradeTextStyles = {
    color: theme.palette.primary.main,
    fontWeight: '700',
    lineHeight: 1,
    fontSize: '0.85rem',
  };

  return (
    <Box sx={gradeBoxStyles} className="grade-container">
      <Typography variant="caption" sx={gradeTextStyles}>
        {grade}
      </Typography>
    </Box>
  );
};
