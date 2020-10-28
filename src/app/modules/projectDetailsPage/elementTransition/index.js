import React, { Component, Fragment } from 'react';
import { useSpring, animated } from "react-spring";
import isEmpty from "lodash/isEmpty";
import { getBackgroundAnimation, getImageAnimation } from './helperFunctions';

const ElementTransition = ({ hideTransitionElement, project, sourceImage, sourceContainer, destinationImage }) => {
  const backgroundTransitionAnimation = useSpring({
    from: getBackgroundAnimation(sourceContainer).from,
    to: getBackgroundAnimation(sourceImage).to
  });

  console.log({
    anotherSomething: {
      sourceImage,
      destinationImage
    },
    something: {
      from: getImageAnimation(sourceImage),
      to: getImageAnimation(destinationImage),
    }
  });

  const imageTransitionAnimation = useSpring({
    from: getImageAnimation(sourceImage),
    to: getImageAnimation(destinationImage),
  });


  return (
    <Fragment>
      <animated.div
        style={{
          ...backgroundTransitionAnimation,
          position: "absolute",
          background: "white",
          left: 0,
          right: 0,
          zIndex: -3
        }}
      />

      {!hideTransitionElement && !isEmpty(destinationImage) && (
        <animated.img
          src={project.icon}
          style={{
            ...imageTransitionAnimation,
            objectFit: "contain",
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: 2
          }}
        />
      )}
    </Fragment>
  )
}

export default ElementTransition;
