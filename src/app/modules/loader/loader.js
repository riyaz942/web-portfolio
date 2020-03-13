import React, { Component, Fragment } from "react";
import Intro from "../intro/intro";
import styles from "./loader.scss";
import { loaderPageStates } from "../../constants/loaderConstants";
import { Transition, Spring } from "react-spring/renderprops";
import Div from "Common/components/div";
import { withRouter, matchPath } from 'react-router';
import { CookieService } from "Common/utils/cookieService";
import MobileOverlay from 'Modules/mobileOverlay';

const assetsImages = require.context(
  `../../../assets/images`,
  false,
  /.*\.png$|jpg$|jpeg$/
);
const assetTechnologyImages = require.context(
  `../../../assets/images/technology`,
  false,
  /.*\.png$|jpg$/
);
const projectImages = require.context(
  `../../../assets/images/projectImages/snapteam`,
  false,
  /.*\.png$|jpg$/
);

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentLoadedPercentage: 0,
      totalItems: 0,
      pageState: loaderPageStates.IS_LOADING,
      disableIntro: false
    };

    this.lastUpdated = 0;
    this.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    this.cancelAnimationFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    this.itemsLoaded = 0;
  }

  componentDidMount() {
    this.getTotalLoadingItems();
  }

  //---------------------------------------- called after DomContentLoad
  getTotalLoadingItems = () => {
    const { location } = this.props;
    const images = Array.from(document.images);

    this.getImagesFromContext(assetsImages).map(image =>
      images.push(this.preloadImage(image))
    );
    this.getImagesFromContext(assetTechnologyImages).map(image =>
      images.push(this.preloadImage(image))
    );
    this.getImagesFromContext(projectImages).map(image =>
      images.push(this.preloadImage(image))
    );
    import("Modules/landing/landing").then(Landing => {
      this.incrementLoading();
    }); // increment manually being called.
    import("Modules/projectDetailsPage").then(ProjectDetailsPage => {}); // Asyncronysly complete on background. //Todo unless if its the projects page .. use routeMatch

    this.setState({ totalItems: images.length + 3 });
    let areImagesLoaded = true;

    if (images)
      images.forEach(element => {
        element.onload = this.incrementLoading;
        element.onerror = this.incrementLoading;
        if (areImagesLoaded) {
          areImagesLoaded = element.complete;
        }
      });

    if (areImagesLoaded) {
      this.completeLoading(true); // immediatly load page.
    } else {
      const introAlreadyShown = CookieService.get('INTRO_COMPLETED');
      const match = matchPath(location.pathname, {
        path: "/project/:projectSlug?",
        exact: true,
        strict: false
      });
      
      if (match && introAlreadyShown) {
        // Todo also check if intro animation is done or not ... if not the make this condition false
        this.completeLoading(true); // immediatly load page.
      } else {
        this.animationFrameRequest = this.requestAnimationFrame.call(
          window,
          this.valuateProgress
        );
      }      
    }
  };

  // This function is called every 300 millisecond to update the progress bar
  // Because if we keep updating the progress bar on callback of items loaded then the animation suffers
  valuateProgress = timeStamp => {
    const { totalItems } = this.state;
    const isLastPercentage = totalItems - this.itemsLoaded <= 2;
    const updateStateAfter = isLastPercentage? 600: 400;  //600 ms for the last 2 percentage

    if (timeStamp - this.lastUpdated >= updateStateAfter /*ms*/) {
      this.lastUpdated = timeStamp;

      // manually incrementing the progress for the last 2 percent to make a seemless animation.
      if (isLastPercentage) {
        this.itemsLoaded = this.itemsLoaded + 1;
      }

      this.setState({
        contentLoadedPercentage: Math.trunc(
          (this.itemsLoaded / totalItems) * 100
        )
      });
    }

    if (this.itemsLoaded >= totalItems) {
      this.completeLoading();
      this.cancelAnimationFrame.call(window, this.animationFrameRequest);
      return;
    } else {
      this.animationFrameRequest = this.requestAnimationFrame.call(
        window,
        this.valuateProgress
      );
    }
  };

  //---------------------------------------- Helper Functions
  getImagesFromContext = images => {
    const extractedImages = [];
    images.keys().forEach(key => {
      extractedImages.push(images(key));
    });

    return extractedImages;
  };

  preloadImage = src => {
    // console.log('Preloading :', src);
    const image = new Image();
    image.src = src;
    // image.complete;
    return image;
  };

  /*--------------------------------------Loading Functions */
  incrementLoading = () => {
    this.itemsLoaded = this.itemsLoaded + 1;
  };

  completeLoading = showImmediately => {
    const { contentLoadedPercentage, disableIntro } = this.state;
    const introAlreadyShown = CookieService.get('INTRO_COMPLETED');

    if (showImmediately) {
      return this.setState({
        pageState: loaderPageStates.SHOW_PAGE
      });
    }

    if (contentLoadedPercentage != 100)
      // if by chance its not 100 then show 100 on page
      this.setState({ contentLoadedPercentage: 100 });

    this.setState({
      pageState: loaderPageStates.COMPLETED_LOADING // complete loading animation takes around 400 ms to hide
    });

    // so created a timeout to not show content immediately
    setTimeout(() => {
      if (!disableIntro && !introAlreadyShown) {
        this.setState({
          pageState: loaderPageStates.SHOW_INTRO
        });
      } else {
        this.setState({
          pageState: loaderPageStates.SHOW_PAGE
        });
      }
    }, 500);
  };

  onIntroAnimationEnd = () => {
    this.setState({pageState: loaderPageStates.INTRO_COMPLETED});

    setTimeout(()=>{
      this.setState({
        pageState: loaderPageStates.SHOW_PAGE
      });  
    }, 500);
  };

  render() {
    const { children } = this.props;
    const { contentLoadedPercentage, pageState } = this.state;

    return (
      <Div className={styles.loader_top_container}>
        <MobileOverlay />
        {pageState == loaderPageStates.SHOW_PAGE && children}
        {/* LOADER */}
        <Transition
          items={pageState}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {pageState =>
            pageState == loaderPageStates.IS_LOADING &&
            (props => (
              <Div
                row
                fillParent
                style={props}
                className={styles.loader_container}
              >
                <div className={styles.loading_text}>Loading ...</div>

                <Spring
                  to={{
                    width: `${contentLoadedPercentage}vw`,
                    x: contentLoadedPercentage
                  }}
                  config={{ mass: 10, tension: 550, friction: 120  }}
                >
                  {props => (
                    <Div
                      animate
                      row
                      className={styles.loader_width_percentage}
                      style={props}
                    >
                      <div className={styles.percentage_text}>
                        {Math.floor(props.x)}
                      </div>
                    </Div>
                  )}
                </Spring>
              </Div>
            ))
          }
        </Transition>

        {/* Intro Animation */}
        <Transition
          items={pageState}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {pageState =>
            pageState == loaderPageStates.SHOW_INTRO &&
            (props => (
              <Intro
                style={props}
                onAnimationEnd={() => this.onIntroAnimationEnd()}
              />
            ))
          }
        </Transition>
      </Div>
    );
  }
}


export default withRouter(Loader);
