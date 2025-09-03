import React from 'react';
import { Box } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { Section } from '../Section';
import { data } from '../../data';
import './Skills.css';
import { SkillCard } from './SkillCard';

export const SkillsSection: React.FC<{ sectionRef: React.RefObject<HTMLDivElement | null> }> = ({
  sectionRef,
}) => {
  return (
    <Section
      title="Skills"
      subtitle="An overview of my abilities and proficiencies"
      sectionRef={sectionRef}
      sectionId="skills"
    >
      <Box className="skills-container">
        <Fade direction="up" delay={100} duration={600} triggerOnce>
          {data.about.skills.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </Fade>
      </Box>
    </Section>
  );
};

export default SkillsSection;
