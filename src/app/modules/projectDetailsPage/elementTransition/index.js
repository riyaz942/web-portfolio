import React, { Component, Fragment } from 'react';
import { useSpring, animated } from "react-spring";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";

const getBackgroundAnimation = position => {
  const to = {
    height: "calc(100vh + 0px)",
    width: "calc(100vw + 0px)",
    transform: "translate(0px, 0px)",
    // background: '#333333',
    borderRadius: 0
  };

  if (position) {
    return {
      to,
      from: {
        height: `calc(0vh + ${position.height}px)`,
        width: `calc(0vw + ${position.width}px)`,
        transform: `translate(${position.left}px, ${position.top}px)`,
        // background: '#ffffff',
        borderRadius: 12
      }
    };
  }

  return {
    to,
    from: to
  };
};

const getImageAnimation = (position) => {
  if (!position)
    return {};

  return {
    height: position.height,
    width: position.width,
    transform: `translate(${position.left}px, ${position.top}px)`
  }
}

const ElementTransition = ({ projectReducer, hideTransitionElement, project }) => {
  const { imgPosition, slidePosition, imgDestination } = projectReducer;

  const backgroundTransitionAnimation = useSpring({
    to: getBackgroundAnimation(slidePosition).to,
    from: getBackgroundAnimation(slidePosition).from
  });

  const imageTransitionAnimation = useSpring({
    to: getImageAnimation(imgDestination),
    from: getImageAnimation(imgPosition),
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

      {!hideTransitionElement && !isEmpty(imgPosition) && (
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

const mapStateToProps = state => {
  return {
    projectReducer: state.projectReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(ElementTransition);
