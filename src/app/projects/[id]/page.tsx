import type { Metadata } from "next";
import {
  projects,
  publishedProjects,
  getProjectShortDescription,
} from "@/data/projects";
import ProjectDetail from "./ProjectDetail";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects[id];
  if (!project) return {};
  const description = getProjectShortDescription(project);
  return {
    title: project.name,
    description,
    openGraph: {
      title: project.name,
      description,
      images: project.images.length > 0 ? [project.images[0].src] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectDetail id={id} />;
}
