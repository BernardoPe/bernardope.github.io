import React from 'react';
import { Box, Typography, Card, useTheme, alpha } from '@mui/material';
import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { Section } from '../Section';
import './Contact.css';

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef }) => {
  const theme = useTheme();

  const cardStyles = {
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.background.paper, 0.98)
        : alpha(theme.palette.background.paper, 0.85),
    boxShadow: theme.palette.mode === 'light' ? 1 : 2,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.mode === 'light' ? 6 : 8,
      borderColor: alpha(theme.palette.primary.main, 0.5),
    },
  };

  const iconStyles = {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  };

  const linkStyles = {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  };

  return (
    <Section
      sectionRef={sectionRef}
      className="contact-section"
      title="Get In Touch"
      subtitle="I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!"
      sectionId="contact"
    >
      <div className="contact-container">
        <Card sx={cardStyles} className="contact-card">
          <div className="contact-icon" style={iconStyles}>
            <EmailIcon />
          </div>
          <Typography variant="h6" className="contact-card-title" sx={{ color: 'text.primary' }}>
            Email
          </Typography>
          <Typography
            variant="body2"
            className="contact-card-content"
            sx={{ color: 'text.secondary' }}
          >
            Send me a message
          </Typography>
          <Box
            component="a"
            href="mailto:bernardo.correia.pereira@gmail.com"
            className="contact-link"
            sx={linkStyles}
          >
            <EmailIcon sx={{ fontSize: '1rem' }} />
            Send Email
          </Box>
        </Card>

        <Card sx={cardStyles} className="contact-card">
          <div className="contact-icon" style={iconStyles}>
            <LinkedInIcon />
          </div>
          <Typography variant="h6" className="contact-card-title" sx={{ color: 'text.primary' }}>
            LinkedIn
          </Typography>
          <Typography
            variant="body2"
            className="contact-card-content"
            sx={{ color: 'text.secondary' }}
          >
            Let's connect
          </Typography>
          <Box
            component="a"
            href="https://linkedin.com/in/BernardoPe"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            sx={linkStyles}
          >
            <LinkedInIcon sx={{ fontSize: '1rem' }} />
            Connect
          </Box>
        </Card>

        <Card sx={cardStyles} className="contact-card">
          <div className="contact-icon" style={iconStyles}>
            <GitHubIcon />
          </div>
          <Typography variant="h6" className="contact-card-title" sx={{ color: 'text.primary' }}>
            GitHub
          </Typography>
          <Typography
            variant="body2"
            className="contact-card-content"
            sx={{ color: 'text.secondary' }}
          >
            Check out my projects
          </Typography>
          <Box
            component="a"
            href="https://github.com/BernardoPe"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            sx={linkStyles}
          >
            <GitHubIcon sx={{ fontSize: '1rem' }} />
            Follow
          </Box>
        </Card>
      </div>
    </Section>
  );
};
