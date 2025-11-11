export interface Presentation {
    id: string;
    title: string;
    description: string;
    type: 'powerpoint' | 'pdf';
    category: string;
    subject: string;
    date: string;
    duration: number; // in minutes
    thumbnailUrl: string;
    thumbnailAlt: string;
    fileUrl: string;
    slideCount: number;
    language: 'en' | 'sw' | 'indigenous';
    tags: string[];
  }
  
  export interface PresentationSlide {
    id: string;
    slideNumber: number;
    imageUrl: string;
    imageAlt: string;
    title?: string;
    notes?: string;
  }
  
  export interface FilterOptions {
    category: string;
    subject: string;
    type: string;
    language: string;
    sortBy: 'date' | 'title' | 'duration';
    sortOrder: 'asc' | 'desc';
  }
  
  export interface PresentationViewerProps {
    presentation: Presentation | null;
    isOpen: boolean;
    onClose: () => void;
    currentSlide: number;
    onSlideChange: (slideNumber: number) => void;
  }
  
  export interface PresentationCardProps {
    presentation: Presentation;
    onClick: (presentation: Presentation) => void;
    currentLanguage: string;
  }
  
  export interface PresentationFiltersProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    currentLanguage: string;
  }
  
  export interface PresentationGridProps {
    presentations: Presentation[];
    onPresentationClick: (presentation: Presentation) => void;
    currentLanguage: string;
    isLoading?: boolean;
  }