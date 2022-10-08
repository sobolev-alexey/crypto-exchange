import { useState, useEffect } from 'react';

const breakpoints = {
  mobile: 900,
  tablet: 1180,
  desktop: 1600,
};

function getWindowDimensions() {
  const { innerWidth: screenWidth, innerHeight: height } = window;
  let viewport = 'desktop';
  if (screenWidth <= breakpoints.mobile) {
    viewport = 'mobile';
  } else if (screenWidth <= breakpoints.tablet) {
    viewport = 'tablet';
  }

  return {
    screenWidth,
    height,
    viewport
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
