import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiOpenjdk,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSass,
  SiRedux,
  SiReactquery,
  SiZod,
  SiD3,
  SiChartdotjs,
  SiJquery,
  SiNodedotjs,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiAndroid,
  SiElectron,
  SiVercel,
  SiDocker,
  SiAuth0,
  SiFirebase,
  SiDatadog,
  SiGit,
  SiJira,
  SiFigma,
  SiJest,
  SiTestinglibrary,
  SiCursor,
} from "@icons-pack/react-simple-icons";

export const SKILL_ICONS = {
  // Languages
  javascript: { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  typescript: { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  html5: { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  css3: { icon: SiCss, label: "CSS3", color: "#1572B6" },
  java: { icon: SiOpenjdk, label: "Java", color: "#437291" },
  php: { icon: SiPhp, label: "PHP", color: "#777BB4" },

  // Frontend Frameworks & Libraries
  react: { icon: SiReact, label: "React", color: "#61DAFB" },
  nextjs: { icon: SiNextdotjs, label: "Next.js", color: "#000000" },
  tailwindcss: { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
  sass: { icon: SiSass, label: "Sass/SCSS", color: "#CC6699" },
  redux: { icon: SiRedux, label: "Redux", color: "#764ABC" },
  reactquery: { icon: SiReactquery, label: "TanStack Query", color: "#FF4154" },
  zod: { icon: SiZod, label: "Zod", color: "#3E67B1" },
  d3: { icon: SiD3, label: "D3.js", color: "#F9A03C" },
  chartjs: { icon: SiChartdotjs, label: "Chart.js", color: "#FF6384" },
  jquery: { icon: SiJquery, label: "jQuery", color: "#0769AD" },

  // Backend, Databases & Desktop
  nodejs: { icon: SiNodedotjs, label: "Node.js", color: "#5FA04E" },
  laravel: { icon: SiLaravel, label: "Laravel", color: "#FF2D20" },
  mysql: { icon: SiMysql, label: "MySQL", color: "#4479A1" },
  postgresql: { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
  android: { icon: SiAndroid, label: "Android", color: "#34A853" },
  electron: { icon: SiElectron, label: "Electron", color: "#47848F" },

  // Cloud, DevOps & Infrastructure
  vercel: { icon: SiVercel, label: "Vercel", color: "#000000" },
  docker: { icon: SiDocker, label: "Docker", color: "#2496ED" },
  auth0: { icon: SiAuth0, label: "Auth0", color: "#EB5424" },
  firebase: { icon: SiFirebase, label: "Firebase", color: "#DD2C00" },
  datadog: { icon: SiDatadog, label: "Datadog", color: "#632CA6" },

  // AI, Tools & Testing
  git: { icon: SiGit, label: "Git", color: "#F05032" },
  jira: { icon: SiJira, label: "Jira", color: "#0052CC" },
  figma: { icon: SiFigma, label: "Figma", color: "#F24E1E" },
  jest: { icon: SiJest, label: "Jest", color: "#C21325" },
  testinglibrary: {
    icon: SiTestinglibrary,
    label: "Testing Library",
    color: "#E33332",
  },
  cursor: { icon: SiCursor, label: "Cursor", color: "#000000" },
} as const;

export type SkillIconKey = keyof typeof SKILL_ICONS;
