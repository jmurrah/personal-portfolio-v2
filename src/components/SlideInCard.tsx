import { useEffect, useState } from 'react';
import Card from '@/components/Card';

type SlideDirection = 'left' | 'right' | 'top' | 'bottom';

interface SlideInCardProps {
  direction: SlideDirection;
  delay?: number; // delay in ms
  className?: string;
  children: React.ReactNode;
}

export default function SlideInCard({
  direction,
  delay = 0,
  className = '',
  children,
}: SlideInCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getInitialTransform = () => {
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

  return (
    <Card
      className={`transition-all duration-700 ${className}`}
      style={{
        transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
      }}
    >
      {children}
    </Card>
  );
}
