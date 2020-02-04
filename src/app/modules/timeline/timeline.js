import React, { Component } from 'react';
import styles from './timeline.scss';

export default class Timeline extends Component {

  render() {
     return(
       <div className={styles.timeline_container}>
         <div className={styles.text}>
           Timeline
         </div>
       </div>
     );
  }
}