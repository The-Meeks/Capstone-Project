import React, { useState } from 'react';
import Button from './Button';


interface ExploreButtonProps {
  onExplore: () => void;
  scrollProgress: number;
  className?: string;
}

const ExploreButton = ({ onExplore, scrollProgress, className = '' }: ExploreButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleExplore = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Trigger fly-through animation
    const element = document.querySelector('.explore-button-container');
    if (element) {
      element.classList.add('animate-fly-through');
    }
    
    // Navigate after animation completes
    setTimeout(() => {
      onExplore();
    }, 2000);
  };

  // Button becomes visible in final scroll section
  const isVisible = scrollProgress > 0.8;
  const opacity = Math.max(0, (scrollProgress - 0.8) / 0.2);
  
  // 3D transform based on scroll progress
  const transform = `
    translateZ(${scrollProgress * 50}px) 
    scale(${1 + scrollProgress * 0.1})
    rotateX(${scrollProgress * 5}deg)
  `;

  return (
    <div 
      className={`
        explore-button-container fixed bottom-12 left-1/2 transform -translate-x-1/2 
        transition-all duration-500 gpu-accelerated depth-shadow-lg
        ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}
        ${className}
      `}
      style={{
        opacity,
        transform: `translateX(-50%) ${transform}`,
        willChange: 'transform, opacity'
      }}
    >
      <Button
        variant="default"
        size="lg"
        onClick={handleExplore}
        disabled={isAnimating}
        loading={isAnimating}
        iconName="ArrowRight"
        iconPosition="right"
        className={`
          px-8 py-4 text-lg font-heading font-semibold
          gradient-emerald-amber text-white border-0
          hover:scale-105 active:scale-95
          transition-transform duration-200
          shadow-lg hover:shadow-xl
          ${isAnimating ? 'animate-pulse' : ''}
        `}
      >
        {isAnimating ? 'Entering Portfolio...' : 'Explore Portfolio'}
      </Button>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 bg-primary rounded-full
              animate-pulse opacity-60
            `}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 2) * 80}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
      
      {/* Glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-lg blur-xl opacity-30
          gradient-emerald-amber -z-10
          ${isAnimating ? 'animate-pulse' : ''}
        `}
        style={{
          transform: 'scale(1.2)',
        }}
      />
    </div>
  );
};

export default ExploreButton;