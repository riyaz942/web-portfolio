
export const getImagesFromContext = images => {
  const extractedImages = [];
  images.keys().forEach(key => {
    extractedImages.push(images(key));
  });

  return extractedImages;
};

export const preloadImage = (src, onLoadCallback) => {
  const image = new Image();
  image.src = src;
  image.onload = onLoadCallback;
  image.onerror = onLoadCallback;

  return image;
};
