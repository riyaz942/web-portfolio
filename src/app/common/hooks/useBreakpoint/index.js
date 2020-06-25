import {useState, useEffect} from 'react';
import throttle from 'lodash/throttle';

const getDeviceConfig = (width) => {
  if(width <= 450 ) {
    return 'sm';
  } else if(width > 450 && width <= 650) {
    return 'md';
  } else if(width > 650 && width <= 1024) {
    return 'lg';
  }

  return 'xlg';
};

const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));
  
  useEffect(() => {
    const calcInnerWidth = throttle(function() {
      setBrkPnt(getDeviceConfig(window.innerWidth))
    }, 200); 
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
}

export const screenSize = getDeviceConfig(window.innerWidth);
export default useBreakpoint;
