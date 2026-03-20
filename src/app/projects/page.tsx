"use client";

import Image from "next/image";
import { useCallback } from "react";
import {
  getProjectListingTechDisplay,
  getProjectShortDescription,
  projectList,
} from "@/data/projects";
import { technologies } from "@/data/technologies";
import {
  useViewTransitionRouter,
  waitForElement,
} from "@/hooks/useViewTransition";
import ScrollRestore from "@/components/ScrollRestore";

const techNameMap = Object.fromEntries(technologies.map((t) => [t.id, t.name]));

const displayProjects = projectList.filter(
  (p) => p.icon && p.description.trim().length > 0,
);

function clearAllIconVTNames() {
  document
    .querySelectorAll<HTMLElement>("[data-project-icon]")
    .forEach((el) => {
      el.style.viewTransitionName = "";
    });
}

function setIconVTName(projectId: string) {
  clearAllIconVTNames();
  const el = document.querySelector(
    `[data-project-icon="${projectId}"]`,
  ) as HTMLElement | null;
  if (el) el.style.viewTransitionName = "project-icon";
}

export default function ProjectsPage() {
  const { push } = useViewTransitionRouter();

  const navigateToProject = useCallback(
    (projectId: string) => {
      push(`/projects/${projectId}`, {
        beforeSnapshot: () => setIconVTName(projectId),
        afterDomUpdate: async () => {
          await waitForElement("[data-project-detail-icon]");
        },
      });
    },
    [push],
  );

  const navigateHome = useCallback(() => {
    push("/", {
      beforeSnapshot: clearAllIconVTNames,
    });
  }, [push]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollRestore path="/projects" />
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-4">
          <button
            onClick={navigateHome}
            className="group flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">Home</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-sm font-semibold tracking-wide">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="mb-12 md:mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            <span className="text-foreground">My </span>
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-3 text-muted text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed max-w-xl">
            A collection of products I&apos;ve built and contributed to across web, mobile, and desktop platforms.
          </p>
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayProjects.map((project, index) => {
            const { shown, moreCount } = getProjectListingTechDisplay(project);
            return (
            <article
              key={project.id}
              onClick={() => navigateToProject(project.id)}
              className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-accent/8 to-accent-secondary/8 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

              <div className="relative p-5 md:p-6 flex flex-col gap-4">
                {/* Icon + Title row */}
                <div className="flex items-center gap-3.5">
                  {project.iconShape === "wide" ? (
                    <div
                      data-project-icon={project.id}
                      className="flex-shrink-0 h-11 px-3 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center"
                    >
                      <Image
                        src={project.icon}
                        alt={`${project.name} icon`}
                        width={80}
                        height={28}
                        className="h-5 w-auto"
                      />
                    </div>
                  ) : (
                    <div
                      data-project-icon={project.id}
                      className="relative w-11 h-11 rounded-xl overflow-hidden bg-white/[0.05] border border-white/[0.06] flex-shrink-0"
                    >
                      <Image
                        src={project.icon}
                        alt={`${project.name} icon`}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-[clamp(0.95rem,1.3vw,1.1rem)] font-semibold text-foreground truncate">
                      {project.name}
                    </h3>
                    <span className="text-xs text-muted/70 font-medium">
                      {project.involvement} contributor
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[clamp(0.8rem,1vw,0.875rem)] text-muted leading-relaxed line-clamp-3">
                  {getProjectShortDescription(project)}
                </p>

                {/* Tech tags (subset on listing; full stack on detail) */}
                {shown.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-1">
                    {shown.map((techId) => (
                      <span
                        key={techId}
                        className="inline-block px-2.5 py-1 text-[0.7rem] font-medium rounded-md bg-white/[0.05] text-accent/90 border border-white/[0.06]"
                      >
                        {techNameMap[techId] || techId}
                      </span>
                    ))}
                    {moreCount > 0 && (
                      <span className="text-[0.7rem] font-medium text-muted/60">
                        +{moreCount} more
                      </span>
                    )}
                  </div>
                )}

                {/* Top accent line */}
                <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
