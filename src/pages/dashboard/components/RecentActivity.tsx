import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { RecentActivity as RecentActivityType } from '../types';

interface RecentActivityProps {
  activities: RecentActivityType[];
  className?: string;
}

const RecentActivity = ({ activities, className = '' }: RecentActivityProps) => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'upload':
        return 'text-success bg-success/10';
      case 'view':
        return 'text-primary bg-primary/10';
      case 'edit':
        return 'text-warning bg-warning/10';
      case 'share':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getActionText = (type: string) => {
    switch (type) {
      case 'upload':
        return 'uploaded';
      case 'view':
        return 'viewed';
      case 'edit':
        return 'edited';
      case 'share':
        return 'shared';
      default:
        return 'updated';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg elevation-1 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Recent Activity
            </h2>
            <p className="text-sm text-muted-foreground font-caption mt-1">
              Your latest portfolio updates and interactions
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="History" size={16} className="mr-2" />
            View All
          </Button>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <Icon name={activity.icon} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        You <span className="font-medium">{getActionText(activity.type)}</span>{' '}
                        <span className="font-medium text-primary">{activity.title}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-4 whitespace-nowrap">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Activity" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                No recent activity
              </h3>
              <p className="text-xs text-muted-foreground">
                Start working on your portfolio to see activity here
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {activities.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Upload" size={16} className="mr-2" />
              Upload Content
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Edit3" size={16} className="mr-2" />
              Edit Portfolio
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Share2" size={16} className="mr-2" />
              Share Updates
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;