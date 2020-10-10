import React, { useState, useRef } from "react";
import styles from "./project_image_grid.module.scss";
import Div from "Common/components/div";
import { getProjectImages, imageSpecificRatio } from "Constants/projectImageConstants";
import map from "lodash/map";

const ProjectImageGrid = ({ projectId, gridItemSelected }) => {
  const loadedProjectImages = useRef([]);
  const [showLoadedImage, setShowLoadedImage] = useState(false);
  const projectImages = getProjectImages(projectId); 

  // Loads the images the gets the natural height/width of the images
  // parses them then adds to the loadedProjectImages
  const onImageLoad = (image, projectImage) => {
    if (showLoadedImage) return;

    const { target } = image;
    loadedProjectImages.current = [
      ...loadedProjectImages.current,
      getImageRatio({
        ...projectImage,
        width: target.naturalWidth,
        height: target.naturalHeight,
        projectId,
      })
    ];

    // after all the images has been loaded sorts the loaded image according to the index
    if (loadedProjectImages.current.length == projectImages.length) {
      loadedProjectImages.current = loadedProjectImages.current.sort((currentImage, nextImage) => {
        if (currentImage.index > nextImage.index)
          return 1;
        else if (currentImage.index < nextImage.index)
          return -1;

        return 0;
      })

      // then enables flag to show the loaded images
      setShowLoadedImage(true);
    }
  };

  // first loads normal images to get height/width after all the images has been loaded then switches to loadedImages
  const visibleProjectImages = showLoadedImage ? loadedProjectImages.current : projectImages;

  return (
    <Div row className={styles.content}>
      {map(visibleProjectImages, (projectImage, index) => {
        return (
          <div
            key={index}
            onClick={() => gridItemSelected(index)}
            className={[
              styles.image_container,
              styles[`grid_column_${projectImage.ratioWidth}`],
              styles[`grid_row_${projectImage.ratioHeight}`]
            ].join(" ")}
          >
            <img
              src={projectImage.image}
              onLoad={(image)=> onImageLoad(image, projectImage)}
              className={styles.image}
            />
          </div>
        );
      })}
    </Div>
  );
};

// Function to calculate the image ratio and decide the grid size of the image
const getImageRatio = projectImage => {
  
  const specificProjectImages  = imageSpecificRatio[projectImage.projectId];

  // If project image ratio is already specified then return from the array instead of calculating
  if (specificProjectImages) {
    const specificProjectImage = specificProjectImages.find(image => (image.id == projectImage.id));
    if (specificProjectImage) {
      return {
        ...projectImage,
        ratioWidth: specificProjectImage.ratioWidth,
        ratioHeight: specificProjectImage.ratioHeight
      }
    }
  }

  const height = projectImage.height;
  const width = projectImage.width;

  const percentage = Math.floor(
    (Math.min(height, width) / Math.max(height, width)) * 100
  );

  if (percentage > 40 && percentage < 70) {
    //2 : 1
    return {
      ...projectImage,
      ratioWidth: width > height ? 2 : 1,
      ratioHeight: height > width ? 2 : 1
    };
  } else if (percentage < 40) {
    // 3 : 1
    return {
      ...projectImage,
      ratioWidth: width > height ? 3 : 1,
      ratioHeight: height > width ? 3 : 1
    };
  }

  return { ...projectImage, ratioWidth: 1, ratioHeight: 1 };
};

export default ProjectImageGrid;
