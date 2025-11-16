import React, { useEffect } from 'react';

interface LoadingSpinnerProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isVisible, onComplete }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onComplete(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        {/* Dual-color spinner */}
        <div className="relative mx-auto">
          <div className="w-16 h-16 spinner-dual-color"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-3 border-transparent border-l-secondary rounded-full animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>
        </div>

        {/* Animated text */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground animate-pulse">
            Informational Profile
          </h1>
          <p
            className="text-lg font-body text-muted-foreground animate-pulse"
            style={{ animationDelay: '0.5s' }}
          >
            Preparing immersive experience...
          </p>
        </div>

        {/* Progress indicator */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <div
            className="h-full gradient-emerald-amber animate-pulse rounded-full"
            style={{
              animation: 'progressFill 3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          ></div>
        </div>
      </div>

      {/* Standard style tag for React (no jsx prop) */}
      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
