import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Globe, User, Map as MapIcon, Book,
  Flame, Bell, Play, Pause, ChevronRight, Home, Sparkles, Volume2, VolumeX, Music, Mic
} from 'lucide-react';
import { TEMPLES, MANTRAS } from './constants';
import { getTranslation } from './translations';
import { Language, Page, Temple, Mantra } from './types';

// Fix: Augment React's JSX namespace for custom elements
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { url?: string };
    }
  }
}

// Sound Effects Engine using Web Audio API to avoid external assets for simple SFX
const playBellSound = () => {
  if (typeof window === 'undefined') return;
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const t = ctx.currentTime;

  // Realistic Temple Bell Synthesis
  // Uses additive synthesis with inharmonic partials typical of metal bells
  const fundamental = 523.25; // C5 - Clear bell tone
  const partials = [
    { ratio: 1.0, gain: 0.4, decay: 2.5 },
    { ratio: 2.0, gain: 0.1, decay: 1.5 },
    { ratio: 3.0, gain: 0.05, decay: 1.0 },
    { ratio: 4.1, gain: 0.05, decay: 0.8 }, // Inharmonic for metallic texture
    { ratio: 5.8, gain: 0.03, decay: 0.6 }
  ];

  partials.forEach(p => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(fundamental * p.ratio, t);
    
    // Envelope
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(p.gain, t + 0.02); // Sharp attack
    gain.gain.exponentialRampToValueAtTime(0.001, t + p.decay); // Long decay
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + p.decay + 0.1);
  });
};

const playDamruSound = () => {
  if (typeof window === 'undefined') return;
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();

  // Create two distinct beats for "Dug-Dug"
  [0, 0.15].forEach((startTime) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime + startTime);
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + startTime + 0.1);

    gain.gain.setValueAtTime(0.5, ctx.currentTime + startTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + startTime + 0.1);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + 0.1);
  });
};

