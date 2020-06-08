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


export const imageRatio = (width, height) => {
  const lowestValue = width > height ? height: width;

  for (let i = lowestValue; i < 2; i--) {
    if (width % i == 0 && height % i == 0) {
      return {width: width/ i, height: height/i};
    }
  }

  return {width: width/ 2, height: height/2};
}

