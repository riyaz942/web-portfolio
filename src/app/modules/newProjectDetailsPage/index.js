import React, { Component } from "react";
import styles from "./project_details_page.module.scss";
import Div from "Common/components/div";
import { getProjectImages } from "Constants/projectImageConstants";
import { imageRatio } from "Common/utils";
import map from "lodash/map";

export default class NewProjectDetailsPage extends Component {
  state = {
    result: [],
  }

  render() {
    const { match } = this.props;
    const projectId = match && match.params ? match.params.projectSlug : "";
    const projectImages = getProjectImages(projectId);
    const {result} = this.state;

    return (
      <Div align className={styles.container}>
        <Div row className={styles.content}>
          <p>
            {
              JSON.stringify(result, null, 0)
            }
          </p>
          {map(projectImages, (projectImage, index) => {
            // console.log(imageRatio());

            return (
              <img
                key={index}
                className={styles.image}
                src={projectImage.image}
              />
            );
          })}
        </Div>
      </Div>
    );
  }
}


// function getImageSize(imgSrc) {
//   var imgLoader = new Image(); // create a new image object

//  imgLoader.onload = function() { // assign onload handler
//      var height = imgLoader.height;
//      var width = imgLoader.width;
//      alert ('Image size: '+width+'x'+height);
//  }

//  imgLoader.src = imgSrc; // set the image source
// }


