"use client";

import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

function getYearsFromCareerStartDate() {
  const careerStartDate = "2016-05-01T00:00:00";
  const startDate = new Date(careerStartDate);
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - startDate.getTime();
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const diffInYears = diffInMs / msPerYear;
  return parseFloat(diffInYears.toFixed(2));
}

const stats = [
  {
    value: `${Math.floor(getYearsFromCareerStartDate())}+`,
    label: "Years Experience",
    delay: 0,
  },
  { value: "50+", label: "Projects Completed", delay: 100 },
  { value: "10+", label: "Happy Clients", delay: 200 },
];

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(60px)",
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}

function StatCard({ value, label, delay }: StatCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.9)",
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 to-accent-secondary/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-center overflow-hidden">
        {/* Animated border shine */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, rgba(100, 255, 218, 0.1) 50%, transparent 60%)",
            animation: isVisible ? "shine 3s ease-in-out infinite" : "none",
          }}
        />

        <span className="block text-[clamp(2.5rem,5vw,4rem)] font-bold bg-gradient-to-br from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
          {value}
        </span>
        <span className="block text-sm md:text-base text-muted uppercase tracking-[0.15em] mt-2">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.3,
  });
  const { ref: parallaxRef, offset } = useParallax(0.15);
  const { ref: bioRef, isVisible: bioVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section
      className="min-h-screen py-32 px-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-background) 0%, #0a0a0a 50%, #111111 100%)",
      }}
    >
      {/* Decorative elements with parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent/3 to-accent-secondary/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          ref={titleRef}
          className="text-center mb-20"
          style={{
            transform: titleVisible ? "translateY(0)" : "translateY(40px)",
            opacity: titleVisible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="inline-block text-accent text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Get to know me
          </span>
          <h2 className="text-[clamp(3rem,10vw,6rem)] font-bold tracking-tighter">
            <span className="inline-block bg-gradient-to-r from-foreground via-foreground to-muted bg-clip-text text-transparent">
              About
            </span>
          </h2>
          {/* Animated underline */}
          <div
            className="mx-auto mt-6 h-1 bg-gradient-to-r from-accent via-accent-secondary to-accent rounded-full"
            style={{
              width: titleVisible ? "120px" : "0px",
              transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Bio Card */}
        <AnimatedCard delay={100} className="mb-16">
          <div ref={bioRef} className="relative group">
            {/* Card glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent-secondary/20 to-accent/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-14 overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-accent/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-accent-secondary/30 rounded-br-3xl" />

              {/* Quote mark */}
              <div className="absolute top-6 left-8 text-6xl text-accent/20 font-serif">
                "
              </div>

              <div className="relative z-10">
                <p
                  className="text-[clamp(1.15rem,2.5vw,1.5rem)] leading-[1.8] text-[#d1d1d1] text-center max-w-3xl mx-auto"
                  style={{
                    transform: bioVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                    opacity: bioVisible ? 1 : 0,
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
                  }}
                >
                  I'm a{" "}
                  <span className="text-accent font-semibold">
                    Software Developer
                  </span>{" "}
                  with a passion for building polished, innovative, and
                  well-detailed applications. With experience across{" "}
                  <span className="text-accent-secondary font-semibold">
                    web, mobile, and cross-platform
                  </span>{" "}
                  development, I focus on creating fluid animations and seamless
                  user experiences that complement thoughtful design.
                </p>

                <p
                  className="text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-muted text-center max-w-2xl mx-auto mt-8"
                  style={{
                    transform: bioVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                    opacity: bioVisible ? 1 : 0,
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
                  }}
                >
                  Every pixel matters. Every interaction counts. I craft digital
                  experiences that leave lasting impressions.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
    </section>
  );
}
