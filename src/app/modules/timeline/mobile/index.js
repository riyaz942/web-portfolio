import React, { Component } from "react";
import Div from "Common/components/div";
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import { projectsListValue } from "Constants/projectsConstants";
import { Transition } from "react-spring/renderprops";
import Swiper from "react-id-swiper";
import find from "lodash/find";
import map from "lodash/map";
import styles from "./timeline_mobile.module.scss";
import ProjectListItem from 'Common/components/projectListItem';
import PaginationButton from "Common/components/paginationButton";

export default class TimelineMobile extends Component {
  state = {
    selectedTimelineId: "nykaa",
    projectsList: []
  };

  componentDidMount() {
    const { selectedTimelineId } = this.state;

    this.setState({
      projectsList: this.getProjects(selectedTimelineId)
    });
  }

  getProjects = selectedId => {
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id === selectedId;
    });

    return timeline.projects.map(project => projectsListValue[project]);
  };

  onTimelineSelected = ({ selectedId }) => {
    const projectsList = this.getProjects(selectedId);
    this.setState({ selectedTimelineId: selectedId, projectsList });
  };

  render() {
    const { selectedTimelineId, projectsList } = this.state;
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id === selectedTimelineId;
    });
    const params = {
      containerClass: "custom_container",
      slidesPerView: 2,
      //slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 40,
      shouldSwiperUpdate: true,
    };

    return (
      <Div fillParent className={styles.timeline_container}>
        {/* Background div image */}
        <Div className={styles.image_container}>
          {timelineListValue.map(timelineValue => {
            if (timelineValue.id === selectedTimelineId) {
              return (
                <img
                  className={`${styles.image} ${styles.selected_image}`}
                  src={timelineValue.backgroundImage}
                />
              );
            }

            return (
              <img
                className={styles.image}
                src={timelineValue.backgroundImage}
              />
            );
          })}
        </Div>

        <Div fillParent className={styles.content_container}>
          <TimelineSelector
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
          <Div fillParent className={styles.view_pager_container}>
            <Swiper
              {...params}
              getSwiper={swiper => {
                this.swiper = swiper;
              }}
            >
              {map(projectsList, (project, index) => (
                <ProjectListItem
                  key={index}
                  slide={project}
                  className={styles.project_list_item}
                  onClickProject={null}
                />
              ))}
            </Swiper>
          </Div>
          <Div alignSelf="center" row className={styles.pagination_button_container}>
            <PaginationButton
              isEnabled={true}
              onClick={null}
              className={styles.left_button}
            />
            <PaginationButton
              isEnabled={true}
              onClick={null}
              isRight
            />
          </Div>
        </Div>
      </Div>
    );
  }
}
