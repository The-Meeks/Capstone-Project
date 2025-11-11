import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { EssayViewerProps } from '../Types/index';

const EssayViewer = ({
  document,
  onPageChange,
  onBookmarkAdd,
  onDownload,
  onPrint,
  className = ''
}: EssayViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPageInput, setShowPageInput] = useState(false);
  const [pageInputValue, setPageInputValue] = useState('1');
  const viewerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= document.pageCount) {
      setCurrentPage(newPage);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePageInputSubmit = () => {
    const page = parseInt(pageInputValue);
    if (page >= 1 && page <= document.pageCount) {
      handlePageChange(page);
    }
    setShowPageInput(false);
    setPageInputValue(currentPage.toString());
  };

  const handleBookmarkAdd = () => {
    if (onBookmarkAdd) {
      const bookmark = {
        id: `bookmark-${Date.now()}`,
        pageNumber: currentPage,
        title: `Page ${currentPage} Bookmark`,
        createdAt: new Date()
      };
      onBookmarkAdd(bookmark);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePageChange(currentPage - 1);
    } else if (e.key === 'ArrowRight') {
      handlePageChange(currentPage + 1);
    } else if (e.key === 'Home') {
      handlePageChange(1);
    } else if (e.key === 'End') {
      handlePageChange(document.pageCount);
    } else if (e.key === 'Escape' && isFullscreen) {
      handleFullscreen();
    }
  };

  // Mock PDF pages - in real implementation, this would be PDF.js
  const renderPDFPage = (pageNumber: number) => {
    return (
      <div
        key={pageNumber}
        className="bg-white border border-border rounded-lg elevation-1 mx-auto mb-4"
        style={{
          width: `${595 * zoomLevel}px`,
          height: `${842 * zoomLevel}px`,
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top center'
        }}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              {document.title}
            </h1>
            {document.subtitle && (
              <h2 className="text-lg text-muted-foreground">
                {document.subtitle}
              </h2>
            )}
            <p className="text-sm text-muted-foreground mt-4">
              by {document.author}
            </p>
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-sm leading-relaxed text-foreground">
              This is page {pageNumber} of the autobiographical essay. In a real implementation, 
              this would display the actual PDF content using PDF.js or a similar library.
            </p>
            
            <p className="text-sm leading-relaxed text-foreground">
              The essay explores the student's academic journey, personal growth, and 
              professional aspirations. Each page contains meaningful content that contributes 
              to the overall narrative of their capstone project experience.
            </p>

            <p className="text-sm leading-relaxed text-foreground">
              Key themes include academic achievement, cultural identity, innovation in 
              technology, and contributions to modern society. The document serves as a 
              comprehensive reflection on the student's educational experience.
            </p>

            {pageNumber > 1 && (
              <div className="mt-8">
                <h3 className="text-lg font-heading font-semibold mb-3">
                  Chapter {Math.ceil(pageNumber / 3)}: Academic Journey
                </h3>
                <p className="text-sm leading-relaxed text-foreground">
                  This section continues the exploration of academic milestones and 
                  personal development throughout the university experience.
                </p>
              </div>
            )}
          </div>

          <div className="text-center text-xs text-muted-foreground mt-4">
            Page {pageNumber} of {document.pageCount}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`
        relative bg-muted/30 min-h-screen
        ${isFullscreen ? 'fixed inset-0 z-[9999]' : ''}
        ${className}
      `}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Viewer Container */}
      <div
        ref={viewerRef}
        className="h-full overflow-auto p-4"
        style={{ paddingTop: isFullscreen ? '1rem' : '8rem' }}
      >
        <div className="max-w-4xl mx-auto">
          {renderPDFPage(currentPage)}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={`
        fixed bottom-6 left-1/2 transform -translate-x-1/2 z-300
        bg-card border border-border rounded-lg elevation-2 p-3
        flex items-center space-x-4
        ${isFullscreen ? 'bottom-6' : ''}
      `}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
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
                max={document.pageCount}
                autoFocus
              />
              <span className="text-sm text-muted-foreground">of {document.pageCount}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowPageInput(true)}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Page {currentPage} of {document.pageCount}
            </button>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= document.pageCount}
          className="h-8 w-8"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>

        <div className="w-px h-6 bg-border" />

        <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-8 w-8">
          <Icon name="ZoomOut" size={16} />
        </Button>

        <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>

        <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-8 w-8">
          <Icon name="ZoomIn" size={16} />
        </Button>

        <div className="w-px h-6 bg-border" />

        <Button variant="ghost" size="icon" onClick={handleBookmarkAdd} className="h-8 w-8">
          <Icon name="Bookmark" size={16} />
        </Button>

        <Button variant="ghost" size="icon" onClick={handleFullscreen} className="h-8 w-8">
          <Icon name="Maximize" size={16} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onDownload} className="h-8 w-8">
          <Icon name="Download" size={16} />
        </Button>

        <Button variant="ghost" size="icon" onClick={onPrint} className="h-8 w-8 hidden md:flex">
          <Icon name="Printer" size={16} />
        </Button>
      </div>

      {/* Fullscreen Exit Button */}
      {isFullscreen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFullscreen}
          className="fixed top-4 right-4 z-300 bg-card border border-border"
        >
          <Icon name="Minimize" size={20} />
        </Button>
      )}
    </div>
  );
};

export default EssayViewer;