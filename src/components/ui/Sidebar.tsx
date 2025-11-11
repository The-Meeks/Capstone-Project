import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

interface SidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const Sidebar = ({ 
  isCollapsed = false, 
  isMobileOpen = false, 
  onMobileClose,
  currentLanguage = 'en',
  onLanguageChange 
}: SidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['documents', 'media']);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'LayoutDashboard',
      section: 'main'
    },
    {
      id: 'documents',
      label: 'Academic Documents',
      section: 'group',
      icon: 'FileText',
      children: [
        {
          id: 'resume',
          label: 'Resume Viewer',
          path: '/resume-viewer',
          icon: 'FileUser'
        },
        {
          id: 'essays',
          label: 'Essay Documents',
          path: '/essay-document-viewer',
          icon: 'BookOpen'
        }
      ]
    },
    {
      id: 'presentations',
      label: 'Presentations',
      path: '/presentations-gallery',
      icon: 'Presentation',
      section: 'main'
    },
    {
      id: 'media',
      label: 'Media Portfolio',
      section: 'group',
      icon: 'Image',
      children: [
        {
          id: 'videos',
          label: 'Video Presentations',
          path: '/video-presentations',
          icon: 'Video'
        },
        {
          id: 'photos',
          label: 'Photo Essay Gallery',
          path: '/photo-essay-gallery',
          icon: 'Camera'
        }
      ]
    }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLanguageSelect = (langCode: string) => {
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  const handleNavigation = (path: string) => {
    if (onMobileClose) {
      onMobileClose();
    }
    // Navigation will be handled by React Router Link component in actual implementation
    window.location.href = path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-300 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-card border-r border-border z-400 transition-transform duration-300 ease-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-100
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <div>
                  <h2 className="text-sm font-heading font-semibold text-foreground">
                    Student Portfolio
                  </h2>
                  <p className="text-xs text-muted-foreground font-caption">
                    Capstone Showcase
                  </p>
                </div>
              </div>
            )}
            
            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Language Toggle - Mobile Only */}
          {!isCollapsed && (
            <div className="p-4 border-b border-border lg:hidden">
              <div className="relative group">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span>{currentLang.flag}</span>
                    <span className="text-sm">{currentLang.label}</span>
                  </div>
                  <Icon name="ChevronDown" size={16} />
                </Button>
                
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-200">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-hover ${
                          currentLanguage === lang.code ? 'bg-accent/10 text-accent' : 'text-foreground'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                        {currentLanguage === lang.code && (
                          <Icon name="Check" size={16} className="ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              if (item.section === 'group') {
                const isExpanded = expandedSections.includes(item.id);
                
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium
                        hover:bg-muted transition-hover group
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={item.icon} 
                          size={18} 
                          className="text-muted-foreground group-hover:text-foreground transition-colors" 
                        />
                        {!isCollapsed && (
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                            {item.label}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <Icon 
                          name="ChevronDown" 
                          size={16} 
                          className={`text-muted-foreground transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>
                    
                    {!isCollapsed && isExpanded && item.children && (
                      <div className="ml-6 space-y-1 transition-disclosure">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleNavigation(child.path)}
                            className={`
                              w-full flex items-center space-x-3 p-2 rounded-md text-sm
                              transition-academic hover-elevation
                              ${isActive(child.path) 
                                ? 'bg-primary text-primary-foreground' 
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                              }
                            `}
                          >
                            <Icon 
                              name={child.icon} 
                              size={16} 
                              className={isActive(child.path) ? 'text-primary-foreground' : 'text-muted-foreground'}
                            />
                            <span>{child.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 p-3 rounded-lg text-sm font-medium
                    transition-academic hover-elevation group
                    ${isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    className={isActive(item.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Footer Actions */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <Icon name="Settings" size={16} className="mr-3" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <Icon name="HelpCircle" size={16} className="mr-3" />
                Help & Support
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;