// Interactive Diya Component
const Diya = ({ className, lit, delay = "0s" }: { className?: string, lit: boolean, delay?: string }) => (
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

// Interactive Trishul SVG Component
const Trishul = ({ onClick, isAnimating }: { onClick: () => void, isAnimating: boolean }) => (
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

// Interactive Damru SVG Component
const Damru = ({ onClick, isAnimating }: { onClick: () => void, isAnimating: boolean }) => (
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

// --- Extracted Components to prevent re-renders ---

const Navbar = React.memo(({ t, currentPage, setCurrentPage, lang, toggleLanguage, isMenuOpen, setIsMenuOpen }: any) => (
  <nav className="fixed w-full z-50 top-0 left-0 bg-cosmic/90 backdrop-blur-md border-b border-white/10 shadow-2xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage(Page.HOME)}>
          <Flame className="h-8 w-8 text-saffron mr-2 animate-pulse-slow" />
          <span className="font-serif font-bold text-xl tracking-wider text-ash">{t.appTitle}</span>
        </div>

        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-8">
            <button onClick={() => setCurrentPage(Page.HOME)} className={`${currentPage === Page.HOME ? 'text-saffron' : 'text-ash'} hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.home}</button>
            <button onClick={() => setCurrentPage(Page.SCRIPTURES)} className={`${currentPage === Page.SCRIPTURES ? 'text-saffron' : 'text-ash'} hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.scriptures}</button>
            <button onClick={() => setCurrentPage(Page.VIRTUAL_TEMPLE)} className={`${currentPage === Page.VIRTUAL_TEMPLE ? 'text-saffron' : 'text-ash'} hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.temple}</button>
            <button onClick={() => setCurrentPage(Page.MANTRA)} className={`${currentPage === Page.MANTRA ? 'text-saffron' : 'text-ash'} hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.mantra}</button>
            <button onClick={() => setCurrentPage(Page.EXPLORER)} className={`${currentPage === Page.EXPLORER ? 'text-saffron' : 'text-ash'} hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors`}>{t.nav.explorer}</button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center text-ash hover:text-saffron transition-colors border border-white/20 rounded-full px-3 py-1 text-xs font-bold"
          >
            <Globe className="h-4 w-4 mr-1" />
            {lang.toUpperCase()}
          </button>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-ash hover:text-white p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-charcoal border-b border-white/10">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button onClick={() => { setCurrentPage(Page.HOME); setIsMenuOpen(false); }} className="text-ash hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">{t.nav.home}</button>
          <button onClick={() => { setCurrentPage(Page.SCRIPTURES); setIsMenuOpen(false); }} className="text-ash hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">{t.nav.scriptures}</button>
          <button onClick={() => { setCurrentPage(Page.VIRTUAL_TEMPLE); setIsMenuOpen(false); }} className="text-ash hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">{t.nav.temple}</button>
          <button onClick={() => { setCurrentPage(Page.MANTRA); setIsMenuOpen(false); }} className="text-ash hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">{t.nav.mantra}</button>
        </div>
      </div>
    )}
  </nav>
));

const HeroSection = React.memo(({ t, setCurrentPage, handleTrishulClick, trishulActive, handleDamruClick, damruActive }: any) => (
  <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20">
    {/* Background with enhanced cosmic effect */}
    <div className="absolute inset-0 bg-cosmic z-0 pointer-events-none">
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse-slow"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-900/10 to-cosmic"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-[100px] animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/20 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
    </div>

    <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 items-center h-full px-4">

      {/* Left Side - Interactive Trishul */}
      <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
        <Trishul onClick={handleTrishulClick} isAnimating={trishulActive} />
        <p className="mt-4 text-saffron/80 font-serif tracking-widest text-sm uppercase">{t.symbols.trishul}</p>
      </div>

      {/* Center - Main Content with Spline */}
      <div className="col-span-1 lg:col-span-8 flex flex-col items-center justify-center">

        {/* Spline Viewer - Dedicated Space Above Text */}
        <div className="w-full max-w-full h-[300px] md:h-[400px] lg:h-[500px] relative flex items-center justify-center mb-8 mx-auto overflow-hidden">
          <spline-viewer 
            url="https://prod.spline.design/QX3a2C1Em-0mWc17/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          >
             {/* Fallback image as provided in prompt */}
             <img 
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAQxklEQVR4AQCBAH7/ACcjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/AIEAfv8AJyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/AIEAfv8AJyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/wCBAH7/ACcjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/AIEAfv8AJyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8AgQB+/wAnIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/wCBAH7/ACcjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/AIEAfv8AJyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8AgQB+/wAnIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/wCBAH7/ACcjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/AIEAfv8AJyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8AgQB+/wAnIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/AYEAfv8AJyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8nIyH/JyMh/ycjIf8wCKhM3ILLxgAAAABJRU5ErkJggg==" 
               alt="Spline preview" 
               style={{ width: '100%', height: '100%' }}
             />
          </spline-viewer>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ash via-white to-ash mb-6 drop-shadow-lg tracking-wide text-center relative z-20">
          {t.hero.title}
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 relative z-20">
          <button onClick={() => setCurrentPage(Page.SCRIPTURES)} className="px-8 py-3 bg-transparent border border-saffron text-saffron hover:bg-saffron hover:text-white transition-all duration-300 rounded-full text-lg font-medium tracking-wide">
            {t.hero.explore}
          </button>
          <button onClick={() => setCurrentPage(Page.VIRTUAL_TEMPLE)} className="px-8 py-3 bg-gradient-to-r from-saffron to-orange-600 text-white rounded-full text-lg font-medium shadow-[0_0_20px_rgba(255,153,51,0.4)] hover:shadow-[0_0_30px_rgba(255,153,51,0.6)] transition-all duration-300 transform hover:-translate-y-1">
            {t.hero.offerPrayer}
          </button>
        </div>
      </div>

      {/* Right Side - Interactive Damru */}
      <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center animate-float" style={{ animationDelay: '3s' }}>
        <Damru onClick={handleDamruClick} isAnimating={damruActive} />
        <p className="mt-4 text-saffron/80 font-serif tracking-widest text-sm uppercase">{t.symbols.damru}</p>
      </div>
    </div>

    {/* Mobile Symbols Row */}
    <div className="flex lg:hidden justify-center gap-12 mt-8 mb-12 relative z-20">
      <Trishul onClick={handleTrishulClick} isAnimating={trishulActive} />
      <Damru onClick={handleDamruClick} isAnimating={damruActive} />
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-30" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
      <ChevronRight className="w-8 h-8 text-white/50 rotate-90" />
    </div>
  </div>
));

const DailyHighlight = React.memo(({ t, lang }: any) => (
  <section className="py-20 bg-charcoal px-4 relative">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron to-transparent opacity-30"></div>
    <div className="max-w-4xl mx-auto glass rounded-2xl p-8 border border-white/5 relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
      <div className="absolute top-0 right-0 p-4 opacity-10 animate-spin-slow">
        <Sparkles className="w-32 h-32 text-saffron" />
      </div>
      <h2 className="text-saffron font-serif text-2xl mb-4">{t.daily.title}</h2>
      <div className="space-y-2">
        <p className="text-xl text-ash font-light">{t.daily.tithi}</p>
        <p className="text-lg text-saffron font-medium">{t.daily.festival}</p>
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white italic font-serif text-lg leading-relaxed">
            "{lang === 'en' ? "Shiva is the soul of all living beings. He is the self-illuminating light that resides in the heart of everyone." :
              lang === 'hi' ? "शिव सभी प्राणियों की आत्मा हैं। वे स्वयं-प्रकाशित ज्योति हैं जो सभी के हृदय में निवास करती हैं।" :
                "शिव सबै जीवित प्राणीहरूको आत्मा हुनुहुन्छ। उहाँ स्वयं-प्रकाशित ज्योति हुनुहुन्छ जो सबैको हृदयमा निवास गर्नुहुन्छ।"}"
          </p>
          <p className="text-sm text-gray-400 mt-2">— Shiva Purana</p>
        </div>
      </div>
    </div>
  </section>
));

