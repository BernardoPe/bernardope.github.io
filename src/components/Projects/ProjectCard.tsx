import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';
import type { Project } from '../../Data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  });

  return (
    <Box
      ref={elementRef}
      className={`project-card ${isVisible ? 'visible' : ''}`}
      data-aos-delay={index * 100}
    >
      {/* Featured badge */}
      {project.featured && (
        <Chip label="Featured" size="small" className="project-featured-badge" />
      )}

      <Box className="project-content">
        {/* Header */}
        <Box className="project-header">
          <Box className="project-title-row">
            {project.logo && (
              <img src={project.logo} alt={`${project.title} logo`} className="project-logo" />
            )}
            <Typography variant="h5" component="h5" className="project-title">
              {project.title}
            </Typography>
          </Box>
          <Typography variant="body1" className="project-description">
            {project.description}
          </Typography>
        </Box>

        {/* Details */}
        <Box className="project-details">
          <ul className="project-details-list">
            {project.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </Box>

        {/* Technologies */}
        <Box className="project-technologies">
          <Box className="project-tech-list">
            {project.technologies.map((tech) => (
              <Box key={tech.name} className="project-tech-item">
                <img src={tech.icon} alt={tech.name} className="project-tech-icon" />
                <Typography variant="caption">{tech.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Links */}
        {(project.links.github || project.links.demo || project.links.article) && (
          <Box className="project-links">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link project-link-github"
              >
                <GitHubIcon />
                GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link project-link-demo"
              >
                <LaunchIcon />
                Demo
              </a>
            )}
            {project.links.article && (
              <a
                href={project.links.article}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link project-link-article"
              >
                <ArticleIcon />
                Article
              </a>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
