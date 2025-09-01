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

export interface Technology {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'language';
}

export const projectsData: Project[] = [
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
];
