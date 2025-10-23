import { useEffect, useState, CSSProperties } from 'react';
import { SlideDirection } from '@/hooks/types';

interface UseSlideAnimationProps {
  direction: SlideDirection;
  delay: number;
  duration: number;
  isExiting: boolean;
}

export function useSlideAnimation({
  direction,
  delay,
  duration,
  isExiting,
}: UseSlideAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isExiting) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [delay, isExiting]);

  const getTransform = (): string => {
    if (isVisible && !isExiting) return 'translate(0, 0)';

    switch (direction) {
      case 'left':
        return 'translateX(-100vw)';
      case 'right':
        return 'translateX(100vw)';
      case 'top':
        return 'translateY(-100vh)';
      case 'bottom':
        return 'translateY(100vh)';
    }
  };

  const style: CSSProperties = {
    transform: getTransform(),
    transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
  };

  return { style, isVisible };
}
