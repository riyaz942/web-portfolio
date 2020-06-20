import React, { Component } from 'react';
import Div from 'Common/components/div';
import TimelineSelector from "Common/containers/timelineSelector";
import { timelineListValue } from "Constants/timelineConstants";
import styles from './timeline_mobile.module.scss';
import find from 'lodash/find';
import { Transition } from "react-spring/renderprops";

export default class TimelineMobile extends Component {

  state = {
    selectedTimelineId: 'nykaa'
  }

  onTimelineSelected = ({ selectedId }) => {
    this.setState({ selectedTimelineId: selectedId });
  };

  render() {
    const { selectedTimelineId } = this.state;
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id === selectedTimelineId;
    });

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
          <Div align justify className={styles.details_top_container}>
            <Transition
              items={timeline}
              keys={timeline => timeline.id}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {timeline => props => (
                <Div
                  align="center"
                  alignSelf="center"
                  style={{ opacity: props.opacity }}
                  className={styles.details_container}
                >
                  <div className={styles.title}>{timeline.companyName}</div>
                  <div className={styles.description}>{timeline.duration}</div>
                  <div className={styles.description}>{timeline.position}</div>
                  <div className={styles.description}>{timeline.location}</div>
                </Div>
              )}
            </Transition>
          </Div>
        </Div>
      </Div>
    )
  }
}
