import React from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { MANTRAS } from '../constants';

export const MantraPage = React.memo(({ 
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