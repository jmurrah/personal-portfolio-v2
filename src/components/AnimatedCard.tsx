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
  onExitComplete?: () => void;
  children: React.ReactNode;
  isCustomCard?: boolean;
}

export default function AnimatedCard({
  direction,
  delay,
  enterDuration = 1000,
  exitDuration = 1000,
  triggerExit = false,
  className = '',
  onExitComplete,
  children,
  isCustomCard = false,
}: AnimatedCardProps) {
  const [hasExited, setHasExited] = useState(false);
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
      setHasExited(false);
    }
  }, [triggerExit]);

  // Use IntersectionObserver to detect when card is out of viewport
  useEffect(() => {
    if (!cardRef.current || !triggerExit || hasExited) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting && triggerExit) {
          setHasExited(true);
          if (onExitComplete) onExitComplete();
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [triggerExit, hasExited, onExitComplete]);

  const combinedStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible || triggerExit ? 1 : 0,
    pointerEvents: triggerExit ? 'none' : 'auto',
  };

  return isCustomCard ? (
    <div ref={cardRef} className={className} style={combinedStyle}>
      {children}
    </div>
  ) : (
    <Card ref={cardRef} className={className} style={combinedStyle}>
      {children}
    </Card>
  );
}
