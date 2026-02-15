import React from 'react';
import { Language } from '../types';

export const Footer = React.memo(({ lang }: { lang: Language }) => (
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