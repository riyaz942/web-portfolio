// const projectImages = {
//   snapteam: require.context(`../../assets/images/projectImages/snapteam`, false, /.*\.png$/),
//   pulse:  require.context(`../../assets/images/projectImages/pulse`, false, /.*\.png$/),
//   measure:  require.context(`../../assets/images/projectImages/measure`, false, /.*\.png$/),
//   wakency:  require.context(`../../assets/images/projectImages/wakency`, false, /.*\.png$/),
//   benefactory:  require.context(`../../assets/images/projectImages/benefactory`, false, /.*\.png$/),
//   lighthouse:  require.context(`../../assets/images/projectImages/lighthouse`, false, /.*\.png$/),
//   nykaa:  require.context(`../../assets/images/projectImages/nykaa`, false, /.*\.png$/),
//   vc_music_player:  require.context(`../../assets/images/projectImages/vc_music_player`, false, /.*\.png$/),
// }

// export const getProjectImages = (id) => {
//   if (!id)
//     return [];

//   const images = projectImages[id];
//   const extractedImages = [];
  
//   images.keys().forEach((key) => {
//     extractedImages.push(images(key));
//   });
//   return extractedImages;
// }


export const getProjectImages = (id) => {
  if (!id)
    return [];

  return projectImages[id];
}

