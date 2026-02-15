import { Language } from './types';

export const TRANSLATIONS = {
  en: {
    appTitle: "Realm of Mahadev",
    nav: {
      home: "Home",
      scriptures: "Scriptures",
      temple: "Temple",
      mantra: "Mantra",
      explorer: "Explorer"
    },
    hero: {
      title: "Enter the Realm of Mahadev",
      explore: "Explore Teachings",
      offerPrayer: "Offer Prayer"
    },
    daily: {
      title: "Today's Spiritual Highlight",
      tithi: "Tithi: Krishna Paksha Trayodashi",
      festival: "Upcoming: Mahashivaratri",
    },
    tools: {
      lightDiya: "Light a Diya",
      chantMantra: "Chant Mantra",
      templeExplorer: "Temple Explorer",
      festivalGuide: "Festival Guide"
    },
    virtualTemple: {
      title: "Virtual Sanctum",
      offerBelpatra: "Offer Belpatra",
      lightDiya: "Light Diya",
      ringBell: "Ring Bell",
      prayedCount: "devotees prayed today",
      submitPrayer: "Submit Prayer"
    },
    mantra: {
      title: "Mantra & Meditation",
      play: "Play",
      pause: "Pause",
      readAloud: "Auto Read (Sanskrit)",
      stopRead: "Stop Reading",
      counts: "Counts"
    },
    explorer: {
      title: "Sacred Sites",
      viewDetails: "View Details"
    },
    symbols: {
      title: "Divine Symbols",
      trishul: "Trishul",
      damru: "Damru",
      desc: "Interact with the sacred symbols of power and creation."
    }
  },
  hi: {
    appTitle: "महादेव का धाम",
    nav: {
      home: "मुखपृष्ठ",
      scriptures: "शास्त्र",
      temple: "मंदिर",
      mantra: "मंत्र",
      explorer: "यात्रा"
    },
    hero: {
      title: "महादेव के धाम में प्रवेश करें",
      explore: "ज्ञान का अन्वेषण",
      offerPrayer: "प्रार्थना करें"
    },
    daily: {
      title: "आज का आध्यात्मिक विचार",
      tithi: "तिथि: कृष्ण पक्ष त्रयोदशी",
      festival: "आगामी: महाशिवरात्रि",
    },
    tools: {
      lightDiya: "दीपक जलाएं",
      chantMantra: "मंत्र जाप",
      templeExplorer: "मंदिर दर्शन",
      festivalGuide: "त्योहार गाइड"
    },
    virtualTemple: {
      title: "आभासी गर्भगृह",
      offerBelpatra: "बेलपत्र चढ़ाएं",
      lightDiya: "दीपक जलाएं",
      ringBell: "घंटी बजाएं",
      prayedCount: "भक्तों ने आज प्रार्थना की",
      submitPrayer: "प्रार्थना भेजें"
    },
    mantra: {
      title: "मंत्र और ध्यान",
      play: "चलाएं",
      pause: "रोकें",
      readAloud: "उच्चारण सुनें (संस्कृत)",
      stopRead: "उच्चारण रोकें",
      counts: "जाप संख्या"
    },
    explorer: {
      title: "पवित्र स्थल",
      viewDetails: "विवरण देखें"
    },
    symbols: {
      title: "दिव्य प्रतीक",
      trishul: "त्रिशूल",
      damru: "डमरू",
      desc: "शक्ति और सृजन के पवित्र प्रतीकों के साथ बातचीत करें।"
    }
  },
  ne: {
    appTitle: "महादेवको धाम",
    nav: {
      home: "गृहपृष्ठ",
      scriptures: "शास्त्र",
      temple: "मन्दिर",
      mantra: "मन्त्र",
      explorer: "अन्वेषण"
    },
    hero: {
      title: "महादेवको धाममा प्रवेश गर्नुहोस्",
      explore: "शिक्षा अन्वेषण",
      offerPrayer: "प्रार्थना गर्नुहोस्"
    },
    daily: {
      title: "आजको आध्यात्मिक हाइलाइट",
      tithi: "तिथि: कृष्ण पक्ष त्रयोदशी",
      festival: "आउँदैछ: महाशिवरात्रि",
    },
    tools: {
      lightDiya: "दियो बाल्नुहोस्",
      chantMantra: "मन्त्र जप",
      templeExplorer: "मन्दिर दर्शन",
      festivalGuide: "चाडपर्व गाइड"
    },
    virtualTemple: {
      title: "भर्चुअल गर्भगृह",
      offerBelpatra: "बेलपत्र चढाउनुहोस्",
      lightDiya: "दियो बाल्नुहोस्",
      ringBell: "घण्टी बजाउनुहोस्",
      prayedCount: "भक्तहरूले आज प्रार्थना गरे",
      submitPrayer: "प्रार्थना पठाउनुहोस्"
    },
    mantra: {
      title: "मन्त्र र ध्यान",
      play: "बजाउनुहोस्",
      pause: "रोक्नुहोस्",
      readAloud: "उच्चारण सुन्नुहोस्",
      stopRead: "उच्चारण रोक्नुहोस्",
      counts: "जाप संख्या"
    },
    explorer: {
      title: "पवित्र स्थलहरू",
      viewDetails: "विवरण हेर्नुहोस्"
    },
    symbols: {
      title: "दिव्य प्रतीकहरू",
      trishul: "त्रिशूल",
      damru: "डमरू",
      desc: "शक्ति र सृजनाको पवित्र प्रतीकहरूसँग अन्तरक्रिया गर्नुहोस्।"
    }
  }
};

export const getTranslation = (lang: Language) => TRANSLATIONS[lang];