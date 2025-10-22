import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTransition(exitDelay = 300) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        setDisplayLocation(location);
      }, exitDelay);
    }
  }, [location, displayLocation, exitDelay]);

  return { location: displayLocation, isExiting };
}
