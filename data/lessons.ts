import { Lesson } from '@/types/learning';

export const lessons: Lesson[] = [
  // ==========================================
  // SPANISH LESSONS (es-u1)
  // ==========================================
  {
    id: 'es-u1-l1',
    unitId: 'es-u1',
    title: 'Hello & Goodbye',
    description: 'Learn basic greetings and how to say farewell.',
    type: 'vocabulary',
    xpReward: 15,
    goals: [
      'Understand basic Spanish greetings',
      'Distinguish formal and informal farewells'
    ],
    aiTeacherPrompt: 'Explain the greeting "hola" and how it is used at any time of day, along with simple farewells like "adiós".',
    vocabulary: [
      {
        id: 'es-v1',
        word: 'hola',
        translation: 'hello',
        pronunciation: 'oh-lah',
        partOfSpeech: 'interjection',
        exampleSentence: '¡Hola! ¿Cómo estás?',
        exampleTranslation: 'Hello! How are you?'
      },
      {
        id: 'es-v2',
        word: 'adiós',
        translation: 'goodbye',
        pronunciation: 'ah-dyohs',
        partOfSpeech: 'interjection',
        exampleSentence: 'Adiós, nos vemos mañana.',
        exampleTranslation: 'Goodbye, see you tomorrow.'
      },
      {
        id: 'es-v3',
        word: 'buenos días',
        translation: 'good morning',
        pronunciation: 'bweh-nohs dee-ahs',
        partOfSpeech: 'phrase',
        exampleSentence: 'Buenos días, mi amigo.',
        exampleTranslation: 'Good morning, my friend.'
      }
    ],
    phrases: [
      {
        id: 'es-p1',
        phrase: '¿Cómo estás?',
        translation: 'How are you?',
        pronunciation: 'coh-moh es-tahs',
        context: 'Used casually to ask how someone is doing.',
        exampleUsage: 'A: ¡Hola! ¿Cómo estás? B: Muy bien, gracias.'
      },
      {
        id: 'es-p2',
        phrase: 'Mucho gusto',
        translation: 'Nice to meet you',
        pronunciation: 'moo-choh goos-toh',
        context: 'Used when meeting someone for the first time.',
        exampleUsage: 'A: Hola, soy Juan. B: Mucho gusto, Juan.'
      }
    ],
    activities: [
      {
        id: 'es-u1-l1-a1',
        type: 'multiple_choice',
        question: 'What is the Spanish word for "hello"?',
        instruction: 'Select the correct translation',
        options: ['Adiós', 'Gracias', 'Hola'],
        correctOptionIndex: 2
      },
      {
        id: 'es-u1-l1-a2',
        type: 'translate',
        question: 'Translate: "Adiós"',
        instruction: 'Type the English meaning',
        correctAnswer: 'goodbye'
      },
      {
        id: 'es-u1-l1-a3',
        type: 'match_pairs',
        question: 'Match the words with their meanings',
        instruction: 'Tap matching pairs',
        pairs: [
          { left: 'hola', right: 'hello' },
          { left: 'adiós', right: 'goodbye' },
          { left: 'buenos días', right: 'good morning' }
        ]
      },
      {
        id: 'es-u1-l1-a4',
        type: 'fill_blank',
        question: 'Buenos _______',
        instruction: 'Complete the morning greeting',
        correctAnswer: 'días'
      }
    ]
  },
  {
    id: 'es-u1-l2',
    unitId: 'es-u1',
    title: 'The Café Encounter',
    description: 'Practice speaking your name and asking for others in a casual setting.',
    type: 'chat',
    xpReward: 20,
    goals: [
      'Greet a server politely',
      'State your name clearly',
      'Ask for the other person\'s name'
    ],
    aiTeacherPrompt: 'Guide the student through introducing themselves in a café environment. Respond with enthusiasm and validate their attempts.',
    vocabulary: [
      {
        id: 'es-v4',
        word: 'nombre',
        translation: 'name',
        pronunciation: 'nohm-breh',
        partOfSpeech: 'noun',
        exampleSentence: 'Mi nombre es Carlos.',
        exampleTranslation: 'My name is Carlos.'
      },
      {
        id: 'es-v5',
        word: 'me llamo',
        translation: 'I am called',
        pronunciation: 'meh yah-moh',
        partOfSpeech: 'verb phrase',
        exampleSentence: 'Me llamo Sofía.',
        exampleTranslation: 'I call myself / My name is Sofia.'
      },
      {
        id: 'es-v6',
        word: 'tú',
        translation: 'you (informal)',
        pronunciation: 'too',
        partOfSpeech: 'pronoun',
        exampleSentence: '¿Y tú, cómo te llamas?',
        exampleTranslation: 'And you, what is your name?'
      }
    ],
    phrases: [
      {
        id: 'es-p3',
        phrase: '¿Cómo te llamas?',
        translation: 'What is your name?',
        pronunciation: 'coh-moh teh yah-mahs',
        context: 'Used to ask someone\'s name in a friendly, casual way.',
        exampleUsage: 'A: Hola. ¿Cómo te llamas? B: Me llamo Carlos.'
      },
      {
        id: 'es-p4',
        phrase: '¿Y tú?',
        translation: 'And you?',
        pronunciation: 'ee too',
        context: 'Used to return a question to the other person.',
        exampleUsage: 'A: Soy de España. ¿Y tú? B: Yo soy de México.'
      }
    ],
    activities: [
      {
        id: 'es-u1-l2-a1',
        type: 'chat_roleplay',
        question: 'Welcome to Madrid Café! Start a dialogue with the barista.',
        instruction: 'Introduce yourself and ask the barista\'s name',
        roleplayContext: 'The user enters a lively Spanish café. The assistant plays the role of Carlos, a friendly barista. The conversation starts with Carlos saying: "¡Hola! Bienvenidos al café. Me llamo Carlos. ¿Cómo te llamas?"'
      }
    ]
  },
  {
    id: 'es-u1-l3',
    unitId: 'es-u1',
    title: 'Speaking with Sofia',
    description: 'Listen and repeat polite expressions with your AI Teacher.',
    type: 'video',
    xpReward: 25,
    goals: [
      'Learn key polite expressions',
      'Practice repeating words to match native accent'
    ],
    aiTeacherPrompt: 'You are a friendly Spanish teacher named Sofia. Welcome the user to their first video lesson. Teach them the word "gracias" (thank you) and "de nada" (you\'re welcome). Pronounce them slowly and ask the user to repeat after you, offering warm validation.',
    vocabulary: [
      {
        id: 'es-v7',
        word: 'gracias',
        translation: 'thank you',
        pronunciation: 'grah-syahs',
        partOfSpeech: 'interjection',
        exampleSentence: 'Muchas gracias por la comida.',
        exampleTranslation: 'Thank you very much for the food.'
      },
      {
        id: 'es-v8',
        word: 'de nada',
        translation: 'you are welcome',
        pronunciation: 'deh nah-dah',
        partOfSpeech: 'phrase',
        exampleSentence: 'A: Gracias. B: De nada, amigo.',
        exampleTranslation: 'A: Thank you. B: You\'re welcome, friend.'
      },
      {
        id: 'es-v9',
        word: 'por favor',
        translation: 'please',
        pronunciation: 'pohr fah-bohr',
        partOfSpeech: 'phrase',
        exampleSentence: 'Un café, por favor.',
        exampleTranslation: 'A café, please.'
      }
    ],
    phrases: [
      {
        id: 'es-p5',
        phrase: 'Muchas gracias',
        translation: 'Thank you very much',
        pronunciation: 'moo-chas grah-syahs',
        context: 'Expressing high gratitude.',
        exampleUsage: 'A: Aquí tienes tu café. B: Muchas gracias.'
      }
    ],
    activities: [
      {
        id: 'es-u1-l3-a1',
        type: 'speak',
        question: 'Say: "Muchas gracias"',
        instruction: 'Tap the microphone and speak the Spanish phrase',
        correctAnswer: 'Muchas gracias'
      },
      {
        id: 'es-u1-l3-a2',
        type: 'multiple_choice',
        question: 'Which word means "please"?',
        instruction: 'Select the correct word',
        options: ['De nada', 'Por favor', 'Hola'],
        correctOptionIndex: 1
      }
    ]
  },

  // ==========================================
  // JAPANESE LESSONS (ja-u1)
  // ==========================================
  {
    id: 'ja-u1-l1',
    unitId: 'ja-u1',
    title: 'Greetings & Manners',
    description: 'Learn basic greetings and the fundamentals of Japanese politeness.',
    type: 'audio',
    xpReward: 15,
    goals: [
      'Identify standard Japanese greetings',
      'Understand basic pronunciation rules'
    ],
    aiTeacherPrompt: 'Introduce the standard greetings in Japan. Explain how "Konnichiwa" is used and detail the significance of bowing.',
    vocabulary: [
      {
        id: 'ja-v1',
        word: 'こんにちは',
        translation: 'hello',
        pronunciation: 'konnichiwa',
        partOfSpeech: 'interjection',
        exampleSentence: '皆さん、こんにちは。',
        exampleTranslation: 'Hello everyone.'
      },
      {
        id: 'ja-v2',
        word: 'さようなら',
        translation: 'goodbye',
        pronunciation: 'sayounara',
        partOfSpeech: 'interjection',
        exampleSentence: 'では、さようなら。',
        exampleTranslation: 'Well then, goodbye.'
      },
      {
        id: 'ja-v3',
        word: 'ありがとう',
        translation: 'thank you',
        pronunciation: 'arigatou',
        partOfSpeech: 'interjection',
        exampleSentence: '手伝ってくれてありがとう。',
        exampleTranslation: 'Thank you for helping me.'
      }
    ],
    phrases: [
      {
        id: 'ja-p1',
        phrase: 'はじめまして',
        translation: 'Nice to meet you (for the first time)',
        pronunciation: 'hajimemashite',
        context: 'Said at the very beginning of an introduction.',
        exampleUsage: 'A: はじめまして。ケンです。'
      },
      {
        id: 'ja-p2',
        phrase: 'よろしくおねがいします',
        translation: 'Please be kind to me / Pleased to meet you',
        pronunciation: 'yoroshiku onegaishimasu',
        context: 'Said at the end of an introduction to establish a good relationship.',
        exampleUsage: 'A: はじめまして、ケンです。よろしくおねがいします。'
      }
    ],
    activities: [
      {
        id: 'ja-u1-l1-a1',
        type: 'multiple_choice',
        question: 'What is the Japanese word for "hello"?',
        instruction: 'Select the correct hiragana translation',
        options: ['ありがとう', 'さようなら', 'こんにちは'],
        correctOptionIndex: 2
      },
      {
        id: 'ja-u1-l1-a2',
        type: 'translate',
        question: 'Translate to English: "さようなら"',
        instruction: 'Type the translation',
        correctAnswer: 'goodbye'
      },
      {
        id: 'ja-u1-l1-a3',
        type: 'match_pairs',
        question: 'Match the hiragana with its meaning',
        instruction: 'Tap matching pairs',
        pairs: [
          { left: 'こんにちは', right: 'hello' },
          { left: 'さようなら', right: 'goodbye' },
          { left: 'ありがとう', right: 'thank you' }
        ]
      },
      {
        id: 'ja-u1-l1-a4',
        type: 'fill_blank',
        question: 'は じ め ま し ____',
        instruction: 'Fill in the final hiragana character',
        correctAnswer: 'て'
      }
    ]
  },
  {
    id: 'ja-u1-l2',
    unitId: 'ja-u1',
    title: 'New Classmate',
    description: 'Introduce yourself and ask for your classmate\'s name.',
    type: 'chat',
    xpReward: 20,
    goals: [
      'Introduce your name politely',
      'Inquire someone else\'s name in Japanese'
    ],
    aiTeacherPrompt: 'Act as a friendly Japanese classmate. Encourage the student to use polite sentence structures (e.g. ending with "desu").',
    vocabulary: [
      {
        id: 'ja-v4',
        word: '名前',
        translation: 'name',
        pronunciation: 'namae',
        partOfSpeech: 'noun',
        exampleSentence: 'お名前は何ですか？',
        exampleTranslation: 'What is your name?'
      },
      {
        id: 'ja-v5',
        word: '私',
        translation: 'I / me',
        pronunciation: 'watashi',
        partOfSpeech: 'pronoun',
        exampleSentence: '私は学生です。',
        exampleTranslation: 'I am a student.'
      },
      {
        id: 'ja-v6',
        word: 'です',
        translation: 'am / is / are',
        pronunciation: 'desu',
        partOfSpeech: 'auxiliary verb',
        exampleSentence: 'ケンです。',
        exampleTranslation: 'I am Ken.'
      }
    ],
    phrases: [
      {
        id: 'ja-p3',
        phrase: 'お名前は何ですか？',
        translation: 'What is your name?',
        pronunciation: 'o-namae wa nan desu ka',
        context: 'Polite inquiry about someone\'s name.',
        exampleUsage: 'A: はじめまして。お名前は何ですか？'
      },
      {
        id: 'ja-p4',
        phrase: 'はじめまして、ケンです。',
        translation: 'Nice to meet you, I am Ken.',
        pronunciation: 'hajimemashite, ken desu',
        context: 'Introducing oneself politely.',
        exampleUsage: 'A: はじめまして、ケンです。よろしくお願いします。'
      }
    ],
    activities: [
      {
        id: 'ja-u1-l2-a1',
        type: 'chat_roleplay',
        question: 'Introduce yourself to Sakura, your classmate.',
        instruction: 'Say nice to meet you, state your name, and ask for Sakura\'s name.',
        roleplayContext: 'The student sits down next to a classmate. The classmate turns around and greets: "こんにちは！はじめまして、さくらです。お名前は何ですか？" The student should respond with their name.'
      }
    ]
  },
  {
    id: 'ja-u1-l3',
    unitId: 'ja-u1',
    title: 'Polite Requests with Kenji',
    description: 'Learn to use polite requests and listen to your AI teacher, Kenji.',
    type: 'video',
    xpReward: 25,
    goals: [
      'Master the versatile word "Sumimasen"',
      'Request repetition politely when you do not understand'
    ],
    aiTeacherPrompt: 'You are Kenji, a Japanese teacher. Explain how versatile "Sumimasen" is (for excuse me, sorry, or thank you). Model saying it with correct pitch accent. Ask the user to repeat, and offer feedback.',
    vocabulary: [
      {
        id: 'ja-v7',
        word: 'はい',
        translation: 'yes',
        pronunciation: 'hai',
        partOfSpeech: 'interjection',
        exampleSentence: 'はい、そうです。',
        exampleTranslation: 'Yes, that is right.'
      },
      {
        id: 'ja-v8',
        word: 'いいえ',
        translation: 'no',
        pronunciation: 'iie',
        partOfSpeech: 'interjection',
        exampleSentence: 'いいえ、違います。',
        exampleTranslation: 'No, that is incorrect.'
      },
      {
        id: 'ja-v9',
        word: 'すみません',
        translation: 'excuse me / sorry',
        pronunciation: 'sumimasen',
        partOfSpeech: 'interjection',
        exampleSentence: 'すみません、切符はどこですか？',
        exampleTranslation: 'Excuse me, where are the tickets?'
      }
    ],
    phrases: [
      {
        id: 'ja-p5',
        phrase: 'すみません、もう一度おねがいします。',
        translation: 'Excuse me, once more please.',
        pronunciation: 'sumimasen, mou ichido onegaishimasu',
        context: 'A polite way to ask someone to repeat what they said.',
        exampleUsage: 'A: 昨日のテストは難しかったですね。 B: すみません、もう一度おねがいします。'
      }
    ],
    activities: [
      {
        id: 'ja-u1-l3-a1',
        type: 'speak',
        question: 'Say: "すみません"',
        instruction: 'Tap the mic and speak clearly',
        correctAnswer: 'すみません'
      },
      {
        id: 'ja-u1-l3-a2',
        type: 'translate',
        question: 'Translate: "Excuse me, once more please."',
        instruction: 'Type in Japanese hiragana',
        correctAnswer: 'すみません、もう一度おねがいします。'
      }
    ]
  },

  // ==========================================
  // FRENCH LESSONS (fr-u1)
  // ==========================================
  {
    id: 'fr-u1-l1',
    unitId: 'fr-u1',
    title: 'Bonjour!',
    description: 'Learn common French greetings and polite interactions.',
    type: 'audio',
    xpReward: 15,
    goals: [
      'Learn standard French greetings',
      'Practice pronunciation of basic words'
    ],
    aiTeacherPrompt: 'Explain the greeting "bonjour" and when it shifts to "bonsoir". Focus on basic polite greetings.',
    vocabulary: [
      {
        id: 'fr-v1',
        word: 'bonjour',
        translation: 'hello / good morning',
        pronunciation: 'bohn-zhoor',
        partOfSpeech: 'interjection',
        exampleSentence: 'Bonjour, comment allez-vous ?',
        exampleTranslation: 'Hello, how are you?'
      },
      {
        id: 'fr-v2',
        word: 'au revoir',
        translation: 'goodbye',
        pronunciation: 'oh ruh-vwar',
        partOfSpeech: 'interjection',
        exampleSentence: 'Au revoir, bonne journée !',
        exampleTranslation: 'Goodbye, have a good day!'
      },
      {
        id: 'fr-v3',
        word: 'merci',
        translation: 'thank you',
        pronunciation: 'mair-see',
        partOfSpeech: 'interjection',
        exampleSentence: 'Merci beaucoup pour votre aide.',
        exampleTranslation: 'Thank you very much for your help.'
      }
    ],
    phrases: [
      {
        id: 'fr-p1',
        phrase: 'Comment ça va ?',
        translation: 'How is it going?',
        pronunciation: 'coh-mah sah vah',
        context: 'Informal way to ask someone how they are.',
        exampleUsage: 'A: Salut ! Comment ça va ? B: Ça va bien, merci.'
      },
      {
        id: 'fr-p2',
        phrase: 'Enchanté',
        translation: 'Nice to meet you',
        pronunciation: 'ah-shahn-tay',
        context: 'Said when meeting someone for the first time.',
        exampleUsage: 'A: Je m\'appelle Marc. B: Enchanté, Marc.'
      }
    ],
    activities: [
      {
        id: 'fr-u1-l1-a1',
        type: 'multiple_choice',
        question: 'What is the French word for "hello"?',
        instruction: 'Select the correct translation',
        options: ['Au revoir', 'Merci', 'Bonjour'],
        correctOptionIndex: 2
      },
      {
        id: 'fr-u1-l1-a2',
        type: 'translate',
        question: 'Translate: "Merci"',
        instruction: 'Type the English translation',
        correctAnswer: 'thank you'
      },
      {
        id: 'fr-u1-l1-a3',
        type: 'match_pairs',
        question: 'Match the French words with English translations',
        instruction: 'Tap matching pairs',
        pairs: [
          { left: 'bonjour', right: 'hello' },
          { left: 'au revoir', right: 'goodbye' },
          { left: 'merci', right: 'thank you' }
        ]
      }
    ]
  },
  {
    id: 'fr-u1-l2',
    unitId: 'fr-u1',
    title: 'The Bakery Chat',
    description: 'State your name and order a delicious pastry in French.',
    type: 'chat',
    xpReward: 20,
    goals: [
      'Introduce yourself politely',
      'Order a croissant at a French boulangerie'
    ],
    aiTeacherPrompt: 'Roleplay as a warm Parisian baker. Ask the client\'s name and prompt them to order a pastry politely.',
    vocabulary: [
      {
        id: 'fr-v4',
        word: 'je m\'appelle',
        translation: 'my name is / I call myself',
        pronunciation: 'zhuh mah-pel',
        partOfSpeech: 'verb phrase',
        exampleSentence: 'Je m\'appelle Sophie.',
        exampleTranslation: 'My name is Sophie.'
      },
      {
        id: 'fr-v5',
        word: 'un croissant',
        translation: 'a croissant',
        pronunciation: 'uh crwah-sahn',
        partOfSpeech: 'noun',
        exampleSentence: 'Je voudrais un croissant, s\'il vous plaît.',
        exampleTranslation: 'I would like a croissant, please.'
      },
      {
        id: 'fr-v6',
        word: 's\'il vous plaît',
        translation: 'please (formal)',
        pronunciation: 'seel voo pleh',
        partOfSpeech: 'phrase',
        exampleSentence: 'Un café, s\'il vous plaît.',
        exampleTranslation: 'A coffee, please.'
      }
    ],
    phrases: [
      {
        id: 'fr-p3',
        phrase: 'Je m\'appelle Sophie',
        translation: 'My name is Sophie',
        pronunciation: 'zhuh mah-pel soh-fee',
        context: 'Used to state your name.',
        exampleUsage: 'A: Comment t\'appelles-tu ? B: Je m\'appelle Sophie.'
      },
      {
        id: 'fr-p4',
        phrase: 'Un croissant, s\'il vous plaît.',
        translation: 'A croissant, please.',
        pronunciation: 'uh crwah-sahn seel voo pleh',
        context: 'Politely ordering a croissant.',
        exampleUsage: 'A: Bonjour, qu\'est-ce que vous voulez ? B: Un croissant, s\'il vous plaît.'
      }
    ],
    activities: [
      {
        id: 'fr-u1-l2-a1',
        type: 'chat_roleplay',
        question: 'Order a croissant from the baker.',
        instruction: 'Say hello, introduce yourself, and ask for a croissant.',
        roleplayContext: 'The user enters a traditional bakery in Paris. The baker greets: "Bonjour ! Bienvenue à la boulangerie. Je m\'appelle Pierre. Comment vous vous appelez ?" The user should introduce themselves and order a croissant.'
      }
    ]
  },
  {
    id: 'fr-u1-l3',
    unitId: 'fr-u1',
    title: 'Speaking with Marc',
    description: 'Listen and repeat common expressions with your AI Teacher, Marc.',
    type: 'video',
    xpReward: 25,
    goals: [
      'Learn informal greeting and status inquiry',
      'Practice natural spoken French flow'
    ],
    aiTeacherPrompt: 'You are Marc, a friendly French teacher from Lyon. Welcome the student. Explain that "salut" is a casual greeting used among friends. Model the greeting "Salut, ça va ?" and have them repeat it. Give helpful feedback on the accent.',
    vocabulary: [
      {
        id: 'fr-v7',
        word: 'oui',
        translation: 'yes',
        pronunciation: 'wee',
        partOfSpeech: 'interjection',
        exampleSentence: 'Oui, je comprends.',
        exampleTranslation: 'Yes, I understand.'
      },
      {
        id: 'fr-v8',
        word: 'non',
        translation: 'no',
        pronunciation: 'noh',
        partOfSpeech: 'interjection',
        exampleSentence: 'Non, ce n\'est pas correct.',
        exampleTranslation: 'No, that is not correct.'
      },
      {
        id: 'fr-v9',
        word: 'salut',
        translation: 'hi / bye (informal)',
        pronunciation: 'sah-loo',
        partOfSpeech: 'interjection',
        exampleSentence: 'Salut ! Ça va ?',
        exampleTranslation: 'Hi! How is it going?'
      }
    ],
    phrases: [
      {
        id: 'fr-p5',
        phrase: 'Salut, ça va ?',
        translation: 'Hi, how are you?',
        pronunciation: 'sah-loo sah vah',
        context: 'A highly common informal greeting.',
        exampleUsage: 'A: Salut, ça va ? B: Oui, ça va très bien, et toi ?'
      }
    ],
    activities: [
      {
        id: 'fr-u1-l3-a1',
        type: 'speak',
        question: 'Say: "Salut, ça va ?"',
        instruction: 'Tap the mic and speak the casual phrase',
        correctAnswer: 'Salut, ça va ?'
      }
    ]
  },
  // ==========================================
  // SPANISH EXTRA LESSONS
  // ==========================================
  {
    id: 'es-u1-l4',
    unitId: 'es-u1',
    title: 'Travel & Directions',
    description: 'Learn to ask for directions and navigate a city.',
    type: 'vocabulary',
    xpReward: 15,
    goals: ['Ask for directions', 'Identify key landmarks'],
    vocabulary: [
      {
        id: 'es-v10',
        word: 'dónde',
        translation: 'where',
        pronunciation: 'dohn-deh',
        partOfSpeech: 'adverb',
        exampleSentence: '¿Dónde está el baño?',
        exampleTranslation: 'Where is the bathroom?'
      },
      {
        id: 'es-v11',
        word: 'estación',
        translation: 'station',
        pronunciation: 'es-tah-syohn',
        partOfSpeech: 'noun',
        exampleSentence: 'La estación de tren está cerca.',
        exampleTranslation: 'The train station is nearby.'
      }
    ],
    phrases: [
      {
        id: 'es-p6',
        phrase: '¿Dónde está la estación?',
        translation: 'Where is the station?',
        pronunciation: 'dohn-deh es-tah lah es-tah-syohn',
        context: 'Asking for public transport locations.'
      }
    ],
    activities: [
      {
        id: 'es-u1-l4-a1',
        type: 'multiple_choice',
        question: 'What is "where" in Spanish?',
        instruction: 'Select the correct translation',
        options: ['Aquí', 'Dónde', 'Allí'],
        correctOptionIndex: 1
      }
    ]
  },
  {
    id: 'es-u1-l5',
    unitId: 'es-u1',
    title: 'Shopping time',
    description: 'Practice buying items and asking for prices.',
    type: 'chat',
    xpReward: 20,
    goals: ['Inquire about prices', 'Express buying intent'],
    vocabulary: [
      {
        id: 'es-v12',
        word: 'cuánto cuesta',
        translation: 'how much does it cost',
        pronunciation: 'kwan-toh kwes-tah',
        partOfSpeech: 'phrase',
        exampleSentence: '¿Cuánto cuesta este libro?',
        exampleTranslation: 'How much does this book cost?'
      }
    ],
    phrases: [
      {
        id: 'es-p7',
        phrase: '¿Cuánto cuesta esto?',
        translation: 'How much is this?',
        pronunciation: 'kwan-toh kwes-tah es-toh'
      }
    ],
    activities: [
      {
        id: 'es-u1-l5-a1',
        type: 'chat_roleplay',
        question: 'Talk to the vendor at the market.',
        instruction: 'Ask the price of the apples.',
        roleplayContext: 'The user is at a local market in Barcelona. The vendor greets them: "¡Hola! Buenas tardes. ¿En qué le puedo ayudar?"'
      }
    ]
  },
  {
    id: 'es-u1-l6',
    unitId: 'es-u1',
    title: 'Family & Friends',
    description: 'Describe your family members and relationships.',
    type: 'video',
    xpReward: 25,
    goals: ['Introduce family members', 'Describe characteristics'],
    vocabulary: [
      {
        id: 'es-v13',
        word: 'madre',
        translation: 'mother',
        pronunciation: 'mah-dreh',
        partOfSpeech: 'noun',
        exampleSentence: 'Mi madre es muy simpática.',
        exampleTranslation: 'My mother is very friendly.'
      },
      {
        id: 'es-v14',
        word: 'padre',
        translation: 'father',
        pronunciation: 'pah-dreh',
        partOfSpeech: 'noun',
        exampleSentence: 'Mi padre trabaja en Madrid.',
        exampleTranslation: 'My father works in Madrid.'
      }
    ],
    phrases: [
      {
        id: 'es-p8',
        phrase: 'Esta es mi familia',
        translation: 'This is my family',
        pronunciation: 'es-tah es mee fah-mee-lyah'
      }
    ],
    activities: [
      {
        id: 'es-u1-l6-a1',
        type: 'speak',
        question: 'Say: "Esta es mi familia"',
        instruction: 'Speak clearly into the microphone',
        correctAnswer: 'Esta es mi familia'
      }
    ]
  },
  {
    id: 'es-u1-l7',
    unitId: 'es-u1',
    title: 'Food & Dining',
    description: 'Order food and identify key dishes at a restaurant.',
    type: 'grammar',
    xpReward: 15,
    goals: ['Order a meal politely', 'Identify common foods'],
    vocabulary: [
      {
        id: 'es-v15',
        word: 'agua',
        translation: 'water',
        pronunciation: 'ah-gwah',
        partOfSpeech: 'noun',
        exampleSentence: 'Un vaso de agua, por favor.',
        exampleTranslation: 'A glass of water, please.'
      },
      {
        id: 'es-v16',
        word: 'comida',
        translation: 'food / meal',
        pronunciation: 'coh-mee-dah',
        partOfSpeech: 'noun',
        exampleSentence: 'La comida está deliciosa.',
        exampleTranslation: 'The food is delicious.'
      }
    ],
    phrases: [
      {
        id: 'es-p9',
        phrase: 'La cuenta, por favor.',
        translation: 'The bill, please.',
        pronunciation: 'lah kwen-tah pohr fah-bohr'
      }
    ],
    activities: [
      {
        id: 'es-u1-l7-a1',
        type: 'fill_blank',
        question: 'Un vaso de _____, por favor.',
        instruction: 'Fill in the blank with the Spanish word for water',
        correctAnswer: 'agua'
      }
    ]
  },
  {
    id: 'es-u1-l8',
    unitId: 'es-u1',
    title: 'At the Airport',
    description: 'Learn simple airport vocabulary and check-in terms.',
    type: 'audio',
    xpReward: 20,
    goals: ['Ask for your gate', 'Understand boarding prompts'],
    vocabulary: [
      {
        id: 'es-v17',
        word: 'boleto',
        translation: 'ticket',
        pronunciation: 'boh-leh-toh',
        partOfSpeech: 'noun',
        exampleSentence: 'Aquí está mi boleto de avión.',
        exampleTranslation: 'Here is my plane ticket.'
      },
      {
        id: 'es-v18',
        word: 'puerta',
        translation: 'gate',
        pronunciation: 'pwer-tah',
        partOfSpeech: 'noun',
        exampleSentence: '¿Dónde está la puerta de salida?',
        exampleTranslation: 'Where is the departure gate?'
      }
    ],
    phrases: [
      {
        id: 'es-p10',
        phrase: 'Tengo mi pasaporte.',
        translation: 'I have my passport.',
        pronunciation: 'ten-goh mee pah-sah-pohr-teh'
      }
    ],
    activities: [
      {
        id: 'es-u1-l8-a1',
        type: 'multiple_choice',
        question: 'What is the Spanish word for "gate"?',
        options: ['Puerta', 'Mesa', 'Boleto'],
        correctOptionIndex: 0
      }
    ]
  },

  // ==========================================
  // JAPANESE EXTRA LESSONS
  // ==========================================
  {
    id: 'ja-u1-l4',
    unitId: 'ja-u1',
    title: 'Travel & Directions',
    description: 'Learn to navigate public transit and ask directions.',
    type: 'vocabulary',
    xpReward: 15,
    goals: ['Ask for train stations', 'Understand simple navigation directions'],
    vocabulary: [
      {
        id: 'ja-v10',
        word: '駅',
        translation: 'station',
        pronunciation: 'eki',
        partOfSpeech: 'noun',
        exampleSentence: '駅はどこですか？',
        exampleTranslation: 'Where is the station?'
      },
      {
        id: 'ja-v11',
        word: 'ここ',
        translation: 'here',
        pronunciation: 'koko',
        partOfSpeech: 'pronoun',
        exampleSentence: 'ここは東京です。',
        exampleTranslation: 'This is Tokyo.'
      }
    ],
    phrases: [
      {
        id: 'ja-p6',
        phrase: '駅はどこですか？',
        translation: 'Where is the station?',
        pronunciation: 'eki wa doko desu ka'
      }
    ],
    activities: [
      {
        id: 'ja-u1-l4-a1',
        type: 'multiple_choice',
        question: 'What is "station" in Japanese?',
        options: ['ここ', '駅', 'そこ'],
        correctOptionIndex: 1
      }
    ]
  },
  {
    id: 'ja-u1-l5',
    unitId: 'ja-u1',
    title: 'Shopping',
    description: 'Practice buying items in a Japanese convenience store.',
    type: 'chat',
    xpReward: 20,
    goals: ['Ask for prices in Japanese', 'Request item bag/receipt'],
    vocabulary: [
      {
        id: 'ja-v12',
        word: 'いくら',
        translation: 'how much',
        pronunciation: 'ikura',
        partOfSpeech: 'adverb',
        exampleSentence: 'これはいくらですか？',
        exampleTranslation: 'How much is this?'
      }
    ],
    phrases: [
      {
        id: 'ja-p7',
        phrase: 'これはいくらですか？',
        translation: 'How much is this?',
        pronunciation: 'kore wa ikura desu ka'
      }
    ],
    activities: [
      {
        id: 'ja-u1-l5-a1',
        type: 'chat_roleplay',
        question: 'Ask the clerk for the price of green tea.',
        instruction: 'Ask how much is the item in front of you.',
        roleplayContext: 'The user enters a Lawson convenience store in Tokyo. The clerk bows and says: "いらっしゃいませ！お弁当は温めますか？"'
      }
    ]
  },
  {
    id: 'ja-u1-l6',
    unitId: 'ja-u1',
    title: 'Family & Friends',
    description: 'Describe your family members and introduce friends.',
    type: 'video',
    xpReward: 25,
    goals: ['Introduce family members', 'Use friendly greetings'],
    vocabulary: [
      {
        id: 'ja-v13',
        word: '家族',
        translation: 'family',
        pronunciation: 'kazoku',
        partOfSpeech: 'noun',
        exampleSentence: '私の家族は四人です。',
        exampleTranslation: 'My family has four people.'
      },
      {
        id: 'ja-v14',
        word: '友達',
        translation: 'friend',
        pronunciation: 'tomodachi',
        partOfSpeech: 'noun',
        exampleSentence: 'こちらは友達のケンです。',
        exampleTranslation: 'This is my friend Ken.'
      }
    ],
    phrases: [
      {
        id: 'ja-p8',
        phrase: 'こちらは友達です。',
        translation: 'This is my friend.',
        pronunciation: 'kochira wa tomodachi desu'
      }
    ],
    activities: [
      {
        id: 'ja-u1-l6-a1',
        type: 'speak',
        question: 'Say: "こちらは友達です。"',
        instruction: 'Speak the sentence clearly',
        correctAnswer: 'こちらは友達です。'
      }
    ]
  },
  {
    id: 'ja-u1-l7',
    unitId: 'ja-u1',
    title: 'Food & Dining',
    description: 'Order sushi or ramen and express dining appreciation.',
    type: 'grammar',
    xpReward: 15,
    goals: ['Order food politely', 'Express appreciation before/after meals'],
    vocabulary: [
      {
        id: 'ja-v15',
        word: '美味しい',
        translation: 'delicious',
        pronunciation: 'oishii',
        partOfSpeech: 'adjective',
        exampleSentence: 'このラーメンは美味しいです。',
        exampleTranslation: 'This ramen is delicious.'
      },
      {
        id: 'ja-v16',
        word: '水',
        translation: 'water',
        pronunciation: 'mizu',
        partOfSpeech: 'noun',
        exampleSentence: 'お水をお願いします。',
        exampleTranslation: 'Water please.'
      }
    ],
    phrases: [
      {
        id: 'ja-p9',
        phrase: 'ごちそうさまでした',
        translation: 'Thank you for the feast (after eating)',
        pronunciation: 'gochisousama deshita'
      }
    ],
    activities: [
      {
        id: 'ja-u1-l7-a1',
        type: 'fill_blank',
        question: 'お水をお____します。',
        instruction: 'Fill in the missing character for requesting water ("おねがいします")',
        correctAnswer: 'ねがい'
      }
    ]
  },
  {
    id: 'ja-u1-l8',
    unitId: 'ja-u1',
    title: 'At the Airport',
    description: 'Get through customs and locate your bags at Tokyo Haneda.',
    type: 'audio',
    xpReward: 20,
    goals: ['Answer basic border questions', 'Identify exit signs'],
    vocabulary: [
      {
        id: 'ja-v17',
        word: 'パスポート',
        translation: 'passport',
        pronunciation: 'pasupooto',
        partOfSpeech: 'noun',
        exampleSentence: 'パスポートを見せてください。',
        exampleTranslation: 'Please show me your passport.'
      },
      {
        id: 'ja-v18',
        word: '出口',
        translation: 'exit',
        pronunciation: 'deguchi',
        partOfSpeech: 'noun',
        exampleSentence: '出口はあちらです。',
        exampleTranslation: 'The exit is that way.'
      }
    ],
    phrases: [
      {
        id: 'ja-p10',
        phrase: 'パスポートです。',
        translation: 'Here is my passport.',
        pronunciation: 'pasupooto desu'
      }
    ],
    activities: [
      {
        id: 'ja-u1-l8-a1',
        type: 'multiple_choice',
        question: 'What is the Japanese word for "exit"?',
        options: ['入口', '出口', '切符'],
        correctOptionIndex: 1
      }
    ]
  },

  // ==========================================
  // FRENCH EXTRA LESSONS
  // ==========================================
  {
    id: 'fr-u1-l4',
    unitId: 'fr-u1',
    title: 'Travel & Directions',
    description: 'Navigate the metro and ask for famous landmarks.',
    type: 'vocabulary',
    xpReward: 15,
    goals: ['Ask for directions', 'Understand left/right directions'],
    vocabulary: [
      {
        id: 'fr-v10',
        word: 'où',
        translation: 'where',
        pronunciation: 'oo',
        partOfSpeech: 'adverb',
        exampleSentence: 'Où se trouve la gare ?',
        exampleTranslation: 'Where is the station?'
      },
      {
        id: 'fr-v11',
        word: 'la gare',
        translation: 'the station',
        pronunciation: 'lah gahr',
        partOfSpeech: 'noun',
        exampleSentence: 'La gare est juste là.',
        exampleTranslation: 'The station is right there.'
      }
    ],
    phrases: [
      {
        id: 'fr-p6',
        phrase: 'Où est la station de métro ?',
        translation: 'Where is the metro station?',
        pronunciation: 'oo eh lah stah-syohn duh meh-troh'
      }
    ],
    activities: [
      {
        id: 'fr-u1-l4-a1',
        type: 'multiple_choice',
        question: 'What is the French word for "where"?',
        options: ['Ici', 'Où', 'Là'],
        correctOptionIndex: 1
      }
    ]
  },
  {
    id: 'fr-u1-l5',
    unitId: 'fr-u1',
    title: 'Shopping',
    description: 'Shop for clothes and ask about sizes and prices in Euros.',
    type: 'chat',
    xpReward: 20,
    goals: ['Ask for item prices', 'Inquire about available sizes'],
    vocabulary: [
      {
        id: 'fr-v12',
        word: 'combien coûte',
        translation: 'how much does it cost',
        pronunciation: 'cohm-byah coot',
        partOfSpeech: 'phrase',
        exampleSentence: 'Combien coûte cette chemise ?',
        exampleTranslation: 'How much does this shirt cost?'
      }
    ],
    phrases: [
      {
        id: 'fr-p7',
        phrase: 'C\'est combien ?',
        translation: 'How much is it?',
        pronunciation: 'say cohm-byah'
      }
    ],
    activities: [
      {
        id: 'fr-u1-l5-a1',
        type: 'chat_roleplay',
        question: 'Talk to the clothing shop assistant.',
        instruction: 'Ask for the price of a black hat.',
        roleplayContext: 'The user enters a boutique in Le Marais, Paris. The seller smiles and greets: "Bonjour ! Est-ce que je peux vous renseigner ?" The user should ask for a price.'
      }
    ]
  },
  {
    id: 'fr-u1-l6',
    unitId: 'fr-u1',
    title: 'Family & Friends',
    description: 'Introduce your family members and describe your pets.',
    type: 'video',
    xpReward: 25,
    goals: ['Name family relations', 'Describe personality traits'],
    vocabulary: [
      {
        id: 'fr-v13',
        word: 'la mère',
        translation: 'the mother',
        pronunciation: 'lah mair',
        partOfSpeech: 'noun',
        exampleSentence: 'Ma mère s\'appelle Alice.',
        exampleTranslation: 'Ma mère s\'appelle Alice.'
      },
      {
        id: 'fr-v14',
        word: 'le père',
        translation: 'the father',
        pronunciation: 'luh pair',
        partOfSpeech: 'noun',
        exampleSentence: 'Mon père est médecin.',
        exampleTranslation: 'Mon père est médecin.'
      }
    ],
    phrases: [
      {
        id: 'fr-p8',
        phrase: 'Voici mon ami.',
        translation: 'Here is my friend.',
        pronunciation: 'vwa-see mohn ah-mee'
      }
    ],
    activities: [
      {
        id: 'fr-u1-l6-a1',
        type: 'speak',
        question: 'Say: "Voici mon ami."',
        instruction: 'Record yourself repeating the French greeting',
        correctAnswer: 'Voici mon ami.'
      }
    ]
  },
  {
    id: 'fr-u1-l7',
    unitId: 'fr-u1',
    title: 'Food & Dining',
    description: 'Order dinner and beverages at a traditional bistro.',
    type: 'grammar',
    xpReward: 15,
    goals: ['Ask for the check politely', 'Identify common beverage names'],
    vocabulary: [
      {
        id: 'fr-v15',
        word: 'l\'eau',
        translation: 'water',
        pronunciation: 'loh',
        partOfSpeech: 'noun',
        exampleSentence: 'Une bouteille d\'eau, s\'il vous plaît.',
        exampleTranslation: 'A bottle of water, please.'
      },
      {
        id: 'fr-v16',
        word: 'l\'addition',
        translation: 'the bill / check',
        pronunciation: 'lah-dee-syohn',
        partOfSpeech: 'noun',
        exampleSentence: 'L\'addition, s\'il vous plaît.',
        exampleTranslation: 'The bill, please.'
      }
    ],
    phrases: [
      {
        id: 'fr-p9',
        phrase: 'Je voudrais commander.',
        translation: 'I would like to order.',
        pronunciation: 'zhuh voo-dreh coh-mahn-day'
      }
    ],
    activities: [
      {
        id: 'fr-u1-l7-a1',
        type: 'fill_blank',
        question: 'L\'_____ s\'il vous plaît.',
        instruction: 'Fill in the blank with the French word for "the check" (addition)',
        correctAnswer: 'addition'
      }
    ]
  },
  {
    id: 'fr-u1-l8',
    unitId: 'fr-u1',
    title: 'At the Airport',
    description: 'Navigate check-in and find your boarding gate at Paris CDG.',
    type: 'audio',
    xpReward: 20,
    goals: ['Read boarding instructions', 'Locate luggage claims'],
    vocabulary: [
      {
        id: 'fr-v17',
        word: 'le passeport',
        translation: 'the passport',
        pronunciation: 'luh pahs-pohr',
        partOfSpeech: 'noun',
        exampleSentence: 'Votre passeport, s\'il vous plaît.',
        exampleTranslation: 'Your passport, please.'
      },
      {
        id: 'fr-v18',
        word: 'le vol',
        translation: 'the flight',
        pronunciation: 'luh vohl',
        partOfSpeech: 'noun',
        exampleSentence: 'Notre vol est à l\'heure.',
        exampleTranslation: 'Our flight is on time.'
      }
    ],
    phrases: [
      {
        id: 'fr-p10',
        phrase: 'Où est la porte d\'embarquement ?',
        translation: 'Where is the boarding gate?',
        pronunciation: 'oo eh lah pohrt dahm-bar-kuh-mahn'
      }
    ],
    activities: [
      {
        id: 'fr-u1-l8-a1',
        type: 'multiple_choice',
        question: 'What is the French word for "the flight"?',
        options: ['Le vol', 'Le train', 'Le billet'],
        correctOptionIndex: 0
      }
    ]
  }
];
