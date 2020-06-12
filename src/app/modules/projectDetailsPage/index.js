import React, { useCallback, useEffect, useState, useRef } from "react";
import Div from "Common/components/div";
import styles from "./project_details_page.module.scss";
import map from "lodash/map";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSpring, animated } from "react-spring";
import {
  clearProjectPosition,
  setProjectDestination
} from "Redux/actions/projectActions";
// import lighthouseProjectIcon from 'Icons/project-icon-lighthouse.png';
import { projectsListValue } from "Constants/projectsConstants";
import isEmpty from "lodash/isEmpty";
import ProjectViewPager from "./projectViewPager";
import ProjectDescription from "./projectDescription";
import ElementTransition from "./elementTransition";
import ElementScroll from "./elementScroll";
import ProjectImageGrid from "./projectImageGrid";
import backIcon from "Icons/icon-left-arrow-dark.png";
import closeIcon from 'Icons/icon-cross.png';

const onClickClose = (history, position) => {
  if (position) history.goBack();
  else history.replace("/");
};

const ProjectDetailsPage = ({
  match,
  projectReducer,
  style,
  clearProjectPosition,
  setProjectDestination,
  history
}) => {
  const projectId = match && match.params ? match.params.projectSlug : "";
  const [project] = useState(projectsListValue[projectId] || {});
  const [headerShadow, setHeaderShadow] = useState(false);
  const [showViewPagerModal, toggleViewPager] = useState(false);
  const [gridIndex, setGridIndex] = useState(0);

  const { imgPosition } = projectReducer;
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
    from: { opacity: !isEmpty(imgPosition) ? 0 : 1 },
    opacity: 1,
    delay: !isEmpty(imgPosition) ? 500 : 0,
    onStart: () => {
      if (componentReady) {
        setShowContent(true);
        setHideTransitionElement(true);
      }
    }
  });

  // On Component Mount
  useEffect(() => {
    const currentRect = imageRef.current.getBoundingClientRect();
    setProjectDestination(currentRect);
    setComponentReady(true);

    return () => {
      clearProjectPosition();
    };
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
            onClick={() => onClickClose(history, imgPosition)}
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
              imgPosition={imgPosition}
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
        />
      )}
    </Div>
  );
};

const mapStateToProps = state => {
  return {
    projectReducer: state.projectReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    clearProjectPosition: bindActionCreators(clearProjectPosition, dispatch),
    setProjectDestination: bindActionCreators(setProjectDestination, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withRouter(ProjectDetailsPage));
