import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { ReadingControlsProps } from '../Types/index';

const ReadingControls = ({
  progress,
  settings,
  onSettingsChange,
  onSearch,
  onBookmarkToggle,
  onFullscreen,
  onDownload,
  onPrint,
  className = ''
}: ReadingControlsProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const zoomOptions = [
    { value: 0.5, label: '50%' },
    { value: 0.75, label: '75%' },
    { value: 1, label: '100%' },
    { value: 1.25, label: '125%' },
    { value: 1.5, label: '150%' },
    { value: 2, label: '200%' }
  ];

  const viewModeOptions = [
    { value: 'single', label: 'Single Page' },
    { value: 'double', label: 'Double Page' },
    { value: 'continuous', label: 'Continuous' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'sepia', label: 'Sepia' }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSearch(false);
    }
  };

  const formatReadingTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className={`
      fixed top-16 right-0 left-0 lg:left-80 z-200 bg-card border-b border-border p-4
      ${className}
    `}>
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center space-x-4">
          {/* Progress Info */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Page </span>
              <span className="font-medium text-foreground">
                {progress.currentPage} of {progress.totalPages}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="text-sm text-muted-foreground">
              {progress.percentage.toFixed(0)}% complete
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="text-sm text-muted-foreground">
              Reading time: {formatReadingTime(Math.floor(progress.timeSpent / 60))}
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">
              {progress.currentPage}/{progress.totalPages}
            </span>
            <div className="w-20 bg-muted rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className={showSearch ? 'bg-primary/10 text-primary' : ''}
          >
            <Icon name="Search" size={18} />
          </Button>

          {/* Bookmark Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onBookmarkToggle}
          >
            <Icon name="Bookmark" size={18} />
          </Button>

          {/* Settings Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className={showSettings ? 'bg-primary/10 text-primary' : ''}
          >
            <Icon name="Settings" size={18} />
          </Button>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onFullscreen}
            className="hidden md:flex"
          >
            <Icon name="Maximize" size={18} />
          </Button>

          {/* Download */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onDownload}
          >
            <Icon name="Download" size={18} />
          </Button>

          {/* Print */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrint}
            className="hidden md:flex"
          >
            <Icon name="Printer" size={18} />
          </Button>
        </div>
      </div>

      {/* Search Panel */}
      {showSearch && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search within document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button type="submit" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Search
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </form>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Select
                label="Zoom Level"
                options={zoomOptions}
                value={settings.zoomLevel}
                onChange={(value) => onSettingsChange({ zoomLevel: value as number })}
              />
            </div>
            <div>
              <Select
                label="View Mode"
                options={viewModeOptions}
                value={settings.viewMode}
                onChange={(value) => onSettingsChange({ viewMode: value as any })}
              />
            </div>
            <div>
              <Select
                label="Theme"
                options={themeOptions}
                value={settings.theme}
                onChange={(value) => onSettingsChange({ theme: value as any })}
              />
            </div>
            <div>
              <Select
                label="Font Size"
                options={fontSizeOptions}
                value={settings.fontSize}
                onChange={(value) => onSettingsChange({ fontSize: value as any })}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(false)}
            >
              <Icon name="X" size={16} className="mr-2" />
              Close Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingControls;