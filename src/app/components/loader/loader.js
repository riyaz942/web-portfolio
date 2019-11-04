import React, { Component } from 'react';
import Intro from '../intro/intro';
import styles from './loader.scss';
import { Math } from 'core-js';
import profilePic from '../../../images/profile-pic.jpeg';
import { loaderPageStates } from '../../constants/loaderConstants';

export default class Loader extends Component {
  constructor(props) {
    super(props);

    document.addEventListener('DOMContentLoaded', this.getTotalLoadingItems, false);
    window.addEventListener('load', this.completeLoading);

    this.state = {
      contentLoadedPercentage: 0,
      totalItems: 0,
      itemsLoaded: 0,
      pageState: loaderPageStates.IS_LOADING,
    }
  }

  preloadImage = (src) => {
    const image = new Image();
    image.src = src;

    return image;
  }

  getTotalLoadingItems = () => {
    // const scriptTags = Array.from(document.scripts);
    // const styleTags = Array.from(document.styleSheets);
    const images = Array.from(document.images);
    images.push(this.preloadImage(profilePic));

    this.setState({
      totalItems: images.length
    });

/*     if(scriptTags)
      scriptTags.forEach(element => {      
        element.onload = this.documentLoaded;
        element.onerror = this.documentLoaded;
      }); */

    if(images)
      images.forEach(element => {
        element.onload = this.documentLoaded;
        element.onerror = this.documentLoaded;
      });

/*     if(styleTags)
      styleTags.forEach(element => {
        debugger;
        element.onload = this.documentLoaded;
        element.onerror = this.documentLoaded; 
      }); */
  }

  documentLoaded = () => {
    const {
      totalItems,
      itemsLoaded
    } = this.state;

    this.setState({
      contentLoadedPercentage: Math.round((itemsLoaded+1/totalItems) * 100),
      itemsLoaded: itemsLoaded+1,
    });
  }

  completeLoading = () => {
    const { contentLoadedPercentage } = this.state;

    if (contentLoadedPercentage != 100)
      this.setState({ contentLoadedPercentage: 100 });

    setTimeout(()=>{
      this.setState({
        pageState: loaderPageStates.COMPLETED_LOADING,
      });
  
      setTimeout(()=>{
        this.setState({
          pageState: loaderPageStates.SHOW_INTRO
        })
      },800);
    }, 600);
  }

  onIntroAnimationEnd = () => {
    this.setState({
      pageState: loaderPageStates.SHOW_PAGE
    })
  }

  render() {
    const { children } = this.props;
    const { 
      contentLoadedPercentage,
      pageState,
    } = this.state;

    return (
      <div className={styles['loader-top-container']}>
        {pageState == loaderPageStates.SHOW_PAGE && children}

        <div className={`${styles['loader-container']} ${pageState == loaderPageStates.SHOW_PAGE ? styles['hide-loader-container'] : ''}`}>
          <div className={styles['overlay-reveal-container']}>
            <div className={
              `${styles['reveal-div']}
               ${pageState == loaderPageStates.COMPLETED_LOADING || pageState == loaderPageStates.SHOW_INTRO ? styles['start-reveal'] : ''}
               ${pageState == loaderPageStates.SHOW_INTRO ? styles['end-reveal'] : ''}`
              }
            />
          </div>
          {
            pageState == loaderPageStates.SHOW_INTRO || pageState == loaderPageStates.SHOW_PAGE ?
            <Intro onAnimationEnd={()=>this.onIntroAnimationEnd()}/>
            : (
              <div className={styles['percentage-text']}>
                {`${contentLoadedPercentage}%`}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
