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
  }
];
