import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import PresentationGrid from './components/PresentationGrid';
import { Presentation, FilterOptions } from './types';
import PresentationFilters from './components/PresentationFilters';
import PresentationViewer from './components/PresentationViewer';

const PresentationsGallery = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    subject: '',
    type: '',
    language: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [selectedPresentation, setSelectedPresentation] = useState<Presentation | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [filteredPresentations, setFilteredPresentations] = useState<Presentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Save language preference
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  // Mock presentations data
  useEffect(() => {
    const mockPresentations: Presentation[] = [
    {
      id: 'pres-001',
      title: 'Sustainable Energy Solutions for Rural Communities',
      description: 'Comprehensive analysis of renewable energy implementation strategies for underserved rural areas, focusing on solar and wind power integration.',
      type: 'powerpoint',
      category: 'innovation',
      subject: 'technology',
      date: '2024-01-15',
      duration: 45,
      thumbnailUrl: "https://images.unsplash.com/photo-1650501889487-0b782e1afe26",
      thumbnailAlt: 'Solar panels installed on rural community building with wind turbines in background under clear blue sky',
      fileUrl: '/assets/presentations/sustainable-energy.pptx',
      slideCount: 24,
      language: 'en',
      tags: ['renewable energy', 'sustainability', 'rural development', 'innovation']
    },
    {
      id: 'pres-002',
      title: 'Mathematical Modeling of Climate Change Patterns',
      description: 'Advanced statistical analysis and predictive modeling of climate data using machine learning algorithms and mathematical frameworks.',
      type: 'pdf',
      category: 'research',
      subject: 'mathematics',
      date: '2024-01-10',
      duration: 60,
      thumbnailUrl: "https://images.unsplash.com/photo-1546610712-302319c58271",
      thumbnailAlt: 'Complex mathematical equations and climate data graphs displayed on computer screens in research laboratory',
      fileUrl: '/assets/presentations/climate-modeling.pdf',
      slideCount: 32,
      language: 'en',
      tags: ['mathematics', 'climate science', 'machine learning', 'data analysis']
    },
    {
      id: 'pres-003',
      title: 'Utamaduni wa Kiafrika katika Ulimwengu wa Kisasa',
      description: 'Uchunguzi wa jinsi utamaduni wa Kiafrika unavyobadilika na kuendelea kuwa muhimu katika mazingira ya kisasa ya kiteknolojia.',
      type: 'powerpoint',
      category: 'culture',
      subject: 'arts',
      date: '2024-01-08',
      duration: 40,
      thumbnailUrl: "https://images.unsplash.com/photo-1663919402880-1b80b17a0270",
      thumbnailAlt: 'Traditional African dancers in colorful ceremonial clothing performing cultural dance in village setting',
      fileUrl: '/assets/presentations/utamaduni-kiafrika.pptx',
      slideCount: 28,
      language: 'sw',
      tags: ['utamaduni', 'Kiafrika', 'mazingira ya kisasa', 'teknolojia']
    },
    {
      id: 'pres-004',
      title: 'Artificial Intelligence in Healthcare Diagnostics',
      description: 'Exploring the implementation of AI-powered diagnostic tools in medical practice, with focus on accuracy improvement and accessibility.',
      type: 'powerpoint',
      category: 'innovation',
      subject: 'technology',
      date: '2024-01-05',
      duration: 50,
      thumbnailUrl: "https://images.unsplash.com/photo-1666214280577-5f90bc36be92",
      thumbnailAlt: 'Medical professional using AI diagnostic software on tablet while examining patient X-rays on wall-mounted screens',
      fileUrl: '/assets/presentations/ai-healthcare.pptx',
      slideCount: 35,
      language: 'en',
      tags: ['artificial intelligence', 'healthcare', 'diagnostics', 'medical technology']
    },
    {
      id: 'pres-005',
      title: 'Urban Planning Solutions for Growing Cities',
      description: 'Innovative approaches to sustainable urban development, addressing population growth, infrastructure, and environmental challenges.',
      type: 'pdf',
      category: 'challenges',
      subject: 'science',
      date: '2024-01-03',
      duration: 55,
      thumbnailUrl: "https://images.unsplash.com/photo-1604560299352-77a3d4528bd7",
      thumbnailAlt: 'Modern city skyline with green buildings and sustainable architecture featuring solar panels and vertical gardens',
      fileUrl: '/assets/presentations/urban-planning.pdf',
      slideCount: 29,
      language: 'en',
      tags: ['urban planning', 'sustainability', 'infrastructure', 'city development']
    },
    {
      id: 'pres-006',
      title: 'Biotechnology Applications in Agriculture',
      description: 'Research on genetic modification and biotechnology applications to improve crop yields and resistance in African agricultural systems.',
      type: 'powerpoint',
      category: 'research',
      subject: 'science',
      date: '2023-12-28',
      duration: 42,
      thumbnailUrl: "https://images.unsplash.com/photo-1630959302878-a30de73cdbb5",
      thumbnailAlt: 'Scientist in laboratory examining genetically modified crop samples under microscope with agricultural field visible through window',
      fileUrl: '/assets/presentations/biotech-agriculture.pptx',
      slideCount: 26,
      language: 'en',
      tags: ['biotechnology', 'agriculture', 'genetic modification', 'crop improvement']
    }];


    setTimeout(() => {
      setPresentations(mockPresentations);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search presentations
  useEffect(() => {
    let filtered = [...presentations];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((presentation) =>
      presentation.title.toLowerCase().includes(query) ||
      presentation.description.toLowerCase().includes(query) ||
      presentation.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((presentation) => presentation.category === filters.category);
    }

    // Apply subject filter
    if (filters.subject) {
      filtered = filtered.filter((presentation) => presentation.subject === filters.subject);
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter((presentation) => presentation.type === filters.type);
    }

    // Apply language filter
    if (filters.language) {
      filtered = filtered.filter((presentation) => presentation.language === filters.language);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'duration':
          comparison = a.duration - b.duration;
          break;
        case 'date':
        default:
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredPresentations(filtered);
  }, [presentations, searchQuery, filters]);

  const getTranslations = () => {
    switch (currentLanguage) {
      case 'sw':
        return {
          title: 'Mkusanyiko wa Mawasilisho',
          subtitle: 'Chunguza mawasilisho yako ya kitaaluma',
          searchPlaceholder: 'Tafuta mawasilisho...',
          viewAll: 'Ona Yote',
          filterResults: 'Chuja Matokeo'
        };
      default:
        return {
          title: 'Presentations Gallery',
          subtitle: 'Explore your academic presentations',
          searchPlaceholder: 'Search presentations...',
          viewAll: 'View All',
          filterResults: 'Filter Results'
        };
    }
  };

  const t = getTranslations();

  const handlePresentationClick = (presentation: Presentation) => {
    setSelectedPresentation(presentation);
    setCurrentSlide(0);
    setIsViewerOpen(true);
  };

  const handleViewerClose = () => {
    setIsViewerOpen(false);
    setSelectedPresentation(null);
    setCurrentSlide(0);
  };

  const handleSlideChange = (slideNumber: number) => {
    setCurrentSlide(slideNumber);
  };

  return (
    <>
      <Helmet>
        <title>{t.title} - Student Portfolio</title>
        <meta name="description" content={t.subtitle} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange} />


        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange} />


        <main className="lg:ml-64 pt-16">
          <div className="p-6 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground">
                    {t.title}
                  </h1>
                  <p className="text-muted-foreground font-caption mt-2">
                    {t.subtitle}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/student-dashboard'}>

                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Back to Dashboard
                  </Button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-md">
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full" />

              </div>
            </div>

            {/* Filters */}
            <PresentationFilters
              filters={filters}
              onFiltersChange={setFilters}
              currentLanguage={currentLanguage} />


            {/* Presentations Grid */}
            <PresentationGrid
              presentations={filteredPresentations}
              onPresentationClick={handlePresentationClick}
              currentLanguage={currentLanguage}
              isLoading={isLoading} />

          </div>
        </main>

        {/* Presentation Viewer */}
        <PresentationViewer
          presentation={selectedPresentation}
          isOpen={isViewerOpen}
          onClose={handleViewerClose}
          currentSlide={currentSlide}
          onSlideChange={handleSlideChange} />

      </div>
    </>);

};

export default PresentationsGallery;