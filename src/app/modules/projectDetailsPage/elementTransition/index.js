import React, { useEffect } from 'react';
import { useSpring, animated } from "react-spring";
import { getBackgroundAnimation, getImageAnimation, getBackgroundFullwidthPosition } from './helperFunctions';

const ElementTransition = ({ hideTransitionElement, project, listingPageImageRect, listingPageContainerRect, descriptionPageImageRect, reverseTransitionAnimation }) => {
  const [backgroundTransitionAnimation, setBackgroundTransitionAnimation] = useSpring(() => ({
    from: getBackgroundAnimation(listingPageContainerRect),
    to: getBackgroundFullwidthPosition()
  }));

  const [imageTransitionAnimation, setImageTransitionAnimation] = useSpring(() => ({
    from: getImageAnimation(listingPageImageRect),
    to: getImageAnimation(descriptionPageImageRect),
  }));

  useEffect(()=> {
    if (reverseTransitionAnimation) {
      setImageTransitionAnimation({
        from: getImageAnimation(descriptionPageImageRect),
        to: getImageAnimation(listingPageImageRect),        
      });

      setBackgroundTransitionAnimation({
        from: getBackgroundFullwidthPosition(),
        to: getBackgroundAnimation(listingPageContainerRect),        
      })
    }
  }, [reverseTransitionAnimation])

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
