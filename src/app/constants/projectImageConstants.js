const projectImages = {
  snapteam: require.context(`../../assets/images/projectImages/snapteam`, false, /.*\.png$/),
  pulse: require.context(`../../assets/images/projectImages/pulse`, false, /.*\.png$/),
  measure: require.context(`../../assets/images/projectImages/measure`, false, /.*\.png$/),
  wakency: require.context(`../../assets/images/projectImages/wakency`, false, /.*\.png$/),
  benefactory: require.context(`../../assets/images/projectImages/benefactory`, false, /.*\.png$/),
  lighthouse: require.context(`../../assets/images/projectImages/lighthouse`, false, /.*\.png$/),
  nykaa: require.context(`../../assets/images/projectImages/nykaa`, false, /.*\.png$/),
  vc_music_player: require.context(`../../assets/images/projectImages/vc_music_player`, false, /.*\.png$/)
};

export const getProjectImages = id => {
  if (!id) return [];

  const images = projectImages[id];
  const extractedImages = [];

  images.keys().forEach((key, index) => {
    const image = images(key);
    // extracts filename with extension for id
    const id = key
      .substring(0, key.lastIndexOf("."))
      .substring(key.lastIndexOf("/") + 1);

    extractedImages.push({ image, id, index });
  });
  return extractedImages;
};

// used to explicitly specify a image ratio to be show in grid
export const imageSpecificRatio = {
  wakency: [{ id: "1", ratioWidth: 3, ratioHeight: 1 }],
  benefactory: [{ id: '1', ratioWidth: 2, ratioHeight: 1 }],
  nykaa: [
     {id: '1', ratioWidth: 3, ratioHeight: 1},
     {id: '5', ratioWidth: 3, ratioHeight: 1},
  ]
};
