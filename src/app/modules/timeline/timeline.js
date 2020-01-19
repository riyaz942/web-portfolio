import React, { Component } from 'react';
import styles from './timeline.scss';

export default class Timeline extends Component {

  render() {
     return(
       <div className={styles['timeline-container']}>
         <div className={styles['text']}>
           Timeline
         </div>
       </div>
     )
  }
}