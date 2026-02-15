import React from 'react';
import { Menu, X, Globe, Flame } from 'lucide-react';
import { Page } from '../types';

export const Navbar = React.memo(({ t, currentPage, setCurrentPage, lang, toggleLanguage, isMenuOpen, setIsMenuOpen }: any) => (
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