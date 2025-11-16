import React from 'react';
import Image from '../../../components/AppImage';
import { BackgroundLayerProps } from '../types';

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ 
  scrollProgress, 
  imageUrl, 
  alt,
  opacity, 
  className = '' 
}) => {

  const offset = scrollProgress * 40;
  const fade = opacity * (1 - scrollProgress * 0.3);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
      style={{ opacity: Math.max(fade, 0.2) }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${offset}px) scale(1.05)`,
          willChange: "transform"
        }}
      >
        <Image
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
      </div>
    </div>
  );
};

export default BackgroundLayer;
