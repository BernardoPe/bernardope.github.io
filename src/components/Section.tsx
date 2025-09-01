import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { commonStyles, getAnimatedTextGradient, getGlassEffect } from '../styles/constants';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  contentClassName?: string;
  showTitleGradient?: boolean;
  centerContent?: boolean;
  customStyles?: object;
  sectionId?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  sectionRef,
  className = '',
  contentClassName = '',
  showTitleGradient = true,
  centerContent = true,
  customStyles = {},
  sectionId,
}) => {
  const theme = useTheme();

  const titleStyles = showTitleGradient
    ? { ...getAnimatedTextGradient(theme) }
    : { color: 'text.primary' };

  const subtitleStyles = {
    color: 'text.secondary',
  };

  const sectionStyles = {
    ...commonStyles.section,
    ...customStyles,
    ...getGlassEffect(theme, 0.6),
  };

  const contentContainerStyles = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: centerContent ? 'center' : 'stretch',
  };

  const combinedRef = (element: HTMLDivElement | null) => {
    if (sectionRef) {
      (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
    }
  };

  return (
    <Box
      ref={combinedRef}
      sx={sectionStyles}
      component="section"
      className={`section ${className}`}
      data-section-id={sectionId}
    >
      {title && (
        <Typography className="section-title" variant="h2" sx={titleStyles}>
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography className="section-subtitle" variant="h6" sx={subtitleStyles}>
          {subtitle}
        </Typography>
      )}

      <Box sx={contentContainerStyles} className={`section-content ${contentClassName}`}>
        {children}
      </Box>
    </Box>
  );
};
