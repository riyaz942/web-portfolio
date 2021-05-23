import useBreakpoint from "../useBreakpoint";

// calculates the left translate value of the project header scroll items
// with a flex of 2/3 on the section also have a max width of 1024 on the right section of the project details
const useProjectHeaderTranslate = (shouldTranslate) => {
  // at screen size of 1707px the right section would reach its max width of 1024
  const screenSize = useBreakpoint((width) =>
    width >= 1707 ? "max-right" : null
  );

  if (!shouldTranslate) {
    return 0;
  } else if (screenSize === "max-right") {
    return 1024 - window.innerWidth;
  } else if (screenSize === "xlg") {
    // this is the width of the left section
    return -(window.innerWidth * 0.4);
  }

  return 0;
};

export default useProjectHeaderTranslate;
