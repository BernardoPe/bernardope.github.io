// Re-export types from the main data file for backward compatibility
export type {
  Technology,
  Project,
  Experience,
  Education,
  SkillCategory,
  ContactInfo,
  AppData,
} from './index';

export { data, aboutData, projectsData, experienceData, educationData, contactData } from './index';
