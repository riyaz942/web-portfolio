import React, { Component, Fragment } from "react";
import Div from "Common/components/div";
import { timelineListValue } from "Constants/timelineConstants";
import styles from "./timeline_selector.module.scss";
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";

class TimelineSelector extends Component {
  state = {
    timelineList: timelineListValue
  };

  onClickTimelineItem = selectedTimeline => {
    const { onTimelineSelected } = this.props;

    const { timelineList } = this.state;
    const updatedTimelineList = map(timelineList, timeline => {
      if (selectedTimeline.id == timeline.id)
        return {
          ...timeline,
          isSelected: true
        };
      return {
        ...timeline,
        isSelected: false
      };
    });
    
    onTimelineSelected(selectedTimeline.id);
    this.setState({ timelineList: updatedTimelineList });
  };

  render() {
    const { timelineList } = this.state;

    return (
      <Div>
        {map(timelineList, (timeline, index) => (
          <Spring
            key={timeline.id}
            to={{
              width: timeline.isSelected ? timeline.containerWidth : 38,
              opacity: timeline.isSelected ? 1 : 0
            }}
          >
            {props => (
              <Fragment>
                {index != 0 && <div className={styles.vertical_divider}></div>}
                <Div
                  row
                  align
                  justify
                  style={{ width: props.width }}
                  className={styles.company_logo_container}
                  onClick={() => this.onClickTimelineItem(timeline)}
                >
                  <Div
                    row
                    align
                    justify
                    className={styles.first_logo_container}
                  >
                    <img className={styles.logo} src={timeline.firstLogo} />
                  </Div>
                  <img
                    style={{
                      opacity: props.opacity,
                      marginLeft: timeline.restMargin
                    }}
                    className={styles.logo}
                    src={timeline.restLogo}
                  />
                </Div>
              </Fragment>
            )}
          </Spring>
        ))}
      </Div>
    );
  }
}

export default TimelineSelector;
