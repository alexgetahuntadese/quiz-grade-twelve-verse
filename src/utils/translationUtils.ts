
// Utility functions for translating question explanations to Oromo
export const translateExplanation = (explanation: string, language: 'en' | 'om'): string => {
  if (language === 'en') return explanation;
  
  // Common physics/science terms translations
  const translations: Record<string, string> = {
    // Basic terms
    'force': 'humna',
    'energy': 'anniisaa',
    'power': 'aangoo',
    'speed': 'saffisa',
    'velocity': 'saffisa kallattii',
    'acceleration': 'saffisummaa',
    'mass': 'uumama',
    'weight': 'ulfaatina',
    'distance': 'fageenya',
    'time': 'yeroo',
    'temperature': 'ho\'a',
    'pressure': 'dhiibbaa',
    'volume': 'bal\'ina',
    'density': 'yaabuudhaa',
    'gravity': 'harkisaa lafaa',
    'friction': 'wal-hantuutuu',
    'momentum': 'jijjiirannoo',
    'electric': 'elektirikii',
    'magnetic': 'maagneetii',
    'current': 'yaa\'aa',
    'voltage': 'voltaajii',
    'resistance': 'mormii',
    'circuit': 'marsaa',
    'atom': 'atoomii',
    'molecule': 'moolekyuulii',
    'element': 'miseensa',
    'compound': 'makaa',
    'reaction': 'jijjiirama',
    'solution': 'furmaata',
    'acid': 'asiidii',
    'base': 'bu\'uura',
    'cell': 'seelii',
    'tissue': 'tissuun',
    'organ': 'qaamolee',
    'system': 'sirna',
    'function': 'hojii',
    'structure': 'caasaa',
    'process': 'adeemsa',
    'method': 'mala',
    'result': 'bu\'aa',
    'equation': 'walqixxummaa',
    'formula': 'foormulaa',
    'calculation': 'herregaa',
    'measurement': 'safaruu',
    'unit': 'safartuun',
    'constant': 'dhaabbataa',
    'variable': 'jijjiiramaa',
    'graph': 'taattoo',
    'table': 'gabatee',
    'data': 'daataa',
    'information': 'odeeffannoo',
    'database': 'kuusdeetaa',
    'computer': 'kompiitarii',
    'program': 'sagantaa',
    'software': 'sooftiweerii',
    'hardware': 'haardiweerii',
    'network': 'networkii',
    'internet': 'intarneetii',
    'website': 'marsariitii',
    'democracy': 'dimokiraasii',
    'government': 'mootummaa',
    'constitution': 'seera hundeeffamaa',
    'rights': 'mirga',
    'justice': 'haqaa',
    'equality': 'walqixxummaa',
    'freedom': 'bilisummaa',
    'citizenship': 'lammummaa',
    'law': 'seera',
    'court': 'mana murtii',
    'parliament': 'paarlamaa',
    'election': 'filannoo',
    'vote': 'sagalee',
    'policy': 'imaammata',
    'society': 'hawaasa',
    'community': 'hawaasummaa',
    'culture': 'aadaa',
    'tradition': 'duudhaa',
    'history': 'seenaa',
    'ancient': 'durii',
    'modern': 'ammayyaa',
    'period': 'yeroo',
    'century': 'jaarraa',
    'year': 'waggaa',
    'month': 'ji\'a',
    'day': 'guyyaa',
    'king': 'mootii',
    'emperor': 'nigusii',
    'kingdom': 'mootummaa',
    'empire': 'empaayerii',
    'war': 'waraana',
    'peace': 'nagaa',
    'independence': 'walabummaa',
    'colonial': 'koloneeffamuu',
    'resistance': 'falmii',
    'battle': 'lolaa',
    'victory': 'mo\'annaa',
    'defeat': 'moofamuu'
  };

  // Simple word replacement (this is a basic implementation)
  let translatedText = explanation;
  
  // Replace common English words with Oromo equivalents
  Object.entries(translations).forEach(([english, oromo]) => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translatedText = translatedText.replace(regex, oromo);
  });

  // Replace common phrases
  translatedText = translatedText
    .replace(/is the/gi, 'kan')
    .replace(/are the/gi, 'kan')
    .replace(/This is/gi, 'Kun')
    .replace(/These are/gi, 'Kunneen')
    .replace(/because/gi, 'sababni isaas')
    .replace(/therefore/gi, 'kanaafuu')
    .replace(/for example/gi, 'fakkeenyaaf')
    .replace(/in other words/gi, 'jecha biraatiin')
    .replace(/means/gi, 'jechuudha')
    .replace(/refers to/gi, 'gara agarsiisa')
    .replace(/involves/gi, 'of keessatti qabata');

  return translatedText;
};

// Helper function to translate question options
export const translateOptions = (options: string[], language: 'en' | 'om'): string[] => {
  if (language === 'en') return options;
  
  // This would need more sophisticated translation logic
  // For now, return original options as proper translation requires context
  return options;
};

// Helper function to translate question text
export const translateQuestion = (question: string, language: 'en' | 'om'): string => {
  if (language === 'en') return question;
  
  // This would need more sophisticated translation logic
  // For now, return original question as proper translation requires context
  return question;
};
