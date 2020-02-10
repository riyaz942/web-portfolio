import React, { Component } from "react";
import styles from "./timeline.scss";
import Div from "Common/components/div";
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import find from "lodash/find";
import { Transition } from "react-spring/renderprops";
import RightContainer from './rightContainer';

export default class Timeline extends Component {
  state = {
    selectedTimelineId: "nykaa"
  };

  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
  }

  componentDidMount() {
    this.isFirstAnimation = false;
  }

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
          from={this.isFirstAnimation ? {
            marginTop: "0vh"
          } : {
              marginTop: "100vh"
            }}

          enter={this.isFirstAnimation ? {
            marginTop: "0vh"
          } : {
              marginTop: "0vh"
            }}

          leave={this.isFirstAnimation ? {
            marginTop: "0vh"
          } : {
              marginTop: "-100vh"
            }}
        >
          {/* {timeline => props => <animated.div style={{ backgroundImage: `url(${timeline.backgroundImage})`, ...props}} className={styles.background_image}></animated.div>} */}

          {timeline => props => (
            <img
              src={timeline.backgroundImage}
              style={props}
              className={styles.background_image}
            ></img>
          )}
        </Transition>
        <div className={styles.background_overlay}></div>
        <div className={styles.left_background_gradient}></div>

        <Div className={styles.left_container}>
          <TimelineSelector onTimelineSelected={this.onTimelineSelected} />

          <Transition
            items={timeline}
            keys={timeline => timeline.id}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {timeline => props => (
              <Div style={props} className={styles.content_container}>
                <div className={styles.title}>{timeline.companyName}</div>

                <Div align='start' className={styles.description_container}>
                  <div className={styles.description}>{timeline.duration}</div>
                  <div className={styles.description}>{timeline.position}</div>
                  <div className={styles.description}>{timeline.location}</div>
                  <div className={styles.button}>view more</div>
                </Div>
              </Div>
            )}
          </Transition>
        </Div>
        <RightContainer />
      </Div>
    );
  }
}
