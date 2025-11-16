import React, { useState, useEffect } from 'react';
import { TextAnimationProps } from '../types';

const AnimatedText: React.FC<TextAnimationProps> = ({ 
  text, 
  delay, 
  scrollTrigger, 
  className = '' 
}) => {

  const [visibleLetters, setVisibleLetters] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (scrollTrigger >= 0) {
      setTriggered(true);
    }
  }, [scrollTrigger]);

  useEffect(() => {
    if (!triggered) return;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleLetters(prev => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 40);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [triggered, delay, text]);

  return (
    <div className={`font-heading font-bold ${className}`}>
      {text.split('').map((letter, i) => (
        <span
          key={i}
          className={`
            inline-block transition-all duration-500
            ${i < visibleLetters 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"}
          `}
          style={{
            transitionDelay: `${i * 20}ms`
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
