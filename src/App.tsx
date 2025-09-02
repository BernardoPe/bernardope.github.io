import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { ThemeContextProvider } from './Context/ThemeContext';
import { Box, CssBaseline } from '@mui/material';
import { ThemeToggle } from './Components/ThemeToggle';
import { TopNavigation } from './Components/Navigation/TopNavigation';
import { HeroSection } from './Components/Hero/HeroSection';
import { MobileNavigation } from './Components/Navigation/MobileNavigation';
import { EducationSection } from './Components/Education/EducationSection';
import { ExperienceSection } from './Components/Experience/ExperienceSection';
import { ProjectsSection } from './Components/Projects/ProjectsSection';
import { ContactSection } from './Components/Contact/ContactSection';
import { InteractiveBackground } from './Components/Background/InteractiveBackground';
import { useArrowNavigation } from './Hooks/useArrowNavigation';
import { useScrollSectionTracker } from './Hooks/useScrollSectionTracker';
import { SkillsSection } from './Components/Skills/SkillsSection';

export interface Section {
  id: string;
  title: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

const Content: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [navigationState, setNavigationState] = useState({
    currentSection: 0,
  });

  const sections: Section[] = [
    { id: 'hero', title: 'Home', ref: heroRef },
    { id: 'skills', title: 'Skills', ref: aboutRef },
    { id: 'experience', title: 'Experience', ref: experienceRef },
    { id: 'education', title: 'Education', ref: educationRef },
    { id: 'projects', title: 'Projects', ref: projectsRef },
    { id: 'contact', title: 'Contact', ref: contactRef },
  ];

  const activeScrollSection = useScrollSectionTracker({
    sectionRefs: sections.map((section) => section.ref),
  });

  useEffect(() => {
    setNavigationState({ currentSection: activeScrollSection });
  }, [activeScrollSection]);

  const scrollToSection = (index: number) => {
    setNavigationState({ currentSection: index });
    sections[index].ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useArrowNavigation({
    currentSection: navigationState.currentSection,
    totalSections: sections.length,
    onNavigate: scrollToSection,
  });

  return (
    <>
      <CssBaseline />
      <InteractiveBackground />
      <ThemeToggle />
      <Box sx={{ display: 'flex' }}>
        <TopNavigation
          sections={sections}
          currentSection={navigationState.currentSection}
          onSectionClick={scrollToSection}
        />
        <MobileNavigation
          sections={sections}
          currentSection={navigationState.currentSection}
          onSectionClick={scrollToSection}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <HeroSection sectionRef={heroRef} contactRef={contactRef} />
          <SkillsSection sectionRef={aboutRef} />
          <ExperienceSection sectionRef={experienceRef} />
          <EducationSection sectionRef={educationRef} />
          <ProjectsSection sectionRef={projectsRef} />
          <ContactSection sectionRef={contactRef} />
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
