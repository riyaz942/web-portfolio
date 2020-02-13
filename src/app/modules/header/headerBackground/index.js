import React, { Component } from 'react';
import styles from './header_background.module.scss';
import Transition from 'react-spring/renderprops';
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
// const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

const HeaderBackground = ({ showBackground }) => {
  const [animationProps, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));

  return (
    <Transition
      items={showBackground}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {
        value => value && (props => (
          <div 
            style={{ ...props}} 
            className={styles.background_gradient}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
          >
            <animated.div className={styles.background_fixed_layer} style={{transform: animationProps.xy.interpolate(trans1), backgroundImage: `url(${backgroundDarkDoodle})`}}>
            </animated.div>
            <animated.div className={styles.background_first_layer} style={{transform: animationProps.xy.interpolate(trans2), backgroundImage: `url(${backgroundDarkDoodle})`}}>
            </animated.div>
            <animated.div className={styles.background_second_layer} style={{transform: animationProps.xy.interpolate(trans3), backgroundImage: `url(${backgroundDarkDoodle})`}}>
            </animated.div>

          </div>
        ))
      }
    </Transition>
  );
}

export default HeaderBackground;
