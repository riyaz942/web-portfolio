import React, { Component } from "react";
import styles from "./right_container.module.scss";
import Div from "Common/components/div";
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";
import leftArrowIcon from 'Icons/icon-left-arrow.png';
import { withRouter } from "react-router";
class RightContainer extends Component {
  state = {
    slideValue: [
      { name: "1", state: "CENTERED", ref: React.createRef() },
      { name: "2", state: "LIST", ref: React.createRef() },
      { name: "3", state: "LIST", ref: React.createRef() },
      { name: "4", state: "LIST", ref: React.createRef() },
      { name: "5", state: "LIST", ref: React.createRef() },
      { name: "6", state: "LIST", ref: React.createRef() }
    ]
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
          marginBottom: -20
        };
      case states.GONE:
        return {
          marginBottom: -30,
          opacity: 0
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
    const { slideValue } = this.state;
    const selectedIndex =
      slideValue.findIndex(slide => slide.state == "CENTERED") + 1; // move to next slide

    const updatedSlide = map(slideValue, (slide, index) => {
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

    this.setState({ slideValue: updatedSlide });
  };

  previous = () => {
    const { slideValue } = this.state;
    const selectedIndex =
      slideValue.findIndex(slide => slide.state == "CENTERED") - 1; // move to next slide

    const updatedSlide = map(slideValue, (slide, index) => {
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
    this.setState({ slideValue: updatedSlide });
  };

  onClickProject = (project) => {
    const { push } = this.props.history;

    console.log(project.ref.current.offsetTop);
    console.log(project.ref.current.offsetLeft);

    push('/project/something')
  }

  render() {
    const { slideValue } = this.state;

    return (
      <Div flex className={styles.right_container}>
        <Div row align="end" className={styles.slide_container}>
          {map(slideValue, (slide, index) => (
            <Spring to={this.getPropertyBasedOnState(slide.state)}>
              {props => (
                <div
                  key={index}
                  onClick={()=>this.onClickProject(slide)}
                  ref={slide.ref}
                  style={{ ...props, zIndex: index }}
                  className={`${styles.slide_items} ${slide.state == 'CENTERED' ? styles.is_selected : ''}`}
                >
                  
                </div>
              )}
            </Spring>
          ))}
        </Div>
        <Div row>
          <Div align justify className={`${styles.button_container} ${styles.left_button_container}`} onClick={this.previous}>
            <img className={styles.arrow} src={leftArrowIcon} />
          </Div>
          <Div align justify className={styles.button_container} onClick={this.next}>
            <img className={`${styles.arrow} ${styles.right_arrow}`} src={leftArrowIcon} />
          </Div>
        </Div>
      </Div>
    );
  }
}

export default  withRouter(RightContainer);
