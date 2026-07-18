import { Unit } from '@/types/learning';

export const units: Unit[] = [
  // Spanish Units
  {
    id: 'es-u1',
    languageId: 'es',
    title: 'Basics & Greetings',
    description: 'Introduce yourself, greet people, and learn basic vocabulary.',
    order: 1,
  },
  {
    id: 'es-u2',
    languageId: 'es',
    title: 'Travel & Directions',
    description: 'Navigate new places, ask for help, and order food at a restaurant.',
    order: 2,
  },

  // Japanese Units
  {
    id: 'ja-u1',
    languageId: 'ja',
    title: 'Hiragana & Greetings',
    description: 'Master basic Japanese greetings, introductions, and essential hiragana.',
    order: 1,
  },
  {
    id: 'ja-u2',
    languageId: 'ja',
    title: 'Daily Life & Dining',
    description: 'Learn numbers, simple daily expressions, and how to order delicious food.',
    order: 2,
  },

  // French Units
  {
    id: 'fr-u1',
    languageId: 'fr',
    title: 'First Encounters',
    description: 'Learn to say hello, introduce yourself, and share where you are from.',
    order: 1,
  },
  {
    id: 'fr-u2',
    languageId: 'fr',
    title: 'At the Café',
    description: 'Politely order drinks, describe snacks, and handle simple payments.',
    order: 2,
  },
];
