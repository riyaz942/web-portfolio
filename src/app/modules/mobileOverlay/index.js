import React from "react";
import styles from "./mobile_overlay.module.scss";
import Div from "Common/components/div";
import ContactComponent from "Common/components/contactComponent";
import resumeDarkImage from "Images/resume/resume-dark-compressed.jpg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MobileOverlay = () => {
  return (
    <Div className={styles.mobile_overlay_top_container}>
      <Div fillParent className={styles.content_container}>
        <div className={styles.message_container}>
          <div>
            The mobile responsive is still under development 🙈, Open this site
            on Desktop to get the full experience.
            <br />
            You can checkout my resume below or download from link.
          </div>
          <ContactComponent isWhite className={styles.contact_component} />
          <div className={styles.hint_text}>You can pinch and scroll</div>
        </div>
        <TransformWrapper
          positionX={0}
          positionY={0}
        >
          <TransformComponent>
            <img src={resumeDarkImage} className={styles.resume_image} />
          </TransformComponent>
        </TransformWrapper>
      </Div>
    </Div>
  );
};

export default MobileOverlay;
