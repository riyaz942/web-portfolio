import React, { Component, Fragment } from "react";
import styles from "./header.module.scss";
import profilePic from "Images/profile-pic.jpeg";
import { landingPageBody } from "../../constants/landingConstants";
import Div from "Common/components/div";
import { Spring, Transition } from "react-spring/renderprops";

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

    if (isFullScreen) this.hideFullScreen();
    else this.showFullScreen();
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
    const {
      isFullScreen,
      showDescription
    } = this.state;

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

          <Div align className={styles.content_container}>
            <img
              src={profilePic}
              className={styles.user_pic}
              onClick={this.onClickProfilePic}
            />

            <Transition
              items={showDescription}
              from={{
                opacity: 0,
                marginTop: "100px"
              }}
              enter={{
                opacity: 1,
                marginTop: "36px"
              }}
              leave={{
                opacity: 0
              }}
            >
              {showDescription =>
                showDescription &&
                (props => (
                  <Div
                    animate
                    style={props}
                    className={styles.user_description_container}
                  >
                    <div className={styles.user_description}>
                      So here there will be a description about my self. might
                      be long or something
                    </div>

                    <Div row justify className={styles.user_button_container}>
                      <div
                        className={styles.user_button}
                        onClick={this.onClickTimeline}
                      >
                        Timeline
                      </div>
                      <div
                        className={styles.user_button}
                        onClick={this.onClickProject}
                      >
                        Projects
                      </div>
                    </Div>
                    {/* <div>git hub link and any social media link</div> */}
                  </Div>
                ))
              }
            </Transition>
          </Div>
        </div>
      </Fragment>
    );
  }
}
