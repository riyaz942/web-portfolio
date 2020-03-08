import reactIcon from 'Icons/technology/react-tech-icon.png';
import reactNativeIcon from 'Icons/technology/react-native-tech-icon.png';
import androidIcon from 'Icons/technology/android-tech-icon.png';
import laravelIcon from 'Icons/technology/laravel-tech-icon.png';
import electronIcon from 'Icons/technology/electron-tech-icon.png';

import reactBackgroundImage from 'Images/technology/react-background-image.png';
import reactNativeBackgroundImage from 'Images/technology/react-native-background-image.png';
import androidBackgroundImage from 'Images/technology/android-background-image.png';
import laravelBackgroundImage from 'Images/technology/laravel-background-image.png';
import electronBackgroundImage from 'Images/technology/electron-background-image.png';

export const techList = [
  {
    id: 'react',
    name: 'React',
    firstLogo: reactIcon,
    backgroundImage: reactBackgroundImage,
    description: `I have the most as well as recent experience in React compared to other technology in my list.
    <br/>Have created and architected web projects from scratch as well as jumped on ongoing projects.
    <br/><br/> I also have professional experience with other packages that aid React development including: React Router, Aphrodite, React-Final-Form, Redux.`,
    projects: ['snapteam', 'nykaa', 'wakency'],
  },
  {
    id: 'android',
    name: 'Android',
    firstLogo: androidIcon,
    backgroundImage: androidBackgroundImage, //but recently have not touched on Android development so have to freshen up a bit on it.
    description: `I started my development journey with Android and have the most experience in it along with React.<br/><br/>
    I have complete lifecycle experience on Android app developement from creating to publishing and managing, and have experience with needed android libraries which includes: Retrofit, Dagger, Picasso,`,
    projects: ['vc_music_player', 'measure']
  },
  {
    id: 'react-native',
    name: 'React-Native',
    firstLogo: reactNativeIcon,
    backgroundImage: reactNativeBackgroundImage,
    description: `I have created and published a React-Native app for iOS and Android so i am familiar with its lifecycle while working with React-Native CLI.<br/><br/>
    I have contributed some bug fixes to some open source React-Native libraries during my period developing on react native.
    `,
    projects: ['lighthouse', 'pulse']
  },
  {
    id: 'laravel',
    name: 'Laravel',
    firstLogo: laravelIcon,
    backgroundImage: laravelBackgroundImage,
    description: `I have a bit of experience in Laravel and backend development although have not created any project from scratch but have worked on seperate modules and features.<br/><br/>
    But I am familiar with the backend development and the frameworks features like: MVC architecture, HTML template engine (blade), Eloquent ORM, Artisan and Seeders.`,
    projects: ['benefactory', 'snapteam']
  },
  {
    id: 'electron',
    name: 'Electron',
    firstLogo: electronIcon,
    backgroundImage: electronBackgroundImage,
    description: 'I have experience in creating an electron app with the help of React while also considering platform specific technicalities during development like, Desktop/Web notifications, screen routing, storage.<br/><br/>Written configurations to bundle Web app and Electron app seperatly for both.',
    projects: ['snapteam']
  }
];
