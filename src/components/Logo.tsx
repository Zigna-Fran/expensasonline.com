import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" fill="url(#gradient)" />
      <path d="M20 80 L50 30 L80 80 Z" fill="white" />
      <circle cx="50" cy="55" r="15" fill="#4F46E5" stroke="white" strokeWidth="3" />
      <path d="M50 45 L50 65 M40 55 L60 55" stroke="white" strokeWidth="3" />
    </svg>
  );
};

export default Logo;