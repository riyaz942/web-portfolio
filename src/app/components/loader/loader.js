import React, { Component } from 'react';
import Intro from '../intro/intro';

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
        <Intro />
      </div>
    );
  }
}