import React, { Component, memo } from "react";
import styles from "./right_container.module.scss";
import Div from "Common/components/div";
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";
import { withRouter } from "react-router";
import { projectsListValue } from "Constants/projectsConstants";
import isEmpty from "lodash/isEmpty";
import { Transition } from "react-spring/renderprops";
import PaginationButton from "Common/components/paginationButton";
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
        state
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


  // position = next | previous
  moveTo = (position) => {
    const { projects } = this.state;
    const { item } = this.props;

    let selectedIndex = projects[item.id].findIndex(slide => slide.state == "CENTERED"); 
    selectedIndex = position == 'next' ? selectedIndex + 1 : selectedIndex - 1; // move to slide either next or to previous position

    const nextCondition = (selectedIndex < projects[item.id].length);
    const previousCondition = (selectedIndex >= 0);

    if (position == 'next'? nextCondition : previousCondition) {
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
  }

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
                {map(projects[item.id], (project, index) => (
                  <Spring
                    key={project.slug}
                    to={this.getPropertyBasedOnState(project.state)}
                  >
                    {props => (
                      <ProjectListItem
                        index={index}
                        project={project}
                        style={props}
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
            onClick={()=>this.moveTo('previous')}
            className={styles.left_button_container}
          />
          <PaginationButton
            isEnabled={isNextButtonClickable}
            onClick={()=>this.moveTo('next')}
            isRight
          />
        </Div>
      </Div>
    );
  }
}

export default memo(withRouter(RightContainer));

