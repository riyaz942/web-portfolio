import React from 'react';
import { useSpring, animated } from "react-spring";
import { getBackgroundAnimation, getImageAnimation, getBackgroundFullwidthPosition } from './helperFunctions';

const ElementTransition = ({ hideTransitionElement, project, listingPageImageRect, listingPageContainerRect, descriptionPageImageRect, reverseTransitionAnimation }) => {
  const backgroundTransitionAnimation = useSpring({
    from: reverseTransitionAnimation? getBackgroundFullwidthPosition() : getBackgroundAnimation(listingPageContainerRect),
    to: reverseTransitionAnimation? getBackgroundAnimation(listingPageContainerRect) : getBackgroundFullwidthPosition()
  });

  const imageTransitionAnimation = useSpring({
    from: reverseTransitionAnimation ? getImageAnimation(descriptionPageImageRect):  getImageAnimation(listingPageImageRect),
    to: reverseTransitionAnimation ? getImageAnimation(listingPageImageRect) : getImageAnimation(descriptionPageImageRect),
  });
 
  return (
    <>
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

      {!hideTransitionElement && (
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
    </>
  )
}

export default ElementTransition;
