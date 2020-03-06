import React, { Component } from "react";
import styles from "./timeline.scss";
import Div from "Common/components/div";
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import find from "lodash/find";
import { Transition } from "react-spring/renderprops";
import RightContainer from "Common/containers/rightContainer";

export default class Timeline extends Component {
  state = {
    selectedTimelineId: "nykaa",
    selectionNext: true
  };

  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
  }

  componentDidMount() {
    this.isFirstAnimation = false;
  }

  onTimelineSelected = ({ selectedId, selectionNext }) => {
    this.setState({ selectedTimelineId: selectedId, selectionNext });
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
    const { selectedTimelineId, selectionNext } = this.state;
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id == selectedTimelineId;
    });

    return (
      <Div row fillParent align="stretch" className={styles.timeline_container}>
        <Transition
          items={timeline}
          keys={timeline => timeline.id}
          from={this.getImageBackgroundAnimation(selectionNext).from}
          enter={this.getImageBackgroundAnimation(selectionNext).enter}
          leave={this.getImageBackgroundAnimation(selectionNext).leave}
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
          <TimelineSelector
            onTimelineSelected={this.onTimelineSelected}
            listValue={timelineListValue}  
          />

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

                <Div align="start" className={styles.description_container}>
                  <div className={styles.description}>{timeline.duration}</div>
                  <div className={styles.description}>{timeline.position}</div>
                  <div className={styles.description}>{timeline.location}</div>
                  <div className={styles.button}>view more</div>
                </Div>
              </Div>
            )}
          </Transition>
        </Div>

        <RightContainer timeline={timeline} />
      </Div>
    );
  }
}
