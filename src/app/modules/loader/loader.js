import React, { Component, Fragment } from 'react';
import Intro from '../intro/intro';
import styles from './loader.scss';
import { loaderPageStates } from '../../constants/loaderConstants';
import { Transition, Spring } from 'react-spring/renderprops';
import Div from 'Common/components/div';

const assetsImages = require.context(`../../../assets/images`, false, /.*\.png$|jpg$|jpeg$/);
const assetTechnologyImages = require.context(`../../../assets/images/technology`, false, /.*\.png$|jpg$/);
const projectImages = require.context(`../../../assets/images/projectImages/snapteam`, false, /.*\.png$|jpg$/);

export default class Loader extends Component {
  requestFrameLastUpdated = 0;
  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  
  itemsLoaded = 0;

  constructor(props) {
    super(props);
    this.state = {
      contentLoadedPercentage: 0,
      totalItems: 0,
      itemsLoaded: 0,
      pageState: loaderPageStates.IS_LOADING,
      disableIntro: false,
    }
  }

  componentDidMount() {
    this.getTotalLoadingItems();
  }

  //---------------------------------------- called after DomContentLoad
  getTotalLoadingItems = () => {
    const images = Array.from(document.images);

    this.getImagesFromContext(assetsImages).map(image => images.push(this.preloadImage(image)));
    this.getImagesFromContext(assetTechnologyImages).map(image => images.push(this.preloadImage(image)));
    this.getImagesFromContext(projectImages).map(image => images.push(this.preloadImage(image)));
    import("Modules/landing/landing").then(Landing => { this.incrementLoading() }); // increment manually being called.
    import("Modules/projectDetailsPage").then(ProjectDetailsPage => { }); // Asyncronysly complete on background. //Todo unless if its the projects page .. use routeMatch 

    // TODO .. if all the components are loaded then don't show loader and directly call isComplete;

    //If all the items are loaded immediatly then the 
    this.setState({ totalItems: images.length + 3 });
    let areImagesLoaded = true;

    if (images)
      images.forEach(element => {
        element.onload = this.incrementLoading;
        element.onerror = this.incrementLoading;
        if(areImagesLoaded) {
          areImagesLoaded = element.complete;
          console.log('images loaded', element);
        }
      });

    if (areImagesLoaded) {
      this.completeLoading(true); // immediatly load page.
    }
  }


  //---------------------------------------- Helper Functions
  getImagesFromContext = (images) => {
    const extractedImages = [];
    images.keys().forEach((key) => {
      extractedImages.push(images(key));
    });

    return extractedImages;
  }

  preloadImage = (src) => {
    // console.log('Preloading :', src);
    const image = new Image();
    image.src = src;
    // image.complete;
    return image;
  }


  /*--------------------------------------Loading Functions */
  incrementLoading = () => {
    const {
      totalItems,
      itemsLoaded,
    } = this.state;

    this.setState({
      contentLoadedPercentage: Math.trunc(((itemsLoaded + 1) / totalItems) * 100),
      itemsLoaded: itemsLoaded + 1,
    });

    if ((itemsLoaded + 1) == totalItems) {
      this.completeLoading();
    } else if (totalItems - (itemsLoaded + 1) <= 2) {
      // This condition checks if the items loaded then manually loads it by its self
      setTimeout(() => {
        this.incrementLoading();
      }, 500);
    }
  }


  completeLoading = (showImmediately) => {
    const { contentLoadedPercentage, disableIntro } = this.state;

    if (showImmediately) {
      return this.setState({
        pageState: loaderPageStates.SHOW_PAGE
      });
    }

    if (contentLoadedPercentage != 100) // if by chance its not 100 then show 100 on page
      this.setState({ contentLoadedPercentage: 100 });

    this.setState({
      pageState: loaderPageStates.COMPLETED_LOADING, // complete loading animation takes around 400 ms to hide
    });

    // so created a timeout to not show content immediately
    setTimeout(() => {
      if (!disableIntro) {
        this.setState({
          pageState: loaderPageStates.SHOW_INTRO
        });
      } else {
        this.setState({
          pageState: loaderPageStates.SHOW_PAGE
        });
      }
    }, 500);
  }


  onIntroAnimationEnd = () => {
    this.setState({
      pageState: loaderPageStates.SHOW_PAGE
    });
  }

  render() {
    const { children } = this.props;
    const {
      contentLoadedPercentage,
      pageState,
    } = this.state;

    return (
      <Div className={styles.loader_top_container}>
        {pageState == loaderPageStates.SHOW_PAGE && children}
        {/* LOADER */}
        <Transition
          items={pageState}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {pageState => pageState == loaderPageStates.IS_LOADING && (
            props => (
              <Div row fillParent style={props} className={styles.loader_container}>
                <div className={styles.loading_text}>Loading ...</div>

                <Spring
                  to={{ width: `${contentLoadedPercentage}vw`, x: contentLoadedPercentage }}
                >
                  {props => (
                    <Div animate row className={styles.loader_width_percentage} style={props}>
                      <div className={styles.percentage_text}>{Math.floor(props.x)}</div>
                    </Div>
                  )}
                </Spring>
              </Div>

            )
          )}
        </Transition>


        {/* Intro Animation */}
        <Transition
          items={pageState}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {pageState => pageState == loaderPageStates.SHOW_INTRO && (props =>
            <Intro style={props} onAnimationEnd={() => this.onIntroAnimationEnd()} />
          )}
        </Transition>

      </Div>
    );
  }
}
