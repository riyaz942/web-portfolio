import React, { Component } from "react";
import styles from "./project_image_grid.module.scss";
import Div from "Common/components/div";
import { getProjectImages } from "Constants/projectImageConstants";
import map from "lodash/map";

export default class ProjectImageGrid extends Component {
  getImageRatio = projectImages => {
    return map(projectImages, projectImage => {
      if (projectImage.ratioWidth || projectImage.ratioHeight) {
        return projectImage;
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
    });
  };

  render() {
    const { projectId } = this.props;
    const projectImages = this.getImageRatio(getProjectImages(projectId));

    return (
      <Div row className={styles.content}>
        {map(projectImages, (projectImage, index) => {
          return (
            <img
              key={index}
              className={[
                styles.image,
                styles[`grid_column_${projectImage.ratioWidth}`],
                styles[`grid_row_${projectImage.ratioHeight}`]
              ].join(" ")}
              src={projectImage.image}
            />
          );
        })}
      </Div>
    );
  }
}
