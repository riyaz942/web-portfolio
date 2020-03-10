import React, { Component } from "react";
import iconEmail from "Icons/icon-email.png";
import iconLinkedIn from "Icons/icon-linkedin.png";
import iconGithub from "Icons/icon-github.png";
import Div from 'Common/components/div';
import styles from './contact_component.module.scss';

const ContactComponent = ({className}) => {
  return (
    <Div row justify align className={`${styles.social_container} ${className}`}>
      <img src={iconGithub} className={styles.icon} />
      <img src={iconLinkedIn} className={styles.icon} />
      <img src={iconEmail} className={styles.icon} />
    </Div>
  );
};

export default ContactComponent;
