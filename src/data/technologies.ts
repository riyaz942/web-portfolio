export interface Technology {
  id: string;
  name: string;
  description: string;
  projects: string[];
}

export const technologies: Technology[] = [
  {
    id: "react",
    name: "React",
    description:
      "React is my strongest and most recent technology. I have architected web projects from scratch and contributed to ongoing ones. I am familiar with modern techniques and libraries like code-splitting, Hooks, React-Router, Final-Form, Redux, Redux-api-middleware, CSS-in-JS, etc.",
    projects: ["snapteam", "nykaa", "wakency"],
  },
  {
    id: "android",
    name: "Android",
    description:
      "I started my development journey with Android and it remains one of my strongest skills alongside React. I have end-to-end experience with Android app development \u2014 from building to publishing and maintaining \u2014 and have worked with essential libraries including Retrofit, Dagger, Picasso, ActiveAndroid, etc.",
    projects: ["vc_music_player", "measure"],
  },
  {
    id: "react-native",
    name: "React-Native",
    description:
      "I have built and published a React Native app for both iOS and Android using the React Native CLI, so I am familiar with the full development lifecycle. I have also contributed bug fixes to open-source React Native libraries.",
    projects: ["lighthouse", "pulse"],
  },
  {
    id: "laravel",
    name: "Laravel",
    description:
      "I have some experience with Laravel and backend development. While I haven't built a project from scratch in it, I have worked on individual modules and features. I am familiar with the framework's core features like MVC architecture, Blade templating, Eloquent ORM, Artisan, and Seeders.",
    projects: ["benefactory", "snapteam"],
  },
  {
    id: "electron",
    name: "Electron",
    description:
      "I have experience building an Electron app with React, handling platform-specific concerns such as Desktop/Web notifications, screen routing, and storage. Wrote build configurations to bundle the Web and Electron apps separately.",
    projects: ["snapteam"],
  },
];
