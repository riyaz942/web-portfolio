import React, { Component } from 'react';
import styles from './projects.scss';
import Div from 'Common/components/div';

export default class Projects extends Component {
  render() {
     return (
      <Div fillParent {...this.props} className={styles.project_container}>
        <div className={styles.text}>
          Projects
        </div>
      </Div>
     )
  }
}