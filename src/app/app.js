import React from 'react';
import styles from './app.scss';
import Intro from './modules/intro/intro';
import Landing from './modules/landing/landing';

function App() {
  return (
    <div className={styles.main_container}>
      <Landing />
    </div>
  );
}

export default App;
