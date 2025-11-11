import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { PhotoCardProps } from '../types';

const PhotoCard = ({ image, onClick, currentLanguage, index }: PhotoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const caption = image.captions[currentLanguage as keyof typeof image.captions] || image.captions.en;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className="relative group cursor-pointer overflow-hidden rounded-lg elevation-1 hover-elevation transition-academic bg-card"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        aspectRatio: `${image.dimensions.width} / ${image.dimensions.height}`,
        minHeight: '200px'
      }}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse-subtle flex items-center justify-center">
            <Icon name="Image" size={32} className="text-muted-foreground" />
          </div>
        )}
        
        <Image
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={handleImageLoad}
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'}
        `} />

        {/* Caption Overlay */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4 text-white
          transform transition-all duration-300
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 md:translate-y-2 md:opacity-0'}
        `}>
          <h3 className="font-medium text-sm mb-1 line-clamp-2">
            {image.title}
          </h3>
          <p className="text-xs opacity-90 line-clamp-3 font-caption">
            {caption}
          </p>
          
          {/* Tags */}
          {image.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {image.tags.slice(0, 3).map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-caption"
                >
                  {tag}
                </span>
              ))}
              {image.tags.length > 3 && (
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-caption">
                  +{image.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Top Right Actions */}
        <div className={`
          absolute top-3 right-3 flex space-x-2
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon name="Maximize" size={14} className="text-white" />
          </div>
          <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon name="Download" size={14} className="text-white" />
          </div>
        </div>

        {/* Image Index Badge */}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white text-xs font-medium">
            {index + 1}
          </span>
        </div>

        {/* Theme Badge */}
        <div className="absolute bottom-3 right-3 bg-primary/90 backdrop-blur-sm rounded px-2 py-1">
          <span className="text-white text-xs font-medium font-caption">
            {image.theme}
          </span>
        </div>
      </div>

      {/* Mobile Touch Overlay */}
      <div className="md:hidden absolute inset-0 bg-black/0 active:bg-black/10 transition-colors duration-150" />
    </div>
  );
};

export default PhotoCard;