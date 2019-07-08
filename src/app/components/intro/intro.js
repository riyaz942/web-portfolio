import React, { Component } from 'react';
import styles from './intro.scss';

export default class Intro extends Component{

  render() {
    return(
     <div className={styles['intro-container']}>
       <div className={styles['intro-text']}>
         Hi,
       </div>
     </div>
    )
  }
}
