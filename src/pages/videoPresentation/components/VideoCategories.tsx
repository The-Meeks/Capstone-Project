import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { VideoCategoriesProps } from '../types';

const VideoCategories = ({
  categories,
  selectedCategory,
  onCategorySelect,
  className = ''
}: VideoCategoriesProps) => {
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'all':
        return 'Grid3X3';
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

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'innovation':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'culture':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'society':
        return 'bg-success/10 text-success border-success/20';
      case 'research':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Categories
            </h3>
            <p className="text-sm text-muted-foreground font-caption">
              Filter by presentation type
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Category Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`
              relative p-4 rounded-lg border transition-academic hover-elevation text-left group
              ${selectedCategory === category.id 
                ? getCategoryColor(category.id) + 'ring-2 ring-current ring-opacity-20' :'bg-background hover:bg-muted border-border text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${selectedCategory === category.id 
                  ? 'bg-current bg-opacity-10' :'bg-muted group-hover:bg-muted-foreground/10'
                }
              `}>
                <Icon 
                  name={getCategoryIcon(category.id)} 
                  size={20} 
                  className={selectedCategory === category.id ? 'text-current' : 'text-muted-foreground group-hover:text-foreground'}
                />
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">
                  {category.name}
                </h4>
                <p className="text-xs opacity-75">
                  {category.count} videos
                </p>
              </div>
            </div>

            {selectedCategory === category.id && (
              <div className="absolute top-2 right-2">
                <Icon name="Check" size={14} className="text-current" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Mobile Category Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect(category.id)}
              className="flex-shrink-0 flex items-center space-x-2"
            >
              <Icon name={getCategoryIcon(category.id)} size={16} />
              <span>{category.name}</span>
              <span className="text-xs opacity-75">({category.count})</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Category Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {categories.reduce((acc, cat) => acc + cat.count, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Videos</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {categories.length - 1}
            </div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">3</div>
            <div className="text-xs text-muted-foreground">Languages</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">HD</div>
            <div className="text-xs text-muted-foreground">Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCategories;