export interface PhotoEssayImage {
    id: string;
    src: string;
    alt: string;
    title: string;
    captions: {
      en: string;
      sw: string;
      indigenous: string;
    };
    theme: string;
    date: string;
    culturalTopic: string;
    dimensions: {
      width: number;
      height: number;
    };
    tags: string[];
  }
  
  export interface FilterOption {
    value: string;
    label: string;
    count: number;
  }
  
  export interface GalleryFilters {
    theme: string;
    date: string;
    culturalTopic: string;
    searchQuery: string;
  }
  
  export interface LightboxState {
    isOpen: boolean;
    currentIndex: number;
    isZoomed: boolean;
    zoomLevel: number;
  }
  
  export interface PhotoEssayGalleryProps {
    currentLanguage?: string;
    onLanguageChange?: (language: string) => void;
  }
  
  export interface GalleryFilterProps {
    filters: GalleryFilters;
    onFiltersChange: (filters: GalleryFilters) => void;
    themeOptions: FilterOption[];
    dateOptions: FilterOption[];
    culturalTopicOptions: FilterOption[];
    totalImages: number;
    currentLanguage: string;
  }
  
  export interface MasonryGridProps {
    images: PhotoEssayImage[];
    onImageClick: (index: number) => void;
    currentLanguage: string;
  }
  
  export interface LightboxViewerProps {
    images: PhotoEssayImage[];
    lightboxState: LightboxState;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onDownload: (image: PhotoEssayImage) => void;
    currentLanguage: string;
  }
  
  export interface PhotoCardProps {
    image: PhotoEssayImage;
    onClick: () => void;
    currentLanguage: string;
    index: number;
  }
  
  export type LanguageCode = 'en' | 'sw' | 'indigenous';
  
  export interface LanguageOption {
    code: LanguageCode;
    label: string;
    flag: string;
  }