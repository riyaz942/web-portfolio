"use client";

import { useEffect, useRef, useCallback, memo } from "react";
import {
  siJavascript,
  siTypescript,
  siHtml5,
  siCss,
  siPhp,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siSass,
  siRedux,
  siD3,
  siChartdotjs,
  siNodedotjs,
  siLaravel,
  siAndroid,
  siMysql,
  siPostgresql,
  siOpenstack,
  siVercel,
  siAuth0,
  siGit,
  siDocker,
  siJira,
  siFigma,
  siJest,
  siGooglecloud,
} from "simple-icons";

// Skills data with their icons
const skillsData = [
  { name: "JavaScript", icon: siJavascript, size: 1.2 },
  { name: "TypeScript", icon: siTypescript, size: 1.1 },
  { name: "HTML5", icon: siHtml5, size: 0.9 },
  { name: "CSS", icon: siCss, size: 0.9 },
  { name: "PHP", icon: siPhp, size: 0.85 },
  { name: "React.js", icon: siReact, size: 1.3 },
  { name: "Next.js", icon: siNextdotjs, size: 1.2 },
  { name: "Tailwind", icon: siTailwindcss, size: 1.0 },
  { name: "SCSS", icon: siSass, size: 0.85 },
  { name: "Redux", icon: siRedux, size: 0.9 },
  { name: "D3.js", icon: siD3, size: 0.8 },
  { name: "Chart.js", icon: siChartdotjs, size: 0.75 },
  { name: "Node.js", icon: siNodedotjs, size: 1.15 },
  { name: "Laravel", icon: siLaravel, size: 0.95 },
  { name: "React Native", icon: siReact, size: 1.0 },
  { name: "Android", icon: siAndroid, size: 0.9 },
  { name: "MySQL", icon: siMysql, size: 0.95 },
  { name: "PostgreSQL", icon: siPostgresql, size: 0.9 },
  { name: "AI/LLMs", icon: siOpenstack, size: 1.1 },
  { name: "AWS", icon: siGooglecloud, size: 1.0 },
  { name: "Vercel", icon: siVercel, size: 0.85 },
  { name: "Auth0", icon: siAuth0, size: 0.8 },
  { name: "Git", icon: siGit, size: 1.0 },
  { name: "Docker", icon: siDocker, size: 0.95 },
  { name: "Jira", icon: siJira, size: 0.8 },
  { name: "Figma", icon: siFigma, size: 0.85 },
  { name: "Jest", icon: siJest, size: 0.8 },
];

interface BubbleData {
  baseX: number;
  baseY: number;
  targetRadius: number;
  color: string;
  iconPath: string;
  floatPhase: number;
  floatSpeedX: number;
  floatSpeedY: number;
  floatAmplitudeX: number;
  floatAmplitudeY: number;
}

