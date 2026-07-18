import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageState {
  selectedLanguageId: string;
  setSelectedLanguageId: (id: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: 'es', // Default to Spanish (Mockup selected language)
      setSelectedLanguageId: (id: string) => set({ selectedLanguageId: id }),
    }),
    {
      name: 'lingua-language-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
