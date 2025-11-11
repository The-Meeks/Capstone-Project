import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const Header = ({ onMenuToggle, isMobileMenuOpen = false, currentLanguage = 'en', onLanguageChange }: HeaderProps) => {
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (langCode: string) => {
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background border-b border-border elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="mr-3"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon 
              name={isMobileMenuOpen ? 'X' : 'Menu'} 
              size={24} 
              className="text-foreground"
            />
          </Button>
        </div>

        {/* Logo/Brand - Mobile Center, Desktop Left */}
        <div className="flex items-center lg:flex-1">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                Student Portfolio
              </h1>
              <p className="text-xs text-muted-foreground font-caption">
                Capstone Showcase
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 px-3 py-2 hover:bg-muted transition-hover"
            >
              <span className="text-lg">{currentLang.flag}</span>
              <span className="hidden sm:inline text-sm font-medium">
                {currentLang.label}
              </span>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>
            
            {/* Language Dropdown */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-200">
              <div className="py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-hover ${
                      currentLanguage === lang.code ? 'bg-accent/10 text-accent' : 'text-foreground'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                    {currentLanguage === lang.code && (
                      <Icon name="Check" size={16} className="ml-auto text-accent" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-hover"
            >
              <Icon name="User" size={18} className="text-primary" />
            </Button>
            
            {/* Profile Dropdown */}
            <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-md elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-200">
              <div className="py-1">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Student Portfolio</p>
                  <p className="text-xs text-muted-foreground">Academic Showcase</p>
                </div>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-hover">
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-hover">
                  <Icon name="HelpCircle" size={16} />
                  <span>Help & Support</span>
                </button>
                <div className="border-t border-border mt-1 pt-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-hover">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;