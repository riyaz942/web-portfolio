import React, { Component } from "react";
import { Transition, config } from "react-spring/renderprops";
import Div from 'Common/components/div';
import styles from './header_description.module.scss';
import ContactComponent from "Common/components/contactComponent";

class HeaderDescription extends Component {
  render() {
    const { showDescription, onClickProject, onClickTimeline, isFirstTime } = this.props;

    return (
      <Transition
        items={showDescription}
        from={{
          opacity: 0,
          transform: 'translateY(0px)'
        }}
        enter={{
          opacity: 1,
          transform: 'translateY(-100px)'
        }}
        leave={{
          opacity: 0
        }}
        config={isFirstTime ? { delay: 600 } : config.default}
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

              <ContactComponent
                className={styles.contact_container}
              />
            </Div>
          ))
        }
      </Transition>
    );
  }
}

export default HeaderDescription;
