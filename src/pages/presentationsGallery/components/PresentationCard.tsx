import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { PresentationCardProps } from '../types';

const PresentationCard = ({ presentation, onClick, currentLanguage }: PresentationCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'powerpoint':
        return 'Presentation';
      case 'pdf':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'powerpoint':
        return 'text-orange-600 bg-orange-50';
      case 'pdf':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'sw-TZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={() => onClick(presentation)}
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src={presentation.thumbnailUrl}
          alt={presentation.thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay Play Icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
            <Icon name="Play" size={20} className="text-primary" />
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(presentation.type)}`}>
            <Icon name={getTypeIcon(presentation.type)} size={12} />
            <span className="uppercase">{presentation.type}</span>
          </div>
        </div>

        {/* Slide Count */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
          {presentation.slideCount} slides
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-heading font-semibold text-foreground text-lg sm:text-xl group-hover:text-primary transition-colors line-clamp-2">
          {presentation.title}
        </h3>
        <p className="text-sm text-muted-foreground font-caption leading-relaxed line-clamp-3">
          {presentation.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground space-y-2 sm:space-y-0">
          <div className="flex flex-wrap items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{formatDate(presentation.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{formatDuration(presentation.duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Icon name="Tag" size={12} />
            <span className="capitalize">{presentation.category}</span>
          </div>
        </div>

        {/* Tags */}
        {presentation.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {presentation.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-caption"
              >
                {tag}
              </span>
            ))}
            {presentation.tags.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-caption">
                +{presentation.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationCard;
