export interface Education {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  grade?: string;
  finalProject?: {
    title: string;
    description: string;
    github?: string;
    grade: string;
  };
  description: string;
  achievements?: string[];
  courses: string[];
  logo?: string;
}
