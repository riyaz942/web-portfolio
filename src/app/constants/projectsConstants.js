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
    involvement: 'Major',
    icon: bijliIcon,
    description: [
      {
        type: 'text',
        highlight: 'green',
        value: 'Bijli is a Project management and communication App which helps reduce communication noise within teams, and provide useful metric to make real time decisions.'
      },
      {
        type: 'points',
        highlight: 'green',
        title: 'The intention for bijli was to have a cross-platform product working on Web, Desktop, Android, iOS, Slack platforms having these core features :',
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
        type: 'text',
        highlight: 'green',
        value: 'This Project was also displayed on tech crunch 2018.'
      },
      {
        type: 'header',
        value: 'My Contribution :',        
      },
      {
        type: 'text',
        value: 'In Bijli I mostly worked on React and Electron, and worked with Laravel for one feature.<br/>Have Architectured Home page components to connect with other tabs which communicate with each other and handle realtime data updates.',
      },
      {
        type: 'points',
        title: 'These are some feature complexity faced and technology used :',
        value: [
          'Electron and Web build process with webpack',
          "A custom made Compose flow (Drafting messages, tagging, file attachments, etc)",
          'Pusher implementation for real time data updates',
          'Css in js implementation with aphrodite',
          'Worked with string replace to add functionality to a part of a string',
          'Redux-api-middleware',
          'React-Router-v4',
          'React-redux-form',
          'Aphrodite',
          'Redux-api-middleware',
          'Material-UI',
          'Firebase',
          'Redux',
          'React-Router',
          'Redux-Form',
          'Css Modules'
        ]
      }
    ]
  },
  
  wakency: {
    name: 'Wakency',
    tech: ['react'],
    icon: wakencyIcon,
    involvement: 'Intermittent',
    link: {
      type: 'visit',
      value: 'https://www.wakency.com/'
    },
    description: [
      {
        type: 'text',
        highlight: 'green',
        value: 'Wakency has been built to address the changing work culture of our times, to be India’s first on-demand flexible work platform that uses proprietary technology to automate making the perfect match between temporary workers and employers.'
      },
      {
        type: 'header',
        value: 'My Contribution :',        
      },
      {
        type: 'text',
        value: 'I worked on the front-end web and developed the landing pages and few features within the app. '
      },
      {
        type: 'points',
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
    involvement: 'Intermittent',
    link: {
      type: 'visit',
      value: 'https://www.nykaa.com/'
    },
    description: [
      {
        type: 'text',
        highlight: 'green',
        value: "Nykaa is an e-commerce website offering beauty and wellness products from more than 500 leading brands. <br/><br/>Nykaa follows an inventory-based model with warehouses in Mumbai, New Delhi, and Chennai as its offline presence is in 60 stores and expanding"
      },
      {
        type: 'header',
        value: 'My Contribution :',        
      },
      {
        type: 'text',
        value: 'I was actively involved in building new features like new signup/signin flow, had introduced a AR makeup try-on using Modi-face for the iOS webview with stage releases.<br/>Also maintained entire Nykaa Pro module while working on these new features.'
      },
      {
        type: 'points',
        value: [
          'New mobile signup/signin flow',
          'Trending Search and Search history',
          'Nykaa Pro',
          'Worked on a AR makeup try-on with modiface',
          'Unit test cases with jest'
        ]
      }
    ]
  },
  pulse: {
    name: 'Pulse/Sprout',
    tech: ['react-native'],
    icon: pulseIcon,
    involvement: 'Major',
    link: {
      type: 'visit',
      value:  'https://www.youtube.com/watch?v=wOsy7b2Q-J4'
    },
    description: [
      {
        type: 'text',
        highlight: 'green',
        value: 'Sprout is a delivery kitchen that aims to serve delicious meals, while cutting the long wait associated with them. It is a subscription based service with a clear detail of ingredients that is customizable and changes daily.'
      },
      {
        type: 'text',
        highlight: 'green',
        value: 'The purpose of the Sprout app users is to quickly and conveniently book meals from Sprout.<br/> It was not published due to some business operation issue on the clients end.'
      },
      {
        type: 'header',
        value: 'My Contribution :',        
      },
      {
        type: 'text',
        value: 'Created this apps component architecture and Api calls system with Redux middleware and Axios so that it would automatically handle common responses and make api implementation simple and easy on each screen.<br/>Also worked on the Apps flows and screens which include Login flow, Meal selection flow and Home flow.'
      },
      {
        type: 'points',
        value: [
          'Redux',
          'Axios',
          'RN Razorpay',
          'RN Navigation (Wix)',
          "RN Swiper",
          'RN Facebook sdk',
          'RN Fabric (Crash Reporting)',
          'RN Branch (Deeplinking)',
          'RN Firebase'
        ]
      },
    ]
  },
  lighthouse: {
    name: 'LightHouse Project',
    tech: ['react-native'],
    icon: lighthouseIcon,
    involvement: 'Major',
    link: {
      type: 'download',
      value: 'https://play.google.com/store/apps/details?id=com.tailoredtech.lighthouse'
    },
    description: [
      {
        type: 'text',
        highlight: 'green',
        value: 'The Lighthouse Project is a not-for-profit organisation in Mumbai that connects working professionals and college students with children from under resourced communities, through one-on-one mentoring in a safe environment.'
      },
      {
        type: 'text',
        value: 'The app helps to schedule a time and a place to meet with a mentee and has checkin and checkout features to track hours spent for a meeting and providing prior notifications for meetings.'
      },
      {
        type: 'header',
        value: 'My Contribution :',        
      },
      {
        type: 'text',
        value: 'Jumped on this project during the middle stages and worked on Home Screen, Create meeting flow, View meetings flow and Notifications.'
      },
      {
        type: 'points',
        value: [
          'React Navigation',
          'RN FCM',
          'RN Fabric (Crash Reporting)',
          'RN Actionsheet',
          'Tcomb form native'
        ]
      }
    ]
  },
  benefactory: {
    name: 'Benefactory',
    tech: ['laravel', 'vanila-js', 'scss'],
    icon: benefactoryIcon,
    involvement: 'Major',
    link: {
      type: 'visit',
      value: 'http://benefactory.live/'
    },
    description: [
      {
        type: 'text',
        highlight: 'green',
        value: 'Benefactory envisions a future where everyday people have the power to seamlessly act on urgent issues while they’re on the go. Benefactory partner with your frequently visited websites - from shopping to booking a ride - to place our micro-donation ACT widget, that responds to crises dominating the headlines, so you can add a donation to your cart at checkout.'
      },
      {
        type: 'header',
        value: 'My Contribution :',        
      },
      {
        type: 'text',
        value: 'Created the whole frontend of this app and designed the UI to be responsive. Used laravels blade to templating engine to create reusable components and defined scss classes to typograph. Used Laravel Mix and webpack for versioning.<br/>Benefactory didn’t have any feature complexity other than UI, they have updated their website so these designs won’t be available.',
      },
      {
        type: 'points',
        value: [
          'Flexbox',
          'Media queries',
          'Scss',
          'Css Grid',
          'Webpack',
          'Jquery',
          'Laravel mix',

        ]
      }
    ]
  },
  measure: {
    name: 'Measure',
    tech: ['android'],
    icon: measureIcon,
    involvement: 'Major',
    link: {
      type: 'download',
      value: 'https://play.google.com/store/apps/details?id=com.informedtech.measure.app'
    },
    description: [
      {
        type: 'text',
        highlight: 'green',
        value: 'Measure is an fitness app which helps track habit and weight to provide detailed information about your health so that the user can make informed decisions about their health.<br/>The app is integrated with their weighing scale device so the weight data is directly taken from the device.'
      },
      {
        type: 'header',
        value: 'My Contribution :',        
      },
      {
        type: 'text',
        value: 'Created this apps BLE paring system to connect with the clients smart Weighing scale device using Androids BluetoothGatt Class along with the Charts and rest of the flow except onboarding flow.'
      },
      {
        type: 'text',
        value: 'The app is not actively maintained now.'
      },
      {
        type: 'points',
        value: [
          'BLE Integration with their weighing scale device',
          'MP Charts implementation.',
          'Local notification implementation.',
          'MVC architecture',
          'Butterknife',
          'Retrofit',
          'Active Android',
          'EventBus',
          'Fabric (Crash Reporting)',
          'Firebase Notifications'
        ]
      }
    ]
  },
  vc_music_player: {
    name: 'VC Music Player',
    tech: ['android'],
    icon: vcMusicPlayerIcon,
    involvement: 'Owned',
    link: {
      type: 'download',
      value: 'https://drive.google.com/open?id=1Fo3FSfu7NHTJ60Y0uQcWYpv6mX1Tetqe'
    },
    description: [
      {
        type: 'text',
        highlight: 'green',
        value: 'The intention for this app was to reduce navigation and make the music library management seamless and simple while also having a unique features to play video with only music within a playlist and switch between music and video mode.<br/> It also has voice recognition implementation to play/pause, search, switch playlist, shuffle, etc.'
      },
      {
        type: 'text',
        value: 'Created this app from its inception and screen designing in photoshop to its development and publishing, worked on this app during my college years and learned Android development mostly by building this app.'
      },
      {
        type: 'text',
        value: 'I did a blunder and lost the keystore so i was not able to upload the latest build on playstore and the current uploaded app is stuck with a version that has a runtime permission crash so had to unpublish from playstore to maintain the rating, have uploaded the latest apk on google drive, link available on the download button.'
      },
      {
        type: 'points',
        title: 'Features :',
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
