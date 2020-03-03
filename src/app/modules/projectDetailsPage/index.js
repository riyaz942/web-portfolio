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
import { clearTimelinePosition } from "Redux/actions/timelineActions";
// import lighthouseProjectIcon from 'Icons/project-icon-lighthouse.png';
import { projectsListValue } from "Constants/projectsConstants";
import ProjectDescription from "./projectDescription";
import PaginationButton from "Common/components/paginationButton";
import isEmpty from 'lodash/isEmpty';

const ProjectDetailsPage = ({ match, timelineReducer, style }) => {
  const [project] = useState((match && match.params)? projectsListValue[match.params.projectSlug] : {});
  const { position } = timelineReducer;

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
  const [animateTo, setAnimateTo] = useState({
    height: 0,
    width: 0,
    transform: "translate(0px, 0px)"
  });

  const containerOpacityAnimation = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    delay: 450
  });

  const imageTransitionAnimation = useSpring({
    to: animateTo,
    from: {
      height: position.height,
      width: position.width,
      transform: `translate(${position.left}px, ${position.top}px)`
    }
  });

  const backgroundTransitionAnimation = useSpring({
    to: {
      height: "calc(100vh + 0px)",
      width: "calc(100vw + 0px)",
      transform: "translate(0px, 0px)",
      borderRadius: 0
    },
    from: {
      height: `calc(0vh + ${position.height}px)`,
      width: `calc(0vw + ${position.width}px)`,
      transform: `translate(${position.left}px, ${position.top}px)`,
      borderRadius: 50
    }
  });

  useEffect(() => {
    const currentRect = imageRef.current.getBoundingClientRect();
    setAnimateTo({
      height: currentRect.height,
      width: currentRect.width,
      transform: `translate(${currentRect.left}px, ${currentRect.top}px)`
    });
    setComponentReady(true);
    setTimeout(() => setHideTransitionElement(true), 700);
  }, []);

  return (
    <Div row className={styles.project_details_container} style={style}>
      {!isEmpty(project) ? (
        <Fragment>
          <Div
            animate
            justify
            className={styles.left_container}
            style={containerOpacityAnimation}
          >
            <Div
              row
              justify="space_between"
              className={styles.pagination_container}
            >
              <PaginationButton />
              <PaginationButton isRight />
            </Div>
          </Div>
          <Div
            animate
            className={styles.right_container}
            style={containerOpacityAnimation}
          >
            <Div row justify="end" align className={styles.link_container}>
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
                top: imgTopAnim
              }}
            />
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
                opacity: subDetailsAlpha
              }}
              className={styles.project_sub_details_container}
            >
              <div className={styles.title}>Platform</div>
              <div className={styles.value}>{project.tech.join(" | ")}</div>

              <div className={`${styles.title} ${styles.project_involvement}`}>
                Project Involment
              </div>
              <div className={styles.value}>Major</div>
            </Div>

            <Div className={styles.content_container} onScroll={onScroll}>
              <ProjectDescription
                className={styles.content}
                description={project.description}
              />
            </Div>
          </Div>
        </Fragment>
      ) : null}

      {(componentReady && !isEmpty(project)) && (
        <Fragment>
          <animated.div
            style={{
              ...backgroundTransitionAnimation,
              position: "absolute",
              background: "white",
              zIndex: -3
            }}
          />

          {!hideTransitionElement && (
            <animated.img
              src={project.icon}
              style={{
                ...imageTransitionAnimation,
                objectFit: "contain",
                position: "absolute",
                zIndex: 2
              }}
            />
          )}
        </Fragment>
      )}
    </Div>
  );
};

const mapStateToProps = state => {
  return {
    timelineReducer: state.timelineReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    clearTimelinePosition: bindActionCreators(clearTimelinePosition, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withRouter(ProjectDetailsPage));
