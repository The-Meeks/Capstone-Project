import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { DocumentOutlineProps, EssayChapter } from '../types';

const DocumentOutline = ({
  chapters,
  currentPage,
  onChapterClick,
  isVisible,
  onToggle,
  className = ''
}: DocumentOutlineProps) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const isChapterActive = (chapter: EssayChapter): boolean => {
    return currentPage >= chapter.pageNumber && 
           (!getNextChapter(chapter) || currentPage < getNextChapter(chapter)!.pageNumber);
  };

  const getNextChapter = (currentChapter: EssayChapter): EssayChapter | null => {
    const allChapters = flattenChapters(chapters);
    const currentIndex = allChapters.findIndex(ch => ch.id === currentChapter.id);
    return currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
  };

  const flattenChapters = (chapters: EssayChapter[]): EssayChapter[] => {
    const result: EssayChapter[] = [];
    chapters.forEach(chapter => {
      result.push(chapter);
      if (chapter.children) {
        result.push(...flattenChapters(chapter.children));
      }
    });
    return result;
  };

  const renderChapter = (chapter: EssayChapter, depth: number = 0) => {
    const isExpanded = expandedChapters.includes(chapter.id);
    const isActive = isChapterActive(chapter);
    const hasChildren = chapter.children && chapter.children.length > 0;

    return (
      <div key={chapter.id} className="space-y-1">
        <div
          className={`
            flex items-center justify-between p-2 rounded-md cursor-pointer transition-academic group
            ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'}
          `}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => onChapterClick(chapter.pageNumber)}
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            {hasChildren && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleChapter(chapter.id);
                }}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <Icon
                  name="ChevronRight"
                  size={12}
                  className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                />
              </Button>
            )}
            <span className={`text-sm truncate ${isActive ? 'font-medium' : ''}`}>
              {chapter.title}
            </span>
          </div>
          <span className={`text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
            {chapter.pageNumber}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {chapter.children!.map(child => renderChapter(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed top-20 left-4 z-300 lg:hidden bg-card border border-border elevation-1"
      >
        <Icon name="List" size={20} />
      </Button>

      {/* Mobile Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-400 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Outline Panel */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-card border-r border-border z-500 transition-transform duration-300
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-200
        ${className}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="List" size={18} className="text-primary" />
              <h3 className="font-heading font-semibold text-foreground">
                Document Outline
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Reading Progress</span>
              <span className="text-sm font-medium text-foreground">
                Page {currentPage}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / Math.max(...chapters.map(ch => ch.pageNumber))) * 100}%` }}
              />
            </div>
          </div>

          {/* Chapters List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {chapters.length > 0 ? (
              chapters.map(chapter => renderChapter(chapter))
            ) : (
              <div className="text-center py-8">
                <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No outline available for this document
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => onChapterClick(1)}
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Go to Beginning
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                const lastChapter = flattenChapters(chapters).pop();
                if (lastChapter) onChapterClick(lastChapter.pageNumber);
              }}
            >
              <Icon name="FastForward" size={16} className="mr-2" />
              Go to End
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentOutline;