import React, { Component } from 'react';
import Div from 'Common/components/div';
import styles from './project_details_page.module.scss';

export default class ProjectDetailsPage extends Component {
  render() {
    return (
      <Div row className={styles.project_details_container}>
        <div className={styles.left_container}>Left Container</div>
        <div className={styles.right_container}>Right Container</div>
      </Div>
    );
  }
}
