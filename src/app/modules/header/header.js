import React, { Component } from 'react';
import styles from './header.scss';
import profilePic from 'Images/profile-pic.jpeg';
import { landingPageBody } from '../../constants/landingConstants';
import Div from 'Common/components/div';

export default class Header extends Component {
  state = {
    isFullScreen: true,
    showDescription: true,
    animateDiscriptionHide: false,
  };

  constructor(props) {
    super(props);
  }

  showFullScreen = () => {
    // from header to full screen
    this.setState({
      isFullScreen: true
    })

    setTimeout(() => {
      this.setState({
        showDescription: true
      })
    }, 800);
  }

  hideFullScreen = () => {
    this.setState({ animateDiscriptionHide: true });

    setTimeout(() => {
      this.setState({
        showDescription: false,
        isFullScreen: false,
        animateDiscriptionHide: false
      });
    }, 500);
  }

  onClickProfilePic = () => {
    const { isFullScreen } = this.state;

    if (isFullScreen)
      this.hideFullScreen();
    else
      this.showFullScreen();
  }

  onClickProject = () => {
    const { isFullScreen } = this.state;
    const { updateBodyType } = this.props;

    if (isFullScreen) {
      setTimeout(() => {
        updateBodyType(landingPageBody.PROJECT);
      }, 600);
    }
    else
      updateBodyType(landingPageBody.PROJECT);

    if (isFullScreen)
      this.hideFullScreen();
  }

  onClickTimeline = () => {
    const { isFullScreen } = this.state;
    const { updateBodyType } = this.props;

    if (isFullScreen) {
      setTimeout(() => {
        updateBodyType(landingPageBody.TIMELINE);
      }, 600);
    }
    else
      updateBodyType(landingPageBody.TIMELINE);

    if (isFullScreen)
      this.hideFullScreen();
  }

  render() {
    const {
      isFullScreen,
      showDescription,
      animateDiscriptionHide,
    } = this.state;

    return (
      <div className={`${isFullScreen ? styles.header_fullscreen : styles.header_normal} ${styles.header_container}`}>

        <Div row className={`${styles.header_link_container}`}>
          <div className={styles.header_link_button} onClick={this.onClickTimeline}>Timeline</div>
          <div className={styles.header_link_button} onClick={this.onClickProject}>Projects</div>
        </Div>

        <Div alignCenter className={styles.content_container}>
          <img src={profilePic} className={styles.user_pic} onClick={this.onClickProfilePic} />

          {
            showDescription && (
              <div className={`${styles.user_description_container} ${animateDiscriptionHide ? styles.animate_hide : styles.animate_show}`}>
                <div className={styles.user_description}>
                  So here there will be a description about my self.
                  might be long or something
                  </div>

                <Div row justifyCenter className={styles.user_button_container}>
                  <div className={styles.user_button} onClick={this.onClickTimeline}>Timeline</div>
                  <div className={styles.user_button} onClick={this.onClickProject}>Projects</div>
                </Div>
                {/* <div>git hub link and any social media link</div> */}
              </div>
            )
          }

        </Div>
      </div>
    )
  }
}
