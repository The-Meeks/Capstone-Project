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
      const mockSlides: PresentationSlide[] = Array.from({ length: presentation.slideCount }, (_, index) => ({
        id: `${presentation.id}-slide-${index + 1}`,
        slideNumber: index + 1,
        imageUrl: `https://picsum.photos/800/600?random=${presentation.id}-${index + 1}`,
        imageAlt: `Slide ${index + 1} of ${presentation.title}`,
        title: `Slide ${index + 1}`,
        notes: `Notes for slide ${index + 1}`
      }));
      setSlides(mockSlides);
      setIsLoading(false);
    }
  }, [presentation, isOpen]);

  const handlePreviousSlide = () => currentSlide > 0 && onSlideChange(currentSlide - 1);
  const handleNextSlide = () => currentSlide < slides.length - 1 && onSlideChange(currentSlide + 1);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const handleDownload = () => {
    if (!presentation) return;
    const link = document.createElement('a');
    link.href = presentation.fileUrl;
    link.download = `${presentation.title}.${presentation.type === 'powerpoint' ? 'pptx' : 'pdf'}`;
    link.click();
  };

  if (!isOpen || !presentation) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md z-[500] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Viewer */}
      <div className={`
        fixed z-[600] bg-white/80 backdrop-blur-md border border-border rounded-lg shadow-lg transition-all duration-300
        ${isFullscreen 
          ? 'inset-0 rounded-none' 
          : 'top-4 left-4 right-4 bottom-4 md:top-8 md:left-8 md:right-8 md:bottom-8'
        }
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name={presentation.type === 'powerpoint' ? 'Presentation' : 'FileText'} size={20} className="text-primary" />
            <h2 className="font-semibold text-gray-900 sm:text-lg truncate max-w-xs sm:max-w-md drop-shadow-sm">
              {presentation.title}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleDownload}><Icon name="Download" size={16} className="text-gray-900" /></Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}><Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={16} className="text-gray-900" /></Button>
            <Button variant="ghost" size="icon" onClick={onClose}><Icon name="X" size={16} className="text-gray-900" /></Button>
          </div>
        </div>

        {/* Slide Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Slide */}
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-100/30">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <Icon name="Loader2" size={24} className="animate-spin text-primary" />
              </div>
            ) : (
              <Image
                src={currentSlideData?.imageUrl || ''}
                alt={currentSlideData?.imageAlt || ''}
                className="max-w-full max-h-full object-contain rounded-md shadow-md"
              />
            )}
          </div>

          {/* Thumbnails */}
          {!isLoading && (
            <div className="border-t md:border-t-0 md:border-l border-border p-2 md:p-4 overflow-x-auto flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => onSlideChange(index)}
                  className={`
                    flex-shrink-0 relative w-16 h-12 md:w-24 md:h-16 rounded border-2 transition-all
                    ${index === currentSlide ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}
                  `}
                >
                  <Image src={slide.imageUrl} alt={`Slide ${slide.slideNumber}`} className="w-full h-full object-cover rounded" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-0.5 rounded-b">
                    {slide.slideNumber}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        {!isLoading && (
          <ContentNavigation
            type="presentation"
            currentIndex={currentSlide}
            totalItems={slides.length}
            onPrevious={handlePreviousSlide}
            onNext={handleNextSlide}
            onPageChange={onSlideChange}
            onFullscreen={toggleFullscreen}
            onDownload={handleDownload}
          />
        )}
      </div>
    </>
  );
};

export default PresentationViewer;
