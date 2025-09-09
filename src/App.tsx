import React, { useRef } from 'react';
import './App.css';
import { ThemeContextProvider } from './context/ThemeContext';
import { Box, CssBaseline } from '@mui/material';
import { ThemeToggle } from './components/ThemeToggle';
import { TopNavigation } from './components/Navigation/TopNavigation';
import { HeroSection } from './components/Hero/HeroSection';
import { MobileNavigation } from './components/Navigation/MobileNavigation';
import { EducationSection } from './components/Education/EducationSection';
import { ExperienceSection } from './components/Experience/ExperienceSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { ContactSection } from './components/Contact/ContactSection';
import { SkillsSection } from './components/Skills/SkillsSection';
import { useIsMobile } from './hooks/useMediaQuery';
import { InteractiveBackground } from './components/Background/InteractiveBackground';

export interface Section {
  id: string;
  title: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

const Content: React.FC = () => {
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = [
    { id: 'hero', title: 'Home', ref: heroRef },
    { id: 'skills', title: 'Skills', ref: aboutRef },
    { id: 'experience', title: 'Experience', ref: experienceRef },
    { id: 'education', title: 'Education', ref: educationRef },
    { id: 'projects', title: 'Projects', ref: projectsRef },
    { id: 'contact', title: 'Contact', ref: contactRef },
  ];

  return (
    <>
      <CssBaseline />
      <ThemeToggle />
      <InteractiveBackground />
      <Box sx={{ display: 'flex' }}>
        {!isMobile && <TopNavigation sections={sections} />}
        {isMobile && <MobileNavigation sections={sections} />}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <HeroSection />
          <SkillsSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <ContactSection />
        </Box>
      </Box>
    </>
  );
};

function App() {
  return (
    <ThemeContextProvider>
      <Content />
    </ThemeContextProvider>
  );
}

export default App;
