import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DashboardQuickActions from '../../components/ui/DashboardQuickActions';

import {
  StudentProfile,
  PortfolioProgress as PortfolioProgressType,
  DashboardStats as DashboardStatsType,
  RecentActivity as RecentActivityType
} from './types';
import StudentProfileCard from './components/StudentProfile';
import DashboardStats from './components/DashboardStats';
import PortfolioProgress from './components/PortfolioProgram';
import RecentActivity from './components/RecentActivity';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle for mobile
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Collapse for desktop

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolioLanguage');
    if (savedLanguage) setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('portfolioLanguage', language);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const collapseSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  // Mock student profile
  const studentProfile: StudentProfile = {
    id: 'student-001',
    name: 'Amara Okafor',
    tagline: 'Innovative Computer Science Student & Cultural Preservation Advocate',
    education: {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Nairobi',
      year: '2024',
      gpa: '3.85/4.0'
    },
    contact: {
      email: 'amara.okafor@university.ac.ke',
      phone: '+254 712 345 678',
      location: 'Nairobi, Kenya',
      linkedin: 'https://linkedin.com/in/amara-okafor'
    },
    profileImage:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1c5746a0d-1762273807933.png',
    profileImageAlt:
      'Professional headshot of young African woman with braided hair wearing blue blazer, smiling confidently at camera',
    skills: [
      { id: '1', name: 'React Development', category: 'technical', level: 'advanced' },
      { id: '2', name: 'Python Programming', category: 'technical', level: 'expert' },
      { id: '3', name: 'UI/UX Design', category: 'technical', level: 'intermediate' },
      { id: '4', name: 'Leadership', category: 'soft', level: 'advanced' },
      { id: '5', name: 'Public Speaking', category: 'soft', level: 'expert' },
      { id: '6', name: 'English', category: 'language', level: 'expert' },
      { id: '7', name: 'Kiswahili', category: 'language', level: 'expert' },
      { id: '8', name: 'Igbo', category: 'language', level: 'advanced' },
      { id: '9', name: 'Research Methods', category: 'academic', level: 'advanced' },
      { id: '10', name: 'Data Analysis', category: 'academic', level: 'intermediate' }
    ],
    languages: ['English', 'Kiswahili', 'Igbo'],
    summary: `Passionate computer science student with a deep commitment to preserving African cultural heritage through technology. My capstone project explores innovative solutions for documenting and sharing indigenous knowledge systems while addressing modern societal challenges. I combine technical expertise in software development with cultural research to create meaningful digital experiences that bridge traditional wisdom and contemporary innovation.`
  };

  // Mock portfolio progress
  const portfolioProgress: PortfolioProgressType = {
    totalSections: 8,
    completedSections: 6,
    sections: [
      { id: 'resume', name: 'Multilingual Resume', isCompleted: true, progress: 100, lastUpdated: new Date(Date.now() - 86400000) },
      { id: 'presentations', name: 'Academic Presentations', isCompleted: true, progress: 100, lastUpdated: new Date(Date.now() - 172800000) },
      { id: 'videos', name: 'Video Presentations', isCompleted: true, progress: 100, lastUpdated: new Date(Date.now() - 259200000) },
      { id: 'essays', name: 'Autobiographical Essay', isCompleted: true, progress: 100, lastUpdated: new Date(Date.now() - 345600000) },
      { id: 'photos', name: 'Photographic Essays', isCompleted: true, progress: 100, lastUpdated: new Date(Date.now() - 432000000) },
      { id: 'innovation', name: 'Innovation Showcase', isCompleted: true, progress: 100, lastUpdated: new Date(Date.now() - 518400000) },
      { id: 'culture', name: 'African Culture Presentation', isCompleted: false, progress: 75, lastUpdated: new Date(Date.now() - 604800000) },
      { id: 'challenges', name: 'Modern Society Challenges', isCompleted: false, progress: 60, lastUpdated: new Date(Date.now() - 691200000) }
    ]
  };

  // Mock dashboard stats
  const dashboardStats: DashboardStatsType = {
    totalViews: 1247,
    documentsUploaded: 12,
    presentationsCreated: 8,
    videosRecorded: 6,
    essaysWritten: 4
  };

  // Mock recent activities
  const recentActivities: RecentActivityType[] = [
    { id: '1', type: 'upload', title: 'Innovation Presentation', description: 'Uploaded final slides for technology innovation showcase presentation', timestamp: new Date(Date.now() - 3600000), icon: 'Upload' },
    { id: '2', type: 'edit', title: 'Resume Document', description: 'Updated skills section and added recent project experience', timestamp: new Date(Date.now() - 7200000), icon: 'Edit3' },
    { id: '3', type: 'view', title: 'Portfolio Analytics', description: 'Reviewed portfolio performance metrics and visitor engagement', timestamp: new Date(Date.now() - 14400000), icon: 'Eye' },
    { id: '4', type: 'share', title: 'Video Presentation', description: 'Shared cultural preservation video with academic review committee', timestamp: new Date(Date.now() - 28800000), icon: 'Share2' },
    { id: '5', type: 'upload', title: 'Photo Essay Collection', description: 'Added new images to community development photographic essay', timestamp: new Date(Date.now() - 86400000), icon: 'Camera' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header
        onMenuToggle={toggleSidebar}
        isMobileMenuOpen={isSidebarOpen}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isSidebarOpen}
          onMobileClose={() => setIsSidebarOpen(false)}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 p-6 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'} ${isSidebarCollapsed ? 'lg:ml-20' : ''}`}
        >
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Welcome back, {studentProfile.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your capstone portfolio progress and recent activity.
            </p>
          </div>

          {/* Student Profile Card */}
          <StudentProfileCard
            profile={studentProfile}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-6">
            <div className="xl:col-span-2 space-y-8">
              <DashboardQuickActions />
              <PortfolioProgress progress={portfolioProgress} />
              <DashboardStats stats={dashboardStats} />
            </div>
            <div className="space-y-8">
              <RecentActivity activities={recentActivities} />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Ready to share your portfolio?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your capstone portfolio is {Math.round((portfolioProgress.completedSections / portfolioProgress.totalSections) * 100)}% complete and ready for academic review.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/resume-viewer')}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Preview Portfolio
                </button>
                <button
                  onClick={() => navigate('/presentations-gallery')}
                  className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
