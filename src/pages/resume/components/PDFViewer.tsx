import React, { useState, useEffect } from 'react';
import { PDFViewerState } from '../types';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onDownload: () => void;
  className?: string;
}

const PDFViewer = ({ pdfUrl, title, onDownload, className = '' }: PDFViewerProps) => {
  const [viewerState, setViewerState] = useState<PDFViewerState>({
    currentPage: 1,
    totalPages: 3,
    zoom: 100,
    isFullscreen: false,
    isLoading: true
  });

  useEffect(() => {
    // Simulate PDF loading
    const timer = setTimeout(() => {
      setViewerState(prev => ({ ...prev, isLoading: false }));
    }, 1500);

    return () => clearTimeout(timer);
  }, [pdfUrl]);

  const handleZoomIn = () => {
    setViewerState(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom + 25, 200)
    }));
  };

  const handleZoomOut = () => {
    setViewerState(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom - 25, 50)
    }));
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= viewerState.totalPages) {
      setViewerState(prev => ({ ...prev, currentPage: page }));
    }
  };

  const handleFullscreen = () => {
    setViewerState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* PDF Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <h3 className="font-heading font-semibold text-foreground">{title}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Page</span>
            <input
              type="number"
              value={viewerState.currentPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
              className="w-12 h-6 text-center border border-border rounded bg-background text-foreground"
              min="1"
              max={viewerState.totalPages}
            />
            <span>of {viewerState.totalPages}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(viewerState.currentPage - 1)}
            disabled={viewerState.currentPage <= 1}
            className="h-8 w-8"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(viewerState.currentPage + 1)}
            disabled={viewerState.currentPage >= viewerState.totalPages}
            className="h-8 w-8"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={viewerState.zoom <= 50}
            className="h-8 w-8"
          >
            <Icon name="ZoomOut" size={16} />
          </Button>

          <span className="text-sm text-muted-foreground min-w-[50px] text-center">
            {viewerState.zoom}%
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={viewerState.zoom >= 200}
            className="h-8 w-8"
          >
            <Icon name="ZoomIn" size={16} />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrint}
            className="h-8 w-8"
          >
            <Icon name="Printer" size={16} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onDownload}
            className="h-8 w-8"
          >
            <Icon name="Download" size={16} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreen}
            className="h-8 w-8"
          >
            <Icon name="Maximize" size={16} />
          </Button>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="relative bg-muted/20 min-h-[600px] flex items-center justify-center">
        {viewerState.isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading PDF document...</p>
          </div>
        ) : (
          <div 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-200"
            style={{ 
              transform: `scale(${viewerState.zoom / 100})`,
              transformOrigin: 'center top'
            }}
          >
            {/* Mock PDF Content */}
            <div className="w-[595px] h-[842px] p-12 bg-white">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center border-b border-gray-200 pb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    AMARA OCHIENG WANJIKU
                  </h1>
                  <p className="text-gray-600">Computer Science Student</p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500 mt-2">
                    <span>amara.wanjiku@university.ac.ke</span>
                    <span>•</span>
                    <span>+254 712 345 678</span>
                    <span>•</span>
                    <span>Nairobi, Kenya</span>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    EDUCATION
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Bachelor of Science in Computer Science
                          </h3>
                          <p className="text-gray-600">University of Nairobi</p>
                        </div>
                        <span className="text-gray-500 text-sm">2020 - 2024</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        GPA: 3.8/4.0 • Dean's List • Capstone Project: AI-Powered Agricultural Advisory System
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    TECHNICAL SKILLS
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Programming Languages</h4>
                      <p className="text-gray-600">Python, JavaScript, Java, C++, SQL</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Frameworks & Tools</h4>
                      <p className="text-gray-600">React, Node.js, Django, Git, Docker</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    EXPERIENCE
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">Software Development Intern</h3>
                          <p className="text-gray-600">Safaricom PLC</p>
                        </div>
                        <span className="text-gray-500 text-sm">Jun 2023 - Aug 2023</span>
                      </div>
                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                        <li>• Developed mobile payment integration features using Java and Android SDK</li>
                        <li>• Collaborated with cross-functional teams to improve user experience</li>
                        <li>• Participated in code reviews and agile development processes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Page Navigation Footer */}
      <div className="flex items-center justify-center p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(viewerState.currentPage - 1)}
            disabled={viewerState.currentPage <= 1}
          >
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: viewerState.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  w-8 h-8 rounded-md text-sm font-medium transition-colors
                  ${page === viewerState.currentPage
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(viewerState.currentPage + 1)}
            disabled={viewerState.currentPage >= viewerState.totalPages}
          >
            Next
            <Icon name="ChevronRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;