import React from 'react';
import styles from './app.scss';
import Intro from './components/intro/intro';

function App() {
  return (
    <div className={styles['main-container']}>
      <Intro />
    </div>
  );
}

export default App;
