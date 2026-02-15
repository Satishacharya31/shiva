import { Temple, Mantra, ScriptureChapter } from './types';

export const TEMPLES: Temple[] = [
  {
    id: '1',
    name: 'Somnath Temple',
    name_hi: 'सोमनाथ मंदिर',
    name_ne: 'सोमनाथ मन्दिर',
    location: 'Veraval, Gujarat',
    location_hi: 'वेरावल, गुजरात',
    location_ne: 'वेरावल, गुजरात',
    description: 'The first among the twelve Aadi Jyotirlingas of India. Located on the western coast.',
    description_hi: 'भारत के बारह आदि ज्योतिर्लिंगों में से प्रथम। गुजरात के पश्चिमी तट पर स्थित।',
    description_ne: 'भारतका बाह्र आदि ज्योतिर्लिंगहरू मध्ये पहिलो। गुजरातको पश्चिमी तटमा अवस्थित छ।',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Somnath_Mandir_Veraval_03.jpg/800px-Somnath_Mandir_Veraval_03.jpg',
    coordinates: { x: 15, y: 50 },
    jyotirlinga: true,
  },
  {
    id: '2',
    name: 'Kashi Vishwanath',
    name_hi: 'काशी विश्वनाथ',
    name_ne: 'काशी विश्वनाथ',
    location: 'Varanasi, Uttar Pradesh',
    location_hi: 'वाराणसी, उत्तर प्रदेश',
    location_ne: 'वाराणसी, उत्तर प्रदेश',
    description: 'Stands on the western bank of the holy river Ganga, dedicated to Lord Shiva.',
    description_hi: 'पवित्र गंगा नदी के पश्चिमी तट पर स्थित, भगवान शिव को समर्पित।',
    description_ne: 'पवित्र गंगा नदीको पश्चिमी किनारमा अवस्थित, भगवान शिवलाई समर्पित।',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Kashi_Vishwanath_Temple_Varanasi.jpg/800px-Kashi_Vishwanath_Temple_Varanasi.jpg',
    coordinates: { x: 60, y: 40 },
    jyotirlinga: true,
  },
  {
    id: '3',
    name: 'Kedarnath',
    name_hi: 'केदारनाथ',
    name_ne: 'केदारनाथ',
    location: 'Rudraprayag, Uttarakhand',
    location_hi: 'रुद्रप्रयाग, उत्तराखंड',
    location_ne: 'रुद्रप्रयाग, उत्तराखण्ड',
    description: 'Located in the Himalayas, near the Chorabari Glacier, dedicated to Lord Shiva.',
    description_hi: 'हिमालय में स्थित, भगवान शिव को समर्पित सबसे पवित्र मंदिरों में से एक।',
    description_ne: 'हिमालयमा अवस्थित, भगवान शिवलाई समर्पित सबैभन्दा पवित्र मन्दिरहरू मध्ये एक।',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Kedarnath_Temple_Uttarakhand.jpg/800px-Kedarnath_Temple_Uttarakhand.jpg',
    coordinates: { x: 45, y: 15 },
    jyotirlinga: true,
  },
  {
    id: '4',
    name: 'Pashupatinath Temple',
    name_hi: 'पशुपतिनाथ मंदिर',
    name_ne: 'पशुपतिनाथ मन्दिर',
    location: 'Kathmandu, Nepal',
    location_hi: 'काठमांडू, नेपाल',
    location_ne: 'काठमाडौँ, नेपाल',
    description: 'One of the holiest Hindu temples dedicated to Lord Pashupatinath, located on the banks of the Bagmati River.',
    description_hi: 'बागमती नदी के तट पर स्थित भगवान पशुपतिनाथ को समर्पित सबसे पवित्र हिंदू मंदिरों में से एक।',
    description_ne: 'बागमती नदीको किनारमा अवस्थित भगवान पशुपतिनाथलाई समर्पित सबैभन्दा पवित्र हिन्दू मन्दिरहरू मध्ये एक।',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Pashupatinath_Temple_KTM_Nepal.jpg/800px-Pashupatinath_Temple_KTM_Nepal.jpg',
    coordinates: { x: 55, y: 25 }, // Approximate relative position for visual map
    jyotirlinga: false,
  }
];

