import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { SearchPanelProps, SearchResult } from '../Types/index';

const SearchPanel = ({
  searchResults,
  currentQuery,
  isSearching,
  onSearch,
  onResultClick,
  onClose,
  isVisible,
  className = ''
}: SearchPanelProps) => {
  const [searchInput, setSearchInput] = useState(currentQuery);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleResultClick = (result: SearchResult, index: number) => {
    setSelectedResultIndex(index);
    onResultClick(result.pageNumber);
  };

  const highlightSearchTerm = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-secondary/30 text-secondary-foreground px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!searchResults.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (selectedResultIndex + 1) % searchResults.length;
      setSelectedResultIndex(nextIndex);
      onResultClick(searchResults[nextIndex].pageNumber);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = selectedResultIndex === 0 ? searchResults.length - 1 : selectedResultIndex - 1;
      setSelectedResultIndex(prevIndex);
      onResultClick(searchResults[prevIndex].pageNumber);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`
      fixed top-32 right-4 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg elevation-2 z-300
      ${className}
    `}>
      <div className="flex flex-col max-h-[60vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={18} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              Search Document
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search for text..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-background"
                  autoFocus
                />
              </div>
              <Button type="submit" size="sm" disabled={isSearching}>
                {isSearching ? (
                  <Icon name="Loader2" size={16} className="animate-spin" />
                ) : (
                  <Icon name="Search" size={16} />
                )}
              </Button>
            </div>
            
            {currentQuery && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{currentQuery}"
                </span>
                {searchResults.length > 0 && (
                  <span className="text-muted-foreground">
                    {selectedResultIndex + 1} of {searchResults.length}
                  </span>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-8">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-2 space-y-1">
              {searchResults.map((result, index) => (
                <button
                  key={`${result.pageNumber}-${result.highlightIndex}`}
                  onClick={() => handleResultClick(result, index)}
                  className={`
                    w-full p-3 text-left rounded-md transition-academic hover:bg-muted
                    ${index === selectedResultIndex ? 'bg-primary/10 border border-primary/20' : 'border border-transparent'}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Page {result.pageNumber}
                    </span>
                    <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlightSearchTerm(result.context, currentQuery)}
                  </p>
                </button>
              ))}
            </div>
          ) : currentQuery ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Icon name="SearchX" size={48} className="text-muted-foreground mb-4" />
              <h4 className="font-medium text-foreground mb-2">No Results Found</h4>
              <p className="text-sm text-muted-foreground">
                No matches found for "{currentQuery}". Try different keywords.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
              <h4 className="font-medium text-foreground mb-2">Search Document</h4>
              <p className="text-sm text-muted-foreground">
                Enter keywords to search through the document content.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {searchResults.length > 0 && (
          <div className="p-3 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Use ↑↓ arrow keys to navigate</span>
              <span>Press Esc to close</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;