const Footer = React.memo(({ lang }: { lang: Language }) => (
  <footer className="bg-black/50 py-8 border-t border-white/10 mt-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="text-ash/60 text-sm">
        © 2024 Realm of Mahadev. {lang === 'en' ? "Dedicated to the Divine." : lang === 'hi' ? "दिव्य को समर्पित।" : "दिव्यलाई समर्पित।"}
      </p>
      <p className="text-xs text-ash/30 mt-2 font-mono">
        Om Namah Shivaya
      </p>
    </div>
  </footer>
));

const ScripturesPage = React.memo(({ t, lang }: any) => (
    <div className="min-h-screen bg-cosmic pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif text-saffron mb-2 text-center">{t.nav.scriptures}</h2>
        <p className="text-center text-gray-400 mb-12">
          {lang === 'en' ? "Ancient Wisdom of the Eternal" : lang === 'hi' ? "सनातन का प्राचीन ज्ञान" : "सनातनको प्राचीन ज्ञान"}
        </p>

        <div className="space-y-12">
          <div className="glass rounded-2xl p-8 border-l-4 border-saffron hover:bg-white/5 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              {lang === 'en' ? "The Origin of Lingam" : lang === 'hi' ? "लिंगम की उत्पत्ति" : "लिङ्गमको उत्पत्ति"}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed font-serif">
              {lang === 'en' ?
                "Once, Brahma and Vishnu fought over supremacy. To settle this, Shiva appeared as an infinite pillar of fire (Jyotirlinga). Brahma soared up to find the top, and Vishnu dove deep to find the base. Neither succeeded, realizing Shiva is without beginning or end." :
                lang === 'hi' ?
                  "एक बार ब्रह्मा और विष्णु में श्रेष्ठता को लेकर युद्ध हुआ। इसे सुलझाने के लिए, शिव अग्नि के अनंत स्तंभ (ज्योतिर्लिंग) के रूप में प्रकट हुए। ब्रह्मा ने शीर्ष खोजने के लिए ऊपर उड़ान भरी, और विष्णु ने आधार खोजने के लिए गहराई में गोता लगाया। न तो कोई सफल हुआ, यह महसूस करते हुए कि शिव आदि और अंत रहित हैं।" :
                  "एक पटक ब्रह्मा र विष्णु बीच श्रेष्ठताको विषयमा युद्ध भयो। यसलाई समाधान गर्न, शिव अग्निको अनन्त स्तम्भ (ज्योतिर्लिङ्ग) को रूपमा प्रकट हुनुभयो। ब्रह्माले शीर्ष फेला पार्न माथि उडान भरे, र विष्णुले आधार फेला पार्न गहिराइमा डुबुल्की मारे। न त कोही सफल भयो, यो महसुस गर्दै कि शिव आदि र अन्त रहित हुनुहुन्छ।"
              }
            </p>
          </div>

          <div className="glass rounded-2xl p-8 border-l-4 border-purple-500 hover:bg-white/5 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              {lang === 'en' ? "Shiva Tattva" : "शिव तत्व"}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed font-serif">
              {lang === 'en' ?
                "Shiva is not just a god, but a principle (Tattva). He is the silence after the sound, the space in which the universe dances. He is 'Shava' (corpse) without 'Shakti' (Energy)." :
                lang === 'hi' ?
                  "शिव केवल एक देवता नहीं हैं, बल्कि एक सिद्धांत (तत्व) हैं। वे ध्वनि के बाद का सन्नाटा हैं, वह स्थान जिसमें ब्रह्मांड नृत्य करता है। शक्ति (ऊर्जा) के बिना वे 'शव' (लाश) हैं।" :
                  "शिव केवल एक देवता होइनन्, तर एक सिद्धान्त (तत्व) हुन्। उनी ध्वनिको पछाडिको शून्यता हुन्, त्यो स्थान जसमा ब्रह्माण्ड नाच्छ। शक्ति (ऊर्जा) बिना उनी 'शव' (लास) हुन्।"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
));

const ExplorerPage = React.memo(({ t, lang }: any) => (
    <div className="min-h-screen bg-cosmic pt-20 px-4">
        <h2 className="text-3xl font-serif text-center text-saffron mb-12">{t.explorer.title}</h2>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Visual Map Representation */}
          <div className="relative aspect-[4/5] bg-charcoal rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Abstract India Map Outline (CSS/SVG Mock) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg viewBox="0 0 400 500" className="w-full h-full text-white fill-current">
                <path d="M200,50 C180,60 150,80 140,120 C130,160 100,200 80,250 C60,300 90,400 150,450 C250,450 310,400 320,300 C330,200 280,100 200,50 Z" />
              </svg>
            </div>

            {/* Temple Dots */}
            {TEMPLES.map((temple) => (
              <div
                key={temple.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ top: `${temple.coordinates.y}%`, left: `${temple.coordinates.x + 30}%` }}
              >
                <div className="w-4 h-4 bg-saffron rounded-full animate-pulse shadow-[0_0_10px_orange]"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 z-20">
                  {lang === 'hi' && temple.name_hi ? temple.name_hi : lang === 'ne' && temple.name_ne ? temple.name_ne : temple.name}
                </div>
              </div>
            ))}
          </div>

          {/* Temple List */}
          <div className="space-y-6 h-[600px] overflow-y-auto scrollbar-hide">
            {TEMPLES.map((temple) => (
              <div key={temple.id} className="glass rounded-xl p-4 flex gap-4 hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/10">
                <img src={temple.imageUrl} alt={temple.name} className="w-24 h-24 rounded-lg object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div>
                  <h3 className="text-xl font-bold text-white font-serif mb-1">
                    {lang === 'hi' && temple.name_hi ? temple.name_hi : lang === 'ne' && temple.name_ne ? temple.name_ne : temple.name}
                  </h3>
                  <p className="text-saffron text-sm mb-2">
                    {lang === 'hi' && temple.location_hi ? temple.location_hi : lang === 'ne' && temple.location_ne ? temple.location_ne : temple.location}
                  </p>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {lang === 'hi' && temple.description_hi ? temple.description_hi : lang === 'ne' && temple.description_ne ? temple.description_ne : temple.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
));

const VirtualTemple = React.memo(({ t }: { t: any }) => {
  const [belpatraCount, setBelpatraCount] = useState(0);
  const [diyaLit, setDiyaLit] = useState(false);
  const [prayedCount, setPrayedCount] = useState(108);

  const handleOfferBelpatra = () => {
    setBelpatraCount(prev => prev + 1);
  };

  const handleLightDiya = () => {
    setDiyaLit(true);
  };

  const handleRingBell = () => {
    playBellSound();
  };

  return (
    <div className="min-h-screen bg-cosmic pt-20 px-4 flex flex-col items-center">
       {/* Temple Image/Graphic */}
       <div className="relative w-full max-w-2xl h-[400px] bg-charcoal rounded-3xl overflow-hidden shadow-2xl mb-8 border border-white/10">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Kashi_Vishwanath_Temple_Varanasi.jpg/800px-Kashi_Vishwanath_Temple_Varanasi.jpg" 
            alt="Sanctum" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          
          {/* Diya Overlay */}
          <div className="absolute bottom-10 left-10 md:left-20">
             <Diya lit={diyaLit} />
          </div>
          <div className="absolute bottom-10 right-10 md:right-20">
             <Diya lit={diyaLit} delay="0.5s" />
          </div>
       </div>

       {/* Controls */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <button onClick={handleOfferBelpatra} className="glass p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-green-900/20 transition group">
             <div className="text-3xl group-hover:scale-110 transition">🍃</div>
             <span className="text-white font-serif">{t.virtualTemple.offerBelpatra} ({belpatraCount})</span>
          </button>
          
          <button onClick={handleLightDiya} className="glass p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-orange-900/20 transition group">
             <div className="text-3xl group-hover:scale-110 transition">🪔</div>
             <span className="text-white font-serif">{t.virtualTemple.lightDiya}</span>
          </button>
          
          <button onClick={handleRingBell} className="glass p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-yellow-900/20 transition group">
             <div className="text-3xl group-hover:scale-110 transition">🔔</div>
             <span className="text-white font-serif">{t.virtualTemple.ringBell}</span>
          </button>
       </div>

       <div className="mt-12 text-center text-ash/60">
          <p>{prayedCount} {t.virtualTemple.prayedCount}</p>
       </div>
    </div>
  );
});

const MantraPage = React.memo(({ 
    t, 
    lang, 
    activeMantra, 
    setActiveMantra, 
    isPlaying, 
    setIsPlaying, 
    chantCount, 
    setChantCount, 
    speakMantra, 
    isSpeaking 
}: any) => {

  return (
    <div className="min-h-screen bg-cosmic pt-20 px-4 pb-20">
       <h2 className="text-3xl font-serif text-center text-saffron mb-12">{t.mantra.title}</h2>
       
       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* List */}
          <div className="space-y-4">
             {MANTRAS.map((mantra) => (
                <div 
                  key={mantra.id} 
                  onClick={() => setActiveMantra(mantra)}
                  className={`p-6 rounded-xl cursor-pointer transition-all border ${activeMantra?.id === mantra.id ? 'bg-white/10 border-saffron' : 'glass border-transparent hover:border-white/20'}`}
                >
                   <h3 className="text-xl font-bold text-white mb-1">{mantra.name}</h3>
                   <p className="text-sm text-gray-400 line-clamp-1">{mantra.meaning}</p>
                </div>
             ))}
          </div>

          {/* Player / Details */}
          <div className="lg:sticky lg:top-24 h-fit">
             {activeMantra ? (
                <div className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Music className="w-32 h-32 text-saffron" />
                   </div>
                   
                   <h3 className="text-3xl font-serif text-saffron mb-6">{activeMantra.name}</h3>
                   
                   <div className="bg-black/40 p-6 rounded-xl mb-6 border border-white/5">
                      <p className="text-lg text-white font-serif leading-loose whitespace-pre-line text-center">
                         {activeMantra.sanskrit}
                      </p>
                   </div>
                   
                   <p className="text-gray-300 italic mb-8 border-l-2 border-saffron pl-4">
                      {activeMantra.meaning}
                   </p>
                   
                   <div className="flex gap-4 items-center justify-center">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 rounded-full bg-saffron text-white flex items-center justify-center hover:bg-orange-600 transition shadow-[0_0_20px_rgba(255,153,51,0.4)]"
                      >
                         {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                      </button>
                      
                      <button 
                         onClick={() => speakMantra(activeMantra.sanskrit)}
                         className={`px-6 py-3 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white/10 transition ${isSpeaking ? 'text-saffron border-saffron' : 'text-ash'}`}
                      >
                         {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                         <span>{isSpeaking ? t.mantra.stopRead : t.mantra.readAloud}</span>
                      </button>
                   </div>
                </div>
             ) : (
                <div className="h-full flex items-center justify-center text-gray-500 glass rounded-2xl p-12 text-center">
                   <p>Select a mantra to begin meditation</p>
                </div>
             )}
          </div>
       </div>
    </div>
  );
});

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mantra State
  const [activeMantra, setActiveMantra] = useState<Mantra | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // TTS State
  const [chantCount, setChantCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Symbol State
  const [trishulActive, setTrishulActive] = useState(false);
  const [damruActive, setDamruActive] = useState(false);

  const t = getTranslation(lang);

  // Initialize TTS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Stop audio when changing pages
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    // Stop TTS
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, [currentPage]);

  // Handle Audio Play/Pause
  useEffect(() => {
    if (activeMantra && audioRef.current) {
      if (isPlaying) {
        // Stop TTS if playing audio
        if (synthRef.current) {
          synthRef.current.cancel();
          setIsSpeaking(false);
        }
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeMantra]);

  // Robust Spline Logo Removal
  useEffect(() => {
    const cleanSpline = () => {
        const viewers = document.querySelectorAll('spline-viewer');
        viewers.forEach((viewer: any) => {
            if (viewer.shadowRoot) {
                // Method 1: Direct hide
                const logo = viewer.shadowRoot.querySelector('#logo');
                if (logo) (logo as HTMLElement).style.display = 'none';
                
                // Method 2: Style injection (more persistent)
                if (!viewer.shadowRoot.querySelector('style#hide-logo')) {
                    const style = document.createElement('style');
                    style.id = 'hide-logo';
                    style.textContent = '#logo { display: none !important; opacity: 0 !important; visibility: hidden !important; }';
                    viewer.shadowRoot.appendChild(style);
                }
            }
        });
    };

    // Run periodically to catch the shadow dom loading
    const intervalId = setInterval(cleanSpline, 200);

    // Stop trying after 20 seconds to save resources, though if user refreshes it starts again
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 20000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [currentPage]);

  const toggleLanguage = () => {
    if (lang === 'en') setLang('hi');
    else if (lang === 'hi') setLang('ne');
    else setLang('en');
  };

  const handleTrishulClick = React.useCallback(() => {
    setTrishulActive(true);
    playBellSound();
    setTimeout(() => setTrishulActive(false), 1000);
  }, []);

  const handleDamruClick = React.useCallback(() => {
    setDamruActive(true);
    playDamruSound();
    setTimeout(() => setDamruActive(false), 1000);
  }, []);

  const speakMantra = (text: string) => {
    if (!synthRef.current) return;

    // Stop Audio Player if active
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    // Cancel existing TTS
    synthRef.current.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Use Hindi as it is phonetically closest to Sanskrit
    utterance.lang = 'hi-IN';
    utterance.rate = 0.8; // Slower for clarity
    utterance.pitch = 0.9; // Slightly deeper

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="bg-cosmic min-h-screen text-ash font-sans selection:bg-saffron selection:text-white">
      <Navbar 
        t={t} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        lang={lang} 
        toggleLanguage={toggleLanguage} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      {currentPage === Page.HOME && (
        <>
          <HeroSection 
            t={t} 
            setCurrentPage={setCurrentPage} 
            handleTrishulClick={handleTrishulClick} 
            trishulActive={trishulActive} 
            handleDamruClick={handleDamruClick} 
            damruActive={damruActive} 
          />
          <DailyHighlight t={t} lang={lang} />
          {/* Quick Links for Home */}
          <div className="py-20 px-4 max-w-7xl mx-auto">
            <h3 className="text-2xl font-serif text-center mb-10 text-white opacity-80">{t.daily.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div onClick={() => setCurrentPage(Page.VIRTUAL_TEMPLE)} className="glass p-6 rounded-xl hover:bg-white/10 transition cursor-pointer text-center group border border-transparent hover:border-saffron/30">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/40 transition">🪔</div>
                <h4 className="font-bold text-white">{t.tools.lightDiya}</h4>
              </div>
              <div onClick={() => setCurrentPage(Page.MANTRA)} className="glass p-6 rounded-xl hover:bg-white/10 transition cursor-pointer text-center group border border-transparent hover:border-purple-500/30">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/40 transition">🕉️</div>
                <h4 className="font-bold text-white">{t.tools.chantMantra}</h4>
              </div>
              <div onClick={() => setCurrentPage(Page.EXPLORER)} className="glass p-6 rounded-xl hover:bg-white/10 transition cursor-pointer text-center group border border-transparent hover:border-blue-500/30">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/40 transition">🗺️</div>
                <h4 className="font-bold text-white">{t.tools.templeExplorer}</h4>
              </div>
              <div className="glass p-6 rounded-xl hover:bg-white/10 transition cursor-pointer text-center group border border-transparent hover:border-red-500/30">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/40 transition">📅</div>
                <h4 className="font-bold text-white">{t.tools.festivalGuide}</h4>
              </div>
            </div>

            {/* Symbols Section for mobile/extra interactivity */}
            <div className="mt-16 text-center">
              <h3 className="text-xl font-serif text-white opacity-60 mb-8">{t.symbols.desc}</h3>
              <div className="inline-flex gap-8 p-8 glass rounded-3xl">
                <div className="cursor-pointer hover:scale-110 transition-transform" onClick={handleTrishulClick}>
                  <div className="text-4xl">🔱</div>
                </div>
                <div className="cursor-pointer hover:scale-110 transition-transform" onClick={handleDamruClick}>
                  <div className="text-4xl">🥁</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {currentPage === Page.SCRIPTURES && <ScripturesPage t={t} lang={lang} />}
      {currentPage === Page.VIRTUAL_TEMPLE && <VirtualTemple t={t} />}
      {currentPage === Page.MANTRA && (
        <MantraPage 
          t={t}
          lang={lang}
          activeMantra={activeMantra}
          setActiveMantra={setActiveMantra}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          chantCount={chantCount}
          setChantCount={setChantCount}
          speakMantra={speakMantra}
          isSpeaking={isSpeaking}
        />
      )}
      {currentPage === Page.EXPLORER && <ExplorerPage t={t} lang={lang} />}

      <Footer lang={lang} />
      
      {/* Hidden Audio Element for Music */}
      <audio 
        ref={audioRef} 
        src={activeMantra?.audioUrl} 
        onEnded={() => setIsPlaying(false)} 
        className="hidden" 
      />
    </div>
  );
}

export default App;