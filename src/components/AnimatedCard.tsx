import { useState } from 'react';
import Card from '@/components/Card';
import { useSlideAnimation } from '@/hooks/useSlideAnimation';

interface AnimatedCardProps {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
  triggerExit?: boolean;
  onExitComplete?: () => void;
}

export default function AnimatedCard({
  direction = 'left',
  delay = 0,
  duration = 1000,
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
    delay,
    duration,
    isExiting: triggerExit,
  });

  // Handle exit animation completion
  if (triggerExit && !hasExited && isVisible) {
    // Wait for animation to complete before calling callback
    setTimeout(() => {
      setHasExited(true);
      onExitComplete?.();
    }, duration);
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
