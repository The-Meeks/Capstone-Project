import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GalleryFilter from './components/GalleryFilter';
import MasonryGrid from './components/MasonryGrid';
import LightboxViewer from './components/LightboxViewer';
import { PhotoEssayImage, GalleryFilters, LightboxState, FilterOption, LanguageCode } from './types';

const PhotoEssayGallery = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState<GalleryFilters>({
    theme: '',
    date: '',
    culturalTopic: '',
    searchQuery: ''
  });
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isOpen: false,
    currentIndex: 0,
    isZoomed: false,
    zoomLevel: 1
  });

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageCode;
    if (savedLanguage && ['en', 'sw', 'indigenous'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: string) => {
    const langCode = language as LanguageCode;
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  // Mock photo essay data
  const mockImages: PhotoEssayImage[] = [
  {
    id: '1',
    src: "https://images.unsplash.com/photo-1730432447897-a01e865ad707",
    alt: 'Traditional African woman in colorful kente cloth weaving at wooden loom in village setting',
    title: 'Traditional Weaving Techniques',
    captions: {
      en: 'Master weaver demonstrates traditional kente cloth techniques passed down through generations in rural Ghana.',
      sw: 'Mfumaji mkuu anaonyesha mbinu za kitamaduni za kufuma nguo za kente zilizopitishwa kwa vizazi nchini Ghana.',
      indigenous: 'Mfumaji mkuu wa kitamaduni akionyesha utaalamu wa kufuma nguo za asili.'
    },
    theme: 'Cultural Heritage',
    date: '2024-03-15',
    culturalTopic: 'Traditional Crafts',
    dimensions: { width: 800, height: 1200 },
    tags: ['weaving', 'kente', 'tradition', 'crafts']
  },
  {
    id: '2',
    src: "https://images.unsplash.com/photo-1652421563103-50ed4473ce9f",
    alt: 'Group of African children in school uniforms sitting under large baobab tree reading books',
    title: 'Education Under the Baobab',
    captions: {
      en: 'Children gather under the ancient baobab tree for their daily lessons, connecting modern education with traditional meeting spaces.',
      sw: 'Watoto wanakusanyika chini ya mti wa mbuyu wa kale kwa masomo yao ya kila siku, wakiunganisha elimu ya kisasa na maeneo ya mikutano ya kitamaduni.',
      indigenous: 'Watoto wakikusanyika chini ya mti mkuu wa baobab kwa masomo ya kila siku.'
    },
    theme: 'Education',
    date: '2024-03-10',
    culturalTopic: 'Community Learning',
    dimensions: { width: 1200, height: 800 },
    tags: ['education', 'children', 'baobab', 'community']
  },
  {
    id: '3',
    src: "https://images.unsplash.com/photo-1551524267-c8e6672e750d",
    alt: 'Elderly African man with traditional face paint and beaded jewelry performing ceremonial dance',
    title: 'Ceremonial Dance Traditions',
    captions: {
      en: 'Elder performs traditional ceremonial dance wearing ancestral regalia during harvest festival celebrations.',
      sw: 'Mzee anacheza ngoma ya kitamaduni akiwa amevaa mavazi ya kizazi cha babu zake wakati wa sherehe za mavuno.',
      indigenous: 'Mzee akicheza ngoma ya kitamaduni wakati wa sherehe za mavuno.'
    },
    theme: 'Ceremonies',
    date: '2024-02-28',
    culturalTopic: 'Ritual Practices',
    dimensions: { width: 900, height: 1350 },
    tags: ['dance', 'ceremony', 'tradition', 'festival']
  },
  {
    id: '4',
    src: "https://images.unsplash.com/photo-1505467309789-11ded3bf0ab0",
    alt: 'African woman in bright orange headwrap selling colorful fruits and vegetables at bustling market',
    title: 'Market Life and Commerce',
    captions: {
      en: 'Local vendor displays fresh produce at the vibrant community market, showcasing the economic heart of village life.',
      sw: 'Muuzaji wa mitaani anaonyesha mazao mapya sokoni la jamii lenye maisha, akionyesha moyo wa kiuchumi wa maisha ya kijijini.',
      indigenous: 'Muuzaji wa mitaani akionyesha mazao mapya sokoni la jamii.'
    },
    theme: 'Economic Life',
    date: '2024-03-05',
    culturalTopic: 'Trade and Commerce',
    dimensions: { width: 1100, height: 800 },
    tags: ['market', 'commerce', 'community', 'trade']
  },
  {
    id: '5',
    src: "https://images.unsplash.com/photo-1716472247025-38e798f97ec4",
    alt: 'Young African girl in traditional dress learning pottery making from grandmother in clay workshop',
    title: 'Intergenerational Knowledge Transfer',
    captions: {
      en: 'Grandmother teaches granddaughter the ancient art of pottery making, ensuring cultural knowledge continues to the next generation.',
      sw: 'Nyawira anafundisha mjukuu wake sanaa ya kale ya kuumba vyombo vya udongo, akihakikisha maarifa ya kitamaduni yanaendelea kwa kizazi kijacho.',
      indigenous: 'Nyawira akifundisha mjukuu wake sanaa ya kuumba vyombo vya udongo.'
    },
    theme: 'Knowledge Transfer',
    date: '2024-02-20',
    culturalTopic: 'Traditional Skills',
    dimensions: { width: 800, height: 1000 },
    tags: ['pottery', 'learning', 'grandmother', 'skills']
  },
  {
    id: '6',
    src: "https://images.unsplash.com/photo-1639219384251-855f43df3238",
    alt: 'African farmers working together in green terraced fields during sunrise with mountains in background',
    title: 'Sustainable Agriculture Practices',
    captions: {
      en: 'Community farmers work together using traditional terracing methods to maintain soil health and maximize crop yields.',
      sw: 'Wakulima wa jamii wanafanya kazi pamoja wakitumia mbinu za kitamaduni za kutengeneza miteremko ili kudumisha afya ya udongo na kuongeza mavuno.',
      indigenous: 'Wakulima wa jamii wakifanya kazi pamoja kwa mbinu za kitamaduni za kilimo.'
    },
    theme: 'Agriculture',
    date: '2024-03-01',
    culturalTopic: 'Sustainable Practices',
    dimensions: { width: 1300, height: 900 },
    tags: ['farming', 'sustainability', 'community', 'agriculture']
  },
  {
    id: '7',
    src: "https://images.unsplash.com/photo-1597978754327-0ce3b9a07073",
    alt: 'Traditional African healer with medicinal plants and herbs arranged on woven mat in forest setting',
    title: 'Traditional Medicine Knowledge',
    captions: {
      en: 'Traditional healer demonstrates the preparation of medicinal plants, preserving ancient healing wisdom for modern applications.',
      sw: 'Mganga wa kitamaduni anaonyesha utayarishaji wa mimea ya dawa, akihifadhi hekima ya kale ya uponyaji kwa matumizi ya kisasa.',
      indigenous: 'Mganga wa kitamaduni akionyesha utayarishaji wa mimea ya dawa ya asili.'
    },
    theme: 'Traditional Medicine',
    date: '2024-02-15',
    culturalTopic: 'Healing Practices',
    dimensions: { width: 700, height: 1200 },
    tags: ['medicine', 'healing', 'plants', 'traditional']
  },
  {
    id: '8',
    src: "https://images.unsplash.com/photo-1523689119443-df96632084a1",
    alt: 'African musicians playing traditional drums and instruments during evening cultural performance',
    title: 'Musical Heritage Preservation',
    captions: {
      en: 'Musicians perform traditional songs using ancestral instruments, keeping alive the musical heritage of their community.',
      sw: 'Waimbaji wanaimba nyimbo za kitamaduni wakitumia vyombo vya muziki vya kizazi cha babu zao, wakihifadhi urithi wa kimuziki wa jamii yao.',
      indigenous: 'Waimbaji wakiimba nyimbo za kitamaduni kwa vyombo vya muziki vya asili.'
    },
    theme: 'Music and Arts',
    date: '2024-02-25',
    culturalTopic: 'Musical Traditions',
    dimensions: { width: 1000, height: 750 },
    tags: ['music', 'instruments', 'performance', 'heritage']
  }];


  // Filter images based on current filters
  const filteredImages = useMemo(() => {
    return mockImages.filter((image) => {
      const matchesTheme = !filters.theme || image.theme === filters.theme;
      const matchesDate = !filters.date || image.date.includes(filters.date);
      const matchesCulturalTopic = !filters.culturalTopic || image.culturalTopic === filters.culturalTopic;
      const matchesSearch = !filters.searchQuery ||
      image.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
      Object.values(image.captions).some((caption) =>
      caption.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );

      return matchesTheme && matchesDate && matchesCulturalTopic && matchesSearch;
    });
  }, [filters]);

  // Generate filter options
  const themeOptions: FilterOption[] = useMemo(() => {
    const themes = mockImages.reduce((acc, image) => {
      acc[image.theme] = (acc[image.theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(themes).map(([theme, count]) => ({
      value: theme,
      label: theme,
      count
    }));
  }, []);

  const dateOptions: FilterOption[] = useMemo(() => {
    const dates = mockImages.reduce((acc, image) => {
      const year = image.date.split('-')[0];
      const month = image.date.substring(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(dates).map(([date, count]) => ({
      value: date,
      label: new Date(date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      count
    }));
  }, []);

  const culturalTopicOptions: FilterOption[] = useMemo(() => {
    const topics = mockImages.reduce((acc, image) => {
      acc[image.culturalTopic] = (acc[image.culturalTopic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(topics).map(([topic, count]) => ({
      value: topic,
      label: topic,
      count
    }));
  }, []);

  // Lightbox handlers
  const handleImageClick = (index: number) => {
    setLightboxState({
      isOpen: true,
      currentIndex: index,
      isZoomed: false,
      zoomLevel: 1
    });
  };

  const handleLightboxClose = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLightboxPrevious = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: Math.max(0, prev.currentIndex - 1),
      zoomLevel: 1
    }));
  };

  const handleLightboxNext = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: Math.min(filteredImages.length - 1, prev.currentIndex + 1),
      zoomLevel: 1
    }));
  };

  const handleZoomIn = () => {
    setLightboxState((prev) => ({
      ...prev,
      zoomLevel: Math.min(3, prev.zoomLevel + 0.5),
      isZoomed: prev.zoomLevel >= 1
    }));
  };

  const handleZoomOut = () => {
    setLightboxState((prev) => ({
      ...prev,
      zoomLevel: Math.max(1, prev.zoomLevel - 0.5),
      isZoomed: prev.zoomLevel > 1.5
    }));
  };

  const handleDownload = (image: PhotoEssayImage) => {
    // Create download link
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pageTitle = {
    en: 'Photo Essay Gallery - Student Portfolio',
    sw: 'Mkusanyiko wa Picha za Insha - Kumbukumbu ya Mwanafunzi',
    indigenous: 'Mkusanyiko wa Picha za Utamaduni - Kumbukumbu ya Mwanafunzi'
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle[currentLanguage]}</title>
        <meta name="description" content="Explore visual narratives through cultural photography showcasing traditional practices, community life, and heritage preservation." />
        <meta name="keywords" content="photo essay, cultural photography, traditional practices, African heritage, visual storytelling" />
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
          <GalleryFilter
            filters={filters}
            onFiltersChange={setFilters}
            themeOptions={themeOptions}
            dateOptions={dateOptions}
            culturalTopicOptions={culturalTopicOptions}
            totalImages={filteredImages.length}
            currentLanguage={currentLanguage} />


          <MasonryGrid
            images={filteredImages}
            onImageClick={handleImageClick}
            currentLanguage={currentLanguage} />


          <LightboxViewer
            images={filteredImages}
            lightboxState={lightboxState}
            onClose={handleLightboxClose}
            onPrevious={handleLightboxPrevious}
            onNext={handleLightboxNext}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onDownload={handleDownload}
            currentLanguage={currentLanguage} />

        </main>
      </div>
    </>);

};

export default PhotoEssayGallery;