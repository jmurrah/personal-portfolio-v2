import { useEffect, useState, useRef } from 'react';
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
  direction,
  delay,
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
  const cardRef = useRef<HTMLDivElement>(null);

  const { style, isVisible } = useSlideAnimation({
    direction,
    delay: triggerExit ? 0 : delay,
    duration: triggerExit ? exitDuration : enterDuration,
    isExiting: triggerExit,
  });

  // Reset when coming back in
  useEffect(() => {
    if (!triggerExit) {
      setDisplay(displayType);
      setHasExited(false);
    }
  }, [triggerExit, displayType]);

  // Use IntersectionObserver to detect when card is out of viewport
  useEffect(() => {
    if (!cardRef.current || !triggerExit || hasExited) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting && triggerExit) {
          setHasExited(true);
          setDisplay('none');
          console.log('Card out of viewport, setting display: none');
          if (onExitComplete) onExitComplete();
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [triggerExit, hasExited, onExitComplete]);

  return (
    <Card
      ref={cardRef}
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