const projectImages = {
  snapteam: [
    {image: require('../../assets/images/projectImages/snapteam/1.png'), width: 968, height: 840},
    {image: require('../../assets/images/projectImages/snapteam/2.png'), width: 1960, height: 1704},
    {image: require('../../assets/images/projectImages/snapteam/3.png'), width: 1960, height: 1704},
    {image: require('../../assets/images/projectImages/snapteam/4.png'), width: 1960, height: 1704},
    {image: require('../../assets/images/projectImages/snapteam/5.png'), width: 1960, height: 1704},
    {image: require('../../assets/images/projectImages/snapteam/6.png'), width: 1960, height: 1704},
    {image: require('../../assets/images/projectImages/snapteam/7.png'), width: 2940, height: 2556},
    {image: require('../../assets/images/projectImages/snapteam/8.png'), width: 2940, height: 2556},
  ],
  pulse: [
    {image: require('../../assets/images/projectImages/pulse/1.png'), width: 1500, height: 2668},
    {image: require('../../assets/images/projectImages/pulse/5.png'), width: 1500, height: 3220},
    {image: require('../../assets/images/projectImages/pulse/6.png'), width: 1500, height: 4308},
    {image: require('../../assets/images/projectImages/pulse/3.png'), width: 1500, height: 3996},
    {image: require('../../assets/images/projectImages/pulse/7.png'), width: 1500, height: 4726},
    {image: require('../../assets/images/projectImages/pulse/8.png'), width: 1500, height: 4674},
    {image: require('../../assets/images/projectImages/pulse/2.png'), width: 1500, height: 2976},
    {image: require('../../assets/images/projectImages/pulse/4.png'), width: 1500, height: 2668},
    {image: require('../../assets/images/projectImages/pulse/9.png'), width: 1500, height: 3302},
  ],
  measure: [
    {image: require('../../assets/images/projectImages/measure/3.png'), width: 720, height: 1280},
    {image: require('../../assets/images/projectImages/measure/1.png'), width: 720, height: 1280},
    {image: require('../../assets/images/projectImages/measure/2.png'), width: 720, height: 1280},
    {image: require('../../assets/images/projectImages/measure/4.png'), width: 720, height: 1280},
    {image: require('../../assets/images/projectImages/measure/6.png'), width: 720, height: 1280},
    {image: require('../../assets/images/projectImages/measure/5.png'), width: 720, height: 1280},
    {image: require('../../assets/images/projectImages/measure/8.png'), width: 720, height: 1280},
    {image: require('../../assets/images/projectImages/measure/7.png'), width: 720, height: 1280},
  ],
  wakency: [
    {image: require('../../assets/images/projectImages/wakency/1.png'), width: 2732, height: 7862, ratioWidth: 3, ratioHeight: 1},
    {image: require('../../assets/images/projectImages/wakency/2.png'), width: 2732, height: 1734},
    {image: require('../../assets/images/projectImages/wakency/3.png'), width: 1441, height: 1363},
    {image: require('../../assets/images/projectImages/wakency/4.png'), width: 1441, height: 1106},
    {image: require('../../assets/images/projectImages/wakency/5.png'), width: 1441, height: 1039},
    {image: require('../../assets/images/projectImages/wakency/6.png'), width: 1440, height: 1029},
  ],
  benefactory: [
    {image: require('../../assets/images/projectImages/benefactory/1.png'), width: 1440, height: 4162, ratioWidth: 2, ratioHeight: 1},
    {image: require('../../assets/images/projectImages/benefactory/2.png'), width: 1440, height: 2739},
    {image: require('../../assets/images/projectImages/benefactory/3.png'), width: 1440, height: 3919},
    {image: require('../../assets/images/projectImages/benefactory/4.png'), width: 2880, height: 3728},
    {image: require('../../assets/images/projectImages/benefactory/5.png'), width: 2880, height: 6780},
    {image: require('../../assets/images/projectImages/benefactory/6.png'), width: 2880, height: 4028},
    {image: require('../../assets/images/projectImages/benefactory/7.png'), width: 2880, height: 3562},
  ],
  lighthouse: [
    {image: require('../../assets/images/projectImages/lighthouse/3.png'), width: 750, height: 1334},
    {image: require('../../assets/images/projectImages/lighthouse/1.png'), width: 750, height: 1334},
    {image: require('../../assets/images/projectImages/lighthouse/2.png'), width: 750, height: 1626},
    {image: require('../../assets/images/projectImages/lighthouse/4.png'), width: 750, height: 1334},
    {image: require('../../assets/images/projectImages/lighthouse/5.png'), width: 750, height: 1334},
    {image: require('../../assets/images/projectImages/lighthouse/6.png'), width: 750, height: 1334},
    {image: require('../../assets/images/projectImages/lighthouse/7.png'), width: 750, height: 1334},
  ],
  nykaa: [
    {image: require('../../assets/images/projectImages/nykaa/1.png'), width: 1920, height: 900, ratioWidth: 3, ratioHeight: 1},
    {image: require('../../assets/images/projectImages/nykaa/2.png'), width: 438, height: 772},
    {image: require('../../assets/images/projectImages/nykaa/3.png'), width: 436, height: 775},
    {image: require('../../assets/images/projectImages/nykaa/5.png'), width: 441, height: 772},
    {image: require('../../assets/images/projectImages/nykaa/4.png'), width: 1920, height: 901, ratioWidth: 3, ratioHeight: 1},
  ],
  vc_music_player: [
    {image: require('../../assets/images/projectImages/vc_music_player/1.png'), width: 1024, height: 500},
    {image: require('../../assets/images/projectImages/vc_music_player/2.png'), width: 894, height: 803},
    {image: require('../../assets/images/projectImages/vc_music_player/3.png'), width: 894, height: 793},
    {image: require('../../assets/images/projectImages/vc_music_player/5.png'), width: 1200, height: 770},
    {image: require('../../assets/images/projectImages/vc_music_player/4.png'), width: 770, height: 1200},
    {image: require('../../assets/images/projectImages/vc_music_player/9-1.png'), width: 770, height: 1200},
    {image: require('../../assets/images/projectImages/vc_music_player/6.png'), width: 770, height: 1200},
    {image: require('../../assets/images/projectImages/vc_music_player/7.png'), width: 770, height: 1200},
    {image: require('../../assets/images/projectImages/vc_music_player/8.png'), width: 770, height: 1200},
    {image: require('../../assets/images/projectImages/vc_music_player/9-2.png'), width: 770, height: 1200},
  ],
}
