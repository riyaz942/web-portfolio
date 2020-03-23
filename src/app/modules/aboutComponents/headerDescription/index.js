import React, { Component, memo } from "react";
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
          transform: 'translate(calc(50vw - 265px), calc(50vh - 0px))'
        }}
        enter={{
          opacity: 1,
          transform: 'translate(calc(50vw - 265px), calc(50vh - 145px))'
        }}
        leave={{
          opacity: 0
        }}
        config={isFirstTime ? { delay: 300 } : config.default}
      >
        {showDescription =>
          showDescription &&
          (props => (
            <Div
              style={props}
              className={styles.user_description_container}
            >
              <div className={styles.user_description}>
                Hi, <br />I am <b className={styles.name}>Riyaz Ahmed</b>, A 25-year-old self-taught developer with 4+ years of software development experience on various platforms, Passionate to build polished, innovative and well-detailed apps with fluid animations to complement the design.
                {/* <br/><br/> In my spare time, I usually read or play video games but mostly i try to work on new ideas and learn. */}
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

export default memo(HeaderDescription);
