import nykaaLogoFirst from 'Images/nykaa-logo-first.png';
import nykaaLogoRest from 'Images/nykaa-logo-rest.png';

import tailoredTechLogoFirst from 'Images/tailoredtech-logo-first.png';
import tailoredTechLogoRest from 'Images/tailoredtech-logo-rest.png';

import mitLogoFirst from 'Images/mit-logo-first.png';
import mitLogoRest from 'Images/mit-logo-rest.png';

import nykaaBackgroundImage from 'Images/background/background-image-nykaa.jpg';
import tailoredTechBackgroundImage from 'Images/background/background-image-tailoredtech.jpg';
import collegeBackgroundImage from 'Images/background/background-image-college.jpg';

export const timelineListValue = [
  {
    id: 'nykaa',
    companyName: 'Nykaa',
    link: 'https://www.nykaa.com/',
    position: 'Frontend Developer',
    duration: 'Feb 2019 - Sep 2019 (8 months)',
    location: 'Gurugram',
    roleDetail: 'In Nykaa I got to work as a React frontend developer, worked on production bugs and features like Mobile Signup flow implementation, Nykaa Pro, Recent search and search history and their AR makeup implementation with Modiface.',
    companyDetail: 'Nykaa is an e-commerce website offering beauty and wellness products from more than 500 leading brands. Nykaa follows an inventory-based model with warehouses in Mumbai, New Delhi, and Chennai as its offline presence is in 60 stores and expanding. It claims to have over 1000+ curated brands and 85,000 products.',
    firstLogo: nykaaLogoFirst,
    restLogo: nykaaLogoRest,
    restMargin: 26, // the secound image margin because logo length is different
    backgroundImage: nykaaBackgroundImage,
    projects: ['nykaa']
  },
  {
    id: 'tailoredtech',
    companyName: 'Tailored Tech',
    link: 'https://www.tailoredtech.in/',
    position: 'Fullstack Developer',
    duration: 'May 2016 - Jan 2019 (2 years & 8 months)',
    location: 'Pune',
    roleDetail: 'In TailoredTech I got to experience many roles. I was initially working as an Android developer for a year then jumped on to these tech stacks :- Laravel, React-Native and React.',
    companyDetail: 'Tailored Tech was a service based startup specialised in web and mobile development, and had clients like Nykaa, Ezone, Sportobuddy, healthcode, hippily, wok express, etc.<br /> TailoredTech later got acqui-hired by Nykaa.',
    firstLogo: tailoredTechLogoFirst,
    restLogo: tailoredTechLogoRest,
    restMargin: 34,
    backgroundImage: tailoredTechBackgroundImage,
    projects: ['snapteam', 'pulse', 'measure', 'wakency', 'benefactory', 'lighthouse']
  },
  {
    id: 'mit',
    companyName: 'College',
    position: 'Android & Web',
    duration: '2015 - 2016 (1 years)',
    location: 'Pune',
    roleDetail: '',
    companyDetail: '',
    firstLogo: mitLogoFirst,
    restLogo: mitLogoRest,
    restMargin: 37,
    backgroundImage: collegeBackgroundImage,
    projects: ['vc_music_player']
  }
];

