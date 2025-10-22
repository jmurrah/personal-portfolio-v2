import { useState } from 'react';
import Card from '@/components/Card';
import { useSlideAnimation } from '@/hooks/useSlideAnimation';

interface AnimatedCardProps {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  exitDuration?: number; // New prop for exit animation duration
  className?: string;
  children: React.ReactNode;
  triggerExit?: boolean;
  onExitComplete?: () => void;
}

export default function AnimatedCard({
  direction = 'left',
  delay = 0,
  duration = 1000,
  exitDuration = 2000, // Default exit duration longer than entry
  className = '',
  children,
  triggerExit = false,
  onExitComplete,
}: AnimatedCardProps) {
  // Track if animation has completed
  const [hasExited, setHasExited] = useState(false);

  // Use the animation hook
  const { style, isVisible } = useSlideAnimation({
    direction,
    delay: triggerExit ? 0 : delay,
    // Use exitDuration when exiting, otherwise use regular duration
    duration: triggerExit ? exitDuration : duration,
    isExiting: triggerExit,
  });

  // Handle exit animation completion
  if (triggerExit && !hasExited && isVisible) {
    // Wait for animation to complete before calling callback
    setTimeout(() => {
      setHasExited(true);
      onExitComplete?.();
    }, exitDuration); // Use exit duration for completion timing
  }

  return (
    <Card
      className={className}
      style={{
        ...style,
        // Prevent interaction during exit animation
        pointerEvents: triggerExit ? 'none' : 'auto',
      }}
    >
      {children}
    </Card>
  );
}
