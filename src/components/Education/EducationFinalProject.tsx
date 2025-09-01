import React from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { EducationGrade } from './EducationGrade';
import './Education.css';

interface FinalProject {
  title: string;
  description: string;
  github?: string;
  grade: string;
}

interface Props {
  project: FinalProject;
}

export const EducationFinalProject: React.FC<Props> = ({ project }) => {
  const theme = useTheme();

  const githubBtnStyles = {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  };

  return (
    <>
      <Typography
        variant="h6"
        className="education-section-title"
        sx={{ color: theme.palette.text.primary, mb: 1 }}
      >
        Final Project
      </Typography>
      <Box className="final-project-simple">
        <Box className="final-project-header">
          <Typography
            variant="h6"
            sx={{ fontWeight: '600', fontSize: '1rem', color: theme.palette.primary.main }}
            className="final-project-title"
          >
            {project.title}
          </Typography>
          <Box className="final-project-meta">
            <EducationGrade grade={project.grade} />
            {project.github && (
              <IconButton
                size="small"
                component="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                sx={githubBtnStyles}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}
          className="final-project-description"
        >
          {project.description}
        </Typography>
      </Box>
    </>
  );
};

export default EducationFinalProject;