// Seeded random for consistent positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Easing functions
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// Memoized icon component
const BubbleIcon = memo(function BubbleIcon({
  iconPath,
  color,
}: {
  iconPath: string;
  color: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d={iconPath} fill={color} />
    </svg>
  );
});

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bubblesDataRef = useRef<BubbleData[]>([]);
  const animationFrameRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const isInitializedRef = useRef(false);
  const dprRef = useRef(1);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize bubble data (static, computed once)
  const initializeBubbles = useCallback((width: number, height: number) => {
    const bubbles: BubbleData[] = [];
    const baseRadius = Math.min(width, height) * 0.055;
    const padding = baseRadius * 2.5;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.42;

    skillsData.forEach((skill, index) => {
      const seed = index * 1337;
      const angle =
        (index / skillsData.length) * Math.PI * 2 * 2.5 +
        seededRandom(seed) * 0.5;
      const radiusFactor = 0.3 + (index / skillsData.length) * 0.7;
      const distFromCenter =
        maxRadius * radiusFactor + seededRandom(seed + 1) * baseRadius * 2;

      let x = centerX + Math.cos(angle) * distFromCenter;
      let y = centerY + Math.sin(angle) * distFromCenter;

      const targetRadius = baseRadius * skill.size;
      x = Math.max(
        padding + targetRadius,
        Math.min(width - padding - targetRadius, x)
      );
      y = Math.max(
        padding + targetRadius,
        Math.min(height - padding - targetRadius, y)
      );

      bubbles.push({
        baseX: x,
        baseY: y,
        targetRadius,
        color: `#${skill.icon.hex}`,
        iconPath: skill.icon.path,
        floatPhase: seededRandom(seed + 2) * Math.PI * 2,
        floatSpeedX: 0.3 + seededRandom(seed + 3) * 0.4,
        floatSpeedY: 0.4 + seededRandom(seed + 4) * 0.3,
        floatAmplitudeX: 8 + seededRandom(seed + 5) * 12,
        floatAmplitudeY: 6 + seededRandom(seed + 6) * 10,
      });
    });

    bubblesDataRef.current = bubbles;
  }, []);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const iconContainer = iconContainerRef.current;
    const textContainer = textContainerRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!canvas || !ctx || !iconContainer) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const time = timestamp * 0.001;
    const progress = scrollProgressRef.current;
    const dpr = dprRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Bubbles appear during first 60% of scroll, then stay visible
    const bubbleProgress = Math.min(progress / 0.6, 1);
    // Text appears from 50% to 80%
    const textProgress = Math.max(0, Math.min((progress - 0.5) / 0.3, 1));

    // Draw bubbles and update icons
    const children = iconContainer.children;
    bubblesDataRef.current.forEach((bubble, index) => {
      const staggerDelay = index * 0.025;
      const staggeredProgress = Math.max(
        0,
        Math.min((bubbleProgress - staggerDelay) * 1.5, 1)
      );

      // Once revealed, stay at full size (no fade out)
      const growthScale = easeOutBack(staggeredProgress);
      const currentRadius = bubble.targetRadius * growthScale;
      const opacity = easeOutCubic(staggeredProgress);

      // Floating animation (always active once visible)
      const floatIntensity = staggeredProgress;
      const floatX =
        Math.sin(time * bubble.floatSpeedX + bubble.floatPhase) *
        bubble.floatAmplitudeX *
        floatIntensity;
      const floatY =
        Math.cos(time * bubble.floatSpeedY + bubble.floatPhase * 1.3) *
        bubble.floatAmplitudeY *
        floatIntensity;

      const x = bubble.baseX + floatX;
      const y = bubble.baseY + floatY;

      // Draw bubble on canvas if visible
      if (currentRadius > 0 && opacity > 0.01) {
        const gradient = ctx.createRadialGradient(
          x, y, currentRadius * 0.3,
          x, y, currentRadius
        );
        const alphaHex = Math.round(opacity * 180).toString(16).padStart(2, "0");
        const alphaHex2 = Math.round(opacity * 100).toString(16).padStart(2, "0");
        gradient.addColorStop(0, `${bubble.color}${alphaHex}`);
        gradient.addColorStop(0.7, `${bubble.color}${alphaHex2}`);
        gradient.addColorStop(1, `${bubble.color}00`);

        ctx.beginPath();
        ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw rim
        ctx.beginPath();
        ctx.arc(x, y, currentRadius * 0.85, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
        ctx.lineWidth = currentRadius * 0.08;
        ctx.stroke();
      }

      // Update icon position via DOM
      const child = children[index] as HTMLElement;
      if (child) {
        if (currentRadius <= 2 || opacity <= 0.01) {
          child.style.opacity = "0";
        } else {
          const screenX = x / dpr;
          const screenY = y / dpr;
          const size = (currentRadius / dpr) * 0.55;
          child.style.transform = `translate(${screenX - size / 2}px, ${screenY - size / 2}px)`;
          child.style.width = `${size}px`;
          child.style.height = `${size}px`;
          child.style.opacity = String(opacity);
        }
      }
    });

    // Update text opacity (no fade out)
    if (textContainer) {
      const textOpacity = easeOutCubic(textProgress);
      textContainer.style.opacity = String(textOpacity);
      textContainer.style.transform = `scale(${0.9 + textOpacity * 0.1})`;
    }

    // Update scroll indicator
    if (scrollIndicator) {
      scrollIndicator.style.opacity = String(Math.max(0, 1 - progress * 3));
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle scroll - sticky scroll progress through the section
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // Calculate scroll progress through the section
    // 0 = section just entered viewport (top of section at bottom of viewport)
    // 1 = ready to scroll away (scrolled through the extra height)
    const scrollTop = -rect.top;
    const totalScrollable = sectionHeight - viewportHeight;
    
    // Clamp between 0 and 1
    const progress = Math.max(0, Math.min(scrollTop / totalScrollable, 1));

    scrollProgressRef.current = progress;
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sectionRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (ctx) {
      ctxRef.current = ctx;
    }

    initializeBubbles(width * dpr, height * dpr);
  }, [initializeBubbles]);

  // Initialize once
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleResize, handleScroll, animate]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        // 200vh gives room to scroll and reveal bubbles, then scroll away
        height: "200vh",
        background:
          "linear-gradient(180deg, #111111 0%, #0a0a0a 30%, #0f0f0f 70%, #111111 100%)",
      }}
    >
      {/* Sticky container - stays in view while scrolling through section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas for bubble backgrounds */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Icon overlay */}
        <div
          ref={iconContainerRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="absolute flex items-center justify-center"
              style={{
                left: 0,
                top: 0,
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              <BubbleIcon iconPath={skill.icon.path} color={`#${skill.icon.hex}`} />
            </div>
          ))}
        </div>

        {/* Center text */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            zIndex: 3,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          <div className="text-center px-8 max-w-4xl">
            <h2
              className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight mb-6"
              style={{
                textShadow: "0 0 60px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.95)",
              }}
            >
              <span className="bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
                Building with Modern Tech
              </span>
            </h2>
            <p
              className="text-[clamp(1rem,2vw,1.5rem)] text-muted leading-relaxed"
              style={{
                textShadow: "0 0 30px rgba(0,0,0,0.95)",
              }}
            >
              From AI-powered experiences to scalable cloud architectures,
              <br className="hidden md:block" />I craft solutions that push
              boundaries.
            </p>
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#111111] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 4 }}
        >
          <span className="text-xs text-muted uppercase tracking-[0.15em]">
            Scroll to explore skills
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent animate-scroll-pulse" />
        </div>
      </div>
    </section>
  );
}
