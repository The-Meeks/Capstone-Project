import React, { useEffect, useState } from 'react';
import PhotoCard from './PhotoCard';
import { MasonryGridProps } from '../types';

const MasonryGrid = ({ images, onImageClick, currentLanguage }: MasonryGridProps) => {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(2);
      } else if (width < 1024) {
        setColumns(3);
      } else if (width < 1536) {
        setColumns(4);
      } else {
        setColumns(5);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute images across columns for masonry layout
  const distributeImages = () => {
    const columnArrays: typeof images[] = Array.from({ length: columns }, () => []);
    const columnHeights = new Array(columns).fill(0);

    images.forEach((image) => {
      // Find column with minimum height
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnArrays[minHeightIndex].push(image);
      
      // Estimate height based on aspect ratio
      const estimatedHeight = 300 * (image.dimensions.height / image.dimensions.width);
      columnHeights[minHeightIndex] += estimatedHeight + 16; // Add gap
    });

    return columnArrays;
  };

  const columnArrays = distributeImages();

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No photos found
        </h3>
        <p className="text-muted-foreground font-caption max-w-md">
          Try adjusting your search terms or filters to find the photos you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
        {columnArrays.map((columnImages, columnIndex) => (
          <div 
            key={columnIndex} 
            className="flex-1 space-y-4"
            style={{ minWidth: 0 }}
          >
            {columnImages.map((image, imageIndex) => {
              const globalIndex = images.findIndex(img => img.id === image.id);
              return (
                <PhotoCard
                  key={image.id}
                  image={image}
                  onClick={() => onImageClick(globalIndex)}
                  currentLanguage={currentLanguage}
                  index={globalIndex}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Load More Button - for future pagination */}
      {images.length > 0 && images.length % 20 === 0 && (
        <div className="flex justify-center mt-12">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Load More Photos
          </button>
        </div>
      )}
    </div>
  );
};

export default MasonryGrid;