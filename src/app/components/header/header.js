import React, { Component } from 'react';
import styles from './header.scss';
import profilePic from '../../../images/profile-pic.jpeg';

export default class Header extends Component {
  state = {
    isFullScreen: false,
    showDescription: false,
    animateDiscriptionHide: false,
  };

  constructor(props) {
    super(props);
    setTimeout(() => {
      // this.hideFullScreen();
      this.showFullScreen();
    }, 1000);
  }

  showFullScreen = () => {
    // from header to full screen
    setTimeout(()=> {
      this.setState({
        isFullScreen: true
      })

      setTimeout(()=> {
        this.setState({
          showDescription: true
        })
      }, 800);

    }, 2000);
  }

  hideFullScreen = () => {
    this.setState({animateDiscriptionHide: true});

    setTimeout(() => {
      this.setState({ 
        showDescription: false, 
        isFullScreen: false, 
        animateDiscriptionHide: false
      });
    }, 800);
  }

  render() {
    const {
      isFullScreen,
      showDescription,
      animateDiscriptionHide,
    } = this.state;

    return (
       <div className={`${isFullScreen ? styles['header-fullscreen']: styles['header-normal']} ${styles['header-container']}`}>

         <div className={`${styles['header-link-container']}`}>
           Header link container
         </div>

        <div className={styles['content-container']}>
          <img src={profilePic} className={styles['user-pic']} />

          {
            showDescription && (
              <div className={`${styles['user-description-container']} ${animateDiscriptionHide ? styles['animate-hide'] : styles['animate-show']}`}>
                <div className={styles['user-description']}>
                  So here there will be a description about my self.
                  might be long or something
                </div>

                <div className={styles['user-button-container']}>
                  <div className={styles['user-button-timeline']}>Timeline</div>
                  <div className={styles['user-button-project']}>Projects and Platform</div>
                </div>
                {/* <div>git hub link and any social media link</div> */}
              </div>
            )
          }

        </div>
       </div>
     )
  }
}
