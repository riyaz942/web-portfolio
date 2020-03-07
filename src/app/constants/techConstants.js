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
    description: '',
    projects: ['snapteam', 'nykaa', 'wakency'],
  },
  {
    id: 'android',
    name: 'Android',
    firstLogo: androidIcon,
    backgroundImage: androidBackgroundImage,
    description: '',
    projects: ['vc_music_player', 'measure']
  },
  {
    id: 'react-native',
    name: 'React-Native',
    firstLogo: reactNativeIcon,
    backgroundImage: reactNativeBackgroundImage,
    description: '',
    projects: ['lighthouse', 'pulse']
  },
  {
    id: 'laravel',
    name: 'Laravel',
    firstLogo: laravelIcon,
    backgroundImage: laravelBackgroundImage,
    description: '',
    projects: ['benefactory', 'snapteam']
  },
  {
    id: 'electron',
    name: 'Electron',
    firstLogo: electronIcon,
    backgroundImage: electronBackgroundImage,
    description: '',
    projects: ['snapteam']
  }
];
