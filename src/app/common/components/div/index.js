import React, { Component } from 'react';
import styles from './div.module.scss';
import {animated} from 'react-spring';

export default class Div extends Component {
  render() {
    const {
      row,
      alignCenter,
      justifyCenter,
      fillParent,
      className,
      children,
      animate,
      ...rest
    } = this.props;

    const classNameValue = `${row ? styles.div_row : styles.div_column}
    ${alignCenter ? styles.align_center : '' }
    ${justifyCenter ? styles.justify_center : ''}
    ${fillParent ? styles.fill_parent: ''}
    ${className}`

    if (animate) {
      return (
        <animated.div
          className={classNameValue}
          {...rest}
        >
          {children}
        </animated.div>
      )
    }

    return (
      <div className={classNameValue} {...rest}>
        {children}
      </div>
    )
  }
}