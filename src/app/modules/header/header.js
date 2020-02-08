import React, { Component, Fragment } from "react";
import styles from "./header.module.scss";
import profilePic from "Images/profile-pic.jpeg";
import { landingPageBody } from "../../constants/landingConstants";
import Div from "Common/components/div";
import { Spring, Transition } from "react-spring/renderprops";
import HeaderDescription from './headerDescription';

export default class Header extends Component {
  state = {
    isFullScreen: true,
    showDescription: true
  };

  constructor(props) {
    super(props);
  }

  showFullScreen = () => {
    // from header to full screen
    this.setState({
      isFullScreen: true
    });

    setTimeout(() => {
      this.setState({
        showDescription: true
      });
    }, 800);
  };

  hideFullScreen = () => {
    this.setState({ showDescription: false });

    setTimeout(() => {
      this.setState({
        isFullScreen: false
      });
    }, 500);
  };

  onClickProfilePic = () => {
    const { isFullScreen } = this.state;

    if (!isFullScreen)
      this.showFullScreen();
  };

  onClickProject = () => {
    const { isFullScreen } = this.state;
    const { updateBodyType } = this.props;

    if (isFullScreen) {
      setTimeout(() => {
        updateBodyType(landingPageBody.PROJECT);
      }, 600);
    } else updateBodyType(landingPageBody.PROJECT);

    if (isFullScreen) this.hideFullScreen();
  };

  onClickTimeline = () => {
    const { isFullScreen } = this.state;
    const { updateBodyType } = this.props;

    if (isFullScreen) {
      setTimeout(() => {
        updateBodyType(landingPageBody.TIMELINE);
      }, 600);
    } else updateBodyType(landingPageBody.TIMELINE);

    if (isFullScreen) this.hideFullScreen();
  };

  render() {
    const { isFullScreen, showDescription } = this.state;

    return (
      <Fragment
        to={{
          opacity: 0 //timeline.isSelected ? 1 : 0
        }}
      >
        <div
          className={`${
            isFullScreen ? styles.header_fullscreen : styles.header_normal
          } ${styles.header_container}`}
        >
          {/* <div className={styles.background_gradient}></div> */}
          <Div row className={`${styles.header_link_container}`}>
            <div
              className={styles.header_link_button}
              onClick={this.onClickTimeline}
            >
              Timeline
            </div>
            <div
              className={styles.header_link_button}
              onClick={this.onClickProject}
            >
              Projects
            </div>
          </Div>

          <Fragment>
            <Div align className={styles.content_container}>
              {/* <Spring
                from={{
                  height: '300px',
                  width: '300px'
                }}
                to={{
                  height: isFullScreen ? '300px' : '50px',
                  width: isFullScreen ? '300px' : '50px'
                }}
              >
                {props => (
                  <img
                    src={profilePic}
                    style={props}
                    className={styles.user_pic}
                    onClick={this.onClickProfilePic}
                  />
                )}
              </Spring> */}
              <img
                src={profilePic}
                className={styles.user_pic}
                onClick={this.onClickProfilePic}
              />
              {/* Description */}


                <HeaderDescription 
                  showDescription={showDescription}
                  onClickProject={this.onClickProject}
                  onClickTimeline={this.onClickTimeline}
                />
            </Div>
          </Fragment>
        </div>
      </Fragment>
    );
  }
}
