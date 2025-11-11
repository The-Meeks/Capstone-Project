import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ContentNavigation from '../../../components/ui/ContentNavigation';
import { PresentationViewerProps, PresentationSlide } from '../types';

const PresentationViewer = ({ 
  presentation, 
  isOpen, 
  onClose, 
  currentSlide, 
  onSlideChange 
}: PresentationViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slides, setSlides] = useState<PresentationSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (presentation && isOpen) {
      // Mock slides data - in real app, this would fetch from API
      const mockSlides: PresentationSlide[] = Array.from({ length: presentation.slideCount }, (_, index) => ({
        id: `${presentation.id}-slide-${index + 1}`,
        slideNumber: index + 1,
        imageUrl: `https://picsum.photos/800/600?random=${presentation.id}-${index + 1}`,
        imageAlt: `Slide ${index + 1} of ${presentation.title} showing academic content with charts and text`,
        title: `Slide ${index + 1}`,
        notes: `Presentation notes for slide ${index + 1} of ${presentation.title}`
      }));
      
      setSlides(mockSlides);
      setIsLoading(false);
    }
  }, [presentation, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false);
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          handlePreviousSlide();
          break;
        case 'ArrowRight':
          handleNextSlide();
          break;
        case 'f':
        case 'F':
          setIsFullscreen(!isFullscreen);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, currentSlide, slides.length]);

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      onSlideChange(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      onSlideChange(currentSlide + 1);
    }
  };

  const handleDownload = () => {
    if (presentation) {
      // Mock download functionality
      const link = document.createElement('a');
      link.href = presentation.fileUrl;
      link.download = `${presentation.title}.${presentation.type === 'powerpoint' ? 'pptx' : 'pdf'}`;
      link.click();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen || !presentation) {
    return null;
  }

  const currentSlideData = slides[currentSlide];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-500 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Viewer */}
      <div className={`
        fixed z-600 bg-background border border-border rounded-lg elevation-3 transition-all duration-300
        ${isFullscreen 
          ? 'inset-0 rounded-none' :'top-4 left-4 right-4 bottom-4 md:top-8 md:left-8 md:right-8 md:bottom-8'
        }
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon 
                name={presentation.type === 'powerpoint' ? 'Presentation' : 'FileText'} 
                size={20} 
                className="text-primary" 
              />
              <h2 className="font-heading font-semibold text-foreground text-lg">
                {presentation.title}
              </h2>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{presentation.slideCount} slides</span>
              <span>•</span>
              <span>{presentation.category}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              className="h-8 w-8"
            >
              <Icon name="Download" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-8 w-8"
            >
              <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center space-x-3">
                <div className="animate-spin">
                  <Icon name="Loader2" size={24} className="text-primary" />
                </div>
                <span className="text-muted-foreground">Loading presentation...</span>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Slide Display */}
              <div className="flex-1 flex items-center justify-center p-8 bg-muted/30">
                <div className="relative max-w-full max-h-full">
                  <Image
                    src={currentSlideData?.imageUrl || ''}
                    alt={currentSlideData?.imageAlt || ''}
                    className="max-w-full max-h-full object-contain rounded-lg elevation-1"
                  />
                </div>
              </div>

              {/* Slide Thumbnails */}
              <div className="border-t border-border p-4">
                <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => onSlideChange(index)}
                      className={`
                        flex-shrink-0 relative w-16 h-12 rounded border-2 transition-all
                        ${index === currentSlide 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <Image
                        src={slide.imageUrl}
                        alt={`Thumbnail for slide ${slide.slideNumber}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-0.5 rounded-b">
                        {slide.slideNumber}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        {!isLoading && (
          <ContentNavigation
            type="presentation"
            currentIndex={currentSlide}
            totalItems={slides.length}
            onPrevious={handlePreviousSlide}
            onNext={handleNextSlide}
            onPageChange={onSlideChange}
            onSeek={() => {}}
            onPlay={() => {}}
            onPause={() => {}}
            onZoomIn={() => {}}
            onZoomOut={() => {}}
            onFullscreen={toggleFullscreen}
            onDownload={handleDownload}
          />
        )}
      </div>
    </>
  );
};

export default PresentationViewer;