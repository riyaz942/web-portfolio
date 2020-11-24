import React, { Component } from 'react';
import styles from './intro.scss';
import Div from 'Common/components/div';
import { CookieService } from "Common/utils/cookieService";
import { animationFrameTimeout } from 'Common/utils';

export default class Intro extends Component {
  secondDivMargin = 102; // fallback
  state = {
    divPositionX: 96, // fall back
    divPositionY: 31, // fall back
    showAnimationContainer: false,
    refObject: [
      {
        ref: React.createRef(),
        direction: 'init',
        isVisible: true,
        nextTimeoutDuration: 1500,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
        nextTimeoutDuration: 1100,
      },
      {
        ref: React.createRef(),
        direction: 'right',
        isVisible: false,
        nextTimeoutDuration: 1200,
      },
      {
        ref: React.createRef(),
        direction: 'bottom-center',
        isVisible: false,
        nextTimeoutDuration: 900,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
        nextTimeoutDuration: 1300,
      },
      {
        ref: React.createRef(),
        direction: 'right',
        isVisible: false,
        nextTimeoutDuration: 1400,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
        nextTimeoutDuration: 1000,
      },
    ]
  }

  componentDidMount() {
    animationFrameTimeout(() => {
      this.animateNext(0);
      this.setState({ showAnimationContainer: true })
    }, 600)
  }

  animateNext = (index) => {
    const { refObject } = this.state;

    this.updateDivPositions(index);

    if (index < refObject.length - 1) {
      //Setting the leftMargin of the second div
      if(index == 3 && refObject[3].ref.current && refObject[4].ref.current) {
        this.secondDivMargin = refObject[3].ref.current.offsetWidth/2 - refObject[4].ref.current.offsetWidth/2;
      }
      animationFrameTimeout(() => this.animateNext(index + 1), refObject[index].nextTimeoutDuration);
    } else {
      const { onAnimationEnd } = this.props;
      CookieService.set('INTRO_COMPLETED', true);
      animationFrameTimeout(()=>onAnimationEnd(), refObject[index].nextTimeoutDuration)      
    }
  }

  updateDivPositions(referenceObjectIndex) {
    const { divPositionX, divPositionY, refObject } = this.state;
    const { ref: { current }, direction } = refObject[referenceObjectIndex];
    //console.log(this.myInput.current.offsetWidth)
    const objectWidth = current.offsetWidth;
    const objectHeight = current.offsetHeight;

    //NOTE:- created this because the span has an additional padding above and below the text 
    //So the text doesn't look centered aligned although it is programatically correct
    const componentHeightPadding = 15;

    if (direction == 'right') {
      let finalObjectWidth = objectWidth / 2;
      if (refObject[referenceObjectIndex - 1].direction == 'bottom') {
        const previousRef = refObject[referenceObjectIndex - 1].ref;
        finalObjectWidth += previousRef.current.offsetWidth / 2;
      }

      refObject[referenceObjectIndex] = { ...refObject[referenceObjectIndex], isVisible: true }
      this.setState({
        divPositionX: divPositionX + finalObjectWidth,
        refObject
      })
    } else if (direction == 'bottom') {
      const resultDivPositionY = Math.abs((divPositionY + componentHeightPadding) + (objectHeight / 2));
      refObject[referenceObjectIndex] = { ...refObject[referenceObjectIndex], isVisible: true }

      this.setState({
        divPositionY: resultDivPositionY,
        refObject
      });

    } else if (direction == 'bottom-center') {
      const previousRef = refObject[referenceObjectIndex - 1].ref;
      const secondPreviousRef = refObject[referenceObjectIndex - 2].ref;
      const previousObjectWidth = previousRef.current.offsetWidth;
      const secondPreviousObjectWidth = secondPreviousRef.current.offsetWidth;

      const resultDivPositionX = Math.abs((secondPreviousObjectWidth / 2 + previousObjectWidth / 2)); // TODO rethink
      const resultDivPositionY = Math.abs((divPositionY + componentHeightPadding) + (objectHeight / 2));
      refObject[referenceObjectIndex] = { ...refObject[referenceObjectIndex], isVisible: true }

      this.setState({
        divPositionX: resultDivPositionX,
        divPositionY: resultDivPositionY,
        refObject
      });
    } else if (direction == 'init') {
      this.setState({
        divPositionX: objectWidth / 2,
        divPositionY: (objectHeight + componentHeightPadding) / 2,
      })
    }
  }

  render() {
    const {
      divPositionY,
      divPositionX,
      refObject,
      showAnimationContainer,
    } = this.state;
    const { style } = this.props;

    return (
      <Div justify align style={style} className={styles.intro_container}>
        <div style={{
          opacity: showAnimationContainer ? 1 : 0,
          position: 'absolute',
          transition: 'all 0.5s ease',
          top: `calc(50% - ${divPositionY}px)`,
          left: `calc(50% - ${divPositionX}px)`
        }}
        >
          <div>
            <span ref={refObject[0].ref} className={styles.intro_text}>
              Hi There,
          </span>
          </div>

          <div className={styles.inline_container}>
            <Div row align>
              <div ref={refObject[1].ref} className={`${styles.intro_text} ${styles.reveal_animate_skew} ${refObject[1].isVisible ? styles.animate : ''}`}>
                Welcome &nbsp;
            </div>
              <div className={styles.reveal_container}>
                <span ref={refObject[2].ref} className={`${styles.intro_text} ${styles.reveal_animate_right} ${refObject[2].isVisible ? styles.animate : ''}`}>
                  Just so you know
              </span>
              </div>
            </Div>
            <div ref={refObject[3].ref} className={`${styles.intro_text} ${styles.flip_animate_top} ${refObject[3].isVisible ? styles.animate : ''}`}>
              There is actually no point
          </div>
          </div>

          <Div row style={{ overflow: 'hidden' }}>
            <span
              ref={refObject[4].ref}
              className={`${styles.intro_text} ${styles.reveal_animate_top} ${refObject[4].isVisible ? styles.animate : ''}`}
              style={{ marginLeft: this.secondDivMargin }}>

              to this sentence,
            {/*Margin left would be variable at somepoint in the future*/}
            </span>
            <Div align>
              <span ref={refObject[5].ref} className={`${styles.intro_text} ${styles.animate_right} ${refObject[5].isVisible ? styles.animate : ''}`}>
                &nbsp; Just wanted to show off this animation
              </span>
              <span ref={refObject[6].ref} className={`${styles.intro_text} ${styles.reveal_center_animate_skew} ${refObject[6].isVisible ? styles.animate : ''}`}>
                🙈
            </span>
           </Div>
          </Div>

        </div>

        <div className={styles.cover_reveal_container}>
          <div className={`${styles.cover_reveal_layer} ${styles.animate_layer}`}>
          </div>
        </div>
      </Div>
    )
  }
}
