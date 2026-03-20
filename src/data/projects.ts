export interface ProjectVideo {
  title: string;
  url: string;
}

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  name: string;
  tech: string[];
  /** Subset of `tech` shown on the grid; falls back to the start of `tech` when omitted. */
  listingTech?: string[];
  involvement: "Major" | "Intermittent" | "Owned";
  icon: string;
  iconShape?: "square" | "wide";
  timeframe?: string;
  link?: { type: "visit" | "download"; value: string };
  /** HTML mini-language: see ProjectDescriptionHtml. */
  description: string;
  images: ProjectImage[];
  videos?: ProjectVideo[];
}

export const MAX_PROJECT_LISTING_TECH = 6;

function htmlFirstParagraphPlain(html: string): string {
  const m = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) {
    return html
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return m[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Card preview: first paragraph of the project description HTML, ~140 chars. */
export function getProjectShortDescription(project: Project): string {
  const text = htmlFirstParagraphPlain(project.description);
  if (text.length <= 140) return text;
  return `${text.slice(0, 137).replace(/\s+\S*$/, "")}...`;
}

export function getProjectListingTechDisplay(project: Project): {
  shown: string[];
  moreCount: number;
} {
  const filteredListing =
    project.listingTech?.filter((id) => project.tech.includes(id)) ?? [];
  const source =
    filteredListing.length > 0 ? filteredListing : project.tech;
  const shown = source.slice(0, MAX_PROJECT_LISTING_TECH);
  const moreCount = project.tech.length - shown.length;
  return { shown, moreCount };
}

const projectImageDir = "/assets/images/projectImages";

type ImgSize = { width: number; height: number };

function imageRange(
  folder: string,
  count: number,
  defaultSize: ImgSize,
  overrides?: Record<number, ImgSize>,
  extra?: { name: string; width: number; height: number }[],
): ProjectImage[] {
  const imgs = Array.from({ length: count }, (_, i) => ({
    src: `${projectImageDir}/${folder}/${i + 1}.png`,
    ...(overrides?.[i + 1] ?? defaultSize),
  }));
  if (extra) {
    imgs.push(
      ...extra.map((e) => ({
        src: `${projectImageDir}/${folder}/${e.name}.png`,
        width: e.width,
        height: e.height,
      })),
    );
  }
  return imgs;
}

export const projects: Record<string, Project> = {
  thriveworks: {
    id: "thriveworks",
    name: "Thriveworks",
    tech: [
      "nextjs",
      "react",
      "typescript",
      "scss",
      "redux",
      "nestjs",
      "radix-ui",
      "react-hook-form",
      "zod",
      "framer-motion",
      "storybook",
      "jest",
      "testing-library",
      "rudderstack",
      "datadog",
      "split-io",
      "vercel",
      "edgio",
      "typeorm",
      "postgresql",
      "bull",
      "redis",
      "openai",
      "vercel-ai-sdk",
      "socket-io",
      "pverify",
      "advancedmd",
      "docker",
      "auth0",
    ],
    involvement: "Major",
    icon: "/assets/icons/project-icon-thriveworks.svg",
    iconShape: "wide",
    timeframe: "2021 – 2026",
    link: { type: "visit", value: "https://www.thriveworks.com/" },
    description: `
<p data-tone="lead">Thriveworks is a large-scale mental health therapy platform serving patients across the United States. The platform enables patients to search for therapists, book appointments, manage insurance, and access care through a modern web application backed by a robust API layer.</p>
<h3>My Contribution:</h3>
<p>One of the earliest engineers on this project, contributing for ~5 years as a full-stack engineer from day one (not a frontend role that later expanded into backend). Built core patient-facing features on the Next.js frontend (provider search, booking flows, and early-phase insurance-related work only — not end-to-end insurance handling) and on the NestJS API, including architecting the AI module and real-time voice pipeline (voice is not live in production yet). Contributed to test infrastructure.</p>
<h3>Provider Search & Discovery</h3>
<p>Built and iterated on the provider search engine — the primary patient-facing feature for finding therapists.</p>
<div data-layout="list-block"><ul>
<li>Advanced filtering: location, insurance, specialty, counseling type, availability</li>
<li>Timezone handling for provider availability and discovery</li>
<li>Sort/filter UI with mobile-responsive filter modals</li>
<li>Provider profile pages with SEO-friendly structured data (JSON-LD)</li>
</ul></div>
<h3>Booking & Appointment System</h3>
<p>Contributed to the multi-step booking flow end-to-end for the patient journey — one of the most complex user journeys in the app. Full insurance verification and downstream insurance handling were out of scope; work on insurance stayed in an initial phase only.</p>
<div data-layout="list-block"><ul>
<li>New booking flow layout with consent management, billing integration, and patient form handling</li>
<li>Support for individual, couples, family, and medication management counseling types</li>
<li>Cross-state booking handling with blocker components</li>
<li>Cancellation policy reminders and session-within-48-hours hooks</li>
</ul></div>
<h3>AI & Voice Integration (in development)</h3>
<p>Implemented AI-powered natural language search using OpenAI so patients can describe their needs conversationally. This is a full search experience wired as a system: an AI search agent on the frontend is connected to the NestJS backend via Socket.IO, which drives filters, search results, and URLs in real time from the conversation — not a separate built-in chatbot widget. Real-time voice and the full AI/voice rollout are not released yet; the backend AI module is architected to support that path.</p>
<div data-layout="list-block"><ul>
<li>MCP (Model Context Protocol) tools for location and provider search</li>
<li>Socket.IO between the AI search agent and NestJS backend for live UI and search updates, with gateway work for the real-time layer (voice path still in development)</li>
<li>Dual-agent architecture with asynchronous tool execution</li>
<li>Vercel AI SDK for model streaming and text-to-speech with progressive audio playback</li>
</ul></div>
<h3>Internal Testimonials Tool</h3>
<p>Built an internal testimonials management tool from scratch — a dashboard for operations teams to bulk upload, update, and manage user testimonials across the platform. Implemented CSV bulk upload, CRUD interfaces with rating validation, and service/specialty filters.</p>
<h3>Other Contributions</h3>
<div data-layout="list-block"><ul>
<li>Auth0 integration with protected route handling in the useApi hook</li>
<li>Provider agenda optimization: batched fetching to resolve N+1 query issues across license keys</li>
<li>Coordinated and individually built a feature for the company hackathon</li>
</ul></div>
`.trim(),
    images: imageRange(
      "thriveworks",
      9,
      { width: 1024, height: 640 },
      {
        2: { width: 475, height: 1024 },
        4: { width: 476, height: 1024 },
        5: { width: 474, height: 1024 },
      },
    ),
    videos: [
      {
        title: "AI-Powered Provider Search",
        url: "https://www.loom.com/share/a1898de2e2084bfe90b149209e9295e1",
      },
    ],
  },

  snapteam: {
    id: "snapteam",
    name: "Snapteam/Bijli",
    tech: [
      "react",
      "electron",
      "laravel",
      "redux",
      "webpack",
      "pusher",
      "firebase",
      "material-ui",
    ],
    involvement: "Major",
    icon: "/assets/icons/project-icon-bijli.png",
    timeframe: "2018 – 2019",
    description: `
<p data-tone="lead">Bijli is a project management and communication app that helps reduce communication noise within teams and provides useful metrics for real-time decision making.</p>
<div data-layout="list-block">
<p data-tone="lead">Bijli was intended to be a cross-platform product across Web, Desktop, Android, iOS, and Slack with the following core features:</p>
<ul>
<li>Check-in Mechanism</li>
<li>To-Do management</li>
<li>Notification &amp; Updates</li>
<li>Feedback Engine</li>
<li>Reservation System</li>
<li>Real-Time Insights</li>
</ul>
</div>
<p data-tone="lead">This project was also showcased at TechCrunch 2018.</p>
<h3>My Contribution:</h3>
<p>I mostly worked on React and Electron in Bijli, and contributed to one feature in Laravel. Architected the Home page components to communicate across tabs and handle real-time data updates.</p>
<div data-layout="list-block">
<p>These are some technical challenges and technologies used:</p>
<ul>
<li>Electron and Web build process with webpack</li>
<li>A custom-built Compose flow (drafting messages, tagging, file attachments, etc.)</li>
<li>Pusher implementation for real time data updates</li>
<li>Css in js implementation with aphrodite</li>
<li>Used string replacement to add interactive functionality to inline text segments</li>
<li>Redux-api-middleware</li>
<li>React-Router-v4</li>
<li>React-redux-form</li>
<li>Aphrodite</li>
<li>Material-UI</li>
<li>Firebase</li>
<li>Redux</li>
<li>React-Router</li>
<li>Redux-Form</li>
<li>Css Modules</li>
</ul>
</div>
`.trim(),
    images: imageRange(
      "snapteam",
      8,
      { width: 1960, height: 1704 },
      {
        1: { width: 968, height: 840 },
        7: { width: 2940, height: 2556 },
        8: { width: 2940, height: 2556 },
      },
    ),
  },

  wakency: {
    id: "wakency",
    name: "Wakency",
    tech: ["react", "redux", "firebase", "css-modules"],
    involvement: "Intermittent",
    icon: "/assets/icons/project-icon-wakency.png",
    iconShape: "wide",
    timeframe: "2018",
    link: { type: "visit", value: "https://www.wakency.com/" },
    description: `
<p data-tone="lead">Wakency was built to address the changing work culture of our times — India’s first on-demand flexible work platform that uses proprietary technology to automatically match temporary workers with employers.</p>
<h3>My Contribution:</h3>
<p>I worked on the front-end web and developed the landing pages and a few features within the app.</p>
<div data-layout="list-block"><ul>
<li>Worked with css-modules</li>
<li>Firebase Notification</li>
<li>Redux</li>
<li>Redux-api-middleware</li>
<li>React-redux-form</li>
<li>React-Router v3</li>
<li>Slick and swiper.js for carousel</li>
</ul></div>
`.trim(),
    images: imageRange(
      "wakency",
      6,
      { width: 1441, height: 1363 },
      {
        1: { width: 2732, height: 7862 },
        2: { width: 2732, height: 1734 },
        4: { width: 1441, height: 1106 },
        5: { width: 1441, height: 1039 },
        6: { width: 1440, height: 1029 },
      },
    ),
  },

  nykaa: {
    id: "nykaa",
    name: "Nykaa",
    tech: ["react", "jest"],
    involvement: "Intermittent",
    icon: "/assets/icons/project-icon-nykaa.png",
    iconShape: "wide",
    timeframe: "2019",
    link: { type: "visit", value: "https://www.nykaa.com/" },
    description: `
<p data-tone="lead">Nykaa is an e-commerce website offering beauty and wellness products from more than 500 leading brands. Nykaa follows an inventory-based model with warehouses in Mumbai, New Delhi, and Chennai, along with an offline presence across 60+ stores and expanding.</p>
<h3>My Contribution:</h3>
<p>I was actively involved in building new features such as the signup/signin flow and introduced an AR makeup try-on using Modi-face for the iOS webview with staged releases. I also maintained the entire Nykaa Pro module alongside these new features.</p>
<div data-layout="list-block"><ul>
<li>New mobile signup/signin flow</li>
<li>Trending Search and Search history</li>
<li>Nykaa Pro</li>
<li>Worked on an AR makeup try-on with modiface</li>
<li>Unit test cases with jest</li>
</ul></div>
`.trim(),
    images: imageRange(
      "nykaa",
      5,
      { width: 438, height: 772 },
      {
        1: { width: 1920, height: 900 },
        3: { width: 436, height: 775 },
        4: { width: 441, height: 772 },
        5: { width: 1920, height: 901 },
      },
    ),
  },

  pulse: {
    id: "pulse",
    name: "Pulse/Sprout",
    tech: ["react-native", "redux", "axios", "firebase"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-pulse.png",
    timeframe: "2018",
    link: {
      type: "visit",
      value: "https://www.youtube.com/watch?v=wOsy7b2Q-J4",
    },
    description: `
<p data-tone="lead">Sprout is a delivery kitchen that aims to serve delicious meals while cutting the long wait typically associated with them. It is a subscription-based service with detailed ingredient information, a customizable menu, and a daily-changing selection.</p>
<p data-tone="lead">The Sprout app allowed users to quickly and conveniently book meals. It was not published due to business operation issues on the client's end.</p>
<h3>My Contribution:</h3>
<p>Designed the app's component architecture and API layer using Redux middleware and Axios to automatically handle common responses and simplify API integration across screens. Also worked on the app's core flows including Login, Meal selection, and Home.</p>
<div data-layout="list-block"><ul>
<li>Redux</li>
<li>Axios</li>
<li>RN Razorpay</li>
<li>RN Navigation (Wix)</li>
<li>RN Swiper</li>
<li>RN Facebook sdk</li>
<li>RN Fabric (Crash Reporting)</li>
<li>RN Branch (Deeplinking)</li>
<li>RN Firebase</li>
</ul></div>
`.trim(),
    images: imageRange(
      "pulse",
      9,
      { width: 1500, height: 2668 },
      {
        2: { width: 1500, height: 2976 },
        3: { width: 1500, height: 3996 },
        5: { width: 1500, height: 3220 },
        6: { width: 1500, height: 4308 },
        7: { width: 1500, height: 4726 },
        8: { width: 1500, height: 4674 },
        9: { width: 1500, height: 3302 },
      },
    ),
  },

  lighthouse: {
    id: "lighthouse",
    name: "LightHouse Project",
    tech: ["react-native", "react-navigation", "firebase"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-lighthouse.png",
    timeframe: "2018",
    link: {
      type: "download",
      value:
        "https://play.google.com/store/apps/details?id=com.tailoredtech.lighthouse",
    },
    description: `
<p data-tone="lead">The Lighthouse Project is a not-for-profit organisation in Mumbai that connects working professionals and college students with children from under-resourced communities, through one-on-one mentoring in a safe environment.</p>
<p>The app helps schedule meetings with mentees and includes check-in and check-out features to track hours spent, along with prior notifications for upcoming meetings.</p>
<h3>My Contribution:</h3>
<p>Joined this project mid-development and worked on the Home Screen, Create Meeting flow, View Meetings flow, and Notifications.</p>
<div data-layout="list-block"><ul>
<li>React Navigation</li>
<li>RN FCM</li>
<li>RN Fabric (Crash Reporting)</li>
<li>RN Actionsheet</li>
<li>Tcomb form native</li>
</ul></div>
`.trim(),
    images: imageRange(
      "lighthouse",
      7,
      { width: 750, height: 1334 },
      {
        2: { width: 750, height: 1626 },
      },
    ),
  },

  benefactory: {
    id: "benefactory",
    name: "Benefactory",
    tech: ["laravel", "vanilla-js", "scss", "webpack", "jquery"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-benefactory.png",
    iconShape: "wide",
    timeframe: "2017",
    link: { type: "visit", value: "http://benefactory.live/" },
    description: `
<p data-tone="lead">Benefactory envisions a future where everyday people can seamlessly act on urgent issues while on the go. They partner with frequently visited websites — from shopping to booking a ride — to place a micro-donation ACT widget that responds to crises in the headlines, letting users add a donation to their cart at checkout.</p>
<h3>My Contribution:</h3>
<p>Built the entire frontend and designed a responsive UI. Used Laravel’s Blade templating engine to create reusable components and defined SCSS classes for typography. Used Laravel Mix and Webpack for asset versioning. The project was primarily UI-focused with no complex backend features.</p>
<div data-layout="list-block"><ul>
<li>Flexbox</li>
<li>Media queries</li>
<li>Scss</li>
<li>Css Grid</li>
<li>Webpack</li>
<li>Jquery</li>
<li>Laravel mix</li>
</ul></div>
`.trim(),
    images: imageRange(
      "benefactory",
      7,
      { width: 1440, height: 4162 },
      {
        2: { width: 1440, height: 2739 },
        3: { width: 1440, height: 3919 },
        4: { width: 2880, height: 3728 },
        5: { width: 2880, height: 6780 },
        6: { width: 2880, height: 4028 },
        7: { width: 2880, height: 3562 },
      },
    ),
  },

  measure: {
    id: "measure",
    name: "Measure",
    tech: ["android", "retrofit", "firebase"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-measure.png",
    timeframe: "2017",
    link: {
      type: "download",
      value:
        "https://play.google.com/store/apps/details?id=com.informedtech.measure.app",
    },
    description: `
<p data-tone="lead">Measure is a fitness app that helps users track habits and weight, providing detailed health insights to support informed decisions. The app integrates with a smart weighing scale device to capture weight data directly.</p>
<h3>My Contribution:</h3>
<p>Built the app's BLE pairing system to connect with the client's smart weighing scale using Android's BluetoothGatt class. Also developed the charts and remaining app flows, excluding the onboarding flow.</p>
<p>The app is not actively maintained now.</p>
<div data-layout="list-block"><ul>
<li>BLE Integration with their weighing scale device</li>
<li>MP Charts implementation</li>
<li>Local notification implementation</li>
<li>MVC architecture</li>
<li>Butterknife</li>
<li>Retrofit</li>
<li>Active Android</li>
<li>EventBus</li>
<li>Fabric (Crash Reporting)</li>
<li>Firebase Notifications</li>
</ul></div>
`.trim(),
    images: imageRange("measure", 8, { width: 720, height: 1280 }),
  },

  vc_music_player: {
    id: "vc_music_player",
    name: "VC Music Player",
    tech: ["android"],
    involvement: "Owned",
    icon: "/assets/icons/project-icon-vc-music-player.png",
    timeframe: "2015 – 2016",
    link: {
      type: "download",
      value:
        "https://drive.google.com/open?id=1Fo3FSfu7NHTJ60Y0uQcWYpv6mX1Tetqe",
    },
    description: `
<p data-tone="lead">This app was designed to simplify navigation and make music library management seamless. It features the ability to play videos as audio-only within a playlist and switch between music and video modes. It also includes voice recognition to play/pause, search, switch playlists, shuffle, and more.</p>
<p>Built this app end-to-end — from screen design in Photoshop to development and publishing. Worked on it during my college years and learned Android development largely through building it.</p>
<div data-layout="list-block">
<p>Features:</p>
<ul>
<li>Offline voice recognition and continuous voice recognition implementation with pocket sphinx</li>
<li>13 voice commands to control player</li>
<li>Floating Widget</li>
<li>Home Widgets</li>
<li>Automatically attach missing Album art to audio files</li>
<li>2 theme implementation</li>
<li>Play video files with an option to listen to the audio only and switch between them</li>
</ul>
</div>
`.trim(),
    images: imageRange(
      "vc_music_player",
      8,
      { width: 770, height: 1200 },
      {
        1: { width: 1024, height: 500 },
        2: { width: 894, height: 803 },
        3: { width: 894, height: 793 },
        4: { width: 1200, height: 770 },
      },
      [
        { name: "9-1", width: 770, height: 1200 },
        { name: "9-2", width: 770, height: 1200 },
      ],
    ),
  },

  tt_interview: {
    id: "tt_interview",
    name: "TT Interview",
    tech: ["android", "laravel", "sqlite"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-tt-interview.png",
    iconShape: "wide",
    timeframe: "2017",
    description: `
<p data-tone="lead">TT Interview is an internal application used for conducting interviews at Tailored Tech. It features dynamic field types for each question, allowing interviewers to use text inputs, ratings, dropdowns, and more depending on the question. The question sets can be fully customized for each role the interview is conducted for.</p>
<h3>My Contribution:</h3>
<p>Built the native Android app end-to-end with SQLite for local storage, syncing question templates from the server. The backend was built on Laravel to manage roles, question configurations, and interview submissions.</p>
<div data-layout="list-block"><ul>
<li>Dynamic field types per question (text, rating, dropdown, etc.)</li>
<li>Role-based question customization</li>
<li>SQLite local storage with server sync</li>
<li>Laravel backend for role and question management</li>
</ul></div>
`.trim(),
    images: imageRange(
      "tt_interview",
      8,
      { width: 1440, height: 2560 },
      {
        3: { width: 1440, height: 2880 },
        7: { width: 1440, height: 3584 },
        8: { width: 1440, height: 4216 },
      },
    ),
  },
};

const projectOrder = [
  "thriveworks",
  "nykaa",
  "snapteam",
  "wakency",
  "benefactory",
  "pulse",
  "lighthouse",
  "measure",
  "tt_interview",
  "vc_music_player",
];

export const projectList = projectOrder.map((id) => projects[id]);
