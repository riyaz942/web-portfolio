import React, { Component, memo } from "react";
import styles from "./projects.scss";
import Div from "Common/components/div";
import TimelineSelector from "Common/containers/timelineSelector";
import { techList } from "Constants/techConstants";
import find from "lodash/find";
import { Transition, Spring } from "react-spring/renderprops";
import RightContainer from "Common/containers/rightContainer";
import techDoodleImage from "Images/tech-doodle-background-image.png";
import { random, parseNewLine } from "Common/utils";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
    const selectedTechId = 'react';
    const imageAlignment = random(0, 3);

    const imagePosition = this.getImagePosition(selectedTechId, imageAlignment);
    const backgroundTransition = this.getBackgroundTransition(
      selectedTechId,
      imageAlignment
    );

    this.state = {
      selectedTechId,
      techTransitionAnimation: {
        react: {
          ...backgroundTransition,
          imagePosition
        }
      }
    }
  }

  componentDidMount() {
    this.isFirstAnimation = false;
  }

  onTechSelected = ({ selectedId }) => {
    const { techTransitionAnimation } = this.state;

    const imageAlignment = random(0, 3);
    const imagePosition = this.getImagePosition(selectedId, imageAlignment);
    const backgroundTransition = this.getBackgroundTransition(
      selectedId,
      imageAlignment
    );

    this.setState({
      selectedTechId: selectedId, techTransitionAnimation: {
        ...techTransitionAnimation,
        [selectedId]: {
          ...backgroundTransition,
          imagePosition
        }
      }
    });
  };

  getImagePosition = (techType, imageAlignment) => {
    const lowerRange = 10;
    const higherRange = techType == 'android' ? 70 : 30;

    const imageLeft = random(lowerRange, higherRange);
    const imageTop = random(lowerRange, higherRange);

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
            right: '-63px'
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
            left: '-63px',
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
    let transition = {};

    if (
      techType == "react" ||
      techType == "react-native" ||
      techType == "electron"
    ) {
      // transform and rotate are going to be used by image tag
      transition = {
        from: {
          opacity: 0,
          transform: "scale(0) rotate(360deg)"
        },
        enter: {
          opacity: 1,
          transform: "scale(1) rotate(0deg)"
        },
        leave: {
          opacity: 0,
          transform: "scale(0) rotate(360deg)"
        }
      };
    } else if (techType == "android") {
      switch (imageAlignment) {
        case 0:
          transition = {
            from: {
              transform: "translate(0vw, -100vh)"
            },
            enter: { transform: "translate(0vw, 0vh)" },
            leave: { transform: "translate(0vw,-100vh)" }
          };
        break;
        case 1:
          transition = {
            from: { transform: "translate(100vw, 0vh)" },
            enter: { transform: "translate(0vw, 0vh)" },
            leave: { transform: "translate(100vw, 0vh)" }
          };
        break;
        case 2:
          transition = {
            from: { transform: "translate(0vw, 100vh)" },
            enter: { transform: "translate(0vw, 0vh)" },
            leave: { transform: "translate(0vw, 100vh)" }
          };
        break;
        case 3:
          transition = {
            from: {
              transform: "translate(-100vw, 0vh)"
            },
            enter: { transform: "translate(0vw, 0vh)" },
            leave: {
              transform: "translate(-100vw, 0vh)"
            }
          };
        break;
      }
    }

    if (!transition.from) {
      transition = {
        from: { transform: "translate(0vw, -100vh)" },
        enter: { transform: "translate(0vw, 0vh)" },
        leave: { transform: "translate(0vw, -100vh)" }
      };
    }

    if (this.isFirstAnimation) {
      transition = {
        ...transition,
        from: transition.enter,
      }
    }

    return transition;
  };

  render() {
    const { selectedTechId, techTransitionAnimation } = this.state;

    const tech = find(techList, techItem => {
      return techItem.id == selectedTechId;
    });

    return (
      <Div row fillParent align="stretch" className={styles.timeline_container}>
        <img src={techDoodleImage} className={styles.background_static_image} />

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
              const fromAnimation = tech.id == selectedTechId ? from : enter;
              const toAnimation = tech.id == selectedTechId ? enter : leave;
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
                  <div className={styles.description}>{parseNewLine(tech.description)}</div>
                  {/* <div className={styles.description}>{tech.position}</div> */}
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

export default memo(Projects)