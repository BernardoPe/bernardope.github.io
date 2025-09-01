// Import necessary assets
import lightningjs from '../assets/logos/lightningjs.png';
import skyLogo from '../assets/logos/sky_logo.png';
import istLogo from '../assets/logos/ist_a_logo.png';
import iselLogo from '../assets/logos/isel_logo.png';

// Core Types
export interface Technology {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'language';
}

export interface Project {
  title: string;
  description: string;
  details: string[];
  technologies: Technology[];
  links: {
    github?: string;
    demo?: string;
    article?: string;
  };
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  type: 'internship' | 'full-time' | 'part-time' | 'contract';
  description: string;
  technologies: string[];
  achievements: string[];
  companyUrl: string;
  companyLogo: string;
}

export interface Education {
  degree: string;
  institution: string;
  grade?: string;
  startYear: string;
  endYear: string;
  description: string;
  courses: string[];
  achievements?: string[];
  finalProject?: {
    title: string;
    description: string;
    github: string;
    grade: string;
  };
  logo: string;
}

export interface SkillCategory {
  title: string;
  text: string[];
  list: Array<{
    name: string;
    icon: string;
  }>;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
}

// Consolidated Data Structure
export interface AppData {
  me: {
    name: string;
    occupation: string;
    education: string;
    passions: string[];
    currently: string[];
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
  };
  about: {
    greeting: {
      name: string;
      position: string;
      location: string;
    };
    skills: SkillCategory[];
  };
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact: ContactInfo;
  social: {
    linkedin: string;
    github: string;
  };
}

