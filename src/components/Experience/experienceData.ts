import type { Experience } from './types';
import skyLogo from '../../assets/logos/sky_logo.png';

export const experienceData: Experience[] = [
  {
    id: 'sky-apprentice',
    title: 'Apprentice Developer',
    company: 'Sky',
    location: 'Lisbon, Portugal',
    startDate: '2025-07',
    endDate: '2025-08',
    type: 'internship',
    description:
      'Built tooling for multi-device deeplink testing as part of xTV Devices & Tech, focusing on improving development workflows and testing infrastructure.',
    technologies: ['TypeScript', 'Lightning.js', 'WebOS', 'Tizen', 'Webpack'],
    achievements: [
      'Developed a comprehensive testing application for multi-device deeplink functionality',
      'Implemented deeplink testing for Samsung Tizen 3.0+ and LG webOS 3.0+ devices',
      'Added support for testing major streaming platforms: Peacock, SkyShowtime, Now TV and Showmax',
    ],
    companyUrl: 'https://www.sky.com',
    companyLogo: skyLogo,
  },
];

export default experienceData;
