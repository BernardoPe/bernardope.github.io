import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { Section } from '../Section';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ExperienceCard } from './ExperienceCard';
import { experienceData } from './experienceData';
import type { TimelineNode } from './types';
import './Experience.css';

interface ExperienceSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ sectionRef }) => {
  const cardsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const timelineNodes: TimelineNode[] = experienceData.map((exp) => ({
    id: exp.id,
    date: exp.endDate === 'Present' ? 'Current' : exp.startDate.split('-')[0],
    title: exp.title,
    company: exp.company,
    type: exp.type,
    isActive: exp.endDate === 'Present',
    logo: exp.companyLogo,
  }));

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
    maxWidth: '100vw',
  };

  const handleNodeClick = (nodeId: string) => {
    const cardElement = cardsRefs.current[nodeId];
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Section
      title="Work Experience"
      subtitle="My professional journey and career milestones"
      sectionRef={sectionRef}
      customStyles={containerStyles}
      centerContent={false}
      sectionId="experience"
    >
      <Box className="experience-timeline-container">
        <ExperienceTimeline nodes={timelineNodes} onNodeClick={handleNodeClick} />
      </Box>

      <Box className="experience-cards-container">
        {experienceData.map((experience) => (
          <div
            key={experience.id}
            ref={(el) => {
              if (el) cardsRefs.current[experience.id] = el;
            }}
          >
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </Box>
    </Section>
  );
};
