import React, { Component } from "react";
import styles from "./projects.scss";
import Div from "Common/components/div";
import TimelineSelector from "Common/containers/timelineSelector";
import { techList } from "Constants/techConstants";
import find from "lodash/find";
import { Transition } from "react-spring/renderprops";
import RightContainer from "Common/containers/rightContainer";
import techDoodleImage from "Images/tech-doodle-background-image.png";
import { random } from "Common/utils";

export default class Projects extends Component {
  state = {
    selectedTechId: "react",
    techTransitionAnimation: {
      from: { transform: "scale(0) rotate(0deg) transition(0vw, 0vh)" },
      enter: { transform: "scale(0) rotate(0deg) transition(0vw, 0vh)" },
      leave: { transform: "scale(0) rotate(0deg) transition(0vw, 0vh)" },
      imagePosition: {}
    }
  };

  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
  }

  componentDidMount() {
    this.isFirstAnimation = false;
  }

  onTechSelected = ({ selectedId }) => {
    const imageAlignment = random(0, 4);

    const imagePosition = this.getImagePosition(selectedId, imageAlignment);
    const backgroundTransition = this.getBackgroundTransition(
      selectedId,
      imageAlignment
    );

    const techTransitionAnimation = {
      ...backgroundTransition,
      imagePosition
    };

    this.setState({ selectedTechId: selectedId, techTransitionAnimation });
  };

  getImagePosition = (techType, imageAlignment) => {
    const imageLeft = random(20, 80);
    const imageTop = random(20, 80);

    if (techType == "android") {
      switch (imageAlignment) {
        case 0:
          return {
            transform: "rotate(180deg)",
            left: `${imageLeft}vw`,
            top: 0
          };

        case 1:
          return {
            transform: "rotate(270deg)",
            top: `${imageTop}vh`,
            right: 0
          };

        case 2:
          return {
            transform: "rotate(0deg)",
            left: `${imageLeft}vw`,
            bottom: 0
          };

        case 3:
          return {
            transform: "rotate(90deg)",
            left: 0,
            top: `${imageTop}vh`
          };
      }
    }

    return {
      left: `${imageLeft}vw`,
      top: `${imageTop}vh`
    };
  };

  getBackgroundTransition = (techType, imageAlignment) => {
    if (
      techType == "react" ||
      techType == "react-native" ||
      techType == "electron"
    ) {
      // transform and rotate are going to be used by image tag
      return {
        from: {
          opacity: 0,
          transform: "scale(0) rotate(360deg) transition(0vw, 0vh)"
        },
        enter: {
          opacity: 1,
          transform: "scale(1) rotate(0deg) transition(0vw, 0vh)"
        },
        leave: {
          opacity: 0,
          transform: "scale(0) rotate(360deg) transition(0vw, 0vh)"
        }
      };
    } else if (techType == "android") {
      switch (imageAlignment) {
        case 0:
          return {
            from: {
              transform: "scale(0) rotate(0deg) transition(0vw, -100vh)"
            },
            enter: { transform: "scale(0) rotate(0deg) transition(0vw, 0vh)" },
            leave: { transform: "scale(0) rotate(0deg) transition(0vw,-100vh)" }
          };
        case 1:
          return {
            from: { transform: "scale(0) rotate(0deg) transition(100vw, 0vh)" },
            enter: { transform: "scale(0) rotate(0deg) transition(0vw, 0vh)" },
            leave: { transform: "scale(0) rotate(0deg) transition(100vw, 0vh)" }
          };
        case 2:
          return {
            from: { transform: "scale(0) rotate(0deg) transition(0vw, 100vh)" },
            enter: { transform: "scale(0) rotate(0deg) transition(0vw, 0vh)" },
            leave: { transform: "scale(0) rotate(0deg) transition(0vw, 100vh)" }
          };
        case 3:
          return {
            from: {
              transform: "scale(0) rotate(0deg) transition(-100vw, 0vh)"
            },
            enter: { transform: "scale(0) rotate(0deg) transition(0vw, 0vh)" },
            leave: {
              transform: "scale(0) rotate(0deg) transition(-100vw, 0vh)"
            }
          };
      }
    }

    return {
      from: { transform: "scale(0) rotate(0deg) transition(0vw, -100vh)" },
      enter: { transform: "scale(0) rotate(0deg) transition(0vw, 0vh)" },
      leave: { transform: "scale(0) rotate(0deg) transition(0vw, -100vh)" }
    };
  };

  render() {
    const { selectedTechId, techTransitionAnimation } = this.state;
    const { imagePosition } = techTransitionAnimation;

    const tech = find(techList, techItem => {
      return techItem.id == selectedTechId;
    });

    const isReactRelated =
      selectedTechId == "react" ||
      selectedTechId == "react-native" ||
      selectedTechId == "electron";

    return (
      <Div row fillParent align="stretch" className={styles.timeline_container}>
        <img src={techDoodleImage} className={styles.background_static_image} />

        <Transition
          items={tech}
          keys={tech => tech.id}
          from={techTransitionAnimation.from}
          enter={techTransitionAnimation.enter}
          leave={techTransitionAnimation.leave}
        >
          {tech => props => (
            <Div
              style={{
                opacity: isReactRelated ? props.opacity : 1,
                transform: !isReactRelated ? props.transform : "unset"
              }}
              className={styles.background_image_container}
            >
              <img
                src={tech.firstLogo}
                style={{
                  left: imagePosition.left ? imagePosition.left : "unset",
                  right: imagePosition.right ? imagePosition.right : "unset",
                  top: imagePosition.top ? imagePosition.top : "unset",
                  bottom: imagePosition.bottom ? imagePosition.bottom : "unset",
                  transform: isReactRelated ? props.transform : "unset"
                }}
                className={styles.background_image}
              ></img>
            </Div>
          )}
        </Transition>
        <div className={styles.left_background_gradient}></div>

        <Div className={styles.left_container}>
          <TimelineSelector
            listValue={techList}
            tech
            onItemSelected={this.onTechSelected}
          />

          <Transition
            items={tech}
            keys={tech => tech.id}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {tech => props => (
              <Div style={props} className={styles.content_container}>
                <div className={styles.title}>{tech.name}</div>

                <Div align="start" className={styles.description_container}>
                  <div className={styles.description}>{tech.duration}</div>
                  <div className={styles.description}>{tech.position}</div>
                </Div>
              </Div>
            )}
          </Transition>
        </Div>

        <RightContainer item={tech} />
      </Div>
    );
  }
}
