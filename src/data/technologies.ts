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
      "I have the most as well as recent experience in React compared to other technology in my list. I have created and architected web projects from scratch as well as jumped on ongoing projects. I am familiar with recent techniques and libraries used in react like code-splitting, Hooks, React-Router, Final-Form, Redux, Redux-api-middleware, css in js, etc.",
    projects: ["snapteam", "nykaa", "wakency"],
  },
  {
    id: "android",
    name: "Android",
    description:
      "I started my development journey with Android and have the most experience in it along with React. I have complete lifecycle experience on Android app development from creating to publishing and managing, and have experience with needed android libraries which includes: Retrofit, Dagger, Picasso, ActiveAndroid, etc.",
    projects: ["vc_music_player", "measure"],
  },
  {
    id: "react-native",
    name: "React-Native",
    description:
      "I have created and published a React-Native app for iOS and Android so I am familiar with its lifecycle, while working with React-Native CLI. I have contributed some bug fixes to some open source React-Native libraries during my period developing on react native.",
    projects: ["lighthouse", "pulse"],
  },
  {
    id: "laravel",
    name: "Laravel",
    description:
      "I have a bit of experience in Laravel and backend development although have not created any project from scratch but have worked on separate modules and features. I am familiar with backend development and the frameworks features like: MVC architecture, HTML template engine (blade), Eloquent ORM, Artisan and Seeders.",
    projects: ["benefactory", "snapteam"],
  },
  {
    id: "electron",
    name: "Electron",
    description:
      "I have experience in creating an electron app with the help of React while also considering platform specific technicalities during development like, Desktop/Web notifications, screen routing, storage. Written configurations to bundle Web app and Electron app separately for both.",
    projects: ["snapteam"],
  },
];
