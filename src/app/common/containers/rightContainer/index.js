import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./right_container.module.scss";
import Div from "Common/components/div";
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";
import { withRouter } from "react-router";
import { projectsListValue } from "Constants/projectsConstants";
import isEmpty from "lodash/isEmpty";
import { Transition } from "react-spring/renderprops";
import PaginationButton from "Common/components/paginationButton";
import { setProjectPosition } from "Redux/actions/projectActions";
import ProjectListItem from "Common/components/projectListItem";

class RightContainer extends Component {
  state = {
    projects: {}
  };

  componentDidMount() {
    const { item } = this.props;
    const { projects } = this.state;

    if (isEmpty(projects[item.id])) {
      this.setState({
        projects: {
          ...projects,
          [item.id]: this.getSlideObject(item.projects)
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.id != this.props.item.id) {
      const { item } = nextProps;
      const { projects } = this.state;

      if (isEmpty(projects[item.id])) {
        this.setState({
          projects: {
            ...projects,
            [item.id]: this.getSlideObject(item.projects)
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
        slug: project,
        state,
        imgRef: React.createRef(),
        slideRef: React.createRef()
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
    const { projects } = this.state;
    const { item } = this.props;

    const selectedIndex =
      projects[item.id].findIndex(slide => slide.state == "CENTERED") + 1; // move to next slide

    if (selectedIndex < projects[item.id].length) {
      const updatedSlide = map(projects[item.id], (slide, index) => {
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
      });

      this.setState({
        projects: {
          ...projects,
          [item.id]: updatedSlide
        }
      });
    }
  };

  previous = () => {
    const { projects } = this.state;
    const { item } = this.props;

    const selectedIndex =
      projects[item.id].findIndex(slide => slide.state == "CENTERED") - 1; // move to next slide

    if (selectedIndex >= 0) {
      const updatedSlide = map(projects[item.id], (slide, index) => {
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
      });

      this.setState({
        projects: {
          ...projects,
          [item.id]: updatedSlide
        }
      });
    }
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

  render() {
    const { projects } = this.state;
    const { item, className } = this.props;
    const selectedIndex = projects[item.id]
      ? projects[item.id].findIndex(slide => slide.state == "CENTERED")
      : 0;

    const isPrevButtonClickable = selectedIndex > 0;
    const isNextButtonClickable = projects[item.id]
      ? selectedIndex < projects[item.id].length - 1
      : false;

    return (
      <Div flex className={`${styles.right_container} ${className}`}>
        <Div className={styles.slide_container}>
          <Transition
            items={item}
            keys={item => item.id}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {item => props => (
              <Div
                row
                style={props}
                align="end"
                className={styles.slide_inner_container}
              >
                {map(projects[item.id], (slide, index) => (
                  <Spring
                    key={slide.slug}
                    to={this.getPropertyBasedOnState(slide.state)}
                  >
                    {props => (
                      <ProjectListItem
                        index={index}
                        slide={slide}
                        onClickProject={this.onClickProject}
                        {...props}
                      />
                    )}
                  </Spring>
                ))}
              </Div>
            )}
          </Transition>
        </Div>

        <Div row>
          <PaginationButton
            isEnabled={isPrevButtonClickable}
            onClick={this.previous}
            className={styles.left_button_container}
          />
          <PaginationButton
            isEnabled={isNextButtonClickable}
            onClick={this.next}
            isRight
          />
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
)(memo(withRouter(RightContainer)));
