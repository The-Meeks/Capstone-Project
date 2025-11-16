import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { StudentProfile } from "../types";

interface StudentProfileCardProps {
  profile: StudentProfile;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
}

const StudentProfileCard = ({
  profile,
  currentLanguage,
  onLanguageChange,
  className = "",
}: StudentProfileCardProps) => {
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
    { code: "ig", name: "Indigenous", flag: "🌍" },
  ];

  const getSkillColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-primary/10 text-primary border-primary/20";
      case "soft":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "language":
        return "bg-accent/10 text-accent border-accent/20";
      case "academic":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "expert":
        return "Star";
      case "advanced":
        return "TrendingUp";
      case "intermediate":
        return "Circle";
      case "beginner":
        return "CircleDot";
      default:
        return "Circle";
    }
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg elevation-1 overflow-hidden ${className}`}
    >
      {/* Header with Language Toggle */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-background elevation-1">
                <Image
                  src={profile.profileImage}
                  alt={profile.profileImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-heading font-bold text-foreground mb-1">
                {profile.name}
              </h1>
              <p className="text-accent font-medium mb-2">{profile.tagline}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="GraduationCap" size={14} />
                  <span>{profile.education.degree}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{profile.contact.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2 bg-background rounded-lg p-1 border border-border">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-academic
                  ${
                    currentLanguage === lang.code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                `}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="hidden sm:inline">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6 space-y-6">
        {/* Education & Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Education
            </h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Icon name="School" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">
                    {profile.education.degree}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {profile.education.institution}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profile.education.year}
                  </p>
                  {profile.education.gpa && (
                    <p className="text-xs text-success font-medium">
                      Average: {profile.education.gpa}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Contact
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-accent" />
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  {profile.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-accent" />
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  {profile.contact.phone}
                </a>
              </div>
              {profile.contact.github && (
                <div className="flex items-center space-x-3">
                  <Icon name="Github" size={16} className="text-accent" />
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-accent transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            About
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile.summary}
          </p>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Skills & Competencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <div
                key={skill.id}
                className={`
                  inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border
                  ${getSkillColor(skill.category)}
                `}
              >
                <Icon name={getLevelIcon(skill.level)} size={12} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            className="flex-1"
            iconName="Download"
            iconPosition="left"
          >
            Download Resume
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            iconName="Share2"
            iconPosition="left"
          >
            Share Portfolio
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            Preview Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
