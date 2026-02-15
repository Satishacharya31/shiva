import React from 'react';
import { TEMPLES } from '../constants';

export const ExplorerPage = React.memo(({ t, lang }: any) => (
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