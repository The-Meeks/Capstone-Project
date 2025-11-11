import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { VideoThumbnailsProps } from '../types';

const VideoThumbnails = ({
  videos,
  currentVideo,
  onVideoSelect,
  className = ''
}: VideoThumbnailsProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'innovation':
        return 'Lightbulb';
      case 'culture':
        return 'Users';
      case 'society':
        return 'Globe';
      case 'research':
        return 'Search';
      default:
        return 'Video';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'innovation':
        return 'text-warning';
      case 'culture':
        return 'text-accent';
      case 'society':
        return 'text-success';
      case 'research':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="PlayCircle" size={20} className="text-primary" />
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                Video Collection
              </h3>
              <p className="text-sm text-muted-foreground font-caption">
                {videos.length} presentations available
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              Total: {Math.floor(videos.reduce((acc, video) => acc + video.duration, 0) / 60)} min
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid - Desktop */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className={`
              relative group cursor-pointer rounded-lg overflow-hidden transition-academic hover-elevation
              ${currentVideo.id === video.id ? 'ring-2 ring-primary' : ''}
            `}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.thumbnailAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="Play" size={20} className="text-black ml-1" />
                </div>
              </div>

              {/* New Badge */}
              {video.isNew && (
                <div className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded">
                  NEW
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm text-foreground line-clamp-2 flex-1">
                  {video.title}
                </h4>
                <Icon 
                  name={getCategoryIcon(video.category)} 
                  size={16} 
                  className={`ml-2 flex-shrink-0 ${getCategoryColor(video.category)}`}
                />
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {video.topic}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Globe" size={12} />
                  <span>{video.languages.length} lang</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video List - Mobile */}
      <div className="md:hidden divide-y divide-border">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className={`
              flex items-center space-x-4 p-4 cursor-pointer transition-academic hover:bg-muted
              ${currentVideo.id === video.id ? 'bg-primary/5 border-l-4 border-primary' : ''}
            `}
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0">
              <Image
                src={video.thumbnail}
                alt={video.thumbnailAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {formatDuration(video.duration)}
              </div>
              {video.isNew && (
                <div className="absolute top-1 left-1 bg-accent text-white text-xs px-1 rounded">
                  NEW
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-medium text-sm text-foreground line-clamp-1 flex-1">
                  {video.title}
                </h4>
                <Icon 
                  name={getCategoryIcon(video.category)} 
                  size={14} 
                  className={`ml-2 flex-shrink-0 ${getCategoryColor(video.category)}`}
                />
              </div>
              
              <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
                {video.topic}
              </p>

              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={10} />
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Globe" size={10} />
                  <span>{video.languages.length}</span>
                </div>
              </div>
            </div>

            {/* Play Indicator */}
            {currentVideo.id === video.id && (
              <div className="flex-shrink-0">
                <Icon name="Play" size={16} className="text-primary" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoThumbnails;