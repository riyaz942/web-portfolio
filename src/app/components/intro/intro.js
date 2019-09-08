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
        <div className={styles['intro-text']}>
          Hi,
        </div>

        <div className={`${appStyles['column']} ${appStyles['align-center']}`}>
          
          <div className={`${appStyles['row']} ${appStyles['align-center']}`}>
            <div className={styles['intro-text']}>
              some text
            </div>
            <div className={styles['intro-text']}>
              some text that i don't like
            </div>
          </div>
          <div className={styles['intro-text']}>
            some text is below
          </div>
          <div className={styles['intro-text']}>
            another text
          </div>
       </div>

       <div className={`${appStyles['column']} ${appStyles['align-center']} ${styles['intro-text-container2']}`}>
          <div className={styles['intro-text']}>
            somdasdjasld
          </div>
          <div className={styles['intro-text']}>
            asdjalksfjslkdjf
          </div>
          <div className={styles['intro-text']}>
            asdjalksfjslkdjf
          </div>
        </div>
      </div>

     </div>
    )
  }
}
