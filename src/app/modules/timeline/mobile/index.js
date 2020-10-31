import React, { Component } from "react";
import Div from "Common/components/div";
import { landingPageBody } from "Constants/landingConstants";
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import { projectsListValue } from "Constants/projectsConstants";
import { Transition } from "react-spring/renderprops";
import { withRouter } from "react-router";
import Swiper from "react-id-swiper";
import find from "lodash/find";
import map from "lodash/map";
import styles from "./timeline_mobile.module.scss";
import ProjectListItem from 'Common/components/projectListItem';
import PaginationButton from "Common/components/paginationButton";
import { detectSwipe } from 'Common/utils/swipeGesture';

class TimelineMobile extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      selectedTimelineId: "nykaa",
      currentSlide: 0,
      projectsList: []
    }
  }

  componentDidMount() {
    const { selectedTimelineId } = this.state;

    this.setState({
      projectsList: this.getProjects(selectedTimelineId)
    });


    detectSwipe(this.containerRef.current, (direction) => {
      const { selectedTimelineId } = this.state;
      const { updateBodyType } = this.props;
      const index = timelineListValue.findIndex((element) => element.id === selectedTimelineId);


      if (direction == 'l') {
        if (index < timelineListValue.length-1) {
          this.onTimelineSelected({ selectedId: timelineListValue[index + 1].id })
        } else {
          updateBodyType(landingPageBody.PROJECT);
        }
      } else if (direction == 'r') {
        if (index != 0) {
          this.onTimelineSelected({ selectedId: timelineListValue[index - 1].id })
        } else {
          this.onTimelineSelected({ selectedId: timelineListValue[timelineListValue.length - 1].id })
        }
      }
    });
  }

  onSwiperMount = (swiper) => {
    this.swiper = swiper;
    swiper.el.addEventListener('touchstart', e => e.stopPropagation(), false);
  }

  getProjects = selectedId => {
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id === selectedId;
    });

    return timeline.projects.map(project => ({
      ...projectsListValue[project],
      slug: project
    }));
  };

  onTimelineSelected = ({ selectedId }) => {
    const projectsList = this.getProjects(selectedId);
    this.setState({ selectedTimelineId: selectedId, projectsList, currentSlide: 0 }, () => {
      this.swiper.slideTo(0);
    });
  };

  render() {
    const { selectedTimelineId, projectsList, currentSlide } = this.state;
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id === selectedTimelineId;
    });
    const totalItems = projectsList ? projectsList.length : 0;

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
        <Div className={styles.image_container}>
          {timelineListValue.map((timelineValue, index) => {
            if (timelineValue.id === selectedTimelineId) {
              return (
                <img
                  key={index}
                  className={`${styles.image} ${styles.selected_image}`}
                  src={timelineValue.backgroundImage}
                />
              );
            }

            return (
              <img
                key={index}
                className={styles.image}
                src={timelineValue.backgroundImage}
              />
            );
          })}
        </Div>

        <Div fillParent className={styles.content_container}>
          <TimelineSelector
            selectedId={selectedTimelineId}
            listValue={timelineListValue}
            onItemSelected={this.onTimelineSelected}
            className={styles.timeline_selector_container}
          />
          <Div align justify className={styles.details_top_container}>
            <Transition
              items={timeline}
              keys={timeline => timeline.id}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {timeline => props => (
                <Div
                  align="center"
                  alignSelf="center"
                  style={{ opacity: props.opacity }}
                  className={styles.details_container}
                >
                  <div className={styles.title}>{timeline.companyName}</div>
                  <div className={styles.description}>{timeline.duration}</div>
                  <div className={styles.description}>{timeline.position}</div>
                  <div className={styles.description}>{timeline.location}</div>
                </Div>
              )}
            </Transition>
          </Div>
          <Div
            fillParent
            className={styles.view_pager_container}
          >
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
                    project={project}
                    className={`${index == currentSlide ? styles.project_list_item__selected : ''} ${styles.project_list_item}`}
                  />
                </Div>
              ))}
            </Swiper>
          </Div>
          <Div alignSelf="center" row className={styles.pagination_button_container}>
            <PaginationButton
              isEnabled={currentSlide != 0}
              onClick={null}
              className={styles.left_button}
              onClick={() => this.swiper.slidePrev()}
            />
            <PaginationButton
              isEnabled={currentSlide < totalItems - 1}
              onClick={null}
              isRight
              onClick={() => this.swiper.slideNext()}
            />
          </Div>
        </Div>
      </Div>
    );
  }
}


export default withRouter(TimelineMobile);
