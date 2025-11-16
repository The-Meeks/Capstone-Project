import React from 'react';
import Icon from '../../../components/AppIcon';
import PresentationCard from './PresentationCard';
import { PresentationGridProps } from '../types';

const PresentationGrid = ({ 
  presentations, 
  onPresentationClick, 
  currentLanguage, 
  isLoading = false 
}: PresentationGridProps) => {
  const getTranslations = () => {
    switch (currentLanguage) {
      case 'sw':
        return {
          noPresentations: 'Hakuna mawasilisho yaliyopatikana',
          noResults: 'Hakuna matokeo ya utafutaji wako',
          loading: 'Inapakia...',
          presentations: 'Mawasilisho'
        };
      default:
        return {
          noPresentations: 'No presentations found',
          noResults: 'No results match your search criteria',
          loading: 'Loading...',
          presentations: 'Presentations'
        };
    }
  };

  const t = getTranslations();

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin">
            <Icon name="Loader2" size={24} className="text-primary" />
          </div>
          <span className="text-muted-foreground font-caption">{t.loading}</span>
        </div>
      </div>
    );
  }

  if (presentations.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Icon name="Presentation" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">{t.noPresentations}</h3>
        <p className="text-muted-foreground font-caption max-w-md">{t.noResults}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground font-caption">
        {presentations.length} {t.presentations.toLowerCase()}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {presentations.map((presentation) => (
          <PresentationCard
            key={presentation.id}
            presentation={presentation}
            onClick={onPresentationClick}
            currentLanguage={currentLanguage}
          />
        ))}
      </div>
    </div>
  );
};

export default PresentationGrid;
