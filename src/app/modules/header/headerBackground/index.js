import React, { Component, Fragment } from 'react';
import styles from './header_background.module.scss';
import { useSpring, animated, useTransition } from 'react-spring';
import backgroundDarkDoodleFixed from 'Images/background-dark-doodle-fixed-layer.png';
import backgroundDarkDoodleFirst from 'Images/background-dark-doodle-first-layer.png';
import backgroundDarkDoodleSecond from 'Images/background-dark-doodle-second-layer.png';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 20}px,${y / 20}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 15}px,${y / 15}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

const HeaderBackground = ({ showBackground, clientX, clientY }) => {
  const animationProps = useSpring({ xy: calc(clientX, clientY), config: { mass: 10, tension: 550, friction: 140 } });
  const transitions = useTransition(showBackground, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  

  return transitions.map(({ item, key, props }) =>
    item && (
      <animated.div
        style={{...props, overflow: 'hidden'}}
        className={styles.background_gradient}
      >
        <animated.div className={styles.background_gradient} style={{ transform: animationProps.xy.interpolate(trans1), backgroundImage: `url(${backgroundDarkDoodleFixed})` }}>
        </animated.div>
        <animated.div className={styles.background_gradient} style={{ transform: animationProps.xy.interpolate(trans2), backgroundImage: `url(${backgroundDarkDoodleSecond})` }}>
        </animated.div>
        <animated.div className={styles.background_gradient} style={{ transform: animationProps.xy.interpolate(trans3), backgroundImage: `url(${backgroundDarkDoodleFirst})` }}>
        </animated.div>
    </animated.div>
    )
  )
}

export default HeaderBackground;
