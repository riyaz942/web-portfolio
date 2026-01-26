"use client";

// Floating doodle configurations - evenly spread across the page
const floatingDoodles = [
  // Row 1 - Top (y: 3-12%)
  { id: 1, type: "atom", x: "3%", y: "5%", size: 26, delay: 0.3, duration: 8 },
  { id: 2, type: "star", x: "18%", y: "8%", size: 22, delay: 0.9, duration: 6.5 },
  { id: 3, type: "flowChart", x: "35%", y: "4%", size: 24, delay: 0.1, duration: 7 },
  { id: 4, type: "lightbulb", x: "52%", y: "6%", size: 26, delay: 1.2, duration: 7.5 },
  { id: 5, type: "constellation", x: "68%", y: "3%", size: 28, delay: 0.5, duration: 8.5 },
  { id: 6, type: "brainCircuit", x: "85%", y: "7%", size: 24, delay: 0.8, duration: 6 },
  
  // Row 2 - Upper (y: 18-28%)
  { id: 7, type: "gear", x: "5%", y: "22%", size: 28, delay: 1.4, duration: 9 },
  { id: 8, type: "codeBrackets", x: "22%", y: "18%", size: 24, delay: 0.2, duration: 6.5 },
  { id: 9, type: "spiral", x: "38%", y: "24%", size: 22, delay: 0.7, duration: 7 },
  { id: 10, type: "neuron", x: "55%", y: "20%", size: 26, delay: 1.0, duration: 8 },
  { id: 11, type: "triangle", x: "72%", y: "25%", size: 20, delay: 0.4, duration: 6.5 },
  { id: 12, type: "circle", x: "88%", y: "19%", size: 18, delay: 1.3, duration: 7.5 },
  
  // Row 3 - Upper-middle (y: 33-43%)
  { id: 13, type: "infinity", x: "8%", y: "38%", size: 30, delay: 0.6, duration: 7.5 },
  { id: 14, type: "magicWand", x: "25%", y: "35%", size: 24, delay: 1.1, duration: 6 },
  { id: 15, type: "dots", x: "42%", y: "40%", size: 22, delay: 0.3, duration: 8 },
  { id: 16, type: "puzzle", x: "58%", y: "36%", size: 24, delay: 0.9, duration: 7 },
  { id: 17, type: "star", x: "75%", y: "42%", size: 20, delay: 1.5, duration: 6.5 },
  { id: 18, type: "fractal", x: "92%", y: "37%", size: 26, delay: 0.2, duration: 8.5 },
  
  // Row 4 - Center (y: 48-58%)
  { id: 19, type: "zigzag", x: "4%", y: "52%", size: 28, delay: 0.8, duration: 8 },
  { id: 20, type: "atom", x: "20%", y: "48%", size: 24, delay: 1.2, duration: 7 },
  { id: 21, type: "lightbulb", x: "36%", y: "55%", size: 26, delay: 0.4, duration: 6.5 },
  { id: 22, type: "brainCircuit", x: "52%", y: "50%", size: 28, delay: 1.0, duration: 8.5 },
  { id: 23, type: "gear", x: "68%", y: "56%", size: 24, delay: 0.6, duration: 7.5 },
  { id: 24, type: "neuron", x: "84%", y: "51%", size: 26, delay: 1.4, duration: 6 },
  
  // Row 5 - Lower-middle (y: 63-73%)
  { id: 25, type: "squiggle", x: "6%", y: "68%", size: 30, delay: 0.5, duration: 7 },
  { id: 26, type: "constellation", x: "23%", y: "65%", size: 26, delay: 1.1, duration: 8 },
  { id: 27, type: "codeBrackets", x: "40%", y: "70%", size: 22, delay: 0.2, duration: 6.5 },
  { id: 28, type: "cross", x: "56%", y: "66%", size: 20, delay: 0.9, duration: 7.5 },
  { id: 29, type: "flowChart", x: "72%", y: "72%", size: 24, delay: 1.3, duration: 8.5 },
  { id: 30, type: "spiral", x: "90%", y: "67%", size: 22, delay: 0.7, duration: 6 },
  
  // Row 6 - Lower (y: 78-88%)
  { id: 31, type: "puzzle", x: "8%", y: "82%", size: 24, delay: 1.0, duration: 7 },
  { id: 32, type: "triangle", x: "24%", y: "78%", size: 22, delay: 0.3, duration: 8 },
  { id: 33, type: "magicWand", x: "42%", y: "85%", size: 26, delay: 0.8, duration: 6.5 },
  { id: 34, type: "infinity", x: "58%", y: "80%", size: 28, delay: 1.4, duration: 7.5 },
  { id: 35, type: "dots", x: "74%", y: "86%", size: 20, delay: 0.5, duration: 8.5 },
  { id: 36, type: "circle", x: "91%", y: "81%", size: 18, delay: 1.2, duration: 6 },
  
  // Row 7 - Bottom (y: 90-96%)
  { id: 37, type: "fractal", x: "12%", y: "93%", size: 24, delay: 0.6, duration: 7.5 },
  { id: 38, type: "star", x: "30%", y: "91%", size: 20, delay: 1.1, duration: 6 },
  { id: 39, type: "atom", x: "48%", y: "95%", size: 26, delay: 0.4, duration: 8 },
  { id: 40, type: "gear", x: "65%", y: "92%", size: 22, delay: 0.9, duration: 7 },
  { id: 41, type: "zigzag", x: "82%", y: "94%", size: 28, delay: 1.3, duration: 6.5 },
  
  // Extra scattered doodles for more density
  { id: 42, type: "lightbulb", x: "15%", y: "30%", size: 20, delay: 0.7, duration: 7 },
  { id: 43, type: "spiral", x: "62%", y: "12%", size: 18, delay: 1.0, duration: 6.5 },
  { id: 44, type: "cross", x: "45%", y: "28%", size: 16, delay: 0.3, duration: 8 },
  { id: 45, type: "neuron", x: "32%", y: "58%", size: 22, delay: 1.2, duration: 7.5 },
  { id: 46, type: "constellation", x: "78%", y: "32%", size: 24, delay: 0.5, duration: 8.5 },
  { id: 47, type: "brainCircuit", x: "28%", y: "75%", size: 20, delay: 0.8, duration: 6 },
  { id: 48, type: "codeBrackets", x: "65%", y: "45%", size: 22, delay: 1.4, duration: 7 },
  { id: 49, type: "puzzle", x: "48%", y: "62%", size: 18, delay: 0.2, duration: 8 },
  { id: 50, type: "magicWand", x: "82%", y: "58%", size: 20, delay: 0.9, duration: 6.5 },
];

