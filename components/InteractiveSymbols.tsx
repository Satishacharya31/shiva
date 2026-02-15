import React from 'react';

export const Diya = ({ className, lit, delay = "0s" }: { className?: string, lit: boolean, delay?: string }) => (
  <div className={`${className} transition-all duration-1000 ${lit ? 'opacity-100 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]' : 'opacity-60 grayscale-[0.5]'}`}>
    <div className="w-12 h-6 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-full relative shadow-lg border-t border-amber-600/50">
       {lit && (
         <>
           {/* Flame Core */}
           <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-200 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] blur-[0.5px] animate-flicker origin-bottom" style={{ animationDelay: delay }}></div>
           {/* Inner Flame */}
           <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-3 bg-white rounded-full animate-flicker origin-bottom opacity-80" style={{ animationDelay: delay }}></div>
           {/* Outer Glow */}
           <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
         </>
       )}
    </div>
  </div>
);

export const Trishul = ({ onClick, isAnimating }: { onClick: () => void, isAnimating: boolean }) => (
  <div onClick={onClick} className={`cursor-pointer group relative transition-transform duration-300 hover:scale-110 ${isAnimating ? 'animate-[shake_0.5s_ease-in-out_infinite]' : ''}`}>
    <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <svg viewBox="0 0 100 200" className="w-32 h-64 md:w-40 md:h-80 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">
      <path d="M50 180 L50 20" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 60 Q20 60 20 20" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M50 60 Q80 60 80 20" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M20 20 L30 10 M20 20 L10 10" stroke="#FFD700" strokeWidth="3" />
      <path d="M80 20 L90 10 M80 20 L70 10" stroke="#FFD700" strokeWidth="3" />
      <path d="M50 20 L60 10 M50 20 L40 10" stroke="#FFD700" strokeWidth="3" />
      <circle cx="50" cy="180" r="4" fill="#FFD700" />
    </svg>
  </div>
);

export const Damru = ({ onClick, isAnimating }: { onClick: () => void, isAnimating: boolean }) => (
  <div onClick={onClick} className={`cursor-pointer group relative transition-transform duration-300 hover:scale-110 ${isAnimating ? 'animate-[spin_0.2s_ease-in-out_infinite]' : ''}`}>
    <div className="absolute inset-0 bg-saffron/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_15px_rgba(255,153,51,0.6)]">
      <path d="M30 20 Q50 50 30 80 L70 80 Q50 50 70 20 Z" fill="#8B4513" stroke="#FFD700" strokeWidth="2" />
      <line x1="30" y1="20" x2="70" y2="20" stroke="#FFD700" strokeWidth="2" />
      <line x1="30" y1="80" x2="70" y2="80" stroke="#FFD700" strokeWidth="2" />
      <path d="M40 50 L20 40" stroke="#E5E5E5" strokeWidth="1" />
      <circle cx="20" cy="40" r="3" fill="#E5E5E5" />
      <path d="M60 50 L80 60" stroke="#E5E5E5" strokeWidth="1" />
      <circle cx="80" cy="60" r="3" fill="#E5E5E5" />
    </svg>
  </div>
);