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

export interface BaseActivity {
  id: string;
  question: string;
  instruction?: string; // Guidance for the user
}

export interface MultipleChoiceActivity extends BaseActivity {
  type: 'multiple_choice';
  options: string[]; // Multiple choice options
  correctOptionIndex: number; // Index of the correct answer
}

export interface TranslateActivity extends BaseActivity {
  type: 'translate';
  correctAnswer: string; // Translation or text answers
}

export interface ListenSelectActivity extends BaseActivity {
  type: 'listen_select';
  audioUrl: string; // Reference to audio asset
  options: string[]; // Multiple choice options
  correctOptionIndex: number; // Index of the correct answer
}

export interface MatchPairsActivity extends BaseActivity {
  type: 'match_pairs';
  pairs: { left: string; right: string }[]; // Word match pairs
}

export interface FillBlankActivity extends BaseActivity {
  type: 'fill_blank';
  correctAnswer: string; // Translation or text answers
}

export interface SpeakActivity extends BaseActivity {
  type: 'speak';
  correctAnswer: string; // Translation or text answers
}

export interface ChatRoleplayActivity extends BaseActivity {
  type: 'chat_roleplay';
  roleplayContext: string; // AI roleplay prompt for tutor/chat lessons
}

export type Activity =
  | MultipleChoiceActivity
  | TranslateActivity
  | ListenSelectActivity
  | MatchPairsActivity
  | FillBlankActivity
  | SpeakActivity
  | ChatRoleplayActivity;

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
