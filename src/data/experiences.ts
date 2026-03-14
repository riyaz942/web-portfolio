export const experiences = [
  {
    id: 1,
    companyId: "velotio",
    company: "Velotio Technologies",
    role: "Tech Lead",
    period: "2021 - Present",
    location: "Pune",
    domains: ["AI/Voice", "Healthcare", "GovTech"],
    description:
      "Core contributor and pod lead on Thriveworks, a healthcare booking platform built with Next.js, serving 500K+ monthly users across 50+ US states.",
    companyDetail:
      "Velotio Technologies is a product engineering company that partners with startups and enterprises to build world-class software products across web, mobile, cloud, and data platforms.",
    highlights: [
      "Drove 40% increase in booking conversions through platform optimizations",
      "Built voice-first AI assistant with streaming LLMs & OpenAI Realtime APIs",
      "Led AI tool integration into SDLC, cutting development time by 30%",
    ],
    projects: [],
  },
  {
    id: 2,
    companyId: "zs",
    company: "ZS Associates",
    role: "Frontend Developer",
    period: "2020 - 2021",
    location: "Pune",
    domains: ["Data Viz", "Pharma"],
    description:
      "Built interactive data visualization dashboards for pharmaceutical drug complaint analysis, processing 100K+ data points with real-time filtering.",
    companyDetail:
      "ZS Associates is a management consulting and technology firm focused on helping companies in the healthcare and beyond improve performance through analytics and technology.",
    highlights: [
      "Engineered custom D3.js chart components with image export & CSV download",
      "Achieved 95+ Lighthouse scores through responsive design & perf optimizations",
    ],
    projects: [],
  },
  {
    id: 3,
    companyId: "nykaa",
    company: "Nykaa",
    role: "Frontend Developer",
    period: "Feb 2019 - Sep 2019",
    location: "Gurugram",
    domains: ["E-commerce", "AR/VR"],
    description:
      "In Nykaa I got to work as a React frontend developer, worked on production bugs and features like Mobile Signup flow implementation, Nykaa Pro, Recent search and search history and their AR makeup implementation with Modiface.",
    companyDetail:
      "Nykaa is an e-commerce website offering beauty and wellness products from more than 500 leading brands. Nykaa follows an inventory-based model with warehouses in Mumbai, New Delhi, and Chennai as its offline presence is in 60 stores and expanding. It claims to have over 1000+ curated brands and 85,000 products.",
    highlights: [
      "Redesigned mobile sign-in/sign-up flow using React Context API & state machines",
      "Implemented AR makeup try-on via Modi-face SDK with Firebase-based staged rollout",
    ],
    projects: ["nykaa"],
  },
  {
    id: 4,
    companyId: "tailoredtech",
    company: "Tailored Tech",
    role: "Fullstack Developer",
    period: "May 2016 - Jan 2019",
    location: "Pune",
    domains: ["IoT", "Mobile", "Desktop"],
    description:
      "In TailoredTech I got to experience many roles. I was initially working as an Android developer for a year then jumped on to these tech stacks: Laravel, React-Native and React.",
    companyDetail:
      "Tailored Tech was a service based startup specialised in web and mobile development, and had clients like Nykaa, Ezone, Sportobuddy, healthcode, hippily, wok express, etc. TailoredTech later got acqui-hired by Nykaa.",
    highlights: [
      "Developed Bijli collaboration platform (React, Electron) — showcased at TechCrunch 2018",
      "Created IoT health app with BLE smart-scale integration, serving 5K+ users",
      "Shipped 2 React Native apps to production — food delivery & NGO management",
    ],
    projects: ["snapteam", "pulse", "measure", "wakency", "benefactory", "lighthouse"],
  },
];

export type Experience = (typeof experiences)[number];
