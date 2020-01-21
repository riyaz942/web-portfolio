import React from 'react';
import styles from './app.scss';
import Intro from './modules/intro/intro';
import Landing from './modules/landing/landing';
import Div from 'Common/components/Div';

function App() {
  return (
    <Div className={styles.main_container}>
      <Landing />
    </Div>
  );
}

export default App;
