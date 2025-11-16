import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { EssayViewerProps } from '../Types/index';

const EssayViewer = ({
  document: essayDoc,
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
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= essayDoc.pageCount) setCurrentPage(newPage);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePageInputSubmit = () => {
    const page = parseInt(pageInputValue);
    if (page >= 1 && page <= essayDoc.pageCount) handlePageChange(page);
    setShowPageInput(false);
    setPageInputValue(currentPage.toString());
  };

  const handleBookmarkAddClick = () => {
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
    if (e.key === 'ArrowLeft') handlePageChange(currentPage - 1);
    else if (e.key === 'ArrowRight') handlePageChange(currentPage + 1);
    else if (e.key === 'Home') handlePageChange(1);
    else if (e.key === 'End') handlePageChange(essayDoc.pageCount);
    else if (e.key === 'Escape' && isFullscreen) handleFullscreen();
  };

  const renderPDFPage = (pageNumber: number) => (
    <div
      key={pageNumber}
      className="bg-white border border-border rounded-lg mx-auto mb-4"
      style={{
        width: `${595 * zoomLevel}px`,
        height: `${842 * zoomLevel}px`,
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'top center'
      }}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">{essayDoc.title}</h1>
          {essayDoc.subtitle && <h2 className="text-lg text-muted-foreground">{essayDoc.subtitle}</h2>}
          <p className="text-sm text-muted-foreground mt-4">by {essayDoc.author}</p>
        </div>

        <div className="flex-1 space-y-4 text-sm text-foreground leading-relaxed">
          <p>This is page {pageNumber}. Replace this with actual PDF content.</p>
          <p>Academic journey, personal growth, and professional aspirations details here.</p>
          {pageNumber > 1 && (
            <>
              <h3 className="text-lg font-semibold mt-4">Chapter {Math.ceil(pageNumber / 3)}</h3>
              <p>Continuation of academic milestones and personal development.</p>
            </>
          )}
        </div>

        <div className="text-center text-xs text-muted-foreground mt-4">
          Page {pageNumber} of {essayDoc.pageCount}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative bg-muted/30 min-h-screen ${isFullscreen ? 'fixed inset-0 z-[9999]' : ''} ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Viewer */}
      <div ref={viewerRef} className="h-full overflow-auto p-4" style={{ paddingTop: isFullscreen ? '1rem' : '8rem' }}>
        <div className="max-w-4xl mx-auto">{renderPDFPage(currentPage)}</div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-card border border-border rounded-lg p-3 flex items-center space-x-3">
        <Button variant="ghost" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          <Icon name="ChevronLeft" size={16} />
        </Button>

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
              max={essayDoc.pageCount}
              autoFocus
            />
            <span className="text-sm text-muted-foreground">of {essayDoc.pageCount}</span>
          </div>
        ) : (
          <button onClick={() => setShowPageInput(true)} className="text-sm text-foreground hover:text-primary transition-colors">
            Page {currentPage} of {essayDoc.pageCount}
          </button>
        )}

        <Button variant="ghost" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= essayDoc.pageCount}>
          <Icon name="ChevronRight" size={16} />
        </Button>

        <div className="w-px h-6 bg-border" />
        <Button variant="ghost" size="icon" onClick={handleZoomOut}><Icon name="ZoomOut" size={16} /></Button>
        <span className="text-sm text-muted-foreground min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</span>
        <Button variant="ghost" size="icon" onClick={handleZoomIn}><Icon name="ZoomIn" size={16} /></Button>

        <div className="w-px h-6 bg-border" />
        <Button variant="ghost" size="icon" onClick={handleBookmarkAddClick}><Icon name="Bookmark" size={16} /></Button>
        <Button variant="ghost" size="icon" onClick={handleFullscreen}><Icon name="Maximize" size={16} /></Button>
        <Button variant="ghost" size="icon" onClick={onDownload}><Icon name="Download" size={16} /></Button>
        <Button variant="ghost" size="icon" onClick={onPrint} className="hidden md:flex"><Icon name="Printer" size={16} /></Button>
      </div>

      {/* Fullscreen Exit */}
      {isFullscreen && (
        <Button variant="ghost" size="icon" onClick={handleFullscreen} className="fixed top-4 right-4 z-50 bg-card border border-border">
          <Icon name="Minimize" size={20} />
        </Button>
      )}
    </div>
  );
};

export default EssayViewer;
