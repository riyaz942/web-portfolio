export const experiences = [
  {
    id: 1,
    company: "Velotio Technologies",
    role: "Tech Lead",
    period: "2021 - Present",
    domains: ["AI/Voice", "Healthcare", "GovTech"],
    description:
      "Core contributor and pod lead on Thriveworks, a healthcare booking platform built with Next.js, serving 500K+ monthly users across 50+ US states.",
    highlights: [
      "Drove 40% increase in booking conversions through platform optimizations",
      "Built voice-first AI assistant with streaming LLMs & OpenAI Realtime APIs",
      "Led AI tool integration into SDLC, cutting development time by 30%",
    ],
  },
  {
    id: 2,
    company: "ZS Associates",
    role: "Frontend Developer",
    period: "2020 - 2021",
    domains: ["Data Viz", "Pharma"],
    description:
      "Built interactive data visualization dashboards for pharmaceutical drug complaint analysis, processing 100K+ data points with real-time filtering.",
    highlights: [
      "Engineered custom D3.js chart components with image export & CSV download",
      "Achieved 95+ Lighthouse scores through responsive design & perf optimizations",
    ],
  },
  {
    id: 3,
    company: "Nykaa",
    role: "Frontend Developer",
    period: "2019",
    domains: ["E-commerce", "AR/VR"],
    description:
      "Contributed to India's leading beauty e-commerce platform serving 3M+ monthly active users with performance-optimized experiences.",
    highlights: [
      "Redesigned mobile sign-in/sign-up flow using React Context API & state machines",
      "Implemented AR makeup try-on via Modi-face SDK with Firebase-based staged rollout",
    ],
  },
  {
    id: 4,
    company: "Tailored Tech",
    role: "Fullstack Developer",
    period: "2016 - 2019",
    domains: ["IoT", "Mobile", "Desktop"],
    description:
      "Built cross-platform products spanning desktop, mobile, and IoT — from concept to production and live showcases.",
    highlights: [
      "Developed Bijli collaboration platform (React, Electron) — showcased at TechCrunch 2018",
      "Created IoT health app with BLE smart-scale integration, serving 5K+ users",
      "Shipped 2 React Native apps to production — food delivery & NGO management",
    ],
  },
];

export type Experience = (typeof experiences)[number];
