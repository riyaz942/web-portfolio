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
        <div style={{
          flex: 1,
          marginTop: 100
        }}>
          body askdj
          asdas
          defaultsda
          sd
          asdasas
          defaultasd
          asdasda
          defaultasdas
          defaultasdsda
          sdas
          defaultasdsdaas
        </div>
      </div>
    )
  }
}