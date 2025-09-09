import React, { useRef } from 'react';
import { Fade } from '../Fade';
import { Section } from '../Section';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ExperienceCard } from './ExperienceCard';
import { data } from '../../data';
import type { TimelineNode } from './types';
import './Experience.css';

export const ExperienceSection: React.FC = () => {
  const cardsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const timelineNodes: TimelineNode[] = data.experience.map((exp) => ({
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
      customStyles={containerStyles}
      centerContent={false}
      sectionId="experience"
    >
      <Fade direction="up" delay={200} duration={400} triggerOnce className="timeline-container">
        <ExperienceTimeline nodes={timelineNodes} onNodeClick={handleNodeClick} />
      </Fade>

      <Fade
        direction="up"
        delay={200}
        duration={400}
        triggerOnce
        className="experience-cards-container"
      >
        {data.experience.map((experience) => (
          <div
            key={experience.id}
            ref={(el) => {
              if (el) cardsRefs.current[experience.id] = el;
            }}
          >
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </Fade>
    </Section>
  );
};
