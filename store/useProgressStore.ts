import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressState {
  xp: number;
  dailyGoalXp: number;
  streak: number;
  completedLessonIds: string[];
  hasHydrated: boolean;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  resetProgress: () => void;
  setHasHydrated: (val: boolean) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      xp: 15, // Seeding with 15 XP to match design mockup: "15 / 20 XP"
      dailyGoalXp: 20,
      streak: 12, // Seeding with 12 days to match design mockup
      completedLessonIds: ['es-u1-l1', 'ja-u1-l1', 'fr-u1-l1'], // Seeding first lessons as completed
      hasHydrated: false,
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      completeLesson: (lessonId, xpReward) =>
        set((state) => {
          if (state.completedLessonIds.includes(lessonId)) {
            return {};
          }
          return {
            completedLessonIds: [...state.completedLessonIds, lessonId],
            xp: state.xp + xpReward,
          };
        }),
      resetProgress: () =>
        set({
          xp: 15,
          dailyGoalXp: 20,
          streak: 12,
          completedLessonIds: ['es-u1-l1', 'ja-u1-l1', 'fr-u1-l1'],
        }),
      setHasHydrated: (val) => set({ hasHydrated: val }),
    }),
    {
      name: 'lingua-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
