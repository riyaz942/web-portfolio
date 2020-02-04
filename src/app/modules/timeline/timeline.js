import React, { Component } from "react";
import styles from "./timeline.scss";
import Div from "Common/components/div";
export default class Timeline extends Component {
  render() {
    return (
      <Div
       fillParent
       className={styles.timeline_container}
       {...this.props}
      >
        <div className={styles.text}>Timeline</div>
      </Div>
    );
  }
}