export const MANTRAS: Mantra[] = [
  {
    id: '1',
    name: 'Mahamrityunjaya Mantra',
    name_hi: 'महामृत्युंजय मंत्र',
    name_ne: 'महामृत्युंजय मन्त्र',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥',
    meaning: 'We meditate on the Three-Eyed One, who permeates and nourishes all like a fragrance. May we be liberated from death for the sake of immortality, as the cucumber is severed from its bondage (to the creeper).',
    meaning_hi: 'हम त्रिनेत्रधारी (शिव) की पूजा करते हैं, जो सुगंधित हैं और जो सभी प्राणियों का पोषण करते हैं। जैसे ककड़ी अपनी बेल से पक कर अलग हो जाती है, वैसे ही हम मृत्यु के बंधनों से मुक्त हो जाएं और अमरत्व को प्राप्त करें।',
    meaning_ne: 'हामी त्रिनेत्रधारी (शिव) को पूजा गर्दछौं, जो सुगन्धित हुनुहुन्छ र जसले सबै प्राणीहरूको पोषण गर्नुहुन्छ। जसरी काँक्रो आफ्नो लहराबाट पाकेर अलग हुन्छ, त्यसरी नै हामी मृत्युको बन्धनबाट मुक्त भई अमरत्व प्राप्त गरौं।',
    audioDuration: '0:35',
    audioUrl: 'https://archive.org/download/MahamrityunjayMantra/MahamrityunjayMantra_64kb.mp3'
  },
  {
    id: '2',
    name: 'Panchakshari Mantra',
    name_hi: 'पंचाक्षरी मंत्र',
    name_ne: 'पञ्चाक्षरी मन्त्र',
    sanskrit: 'ॐ नमः शिवाय',
    meaning: 'I bow to Shiva. The five syllables Na-Ma-Shi-Va-Ya represent the five elements of earth, water, fire, air, and space.',
    meaning_hi: 'मैं शिव को नमन करता हूं। पांच अक्षर न-म-शि-वा-य पृथ्वी, जल, अग्नि, वायु और आकाश के पांच तत्वों का प्रतिनिधित्व करते हैं।',
    meaning_ne: 'म शिवलाई नमन गर्दछु। पाँच अक्षर न-म-शि-वा-य ले पृथ्वी, जल, अग्नि, वायु र आकाशका पाँच तत्वहरूलाई प्रतिनिधित्व गर्छन्।',
    audioDuration: '27:00', // Long chant usually
    audioUrl: 'https://archive.org/download/OmNamahShivaya_201608/Om%20Namah%20Shivaya_64kb.mp3'
  },
  {
    id: '3',
    name: 'Rudra Gayatri',
    name_hi: 'रुद्र गायत्री',
    name_ne: 'रुद्र गायत्री',
    sanskrit: 'ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि\nतन्नो रुद्रः प्रचोदयात्॥',
    meaning: 'Om, let us meditate on the Great God, who is the Supreme Being. May Rudra (Shiva) guide and inspire us.',
    meaning_hi: 'हम उस महापुरुष (महादेव) को जानते हैं और उन पर ध्यान करते हैं। रुद्र हमें ज्ञान और प्रेरणा प्रदान करें।',
    meaning_ne: 'हामी त्यस महापुरुष (महादेव) लाई जान्दछौं र उहाँमा ध्यान गर्छौं। रुद्रले हामीलाई ज्ञान र प्रेरणा प्रदान गरून्।',
    audioDuration: '0:45',
    audioUrl: 'https://ia801600.us.archive.org/5/items/GayatriMantra_201709/Gayatri%20Mantra.mp3' // Fallback to general Gayatri or similar if Rudra specific not found, but using placeholder for demo
  },
  {
    id: '4',
    name: 'Shiva Yajur Mantra',
    name_hi: 'शिव यजुर मंत्र',
    name_ne: 'शिव यजुर मन्त्र',
    sanskrit: 'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।\nसदा बसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
    meaning: 'I bow to the one who is as white as camphor, the incarnation of compassion, the essence of the world, who wears the king of serpents as a garland. Who always resides in the lotus of the heart, I bow to Bhava (Shiva) accompanied by Bhavani (Parvati).',
    meaning_hi: 'जो कर्पूर जैसे गौर वर्ण वाले हैं, करुणा के अवतार हैं, संसार के सार हैं और भुजंगों का हार धारण करते हैं। वे भगवान शिव माता भवानी सहित मेरे ह्रदय में सदैव निवास करें और उन्हें मेरा प्रणाम है।',
    meaning_ne: 'जो कपूर जस्तै गोरो हुनुहुन्छ, करुणाको अवतार हुनुहुन्छ, संसारको सार हुनुहुन्छ र सर्पहरूको राजालाई हारको रूपमा लगाउनुहुन्छ। जो सधैं मेरो हृदयको कमलमा बास गर्नुहुन्छ, म भव (शिव) र भवानी (पार्वती) लाई नमन गर्दछु।',
    audioDuration: '1:45',
    audioUrl: 'https://archive.org/download/KarpurGauramKarunavataram/Karpur%20Gauram%20Karunavataram_64kb.mp3'
  }
];