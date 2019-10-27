import React, { Component } from 'react';
import styles from './header.scss';
import profilePic from '../../../images/profile-pic.jpeg';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
     return (
       <div className={styles['header-container']}>
        <div className={styles['content-container']}>
          <img src={profilePic} className={styles['user-pic']} />
          <div className={styles['user-description']}>description</div>
          <div className={styles['user-button-container']}>
            <div className={styles['user-button-timeline']}>Timeline</div>
            <div className={styles['user-button-project']}>Projects and Platform</div>
          </div>
        </div>
       </div>
     )
  }
}