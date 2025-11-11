import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { GalleryFilterProps } from '../types/index';

const GalleryFilter = ({
  filters,
  onFiltersChange,
  themeOptions,
  dateOptions,
  culturalTopicOptions,
  totalImages,
  currentLanguage
}: GalleryFilterProps) => {
  const translations = {
    en: {
      title: 'Photo Essay Gallery',
      subtitle: 'Explore visual narratives through cultural photography',
      searchPlaceholder: 'Search photos by title or tags...',
      filterByTheme: 'Filter by Theme',
      filterByDate: 'Filter by Date',
      filterByCulture: 'Filter by Cultural Topic',
      allThemes: 'All Themes',
      allDates: 'All Dates',
      allTopics: 'All Topics',
      clearFilters: 'Clear All Filters',
      showingResults: 'Showing {count} photos',
      downloadAll: 'Download Collection'
    },
    sw: {
      title: 'Mkusanyiko wa Picha za Insha',
      subtitle: 'Chunguza hadithi za kuona kupitia picha za kitamaduni',
      searchPlaceholder: 'Tafuta picha kwa kichwa au lebo...',
      filterByTheme: 'Chuja kwa Mada',
      filterByDate: 'Chuja kwa Tarehe',
      filterByCulture: 'Chuja kwa Mada ya Kitamaduni',
      allThemes: 'Mada Zote',
      allDates: 'Tarehe Zote',
      allTopics: 'Mada Zote',
      clearFilters: 'Futa Vichujio Vyote',
      showingResults: 'Inaonyesha picha {count}',
      downloadAll: 'Pakua Mkusanyiko'
    },
    indigenous: {
      title: 'Mkusanyiko wa Picha za Utamaduni',
      subtitle: 'Tazama hadithi za picha za asili',
      searchPlaceholder: 'Tafuta picha...',
      filterByTheme: 'Chagua Mada',
      filterByDate: 'Chagua Wakati',
      filterByCulture: 'Chagua Utamaduni',
      allThemes: 'Mada Zote',
      allDates: 'Nyakati Zote',
      allTopics: 'Utamaduni Wote',
      clearFilters: 'Ondoa Vichujio',
      showingResults: 'Picha {count}',
      downloadAll: 'Pakua Zote'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value
    });
  };

  const handleThemeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      theme: value
    });
  };

  const handleDateChange = (value: string) => {
    onFiltersChange({
      ...filters,
      date: value
    });
  };

  const handleCulturalTopicChange = (value: string) => {
    onFiltersChange({
      ...filters,
      culturalTopic: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      theme: '',
      date: '',
      culturalTopic: '',
      searchQuery: ''
    });
  };

  const hasActiveFilters = filters.theme || filters.date || filters.culturalTopic || filters.searchQuery;

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            {t.title}
          </h1>
          <p className="text-muted-foreground font-caption">
            {t.subtitle}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Input
              type="search"
              placeholder={t.searchPlaceholder}
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-3 text-base"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Select
              label={t.filterByTheme}
              options={[
                { value: '', label: t.allThemes },
                ...themeOptions.map(option => ({
                  value: option.value,
                  label: `${option.label} (${option.count})`
                }))
              ]}
              value={filters.theme}
              onChange={handleThemeChange}
              className="w-full"
            />

            <Select
              label={t.filterByDate}
              options={[
                { value: '', label: t.allDates },
                ...dateOptions.map(option => ({
                  value: option.value,
                  label: `${option.label} (${option.count})`
                }))
              ]}
              value={filters.date}
              onChange={handleDateChange}
              className="w-full"
            />

            <Select
              label={t.filterByCulture}
              options={[
                { value: '', label: t.allTopics },
                ...culturalTopicOptions.map(option => ({
                  value: option.value,
                  label: `${option.label} (${option.count})`
                }))
              ]}
              value={filters.culturalTopic}
              onChange={handleCulturalTopicChange}
              className="w-full"
            />

            <div className="flex flex-col justify-end">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                disabled={!hasActiveFilters}
                className="w-full"
                iconName="X"
                iconPosition="left"
              >
                {t.clearFilters}
              </Button>
            </div>
          </div>

          {/* Results Summary and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground font-caption">
                {t.showingResults.replace('{count}', totalImages.toString())}
              </p>
              {hasActiveFilters && (
                <div className="flex items-center space-x-2">
                  <Icon name="Filter" size={16} className="text-accent" />
                  <span className="text-sm text-accent font-medium">
                    Filters Active
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                {t.downloadAll}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Grid3X3"
                iconPosition="left"
              >
                Grid View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryFilter;