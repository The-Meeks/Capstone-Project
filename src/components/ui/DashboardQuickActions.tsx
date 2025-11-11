import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  variant: 'primary' | 'secondary' | 'accent' | 'success';
  progress?: number;
}

interface DashboardQuickActionsProps {
  className?: string;
}

const DashboardQuickActions = ({ className = '' }: DashboardQuickActionsProps) => {
  const quickActions: QuickAction[] = [
    {
      id: 'resume',
      title: 'Resume Preview',
      description: 'View and download your academic resume',
      icon: 'FileUser',
      path: '/resume-viewer',
      variant: 'primary',
      progress: 100
    },
    {
      id: 'presentations',
      title: 'Presentation Gallery',
      description: 'Browse your academic presentations',
      icon: 'Presentation',
      path: '/presentations-gallery',
      variant: 'secondary',
      progress: 85
    },
    {
      id: 'videos',
      title: 'Video Portfolio',
      description: 'Watch your recorded presentations',
      icon: 'Video',
      path: '/video-presentations',
      variant: 'accent',
      progress: 70
    },
    {
      id: 'essays',
      title: 'Essay Collection',
      description: 'Read your academic essays and papers',
      icon: 'BookOpen',
      path: '/essay-document-viewer',
      variant: 'success',
      progress: 90
    }
  ];

  const handleActionClick = (path: string) => {
    // In actual implementation, this would use React Router navigation
    window.location.href = path;
  };

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary/5 border-primary/20 hover:bg-primary/10';
      case 'secondary':
        return 'bg-secondary/5 border-secondary/20 hover:bg-secondary/10';
      case 'accent':
        return 'bg-accent/5 border-accent/20 hover:bg-accent/10';
      case 'success':
        return 'bg-success/5 border-success/20 hover:bg-success/10';
      default:
        return 'bg-muted border-border hover:bg-muted/80';
    }
  };

  const getIconColor = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'text-primary';
      case 'secondary':
        return 'text-secondary';
      case 'accent':
        return 'text-accent';
      case 'success':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProgressColor = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      case 'accent':
        return 'bg-accent';
      case 'success':
        return 'bg-success';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Quick Actions
          </h2>
          <p className="text-sm text-muted-foreground font-caption mt-1">
            Access your portfolio sections instantly
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="MoreHorizontal" size={16} className="mr-2" />
          More Options
        </Button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className={`
              relative p-6 rounded-lg border transition-academic hover-elevation cursor-pointer group
              ${getVariantStyles(action.variant)}
            `}
            onClick={() => handleActionClick(action.path)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`
                w-12 h-12 rounded-full bg-background flex items-center justify-center
                group-hover:scale-110 transition-transform duration-200
              `}>
                <Icon 
                  name={action.icon} 
                  size={24} 
                  className={getIconColor(action.variant)}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-foreground text-sm">
                  {action.title}
                </h3>
                <p className="text-xs text-muted-foreground font-caption leading-relaxed">
                  {action.description}
                </p>
              </div>

              {action.progress && (
                <div className="w-full space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground font-caption">
                      Complete
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {action.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor(action.variant)}`}
                      style={{ width: `${action.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="ArrowUpRight" size={16} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className={`
                flex-shrink-0 w-64 p-4 rounded-lg border transition-academic hover-elevation cursor-pointer
                ${getVariantStyles(action.variant)}
              `}
              onClick={() => handleActionClick(action.path)}
            >
              <div className="flex items-start space-x-4">
                <div className={`
                  w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0
                `}>
                  <Icon 
                    name={action.icon} 
                    size={20} 
                    className={getIconColor(action.variant)}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-caption leading-relaxed mb-3">
                    {action.description}
                  </p>

                  {action.progress && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground font-caption">
                          Complete
                        </span>
                        <span className="text-xs font-medium text-foreground">
                          {action.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all duration-500 ${getProgressColor(action.variant)}`}
                          style={{ width: `${action.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          className="flex-1 justify-start"
          onClick={() => handleActionClick('/presentations-gallery')}
        >
          <Icon name="Download" size={16} className="mr-3" />
          Download Portfolio PDF
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 justify-start"
          onClick={() => handleActionClick('/student-dashboard')}
        >
          <Icon name="Share2" size={16} className="mr-3" />
          Share Portfolio Link
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 justify-start"
          onClick={() => handleActionClick('/resume-viewer')}
        >
          <Icon name="Eye" size={16} className="mr-3" />
          Preview Mode
        </Button>
      </div>
    </div>
  );
};

export default DashboardQuickActions;