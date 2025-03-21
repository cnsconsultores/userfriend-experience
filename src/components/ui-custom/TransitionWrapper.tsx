
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
  transitionType?: 'fade' | 'slide-up' | 'slide-down' | 'scale';
  duration?: number;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  className,
  transitionType = 'fade',
  duration = 300,
}) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation classes based on transition type
  const getAnimationClass = (visible: boolean) => {
    switch (transitionType) {
      case 'fade':
        return visible ? 'animate-fade-in' : 'opacity-0';
      case 'slide-up':
        return visible ? 'animate-slide-up' : 'opacity-0 translate-y-10';
      case 'slide-down':
        return visible ? 'animate-slide-down' : 'opacity-0 -translate-y-10';
      case 'scale':
        return visible ? 'animate-scale-in' : 'opacity-0 scale-95';
      default:
        return visible ? 'animate-fade-in' : 'opacity-0';
    }
  };
  
  useEffect(() => {
    // Set animated entrance
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // Small delay to ensure proper animation
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div
      className={cn(
        "transition-all",
        getAnimationClass(isVisible),
        className
      )}
      style={{ 
        animationDuration: `${duration}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
