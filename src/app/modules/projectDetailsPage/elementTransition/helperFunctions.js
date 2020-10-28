export const getBackgroundAnimation = position => {
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

export const getImageAnimation = (position) => {
  if (!position)
    return {};

  return {
    height: position.height,
    width: position.width,
    transform: `translate(${position.left}px, ${position.top}px)`
  }
}