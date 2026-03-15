export interface Company {
  id: string;
  companyName: string;
  link?: string;
  position: string;
  duration: string;
  location: string;
  roleDetail: string;
  companyDetail: string;
  backgroundImage: string;
  projects: string[];
}

const imgBase = "/assets/images";

export const companies: Company[] = [
  {
    id: "velotio",
    companyName: "Velotio Technologies",
    link: "https://www.velotio.com/",
    position: "Tech Lead",
    duration: "2021 - Present",
    location: "Pune",
    roleDetail:
      "Core contributor and pod lead on Thriveworks, a healthcare booking platform built with Next.js, serving 500K+ monthly users across 50+ US states. Built voice-first AI assistant with streaming LLMs & OpenAI Realtime APIs. Led AI tool integration into SDLC, cutting development time by 30%.",
    companyDetail:
      "Velotio Technologies is a product engineering company that partners with startups and enterprises to build world-class software products across web, mobile, cloud, and data platforms.",
    backgroundImage: "",
    projects: ["thriveworks"],
  },
  {
    id: "zs",
    companyName: "ZS Associates",
    link: "https://www.zs.com/",
    position: "Frontend Developer",
    duration: "2020 - 2021",
    location: "Pune",
    roleDetail:
      "Built interactive data visualization dashboards for pharmaceutical drug complaint analysis, processing 100K+ data points with real-time filtering. Engineered custom D3.js chart components with image export & CSV download. Achieved 95+ Lighthouse scores through responsive design & perf optimizations.",
    companyDetail:
      "ZS Associates is a management consulting and technology firm focused on helping companies in healthcare and other industries improve performance through analytics and technology.",
    backgroundImage: "",
    projects: [],
  },
  {
    id: "nykaa",
    companyName: "Nykaa",
    link: "https://www.nykaa.com/",
    position: "Frontend Developer",
    duration: "Feb 2019 - Sep 2019 (8 months)",
    location: "Gurugram",
    roleDetail:
      "At Nykaa I worked as a React frontend developer, handling production bugs and building features including the Mobile Signup flow, Nykaa Pro, Recent Search and Search History, and an AR makeup try-on with Modiface.",
    companyDetail:
      "Nykaa is an e-commerce website offering beauty and wellness products from more than 500 leading brands. Nykaa follows an inventory-based model with warehouses in Mumbai, New Delhi, and Chennai, along with an offline presence across 60+ stores and expanding. It offers over 1,000 curated brands and 85,000 products.",
    backgroundImage: `${imgBase}/background/background-image-nykaa.jpg`,
    projects: ["nykaa"],
  },
  {
    id: "tailoredtech",
    companyName: "Tailored Tech",
    link: "https://www.tailoredtech.in/",
    position: "Fullstack Developer",
    duration: "May 2016 - Jan 2019 (2 years & 8 months)",
    location: "Pune",
    roleDetail:
      "At TailoredTech I took on multiple roles. I started as an Android developer for a year before transitioning to Laravel, React Native, and React.",
    companyDetail:
      "Tailored Tech was a service-based startup specializing in web and mobile development, with clients including Nykaa, Ezone, Sportobuddy, Healthcode, Hippily, Wok Express, and more. TailoredTech was later acqui-hired by Nykaa.",
    backgroundImage: `${imgBase}/background/background-image-tailoredtech.jpg`,
    projects: ["snapteam", "pulse", "measure", "wakency", "benefactory", "lighthouse"],
  },
  {
    id: "mit",
    companyName: "College",
    position: "Android & Web",
    duration: "2015 - 2016 (1 year)",
    location: "Pune",
    roleDetail: "",
    companyDetail: "",
    backgroundImage: `${imgBase}/background/background-image-college.jpg`,
    projects: ["vc_music_player"],
  },
];
