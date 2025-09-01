import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { Section } from '../Section';
import { projectsData } from '../../data/projects';
import type { Project } from '../../data/projects';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Projects.css';

interface ProjectsSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project }) => {
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
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.mode === 'light' ? 6 : 8,
      borderColor: alpha(theme.palette.primary.main, 0.5),
    },
  };

  const titleStyles = {
    color: 'primary.main',
  };

  const descriptionStyles = {
    color: 'text.secondary',
  };

  const detailTextStyles = {
    color: 'text.primary',
  };

  const bulletDotStyles = {
    bgcolor: 'primary.main',
  };

  const getStatusBadgeClass = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'project-status-completed';
      case 'in-progress':
        return 'project-status-in-progress';
      case 'planned':
        return 'project-status-planned';
      default:
        return 'project-status-completed';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'Current';
      case 'planned':
        return 'Planned';
      default:
        return 'Completed';
    }
  };

  const getTechChipColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return {
          bg: 'rgba(59, 130, 246, 0.1)',
          border: 'rgba(59, 130, 246, 0.3)',
          color: '#3b82f6',
        };
      case 'backend':
        return { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', color: '#22c55e' };
      case 'database':
        return {
          bg: 'rgba(168, 85, 247, 0.1)',
          border: 'rgba(168, 85, 247, 0.3)',
          color: '#a855f7',
        };
      case 'tool':
        return {
          bg: 'rgba(251, 191, 36, 0.1)',
          border: 'rgba(251, 191, 36, 0.3)',
          color: '#fbbf24',
        };
      case 'language':
        return { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' };
      default:
        return {
          bg: 'rgba(107, 114, 128, 0.1)',
          border: 'rgba(107, 114, 128, 0.3)',
          color: '#6b7280',
        };
    }
  };

  return (
    <Box
      ref={elementRef}
      sx={cardStyles}
      className={`project-card ${project.featured ? 'featured' : ''} fade-up-staggered ${isVisible ? 'visible' : ''}`}
    >
      <div className={`project-status-badge ${getStatusBadgeClass(project.status)}`}>
        {getStatusLabel(project.status)}
      </div>

      <div className="project-card-content">
        <div className="project-card-header">
          <Typography variant="h5" sx={titleStyles} className="project-card-title">
            {project.title}
          </Typography>

          <Typography variant="body2" sx={descriptionStyles} className="project-card-description">
            {project.description}
          </Typography>
        </div>

        <div className="project-details-section">
          <ul className="project-details-list">
            {project.details.map((detail, idx) => (
              <li key={idx} className="project-detail-item">
                <div className="project-detail-dot">
                  <Box sx={bulletDotStyles} className="project-detail-circle" />
                </div>
                <Typography variant="body2" sx={detailTextStyles} className="project-detail-text">
                  {detail}
                </Typography>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-technologies-section">
          <div className="project-technologies-container">
            {project.technologies.map((tech, idx) => {
              const colors = getTechChipColor(tech.category);
              return (
                <span
                  key={idx}
                  className="project-tech-chip"
                  style={{
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    color: colors.color,
                  }}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="project-tech-icon"
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: '6px',
                      verticalAlign: 'middle',
                    }}
                  />
                  {tech.name}
                </span>
              );
            })}
          </div>

          {(project.links.github || project.links.demo || project.links.article) && (
            <div className="project-links-section">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-button"
                  style={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  }}
                >
                  <GitHubIcon sx={{ fontSize: '1rem' }} />
                  GitHub
                </a>
              )}

              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-button"
                  style={{
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                  }}
                >
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                  Live Demo
                </a>
              )}

              {project.links.article && (
                <a
                  href={project.links.article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-button"
                  style={{
                    backgroundColor: alpha('#6b7280', 0.1),
                    color: '#6b7280',
                    border: `1px solid ${alpha('#6b7280', 0.3)}`,
                  }}
                >
                  <ArticleIcon sx={{ fontSize: '1rem' }} />
                  Article
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ sectionRef }) => {
  const sortedProjects = [...projectsData].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <Section
      title="Projects"
      subtitle="A showcase of my development work and contributions"
      sectionRef={sectionRef}
      sectionId="projects"
    >
      <Box className="projects-container">
        {sortedProjects.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </Box>
    </Section>
  );
};
