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
import ProjectDescription from "./projectDescription";
import isEmpty from "lodash/isEmpty";
import ElementTransition from "./elementTransition";
import ElementScroll from "./elementScroll";
import ProjectImageGrid from "./projectImageGrid";
import crossIcon from "Icons/icon-cross.png";

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
  const { imgPosition } = projectReducer;
  const imageRef = useRef(null);

  //-------------------------------------------ScrollAnimation
  const [{ st }, set] = useSpring(() => ({ st: 0 }));
  let onScroll = useCallback(e => set({ st: e.target.scrollTop }), []);
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
      {/*
        <img
            src={crossIcon}
            className={styles.cross_img}
            onClick={()=>onClickClose(history, imgPosition)}
           />
      */}
      {!isEmpty(project) ? (
        <Div animate className={styles.container}>
          <Div className={styles.header_container}>
            <Div
              animate
              row
              justify="end"
              align
              className={styles.link_container}
              style={containerOpacityAnimation}
            >
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
            <ProjectDescription
              className={styles.content}
              description={project.description}
            />
            <ProjectImageGrid projectId={projectId} />
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
