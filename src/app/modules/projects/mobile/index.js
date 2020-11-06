import React, { Component } from "react";
import Div from "Common/components/div";
import { landingPageBody } from "Constants/landingConstants";
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
import techDoodleImage from "Images/background/tech-doodle-background-image.png";
import { detectSwipe } from 'Common/utils/swipeGesture';
import { random, parseNewLine } from "Common/utils";
import { getImagePosition, getBackgroundTransition } from '../projectsHelper';

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
    this.containerRef = React.createRef();

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

    detectSwipe(this.containerRef.current, (direction) => {
      const { updateBodyType } = this.props;
      const { selectedProjectId } = this.state;
      const index = techList.findIndex((element) => element.id === selectedProjectId);

      if (direction == 'l') {
        if (index < techList.length - 1) {
          this.onProjectSelected({ selectedId: techList[index + 1].id })
        } else {
          this.onProjectSelected({ selectedId: techList[0].id })
        }
      } else if (direction == 'r') {
        if (index != 0) {
          this.onProjectSelected({ selectedId: techList[index - 1].id })
        } else {
          updateBodyType(landingPageBody.TIMELINE);
        }
      }
    });
  }

  onSwiperMount = (swiper) => {
    this.swiper = swiper;
    swiper.el.addEventListener('touchstart', e => e.stopPropagation(), false);
  }

  getProjects = selectedId => {
    const tech = find(techList, techItem => {
      return techItem.id === selectedId;
    });

    return tech.projects.map(project => ({
      ...projectsListValue[project],
      slug: project
    }));
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
      <Div passRef={this.containerRef} fillParent className={styles.timeline_container}>
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
          {tech => tech.id == 'android' && (
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
            selectedId={selectedProjectId}
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
              getSwiper={this.onSwiperMount}
            >
              {map(projectsList, (project, index) => (
                <Div
                  key={index}
                  align
                  justify
                >
                  <ProjectListItem
                    key={index}
                    project={project}
                    className={`${index == currentSlide ? styles.project_list_item__selected : ''} ${styles.project_list_item}`}
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

export default withRouter(ProjectsMobile);