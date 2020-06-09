import React, {
  useCallback,
  useEffect,
  useState,
  Fragment,
  useRef
} from "react";
import Div from "Common/components/div";
import styles from "./project_details_page.module.scss";
import map from "lodash/map";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSpring, animated } from "react-spring";
import { clearProjectPosition } from "Redux/actions/projectActions";
// import lighthouseProjectIcon from 'Icons/project-icon-lighthouse.png';
import { projectsListValue } from "Constants/projectsConstants";
import ProjectDescription from "./projectDescription";
import isEmpty from "lodash/isEmpty";
import ElementTransition from './elementTransition';
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
  history
}) => {
  const projectId = match && match.params ? match.params.projectSlug : "";

  const [project] = useState(projectsListValue[projectId] || {});
  const { imgPosition } = projectReducer;

  //-------------------------------------------ScrollAnimation
  const imageWidth = 150;
  const imageRef = useRef(null);
  const [{ st }, set] = useSpring(() => ({ st: 0 }));
  const imgTopAnim = st.interpolate(o => (70 - o / 2 > 0 ? 70 - o / 2 : 0));
  const imgWidthAnim = st.interpolate(o =>
    imageWidth - o / 1.5 > 48 ? imageWidth - o / 1.5 : 48
  );
  const imgLeftAnim = st.interpolate(
    o =>
      `calc(${50 - o / 1.5 / 3 > 0 ? 50 - o / 1.5 / 3 : 0}% - ${
        imageWidth / 2 - o / 1.5 > 0 ? imageWidth / 2 - o / 1.5 : 0
      }px)`
  );

  const titleTopAnim = st.interpolate(
    o => (220 - o / 1.1 > 0 ? 220 - o / 1.1 : 0) + 14
  );
  const titleLeftAnim = st.interpolate(o => (o / 2.5 < 60 ? o / 2.5 : 60));
  const titleSizeAnim = st.interpolate(o =>
    36 - o / 10 > 18 ? 36 - o / 10 : 18
  );

  const subDetailsTop = st.interpolate(o =>
    220 - o / 1.1 > 0 ? 220 - o / 1.1 : 0
  );
  const subDetailsAlpha = st.interpolate(o =>
    1 - o / 150 > 0 ? 1 - o / 150 : 0
  );
  const onScroll = useCallback(e => set({ st: e.target.scrollTop }), []);
  //-------------------------------------------End

  const [hideTransitionElement, setHideTransitionElement] = useState(false);
  const [componentReady, setComponentReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [animateImageTo, setAnimateImageTo] = useState({
    height: 0,
    width: 0,
    transform: "translate(0px, 0px)"
  });

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
    setAnimateImageTo({
      height: currentRect.height,
      width: currentRect.width,
      transform: `translate(${currentRect.left}px, ${currentRect.top}px)`
    });
    setComponentReady(true);

    return () => clearProjectPosition();
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
        <Div animate className={styles.right_container}>
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

          <animated.img
            ref={imageRef}
            className={styles.project_image}
            src={project.icon}
            style={{
              width: imgWidthAnim,
              height: imgWidthAnim,
              left: imgLeftAnim,
              top: imgTopAnim,
              opacity: isEmpty(imgPosition)
                ? containerOpacityAnimation.opacity
                : showContent
                ? 1
                : 0
            }}
          />

          <animated.div
            className={styles.project_name}
            style={{
              fontSize: titleSizeAnim,
              left: titleLeftAnim,
              top: titleTopAnim,
              opacity: containerOpacityAnimation.opacity
            }}
          >
            {project.name}
          </animated.div>

          <Div
            animate
            align="end"
            style={{
              top: subDetailsTop,
              opacity: showContent
                ? subDetailsAlpha
                : containerOpacityAnimation.opacity
            }}
            className={styles.project_sub_details_container}
          >
            <div className={styles.title}>Platform</div>
            <div className={styles.value}>{project.tech.join(" | ")}</div>

            <div className={`${styles.title} ${styles.project_involvement}`}>
              Project Involment
            </div>
            <div className={styles.value}>{project.involvement}</div>
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
          </animated.div>
        </Div>
      ) : null}

      {componentReady && !isEmpty(project) && (
        <ElementTransition 
          project={project}        
          animateImageTo={animateImageTo}
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
    clearProjectPosition: bindActionCreators(clearProjectPosition, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withRouter(ProjectDetailsPage));
