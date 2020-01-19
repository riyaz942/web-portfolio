import React, { Component } from 'react';
import styles from './page_reveal.scss';

const PageReveal = ({animate}) => {

  return (
    <div className={styles['revealer']}>
      <div className={`${styles['revealer-layer']} ${animate ? styles['animate-layer']:''}`} />
      <div className={`${styles['revealer-layer']} ${animate ? styles['animate-layer']:''}`} />
    </div>
  );
}

export default PageReveal;