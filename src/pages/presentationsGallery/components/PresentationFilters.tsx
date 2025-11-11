import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { PresentationFiltersProps } from '../types';

const PresentationFilters = ({ filters, onFiltersChange, currentLanguage }: PresentationFiltersProps) => {
  const getTranslations = () => {
    switch (currentLanguage) {
      case 'sw':
        return {
          filterBy: 'Chuja kwa',
          category: 'Jamii',
          subject: 'Somo',
          type: 'Aina',
          language: 'Lugha',
          sortBy: 'Panga kwa',
          sortOrder: 'Mpangilio',
          all: 'Zote',
          academic: 'Kitaaluma',
          research: 'Utafiti',
          innovation: 'Uvumbuzi',
          culture: 'Utamaduni',
          challenges: 'Changamoto',
          mathematics: 'Hisabati',
          science: 'Sayansi',
          technology: 'Teknolojia',
          arts: 'Sanaa',
          powerpoint: 'PowerPoint',
          pdf: 'PDF',
          english: 'Kiingereza',
          kiswahili: 'Kiswahili',
          indigenous: 'Lugha za Asili',
          date: 'Tarehe',
          title: 'Kichwa',
          duration: 'Muda',
          ascending: 'Kupanda',
          descending: 'Kushuka',
          clearFilters: 'Futa Vichujio'
        };
      default:
        return {
          filterBy: 'Filter by',
          category: 'Category',
          subject: 'Subject',
          type: 'Type',
          language: 'Language',
          sortBy: 'Sort by',
          sortOrder: 'Order',
          all: 'All',
          academic: 'Academic',
          research: 'Research',
          innovation: 'Innovation',
          culture: 'Culture',
          challenges: 'Challenges',
          mathematics: 'Mathematics',
          science: 'Science',
          technology: 'Technology',
          arts: 'Arts',
          powerpoint: 'PowerPoint',
          pdf: 'PDF',
          english: 'English',
          kiswahili: 'Kiswahili',
          indigenous: 'Indigenous',
          date: 'Date',
          title: 'Title',
          duration: 'Duration',
          ascending: 'Ascending',
          descending: 'Descending',
          clearFilters: 'Clear Filters'
        };
    }
  };

  const t = getTranslations();

  const categoryOptions = [
    { value: '', label: t.all },
    { value: 'academic', label: t.academic },
    { value: 'research', label: t.research },
    { value: 'innovation', label: t.innovation },
    { value: 'culture', label: t.culture },
    { value: 'challenges', label: t.challenges }
  ];

  const subjectOptions = [
    { value: '', label: t.all },
    { value: 'mathematics', label: t.mathematics },
    { value: 'science', label: t.science },
    { value: 'technology', label: t.technology },
    { value: 'arts', label: t.arts }
  ];

  const typeOptions = [
    { value: '', label: t.all },
    { value: 'powerpoint', label: t.powerpoint },
    { value: 'pdf', label: t.pdf }
  ];

  const languageOptions = [
    { value: '', label: t.all },
    { value: 'en', label: t.english },
    { value: 'sw', label: t.kiswahili },
    { value: 'indigenous', label: t.indigenous }
  ];

  const sortByOptions = [
    { value: 'date', label: t.date },
    { value: 'title', label: t.title },
    { value: 'duration', label: t.duration }
  ];

  const sortOrderOptions = [
    { value: 'desc', label: t.descending },
    { value: 'asc', label: t.ascending }
  ];

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: '',
      subject: '',
      type: '',
      language: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.category || filters.subject || filters.type || filters.language;

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">
          {t.filterBy}
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} className="mr-2" />
            {t.clearFilters}
          </Button>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:grid grid-cols-6 gap-4">
        <Select
          label={t.category}
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => handleFilterChange('category', value as string)}
        />
        <Select
          label={t.subject}
          options={subjectOptions}
          value={filters.subject}
          onChange={(value) => handleFilterChange('subject', value as string)}
        />
        <Select
          label={t.type}
          options={typeOptions}
          value={filters.type}
          onChange={(value) => handleFilterChange('type', value as string)}
        />
        <Select
          label={t.language}
          options={languageOptions}
          value={filters.language}
          onChange={(value) => handleFilterChange('language', value as string)}
        />
        <Select
          label={t.sortBy}
          options={sortByOptions}
          value={filters.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value as string)}
        />
        <Select
          label={t.sortOrder}
          options={sortOrderOptions}
          value={filters.sortOrder}
          onChange={(value) => handleFilterChange('sortOrder', value as string)}
        />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Select
            label={t.category}
            options={categoryOptions}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value as string)}
          />
          <Select
            label={t.type}
            options={typeOptions}
            value={filters.type}
            onChange={(value) => handleFilterChange('type', value as string)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select
            label={t.subject}
            options={subjectOptions}
            value={filters.subject}
            onChange={(value) => handleFilterChange('subject', value as string)}
          />
          <Select
            label={t.language}
            options={languageOptions}
            value={filters.language}
            onChange={(value) => handleFilterChange('language', value as string)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select
            label={t.sortBy}
            options={sortByOptions}
            value={filters.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value as string)}
          />
          <Select
            label={t.sortOrder}
            options={sortOrderOptions}
            value={filters.sortOrder}
            onChange={(value) => handleFilterChange('sortOrder', value as string)}
          />
        </div>
      </div>
    </div>
  );
};

export default PresentationFilters;