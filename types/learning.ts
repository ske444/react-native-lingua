export interface Language {
  id: string; // e.g., "es", "ja"
  name: string;
  nativeName: string;
  flag: string;
}

export interface Unit {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
}

export type LessonType = 'video' | 'audio' | 'chat' | 'vocabulary' | 'grammar';

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  type: LessonType;
  xpReward: number;
  goals: string[]; // Lesson goals
  aiTeacherPrompt?: string; // Prompt for future audio-based Vision Agent lessons
  activities: Activity[];
  vocabulary: Vocabulary[];
  phrases: Phrase[];
}

export type ActivityType =
  | 'multiple_choice'
  | 'translate'
  | 'listen_select'
  | 'match_pairs'
  | 'fill_blank'
  | 'speak'
  | 'chat_roleplay';

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  instruction?: string; // Guidance for the user
  options?: string[]; // Multiple choice options
  correctOptionIndex?: number; // Index of the correct answer
  correctAnswer?: string; // Translation or text answers
  pairs?: { left: string; right: string }[]; // Word match pairs
  audioUrl?: string; // Reference to audio asset
  roleplayContext?: string; // AI roleplay prompt for tutor/chat lessons
}

export interface Vocabulary {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  partOfSpeech: string; // e.g., noun, verb, adjective, interjection
  exampleSentence: string;
  exampleTranslation: string;
}

export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  pronunciation?: string;
  context?: string; // When/how to use this phrase
  exampleUsage?: string; // Conversation snippet
}
