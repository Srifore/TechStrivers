import React, { useState } from 'react';

export default function TechStriversLogo({ variant = 'dark', className = '', size = 'md' }) {
  const isLight = variant === 'light'; // Used on dark backgrounds like Navy #071A2D
  const [imgError, setImgError] = useState(false);

  const heights = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16'
  };

  const heightClass = heights[size] || heights.md;

  // Fallback high-precision SVG vector if image fails to load
  if (imgError) {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <svg width="44" height="50" viewBox="0 0 100 114" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tsGradB" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1769C2" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="tsGradO" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B16" />
              <stop offset="100%" stopColor="#F5A623" />
            </linearGradient>
          </defs>
          <polygon points="50,2 96,27 96,87 50,112 4,87 4,27" fill="none" stroke="url(#tsGradB)" strokeWidth="7" />
          <path d="M24,30 L76,30 L76,42 L56,42 L56,84 L44,84 L44,42 L24,42 Z" fill="url(#tsGradB)" />
          <path d="M32,46 L68,46 L68,58 L44,58 L44,66 L68,66 L68,78 L32,78 L32,66 L56,66 L56,58 L32,58 Z" fill="url(#tsGradO)" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-heading font-black text-xl tracking-tight">
            <span className="text-[#FF6B16]">TECH</span>
            <span className={isLight ? 'text-white' : 'text-[#1769C2]'}>STRIVERS</span>
          </span>
          <span className="text-[9px] font-bold tracking-widest text-[#F5A623] uppercase mt-1">
            CONNECT TOWARDS FUTURE
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${isLight ? 'bg-white/95 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200/20' : ''} ${className}`}>
      <img
        src="/images/techstrivers_logo.png"
        alt="TechStrivers - Connect Towards Future"
        onError={() => setImgError(true)}
        className={`${heightClass} w-auto object-contain transition-transform duration-300 hover:scale-105`}
      />
    </div>
  );
}
