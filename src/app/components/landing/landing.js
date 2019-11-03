import React, { Component } from 'react';
import styles from './landing.scss';
import Header from '../header/header';
import Timeline from '../timeline/timeline';
import Loader from '../loader/loader';

export default class Landing extends Component {
  render() {
    return (
        <div className={styles['landing-container']}>
          <Loader>
            <React.Fragment>
              <Header />
              <div className={styles['body-container']}>
                <Timeline />
              </div>
            </React.Fragment>
          </Loader>      
        </div>
    );
  }
}