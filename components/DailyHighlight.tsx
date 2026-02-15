import React from 'react';
import { Sparkles } from 'lucide-react';

export const DailyHighlight = React.memo(({ t, lang }: any) => (
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