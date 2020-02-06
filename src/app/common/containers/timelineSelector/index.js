import React, { Component } from "react";
import Div from "Common/components/div";
import { timelineListValue } from "Constants/timelineConstants";
import styles from './timeline_selector.module.scss';
import map from "lodash/map";
import { Spring } from "react-spring/renderprops";

class TimelineSelector extends Component {
  state = {
    timelineList: timelineListValue
  };

  onClickTimelineItem = (selectedTimeline) => {
    const { timelineList } = this.state;
    const updatedTimelineList = map(timelineList, timeline => {
      if(selectedTimeline.id == timeline.id)
        return {
          ...timeline,
          isSelected: true
        }
      return {
        ...timeline,
        isSelected: false,
      };
    });
    console.log(updatedTimelineList);
    this.setState({ timelineList: updatedTimelineList });
  }

  render() {
    const { timelineList } = this.state;

    return (
      <Div>
        {map(timelineList, timeline => (
          <Spring
            key={timeline.id}
            to={{
              width: timeline.isSelected ? 90 : 38
            }}
          >
            {props => (
              <Div
                row
                style={props}
                className={styles.company_logo_container}
                onClick={()=>this.onClickTimelineItem(timeline)}
              >
                <img className={styles.first_logo} />
                <img className={styles.rest_logo} />
              </Div>
            )}
          </Spring>
        ))}
      </Div>
    );
  }
}

export default TimelineSelector;
