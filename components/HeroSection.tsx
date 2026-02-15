import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Page } from '../types';
import { Trishul, Damru } from './InteractiveSymbols';
import Spline from './Spline';

export const HeroSection = React.memo(({ t, setCurrentPage, handleTrishulClick, trishulActive, handleDamruClick, damruActive }: any) => (
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
      <div className="col-span-1 lg:col-span-8 flex flex-col items-center justify-center text-center">

        {/* Spline Component - properly positioned */}
        <div className="w-full h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center mb-6">
          <Spline
            scene="https://prod.spline.design/QX3a2C1Em-0mWc17/scene.splinecode" 
            width="100%"
            height="100%"
          />
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ash via-white to-ash mb-6 drop-shadow-lg tracking-wide relative z-20">
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