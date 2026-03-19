/**
 * Groups project technology IDs into display categories for the project detail page.
 * Any ID not listed falls under "other".
 */

export type TechStackCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "ai"
  | "testing"
  | "infra"
  | "mobile"
  | "other";

export const TECH_STACK_CATEGORY_ORDER: TechStackCategoryId[] = [
  "languages",
  "frontend",
  "backend",
  "ai",
  "testing",
  "infra",
  "mobile",
  "other",
];

export const TECH_STACK_CATEGORY_LABELS: Record<TechStackCategoryId, string> =
  {
    languages: "Languages",
    frontend: "Frontend & UI",
    backend: "Backend & Database",
    ai: "AI & Integrations",
    testing: "Testing & Analytics",
    infra: "Infrastructure & Tools",
    mobile: "Mobile & Desktop",
    other: "Other",
  };

const TECH_ID_TO_CATEGORY: Record<string, TechStackCategoryId> = {
  typescript: "languages",

  nextjs: "frontend",
  react: "frontend",
  scss: "frontend",
  "radix-ui": "frontend",
  "framer-motion": "frontend",
  "react-hook-form": "frontend",
  zod: "frontend",
  storybook: "frontend",
  redux: "frontend",
  "vanilla-js": "frontend",

  nestjs: "backend",
  postgresql: "backend",
  redis: "backend",
  bull: "backend",
  typeorm: "backend",
  laravel: "backend",

  openai: "ai",
  "vercel-ai-sdk": "ai",
  "socket-io": "ai",
  pverify: "ai",
  advancedmd: "ai",

  jest: "testing",
  "testing-library": "testing",
  datadog: "testing",
  rudderstack: "testing",
  "split-io": "testing",

  vercel: "infra",
  docker: "infra",
  edgio: "infra",

  "react-native": "mobile",
  android: "mobile",
  electron: "mobile",
};

export interface TechStackCategoryGroup {
  categoryId: TechStackCategoryId;
  label: string;
  techIds: string[];
}

export function groupProjectTechByCategory(
  techIds: string[],
): TechStackCategoryGroup[] {
  const buckets: Record<TechStackCategoryId, string[]> = {
    languages: [],
    frontend: [],
    backend: [],
    ai: [],
    testing: [],
    infra: [],
    mobile: [],
    other: [],
  };

  for (const id of techIds) {
    const category = TECH_ID_TO_CATEGORY[id] ?? "other";
    buckets[category].push(id);
  }

  return TECH_STACK_CATEGORY_ORDER.filter(
    (categoryId) => buckets[categoryId].length > 0,
  ).map((categoryId) => ({
    categoryId,
    label: TECH_STACK_CATEGORY_LABELS[categoryId],
    techIds: buckets[categoryId],
  }));
}
