export interface EssayDocument {
    id: string;
    title: string;
    subtitle?: string;
    author: string;
    language: 'en' | 'sw' | 'indigenous';
    pageCount: number;
    fileSize: string;
    lastModified: Date;
    pdfUrl: string;
    thumbnailUrl: string;
    description: string;
    chapters: EssayChapter[];
    tags: string[];
    readingTime: number;
  }
  
  export interface EssayChapter {
    id: string;
    title: string;
    pageNumber: number;
    level: number;
    children?: EssayChapter[];
  }
  
  export interface ReadingProgress {
    currentPage: number;
    totalPages: number;
    percentage: number;
    timeSpent: number;
    bookmarks: Bookmark[];
  }
  
  export interface Bookmark {
    id: string;
    pageNumber: number;
    title: string;
    note?: string;
    createdAt: Date;
  }
  
  export interface ViewerSettings {
    zoomLevel: number;
    viewMode: 'single' | 'double' | 'continuous';
    theme: 'light' | 'dark' | 'sepia';
    fontSize: 'small' | 'medium' | 'large';
    showOutline: boolean;
    showBookmarks: boolean;
  }
  
  export interface SearchResult {
    pageNumber: number;
    text: string;
    context: string;
    highlightIndex: number;
  }
  
  export interface EssayViewerProps {
    document: EssayDocument;
    onPageChange?: (page: number) => void;
    onBookmarkAdd?: (bookmark: Bookmark) => void;
    onDownload?: () => void;
    onPrint?: () => void;
    className?: string;
  }
  
  export interface DocumentOutlineProps {
    chapters: EssayChapter[];
    currentPage: number;
    onChapterClick: (pageNumber: number) => void;
    isVisible: boolean;
    onToggle: () => void;
    className?: string;
  }
  
  export interface ReadingControlsProps {
    progress: ReadingProgress;
    settings: ViewerSettings;
    onSettingsChange: (settings: Partial<ViewerSettings>) => void;
    onSearch: (query: string) => void;
    onBookmarkToggle: () => void;
    onFullscreen: () => void;
    onDownload: () => void;
    onPrint: () => void;
    className?: string;
  }
  
  export interface BookmarkPanelProps {
    bookmarks: Bookmark[];
    onBookmarkClick: (pageNumber: number) => void;
    onBookmarkDelete: (bookmarkId: string) => void;
    onBookmarkEdit: (bookmark: Bookmark) => void;
    isVisible: boolean;
    onToggle: () => void;
    className?: string;
  }
  
  export interface SearchPanelProps {
    searchResults: SearchResult[];
    currentQuery: string;
    isSearching: boolean;
    onSearch: (query: string) => void;
    onResultClick: (pageNumber: number) => void;
    onClose: () => void;
    isVisible: boolean;
    className?: string;
  }