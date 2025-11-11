import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import type{ Bookmark, BookmarkPanelProps } from '../Types/index';

const BookmarkPanel = ({
  bookmarks,
  onBookmarkClick,
  onBookmarkDelete,
  onBookmarkEdit,
  isVisible,
  onToggle,
  className = ''
}: BookmarkPanelProps) => {
  const [editingBookmark, setEditingBookmark] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editNote, setEditNote] = useState('');

  const handleEditStart = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark.id);
    setEditTitle(bookmark.title);
    setEditNote(bookmark.note || '');
  };

  const handleEditSave = (bookmark: Bookmark) => {
    onBookmarkEdit({
      ...bookmark,
      title: editTitle,
      note: editNote
    });
    setEditingBookmark(null);
    setEditTitle('');
    setEditNote('');
  };

  const handleEditCancel = () => {
    setEditingBookmark(null);
    setEditTitle('');
    setEditNote('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const sortedBookmarks = [...bookmarks].sort((a, b) => a.pageNumber - b.pageNumber);

  return (
    <>
      {/* Mobile Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-400 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Bookmark Panel */}
      <div className={`
        fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-card border-l border-border z-500 transition-transform duration-300
        ${isVisible ? 'translate-x-0' : 'translate-x-full'}
        ${className}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Bookmark" size={18} className="text-primary" />
              <h3 className="font-heading font-semibold text-foreground">
                Bookmarks
              </h3>
              <span className="text-sm text-muted-foreground">
                ({bookmarks.length})
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Bookmarks List */}
          <div className="flex-1 overflow-y-auto">
            {sortedBookmarks.length > 0 ? (
              <div className="p-4 space-y-3">
                {sortedBookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-academic group"
                  >
                    {editingBookmark === bookmark.id ? (
                      <div className="space-y-3">
                        <Input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Bookmark title"
                          className="text-sm"
                        />
                        <Input
                          type="text"
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          placeholder="Add a note (optional)"
                          className="text-sm"
                        />
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditSave(bookmark)}
                          >
                            <Icon name="Check" size={14} className="mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleEditCancel}
                          >
                            <Icon name="X" size={14} className="mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <button
                            onClick={() => onBookmarkClick(bookmark.pageNumber)}
                            className="flex-1 text-left"
                          >
                            <h4 className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                              {bookmark.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Page {bookmark.pageNumber} • {formatDate(bookmark.createdAt)}
                            </p>
                          </button>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditStart(bookmark)}
                              className="h-6 w-6"
                            >
                              <Icon name="Edit2" size={12} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onBookmarkDelete(bookmark.id)}
                              className="h-6 w-6 text-destructive hover:text-destructive"
                            >
                              <Icon name="Trash2" size={12} />
                            </Button>
                          </div>
                        </div>
                        {bookmark.note && (
                          <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                            {bookmark.note}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Icon name="Bookmark" size={48} className="text-muted-foreground mb-4" />
                <h4 className="font-medium text-foreground mb-2">No Bookmarks Yet</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Add bookmarks while reading to quickly return to important sections later.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              Click on any page to add a bookmark
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookmarkPanel;