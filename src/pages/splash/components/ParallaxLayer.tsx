import React from 'react';
import { ParallaxLayerProps } from '../types';

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
  depth, 
  scrollProgress, 
  children, 
  className = '' 
}) => {

  // Gentle controlled motion
  const translateY = scrollProgress * depth * 40;
  const scale = 1 + (scrollProgress * depth * 0.05);
  const opacity = 1 - scrollProgress * depth * 0.4;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: Math.max(opacity, 0.5),
        transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
        willChange: "transform, opacity"
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
