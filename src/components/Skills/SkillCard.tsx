import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Skills.css';

interface SkillGroup {
  title: string;
  text?: string[];
  list?: { name: string; icon: string }[];
}

export const SkillCard: React.FC<{ group: SkillGroup; index: number }> = ({ group }) => {
  const theme = useTheme();
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  });

  const cardStyles = {
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.background.paper, 0.98)
        : alpha(theme.palette.background.paper, 0.85),
    boxShadow: theme.palette.mode === 'light' ? 1 : 2,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.palette.mode === 'light' ? 6 : 8,
      borderColor: alpha(theme.palette.primary.main, 0.5),
    },
  };

  const cardTitleStyles = {
    color: 'primary.main',
    textAlign: 'center' as const,
    mb: 3,
    fontWeight: 700,
  };

  const textStyles = {
    color: 'text.primary',
  };

  const bulletDotStyles = {
    bgcolor: 'primary.main',
  };

  const iconBoxStyles = {
    border: '1px solid',
    boxShadow: theme.palette.mode === 'light' ? 2 : 1,
    bgcolor: 'background.paper',
    borderColor: 'divider',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.05)',
      boxShadow: theme.palette.mode === 'light' ? 6 : 4,
      borderColor: 'primary.main',
      bgcolor:
        theme.palette.mode === 'light'
          ? alpha(theme.palette.primary.main, 0.04)
          : alpha(theme.palette.primary.main, 0.08),
    },
  };

  return (
    <Box
      ref={elementRef}
      key={group.title}
      sx={cardStyles}
      className={`skill-card fade-up-staggered ${isVisible ? 'visible' : ''}`}
    >
      <Typography variant="h4" sx={cardTitleStyles} className="skill-card-title">
        {group.title}
      </Typography>

      <Box className="skill-card-content">
        <Box className="skill-card-text-section">
          {group.text && (
            <Box component="ul" className="skill-card-text-content">
              {group.text.map((t: string, idx: number) => (
                <Box key={idx} className="skill-bullet-item">
                  <Box className="skill-bullet-dot">
                    <Box sx={bulletDotStyles} className="skill-bullet-circle" />
                  </Box>
                  <Typography variant="body1" sx={textStyles} className="skill-bullet-text">
                    {t}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box className="skill-card-icons-section">
          <Box className="skill-icons-container">
            {group.list?.map((item, idx: number) => (
              <Box key={idx} className="skill-icon-wrapper">
                <Box sx={iconBoxStyles} className="skill-icon-box">
                  <img src={item.icon} alt={item.name} className="skill-icon-image" />
                </Box>
                <Typography variant="caption" sx={textStyles} className="skill-icon-label">
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
