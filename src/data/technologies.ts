export interface Technology {
  id: string;
  name: string;
  description: string;
  projects: string[];
}

export const technologies: Technology[] = [
  {
    id: "nextjs",
    name: "Next.js",
    description:
      "5 years of production experience with Next.js 13+ (App Router, SSR/SSG, API routes) on a large-scale healthcare platform serving 500K+ monthly users. Built complex features including AI-powered search, multi-step booking flows, and real-time UI updates (e.g. AI search via Socket.IO) with Vercel deployment and Edgio CDN.",
    projects: ["thriveworks"],
  },
  {
    id: "react",
    name: "React",
    description:
      "React is my strongest and most recent technology. I have architected web projects from scratch and contributed to ongoing ones. I am familiar with modern techniques and libraries like code-splitting, Hooks, React-Router, Final-Form, Redux, Redux-api-middleware, CSS-in-JS, etc.",
    projects: ["thriveworks", "snapteam", "nykaa", "wakency"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    description:
      "Extensive TypeScript experience across both frontend (Next.js, React) and backend (NestJS) on a large-scale healthcare platform. Comfortable with advanced type patterns, generics, discriminated unions, and strict type safety across full-stack applications.",
    projects: ["thriveworks"],
  },
  {
    id: "nestjs",
    name: "NestJS",
    description:
      "Built and maintained the backend API layer for a large-scale healthcare platform using NestJS with TypeORM and PostgreSQL. Architected the AI module with Socket.IO for agent and real-time flows, Bull job queues with Redis, and integrations with OpenAI, PVerify, and AdvancedMD EHR.",
    projects: ["thriveworks"],
  },
  {
    id: "scss",
    name: "SCSS/Sass",
    description:
      "Proficient in SCSS/Sass for building responsive, themeable design systems. Used extensively on a healthcare platform for component-level styling, media queries, and design token management alongside Radix UI primitives.",
    projects: ["thriveworks", "benefactory"],
  },
  {
    id: "redux",
    name: "Redux",
    description:
      "State management with React (hooks, context, Redux) on a large-scale Next.js healthcare platform.",
    projects: ["thriveworks"],
  },
  {
    id: "radix-ui",
    name: "Radix UI",
    description:
      "Accessible UI primitives alongside SCSS on a production healthcare Next.js application.",
    projects: ["thriveworks"],
  },
  {
    id: "react-hook-form",
    name: "React Hook Form",
    description:
      "Form handling with Zod validation on complex multi-step booking and patient flows.",
    projects: ["thriveworks"],
  },
  {
    id: "zod",
    name: "Zod",
    description:
      "Schema validation paired with React Hook Form across patient and booking UIs.",
    projects: ["thriveworks"],
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    description:
      "Motion and transitions in patient-facing Next.js features.",
    projects: ["thriveworks"],
  },
  {
    id: "storybook",
    name: "Storybook",
    description:
      "Component documentation and visual testing for the design system.",
    projects: ["thriveworks"],
  },
  {
    id: "jest",
    name: "Jest",
    description:
      "Unit and integration tests for React components and utilities.",
    projects: ["thriveworks"],
  },
  {
    id: "testing-library",
    name: "Testing Library",
    description:
      "React Testing Library for user-centric component tests.",
    projects: ["thriveworks"],
  },
  {
    id: "rudderstack",
    name: "RudderStack",
    description:
      "Product analytics instrumentation on a high-traffic healthcare platform.",
    projects: ["thriveworks"],
  },
  {
    id: "datadog",
    name: "Datadog",
    description:
      "Real user monitoring (RUM) and observability for production web traffic.",
    projects: ["thriveworks"],
  },
  {
    id: "split-io",
    name: "Split.io",
    description:
      "Feature flags for controlled rollouts on a multi-state booking platform.",
    projects: ["thriveworks"],
  },
  {
    id: "vercel",
    name: "Vercel",
    description:
      "Deployment and hosting for the Next.js frontend with production traffic at scale.",
    projects: ["thriveworks"],
  },
  {
    id: "edgio",
    name: "Edgio",
    description:
      "CDN (Layer0/Edgio) in front of the deployed Next.js application.",
    projects: ["thriveworks"],
  },
  {
    id: "typeorm",
    name: "TypeORM",
    description:
      "ORM layer on NestJS with PostgreSQL for provider, booking, and platform data.",
    projects: ["thriveworks"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description:
      "Primary relational datastore for the NestJS API on a healthcare platform.",
    projects: ["thriveworks"],
  },
  {
    id: "bull",
    name: "Bull",
    description:
      "Redis-backed job queues for async work on the NestJS backend.",
    projects: ["thriveworks"],
  },
  {
    id: "redis",
    name: "Redis",
    description:
      "Caching and queue backing (Bull) for the NestJS services.",
    projects: ["thriveworks"],
  },
  {
    id: "openai",
    name: "OpenAI",
    description:
      "GPT, transcription, and TTS for AI-powered provider search and agent flows.",
    projects: ["thriveworks"],
  },
  {
    id: "vercel-ai-sdk",
    name: "Vercel AI SDK",
    description:
      "Streaming and text-to-speech integration alongside OpenAI on the stack.",
    projects: ["thriveworks"],
  },
  {
    id: "socket-io",
    name: "Socket.IO",
    description:
      "Real-time connection between the AI search agent, NestJS gateway, and live UI updates.",
    projects: ["thriveworks"],
  },
  {
    id: "pverify",
    name: "PVerify",
    description:
      "Insurance verification API integration on the healthcare backend.",
    projects: ["thriveworks"],
  },
  {
    id: "advancedmd",
    name: "AdvancedMD",
    description:
      "EHR integration as part of the platform’s clinical and scheduling ecosystem.",
    projects: ["thriveworks"],
  },
  {
    id: "docker",
    name: "Docker",
    description:
      "Containerized local and deployment workflows with Docker Compose.",
    projects: ["thriveworks"],
  },
  {
    id: "android",
    name: "Android",
    description:
      "I started my development journey with Android and it remains one of my strongest skills alongside React. I have end-to-end experience with Android app development \u2014 from building to publishing and maintaining \u2014 and have worked with essential libraries including Retrofit, Dagger, Picasso, ActiveAndroid, etc.",
    projects: ["vc_music_player", "measure"],
  },
  {
    id: "react-native",
    name: "React-Native",
    description:
      "I have built and published a React Native app for both iOS and Android using the React Native CLI, so I am familiar with the full development lifecycle. I have also contributed bug fixes to open-source React Native libraries.",
    projects: ["lighthouse", "pulse"],
  },
  {
    id: "laravel",
    name: "Laravel",
    description:
      "I have some experience with Laravel and backend development. While I haven't built a project from scratch in it, I have worked on individual modules and features. I am familiar with the framework's core features like MVC architecture, Blade templating, Eloquent ORM, Artisan, and Seeders.",
    projects: ["benefactory", "snapteam"],
  },
  {
    id: "electron",
    name: "Electron",
    description:
      "I have experience building an Electron app with React, handling platform-specific concerns such as Desktop/Web notifications, screen routing, and storage. Wrote build configurations to bundle the Web and Electron apps separately.",
    projects: ["snapteam"],
  },
];
