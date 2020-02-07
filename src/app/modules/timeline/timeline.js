import React, { Component } from "react";
import styles from "./timeline.scss";
import Div from "Common/components/div";
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import find from "lodash/find";
import { Transition } from "react-spring/renderprops";
import { animated } from "react-spring";

export default class Timeline extends Component {
  state = {
    selectedTimelineId: "nykaa"
  };

  onTimelineSelected = id => {
    this.setState({ selectedTimelineId: id });
  };

  render() {
    const { selectedTimelineId } = this.state;
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id == selectedTimelineId;
    });

    return (
      <Div row fillParent align="stretch" className={styles.timeline_container}>
        <Transition
          items={timeline}
          keys={timeline => timeline.id}
          from={{
            opacity: 0,
            marginTop: "200px"
          }}
          enter={{
            opacity: 1,
            marginTop: "0px"
          }}
          leave={{
            opacity: 0,
            marginTop: "-200px"
          }}
        >
          {/* {timeline => props => <animated.div style={{ backgroundImage: `url(${timeline.backgroundImage})`, ...props}} className={styles.background_image}></animated.div>} */}
          
          {timeline => props => (
            <animated.img
              src={timeline.backgroundImage}
              style={props}
              className={styles.background_image}
            ></animated.img>
          )}
        </Transition>
        <div className={styles.background_overlay}></div>
        <div className={styles.left_background_gradient}></div>

        <Div className={styles.left_container}>
          <TimelineSelector onTimelineSelected={this.onTimelineSelected} />
        </Div>
        <Div flex className={styles.right_container}></Div>
      </Div>
    );
  }
}
