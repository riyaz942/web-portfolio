import React, { Component } from 'react';
import Div from 'Common/components/div';
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import styles from './timeline_mobile.module.scss';

export default class TimelineMobile extends Component {

  onTimelineSelected = (value) => {
  }

  render() {
    return (
      <Div fillParent className={styles.timeline_container}>
        <TimelineSelector
          listValue={timelineListValue}
          onItemSelected={this.onTimelineSelected}
        />
      </Div>
    )
  }
}
