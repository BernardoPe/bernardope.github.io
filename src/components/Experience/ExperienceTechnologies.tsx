import React from 'react';
import { Box, Chip, useTheme, alpha } from '@mui/material';
import './Experience.css';

interface ExperienceTechnologiesProps {
  technologies: string[];
}

export const ExperienceTechnologies: React.FC<ExperienceTechnologiesProps> = ({ technologies }) => {
  const theme = useTheme();

  return (
    <Box className="experience-technologies">
      {technologies.map((tech, index) => (
        <Chip
          key={index}
          label={tech}
          size="small"
          className="experience-technology"
          sx={{
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        />
      ))}
    </Box>
  );
};
