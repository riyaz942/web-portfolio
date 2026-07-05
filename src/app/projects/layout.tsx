import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Projects",
    template: "%s | Riyaz Ahmed",
  },
  description:
    "Projects Riyaz Ahmed has built and contributed to — web apps, mobile apps, and platform work.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
