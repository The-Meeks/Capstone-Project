import React from 'react';
import { StudentProfile } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface ProfileCardProps {
  profile: StudentProfile;
  className?: string;
}

const ProfileCard = ({ profile, className = '' }: ProfileCardProps) => {
  const handleContactClick = (type: 'email' | 'phone') => {
    if (type === 'email') {
      window.location.href = `mailto:${profile.email}`;
    } else {
      window.location.href = `tel:${profile.phone}`;
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden elevation-1 ${className}`}>
      {/* Profile Header */}
      <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Image
              src={profile.avatar}
              alt={profile.avatarAlt}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
              <Icon name="Check" size={12} color="white" />
            </div>
          </div>
          
          <h2 className="text-xl font-heading font-semibold text-foreground mb-1">
            {profile.name}
          </h2>
          <p className="text-sm text-muted-foreground font-caption mb-3">
            {profile.tagline}
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Contact Information</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleContactClick('email')}
            className="w-full justify-start text-left p-2 h-auto"
          >
            <Icon name="Mail" size={16} className="mr-3 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{profile.email}</p>
            </div>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleContactClick('phone')}
            className="w-full justify-start text-left p-2 h-auto"
          >
            <Icon name="Phone" size={16} className="mr-3 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{profile.phone}</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Education */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Education</h3>
        <div className="space-y-3">
          {profile.education.map((edu) => (
            <div key={edu.id} className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">{edu.degree}</h4>
              <p className="text-xs text-muted-foreground">{edu.institution}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{edu.year}</span>
                {edu.gpa && (
                  <span className="text-xs font-medium text-success">GPA: {edu.gpa}</span>
                )}
              </div>
              {edu.honors && (
                <p className="text-xs text-accent font-medium">{edu.honors}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Key Skills</h3>
        <div className="space-y-3">
          {profile.skills.map((skillCategory) => (
            <div key={skillCategory.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {skillCategory.category}
                </h4>
                <span className={`
                  text-xs px-2 py-1 rounded-full font-medium
                  ${skillCategory.level === 'Expert' ? 'bg-success/10 text-success' :
                    skillCategory.level === 'Advanced' ? 'bg-primary/10 text-primary' :
                    skillCategory.level === 'Intermediate'? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {skillCategory.level}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {skillCategory.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Professional Summary</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {profile.summary}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 space-y-2">
        <Button variant="outline" size="sm" className="w-full">
          <Icon name="Download" size={16} className="mr-2" />
          Download vCard
        </Button>
        <Button variant="ghost" size="sm" className="w-full">
          <Icon name="Share2" size={16} className="mr-2" />
          Share Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;