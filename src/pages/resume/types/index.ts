export interface ResumeDocument {
    id: string;
    language: string;
    languageCode: string;
    title: string;
    pdfUrl: string;
    downloadUrl: string;
    totalPages: number;
    lastModified: Date;
    fileSize: string;
  }
  
  export interface StudentProfile {
    id: string;
    name: string;
    tagline: string;
    avatar: string;
    avatarAlt: string;
    email: string;
    phone: string;
    location: string;
    education: EducationItem[];
    skills: SkillCategory[];
    summary: string;
  }
  
  export interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
    honors?: string;
  }
  
  export interface SkillCategory {
    id: string;
    category: string;
    skills: string[];
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }
  
  export interface PDFViewerState {
    currentPage: number;
    totalPages: number;
    zoom: number;
    isFullscreen: boolean;
    isLoading: boolean;
  }
  
  export interface LanguageTab {
    code: string;
    label: string;
    flag: string;
    isActive: boolean;
  }