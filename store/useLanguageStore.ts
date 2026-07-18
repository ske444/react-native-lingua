import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageState {
  selectedLanguageId: string | null;
  hasHydrated: boolean;
  setSelectedLanguageId: (id: string | null) => void;
  setHasHydrated: (val: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null, // Start with no selected language
      hasHydrated: false,
      setSelectedLanguageId: (id: string | null) => set({ selectedLanguageId: id }),
      setHasHydrated: (val: boolean) => set({ hasHydrated: val }),
    }),
    {
      name: 'lingua-language-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
