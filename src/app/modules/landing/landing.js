import React, { Component } from 'react';
import styles from './landing.scss';
import Header from '../header/header';
import Timeline from '../timeline/timeline';
import Loader from '../loader/loader';
import { landingPageBody } from '../../constants/landingConstants';
import Projects from '../projects/projects';
import Div from 'Common/components/div';

export default class Landing extends Component {
  state = {
    bodyType: landingPageBody.NONE
  }

  updateBodyType = (bodyType) => {
    this.setState({ bodyType });
  }

  render() {
    const { bodyType } = this.state;

    return (
        <Div className={styles.landing_container}>
          <Loader>
            <React.Fragment>
              <Header updateBodyType={this.updateBodyType} />
              <div className={styles.body_container}>
                {bodyType == landingPageBody.TIMELINE && <Timeline />}
                {bodyType == landingPageBody.PROJECT && <Projects />}
              </div>
            </React.Fragment>
          </Loader>      
        </Div>
    );
  }
}