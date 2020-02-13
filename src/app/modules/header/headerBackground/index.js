import React, { Component, Fragment } from 'react';
import styles from './header_background.module.scss';
import { useSpring, animated, useTransition } from 'react-spring';
import backgroundDarkDoodleFixed from 'Images/background-dark-doodle-fixed-layer.png';
import backgroundDarkDoodleFirst from 'Images/background-dark-doodle-first-layer.png';
import backgroundDarkDoodleSecond from 'Images/background-dark-doodle-second-layer.png';
import { Transition, interpolate, Spring } from 'react-spring/renderprops';

class HeaderBackground extends Component {

  render() {
    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans1 = (x, y) => `translate3d(${x / 20}px,${y / 20}px,0)`;
    const trans2 = (x, y) => `translate3d(${x / 15}px,${y / 15}px,0)`;
    const trans3 = (x, y) => `translate3d(${x / 9}px,${y / 9}px,0)`;
    const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

    // const trans1 = (x, y) => `translate3d(${x / 20}px,${y / 20}px,0)`;
    // const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
    // const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
    // const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

    const { showBackground, clientX, clientY } = this.props;
    const clientXY = calc(clientX, clientY);
    // console.log(clientXY);

    return (
      <Transition
        items={showBackground}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {value => value && (props => (
          <animated.div
            style={{ ...props, overflow: 'hidden' }}
            className={styles.background_gradient}
          // onMouseMove={({ clientX: x, clientY: y }) => set({ xy:  calc(x, y)})}
          >

            <Spring
              native
              from={{ xy: [0, 0] }}
              to={{ xy: clientXY }}
            >
              {({ xy }) => {
                return (
                  <Fragment>
                    <animated.div className={styles.background_gradient} style={{ transform: xy.interpolate(trans1).getValue(), backgroundImage: `url(${backgroundDarkDoodleFixed})` }}>
                    </animated.div>
                    <animated.div className={styles.background_gradient} style={{ transform: xy.interpolate(trans2).getValue(), backgroundImage: `url(${backgroundDarkDoodleSecond})` }}>
                    </animated.div>
                    <animated.div className={styles.background_gradient} style={{ transform: xy.interpolate(trans3).getValue(), backgroundImage: `url(${backgroundDarkDoodleFirst})` }}>
                    </animated.div>
                  </Fragment>

                )
              }}
            </Spring>
          </animated.div>
        ))}


      </Transition>
    )
  }
}

// const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
// const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
// const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
// const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
// const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

// const HeaderBackground = ({ showBackground }) => {
//   const [animationProps, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
//   const transitions = useTransition(showBackground, null, {
//     from: { opacity: 0 },
//     enter: { opacity: 1 },
//     leave: { opacity: 0 },
//   });

//   return transitions.map(({ item, key, props }) =>
//     item && (
//       <animated.div
//         style={{...props, overflow: 'hidden'}}
//         className={styles.background_gradient}
//         onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
//       >
//         <animated.div className={styles.background_gradient} style={{ transform: animationProps.xy.interpolate(trans1), backgroundImage: `url(${backgroundDarkDoodleFirst})` }}>
//         </animated.div>
//         <animated.div className={styles.background_gradient} style={{ transform: animationProps.xy.interpolate(trans2), backgroundImage: `url(${backgroundDarkDoodleSecond})` }}>
//         </animated.div>
//         <animated.div className={styles.background_gradient} style={{ transform: animationProps.xy.interpolate(trans3), backgroundImage: `url(${backgroundDarkDoodleFixed})` }}>
//         </animated.div>
//     </animated.div>
//     )
//   )
// }

export default HeaderBackground;
