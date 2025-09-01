export type Data = {
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
  projects: {
    name: string;
    description: string;
  }[];
  social: {
    linkedin: string;
    github: string;
  };
};

export const data: Data = {
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
  projects: [
    {
      name: 'HtmlFlow',
      description: 'Java/Kotlin DSL for building HTML, currently integrating with http4k',
    },
    {
      name: 'Instant Messaging App',
      description: 'Android & Web clients + Spring REST API with SSE for real-time updates',
    },
    {
      name: 'Musyk',
      description: 'A discord bot able to play music in voice channels',
    },
    {
      name: 'PSSR Benchmark',
      description:
        'Final BSc Project - Benchmarked reactive, coroutine, and virtual thread approaches to HTML rendering with template engines',
    },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/in/bernardope/',
    github: 'https://github.com/bernardope',
  },
};
