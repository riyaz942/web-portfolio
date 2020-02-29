import React, { Component } from "react";
import styles from "./right_container.module.scss";
import Div from "Common/components/div";
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";
import leftArrowIcon from "Icons/icon-left-arrow.png";
import { withRouter } from "react-router";
import { timelineListValue } from "Constants/timelineConstants";
import { projectsListValue } from "Constants/projectsConstants";
import isEmpty from "lodash/isEmpty";
import { Transition } from "react-spring/renderprops";

class RightContainer extends Component {
  state = {
    timelineProjects: {}
  };

  componentDidMount() {
    const { timeline } = this.props;
    const { timelineProjects } = this.state;

    if (isEmpty(timelineProjects[timeline.id])) {
      this.setState({
        timelineProjects: {
          ...timelineProjects,
          [timeline.id]: this.getSlideObject(timeline.projects)
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timeline.id != this.props.timeline.id) {
      const { timeline } = nextProps;
      const { timelineProjects } = this.state;

      if (isEmpty(timelineProjects[timeline.id])) {
        this.setState({
          timelineProjects: {
            ...timelineProjects,
            [timeline.id]: this.getSlideObject(timeline.projects)
          }
        });
      }
    }
  }

  getSlideObject = projects => {
    return map(projects, (project, index) => {
      const state = index == 0 ? "CENTERED" : "LIST";

      return {
        ...projectsListValue[project],
        state,
        ref: React.createRef()
      };
    });
  };

  getStates = () => {
    return {
      CENTERED: "CENTERED",
      BEHIND: "BEHIND",
      GONE: "GONE",
      LIST: "LIST"
    };
  };

  getPropertyBasedOnState = state => {
    const states = this.getStates();

    switch (state) {
      case states.CENTERED:
        return {
          height: 355,
          width: 209,
          minWidth: 209,
          marginLeft: -246,
          marginBottom: -10,
          marginRight: 37
        };
      case states.BEHIND:
        return {
          opacity: 1,
          marginBottom: -20,

          height: 355,
          width: 209,
          minWidth: 209,
          marginLeft: -246,
          marginRight: 37
        };
      case states.GONE:
        return {
          marginBottom: -30,
          opacity: 0,

          height: 355,
          width: 209,
          minWidth: 209,
          marginLeft: -246,
          marginRight: 37
        };
      default:
        return {
          width: 183,
          minWidth: 183,
          height: 311,
          marginLeft: 0,
          marginBottom: 0,
          marginRight: 39
        };
    }
  };

  next = () => {
    const { timelineProjects } = this.state;
    const { timeline } = this.props;

    const selectedIndex =
      timelineProjects[timeline.id].findIndex(
        slide => slide.state == "CENTERED"
      ) + 1; // move to next slide

    if (selectedIndex < timelineProjects[timeline.id].length) {
      const updatedSlide = map(
        timelineProjects[timeline.id],
        (slide, index) => {
          if (index < selectedIndex - 1) {
            return {
              ...slide,
              state: "GONE"
            };
          } else if (index == selectedIndex - 1) {
            return {
              ...slide,
              state: "BEHIND"
            };
          } else if (index == selectedIndex) {
            return {
              ...slide,
              state: "CENTERED"
            };
          } else {
            return {
              ...slide,
              state: "LIST"
            };
          }
        }
      );

      this.setState({
        timelineProjects: {
          ...timelineProjects,
          [timeline.id]: updatedSlide
        }
      });
    }
  };

  previous = () => {
    const { timelineProjects } = this.state;
    const { timeline } = this.props;

    const selectedIndex =
      timelineProjects[timeline.id].findIndex(
        slide => slide.state == "CENTERED"
      ) - 1; // move to next slide

    if (selectedIndex >= 0) {
      const updatedSlide = map(
        timelineProjects[timeline.id],
        (slide, index) => {
          if (index < selectedIndex - 1) {
            return {
              ...slide,
              state: "GONE"
            };
          } else if (index == selectedIndex - 1) {
            return {
              ...slide,
              state: "BEHIND"
            };
          } else if (index == selectedIndex) {
            return {
              ...slide,
              state: "CENTERED"
            };
          } else {
            return {
              ...slide,
              state: "LIST"
            };
          }
        }
      );

      this.setState({
        timelineProjects: {
          ...timelineProjects,
          [timeline.id]: updatedSlide
        }
      });
    }
  };

  onClickProject = project => {
    const { push } = this.props.history;

    console.log(project.ref.current.offsetTop);
    console.log(project.ref.current.offsetLeft);

    push("/project/something");
  };

  render() {
    const { timelineProjects } = this.state;
    const { timeline } = this.props;
    const selectedIndex = timelineProjects[timeline.id] ? timelineProjects[timeline.id].findIndex(slide => slide.state == "CENTERED") : 0;

    const isPrevButtonClickable = selectedIndex > 0;
    const isNextButtonClickable = timelineProjects[timeline.id] ? selectedIndex < timelineProjects[timeline.id].length - 1: false;

    return (
      <Div flex className={styles.right_container}>
        <Div className={styles.slide_container}>
          <Transition
            items={timeline}
            keys={timeline => timeline.id}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {timeline => props => (
              <Div
                style={props}
                row
                align="end"
                className={styles.slide_inner_container}
              >
                {map(timelineProjects[timeline.id], (slide, index) => (
                  <Spring to={this.getPropertyBasedOnState(slide.state)}>
                    {props => (
                      <Div
                        key={index}
                        onClick={() => this.onClickProject(slide)}
                        ref={slide.ref}
                        style={{ ...props, zIndex: index }}
                        className={`${styles.slide_items} ${
                          slide.state == "CENTERED" ? styles.is_selected : ""
                        }`}
                      >
                        <Div fillParent align justify>
                          <img src={slide.icon} className={styles.image} />
                        </Div>

                        <Div
                          alignSelf="stretch"
                          justify="start"
                          align="end"
                          className={styles.title_container}
                        >
                          <div className={styles.title}>{slide.name}</div>
                          <div className={styles.description}>
                            {slide.tech.join(" | ")}
                          </div>
                        </Div>
                        <div
                          className={styles.bottom_background_gradient}
                        ></div>
                        
                      </Div>
                    )}
                  </Spring>
                ))}
              </Div>
            )}
          </Transition>
        </Div>

        <Div row>
          <Div
            align
            justify
            className={`${styles.button_container} ${styles.left_button_container} ${!isPrevButtonClickable ? styles.disabled : ''}`}
            onClick={this.previous}
          >
            <img className={styles.arrow} src={leftArrowIcon} />
          </Div>
          <Div
            align
            justify
            className={`${styles.button_container} ${!isNextButtonClickable ? styles.disabled : ''}`}
            onClick={this.next}
          >
            <img
              className={`${styles.arrow} ${styles.right_arrow}`}
              src={leftArrowIcon}
            />
          </Div>
        </Div>
      </Div>
    );
  }
}

export default withRouter(RightContainer);
