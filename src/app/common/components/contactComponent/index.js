import React, { Component } from "react";
import iconEmail from "Icons/icon-email.png";
import iconLinkedIn from "Icons/icon-linkedin.png";
import iconGithub from "Icons/icon-github.png";
import iconEmailWhite from "Icons/icon-email-white.png";
import iconLinkedInWhite from "Icons/icon-linkedin-white.png";
import iconGithubWhite from "Icons/icon-github-white.png";
import Div from "Common/components/div";
import styles from "./contact_component.module.scss";

const ContactComponent = ({ className, isWhite }) => {
  return (
    <Div
      row
      justify
      align
      className={`${styles.social_container} ${className}`}
    >
      <img
        src={isWhite ? iconGithubWhite : iconGithub}
        className={styles.icon}
      />
      <img
        src={isWhite ? iconLinkedInWhite : iconLinkedIn}
        className={styles.icon}
      />
      <img src={isWhite ? iconEmailWhite : iconEmail} className={styles.icon} />
    </Div>
  );
};

export default ContactComponent;
