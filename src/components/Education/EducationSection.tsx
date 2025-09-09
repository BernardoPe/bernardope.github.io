import React from 'react';
import { Fade } from '../Fade';
import { Section } from '../Section';
import { EducationCard } from './EducationCard';
import { data } from '../../data';
import './Education.css';

export const EducationSection: React.FC = () => {
  return (
    <Section
      title="Education"
      subtitle="My educational journey and academic achievements"
      centerContent={false}
      sectionId="education"
    >
      <Fade direction="up" delay={200} duration={400} triggerOnce>
        {data.education.map((education, idx) => (
          <EducationCard key={idx} education={education} />
        ))}
      </Fade>
    </Section>
  );
};
