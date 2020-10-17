import React from "react";
import Div from "Common/components/div";
import reactBackgroundImage from "Images/technology/react-background-image.png";
import reactNativeBackgroundImage from "Images/technology/react-native-background-image.png";
import androidBackgroundImage from "Images/technology/android-background-image.png";
import laravelBackgroundImage from "Images/technology/laravel-background-image.png";
import electronBackgroundImage from "Images/technology/electron-background-image.png";
import styles from "./listing_page.module.scss";

const ListingPage = ({ onItemSelected }) => {
  const images = [
    reactBackgroundImage,
    reactNativeBackgroundImage,
    androidBackgroundImage,
    laravelBackgroundImage,
    electronBackgroundImage
  ];

  return (
    <Div column fillParent align className={styles.page_container}>
      <h1 className={styles.page_title}>Page Transition Example</h1>
      <h3> Click on any one of the below items </h3>
      <Div fillParent row align justify="space_evenly" className={styles.page_container}>
      {images.map((image, index) => (
        // Adds different color class to different items
        <Div
          align
          justify
          onClick={(event)=> onItemSelected(event, {image, index})}
          className={`${styles.image_container} ${styles[`color_${index+1}`]}`}
        >
          <img
            className={styles.tech_image}
            src={image}
          />
        </Div>
      ))}
    </Div>
    </Div>
  );
};

export default ListingPage;