// Doodle SVG components
const DoodleStar = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L14.5 9H22L16 14L18.5 22L12 17L5.5 22L8 14L2 9H9.5L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DoodleCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const DoodleSquiggle = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 48 24" fill="none">
    <path
      d="M2 12C6 4 10 20 14 12C18 4 22 20 26 12C30 4 34 20 38 12C42 4 46 20 46 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DoodleTriangle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3L22 21H2L12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DoodleDots = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="4" cy="4" r="2" fill="currentColor" />
    <circle cx="12" cy="4" r="2" fill="currentColor" />
    <circle cx="20" cy="4" r="2" fill="currentColor" />
    <circle cx="4" cy="12" r="2" fill="currentColor" />
    <circle cx="20" cy="12" r="2" fill="currentColor" />
    <circle cx="4" cy="20" r="2" fill="currentColor" />
    <circle cx="12" cy="20" r="2" fill="currentColor" />
    <circle cx="20" cy="20" r="2" fill="currentColor" />
  </svg>
);

const DoodleCross = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const DoodleZigzag = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 40 24" fill="none">
    <path
      d="M2 22L10 2L18 22L26 2L34 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DoodleSpiral = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12C12 10 14 8 16 8C19 8 21 11 21 14C21 18 17 22 12 22C6 22 2 17 2 12C2 6 7 2 12 2C18 2 22 7 22 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Creativity & complexity themed doodles
const DoodleLightbulb = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21H15M12 3C8.5 3 6 5.5 6 9C6 11.5 7.5 13.5 9 15V18H15V15C16.5 13.5 18 11.5 18 9C18 5.5 15.5 3 12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 18H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    {/* Idea rays */}
    <path d="M12 0V1M4 4L5 5M20 4L19 5M2 12H3M21 12H22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const DoodleCodeBrackets = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M8 4L3 12L8 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 4L21 12L16 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 4L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const DoodleGear = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 1V4M12 20V23M23 12H20M4 12H1M20.5 3.5L18.4 5.6M5.6 18.4L3.5 20.5M20.5 20.5L18.4 18.4M5.6 5.6L3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
  </svg>
);

const DoodleNeuron = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Cell body */}
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    {/* Dendrites */}
    <path d="M8 12C5 12 3 10 2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 10C6 8 5 5 4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    <path d="M10 8C9 5 7 3 5 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    {/* Axon */}
    <path d="M16 12C18 12 20 14 22 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 14C16 16 18 19 20 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    {/* Synapses */}
    <circle cx="2" cy="8" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="22" cy="16" r="1" fill="currentColor" opacity="0.6" />
  </svg>
);

