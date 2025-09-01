import React from 'react';
import { Box, Typography, useTheme, IconButton, alpha } from '@mui/material';
import { Launch as LaunchIcon, Work as WorkIcon } from '@mui/icons-material';
import type { Experience } from './types';
import './Experience.css';

interface ExperienceHeaderProps {
  experience: Experience;
}

export const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({ experience }) => {
  const theme = useTheme();

  const getTypeColor = (type: Experience['type']) => {
    switch (type) {
      case 'full-time':
        return theme.palette.primary.main;
      case 'part-time':
        return theme.palette.secondary.main;
      case 'internship':
        return theme.palette.warning.main;
      case 'contract':
        return theme.palette.info.main;
      case 'freelance':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getTypeBgColor = (type: Experience['type']) => {
    switch (type) {
      case 'full-time':
        return `${theme.palette.primary.main}20`;
      case 'part-time':
        return `${theme.palette.secondary.main}20`;
      case 'internship':
        return `${theme.palette.warning.main}20`;
      case 'contract':
        return `${theme.palette.info.main}20`;
      case 'freelance':
        return `${theme.palette.success.main}20`;
      default:
        return `${theme.palette.primary.main}20`;
    }
  };

  const formatDate = (dateStr: string) => {
    if (dateStr === 'Present') return 'Present';
    const [year, month] = dateStr.split('-');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const titleStyles = {
    color: theme.palette.primary.main,
  };

  const companyStyles = {
    color: theme.palette.text.primary,
  };

  const metaStyles = {
    color: theme.palette.text.secondary,
  };

  return (
    <Box className="header-container">
      {experience.companyLogo ? (
        <Box
          component="img"
          src={experience.companyLogo}
          alt={`${experience.company} logo`}
          className="logo logo-small"
        />
      ) : (
        <Box
          className="experience-logo-placeholder"
          sx={{
            backgroundColor: getTypeBgColor(experience.type),
          }}
        >
          <WorkIcon sx={{ fontSize: 32, color: getTypeColor(experience.type) }} />
        </Box>
      )}

      <Box className="experience-text-container text-container">
        <Typography component="h3" className="experience-title" sx={titleStyles}>
          {experience.title}
        </Typography>

        <Typography component="h4" className="experience-company" sx={companyStyles}>
          {experience.company}
        </Typography>

        <Box className="experience-meta-container meta-container">
          <Typography variant="body2" className="experience-period period-text" sx={metaStyles}>
            {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
          </Typography>
          <Typography variant="body2" className="experience-location location-text" sx={metaStyles}>
            {experience.location}
          </Typography>
          <Typography
            variant="body2"
            className="type-badge"
            sx={{
              backgroundColor: getTypeBgColor(experience.type),
              color: getTypeColor(experience.type),
            }}
          >
            {experience.type.replace('-', ' ')}
          </Typography>
        </Box>
      </Box>

      {experience.companyUrl && (
        <Box className="actions-container">
          <IconButton
            size="small"
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <LaunchIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
