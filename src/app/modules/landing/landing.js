import React, { Component, Fragment } from "react";
import styles from "./landing.scss";
import Header from "../header/header";
import Timeline from "../timeline/timeline";
import Loader from "../loader/loader";
import { landingPageBody } from "../../constants/landingConstants";
import Projects from "../projects/projects";
import ProjectsMobile from '../projects/mobile';
import Div from "Common/components/div";
import { Transition } from "react-spring/renderprops";
import ProfilePic from "Modules/aboutComponents/profilePic";
import HeaderDescription from "Modules/aboutComponents/headerDescription";
import HeaderLinks from 'Modules/aboutComponents/headerLinks';
import responsiveBreakpoint from 'Common/hoc/responsiveBreakpoint';
import { animationFrameTimeout } from 'Common/utils';
import TimelineMobile from "../timeline/mobile";

class Landing extends Component {
  state = {
    bodyType: landingPageBody.NONE,
    isFullScreen: true,
    allowMouseHover: false,
    showDescription: true,
    clientX: 0,
    clientY: 0,
    isFirstTime: true
  };

  constructor(props) {
    super(props);
    //TODO matchPath 'projects/*' and set to either timeline or projects and in header
    this.previousBodyType = landingPageBody.NONE;
  }

  componentDidMount() {
    animationFrameTimeout(() => {
      const { screenSize } = this.props;
      if (screenSize == 'sm' || screenSize == 'md')
        window.addEventListener("deviceorientation", this.handleOrientation, false);

      this.setState({ isFirstTime: false, allowMouseHover: true });
    }, 1100);

  }

  handleOrientation = (event) => {
    this.setState({ clientX: Math.floor(event.gamma) * 10, clientY: Math.floor(event.beta) * 10 });
  }

  //-------------------------------------------Header Logic-------------------------------------------

  onClickProfilePic = () => {
    const { isFullScreen } = this.state;
    if (!isFullScreen) this.showFullScreen();
  };

  onClickProject = () => {
    const { isFullScreen } = this.state;

    this.updateBodyType(landingPageBody.PROJECT);
    if (isFullScreen) this.hideFullScreen();
  };

  onClickTimeline = () => {
    const { isFullScreen } = this.state;

    this.updateBodyType(landingPageBody.TIMELINE);
    if (isFullScreen) this.hideFullScreen();
  };

  //-----------------------------ShowFullScreen
  showFullScreen = () => {
    // from header to full screen
    this.setState({ isFullScreen: true });
    this.updateBodyType(landingPageBody.NONE);

    animationFrameTimeout(() => {
      this.setState({
        showDescription: true
      });

      animationFrameTimeout(() => {
        const { screenSize } = this.props;
        if (screenSize == 'sm' || screenSize == 'md')
          window.addEventListener("deviceorientation", this.handleOrientation, false);
  
        this.setState({ allowMouseHover: true });
      }, 500);
    }, 500);
  };

  //-----------------------------HideFullScreen
  hideFullScreen = () => {
    const { screenSize } = this.props;
    if (screenSize == 'sm' || screenSize == 'md')
      window.removeEventListener("deviceorientation", this.handleOrientation, false);

    this.setState({ showDescription: false, allowMouseHover: false });

    animationFrameTimeout(() => {
      this.setState({
        isFullScreen: false
      });
    }, 600);
  };

  //-------------------------------------------Body Logic-------------------------------------------
  updateBodyType = bodyType => {
    this.previousBodyType = this.state.bodyType;
    this.setState({ bodyType });
  };

  getBodyContent = (bodyType, screenSize) => {
    const showMobile = screenSize === 'sm' || screenSize === 'md';

    return (
      props => (
        <Div
          fillParent
          style={props}
          className={styles.body_content_container}
        >
          {bodyType == landingPageBody.PROJECT && (showMobile ? <ProjectsMobile updateBodyType={this.updateBodyType} /> : <Projects />)}
          {bodyType == landingPageBody.TIMELINE && (showMobile ? <TimelineMobile updateBodyType={this.updateBodyType} /> :  <Timeline />)}
        </Div>
      )
    )
  }

  render() {
    const { bodyType, isFirstTime, isFullScreen, showDescription, clientX, clientY, allowMouseHover } = this.state;
    const { screenSize } = this.props;
    let fromAnimation, enterAnimation, leaveAnimation;

    if (
      this.previousBodyType == landingPageBody.NONE ||
      bodyType == landingPageBody.NONE
    ) {
      fromAnimation = {
        opacity: 1,
        transform: "translate(0px, 100px)"
      };
      enterAnimation = {
        opacity: 1,
        transform: "translate(0px, 0px)"
      };
      leaveAnimation = {
        opacity: 0,
        transform: "translate(0px, 100px)"
      };
    } else if (bodyType == landingPageBody.TIMELINE) {
      fromAnimation = {
        opacity: 0,
        transform: "translate(-300px, 0px)"
      };
      enterAnimation = {
        opacity: 1,
        transform: "translate(0px, 0px)"
      };
      leaveAnimation = {
        opacity: 0,
        transform: "translate(300px, 0px)"
      };
    } else if (bodyType == landingPageBody.PROJECT) {
      fromAnimation = {
        opacity: 0,
        transform: "translate(300px, 0px)"
      };
      enterAnimation = {
        opacity: 1,
        transform: "translate(0px, 0px)"
      };
      leaveAnimation = {
        opacity: 0,
        transform: "translate(-300px, 0px)"
      };
    }

    return (
      <Div
        className={styles.landing_container}
        onMouseMove={
          allowMouseHover
            ? ({ clientX: x, clientY: y }) => this.setState({ clientX: x, clientY: y })
            : null
        }
      >
        <Div fillParent className={styles.body_container}>
          <Transition
            items={bodyType}
            key={bodyType => bodyType}
            from={fromAnimation}
            enter={enterAnimation}
            leave={leaveAnimation}
            config={{
              delay: this.previousBodyType == landingPageBody.NONE ? 500 : 0
            }}
          >
            {bodyType => this.getBodyContent(bodyType, screenSize)}
          </Transition>
        </Div>

        <Header
          key="header"
          isFirstTime={isFirstTime}
          isFullScreen={isFullScreen}
          showDescription={showDescription}
          clientX={clientX}
          clientY={clientY}
        />

        <HeaderDescription
          key="header-description"
          showDescription={showDescription}
          onClickProject={this.onClickProject}
          onClickTimeline={this.onClickTimeline}
          isFirstTime={isFirstTime}
          className={styles.header_description}
        />

        <ProfilePic
          screenSize={screenSize}
          key="profile-pic"
          isFirstTime={isFirstTime}
          isFullScreen={isFullScreen}
          onClickProfilePic={this.onClickProfilePic}
        />

        <HeaderLinks
          key="header-links"
          isFullScreen={isFullScreen}
          bodyType={bodyType}
          onClickTimeline={this.onClickTimeline}
          onClickProject={this.onClickProject}
        />
      </Div>
    );
  }
}

export default responsiveBreakpoint(Landing);