// Main Data Export
export const data: AppData = {
  me: {
    name: 'Bernardo Pereira',
    occupation:
      'MSc Computer Science & Engineering student at Instituto Superior Técnico (starting Sep 2025)',
    education: 'Instituto Superior Técnico',
    passions: [
      'Building impactful software',
      'Blending clean and efficient code with creative problem-solving',
    ],
    currently: [
      'Apprentice Developer @ Sky — building tooling for multi-device deeplink testing',
      'Active maintainer of HtmlFlow (Java/Kotlin DSL for HTML)',
    ],
  },
  hero: {
    greeting: "Hello! I'm",
    name: 'Bernardo Pereira',
    title: 'Computer Science and Engineering Student',
    description:
      "I'm a MSc Computer Science & Engineering student at Instituto Superior Técnico, passionate about building impactful software. I'm always looking for ways to blend clean and efficient code with creative problem-solving.",
  },
  about: {
    greeting: {
      name: 'Bernardo Pereira',
      position: 'Computer Science and Engineering Student',
      location: 'Lisbon, Portugal',
    },
    skills: [
      {
        title: 'Programming Languages',
        text: [
          'Proficient in multiple languages to solve diverse problems',
          'Solid foundations in both compiled and interpreted languages',
          'Experienced with object-oriented and functional programming paradigms',
        ],
        list: [
          {
            name: 'Kotlin',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
          },
          {
            name: 'Java',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
          },
          {
            name: 'Python',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
          },
          {
            name: 'C',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
          },
          {
            name: 'JavaScript',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
          },
          {
            name: 'TypeScript',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
          },
        ],
      },
      {
        title: 'Frontend',
        text: [
          'Modern web development with React and component-driven architectures',
          'Responsive, accessible UIs using HTML5, CSS3 and modern JavaScript',
          'Familiar with build tooling and API testing (Webpack, Postman)',
        ],
        list: [
          {
            name: 'HTML',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
          },
          {
            name: 'CSS',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
          },
          {
            name: 'React',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
          },
          {
            name: 'Webpack',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg',
          },
          { name: 'LightningJs', icon: lightningjs },
          {
            name: 'Postman',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
          },
        ],
      },
      {
        title: 'Backend',
        text: [
          'Database design and management using SQL and NoSQL systems',
          'Server-side development with Node.js and Spring ecosystems',
          'Designing RESTful APIs and microservices for scalable systems',
        ],
        list: [
          {
            name: 'PostgreSQL',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
          },
          {
            name: 'MongoDB',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
          },
          {
            name: 'Elastic Search',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg',
          },
          {
            name: 'Spring',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
          },
          {
            name: 'Quarkus',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/quarkus/quarkus-original.svg',
          },
          {
            name: 'Express',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
          },
        ],
      },
      {
        title: 'Cloud & DevOps',
        text: [
          'Experience with Google Cloud Platform services',
          'Containerization and CI/CD workflows with Docker',
          'Web server configuration and reverse proxy using Nginx',
        ],
        list: [
          {
            name: 'Google Cloud',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
          },
          {
            name: 'Docker',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
          },
          {
            name: 'Nginx',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
          },
          {
            name: 'Git',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
          },
          {
            name: 'Github Actions',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
          },
        ],
      },
    ],
  },
  projects: [
    {
      title: 'HtmlFlow',
      description: 'Java/Kotlin DSL for HTML templating with active contribution and maintenance',
      details: [
        'Active contributor and maintainer of HtmlFlow, a DSL for building HTML in Java/Kotlin',
        'Working on integration with the http4k framework for seamless web development',
        'Implemented Hot Reloading support for views to improve developer experience',
      ],
      technologies: [
        {
          name: 'Java',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
          category: 'language',
        },
        {
          name: 'Kotlin',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
          category: 'language',
        },
        {
          name: 'HTML',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
          category: 'frontend',
        },
      ],
      links: {
        github: 'https://github.com/xmlet/HtmlFlow',
      },
      status: 'in-progress',
      featured: true,
    },
    {
      title: 'Musyk',
      description: 'A discord music bot built with discord.js and discord-player',
      details: [
        'Maintainer of Musyk, my personal discord music bot',
        'Implemented features like playlist management, song search, and audio filters',
        'Integrated with various music APIs for seamless playback',
        'Used Prisma for database management of server configuration data',
      ],
      technologies: [
        {
          name: 'TypeScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
          category: 'language',
        },
        {
          name: 'Prisma',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
          category: 'database',
        },
        {
          name: 'Discord.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discordjs/discordjs-original.svg',
          category: 'frontend',
        },
        {
          name: 'Discord-player',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discordjs/discordjs-original.svg',
          category: 'backend',
        },
        {
          name: 'Docker',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
          category: 'tool',
        },
      ],
      links: {
        github: 'https://github.com/xmlet/HtmlFlow',
      },
      status: 'in-progress',
      featured: true,
    },
    {
      title: 'Non-Blocking Progressive SSR Benchmark',
      description:
        'Performance benchmark comparing reactive, coroutine, and virtual thread approaches to HTML rendering',
      details: [
        'Benchmarked PSSR in Kotlin using Spring MVC, WebFlux, and Quarkus with reactive, coroutine, and virtual thread approaches',
        'Demonstrated how Java Virtual Threads enable non-blocking rendering with external DSL engines',
        'Achieved comparable scalability to non-blocking models with simpler synchronous API code',
        'Final Project for BSc in Computer Science and Engineering (20/20 grade)',
      ],
      technologies: [
        {
          name: 'Java',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
          category: 'language',
        },
        {
          name: 'Kotlin',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
          category: 'language',
        },
        {
          name: 'Spring Boot',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
          category: 'backend',
        },
        {
          name: 'Quarkus',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/quarkus/quarkus-original.svg',
          category: 'backend',
        },
        {
          name: 'Virtual Threads',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
          category: 'language',
        },
      ],
      links: {
        github: 'https://github.com/xmlet/comparing-non-blocking-progressive-ssr',
        article: 'https://www.mdpi.com/2674-113X/4/3/20',
      },
      status: 'completed',
      featured: false,
    },
    {
      title: 'Instant Messaging',
      description: 'Full-stack real-time messaging application with Android and Web clients',
      details: [
        'Built an Android client in Kotlin as well as a web client with React + TypeScript for a real-time channel-based messaging platform',
        'Integrated Server-Sent Events (SSE) for instant message delivery and updates',
        'Consumed a Spring REST API with OkHttp to handle authentication, channel management, and messaging',
        'Implemented real-time communication features for seamless user experience',
      ],
      technologies: [
        {
          name: 'Kotlin',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
          category: 'language',
        },
        {
          name: 'Android',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
          category: 'frontend',
        },
        {
          name: 'React',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
          category: 'frontend',
        },
        {
          name: 'TypeScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
          category: 'language',
        },
        {
          name: 'Spring Boot',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
          category: 'backend',
        },
        {
          name: 'PostgreSQL',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
          category: 'database',
        },
        {
          name: 'Docker',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
          category: 'tool',
        },
        {
          name: 'Nginx',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
          category: 'tool',
        },
      ],
      links: {
        github: 'https://github.com/bernardope/instant-messaging',
      },
      status: 'completed',
      featured: false,
    },
  ],
  experience: [
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
  ],
  education: [
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
        'Information Systems',
        'Computer Networks',
        'Languages and Execution Environments',
      ],
      logo: iselLogo,
    },
  ],
  contact: {
    email: 'bernardo.correia.pereira@gmail.com',
    linkedin: 'https://linkedin.com/in/BernardoPe',
    github: 'https://github.com/BernardoPe',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/bernardope/',
    github: 'https://github.com/bernardope',
  },
};

// Legacy exports for backward compatibility
export type Data = AppData;
export const aboutData = data.about;
export const projectsData = data.projects;
export const experienceData = data.experience;
export const educationData = data.education;
export const contactData = data.contact;
