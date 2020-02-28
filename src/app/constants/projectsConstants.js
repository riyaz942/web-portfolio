import bijliIcon from 'Icons/project-icon-bijli.png';
import wakencyIcon from 'Icons/project-icon-wakency.png';
import nykaaIcon from 'Icons/project-icon-nykaa.png';
import pulseIcon from 'Icons/project-icon-pulse.png';
import lighthouseIcon from 'Icons/project-icon-lighthouse.png';
import benefactoryIcon from 'Icons/project-icon-benefactory.png';
import measureIcon from 'Icons/project-icon-measure.png';
import vcMusicPlayerIcon from 'Icons/project-icon-vc-music-player.png';

export const projectsListValue = {
  snapteam: {
    name: 'Snapteam/Bijli',
    tech: ['react', 'electron', 'laravel'],
    icon: bijliIcon,
    description: [
      {
        type: 'text',
        value: 'Bijli is a Project management and communication App which helps reduce communication noise within teams, and provide useful metric to make real time decisions.'
      },
      {
        type: 'points',
        title: 'The intention for bijli was to have a cross-platform product working on Web, Desktop, Android, iOS, Slack platforms having these core features :-',
        value: [
          'Check-in Mechanism',
          'To-Do management',
          'Notification & Updates',
          'Feedback Engine',
          'Reservation System',
          'Real-Time Insights'
        ]
      },
      {
        type: 'header',
        value: 'My Part in project :-',        
      },
      {
        type: 'text',
        value: 'In Bijli I mostly worked on React and Electron, and worked on one feature with laravel.<br /> Took the lead for the web and electron sprints, for a period ',
      },
      {
        type: 'points',
        title: 'These are some feature complexity faced and technology used :-',
        value: [
          'Electron and Web build process with webpack',
          "A custom made compose flow (Similar to gmail's compose)",
          'Pusher implementation for real time data updates',
          'Css in js implementation with aphrodite',
          'Worked with string replace to add functionality to a part of a string',
          'Redux-api-middleware',
          'React-Router-v4',
          'React-redux-form'
        ]
      }
    ]
  },
  
  wakency: {
    name: 'Wakency',
    tech: ['react'],
    icon: wakencyIcon,
    link: {
      type: 'visit',
      value: 'https://www.wakency.com/'
    },
    description: [
      {
        type: 'text',
        value: 'Wakency has been built to address the changing work culture of our times, to be India’s first on-demand flexible work platform that uses proprietary technology to automate making the perfect match between temporary workers and employers.'
      },
      {
        type: 'text',
        value: 'I worked on the front-end web and developed the landing pages and few features within the app. '
      },
      {
        value: 'points',
        value: [
          'Worked with css-modules',
          'Firebase Notification',
          'Redux',
          'Redux-api-middleware',
          'React-redux-form',
          'React-Router v3',
          'Slick and swiper.js for carousel'
        ]
      }
    ]
  },

  nykaa: {
    name: 'Nykaa',
    tech: ['react'],
    icon: nykaaIcon,
    link: {
      type: 'visit',
      link: 'https://www.nykaa.com/'
    },
    description: [
      {
        type: 'text',
        value: "Nykaa is an e-commerce website offering beauty and wellness products from more than 500 leading brands.<br /> Nykaa’s website was initially built with magento but it was hard to scale with it, so they started moving the frontend to react and backend on python."
      },
      {
        type: 'points',
        title: 'These are the features i worked on there :-',
        value: [
          'Nykaa Pro',
          'Trending Search and Search history',
          'New mobile signup/signin flow'
        ]
      }
    ]
  },
  pulse: {
    name: 'Pulse/Sprout',
    tech: ['react-native'],
    icon: pulseIcon,
    link: {
      type: 'visit',
      value:  'https://www.youtube.com/watch?v=wOsy7b2Q-J4'
    },
    description: [
      {
        type: 'text',
        value: 'Sprout is a delivery kitchen that aims to serve delicious meals, while cutting the long wait associated with them. It is a subscription based service with a clear detail of ingredients that is customizable and changes daily.'
      },
      {
        type: 'text',
        value: 'The purpose of the Sprout app users is to quickly and conveniently book meals from Sprout.<br /> It was not published due to some business operation issue on the clients end.'
      },
      {
        type: 'text',
        value: 'Pulse was built on react native with a team strength of 2 people. As such there wasn’t any feature complexity other than UI.'
      }
    ]
  },
  lighthouse: {
    name: 'LightHouse Project',
    tech: ['react-native'],
    icon: lighthouseIcon,
    link: {
      type: 'visit',
      value: 'https://play.google.com/store/apps/details?id=com.tailoredtech.lighthouse'
    },
    description: [
      {
        type: 'text',
        value: 'The Lighthouse Project is a not-for-profit organisation in Mumbai that connects working professionals and college students with children from under resourced communities, through one-on-one mentoring in a safe environment.'
      },
      {
        type: 'text',
        value: 'The app helps to schedule a time and a place to meet with a mentee and has checkin and checkout features to track hours spent for a meeting and providing prior notifications for meetings.'
      }
    ]
  },
  benefactory: {
    name: 'Benefactory',
    tech: ['laravel', 'vanila-js', 'scss'],
    icon: benefactoryIcon,
    link: {
      type: 'visit',
      value: 'http://benefactory.live/'
    },
    description: [
      {
        type: 'text',
        value: 'Benefactory envisions a future where everyday people have the power to seamlessly act on urgent issues while they’re on the go. Benefactory partner with your frequently visited websites - from shopping to booking a ride - to place our micro-donation ACT widget, that responds to crises dominating the headlines, so you can add a donation to your cart at checkout.'
      },
      {
        type: 'text',
        value: 'Benefactory didn’t have any feature complexity other than UI, they have updated their website so these designs won’t be available.'
      }
    ]
  },
  measure: {
    name: 'Measure',
    tech: ['android'],
    icon: measureIcon,
    link: {
      type: 'visit',
      value: 'https://play.google.com/store/apps/details?id=com.informedtech.measure.app'
    },
    description: [
      {
        type: 'text',
        value: 'Measure is an fitness app which helps track habit and weight to provide detailed information about your health so that the user can make informed decisions about their health while being integrated with their weighing scale device.'
      },
      {
        type: 'text',
        value: 'The app is not actively maintained now.'
      },
      {
        type: 'points',
        value: [
          'BLE Integration with their weighing scale device',
          'MP charts implementation.',
          'Local notification implementation.'
        ]
      }
    ]
  },
  vc_music_player: {
    name: 'VC Music Player',
    tech: ['android'],
    icon: vcMusicPlayerIcon,
    description: [
      {
        type: 'text',
        value: 'Vc music player is an app with bloated features 😆, the intention for this app was to reduce navigation and make the music search and selection seamless and simple while also having a feature to play video with only music within a playlist and switch between music and video mode.'
      },
      {
        type: 'text',
        value: 'I did a stupid thing and lost the keystore so i was not able to upload the latest build and the uploaded app is stuck with a version having a runtime permission crash so had to unpublish to maintain the rating 😆.'
      },
      {
        type: 'points',
        title: 'Features :-',
        value: [
          'Offline voice recognition and continuous voice recognition implementation with pocket sphinx.',
          '13 voice commands to control player',
          'Floating Widget.',
          'Home Widgets.',
          'Automatically attach missing Album art to audio files',
          '2 theme implementation.',
          'Play video files with an option to listen to the audio only and switch between them.'
        ]
      }
    ]
  }
};
