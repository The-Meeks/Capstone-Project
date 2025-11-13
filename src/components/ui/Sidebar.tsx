import React, { useState, useEffect } from 'react';
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

interface NavItem {
  id: string;
  label: string;
  icon: string;
  section: 'main' | 'group';
  path?: string;
  children?: NavItem[];
}

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onMobileClose,
  currentLanguage = 'en',
  onLanguageChange,
}: SidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['documents', 'media']);

  // Hide on scroll
  const [hideOnScroll, setHideOnScroll] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // show only when back to top
      if (currentY <= 0) {
        setHideOnScroll(false);
        lastScrollY = currentY;
        return;
      }

      // scroll down → hide
      if (currentY > lastScrollY) {
        setHideOnScroll(true);
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const navigationItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard', section: 'main' },
    {
      id: 'documents',
      label: 'Academic Documents',
      icon: 'FileText',
      section: 'group',
      children: [
        { id: 'resume', label: 'Resume Viewer', path: '/resume-viewer', icon: 'FileUser', section: 'main' },
        { id: 'essays', label: 'Essay Documents', path: '/essay-document-viewer', icon: 'BookOpen', section: 'main' },
      ],
    },
    { id: 'presentations', label: 'Presentations', path: '/presentations-gallery', icon: 'Presentation', section: 'main' },
    {
      id: 'media',
      label: 'Media Portfolio',
      icon: 'Image',
      section: 'group',
      children: [
        { id: 'videos', label: 'Video Presentations', path: '/video-presentations', icon: 'Video', section: 'main' },
        { id: 'photos', label: 'Photo Essay Gallery', path: '/photo-essay-gallery', icon: 'Camera', section: 'main' },
      ],
    },
  ];

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isActive = (path?: string) =>
    path ? location.pathname === path : false;

  const handleNavigation = (path?: string) => {
    if (!path) return;
    onMobileClose?.();
    setTimeout(() => (window.location.href = path), 80);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static
          top-16                 /* 64px offset below header */
          h-[calc(100vh-4rem)]   /* full height minus header height */
          z-50                  
          bg-gray-100 dark:bg-gray-800 border-r border-border
          transition-all duration-300
          
          ${isCollapsed ? 'w-20' : 'w-64'}
      
          /* mobile & desktop scroll-hide behavior */
          ${isMobileOpen ? 'translate-x-0' 
            : hideOnScroll 
              ? '-translate-x-full' 
              : 'translate-x-0'}
  
          lg:${hideOnScroll ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {

              if (item.section === 'group') {
                const expanded = expandedSections.includes(item.id);

                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg
                        text-sm font-medium hover:bg-muted group 
                        ${isCollapsed ? 'justify-center' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.icon} size={18} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>

                      {!isCollapsed && (
                        <Icon
                          name="ChevronDown"
                          size={16}
                          className={`transition-transform 
                            ${expanded ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>

                    {expanded && !isCollapsed && (
                      <div className="ml-6 space-y-1">
                        {item.children?.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleNavigation(child.path)}
                            className={`
                              w-full flex items-center p-2 space-x-3 rounded-md text-sm
                              hover:bg-muted transition-colors
                              ${isActive(child.path) 
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground'}
                            `}
                          >
                            <Icon name={child.icon} size={16} />
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
                    w-full flex items-center p-3 space-x-3 rounded-lg text-sm font-medium
                    hover:bg-muted group transition-colors
                    ${isCollapsed ? 'justify-center' : ''}
                    ${isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground'}
                  `}
                >
                  <Icon name={item.icon} size={18} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* FOOTER */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Icon name="Settings" size={16} /> Settings
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Icon name="HelpCircle" size={16} /> Help & Support
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
