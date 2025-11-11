import React from 'react';
import Icon from '../../../components/AppIcon';
import { PortfolioProgress as PortfolioProgressType } from '../types';

interface PortfolioProgressProps {
  progress: PortfolioProgressType;
  className?: string;
}

const PortfolioProgress = ({ progress, className = '' }: PortfolioProgressProps) => {
  const completionPercentage = Math.round((progress.completedSections / progress.totalSections) * 100);

  const getStatusIcon = (isCompleted: boolean, progress: number) => {
    if (isCompleted) return 'CheckCircle2';
    if (progress > 0) return 'Clock';
    return 'Circle';
  };

  const getStatusColor = (isCompleted: boolean, progress: number) => {
    if (isCompleted) return 'text-success';
    if (progress > 0) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`bg-card border border-border rounded-lg elevation-1 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Portfolio Progress
            </h2>
            <p className="text-sm text-muted-foreground font-caption mt-1">
              Track your capstone completion status
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {completionPercentage}%
            </div>
            <div className="text-xs text-muted-foreground">
              {progress.completedSections} of {progress.totalSections} complete
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Overall Completion</span>
            <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Section Progress */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Section Status
          </h3>
          <div className="space-y-3">
            {progress.sections.map((section) => (
              <div key={section.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <Icon 
                  name={getStatusIcon(section.isCompleted, section.progress)} 
                  size={20} 
                  className={getStatusColor(section.isCompleted, section.progress)}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {section.name}
                    </h4>
                    <span className="text-xs text-muted-foreground ml-2">
                      {section.progress}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-background rounded-full h-1.5 mr-3">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          section.isCompleted 
                            ? 'bg-success' 
                            : section.progress > 0 
                              ? 'bg-warning' :'bg-muted-foreground/30'
                        }`}
                        style={{ width: `${section.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(section.lastUpdated)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Icon name="Target" size={16} />
            <span className="text-sm font-medium">Set Goals</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
            <Icon name="Calendar" size={16} />
            <span className="text-sm font-medium">Schedule Review</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
            <Icon name="BarChart3" size={16} />
            <span className="text-sm font-medium">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProgress;