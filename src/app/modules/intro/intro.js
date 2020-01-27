import React, { Component } from 'react';
import styles from './intro.scss';
import Div from 'Common/components/div';

export default class Intro extends Component {
  // Hi There,
  // Welcome ...... to my portfolio website
  // This message has no point to it
  // Just showing of this animation :p

  state = {
    divPositionX: 96, // fall back
    divPositionY: 31, // fall back
    refObject: [
      {
        ref: React.createRef(),
        direction: 'init',
        isVisible: true,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'right',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'bottom-center',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'right',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
      {
        ref: React.createRef(),
        direction: 'bottom',
        isVisible: false,
      },
    ]
  }

  componentDidMount() {
    const { onAnimationEnd } = this.props;
    onAnimationEnd();
    // this.updatedivPositions(0);

    // setTimeout(()=> {
    //   this.updatedivPositions(1);

    //   setTimeout(()=> {
    //     this.updatedivPositions(2);

    //     setTimeout(()=> {
    //       this.updatedivPositions(3);

    //         setTimeout(()=> {
    //         this.updatedivPositions(4);

    //         setTimeout(()=> {
    //           this.updatedivPositions(5);
    
    //           setTimeout(()=> {
    //             this.updatedivPositions(6);

    //             setTimeout(()=> {
    //               onAnimationEnd();
    //             },1000);        

    //           },1100);  
    
    //          },1000);
        
    //       },1000);

    //     },1000);
   
    //   },1000);
       
    // },1000);
    
  }

  updatedivPositions(referenceObjectIndex) {
    const { divPositionX, divPositionY, refObject } = this.state;
    const { ref : { current }, direction } = refObject[referenceObjectIndex];
//console.log(this.myInput.current.offsetWidth)
    const objectWidth = current.offsetWidth;
    const objectHeight = current.offsetHeight;

    //NOTE:- created this because the span has an additional padding above and below the text 
    //So the text doesn't look centered aligned although it is programatically correct
    const componentHeightPadding = 15; 

    if (direction == 'right') {
      let finalObjectWidth = objectWidth/2;
      if (refObject[referenceObjectIndex-1].direction == 'bottom') {
        const previousRef = refObject[referenceObjectIndex-1].ref;
        finalObjectWidth += previousRef.current.offsetWidth/2;
      }

      refObject[referenceObjectIndex] = {...refObject[referenceObjectIndex], isVisible: true }
      this.setState({
        divPositionX: divPositionX + finalObjectWidth,
        refObject
      })
    } else if (direction == 'bottom') {
      const resultDivPositionY = Math.abs((divPositionY + componentHeightPadding) + (objectHeight/2));
      refObject[referenceObjectIndex] = {...refObject[referenceObjectIndex], isVisible: true }

      this.setState({
        divPositionY: resultDivPositionY,
        refObject
      });

    } else if (direction == 'bottom-center') {
      const previousRef = refObject[referenceObjectIndex - 1 ].ref;
      const secondPreviousRef = refObject[referenceObjectIndex - 2].ref;
      const previousObjectWidth = previousRef.current.offsetWidth;
      const secondPreviousObjectWidth = secondPreviousRef.current.offsetWidth;

      const resultDivPositionX = Math.abs((secondPreviousObjectWidth/2 + previousObjectWidth /2)); // TODO rethink
      const resultDivPositionY = Math.abs((divPositionY + componentHeightPadding) + (objectHeight/2));
      refObject[referenceObjectIndex] = {...refObject[referenceObjectIndex], isVisible: true }

      this.setState({
        divPositionX: resultDivPositionX,
        divPositionY: resultDivPositionY,
        refObject
      });
    } else if (direction == 'init') {
      this.setState({
        divPositionX: objectWidth/2,
        divPositionY: (objectHeight + componentHeightPadding)/2
      })
    }
  }

  render() {
    const {
      divPositionY,
      divPositionX,
      refObject,
    } = this.state;

    return (
     <Div justifyCenter alignCenter className={styles.intro_container}>
        <div style={{
          position: 'absolute',
          transition: 'all 0.5s ease',
          top: `calc(50% - ${divPositionY}px)`,
          left: `calc(50% - ${divPositionX}px)`
        }}>

        <div>
          <span ref={refObject[0].ref} className={styles.intro_text}>
            Hi There,
          </span>
        </div>

        <div className={styles.inline_container}>
          <Div row alignCenter>
            <span ref={refObject[1].ref} className={`${styles.intro_text} ${styles.animate_bottom} ${refObject[1].isVisible? styles.animate : ''}`}>
              Welcome &nbsp;
            </span>
            <span  ref={refObject[2].ref} className={`${styles.intro_text} ${styles.animate_right} ${refObject[2].isVisible? styles.animate : ''}`}>
              Just so you know
            </span>
          </Div>
          <span  ref={refObject[3].ref} className={`${styles.intro_text} ${styles.animate_bottom} ${refObject[3].isVisible? styles.animate : ''}`}>
            this website was made
          </span>
        </div>

        <Div row>
          <span 
            ref={refObject[4].ref}
            className={`${styles.intro_text} ${styles.animate_bottom} ${refObject[4].isVisible? styles.animate : ''}`}
            style={{marginLeft: 241}}>
            
            with React &nbsp;
            {/*Margin left would be variable at somepoint in the future*/}
          </span>
          <Div alignCenter>
            <span  ref={refObject[5].ref} className={`${styles.intro_text} ${styles.animate_right} ${refObject[5].isVisible? styles.animate : ''}`}>
              and not some yucky website builder.
            </span>
            <span  ref={refObject[6].ref} className={`${styles.intro_text} ${styles.animate_bottom} ${refObject[6].isVisible? styles.animate : ''}`}>
              &#128523;
            </span>
          </Div>
        </Div>

      </div>
     </Div>
    )
  }
}
