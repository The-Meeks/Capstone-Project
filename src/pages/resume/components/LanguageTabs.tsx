import React from 'react';
import { LanguageTab } from '../types';
import Button from '../../../components/ui/Button';

interface LanguageTabsProps {
  tabs: LanguageTab[];
  activeTab: string;
  onTabChange: (tabCode: string) => void;
  className?: string;
}

const LanguageTabs = ({ tabs, activeTab, onTabChange, className = '' }: LanguageTabsProps) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-1 ${className}`}>
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <Button
            key={tab.code}
            variant={tab.code === activeTab ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTabChange(tab.code)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md transition-academic
              ${tab.code === activeTab 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <span className="text-base">{tab.flag}</span>
            <span className="font-medium text-sm">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageTabs;