import React, { Component, useCallback } from 'react';
import Div from 'Common/components/div';
import styles from './project_details_page.module.scss';
import map from 'lodash/map';
import { useSpring, animated } from 'react-spring';
import lighthouseProjectIcon from 'Icons/project-icon-lighthouse.png';


const ProjectDetailsPage = () => {

  //Full
  // image width: 150px;
  // description font-size: 34px;

  //Small
  //image width: 68px;
  //description font-size: 18px;


  const [{ st }, set] = useSpring(() => ({ st: 0 }));
  const imgTopAnim = st.interpolate(o => 70 - o/2 > 0 ? 70 - o/2 : 0);
  const imgWidthAnim = st.interpolate(o => 200 - o/1.5 > 68 ? 200 - o/1.5  : 68);

  const imgLeftAnim = st.interpolate(o => `calc(${50 - o / 1.5 / 3 > 0 ? 50 - o / 1.5 / 3 : 0}% - ${200 / 2 - o / 1.5 > 0 ? 200 / 2 - o / 1.5 : 0}px)`);

  const titleTopAnim = st.interpolate(o => (220 - o/1.1 > 0 ? 220 - o/1.1 : 0)+12);
  const titleLeftAnim = st.interpolate(o => 0 + o / 2.5 < 76 ? 0 + o / 2.5 : 76);
  const titleSizeAnim = st.interpolate(o => 36 - o / 10 > 18 ? 36 - o / 10 : 18);

  const subDetailsTop = st.interpolate(o => 220 - o/1.1 > 0 ? 220 - o/1.1 : 0);
  const subDetailsAlpha = st.interpolate(o => 1 - o / 150 > 0 ? 1 - o / 150 : 0);
  const onScroll = useCallback(e => set({ st: e.target.scrollTop }), [])

  return (
    <Div row className={styles.project_details_container}>
      <div className={styles.left_container}>Left Container</div>
      <Div className={styles.right_container}>

        <Div row justify="end">
          <div>Visit</div>
        </Div>


        <animated.img
          className={styles.project_image}
          src={lighthouseProjectIcon}
          style={{
            width: imgWidthAnim,
            left: imgLeftAnim,
            top: imgTopAnim
          }} />
        <animated.div
          className={styles.project_name}
          style={{
            fontSize: titleSizeAnim,
            left: titleLeftAnim,
            top: titleTopAnim
          }}
        >
          The Lighthouse Project
        </animated.div>

        <Div
          animate
          align="end"
          style={{
            top: subDetailsTop,
            opacity: subDetailsAlpha,
          }}
          className={styles.project_sub_details_container}>
          <div>Platform</div>
          <div>React-Native</div>
          <div>Project Involment</div>
          <div>Major</div>
        </Div>

        <Div className={styles.content_container} onScroll={onScroll}>
          <Div align="stretch" className={styles.content} >
            {
              map(Array(100), item => (<div>Platform</div>))
            }
          </Div>
        </Div>
      </Div>
      <div style={{
        position: 'absolute',
        width: 183,
        height: 311,
        background: 'black'
      }}></div>
    </Div>
  );
}


export default ProjectDetailsPage;
