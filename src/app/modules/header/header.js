import React, { memo } from "react";
import styles from "./header.module.scss";
import BackgroundAnimator from "./backgroundAnimator";
import { useTransition, animated, config } from 'react-spring';

const Header = ({ isFullScreen, showDescription, clientX, clientY, isFirstTime }) => {
  const containerTransition = useTransition(isFullScreen, null, {
    from: {
      opacity: isFirstTime? 1 : 0,
      transform: isFirstTime ? 'scaleY(1)': 'scaleY(0.07)',
      background: isFirstTime ? '#33333300' : '#333333',
    },
    enter: {
      opacity: 1,
      transform: 'scaleY(1)',
      background: '#333333',
    },
    leave: {
      opacity: 0,
      transform: 'scaleY(0.07)',
      background: '#333333',
    },
    config: isFullScreen ? config.default: config.slow
  });

  const backgroundAnimatorTransition = useTransition(showDescription, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    containerTransition.map(({ item: containerItem, props: transitionProps }) => (
      containerItem && (
        <animated.div
          key='header-container'
          style={transitionProps}
          className={styles.header_container}
        >
          {
            backgroundAnimatorTransition.map(({ item: backgroundItem, props: backgroundProps }) => (
              backgroundItem && (
                <animated.div
                  key='background'
                  style={backgroundProps}
                  className={styles.header_background_container}
                >
                  <BackgroundAnimator clientX={clientX} clientY={clientY} />
                </animated.div>
              )
            ))
          }
        </animated.div>
      )
    ))
  );
}

export default memo(Header);
