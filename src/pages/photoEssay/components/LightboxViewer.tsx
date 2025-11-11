import React, { useEffect, useCallback } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { LightboxViewerProps } from '../types';

const LightboxViewer = ({
  images,
  lightboxState,
  onClose,
  onPrevious,
  onNext,
  onZoomIn,
  onZoomOut,
  onDownload,
  currentLanguage
}: LightboxViewerProps) => {
  const { isOpen, currentIndex, isZoomed, zoomLevel } = lightboxState;
  const currentImage = images[currentIndex];

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onPrevious();
        break;
      case 'ArrowRight':
        onNext();
        break;
      case '+': case'=':
        onZoomIn();
        break;
      case '-':
        onZoomOut();
        break;
    }
  }, [isOpen, onClose, onPrevious, onNext, onZoomIn, onZoomOut]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  const caption = currentImage.captions[currentLanguage as keyof typeof currentImage.captions] || currentImage.captions.en;

  const translations = {
    en: {
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      download: 'Download',
      fullscreen: 'Fullscreen',
      imageCounter: '{current} of {total}',
      theme: 'Theme',
      date: 'Date',
      tags: 'Tags'
    },
    sw: {
      close: 'Funga',
      previous: 'Iliyotangulia',
      next: 'Ifuatayo',
      zoomIn: 'Kuza',
      zoomOut: 'Punguza',
      download: 'Pakua',
      fullscreen: 'Skrini Nzima',
      imageCounter: '{current} ya {total}',
      theme: 'Mada',
      date: 'Tarehe',
      tags: 'Lebo'
    },
    indigenous: {
      close: 'Funga',
      previous: 'Ya Awali',
      next: 'Ya Baada',
      zoomIn: 'Kuza',
      zoomOut: 'Punguza',
      download: 'Pakua',
      fullscreen: 'Ukurasa Mzima',
      imageCounter: '{current} kati ya {total}',
      theme: 'Mada',
      date: 'Siku',
      tags: 'Alama'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="fixed inset-0 z-500 bg-black/95 backdrop-blur-sm">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-510 bg-gradient-to-b from-black/80 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <Icon name="X" size={20} />
            </Button>
            
            <div className="text-white">
              <h2 className="font-medium text-lg">{currentImage.title}</h2>
              <p className="text-sm opacity-80">
                {t.imageCounter
                  .replace('{current}', (currentIndex + 1).toString())
                  .replace('{total}', images.length.toString())}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomOut}
              disabled={zoomLevel <= 1}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <Icon name="ZoomOut" size={20} />
            </Button>
            
            <span className="text-white text-sm font-mono min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomIn}
              disabled={zoomLevel >= 3}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <Icon name="ZoomIn" size={20} />
            </Button>

            <div className="w-px h-6 bg-white/20 mx-2" />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDownload(currentImage)}
              className="text-white hover:bg-white/20 h-10 w-10"
            >
              <Icon name="Download" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Image Area */}
      <div className="absolute inset-0 flex items-center justify-center p-20">
        <div 
          className="relative max-w-full max-h-full overflow-hidden cursor-move"
          style={{
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.2s ease-out'
          }}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={currentIndex <= 0}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 z-510"
      >
        <Icon name="ChevronLeft" size={24} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={currentIndex >= images.length - 1}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 z-510"
      >
        <Icon name="ChevronRight" size={24} />
      </Button>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-510 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Caption */}
            <div>
              <p className="text-white text-base leading-relaxed mb-4">
                {caption}
              </p>
              
              {/* Tags */}
              {currentImage.tags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-white/80 text-sm font-medium">{t.tags}:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentImage.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-white/60" />
                <span className="text-white/80 text-sm">{t.date}:</span>
                <span className="text-white text-sm">{currentImage.date}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Tag" size={16} className="text-white/60" />
                <span className="text-white/80 text-sm">{t.theme}:</span>
                <span className="text-white text-sm">{currentImage.theme}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Globe" size={16} className="text-white/60" />
                <span className="text-white/80 text-sm">Cultural Topic:</span>
                <span className="text-white text-sm">{currentImage.culturalTopic}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 z-500"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />
    </div>
  );
};

export default LightboxViewer;