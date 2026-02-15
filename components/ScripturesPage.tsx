import React from 'react';

export const ScripturesPage = React.memo(({ t, lang }: any) => (
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