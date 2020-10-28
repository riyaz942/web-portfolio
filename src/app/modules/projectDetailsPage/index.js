import React, { useCallback, useEffect, useState, useRef } from "react";
import Div from "Common/components/div";
import styles from "./project_details_page.module.scss";
import { useSpring, animated } from "react-spring";
import { projectsListValue } from "Constants/projectsConstants";
import isEmpty from "lodash/isEmpty";
import get from 'lodash/get';
import ProjectViewPager from "./projectViewPager";
import ProjectDescription from "./projectDescription";
import ElementTransition from "./elementTransition";
import ElementScroll from "./elementScroll";
import ProjectImageGrid from "./projectImageGrid";
import backIcon from "Icons/icon-left-arrow-dark.png";
import closeIcon from 'Icons/icon-cross.png';


const ProjectDetailsPage = ({ match, style, history, location}) => {
  const projectId = match && match.params ? match.params.projectSlug : "";
  const [project] = useState(projectsListValue[projectId] || {});
  const [headerShadow, setHeaderShadow] = useState(false);
  const [showViewPagerModal, toggleViewPager] = useState(false);
  const [destinationImageRect, setDestinationImageRect] = useState({});
  const [gridIndex, setGridIndex] = useState(0);

  const { imageRect, containerRect } = location && location.state ? location.state : {};
  const imageRef = useRef(null);

  //-------------------------------------------ScrollAnimation
  const [{ st }, set] = useSpring(() => ({ st: 0 }));
  let onScroll = useCallback(
    e => {
      // Shows/Hides header based on scroll position
      if (e.target.scrollTop > 260 && !headerShadow) {
        setHeaderShadow(true);
      } else if (e.target.scrollTop < 260 && headerShadow) {
        setHeaderShadow(false);
      }

      set({ st: e.target.scrollTop });
    },
    [headerShadow]
  ); //Update memoized callback when headerShadow state updates
  //-------------------------------------------End

  const [hideTransitionElement, setHideTransitionElement] = useState(false);
  const [componentReady, setComponentReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const containerOpacityAnimation = useSpring({
    from: { opacity: !isEmpty(imageRect) ? 0 : 1 },
    opacity: 1,
    delay: !isEmpty(imageRect) ? 500 : 0,
    onStart: () => {
      if (componentReady) {
        setShowContent(true);
        setHideTransitionElement(true);

        // Clears the image and container rect state
        window.history.replaceState(null, location.pathname);
      }
    }
  });

  // On Component Mount
  useEffect(() => {
    const destinationImageRect = imageRef.current.getBoundingClientRect();
    setDestinationImageRect(destinationImageRect);
    setComponentReady(true);
  }, []);

  return (
    <Div justify row className={styles.project_details_container} style={style}>
      {showViewPagerModal && (
        <Div className={styles.modal_view_pager}>
          <img 
            src={closeIcon} 
            onClick={()=>toggleViewPager(false)}
            className={styles.close_icon}
          />
          <ProjectViewPager
            projectId={projectId}
            initialSlide={gridIndex}
          />
        </Div>
      )}
      <Div
        justify
        align
        animate
        style={containerOpacityAnimation}
        className={`${styles.header_container} ${
          headerShadow ? styles.has_shadow : ""
        }`}
      >
        <Div row justify="space_between" className={styles.header_content}>
          <img
            src={backIcon}
            className={styles.cross_img}
            onClick={()=> {
              if (imageRect) history.goBack();
              else history.replace("/");
            }}
          />

          {project.link ? (
            <a
              href={project.link.value}
              className={styles.project_link}
              target="_blank"
            >
              {project.link.type}
            </a>
          ) : null}
        </Div>
      </Div>
      {!isEmpty(project) ? (
        <Div animate className={styles.container}>
          <Div className={styles.shadow_header}>
            <ElementScroll
              st={st}
              project={project}
              showContent={showContent}
              imageRef={imageRef}
              imgPosition={imageRect}
              containerOpacityAnimation={containerOpacityAnimation}
            />
          </Div>

          <animated.div
            className={styles.content_container}
            onScroll={onScroll}
            style={containerOpacityAnimation}
          >
            <ProjectDescription className={styles.content} project={project} />
            <ProjectImageGrid
              projectId={projectId}
              gridItemSelected={(index)=> {
                toggleViewPager(true);
                setGridIndex(index)
              }}
            />
          </animated.div>
        </Div>
      ) : null}

      {componentReady && !isEmpty(project) && (
        <ElementTransition
          project={project}
          hideTransitionElement={hideTransitionElement}
          sourceImage={imageRect}
          sourceContainer={containerRect}
          destinationImage={destinationImageRect}
        />
      )}
    </Div>
  );
};

export default ProjectDetailsPage;
