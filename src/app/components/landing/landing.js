import React, { Component } from 'react';
import styles from './landing.scss';
import Header from '../header/header';
import Timeline from '../timeline/timeline';
import Intro from '../intro/intro';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    document.addEventListener('DOMContentLoaded', this.getTotalLoadingItems, false);
  }

  getTotalLoadingItems = () => {
    // const scriptTags = Array.from(document.scripts);
    // const styleTags = Array.from(document.styleSheets);
    const images = Array.from(document.images);

/*     if(scriptTags)
      scriptTags.forEach(element => {      
        element.onload = ()=> this.documentLoaded('script');
        element.onerror = ()=> this.documentLoaded('script');
      }); */

    if(images)
      images.forEach(element => {
        element.onload = ()=> this.documentLoaded('images');
        element.onerror = ()=> this.documentLoaded('images');
      });

/*     if(styleTags)
      styleTags.forEach(element => {
        debugger;
        element.onload = ()=> this.documentLoaded('images');
        element.onerror = ()=> this.documentLoaded('images');  
      }); */
  }

  documentLoaded = (value) => {
    console.log('Document Loaded :', value);
  }

/*   showPageLoadTime() {
    const perfData = window.performance.timing; // The PerformanceTiming interface
    const EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart); // Calculated Estimated Time of Page Load which returns negative value.
    const time = parseInt((EstimatedTime/1000)%60)*100; //Converting EstimatedTime from miliseconds to seconds.

    console.log('percentage :', time);
  } */

  componentDidMount() {
    console.log('componentDidMount called');
    window.addEventListener('load', this.handleLoad);
 }

 handleLoad = () => {
   console.log('documents loaded including image');
 }

  render() {
    return (
      <Intro>
        <div className={styles['landing-container']}>
          <Header />
          <div className={styles['body-container']}>
            <Timeline />
          </div>
        </div>
      </Intro>      
    );
  }
}