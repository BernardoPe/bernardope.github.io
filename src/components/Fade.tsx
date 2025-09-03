import React from 'react';
import type { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FadeProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: string;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

export const Fade: React.FC<FadeProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  distance = '30px',
  className = '',
  triggerOnce = true,
  threshold = 0.1,
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance})`;
      case 'down':
        return `translateY(-${distance})`;
      case 'left':
        return `translateX(${distance})`;
      case 'right':
        return `translateX(-${distance})`;
      default:
        return `translateY(${distance})`;
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0)' : getTransform(),
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} style={style} className={className}>
      {children}
    </div>
  );
};
