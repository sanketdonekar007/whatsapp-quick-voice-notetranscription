
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

export const usePlaybackAnimation = (isPlaying: boolean, duration: number) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }
      
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(elapsed / (duration * 1000), 1);
      
      setProgress(newProgress);
      
      if (newProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, duration]);
  
  return progress;
};

export const useTypingAnimation = (text: string, delay = 30) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (!text) return;
    
    let currentIndex = 0;
    setDisplayedText('');
    setIsComplete(false);
    
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(intervalId);
      }
    }, delay);
    
    return () => clearInterval(intervalId);
  }, [text, delay]);
  
  return { displayedText, isComplete };
};
