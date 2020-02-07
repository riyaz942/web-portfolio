import nykaaLogoFirst from 'Images/nykaa-logo-first.png';
import nykaaLogoRest from 'Images/nykaa-logo-rest.png';

import tailoredTechLogoFirst from 'Images/tailoredtech-logo-first.png';
import tailoredTechLogoRest from 'Images/tailoredtech-logo-rest.png';

import mitLogoFirst from 'Images/mit-logo-first.jpg';
import mitLogoRest from 'Images/mit-logo-first.jpg';

import nykaaBackgroundImage from 'Images/background-image-nykaa.jpg';
import tailoredTechBackgroundImage from 'Images/background-image-tailoredtech.jpg';

export const timelineListValue = [
  {
    id: 'nykaa',
    isSelected: true,
    companyName: 'Nykaa',
    position: 'Frontend Developer',
    duration: 'Feb 2019 - Sep 2019 (8 months)',
    location: 'Gurugram',
    roleDetail: '',
    companyDetail: '',
    firstLogo: nykaaLogoFirst,
    restLogo: nykaaLogoRest,
    restMargin: 13, // the secound image margin because logo length is different
    containerWidth: 90, // the capsule container width .. when opened size
    backgroundImage: nykaaBackgroundImage,
  },
  {
    id: 'tailoredtech',
    isSelected: false,
    companyName: 'Tailored Tech',
    position: 'Fullstack Developer',
    duration: 'May 2016 - Jan 2019 (2 years & 8 months)',
    location: 'Pune',
    roleDetail: '',
    companyDetail: '',
    firstLogo: tailoredTechLogoFirst,
    restLogo: tailoredTechLogoRest,
    restMargin: 20,
    containerWidth: 107,
    backgroundImage: tailoredTechBackgroundImage,
  },
  {
    id: 'mit',
    isSelected: false,
    companyName: 'Projects completed in College',
    position: 'Android & Web',
    duration: '2014 - 2016 (2 years)',
    location: 'Pune',
    roleDetail: '',
    companyDetail: '',
    firstLogo: tailoredTechLogoFirst,
    restLogo: tailoredTechLogoRest,
    restMargin: 12,
    containerWidth: 90,
    backgroundImage: tailoredTechBackgroundImage,
  }
];
