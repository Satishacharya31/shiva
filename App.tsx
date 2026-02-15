import React, { useState, useEffect, useRef } from 'react';
import { getTranslation } from './translations';
import { Language, Page, Mantra } from './types';
import { playBellSound, playDamruSound } from './utils/sound';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DailyHighlight } from './components/DailyHighlight';
import { ScripturesPage } from './components/ScripturesPage';
import { ExplorerPage } from './components/ExplorerPage';
import { VirtualTemple } from './components/VirtualTemple';
import { MantraPage } from './components/MantraPage';
import { Footer } from './components/Footer';

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