const DoodleInfinity = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 32 16" fill="none">
    <path
      d="M8 8C8 4 4 2 2 8C0 14 4 14 8 8C12 2 20 2 24 8C28 14 32 14 30 8C28 2 24 4 24 8C24 12 28 14 30 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

const DoodlePuzzle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6 2H10C10 2 10 4 12 4C14 4 14 2 14 2H18V6C18 6 20 6 20 8C20 10 18 10 18 10V14H14C14 14 14 16 12 16C10 16 10 14 10 14H6V10C6 10 4 10 4 8C4 6 6 6 6 6V2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DoodleAtom = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Nucleus */}
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8" />
    {/* Electron orbits */}
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
    {/* Electrons */}
    <circle cx="22" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
    <circle cx="7" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
    <circle cx="7" cy="19" r="1.5" fill="currentColor" opacity="0.6" />
  </svg>
);

const DoodleBrainCircuit = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Brain outline */}
    <path
      d="M12 4C8 4 5 6 5 10C5 12 6 14 8 15C8 17 9 19 12 20C15 19 16 17 16 15C18 14 19 12 19 10C19 6 16 4 12 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Circuit nodes */}
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <circle cx="15" cy="9" r="1" fill="currentColor" />
    <circle cx="12" cy="13" r="1" fill="currentColor" />
    {/* Connections */}
    <path d="M9 9L12 13L15 9" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <path d="M9 9H15" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="2 1" />
  </svg>
);

const DoodleFlowChart = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Nodes */}
    <rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="19" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
    {/* Connections */}
    <path d="M12 6V8L6 11M12 8L18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 17V19L9 20.5M18 17V19L15 20.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const DoodleMagicWand = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Wand */}
    <path d="M4 20L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 10L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Sparkles */}
    <path d="M20 2V6M18 4H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 4V6M9 5H11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M21 10V12M20 11H22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    {/* Star */}
    <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

const DoodleFractal = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Recursive triangles - Sierpinski-like */}
    <path d="M12 2L22 20H2L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 11L17 20H7L12 11Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.7" />
    <path d="M7 11L12 2L2 20L7 11Z" stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round" opacity="0.5" />
    <path d="M17 11L22 20L12 2L17 11Z" stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

const DoodleConstellation = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Stars */}
    <circle cx="4" cy="8" r="1.5" fill="currentColor" />
    <circle cx="10" cy="4" r="2" fill="currentColor" />
    <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    <circle cx="8" cy="14" r="1" fill="currentColor" opacity="0.8" />
    <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    <circle cx="20" cy="18" r="2" fill="currentColor" />
    <circle cx="6" cy="20" r="1" fill="currentColor" opacity="0.8" />
    {/* Connections */}
    <path d="M4 8L10 4L18 6M10 4L8 14L16 12L18 6M16 12L20 18M8 14L6 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const doodleComponents: Record<string, React.FC<{ size: number }>> = {
  star: DoodleStar,
  circle: DoodleCircle,
  squiggle: DoodleSquiggle,
  triangle: DoodleTriangle,
  dots: DoodleDots,
  cross: DoodleCross,
  zigzag: DoodleZigzag,
  spiral: DoodleSpiral,
  lightbulb: DoodleLightbulb,
  codeBrackets: DoodleCodeBrackets,
  gear: DoodleGear,
  neuron: DoodleNeuron,
  infinity: DoodleInfinity,
  puzzle: DoodlePuzzle,
  atom: DoodleAtom,
  brainCircuit: DoodleBrainCircuit,
  flowChart: DoodleFlowChart,
  magicWand: DoodleMagicWand,
  fractal: DoodleFractal,
  constellation: DoodleConstellation,
};

interface FloatingDoodlesProps {
  scrollProgress: number;
}

export default function FloatingDoodles({ scrollProgress }: FloatingDoodlesProps) {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {floatingDoodles.map((doodle) => {
        const DoodleComponent = doodleComponents[doodle.type];
        // Doodles start appearing at 85% progress and fully visible at 100%
        const doodleOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.85) / 0.15));
        const floatClass = `animate-float-${doodle.id % 3}`;
        
        return (
          <div
            key={doodle.id}
            className={`absolute text-accent/30 ${doodleOpacity > 0 ? floatClass : ""}`}
            style={{
              left: doodle.x,
              top: doodle.y,
              opacity: doodleOpacity,
              transform: doodleOpacity < 1 ? `translateY(${(1 - doodleOpacity) * 20}px)` : undefined,
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              animationDelay: `${doodle.delay}s`,
            }}
          >
            <DoodleComponent size={doodle.size} />
          </div>
        );
      })}
    </div>
  );
}
