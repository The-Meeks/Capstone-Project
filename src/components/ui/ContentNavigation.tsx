import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

interface ContentNavigationProps {
  type: 'document' | 'presentation' | 'video' | 'gallery';
  currentPage?: number;
  totalPages?: number;
  currentTime?: number;
  duration?: number;
  currentIndex?: number;
  totalItems?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onPageChange?: (page: number) => void;
  onSeek?: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  isPlaying?: boolean;
  onFullscreen?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onDownload?: () => void;
  className?: string;
}

const ContentNavigation = ({
  type,
  currentPage = 1,
  totalPages = 1,
  currentTime = 0,
  duration = 0,
  currentIndex = 0,
  totalItems = 0,
  onPrevious,
  onNext,
  onPageChange,
  onSeek,
  onPlay,
  onPause,
  isPlaying = false,
  onFullscreen,
  onZoomIn,
  onZoomOut,
  onDownload,
  className = ''
}: ContentNavigationProps) => {
  const [showPageInput, setShowPageInput] = useState(false);
  const [pageInputValue, setPageInputValue] = useState(currentPage.toString());

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePageInputSubmit = () => {
    const page = parseInt(pageInputValue);
    if (page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
    setShowPageInput(false);
    setPageInputValue(currentPage.toString());
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (onSeek) {
      onSeek(time);
    }
  };

  // Document Navigation
  if (type === 'document') {
    return (
      <div className={`
        fixed bottom-6 left-1/2 transform -translate-x-1/2 z-300
        bg-card border border-border rounded-lg elevation-2 p-3
        flex items-center space-x-4 ${className}
      `}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentPage <= 1}
          className="h-8 w-8"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>

        <div className="flex items-center space-x-2">
          {showPageInput ? (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={pageInputValue}
                onChange={(e) => setPageInputValue(e.target.value)}
                onBlur={handlePageInputSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handlePageInputSubmit()}
                className="w-12 h-6 text-xs text-center border border-border rounded bg-background"
                min="1"
                max={totalPages}
                autoFocus
              />
              <span className="text-sm text-muted-foreground">of {totalPages}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowPageInput(true)}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Page {currentPage} of {totalPages}
            </button>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className="h-8 w-8"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>

        <div className="w-px h-6 bg-border" />

        <Button variant="ghost" size="icon" onClick={onZoomOut} className="h-8 w-8">
          <Icon name="ZoomOut" size={16} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onZoomIn} className="h-8 w-8">
          <Icon name="ZoomIn" size={16} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onFullscreen} className="h-8 w-8">
          <Icon name="Maximize" size={16} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onDownload} className="h-8 w-8">
          <Icon name="Download" size={16} />
        </Button>
      </div>
    );
  }

  // Video Navigation
  if (type === 'video') {
    return (
      <div className={`
        absolute bottom-4 left-4 right-4 z-300
        bg-black/80 backdrop-blur-sm rounded-lg p-4 space-y-3 ${className}
      `}>
        {/* Progress Bar */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-white font-mono min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1B4332 0%, #1B4332 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
          </div>
          <span className="text-xs text-white font-mono min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={isPlaying ? onPause : onPlay}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              disabled={currentIndex <= 0}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Icon name="SkipBack" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              disabled={currentIndex >= totalItems - 1}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Icon name="SkipForward" size={16} />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-white">
              {currentIndex + 1} of {totalItems}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={onDownload}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Icon name="Download" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onFullscreen}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Icon name="Maximize" size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Gallery Navigation
  if (type === 'gallery') {
    return (
      <div className={`
        fixed top-1/2 left-4 right-4 transform -translate-y-1/2 z-300
        flex items-center justify-between pointer-events-none ${className}
      `}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentIndex <= 0}
          className="h-12 w-12 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm pointer-events-auto"
        >
          <Icon name="ChevronLeft" size={24} />
        </Button>

        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 pointer-events-auto">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} of {totalItems}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentIndex >= totalItems - 1}
          className="h-12 w-12 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm pointer-events-auto"
        >
          <Icon name="ChevronRight" size={24} />
        </Button>
      </div>
    );
  }

  // Presentation Navigation
  if (type === 'presentation') {
    return (
      <div className={`
        fixed bottom-6 left-1/2 transform -translate-x-1/2 z-300
        bg-card border border-border rounded-lg elevation-2 p-3
        flex items-center space-x-4 ${className}
      `}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentIndex <= 0}
          className="h-8 w-8"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-foreground">
            Slide {currentIndex + 1} of {totalItems}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentIndex >= totalItems - 1}
          className="h-8 w-8"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>

        <div className="w-px h-6 bg-border" />

        <Button variant="ghost" size="icon" onClick={onFullscreen} className="h-8 w-8">
          <Icon name="Maximize" size={16} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onDownload} className="h-8 w-8">
          <Icon name="Download" size={16} />
        </Button>
      </div>
    );
  }

  return null;
};

export default ContentNavigation;