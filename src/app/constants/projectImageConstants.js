const projectImages = {
  snapteam: require.context(`../../assets/images/projectImages/snapteam`, false, /.*\.png$/),
  pulse:  require.context(`../../assets/images/projectImages/pulse`, false, /.*\.png$/),
  measure:  require.context(`../../assets/images/projectImages/measure`, false, /.*\.png$/),
  wakency:  require.context(`../../assets/images/projectImages/wakency`, false, /.*\.png$/),
  benefactory:  require.context(`../../assets/images/projectImages/benefactory`, false, /.*\.png$/),
  lighthouse:  require.context(`../../assets/images/projectImages/lighthouse`, false, /.*\.png$/),
  nykaa:  require.context(`../../assets/images/projectImages/nykaa`, false, /.*\.png$/),
  vc_music_player:  require.context(`../../assets/images/projectImages/vc_music_player`, false, /.*\.png$/),
}


export const getProjectImages = (id) => {
  if (!id)
    return [];

  const images = projectImages[id];
  const extractedImages = [];
  
  images.keys().forEach((key) => {
    extractedImages.push(images(key));
  });
  return extractedImages;
}