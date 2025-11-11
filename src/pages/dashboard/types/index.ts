export interface StudentProfile {
    id: string;
    name: string;
    tagline: string;
    education: {
      degree: string;
      institution: string;
      year: string;
      gpa?: string;
    };
    contact: {
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
    };
    profileImage: string;
    profileImageAlt: string;
    skills: Skill[];
    languages: string[];
    summary: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
    category: 'technical' | 'soft' | 'language' | 'academic';
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }
  
  export interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    path: string;
    variant: 'primary' | 'secondary' | 'accent' | 'success';
    progress?: number;
    isCompleted: boolean;
  }
  
  export interface PortfolioProgress {
    totalSections: number;
    completedSections: number;
    sections: ProgressSection[];
  }
  
  export interface ProgressSection {
    id: string;
    name: string;
    isCompleted: boolean;
    progress: number;
    lastUpdated: Date;
  }
  
  export interface DashboardStats {
    totalViews: number;
    documentsUploaded: number;
    presentationsCreated: number;
    videosRecorded: number;
    essaysWritten: number;
  }
  
  export interface Language {
    code: string;
    name: string;
    flag: string;
    isActive: boolean;
  }
  
  export interface RecentActivity {
    id: string;
    type: 'upload' | 'view' | 'edit' | 'share';
    title: string;
    description: string;
    timestamp: Date;
    icon: string;
  }