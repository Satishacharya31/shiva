import React, { useState } from 'react';
import { Diya } from './InteractiveSymbols';
import { playBellSound } from '../utils/sound';

export const VirtualTemple = React.memo(({ t }: { t: any }) => {
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
    <div className="min-h-screen bg-cosmic pt-20 px-4 flex flex-col items-center pb-20">
       <h2 className="text-3xl font-serif text-center text-saffron mb-8">{t.virtualTemple.title}</h2>

       {/* Temple Sanctum Container */}
       <div className="relative w-full max-w-2xl h-[500px] bg-charcoal rounded-t-[10rem] rounded-b-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col items-center justify-end perspective-1000 group">
          
          {/* 1. Background Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#1a1a1a_0%,#000000_100%)]"></div>
          
          {/* 2. Divine Glow (Halo) */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-64 h-64 bg-saffron/10 rounded-full blur-[60px] animate-pulse-slow"></div>

          {/* 3. Hanging Bells (Decoration) */}
          <div className="absolute top-0 w-full flex justify-between px-12 opacity-40 pointer-events-none">
              <div className="w-1 h-16 bg-gradient-to-b from-gray-500 to-gold">
                  <div className="w-8 h-10 bg-gradient-to-b from-gold to-yellow-900 rounded-b-full absolute -bottom-8 -left-3.5 shadow-lg border-b-2 border-yellow-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-black/50 rounded-full mt-6"></div>
                  </div>
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-gray-500 to-gold">
                   <div className="w-10 h-12 bg-gradient-to-b from-gold to-yellow-900 rounded-b-full absolute -bottom-10 -left-4.5 shadow-lg border-b-2 border-yellow-600 flex items-center justify-center">
                      <div className="w-2 h-2 bg-black/50 rounded-full mt-8"></div>
                   </div>
              </div>
              <div className="w-1 h-16 bg-gradient-to-b from-gray-500 to-gold">
                   <div className="w-8 h-10 bg-gradient-to-b from-gold to-yellow-900 rounded-b-full absolute -bottom-8 -left-3.5 shadow-lg border-b-2 border-yellow-600 flex items-center justify-center">
                      <div className="w-2 h-2 bg-black/50 rounded-full mt-6"></div>
                   </div>
              </div>
          </div>

          {/* 4. The Shiva Linga Structure */}
          <div className="relative z-10 mb-10 flex flex-col items-center transform transition-transform duration-700 group-hover:scale-[1.02]">
                
                {/* Belpatra Falling/Resting Logic */}
                <div className="absolute z-20 w-full h-full flex justify-center items-center pointer-events-none">
                     {belpatraCount > 0 && Array.from({ length: Math.min(belpatraCount, 15) }).map((_, i) => (
                        <div 
                            key={i} 
                            className="absolute text-xl md:text-2xl drop-shadow-md opacity-90 transition-all duration-700"
                            style={{ 
                                top: `${25 + Math.random() * 20}%`, 
                                left: `${40 + (Math.random() - 0.5) * 30}%`,
                                transform: `rotate(${Math.random() * 360}deg) translateZ(10px)`,
                            }}
                        >
                            🌿
                        </div>
                     ))}
                </div>

                {/* Lingam Cylinder */}
                <div className="relative w-32 md:w-40 h-48 md:h-56 bg-gradient-to-r from-gray-800 via-gray-950 to-gray-900 rounded-t-full shadow-[inset_-15px_0_20px_rgba(0,0,0,1),inset_10px_0_10px_rgba(255,255,255,0.15)] overflow-hidden">
                    {/* Tripundra (Forehead markings) */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center w-full opacity-80">
                         {/* Lines */}
                         <div className="w-[70%] h-[2px] bg-gradient-to-r from-transparent via-ash to-transparent blur-[0.5px]"></div>
                         <div className="w-[80%] h-[2px] bg-gradient-to-r from-transparent via-ash to-transparent blur-[0.5px]"></div>
                         <div className="w-[70%] h-[2px] bg-gradient-to-r from-transparent via-ash to-transparent blur-[0.5px]"></div>
                         {/* Red Tilak */}
                         <div className="w-2 h-4 bg-red-600 rounded-full blur-[1px] shadow-[0_0_5px_red] mt-[-16px]"></div>
                    </div>
                </div>

                {/* Peetham (Yoni Base) Top Disc */}
                <div className="w-56 md:w-64 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-[50%] -mt-4 z-0 shadow-xl border-t border-white/5"></div>

                {/* Peetham (Yoni Base) Main Body */}
                <div className="relative w-72 md:w-96 h-12 bg-gradient-to-r from-gray-800 via-black to-gray-900 rounded-[50%] -mt-5 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-t border-white/5">
                      {/* Water/Milk Outlet (Gomukhi) */}
                      <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-16 h-8 bg-gradient-to-r from-gray-900 to-black rounded-r-full border-t border-white/5 -z-10"></div>
                </div>

                {/* Pedestal */}
                <div className="w-64 md:w-80 h-16 bg-gradient-to-b from-gray-900 to-black rounded-b-xl -mt-6 -z-20 mx-auto opacity-80"></div>
          </div>

          {/* 5. Diyas on the floor */}
          <div className="absolute bottom-6 left-6 md:left-24 z-20">
             <Diya lit={diyaLit} />
          </div>
          <div className="absolute bottom-6 right-6 md:right-24 z-20">
             <Diya lit={diyaLit} delay="0.4s" />
          </div>

          {/* 6. Flower Petals on floor */}
          <div className="absolute bottom-4 w-full flex justify-center gap-12 opacity-60 pointer-events-none">
              <span className="text-red-500/50 transform rotate-45 text-xl">🌸</span>
              <span className="text-orange-500/50 transform -rotate-12 text-xl">🌼</span>
              <span className="text-white/30 transform rotate-90 text-xl">🌸</span>
          </div>
       </div>

       {/* Controls Area */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
          <button 
            onClick={handleOfferBelpatra} 
            className="glass p-5 rounded-2xl flex flex-col items-center gap-3 hover:bg-green-900/20 hover:border-green-500/30 transition-all duration-300 group active:scale-95"
          >
             <div className="text-4xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">🌿</div>
             <span className="text-white font-serif tracking-wide">{t.virtualTemple.offerBelpatra}</span>
             <span className="text-xs text-green-400 font-mono bg-green-900/30 px-2 py-0.5 rounded-full">{belpatraCount} Offered</span>
          </button>
          
          <button 
            onClick={handleLightDiya} 
            className={`glass p-5 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 group active:scale-95 ${diyaLit ? 'bg-orange-900/20 border-orange-500/30 shadow-[0_0_20px_rgba(255,165,0,0.1)]' : 'hover:bg-orange-900/20 hover:border-orange-500/30'}`}
          >
             <div className={`text-4xl transition-transform duration-300 ${diyaLit ? 'scale-110 drop-shadow-[0_0_10px_orange]' : 'group-hover:scale-110'}`}>🪔</div>
             <span className="text-white font-serif tracking-wide">{t.virtualTemple.lightDiya}</span>
             {diyaLit && <span className="text-xs text-orange-400 font-mono bg-orange-900/30 px-2 py-0.5 rounded-full">Lit</span>}
          </button>
          
          <button 
            onClick={handleRingBell} 
            className="glass p-5 rounded-2xl flex flex-col items-center gap-3 hover:bg-yellow-900/20 hover:border-yellow-500/30 transition-all duration-300 group active:scale-95"
          >
             <div className="text-4xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">🔔</div>
             <span className="text-white font-serif tracking-wide">{t.virtualTemple.ringBell}</span>
          </button>
       </div>

       <div className="mt-12 text-center">
          <p className="text-ash/60 font-serif italic mb-2">{t.virtualTemple.prayedCount}</p>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">
            {prayedCount.toLocaleString()}
          </div>
       </div>
    </div>
  );
});