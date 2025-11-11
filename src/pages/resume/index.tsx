import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ResumeDocument, StudentProfile, LanguageTab } from './types';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LanguageTabs from './components/LanguageTabs';
import PDFViewer from './components/PDFViewer';
import ProfileCard from './components/ProfileCard';
import DownloadActions from './components/DownloadActions';

const ResumeViewer = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('en');

  // Mock resume documents data
  const resumeDocuments: ResumeDocument[] = [
  {
    id: 'resume-en',
    language: 'English',
    languageCode: 'en',
    title: 'Resume - English',
    pdfUrl: '/assets/documents/resume-english.pdf',
    downloadUrl: '/assets/documents/resume-english.pdf',
    totalPages: 3,
    lastModified: new Date('2024-01-15'),
    fileSize: '2.4 MB'
  },
  {
    id: 'resume-sw',
    language: 'Kiswahili',
    languageCode: 'sw',
    title: 'Wasifu - Kiswahili',
    pdfUrl: '/assets/documents/resume-kiswahili.pdf',
    downloadUrl: '/assets/documents/resume-kiswahili.pdf',
    totalPages: 3,
    lastModified: new Date('2024-01-15'),
    fileSize: '2.6 MB'
  },
  {
    id: 'resume-luo',
    language: 'Dholuo',
    languageCode: 'luo',
    title: 'Nonro Tich - Dholuo',
    pdfUrl: '/assets/documents/resume-dholuo.pdf',
    downloadUrl: '/assets/documents/resume-dholuo.pdf',
    totalPages: 3,
    lastModified: new Date('2024-01-15'),
    fileSize: '2.5 MB'
  }];


  // Mock student profile data
  const studentProfile: StudentProfile = {
    id: 'student-001',
    name: 'Amara Ochieng Wanjiku',
    tagline: 'Computer Science Student & Innovation Enthusiast',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c5746a0d-1762273807933.png",
    avatarAlt: 'Professional headshot of young African woman with natural hair wearing blue blazer, smiling confidently at camera',
    email: 'amara.wanjiku@university.ac.ke',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Nairobi',
      year: '2020 - 2024',
      gpa: '3.8/4.0',
      honors: 'Dean\'s List, Magna Cum Laude'
    },
    {
      id: 'edu-2',
      degree: 'Kenya Certificate of Secondary Education',
      institution: 'Alliance High School',
      year: '2016 - 2019',
      gpa: 'A- (84 points)'
    }],

    skills: [
    {
      id: 'skill-1',
      category: 'Programming',
      skills: ['Python', 'JavaScript', 'Java', 'C++', 'SQL'],
      level: 'Advanced'
    },
    {
      id: 'skill-2',
      category: 'Web Development',
      skills: ['React', 'Node.js', 'Django', 'HTML/CSS', 'REST APIs'],
      level: 'Advanced'
    },
    {
      id: 'skill-3',
      category: 'Data Science',
      skills: ['Machine Learning', 'Data Analysis', 'TensorFlow', 'Pandas'],
      level: 'Intermediate'
    },
    {
      id: 'skill-4',
      category: 'Languages',
      skills: ['English', 'Kiswahili', 'Dholuo', 'French'],
      level: 'Expert'
    }],

    summary: `Passionate computer science student with a strong foundation in software development and data science. Experienced in building web applications and machine learning models. Committed to using technology to solve real-world problems, particularly in agricultural and healthcare sectors. Fluent in multiple languages with a deep appreciation for African culture and innovation.`
  };

  // Language tabs configuration
  const languageTabs: LanguageTab[] = [
  { code: 'en', label: 'English', flag: '🇺🇸', isActive: activeTab === 'en' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪', isActive: activeTab === 'sw' },
  { code: 'luo', label: 'Dholuo', flag: '🏛️', isActive: activeTab === 'luo' }];


  // Get active document
  const activeDocument = resumeDocuments.find((doc) => doc.languageCode === activeTab) || resumeDocuments[0];

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  // Handle tab change
  const handleTabChange = (tabCode: string) => {
    setActiveTab(tabCode);
  };

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle mobile menu close
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle document download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = activeDocument.downloadUrl;
    link.download = `${activeDocument.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resume Viewer - Student Portfolio</title>
        <meta name="description" content="View and download multilingual resume documents with professional PDF viewing capabilities" />
      </Helmet>

      {/* Header */}
      <Header
        onMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange} />


      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={handleMobileMenuClose}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange} />


      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <button
                onClick={() => handleNavigation('/student-dashboard')}
                className="hover:text-foreground transition-colors">

                Dashboard
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Resume Viewer</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Resume Viewer
                </h1>
                <p className="text-muted-foreground font-caption">
                  View and download multilingual resume documents
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/student-dashboard')}>

                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Back to Dashboard
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleDownload}>

                  <Icon name="Download" size={16} className="mr-2" />
                  Download Current
                </Button>
              </div>
            </div>
          </div>

          {/* Language Tabs */}
          <div className="mb-6">
            <LanguageTabs
              tabs={languageTabs}
              activeTab={activeTab}
              onTabChange={handleTabChange} />

          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* PDF Viewer - Main Content */}
            <div className="xl:col-span-3">
              <PDFViewer
                pdfUrl={activeDocument.pdfUrl}
                title={activeDocument.title}
                onDownload={handleDownload} />

            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-1 space-y-6">
              {/* Profile Card */}
              <ProfileCard profile={studentProfile} />

              {/* Download Actions */}
              <DownloadActions
                documents={resumeDocuments}
                activeDocument={activeDocument} />


              {/* Quick Navigation */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Quick Navigation
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/presentations-gallery')}
                    className="w-full justify-start">

                    <Icon name="Presentation" size={16} className="mr-3" />
                    View Presentations
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/video-presentations')}
                    className="w-full justify-start">

                    <Icon name="Video" size={16} className="mr-3" />
                    Watch Videos
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/photo-essay-gallery')}
                    className="w-full justify-start">

                    <Icon name="Camera" size={16} className="mr-3" />
                    Photo Essays
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/essay-document-viewer')}
                    className="w-full justify-start">

                    <Icon name="BookOpen" size={16} className="mr-3" />
                    Read Essays
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default ResumeViewer;