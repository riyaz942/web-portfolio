import React, { Component } from 'react';
import styles from './projects.scss';

export default class Projects extends Component {
  constructor(props) {
    super(props);
  }
  render() {
     return(
      <div className={styles['project-container']}>
        <div className={styles['text']}>
          Projects
        </div>
      </div>
     )
  }
}