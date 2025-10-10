import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-800 rounded-full animate-spin`}
      />
    </div>
  );
};

export const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
};

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
};