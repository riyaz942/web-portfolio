import React, { Component } from "react";
import styles from "./timeline.scss";
import Div from "Common/components/div";
import TimelineSelector from 'Common/containers/timelineSelector';

export default class Timeline extends Component {
  render() {
    return (
      <Div
        row
        fillParent
        align="stretch"
        className={styles.timeline_container}
        {...this.props}
      >
        <Div className={styles.left_container}>
            <TimelineSelector />        
        </Div>
        <Div flex className={styles.right_container}>
        </Div>
      </Div>
    );
  }
}
