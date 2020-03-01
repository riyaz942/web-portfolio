import React, { Component, useCallback } from 'react';
import Div from 'Common/components/div';
import styles from './project_details_page.module.scss';
import map from 'lodash/map';
import { useSpring, animated } from 'react-spring';
// import lighthouseProjectIcon from 'Icons/project-icon-lighthouse.png';
import { projectsListValue } from 'Constants/projectsConstants';
import ProjectDescription from './projectDescription';
import PaginationButton from 'Common/components/paginationButton';

const ProjectDetailsPage = ({ match: { params } }) => {
  const project = projectsListValue[params.projectSlug];
  //Full
  // image width: 150px;
  // description font-size: 34px;

  //Small
  // image width: 68px;
  // description font-size: 18px;

  const imageWidth = 150;
  const [{ st }, set] = useSpring(() => ({ st: 0 }));
  const imgTopAnim = st.interpolate(o => 70 - o / 2 > 0 ? 70 - o / 2 : 0);
  const imgWidthAnim = st.interpolate(o => imageWidth - o / 1.5 > 48 ? imageWidth - o / 1.5 : 48);

  const imgLeftAnim = st.interpolate(o => `calc(${50 - o / 1.5 / 3 > 0 ? 50 - o / 1.5 / 3 : 0}% - ${imageWidth / 2 - o / 1.5 > 0 ? imageWidth / 2 - o / 1.5 : 0}px)`);

  const titleTopAnim = st.interpolate(o => (220 - o / 1.1 > 0 ? 220 - o / 1.1 : 0) + 14);
  const titleLeftAnim = st.interpolate(o => 0 + o / 2.5 < 60 ? 0 + o / 2.5 : 60);
  const titleSizeAnim = st.interpolate(o => 36 - o / 10 > 18 ? 36 - o / 10 : 18);

  const subDetailsTop = st.interpolate(o => 220 - o / 1.1 > 0 ? 220 - o / 1.1 : 0);
  const subDetailsAlpha = st.interpolate(o => 1 - o / 150 > 0 ? 1 - o / 150 : 0);
  const onScroll = useCallback(e => set({ st: e.target.scrollTop }), [])

  return (
    <Div row className={styles.project_details_container}>
      <Div justify className={styles.left_container}>
        <Div row justify="space_between" className={styles.pagination_container}>
          <PaginationButton />
          <PaginationButton isRight/>
        </Div>
      </Div>
      <Div className={styles.right_container}>

        <Div row justify="end" align className={styles.link_container}>
          {
            project.link ? (
              <a href={project.link.value} className={styles.project_link} target="_blank">{project.link.type}</a>
            ) : null
          }
        </Div>


        <animated.img
          className={styles.project_image}
          src={project.icon}
          style={{
            width: imgWidthAnim,
            height: imgWidthAnim,
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
          {project.name}
        </animated.div>

        <Div
          animate
          align="end"
          style={{
            top: subDetailsTop,
            opacity: subDetailsAlpha,
          }}
          className={styles.project_sub_details_container}>
          <div className={styles.title}>Platform</div>
          <div className={styles.value}>{project.tech.join(' | ')}</div>

          <div className={`${styles.title} ${styles.project_involvement}`}>Project Involment</div>
          <div className={styles.value}>Major</div>
        </Div>

        <Div className={styles.content_container} onScroll={onScroll}>
          <ProjectDescription className={styles.content} description={project.description} />
        </Div>

      </Div>
      {/* <div style={{
        position: 'absolute',
        width: 183,
        height: 311,
        background: 'black'
      }}></div> */}
    </Div>
  );
}


export default ProjectDetailsPage;
