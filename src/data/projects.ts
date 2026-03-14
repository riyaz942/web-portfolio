export type DescriptionBlock =
  | { type: "text"; value: string; highlight?: string }
  | { type: "points"; value: string[]; title?: string; highlight?: string }
  | { type: "header"; value: string };

export interface Project {
  id: string;
  name: string;
  tech: string[];
  involvement: "Major" | "Intermittent" | "Owned";
  icon: string;
  link?: { type: "visit" | "download"; value: string };
  description: DescriptionBlock[];
  images: string[];
}

const projectImageDir = "/assets/images/projectImages";

function imageRange(folder: string, count: number, extra?: string[]): string[] {
  const imgs = Array.from({ length: count }, (_, i) => `${projectImageDir}/${folder}/${i + 1}.png`);
  if (extra) imgs.push(...extra.map((e) => `${projectImageDir}/${folder}/${e}.png`));
  return imgs;
}

export const projects: Record<string, Project> = {
  snapteam: {
    id: "snapteam",
    name: "Snapteam/Bijli",
    tech: ["react", "electron", "laravel"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-bijli.png",
    description: [
      {
        type: "text",
        highlight: "green",
        value:
          "Bijli is a project management and communication app that helps reduce communication noise within teams and provides useful metrics for real-time decision making.",
      },
      {
        type: "points",
        highlight: "green",
        title:
          "Bijli was intended to be a cross-platform product across Web, Desktop, Android, iOS, and Slack with the following core features:",
        value: [
          "Check-in Mechanism",
          "To-Do management",
          "Notification & Updates",
          "Feedback Engine",
          "Reservation System",
          "Real-Time Insights",
        ],
      },
      {
        type: "text",
        highlight: "green",
        value: "This project was also showcased at TechCrunch 2018.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "I mostly worked on React and Electron in Bijli, and contributed to one feature in Laravel. Architected the Home page components to communicate across tabs and handle real-time data updates.",
      },
      {
        type: "points",
        title: "These are some technical challenges and technologies used:",
        value: [
          "Electron and Web build process with webpack",
          "A custom-built Compose flow (drafting messages, tagging, file attachments, etc.)",
          "Pusher implementation for real time data updates",
          "Css in js implementation with aphrodite",
          "Used string replacement to add interactive functionality to inline text segments",
          "Redux-api-middleware",
          "React-Router-v4",
          "React-redux-form",
          "Aphrodite",
          "Material-UI",
          "Firebase",
          "Redux",
          "React-Router",
          "Redux-Form",
          "Css Modules",
        ],
      },
    ],
    images: imageRange("snapteam", 8),
  },

  wakency: {
    id: "wakency",
    name: "Wakency",
    tech: ["react"],
    involvement: "Intermittent",
    icon: "/assets/icons/project-icon-wakency.png",
    link: { type: "visit", value: "https://www.wakency.com/" },
    description: [
      {
        type: "text",
        highlight: "green",
        value:
          "Wakency was built to address the changing work culture of our times \u2014 India\u2019s first on-demand flexible work platform that uses proprietary technology to automatically match temporary workers with employers.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "I worked on the front-end web and developed the landing pages and a few features within the app.",
      },
      {
        type: "points",
        value: [
          "Worked with css-modules",
          "Firebase Notification",
          "Redux",
          "Redux-api-middleware",
          "React-redux-form",
          "React-Router v3",
          "Slick and swiper.js for carousel",
        ],
      },
    ],
    images: imageRange("wakency", 6),
  },

  nykaa: {
    id: "nykaa",
    name: "Nykaa",
    tech: ["react"],
    involvement: "Intermittent",
    icon: "/assets/icons/project-icon-nykaa.png",
    link: { type: "visit", value: "https://www.nykaa.com/" },
    description: [
      {
        type: "text",
        highlight: "green",
        value:
          "Nykaa is an e-commerce website offering beauty and wellness products from more than 500 leading brands. Nykaa follows an inventory-based model with warehouses in Mumbai, New Delhi, and Chennai, along with an offline presence across 60+ stores and expanding.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "I was actively involved in building new features such as the signup/signin flow and introduced an AR makeup try-on using Modi-face for the iOS webview with staged releases. I also maintained the entire Nykaa Pro module alongside these new features.",
      },
      {
        type: "points",
        value: [
          "New mobile signup/signin flow",
          "Trending Search and Search history",
          "Nykaa Pro",
          "Worked on an AR makeup try-on with modiface",
          "Unit test cases with jest",
        ],
      },
    ],
    images: imageRange("nykaa", 5),
  },

  pulse: {
    id: "pulse",
    name: "Pulse/Sprout",
    tech: ["react-native"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-pulse.png",
    link: { type: "visit", value: "https://www.youtube.com/watch?v=wOsy7b2Q-J4" },
    description: [
      {
        type: "text",
        highlight: "green",
        value:
          "Sprout is a delivery kitchen that aims to serve delicious meals while cutting the long wait typically associated with them. It is a subscription-based service with detailed ingredient information, a customizable menu, and a daily-changing selection.",
      },
      {
        type: "text",
        highlight: "green",
        value:
          "The Sprout app allowed users to quickly and conveniently book meals. It was not published due to business operation issues on the client's end.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "Designed the app's component architecture and API layer using Redux middleware and Axios to automatically handle common responses and simplify API integration across screens. Also worked on the app's core flows including Login, Meal selection, and Home.",
      },
      {
        type: "points",
        value: [
          "Redux",
          "Axios",
          "RN Razorpay",
          "RN Navigation (Wix)",
          "RN Swiper",
          "RN Facebook sdk",
          "RN Fabric (Crash Reporting)",
          "RN Branch (Deeplinking)",
          "RN Firebase",
        ],
      },
    ],
    images: imageRange("pulse", 9),
  },

  lighthouse: {
    id: "lighthouse",
    name: "LightHouse Project",
    tech: ["react-native"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-lighthouse.png",
    link: {
      type: "download",
      value: "https://play.google.com/store/apps/details?id=com.tailoredtech.lighthouse",
    },
    description: [
      {
        type: "text",
        highlight: "green",
        value:
          "The Lighthouse Project is a not-for-profit organisation in Mumbai that connects working professionals and college students with children from under-resourced communities, through one-on-one mentoring in a safe environment.",
      },
      {
        type: "text",
        value:
          "The app helps schedule meetings with mentees and includes check-in and check-out features to track hours spent, along with prior notifications for upcoming meetings.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "Joined this project mid-development and worked on the Home Screen, Create Meeting flow, View Meetings flow, and Notifications.",
      },
      {
        type: "points",
        value: [
          "React Navigation",
          "RN FCM",
          "RN Fabric (Crash Reporting)",
          "RN Actionsheet",
          "Tcomb form native",
        ],
      },
    ],
    images: imageRange("lighthouse", 7),
  },

  benefactory: {
    id: "benefactory",
    name: "Benefactory",
    tech: ["laravel", "vanilla-js", "scss"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-benefactory.png",
    link: { type: "visit", value: "http://benefactory.live/" },
    description: [
      {
        type: "text",
        highlight: "green",
        value:
          "Benefactory envisions a future where everyday people can seamlessly act on urgent issues while on the go. They partner with frequently visited websites \u2014 from shopping to booking a ride \u2014 to place a micro-donation ACT widget that responds to crises in the headlines, letting users add a donation to their cart at checkout.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "Built the entire frontend and designed a responsive UI. Used Laravel\u2019s Blade templating engine to create reusable components and defined SCSS classes for typography. Used Laravel Mix and Webpack for asset versioning. The project was primarily UI-focused with no complex backend features.",
      },
      {
        type: "points",
        value: [
          "Flexbox",
          "Media queries",
          "Scss",
          "Css Grid",
          "Webpack",
          "Jquery",
          "Laravel mix",
        ],
      },
    ],
    images: imageRange("benefactory", 7),
  },

  measure: {
    id: "measure",
    name: "Measure",
    tech: ["android"],
    involvement: "Major",
    icon: "/assets/icons/project-icon-measure.png",
    link: {
      type: "download",
      value: "https://play.google.com/store/apps/details?id=com.informedtech.measure.app",
    },
    description: [
      {
        type: "text",
        highlight: "green",
        value:
          "Measure is a fitness app that helps users track habits and weight, providing detailed health insights to support informed decisions. The app integrates with a smart weighing scale device to capture weight data directly.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "Built the app's BLE pairing system to connect with the client's smart weighing scale using Android's BluetoothGatt class. Also developed the charts and remaining app flows, excluding the onboarding flow.",
      },
      {
        type: "text",
        value: "The app is not actively maintained now.",
      },
      {
        type: "points",
        value: [
          "BLE Integration with their weighing scale device",
          "MP Charts implementation",
          "Local notification implementation",
          "MVC architecture",
          "Butterknife",
          "Retrofit",
          "Active Android",
          "EventBus",
          "Fabric (Crash Reporting)",
          "Firebase Notifications",
        ],
      },
    ],
    images: imageRange("measure", 8),
  },

  vc_music_player: {
    id: "vc_music_player",
    name: "VC Music Player",
    tech: ["android"],
    involvement: "Owned",
    icon: "/assets/icons/project-icon-vc-music-player.png",
    link: {
      type: "download",
      value: "https://drive.google.com/open?id=1Fo3FSfu7NHTJ60Y0uQcWYpv6mX1Tetqe",
    },
    description: [
      {
        type: "text",
        highlight: "green",
        value:
          "This app was designed to simplify navigation and make music library management seamless. It features the ability to play videos as audio-only within a playlist and switch between music and video modes. It also includes voice recognition to play/pause, search, switch playlists, shuffle, and more.",
      },
      {
        type: "text",
        value:
          "Built this app end-to-end \u2014 from screen design in Photoshop to development and publishing. Worked on it during my college years and learned Android development largely through building it.",
      },
      {
        type: "points",
        title: "Features:",
        value: [
          "Offline voice recognition and continuous voice recognition implementation with pocket sphinx",
          "13 voice commands to control player",
          "Floating Widget",
          "Home Widgets",
          "Automatically attach missing Album art to audio files",
          "2 theme implementation",
          "Play video files with an option to listen to the audio only and switch between them",
        ],
      },
    ],
    images: [...imageRange("vc_music_player", 8), `${projectImageDir}/vc_music_player/9-1.png`, `${projectImageDir}/vc_music_player/9-2.png`],
  },

  tt_interview: {
    id: "tt_interview",
    name: "TT Interview",
    tech: [],
    involvement: "Major",
    icon: "",
    description: [],
    images: imageRange("tt_interview", 8),
  },
};

export const projectList = Object.values(projects);
