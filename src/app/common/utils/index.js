import React from 'react';
import reactStringReplace from 'react-string-replace';

export const random = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const parseNewLine = object => {
  //const regexNewLine=/@(\w+)/g
  const newLineMatch = (match, index, offset) => {
    return (<br key={index} />);
  }

  return reactStringReplace(object, "<br/>", newLineMatch)
}

export const animationFrameTimeout = (callback, millisecond) => {
  const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

  let lastUpdated;
  let animationFrameRequest;

  const animationCallback =  (timestamp) => {
    if (lastUpdated == undefined)
      lastUpdated = timestamp;

    if (timestamp - lastUpdated >= millisecond) {
      callback();
      cancelAnimationFrame(animationFrameRequest);
    } else {
      animationFrameRequest = requestAnimationFrame.call(window,animationCallback)
    }
    
  };
  animationFrameRequest = requestAnimationFrame.call(window,animationCallback);
}

const cancelAnimationFrame = (animationFrameRequest) => {
  const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  cancelAnimationFrame.call(window, animationFrameRequest);
}