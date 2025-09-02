import React from 'react';
import { Box } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { HeroContent } from './HeroContent';
import { HeroActions } from './HeroActions';
import { HeroAvatar } from './HeroAvatar';
import { data } from '../../data';
import './Hero.css';
import { Section } from '../Section';

interface HeroSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  contactRef?: React.RefObject<HTMLDivElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ sectionRef, contactRef }) => {
  const contentContainerStyles = {
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Bernardo_Pereira_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = () => {
    contactRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section sectionRef={sectionRef} sectionId="hero">
      <Box sx={contentContainerStyles} className="hero-content-layout">
        <Fade direction="up" delay={100} duration={400} triggerOnce>
          <Box className="hero-content-wrapper">
            <HeroContent
              greeting={data.hero.greeting}
              name={data.hero.name}
              title={data.hero.title}
              description={data.hero.description}
            />
            <HeroActions onDownloadCV={handleDownloadCV} onContactClick={handleContactClick} />
          </Box>
        </Fade>
        <Fade direction="up" delay={100} duration={600} triggerOnce>
          <HeroAvatar src="/assets/images/me.jpg" alt="" />
        </Fade>
      </Box>
    </Section>
  );
};
