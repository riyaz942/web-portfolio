"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { projects, type DescriptionBlock } from "@/data/projects";
import { groupProjectTechByCategory } from "@/data/techCategories";
import { technologies } from "@/data/technologies";
import {
  useViewTransitionRouter,
  waitForElement,
} from "@/hooks/useViewTransition";
import { AnimatePresence, motion } from "framer-motion";

const techNameMap = Object.fromEntries(technologies.map((t) => [t.id, t.name]));

function DescriptionRenderer({ blocks }: { blocks: DescriptionBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "header") {
          return (
            <h3
              key={i}
              className="text-lg font-semibold text-foreground mt-8 first:mt-0"
            >
              {block.value}
            </h3>
          );
        }

        if (block.type === "text") {
          return (
            <p
              key={i}
              className={`text-[0.95rem] leading-relaxed ${
                block.highlight ? "text-foreground/90" : "text-muted"
              }`}
            >
              {block.value}
            </p>
          );
        }

        if (block.type === "points") {
          return (
            <div key={i} className="space-y-2.5">
              {block.title && (
                <p
                  className={`text-[0.95rem] leading-relaxed ${
                    block.highlight ? "text-foreground/90" : "text-muted"
                  }`}
                >
                  {block.title}
                </p>
              )}
              <ul className="space-y-1.5 pl-1">
                {block.value.map((point, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-[0.9rem] text-muted leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-5xl max-h-[90vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </motion.div>
  );
}

export default function ProjectDetail({ id }: { id: string }) {
  const { push } = useViewTransitionRouter();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const project = projects[id];

  const navigateBack = useCallback(() => {
    push("/projects", {
      afterDomUpdate: async () => {
        await waitForElement(`[data-project-icon="${id}"]`);
        document
          .querySelectorAll<HTMLElement>("[data-project-icon]")
          .forEach((el) => {
            el.style.viewTransitionName = "";
          });
        const el = document.querySelector(
          `[data-project-icon="${id}"]`,
        ) as HTMLElement | null;
        if (el) el.style.viewTransitionName = "project-icon";
      },
    });
  }, [push, id]);

  const techStackGroups = useMemo(
    () => groupProjectTechByCategory(project?.tech ?? []),
    [project?.tech],
  );

  if (!project || !project.icon || project.description.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Project not found
          </h1>
          <button
            onClick={() => push("/projects")}
            className="text-accent hover:text-accent-secondary transition-colors cursor-pointer"
          >
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center gap-4">
          <button
            onClick={navigateBack}
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
            <span className="text-sm font-medium">Projects</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-sm font-semibold tracking-wide truncate">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              {project.name}
            </span>
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Hero + technologies (stack below title) */}
        <div className="mb-10 md:mb-14 space-y-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
          {project.iconShape === "wide" ? (
            <div
              data-project-detail-icon
              className="flex-shrink-0 h-16 sm:h-20 px-4 sm:px-5 rounded-2xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center"
              style={{ viewTransitionName: "project-icon" }}
            >
              <Image
                src={project.icon}
                alt={`${project.name} icon`}
                width={160}
                height={44}
                className="h-7 sm:h-9 w-auto"
              />
            </div>
          ) : (
            <div
              data-project-detail-icon
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white/[0.05] border border-white/[0.06] flex-shrink-0"
              style={{ viewTransitionName: "project-icon" }}
            >
              <Image
                src={project.icon}
                alt={`${project.name} icon`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-tight text-foreground">
                  {project.name}
                </h2>
                <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
                  {project.involvement} contributor
                </span>
              </div>
              {project.timeframe && (
                <span className="flex-shrink-0 mt-1.5 text-sm text-muted whitespace-nowrap">
                  {project.timeframe}
                </span>
              )}
            </div>

            {project.link && (
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={project.link.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                >
                  {project.link.type === "visit" ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Visit
                    </>
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Download
                    </>
                  )}
                </a>
              </div>
            )}
          </div>
          </div>

          {/* Technologies (categorized) — full width, directly below hero / title */}
          {project.tech.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Technologies
              </h3>
              <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
                {techStackGroups.map((group) => (
                  <div
                    key={group.categoryId}
                    className="mb-6 break-inside-avoid rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
                  >
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                      {group.label}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.techIds.map((techId) => (
                        <span
                          key={techId}
                          className="inline-block px-2.5 py-1 text-[0.7rem] font-medium rounded-md bg-white/[0.05] text-accent/90 border border-white/[0.06]"
                        >
                          {techNameMap[techId] || techId}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Description */}
        <section className="mb-14 md:mb-18">
          <DescriptionRenderer blocks={project.description} />
        </section>

        {/* Videos */}
        {project.videos && project.videos.length > 0 && (
          <section className="mb-14 md:mb-18">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Videos
            </h3>
            <div className="space-y-4">
              {project.videos.map((video) => (
                <a
                  key={video.url}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent ml-0.5">
                      <path d="M5 4l14 8-14 8V4z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.95rem] font-medium text-foreground/90 group-hover:text-accent transition-colors truncate">
                      {video.title}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted group-hover:text-accent transition-colors flex-shrink-0">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Image gallery */}
        {project.images.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Screenshots
            </h3>
            <div className="columns-2 sm:columns-3 md:columns-4 gap-3">
              {project.images.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setLightboxImage(img.src)}
                  className="group/img relative mb-3 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 cursor-pointer break-inside-avoid"
                >
                  <Image
                    src={img.src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover/img:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <ImageLightbox
            src={lightboxImage}
            alt={`${project.name} screenshot`}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
