import React, { Component } from "react";
import styles from "./timeline.scss";
import Div from "Common/components/div";
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
        <Div className={styles.left_container}>asdasd</Div>
        <Div flex className={styles.right_container}>asdfasdf</Div>
      </Div>
    );
  }
}
