import React, { Component } from 'react';
import styles from './div.module.scss';

export default class Div extends Component {
  render() {
    const {
      row,
      alignCenter,
      justifyCenter,
      fillParent,
      className,
      children,
    } = this.props;

    return (
      <div className={`
        ${row ? styles.div_row : styles.div_column}
        ${alignCenter ? styles.align_center : '' }
        ${justifyCenter ? styles.justify_center : ''}
        ${fillParent ? styles.fill_parent: ''}
        ${className}
      `}>
        {children}
      </div>
    )
  }
}