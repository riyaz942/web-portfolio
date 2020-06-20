import React, { Component } from 'react';
import Div from 'Common/components/div';
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import styles from './timeline_mobile.module.scss';

export default class TimelineMobile extends Component {

  state = {
    selectedTimelineId: 'nykaa'
  }

  onTimelineSelected = ({ selectedId }) => {
    this.setState({ selectedTimelineId: selectedId });
  };

  render() {
    const { selectedTimelineId } = this.state;

    return (
      <Div fillParent className={styles.timeline_container}>
        <Div className={styles.image_container}>
          {
            timelineListValue.map(timelineValue => {

              if (timelineValue.id === selectedTimelineId) {
                return <img className={`${styles.image} ${styles.selected_image}`} src={timelineValue.backgroundImage} />
              }

              return <img className={styles.image} src={timelineValue.backgroundImage} />
            })
          }
        </Div>
        <Div fillParent className={styles.content_container}>
          <TimelineSelector
            listValue={timelineListValue}
            onItemSelected={this.onTimelineSelected}
          />
        </Div>
      </Div>
    )
  }
}
