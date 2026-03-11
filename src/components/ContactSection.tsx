"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contactItems } from "@/data/contactItems";

function ContactIcon({ label, className }: { label: string; className?: string }) {
  const cls = className ?? "w-5 h-5";

  switch (label) {
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "Email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      );
    case "Resume":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    default:
      return null;
  }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function ContactSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center py-16 px-5 md:py-24 md:px-8 relative z-20 rounded-t-[2.5rem] md:rounded-t-[4rem] border-t border-white/5 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] overflow-hidden"
      style={{ marginTop: "-100vh" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-background -z-10" />

      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        ref={contentRef}
        className="max-w-3xl w-full flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-[clamp(2.5rem,8vw,5rem)] font-bold mb-4 tracking-tight text-center"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            Let&apos;s Connect
          </span>
        </motion.h2>

        <motion.p
          className="text-[clamp(1rem,2vw,1.25rem)] text-muted max-w-xl mx-auto leading-relaxed text-center mb-14"
          variants={itemVariants}
        >
          Have something in mind? I&apos;m always open to discussing new
          projects, creative ideas, or opportunities.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {contactItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label !== "Email" ? "_blank" : undefined}
              rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
              className="group relative flex items-center gap-4 p-5 md:p-6 rounded-xl hover:border-accent/30 transition-all duration-300"
              style={{
                background: "color-mix(in srgb, var(--color-background) 50%, transparent)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              variants={itemVariants}
              whileHover={{ y: -2 }}
            >
              <div className="absolute -inset-px bg-gradient-to-br from-accent/10 to-accent-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

              <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-muted group-hover:text-accent transition-colors duration-300">
                <ContactIcon label={item.label} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground tracking-wide">
                  {item.label}
                </div>
                <div className="text-sm text-muted truncate group-hover:text-foreground/70 transition-colors duration-300">
                  {item.handle}
                </div>
              </div>

              <div className="flex-shrink-0 text-muted/50 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-20 mb-8"
          variants={itemVariants}
        />

        <motion.p
          className="text-xs text-muted/60 tracking-wide"
          variants={itemVariants}
        >
          &copy; {new Date().getFullYear()} Riyaz Ahmed
        </motion.p>
      </motion.div>
    </section>
  );
}
