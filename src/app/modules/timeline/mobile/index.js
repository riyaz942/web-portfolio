import React, { Component } from "react";
import Div from "Common/components/div";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
import { setProjectPosition } from "Redux/actions/projectActions";

class TimelineMobile extends Component {
  state = {
    selectedTimelineId: "nykaa",
    currentSlide: 0,
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

    return timeline.projects.map(project => ({
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


  onTimelineSelected = ({ selectedId }) => {
    const projectsList = this.getProjects(selectedId);
    this.setState({ selectedTimelineId: selectedId, projectsList, currentSlide: 0 });
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

const mapDispathToProps = dispatch => {
  return {
    setProjectPosition: bindActionCreators(setProjectPosition, dispatch)
  };
};

export default connect(
  null,
  mapDispathToProps
)(withRouter(TimelineMobile));