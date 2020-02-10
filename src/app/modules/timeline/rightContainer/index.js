import React, { Component } from 'react';
import styles from './right_container.module.scss';
import Div from 'Common/components/div';
import map from 'lodash/map';

export default class RightContainer extends Component {
  render() {
    const slideValue =[
      { name: '1', isCentered: true},
      { name: '2', isCentered: false},
      { name: '3', isCentered: false},
      { name: '4', isCentered: false},
      { name: '5', isCentered: false},
      { name: '6', isCentered: false},
      { name: '7', isCentered: false},
      { name: '8', isCentered: false},
      { name: '9', isCentered: false},
      { name: '10', isCentered: false},
    ]
    return (
      <Div flex className={styles.right_container}>

        <Div row className={styles.slide_container}>
          {
            map(slideValue, slide => (
              <div className={`${styles.slide_items}`}>{`Slide ${slide.name}`}</div>
            ))
          }
        </Div>
          <Div row style={{flex: 1}}>
          <div>Previous</div>
          <div>Next</div>
          </Div>
      </Div>
    )
  }
}
