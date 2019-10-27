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
        {/* Projects and platform links */}
        <div className={styles['content-container']}>

          <img src={profilePic} className={styles['user-pic']} />
          {/* <div className={styles['user-description']}>
            So here there will be a description about my self.
            might be long or something
          </div>

          <div className={styles['user-button-container']}>
            <div className={styles['user-button-timeline']}>Timeline</div>
            <div className={styles['user-button-project']}>Projects and Platform</div>
          </div> */}

          {/* <div>git hub link and any social media link</div> */}
        </div>
       </div>
     )
  }
}