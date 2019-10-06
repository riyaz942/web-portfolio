import React, { Component } from 'react';
import styles from './intro.scss';
import appStyles from '../../app.scss';
import { callbackify } from 'util';

export default class Intro extends Component{

  state = {
    divPositionX: 0,
    divPositionY: 0,
  }

  constructor(props) {
    super(props)

    this.refObject = {
      text1: {
        ref: React.createRef(),
        direction: 'init'
      },
      text2: {
        ref: React.createRef(),
        direction: 'bottom'
      },
      text3: {
        ref: React.createRef(),
        direction: 'right'
      },
      text4: {
        ref: React.createRef(),
        direction: 'bottom'
      },
      text5: {
        ref: React.createRef(),
        direction: 'bottom'
      },
      text6: {
        ref: React.createRef(),
        direction: 'right'
      },
      text7: {
        ref: React.createRef(),
        direction: 'bottom'
      },
      text8: {
        ref: React.createRef(),
        direction: 'bottom'
      },
    };
  }

  updatedivPositions(referenceObject) {
    const { ref : { current }, direction } = referenceObject;
    const { divPositionX, divPositionY } = this.state;
//console.log(this.myInput.current.offsetWidth)
    const objectWidth = current.offsetWidth;
    const objectHeight = current.offsetHeight;

    if (direction == 'right') {
      this.setState({
        divPositionX: divPositionX - (objectWidth/2)
      })
    } else if (direction == 'bottom') {

    }
  }

  render() {
    const introContainerStyle =  [
      appStyles['column'],
      appStyles['justify-center'],
      appStyles['align-center'],
      styles['intro-container'],
    ].join(' '); 

    const {
      divPositionY,
      divPositionX,
    } = this.state;

    return(
     <div className={introContainerStyle}>

       <div style={{
         position: 'absolute',
         transition: 'all 0.5s ease',
         top: `calc(50% - ${divPositionY}px)`,
         left: `calc(50% - ${divPositionX}px)`
       }}>
        <span ref={this.refObject.text1.ref} className={styles['intro-text']}>
          Hi,
        </span>

        <div className={`${appStyles['column']} ${appStyles['align-center']}`}>
          
          <div className={`${appStyles['row']} ${appStyles['align-center']}`}>
            <span ref={this.refObject.text2.ref} className={styles['intro-text']}>
              some text
            </span>
            <span  ref={this.refObject.text3.ref} className={styles['intro-text']}>
              some text that i don't like
            </span>
          </div>
          <span  ref={this.refObject.text4.ref} className={styles['intro-text']}>
            some text is below
          </span>
          <span  ref={this.refObject.text5.ref} className={styles['intro-text']}>
            another text
          </span>
       </div>

       <div className={`${appStyles['column']} ${appStyles['align-center']} ${styles['intro-text-container2']}`}>
          <span  ref={this.refObject.text6.ref} className={styles['intro-text']}>
            somdasdjasld
          </span>
          <span  ref={this.refObject.text7.ref} className={styles['intro-text']}>
            asdjalksfjslkdjf
          </span>
          <span  ref={this.refObject.text8.ref} className={styles['intro-text']}>
            asdjalksfjslkdjf
          </span>
        </div>
      </div>

     </div>
    )
  }
}
