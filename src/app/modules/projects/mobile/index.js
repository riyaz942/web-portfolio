import React, { Component } from "react";
import Div from "Common/components/div";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TimelineSelector from "Common/containers/timelineSelector";
import { techList } from "Constants/techConstants";
import { projectsListValue } from "Constants/projectsConstants";
import { Transition, Spring } from "react-spring/renderprops";
import { withRouter } from "react-router";
import Swiper from "react-id-swiper";
import find from "lodash/find";
import map from "lodash/map";
import styles from "./projects_mobile.module.scss";
import ProjectListItem from 'Common/components/projectListItem';
import PaginationButton from "Common/components/paginationButton";
import { setProjectPosition } from "Redux/actions/projectActions";
import techDoodleImage from "Images/tech-doodle-background-image.png";
import { random, parseNewLine, getImagePosition, getBackgroundTransition } from "Common/utils";

class ProjectsMobile extends Component {
  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
    const selectedProjectId = 'react';
    const imageAlignment = random(0, 3);
    const imagePosition = getImagePosition(selectedProjectId, imageAlignment, true);
    const backgroundTransition = getBackgroundTransition(
      selectedProjectId,
      imageAlignment,
      this.isFirstAnimation
    );


    this.state = {
      selectedProjectId,
      currentSlide: 0,
      projectsList: [],
      techTransitionAnimation: {
        react: {
          ...backgroundTransition,
          imagePosition
        }
      }
    };
  }

  componentDidMount() {
    const { selectedProjectId } = this.state;
    this.isFirstAnimation = false;

    this.setState({
      projectsList: this.getProjects(selectedProjectId)
    });
  }

  getProjects = selectedId => {
    const tech = find(techList, techItem => {
      return techItem.id === selectedId;
    });

    return tech.projects.map(project => ({
      ...projectsListValue[project],
      slug: project,
      imgRef: React.createRef(),
      slideRef: React.createRef()
    }));
  };

  onClickProject = project => {
    const {
      setProjectPosition,
      history: { push }
    } = this.props;

    const imgRect = project.imgRef.current.getBoundingClientRect();
    const slideRect = project.slideRef.current.getBoundingClientRect();

    setProjectPosition({ img: imgRect, slide: slideRect });
    push(`/project/${project.slug}`);
  };


  onProjectSelected = ({ selectedId }) => {
    const { techTransitionAnimation } = this.state;
    const projectsList = this.getProjects(selectedId);
    const imageAlignment = random(0, 3);
    const imagePosition = getImagePosition(selectedId, imageAlignment, true);
    const backgroundTransition = getBackgroundTransition(
      selectedId,
      imageAlignment,
      this.isFirstAnimation,
    );

    this.setState({
      selectedProjectId: selectedId,
      projectsList,
      currentSlide: 0,
      techTransitionAnimation: {
        ...techTransitionAnimation,
        [selectedId]: {
          ...backgroundTransition,
          imagePosition
        }
      }
    }, () => {
      this.swiper.slideTo(0);
    });
  };

  render() {
    const { selectedProjectId, projectsList, currentSlide, techTransitionAnimation } = this.state;
    const tech = find(techList, techItem => (techItem.id === selectedProjectId));
    const totalItems = projectsList ? projectsList.length : 0;

    const isPreviousButtonEnabled = currentSlide != 0;
    const isNextButtonEnabled = currentSlide < totalItems - 1;

    const params = {
      containerClass: "custom_container",
      slidesPerView: 2,
      centeredSlides: true,
      shouldSwiperUpdate: true,
      on: {
        slideChange: () =>
          this.setState({ currentSlide: this.swiper.realIndex })
      }
    };

    return (
      <Div fillParent className={styles.timeline_container}>
        {/* Background div image */}
        <Div
          className={styles.image_container}
          style={{
            backgroundImage: `url(${techDoodleImage})`,
            backgroundSize: 'contain'
          }}
        >
        </Div>
        <Transition
          items={tech}
          keys={tech => tech.id}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {tech => tech.id && (
            value => {
              const { imagePosition, from, enter, leave } = techTransitionAnimation[tech.id];
              const fromAnimation = tech.id == selectedProjectId ? from : enter;
              const toAnimation = tech.id == selectedProjectId ? enter : leave;
              const isReactRelated =
                tech.id == "react" ||
                tech.id == "react-native" ||
                tech.id == "electron";

              return (
                <Spring
                  from={{
                    opacity: isReactRelated ? fromAnimation.opacity : 1,
                    transform: fromAnimation.transform,
                  }}
                  to={{
                    opacity: isReactRelated ? toAnimation.opacity : 1,
                    transform: toAnimation.transform,
                  }}
                >
                  {
                    props => (
                      <Div
                        style={{
                          opacity: isReactRelated ? props.opacity : 1,
                          transform: !isReactRelated ? props.transform : "unset"
                        }}
                        className={styles.background_image_container}
                      >
                        <img
                          src={tech.backgroundImage}
                          style={{
                            left: imagePosition.left,
                            right: imagePosition.right,
                            top: imagePosition.top,
                            bottom: imagePosition.bottom,
                            opacity: tech.id == 'android' ? 0.8 : 0.4,
                            transform: tech.id == 'android' ? imagePosition.transform : props.transform
                          }}
                          className={styles.background_image}
                        ></img>
                      </Div>
                    )
                  }
                </Spring>
              )
            }
          )}
        </Transition>

        <Div fillParent className={styles.content_container}>
          <TimelineSelector
            listValue={techList}
            tech
            onItemSelected={this.onProjectSelected}
            className={styles.timeline_selector_container}
          />
          <Div align justify className={styles.details_top_container}>
            <Transition
              items={tech}
              keys={tech => tech.id}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {tech => props => (
                <Div
                  align="center"
                  alignSelf="center"
                  style={{ opacity: props.opacity }}
                  className={styles.details_container}
                >
                  <div className={styles.title}>{tech.name}</div>
                  <div className={styles.description}>{parseNewLine(tech.description)}</div>
                </Div>
              )}
            </Transition>
          </Div>
          <Div fillParent className={styles.view_pager_container}>
            <Swiper
              {...params}
              getSwiper={swiper => {
                this.swiper = swiper;
              }}
            >
              {map(projectsList, (project, index) => (
                <Div align justify>
                  <ProjectListItem
                    key={index}
                    slide={project}
                    className={`${index == currentSlide ? styles.project_list_item__selected : ''} ${styles.project_list_item}`}
                    onClickProject={this.onClickProject}
                  />
                </Div>
              ))}
            </Swiper>
          </Div>
          <Div alignSelf="center" row className={styles.pagination_button_container}>
            <PaginationButton
              isEnabled={isPreviousButtonEnabled}
              className={styles.left_button}
              onClick={() => this.swiper.slidePrev()}
            />
            <PaginationButton
              isEnabled={isNextButtonEnabled}
              isRight
              onClick={() => this.swiper.slideNext()}
            />
          </Div>
        </Div>
      </Div>
    );
  }
}

const mapDispathToProps = dispatch => {
  return {
    setProjectPosition: bindActionCreators(setProjectPosition, dispatch)
  };
};

export default connect(
  null,
  mapDispathToProps
)(withRouter(ProjectsMobile));