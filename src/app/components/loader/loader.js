import React, { Component } from 'react';
import Intro from '../intro/intro';
import styles from './loader.scss';
import { Math } from 'core-js';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    document.addEventListener('DOMContentLoaded', this.getTotalLoadingItems, false);
    window.addEventListener('load', this.completeLoading);

    this.state = {
      contentLoadedPercentage: 0,
      totalItems: 0,
      itemsLoaded: 0,
      isCompletelyLoaded: false,
      showIntro: false,
      hideIntroContainer: false,
    }
  }

  getTotalLoadingItems = () => {
    // const scriptTags = Array.from(document.scripts);
    // const styleTags = Array.from(document.styleSheets);
    const images = Array.from(document.images);

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
    setTimeout(()=>{
      this.setState({
        contentLoadedPercentage: 100,
        isCompletelyLoaded: true,
      });
  
      setTimeout(()=>{
        this.setState({
          showIntro: true
        })
      },800);

    }, 600);
  }

  onIntroAnimationEnd = () => {
    this.setState({
      hideIntroContainer: true
    })
  }

  render() {
    const { children } = this.props;
    const { 
      contentLoadedPercentage,
      isCompletelyLoaded,
      showIntro,
      hideIntroContainer,
    } = this.state;

    return (
      <div className={styles['loader-top-container']}>
        {children}
        <div className={`${styles['loader-container']} ${hideIntroContainer ? styles['hide-loader-container'] : ''}`}>
          <div className={styles['overlay-reveal-container']}>
            <div className={`${styles['reveal-div']} ${isCompletelyLoaded ? styles['start-reveal'] : ''} ${showIntro ? styles['end-reveal'] : ''}`} />
          </div>
          {
            showIntro ?
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
