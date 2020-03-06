import React, { Component } from "react";
import styles from "./projects.scss";
import Div from "Common/components/div";
import TimelineSelector from "Common/containers/timelineSelector";
import { techList } from "Constants/techConstants";
import find from "lodash/find";
import { Transition } from "react-spring/renderprops";
import RightContainer from "Common/containers/rightContainer";

export default class Projects extends Component {
  state = {
    selectedTechId: "react",
    selectionNext: true
  };

  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
  }

  componentDidMount() {
    this.isFirstAnimation = false;
  }

  onTechSelected = ({ selectedId, selectionNext }) => {
    this.setState({ selectedTechId: selectedId, selectionNext });
  };

  getImageBackgroundAnimation = selectionNext => {
    if (this.isFirstAnimation) {
      return {
        from: { marginTop: "0vh" },
        enter: { marginTop: "0vh" },
        leave: { marginTop: "0vh" }
      };
    } 
    else if (selectionNext) {
      return {
        from: { marginTop: "100vh" },
        enter: { marginTop: "0vh" },
        leave: { marginTop: "-100vh" }
      };
    }

    return {
      from: { marginTop: "-100vh" },
      enter: { marginTop: "0vh" },
      leave: { marginTop: "100vh" }
    };
  };

  render() {
    const { selectedTechId, selectionNext } = this.state;
    const tech = find(techList, techItem => {
      return techItem.id == selectedTechId;
    });

    return (
      <Div row fillParent align="stretch" className={styles.timeline_container}>
        <Transition
          items={tech}
          keys={tech => tech.id}
          from={this.getImageBackgroundAnimation(selectionNext).from}
          enter={this.getImageBackgroundAnimation(selectionNext).enter}
          leave={this.getImageBackgroundAnimation(selectionNext).leave}
        >
          {tech => props => (
            <img
              src={tech.backgroundImage}
              style={props}
              className={styles.background_image}
            ></img>
          )}
        </Transition>
        <div className={styles.background_overlay}></div>
        <div className={styles.left_background_gradient}></div>

        <Div className={styles.left_container}>
          <TimelineSelector
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
\                </Div>
              </Div>
            )}
          </Transition>
        </Div>

        <RightContainer items={tech} />
      </Div>
    );
  }
}
