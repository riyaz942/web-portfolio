import React, { Component } from "react";
import styles from "./timeline.scss";
import Div from "Common/components/div";
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import find from "lodash/find";
import { Transition } from "react-spring/renderprops";
import RightContainer from "Common/containers/rightContainer";

class Timeline extends Component {
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
        from: { transform: 'translateY(0vh)' },
        enter: { transform: 'translateY(0vh)' },
        leave: { transform: 'translateY(0vh)' }
      };
    }
    else if (selectionNext) {
      return {
        from: { transform: 'translateY(100vh)' },
        enter: { transform: 'translateY(0vh)' },
        leave: { transform: 'translateY(-100vh)' }
      };
    }

    return {
      from: { transform: 'translateY(-100vh)' },
      enter: { transform: 'translateY(0vh)' },
      leave: { transform: 'translateY(100vh)' }
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
            selectedId={selectedTimelineId}
            listValue={timelineListValue}
            onItemSelected={this.onTimelineSelected}
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
                  {/* <div className={styles.button}>view more</div> */}
                </Div>
              </Div>
            )}
          </Transition>
        </Div>

        <RightContainer item={timeline} />
      </Div>
    );
  }
}

export default Timeline;