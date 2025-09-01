export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
  description: string;
  teamSize?: string;
  technologies: string[];
  achievements: string[];
  responsibilities?: string[];
  companyLogo?: string;
  companyUrl?: string;
}

export interface TimelineNode {
  id: string;
  date: string;
  title: string;
  company: string;
  type: Experience['type'];
  isActive: boolean;
  logo?: string;
}
