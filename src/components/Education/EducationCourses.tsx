import React, { useState } from 'react';
import { Box, Chip, useTheme } from '@mui/material';
import { SPACING } from '../../styles/constants';
import { Bullet } from './EducationAchievements';

interface EducationCoursesProps {
  courses: string[];
}

export const EducationCourses: React.FC<EducationCoursesProps> = ({ courses }) => {
  const theme = useTheme();
  const mid = Math.ceil(courses.length / 2);
  const topCourses = courses.slice(0, mid);
  const bottomCourses = courses.slice(mid);

  const topItems = [...topCourses, ...topCourses];
  const bottomItems = [...bottomCourses, ...bottomCourses];

  const outerStyles = {
    width: '100%',
    position: 'relative',
    '@media (prefers-reduced-motion: reduce)': {
      '& .coursesTrack': {
        animation: 'none',
      },
    },
    '@keyframes scrollTrack': {
      '0%': {
        transform: 'translateX(0%)',
      },
      '100%': {
        transform: 'translateX(-50%)',
      },
    },
  } as const;

  const [pausedTop, setPausedTop] = useState(false);
  const [pausedBottom, setPausedBottom] = useState(false);

  const spacingFor = (s: string) => {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0;
    }
    const min = 8;
    const max = 28;
    const v = Math.abs(hash) % (max - min + 1);
    return min + v;
  };

  const trackStyles = {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    width: 'fit-content',
    animation: 'scrollTrack 20s linear infinite',
  } as const;

  const courseChipStyles = {
    backgroundColor: `rgba(16, 185, 129, 0.05)`,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `rgba(16, 185, 129, 0.1)`,
    },
    px: SPACING.sm,
  } as const;

  return (
    <Box sx={outerStyles}>
      <Bullet text="Key Courses" />
      <Box sx={{ overflow: 'hidden', py: SPACING.xs }}>
        <Box
          sx={{
            ...trackStyles,
            animationPlayState: pausedTop ? 'paused' : 'running',
          }}
        >
          {topItems.map((course, index) => (
            <Chip
              key={`top-${index}-${course}`}
              label={course}
              variant="outlined"
              size="small"
              sx={{ ...courseChipStyles, mr: `${spacingFor(course)}px` }}
              onMouseEnter={() => setPausedTop(true)}
              onMouseLeave={() => setPausedTop(false)}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: SPACING.sm, overflow: 'hidden', py: SPACING.xs }}>
        <Box
          sx={{
            ...trackStyles,
            animationPlayState: pausedBottom ? 'paused' : 'running',
          }}
        >
          {bottomItems.map((course, index) => (
            <Chip
              key={`bottom-${index}-${course}`}
              label={course}
              variant="outlined"
              size="small"
              sx={{ ...courseChipStyles, mr: `${spacingFor(course)}px` }}
              onMouseEnter={() => setPausedBottom(true)}
              onMouseLeave={() => setPausedBottom(false)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
