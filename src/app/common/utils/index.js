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
