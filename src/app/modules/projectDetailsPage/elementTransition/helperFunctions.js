export const getBackgroundFullwidthPosition = () => ({
  height: "calc(100vh + 0px)",
  width: "calc(100vw + 0px)",
  transform: "translate(0px, 0px)",
  // background: '#333333',
  borderRadius: 0
})

export const getBackgroundAnimation = (rect) => {
  if (!rect)
    return {};
  
  return {
    height: `calc(0vh + ${rect.height}px)`,
    width: `calc(0vw + ${rect.width}px)`,
    transform: `translate(${rect.left}px, ${rect.top}px)`,
    // background: '#ffffff',
    borderRadius: 12
  }
};

export const getImageAnimation = (rect) => {
  if (!rect)
    return {};

  return {
    height: parseInt(rect.height),
    width: parseInt(rect.width),
    transform: `translate(${parseInt(rect.left)}px, ${parseInt(rect.top)}px)`
  }
}