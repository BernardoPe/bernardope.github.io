import React from 'react';
import { Box } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { Section } from '../Section';
import { ProjectCard } from './ProjectCard';
import { data } from '../../Data';
import './Projects.css';

interface ProjectsSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ sectionRef }) => {
  const sortedProjects = [...data.projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <Section
      title="Projects"
      subtitle="A showcase of my development work and contributions"
      sectionRef={sectionRef}
      className="projects-section"
      sectionId="projects"
    >
      <Fade direction="up" delay={300} duration={600} triggerOnce>
        <Box className="projects-grid">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </Box>
      </Fade>
    </Section>
  );
};
