import { useEffect, useState, CSSProperties } from 'react';

type SlideDirection = 'left' | 'right' | 'top' | 'bottom';

interface UseSlideAnimationProps {
  direction: SlideDirection;
  isVisible?: boolean; // Control visibility externally
  delay?: number;
  duration?: number;
  isExiting?: boolean; // For exit animations
}

export function useSlideAnimation({
  direction,
  isVisible: controlledVisibility,
  delay = 0,
  duration = 700,
  isExiting = false,
}: UseSlideAnimationProps) {
  // Allow external control or internal state
  const [internalVisible, setInternalVisible] = useState(false);

  // Use externally controlled visibility if provided, otherwise use internal
  const isVisible = controlledVisibility !== undefined ? controlledVisibility : internalVisible;

  useEffect(() => {
    if (controlledVisibility === undefined) {
      const timer = setTimeout(() => {
        setInternalVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, controlledVisibility]);

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
