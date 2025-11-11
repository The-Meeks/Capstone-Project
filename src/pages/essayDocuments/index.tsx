import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

import { EssayDocument, ReadingProgress, ViewerSettings, Bookmark, SearchResult } from './Types/index';
import DocumentOutline from './Components/DocumentOutline';
import ReadingControls from './Components/ReadingControl';
import EssayViewer from './Components/EssayViewer';
import BookmarkPanel from './Components/BookMarkPanel';
import SearchPanel from './Components/SearchPanel';

const EssayDocumentViewer = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [readingStartTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Update time spent reading
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Date.now() - readingStartTime);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [readingStartTime]);

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  // Mock essay document data
  const essayDocument: EssayDocument = {
    id: 'autobiographical-essay-2024',
    title: 'My Academic Journey: A Reflection on Growth and Discovery',
    subtitle: 'An Autobiographical Essay for Capstone Project',
    author: 'Amara Ochieng',
    language: currentLanguage as 'en' | 'sw' | 'indigenous',
    pageCount: 28,
    fileSize: '2.4 MB',
    lastModified: new Date('2024-01-15'),
    pdfUrl: '/assets/documents/autobiographical-essay.pdf',
    thumbnailUrl: "https://images.unsplash.com/photo-1666148352735-46879d90d34d",
    description: 'A comprehensive autobiographical essay exploring my academic journey, personal growth, cultural identity, and professional aspirations throughout my university experience.',
    chapters: [
    {
      id: 'introduction',
      title: 'Introduction: The Beginning of My Journey',
      pageNumber: 1,
      level: 1
    },
    {
      id: 'early-education',
      title: 'Early Educational Foundations',
      pageNumber: 3,
      level: 1,
      children: [
      {
        id: 'primary-school',
        title: 'Primary School Experiences',
        pageNumber: 4,
        level: 2
      },
      {
        id: 'secondary-school',
        title: 'Secondary School Achievements',
        pageNumber: 6,
        level: 2
      }]

    },
    {
      id: 'university-journey',
      title: 'University Experience and Growth',
      pageNumber: 9,
      level: 1,
      children: [
      {
        id: 'first-year',
        title: 'First Year: Adaptation and Discovery',
        pageNumber: 10,
        level: 2
      },
      {
        id: 'academic-development',
        title: 'Academic Development and Specialization',
        pageNumber: 13,
        level: 2
      },
      {
        id: 'research-projects',
        title: 'Research Projects and Innovation',
        pageNumber: 16,
        level: 2
      }]

    },
    {
      id: 'cultural-identity',
      title: 'Cultural Identity and Heritage',
      pageNumber: 19,
      level: 1,
      children: [
      {
        id: 'african-roots',
        title: 'Embracing My African Roots',
        pageNumber: 20,
        level: 2
      },
      {
        id: 'modern-challenges',
        title: 'Navigating Modern Society',
        pageNumber: 22,
        level: 2
      }]

    },
    {
      id: 'future-aspirations',
      title: 'Future Aspirations and Goals',
      pageNumber: 25,
      level: 1
    },
    {
      id: 'conclusion',
      title: 'Conclusion: Lessons Learned and Moving Forward',
      pageNumber: 27,
      level: 1
    }],

    tags: ['autobiography', 'academic journey', 'personal growth', 'cultural identity', 'innovation'],
    readingTime: 45
  };

  const [viewerSettings, setViewerSettings] = useState<ViewerSettings>({
    zoomLevel: 1,
    viewMode: 'single',
    theme: 'light',
    fontSize: 'medium',
    showOutline: false,
    showBookmarks: false
  });

  const readingProgress: ReadingProgress = {
    currentPage,
    totalPages: essayDocument.pageCount,
    percentage: currentPage / essayDocument.pageCount * 100,
    timeSpent,
    bookmarks
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChapterClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setShowOutline(false);
  };

  const handleBookmarkAdd = (bookmark: Bookmark) => {
    setBookmarks((prev) => [...prev, bookmark]);
  };

  const handleBookmarkClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setShowBookmarks(false);
  };

  const handleBookmarkDelete = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
  };

  const handleBookmarkEdit = (updatedBookmark: Bookmark) => {
    setBookmarks((prev) => prev.map((b) => b.id === updatedBookmark.id ? updatedBookmark : b));
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);

    // Mock search implementation
    setTimeout(() => {
      const mockResults: SearchResult[] = [
      {
        pageNumber: 5,
        text: `academic journey and personal growth through ${query}`,
        context: `My academic journey has been marked by continuous learning and personal growth through ${query}, which has shaped my understanding of both theoretical concepts and practical applications.`,
        highlightIndex: 0
      },
      {
        pageNumber: 12,
        text: `innovation and ${query} in modern education`,
        context: `The integration of innovation and ${query} in modern education has revolutionized how students engage with complex subjects and develop critical thinking skills.`,
        highlightIndex: 1
      },
      {
        pageNumber: 18,
        text: `cultural identity and ${query} perspectives`,
        context: `Understanding cultural identity and ${query} perspectives has been crucial in developing a holistic worldview that embraces both traditional values and contemporary challenges.`,
        highlightIndex: 2
      }];


      setSearchResults(mockResults);
      setIsSearching(false);
      setShowSearch(true);
    }, 1000);
  };

  const handleSearchResultClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSettingsChange = (newSettings: Partial<ViewerSettings>) => {
    setViewerSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = essayDocument.pdfUrl;
    link.download = `${essayDocument.title}.pdf`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const getPageTitle = () => {
    const titles = {
      en: 'Essay Document Viewer - Student Portfolio',
      sw: 'Mwongozo wa Hati za Insha - Kumbukumbu ya Mwanafunzi',
      fr: 'Visionneuse de Documents d\'Essai - Portfolio Étudiant',
      de: 'Essay-Dokumentenbetrachter - Studentenportfolio',
      zh: '论文文档查看器 - 学生作品集'
    };
    return titles[currentLanguage as keyof typeof titles] || titles.en;
  };

  const getPageDescription = () => {
    const descriptions = {
      en: 'Read and navigate through comprehensive autobiographical essays with professional document viewing tools, bookmarks, and search functionality.',
      sw: 'Soma na uongozwe kupitia insha za maisha kamili na zana za kitaaluma za kuona hati, alama za kurasa, na utendaji wa utafutaji.',
      fr: 'Lisez et naviguez à travers des essais autobiographiques complets avec des outils professionnels de visualisation de documents, des signets et une fonctionnalité de recherche.',
      de: 'Lesen und navigieren Sie durch umfassende autobiographische Essays mit professionellen Dokumentenbetrachtungstools, Lesezeichen und Suchfunktionalität.',
      zh: '通过专业的文档查看工具、书签和搜索功能阅读和浏览全面的自传散文。'
    };
    return descriptions[currentLanguage as keyof typeof descriptions] || descriptions.en;
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content="essay viewer, academic documents, student portfolio, autobiographical essay, document navigation" />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
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
          <DocumentOutline
            chapters={essayDocument.chapters}
            currentPage={currentPage}
            onChapterClick={handleChapterClick}
            isVisible={showOutline}
            onToggle={() => setShowOutline(!showOutline)} />


          <ReadingControls
            progress={readingProgress}
            settings={viewerSettings}
            onSettingsChange={handleSettingsChange}
            onSearch={handleSearch}
            onBookmarkToggle={() => setShowBookmarks(!showBookmarks)}
            onFullscreen={() => {}}
            onDownload={handleDownload}
            onPrint={handlePrint} />


          <div className={`transition-all duration-300 ${showOutline ? 'lg:ml-80' : ''}`}>
            <EssayViewer
              document={essayDocument}
              onPageChange={handlePageChange}
              onBookmarkAdd={handleBookmarkAdd}
              onDownload={handleDownload}
              onPrint={handlePrint} />

          </div>

          <BookmarkPanel
            bookmarks={bookmarks}
            onBookmarkClick={handleBookmarkClick}
            onBookmarkDelete={handleBookmarkDelete}
            onBookmarkEdit={handleBookmarkEdit}
            isVisible={showBookmarks}
            onToggle={() => setShowBookmarks(!showBookmarks)} />


          <SearchPanel
            searchResults={searchResults}
            currentQuery={searchQuery}
            isSearching={isSearching}
            onSearch={handleSearch}
            onResultClick={handleSearchResultClick}
            onClose={() => setShowSearch(false)}
            isVisible={showSearch} />

        </main>
      </div>
    </>);

};

export default EssayDocumentViewer;