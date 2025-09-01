import React from 'react';
import { Section } from '../Section';
import { EducationCard } from './EducationCard';
import type { Education } from './types';
import iselLogo from '../../assets/logos/isel_logo.png';
import istLogo from '../../assets/logos/ist_a_logo.png';
import './Education.css';

interface EducationSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

const educationData: Education[] = [
  {
    degree: 'MSc in Computer Science & Engineering',
    institution: 'Instituto Superior Técnico',
    startYear: 'Sep. 2025',
    endYear: 'Present',
    description:
      'Advanced studies in computer science with a focus on Distributed Systems, Cybersecurity and Data Science.',
    courses: [
      'Design and Implementation of Distributed Applications',
      'Cloud Computing and Virtualization',
      'Software Security',
      'Network and Computer Security',
      'Highly Dependable Systems',
      'Forensics Cyber-Security',
    ],
    logo: istLogo,
  },
  {
    degree: 'BSc in Computer Science & Engineering',
    institution: 'Instituto Superior de Engenharia de Lisboa',
    grade: '17/20',
    startYear: 'Sep. 2022',
    endYear: 'Jul. 2025',
    description:
      'Fundamental studies in computer science covering algorithms, data structures, and software engineering principles.',
    achievements: [
      'Received a merit award for academic excellence for the 2022/2023 academic year',
    ],
    finalProject: {
      title: 'Non-Blocking Progressive SSR Benchmark',
      description:
        'Benchmarked reactive, coroutine, and virtual thread approaches to HTML rendering with template engines in order to evaluate the viability of virtual threads for non-blocking PSSR with external DSL engines.',
      github: 'https://github.com/xmlet/comparing-non-blocking-progressive-ssr',
      grade: '20/20',
    },
    courses: [
      'Data Structures and Algorithms',
      'Software Development Techniques',
      'Web Application Development',
      'Computer Architectures',
      'Mobile Device Programming',
      'Computer Security',
      'Concurrent Programming',
      'Programming',
      'Web Application Development',
      'Information Systems',
      'Computer Networks',
      'Languages and Execution Environments',
    ],
    logo: iselLogo,
  },
];

export const EducationSection: React.FC<EducationSectionProps> = ({ sectionRef }) => {
  return (
    <Section
      title="Education"
      subtitle="My educational journey and academic achievements"
      sectionRef={sectionRef}
      centerContent={false}
      sectionId="education"
    >
      {educationData.map((education, idx) => (
        <EducationCard key={idx} education={education} />
      ))}
    </Section>
  );
};
