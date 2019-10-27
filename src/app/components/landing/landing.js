import React, { Component } from 'react';
import styles from './landing.scss';
import Header from '../header/header';

export default class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['landing-container']}>
        <Header />
      </div>
    )
  }
}