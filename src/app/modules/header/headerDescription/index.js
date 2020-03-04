import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition, config } from "react-spring/renderprops";
import Div from 'Common/components/div';
import styles from './header_description.module.scss';
import iconEmail from 'Icons/icon-email.png';
import iconLinkedIn from 'Icons/icon-linkedin.png';
import iconGithub from 'Icons/icon-github.png';

class HeaderDescription extends Component {
  render() {
    const { showDescription, onClickProject, onClickTimeline, isFirstTime } = this.props;

    return (
      <Transition
        items={showDescription}
        from={{
          opacity: 0,
          marginTop: "0px"
        }}
        enter={{
          opacity: 1,
          marginTop: "-100px"
        }}
        leave={{
          opacity: 0
        }}
        config={isFirstTime ? {delay: 600}: config.default}
      >
        {showDescription =>
          showDescription &&
          (props => (
            <Div
              style={props}
              className={styles.user_description_container}
            >
              <div className={styles.user_description}>
                Hi, <br />I am <b className={styles.name}>Riyaz Ahmed</b>, and here is a bit about my self just typing out random description to make it a bit longer.
              </div>

              <Div row justify align className={styles.user_button_container}>
                You can checkout my
                <Div align className={styles.user_button} onClick={onClickTimeline}>
                  Timeline
                  <div className={styles.underline}></div>
                </Div> 
                and
                <Div align className={styles.user_button} onClick={onClickProject}>
                  Technologies
                  <div className={styles.underline}></div>
                </Div>
                that i worked on.
              </Div>

              <Div row justify align className={styles.social_container}>
                <img src={iconGithub} className={styles.icon} />
                <img src={iconLinkedIn} className={styles.icon}/>
                <img src={iconEmail} className={styles.icon}/>
              </Div>
            </Div>
          ))
        }
      </Transition>
    );
  }
}

export default HeaderDescription;
