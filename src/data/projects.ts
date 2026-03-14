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
          "Bijli is a Project management and communication App which helps reduce communication noise within teams, and provide useful metrics to make real time decisions.",
      },
      {
        type: "points",
        highlight: "green",
        title:
          "The intention for Bijli was to have a cross-platform product working on Web, Desktop, Android, iOS, Slack platforms having these core features:",
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
        value: "This Project was also displayed on TechCrunch 2018.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "In Bijli I mostly worked on React and Electron, and worked with Laravel for one feature. Architected Home page components to connect with other tabs which communicate with each other and handle realtime data updates.",
      },
      {
        type: "points",
        title: "These are some technical challenges and technologies used:",
        value: [
          "Electron and Web build process with webpack",
          "A custom made Compose flow (Drafting messages, tagging, file attachments, etc)",
          "Pusher implementation for real time data updates",
          "Css in js implementation with aphrodite",
          "Worked with string replace to add functionality to a part of a string",
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
          "Wakency has been built to address the changing work culture of our times, to be India\u2019s first on-demand flexible work platform that uses proprietary technology to automate making the perfect match between temporary workers and employers.",
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
          "Nykaa is an e-commerce website offering beauty and wellness products from more than 500 leading brands. Nykaa follows an inventory-based model with warehouses in Mumbai, New Delhi, and Chennai as its offline presence is in 60 stores and expanding.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "I was actively involved in building new features like new signup/signin flow, had introduced an AR makeup try-on using Modi-face for the iOS webview with stage releases. Also maintained entire Nykaa Pro module while working on these new features.",
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
          "Sprout is a delivery kitchen that aims to serve delicious meals, while cutting the long wait associated with them. It is a subscription based service with a clear detail of ingredients that is customizable and changes daily.",
      },
      {
        type: "text",
        highlight: "green",
        value:
          "The purpose of the Sprout app users is to quickly and conveniently book meals from Sprout. It was not published due to some business operation issue on the client's end.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "Created this app's component architecture and API calls system with Redux middleware and Axios so that it would automatically handle common responses and make API implementation simple and easy on each screen. Also worked on the Apps flows and screens which include Login flow, Meal selection flow and Home flow.",
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
          "The app helps to schedule a time and a place to meet with a mentee and has check-in and check-out features to track hours spent for a meeting and providing prior notifications for meetings.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "Jumped on this project during the middle stages and worked on Home Screen, Create meeting flow, View meetings flow and Notifications.",
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
          "Benefactory envisions a future where everyday people have the power to seamlessly act on urgent issues while they\u2019re on the go. Benefactory partner with your frequently visited websites \u2014 from shopping to booking a ride \u2014 to place our micro-donation ACT widget, that responds to crises dominating the headlines, so you can add a donation to your cart at checkout.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "Created the whole frontend of this app and designed the UI to be responsive. Used Laravel\u2019s blade templating engine to create reusable components and defined scss classes for typography. Used Laravel Mix and webpack for versioning. Benefactory didn\u2019t have any feature complexity other than UI.",
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
          "Measure is a fitness app which helps track habit and weight to provide detailed information about your health so that the user can make informed decisions about their health. The app is integrated with their weighing scale device so the weight data is directly taken from the device.",
      },
      { type: "header", value: "My Contribution:" },
      {
        type: "text",
        value:
          "Created this app's BLE pairing system to connect with the client's smart Weighing scale device using Android's BluetoothGatt class along with the Charts and rest of the flow except onboarding flow.",
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
          "The intention for this app was to reduce navigation and make the music library management seamless and simple while also having unique features to play video with only music within a playlist and switch between music and video mode. It also has voice recognition implementation to play/pause, search, switch playlist, shuffle, etc.",
      },
      {
        type: "text",
        value:
          "Created this app from its inception and screen design in Photoshop to its development and publishing, worked on this app during my college years and learned Android development mostly by building this app.",
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
