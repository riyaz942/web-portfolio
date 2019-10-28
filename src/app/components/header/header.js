import React, { Component } from 'react';
import styles from './header.scss';
import profilePic from '../../../images/profile-pic.jpeg';

export default class Header extends Component {
  state = {
    isFullScreen: false,
  };

  constructor(props) {
    super(props);

    setTimeout(()=> {
      this.setState({
        isFullScreen: true 
      })
    }, 2000);
  }

  render() {
    const {isFullScreen} = this.state;

    return (
       <div className={`${isFullScreen ? styles['header-fullscreen']: styles['header-normal']} ${styles['header-container']}`}>
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
