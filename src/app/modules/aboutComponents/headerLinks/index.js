import React, { Component, memo } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import styles from './header_links.module.scss';
import { landingPageBody } from "Constants/landingConstants";
import ContactComponent from 'Common/components/contactComponent';
import Div from 'Common/components/div';

const HeaderLinks = ({ isFullScreen, bodyType, onClickTimeline, onClickProject }) => {
  const transition = useTransition(isFullScreen, null, {
    from: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    leave: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    // config: { delay: isFullScreen ? 600 : 0 }
  });
  const springProps = useSpring({
    transformUnderline: bodyType == landingPageBody.TIMELINE ? 'translateX(0px)' : 'translateX(77px)',
    underlineWidth: bodyType == landingPageBody.TIMELINE ? 62 : 37
  });

  return (
    transition.map(({ item, props: transitionProps }) => (
      !item && (
        <Div
          animate
          row
          align
          justify="space_between"
          style={transitionProps}
          className={styles.header_container}
        >
          <ContactComponent
            isWhite
          />

          <Div className={`${styles.header_link_container}`}>
            <Div row className={styles.bodytype_container}>
              <div
                className={styles.header_link_button}
                onClick={onClickTimeline}
              >
                Timeline
              </div>
              <div
                className={styles.header_link_button}
                onClick={onClickProject}
              >
                Tech
              </div>
            </Div>
            <animated.div
              style={{
                transform: springProps.transformUnderline,
                width: springProps.underlineWidth
              }}
              className={styles.underline}
            ></animated.div>
          </Div>
        </Div>
      )
    ))
  )
}

export default memo(HeaderLinks);
