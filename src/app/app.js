import React from 'react';
import styles from './app.scss';
import Intro from './components/intro/intro';
import Landing from './components/landing/landing';

function App() {
  return (
    <div className={styles['main-container']}>
      <Landing />
    </div>
  );
}

export default App;
