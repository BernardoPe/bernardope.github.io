import React from 'react';
import { Box, Typography, Chip, useTheme, alpha } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SchoolIcon from '@mui/icons-material/School';
import './Education.css';

interface EducationCoursesProps {
  courses: string[];
}

// Helper function to categorize courses and assign icons
const getCourseCategory = (course: string) => {
  const lowerCourse = course.toLowerCase();

  if (lowerCourse.includes('security') || lowerCourse.includes('forensics')) {
    return { category: 'Security', icon: SecurityIcon, color: '#f44336' };
  }
  if (
    lowerCourse.includes('cloud') ||
    lowerCourse.includes('distributed') ||
    lowerCourse.includes('network')
  ) {
    return { category: 'Systems', icon: CloudIcon, color: '#2196f3' };
  }
  if (
    lowerCourse.includes('data') ||
    lowerCourse.includes('algorithm') ||
    lowerCourse.includes('programming')
  ) {
    return { category: 'Programming', icon: DataObjectIcon, color: '#4caf50' };
  }
  return { category: 'General', icon: SchoolIcon, color: '#ff9800' };
};

export const EducationCourses: React.FC<EducationCoursesProps> = ({ courses }) => {
  const theme = useTheme();

  const sectionTitleStyles = {
    color: theme.palette.text.primary,
  };

  return (
    <>
      <Typography variant="h6" className="subsection-title" sx={sectionTitleStyles}>
        Key Courses
      </Typography>
      <Box className="education-courses">
        {courses.map((course, index) => {
          const courseInfo = getCourseCategory(course);
          const IconComponent = courseInfo.icon;

          return (
            <Chip
              key={index}
              label={course}
              size="small"
              icon={<IconComponent sx={{ fontSize: '0.9rem !important' }} />}
              className="education-course"
              sx={{
                backgroundColor: alpha(courseInfo.color, 0.1),
                color: courseInfo.color,
                border: `1px solid ${alpha(courseInfo.color, 0.3)}`,
                cursor: 'default',
                '&:hover': {
                  backgroundColor: alpha(courseInfo.color, 0.15),
                },
                '& .MuiChip-icon': {
                  color: courseInfo.color,
                  marginLeft: '0.5rem',
                },
                transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          );
        })}
      </Box>
    </>
  );
};
