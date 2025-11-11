import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { VideoAbstractsProps } from '../types';

const VideoAbstracts = ({
  abstracts,
  currentLanguage,
  onLanguageChange,
  className = ''
}: VideoAbstractsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentAbstract = abstracts.find(abs => abs.languageCode === currentLanguage) || abstracts[0];

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-primary" />
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                Video Abstract
              </h3>
              <p className="text-sm text-muted-foreground font-caption">
                Academic summary and context
              </p>
            </div>
          </div>

          {/* Desktop Language Tabs */}
          <div className="hidden md:flex items-center space-x-1 bg-muted rounded-lg p-1">
            {abstracts.map((abstract) => (
              <button
                key={abstract.languageCode}
                onClick={() => onLanguageChange(abstract.languageCode)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-academic
                  ${currentLanguage === abstract.languageCode
                    ? 'bg-background text-foreground elevation-1'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }
                `}
              >
                <span className="text-base">{abstract.flag}</span>
                <span className="hidden lg:inline">{abstract.language}</span>
              </button>
            ))}
          </div>

          {/* Mobile Language Dropdown */}
          <div className="md:hidden relative group">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <span>{currentAbstract.flag}</span>
              <span className="text-sm">{currentAbstract.language}</span>
              <Icon name="ChevronDown" size={16} />
            </Button>
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-200">
              <div className="py-1">
                {abstracts.map((abstract) => (
                  <button
                    key={abstract.languageCode}
                    onClick={() => onLanguageChange(abstract.languageCode)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-hover
                      ${currentLanguage === abstract.languageCode ? 'bg-accent/10 text-accent' : 'text-foreground'}
                    `}
                  >
                    <span>{abstract.flag}</span>
                    <span>{abstract.language}</span>
                    {currentLanguage === abstract.languageCode && (
                      <Icon name="Check" size={16} className="ml-auto text-accent" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Content */}
      <div className="p-4">
        <div className={`
          prose prose-sm max-w-none text-foreground
          ${!isExpanded ? 'line-clamp-4' : ''}
        `}>
          <div className="whitespace-pre-line leading-relaxed">
            {currentAbstract.content}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        {currentAbstract.content.length > 300 && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2"
            >
              <Icon 
                name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
              />
              <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
            </Button>
          </div>
        )}

        {/* Abstract Metadata */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={14} />
              <span>Available in {abstracts.length} languages</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" size={14} />
              <span>Academic Abstract</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} />
              <span>~2 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAbstracts;