import React from 'react';
import { Section } from '../Section';
import { EducationCard } from './EducationCard';
import { data } from '../../data';
import './Education.css';

interface EducationSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ sectionRef }) => {
  return (
    <Section
      title="Education"
      subtitle="My educational journey and academic achievements"
      sectionRef={sectionRef}
      centerContent={false}
      sectionId="education"
    >
      {data.education.map((education, idx) => (
        <EducationCard key={idx} education={education} />
      ))}
    </Section>
  );
};
