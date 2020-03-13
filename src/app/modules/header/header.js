import React, { Component, Fragment } from "react";
import styles from "./header.module.scss";
import profilePic from "Images/profile-pic.jpeg";
import { landingPageBody } from "../../constants/landingConstants";
import Div from "Common/components/div";
import { Spring, Transition, config } from "react-spring/renderprops";
import BackgroundAnimator from "./backgroundAnimator";
import ContactComponent from "Common/components/contactComponent";

class Header extends Component {
  isGoingFullScreen = false;
  state = {
    isFullScreen: true,
    showDescription: true,
    clientX: 0,
    clientY: 0,
    isFirstTime: true
  };

  componentDidMount() {
    const { isFirstTime } = this.state;

    if (isFirstTime) {
      setTimeout(() => {
        this.setState({ isFirstTime: false });
      }, 1500);
    }
  }

  /* -------------------------------------------------- Change page state functions------------------------------------------- */
 

  /* --------------------------------------------------Header click Functions------------------------------------------- */

 

  render() {
    const {
      isFullScreen,
      showDescription,
      clientX,
      clientY,
      isFirstTime
    } = this.state;
    const { bodyType } = this.props;

    return (
      <Spring
        to={{
          backgroundColor: isFullScreen ? "#333333ff" : "#33333300",
          // topContainerHeight: isFullScreen
          //   ? "calc(100vh + 0px)"
          //   : "calc(0vh + 70px)", //Because have to keep a same format even the operator and type of units

          userPicTranform: isFullScreen
            ? "translate(calc(100px - 50vw), calc(50vh - 250px)) scale(1)"
            : "translate(calc(-40px - 0vw), calc(0vh - -10px)) scale(0.25)",
          boxShadow: isFullScreen
            ? "0px 5px 12px 3px rgba(0, 0, 0, 0.35)"
            : "0px 5px 12px 3px rgba(0, 0, 0, 0)",
        }}
        config={{
          mass: 1,
          tension: 200,
          fiction: 20
        }}
      >
        {springProps => (
          <div
            style={{
              backgroundColor: springProps.backgroundColor,
              height: '100vh'
              // height: springProps.topContainerHeight
            }}
            className={`${
              isFullScreen ? styles.header_fullscreen : styles.header_normal
              } ${styles.header_container}`}
            onMouseMove={
              showDescription
                ? ({ clientX: x, clientY: y }) =>
                  this.setState({ clientX: x, clientY: y })
                : null
            }
          >
            <Transition
              items={showDescription}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
              config={
                isFirstTime
                  ? config.molasses
                  : {
                    mass: 1,
                    tension: 500,
                    fiction: 26
                  }
              }
              config={{ delay: this.isGoingFullScreen ? 200 : 0 }}
            >
              {showDescription =>
                showDescription &&
                (props => (
                  <div
                    style={props}
                    className={styles.header_background_container}
                  >
                    <BackgroundAnimator clientX={clientX} clientY={clientY} />
                  </div>
                ))
              }
            </Transition>

            
          </div>
        )}
      </Spring>
    );
  }
}

export default Header;
