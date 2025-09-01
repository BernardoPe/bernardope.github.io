import React from 'react';
import { Box } from '@mui/material';
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
        <Box className="hero-content-wrapper">
          <HeroContent
            greeting={data.hero.greeting}
            name={data.hero.name}
            title={data.hero.title}
            description={data.hero.description}
          />
          <HeroActions onDownloadCV={handleDownloadCV} onContactClick={handleContactClick} />
        </Box>
        <HeroAvatar src="/assets/images/me.jpg" alt="" />
      </Box>
    </Section>
  );
};
