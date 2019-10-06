import React, { Component } from 'react';
import styles from './intro.scss';
import appStyles from '../../app.scss';

export default class Intro extends Component{

  render() {
    const introContainerStyle =  [
      appStyles['column'],
      appStyles['justify-center'],
      appStyles['align-center'],
      styles['intro-container'],
    ].join(' '); 

    return(
     <div className={introContainerStyle}>

       <div>
        <span className={styles['intro-text']}>
          Hi,
        </span>

        <div className={`${appStyles['column']} ${appStyles['align-center']}`}>
          
          <div className={`${appStyles['row']} ${appStyles['align-center']}`}>
            <span className={styles['intro-text']}>
              some text
            </span>
            <span className={styles['intro-text']}>
              some text that i don't like
            </span>
          </div>
          <span className={styles['intro-text']}>
            some text is below
          </span>
          <span className={styles['intro-text']}>
            another text
          </span>
       </div>

       <div className={`${appStyles['column']} ${appStyles['align-center']} ${styles['intro-text-container2']}`}>
          <span className={styles['intro-text']}>
            somdasdjasld
          </span>
          <span className={styles['intro-text']}>
            asdjalksfjslkdjf
          </span>
          <span className={styles['intro-text']}>
            asdjalksfjslkdjf
          </span>
        </div>
      </div>

     </div>
    )
  }
}
