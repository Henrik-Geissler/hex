import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  duration?: number;
  delay?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  className = '', 
  duration = 1000,
  delay = 0 
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down'>('up');
  const prevValueRef = useRef(value);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (value !== prevValueRef.current) {
      const direction = value > prevValueRef.current ? 'up' : 'down';
      setAnimationDirection(direction);
      setIsAnimating(true);
      
      // Start animation after delay
      const timeoutId = setTimeout(() => {
        const startValue = prevValueRef.current;
        const endValue = value;
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          
          const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);
          setDisplayValue(currentValue);
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setDisplayValue(endValue);
            setIsAnimating(false);
            // Update prevValueRef only after animation completes
            prevValueRef.current = value;
          }
        };
        
        animationRef.current = requestAnimationFrame(animate);
      }, delay);
      
      return () => {
        clearTimeout(timeoutId);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [value, duration, delay]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <span 
      className={`animated-number ${isAnimating ? 'animating' : ''} ${animationDirection} ${className}`}
    >
      {displayValue}
    </span>
  );
};

export default AnimatedNumber;
