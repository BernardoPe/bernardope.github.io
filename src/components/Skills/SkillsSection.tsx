import React from 'react';
import { Fade } from '../Fade';
import { Section } from '../Section';
import { data } from '../../data';
import './Skills.css';
import { SkillCard } from './SkillCard';

export const SkillsSection: React.FC = () => {
  return (
    <Section
      title="Skills"
      subtitle="An overview of my abilities and proficiencies"
      sectionId="skills"
    >
      <Fade direction="up" delay={200} duration={400} triggerOnce className="skills-container">
        {data.about.skills.map((group, index) => (
          <SkillCard key={group.title} group={group} index={index} />
        ))}
      </Fade>
    </Section>
  );
};

export default SkillsSection;
