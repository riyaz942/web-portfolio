import React from "react";
import styles from "./mobile_overlay.module.scss";
import Div from "Common/components/div";
import ContactComponent from "Common/components/contactComponent";
import resumeDarkImage from "Images/resume/Riyaz-resume-dark-min.jpg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MobileOverlay = () => {
  return (
    <Div className={styles.mobile_overlay_top_container}>
      <Div fillParent className={styles.content_container}>
        <div className={styles.message_container}>
          <div>
            Hi, Sorry the <span className={styles.hightlight_text}>Mobile Responsive</span> is still <span className={styles.hightlight_text}>Under Development</span> 🙈, Open this site
            on <span className={styles.hightlight_text}>Desktop</span> to get the full experience.
            <br />
            Till then you can checkout my Resume here or download from link.
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
