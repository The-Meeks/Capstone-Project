import React from 'react';
import Icon from '../../../components/AppIcon';
import { DashboardStats as DashboardStatsType } from '../types';

interface DashboardStatsProps {
  stats: DashboardStatsType;
  className?: string;
}

const DashboardStats = ({ stats, className = '' }: DashboardStatsProps) => {
  const statItems = [
    {
      id: 'views',
      label: 'Portfolio Views',
      value: stats.totalViews,
      icon: 'Eye',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      id: 'documents',
      label: 'Documents',
      value: stats.documentsUploaded,
      icon: 'FileText',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+3',
      changeType: 'positive' as const
    },
    {
      id: 'presentations',
      label: 'Presentations',
      value: stats.presentationsCreated,
      icon: 'Presentation',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+2',
      changeType: 'positive' as const
    },
    {
      id: 'videos',
      label: 'Videos',
      value: stats.videosRecorded,
      icon: 'Video',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+1',
      changeType: 'positive' as const
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Portfolio Analytics
          </h2>
          <p className="text-sm text-muted-foreground font-caption mt-1">
            Your portfolio performance overview
          </p>
        </div>
        <button className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors">
          <Icon name="Calendar" size={16} />
          <span>Last 30 days</span>
          <Icon name="ChevronDown" size={14} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg p-4 hover-elevation transition-academic"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                <Icon name={item.icon} size={20} className={item.color} />
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <Icon 
                  name={item.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                  className={item.changeType === 'positive' ? 'text-success' : 'text-destructive'}
                />
                <span className={item.changeType === 'positive' ? 'text-success' : 'text-destructive'}>
                  {item.change}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(item.value)}
              </div>
              <div className="text-sm text-muted-foreground font-caption">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Engagement Chart */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Weekly Engagement
            </h3>
            <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const value = Math.floor(Math.random() * 100) + 20;
              return (
                <div key={day} className="flex items-center space-x-3">
                  <span className="text-xs text-muted-foreground w-8">{day}</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-xs text-foreground w-8 text-right">{value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Sections */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Most Viewed Sections
            </h3>
            <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Resume', views: 245, icon: 'FileUser' },
              { name: 'Presentations', views: 189, icon: 'Presentation' },
              { name: 'Video Portfolio', views: 156, icon: 'Video' },
              { name: 'Photo Essays', views: 134, icon: 'Camera' },
              { name: 'Academic Essays', views: 98, icon: 'BookOpen' }
            ].map((section, index) => (
              <div key={section.name} className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 flex-1">
                  <Icon name={section.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{section.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{section.views}</span>
                  <div className="w-1 h-1 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;