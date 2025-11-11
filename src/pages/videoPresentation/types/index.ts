export interface VideoPresentation {
    id: string;
    title: string;
    duration: number;
    thumbnail: string;
    thumbnailAlt: string;
    videoUrl: string;
    topic: string;
    category: 'innovation' | 'culture' | 'society' | 'research';
    languages: string[];
    abstracts: {
      [key: string]: string;
    };
    uploadDate: Date;
    views: number;
    isNew?: boolean;
  }
  
  export interface VideoPlayerState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;
    isFullscreen: boolean;
    isLoading: boolean;
    buffered: number;
  }
  
  export interface VideoAbstract {
    language: string;
    languageCode: string;
    content: string;
    flag: string;
  }
  
  export interface VideoCategory {
    id: string;
    name: string;
    icon: string;
    count: number;
  }
  
  export interface VideoPlayerProps {
    video: VideoPresentation;
    playerState: VideoPlayerState;
    onPlay: () => void;
    onPause: () => void;
    onSeek: (time: number) => void;
    onVolumeChange: (volume: number) => void;
    onMute: () => void;
    onFullscreen: () => void;
    className?: string;
  }
  
  export interface VideoAbstractsProps {
    abstracts: VideoAbstract[];
    currentLanguage: string;
    onLanguageChange: (language: string) => void;
    className?: string;
  }
  
  export interface VideoThumbnailsProps {
    videos: VideoPresentation[];
    currentVideo: VideoPresentation;
    onVideoSelect: (video: VideoPresentation) => void;
    className?: string;
  }
  
  export interface VideoCategoriesProps {
    categories: VideoCategory[];
    selectedCategory: string;
    onCategorySelect: (categoryId: string) => void;
    className?: string;
  }