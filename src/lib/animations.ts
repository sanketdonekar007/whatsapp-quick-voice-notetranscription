
import { useEffect, useState } from 'react';

export const useAnimationOnMount = (delay = 0) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return mounted;
};

export const staggeredAnimation = (index: number, staggerAmount = 50) => {
  return {
    style: {
      animationDelay: `${index * staggerAmount}ms`,
    }
  };
};
