import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { useSlideAnimation } from '@/hooks/useSlideAnimation';
import { SlideDirection } from '@/hooks/types';

interface AnimatedCardProps {
  direction: SlideDirection;
  delay: number;
  enterDuration?: number;
  exitDuration?: number;
  triggerExit?: boolean;
  className?: string;
  displayType: string;
  onExitComplete?: () => void;
  children: React.ReactNode;
}

export default function AnimatedCard({
  direction = 'left',
  delay = 0,
  enterDuration = 1000,
  exitDuration = 2000,
  triggerExit = false,
  className = '',
  displayType,
  onExitComplete,
  children,
}: AnimatedCardProps) {
  const [hasExited, setHasExited] = useState(false);
  const [display, setDisplay] = useState(displayType);

  const { style, isVisible } = useSlideAnimation({
    direction,
    delay: triggerExit ? 0 : delay,
    duration: triggerExit ? exitDuration : enterDuration,
    isExiting: triggerExit,
  });

  useEffect(() => {
    if (!triggerExit) {
      setDisplay(displayType);
      setHasExited(false);
    }
  }, [triggerExit, displayType]);

  useEffect(() => {
    if (triggerExit && !hasExited) {
      const animationDelay = Math.floor(exitDuration * 0.25);

      const exitTimer = setTimeout(() => {
        setHasExited(true);
        console.log('Card has exited');

        setTimeout(() => {
          setDisplay('none');
          console.log('Card removed from layout');
        }, 100); // Short delay after exit

        if (onExitComplete) onExitComplete();
      }, animationDelay);

      return () => {
        clearTimeout(exitTimer);
      };
    }
  }, [triggerExit, hasExited, exitDuration, onExitComplete]);

  return (
    <Card
      className={className}
      style={{
        ...style,
        opacity: isVisible || triggerExit ? 1 : 0,
        pointerEvents: triggerExit ? 'none' : 'auto',
        display: display,
      }}
    >
      {children}
    </Card>
  );
}
