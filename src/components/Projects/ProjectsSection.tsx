import React from 'react';
import { Fade } from '../Fade';
import { Section } from '../Section';
import { ProjectCard } from './ProjectCard';
import { data } from '../../data';
import './Projects.css';

export const ProjectsSection: React.FC = () => {
  const sortedProjects = [...data.projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <Section
      title="Projects"
      subtitle="A showcase of my development work and contributions"
      className="projects-section"
      sectionId="projects"
    >
      <Fade direction="up" delay={200} duration={400} triggerOnce className="projects-grid">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </Fade>
    </Section>
  );
};
