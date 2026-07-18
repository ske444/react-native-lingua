import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getTodayDateString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

interface ProgressState {
  xp: number;
  dailyGoalXp: number;
  dailyXp: number;
  dailyXpDate: string;
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
      xp: 15, // Seeding with 15 XP to match design mockup
      dailyGoalXp: 20,
      dailyXp: 15,
      dailyXpDate: getTodayDateString(),
      streak: 12, // Seeding with 12 days to match design mockup
      completedLessonIds: ['es-u1-l1', 'ja-u1-l1', 'fr-u1-l1'], // Seeding first lessons as completed
      hasHydrated: false,
      addXp: (amount) =>
        set((state) => {
          const todayStr = getTodayDateString();
          const isSameDay = state.dailyXpDate === todayStr;
          const newDailyXp = isSameDay ? state.dailyXp + amount : amount;
          return {
            xp: state.xp + amount,
            dailyXp: newDailyXp,
            dailyXpDate: todayStr,
          };
        }),
      completeLesson: (lessonId, xpReward) =>
        set((state) => {
          if (state.completedLessonIds.includes(lessonId)) {
            return {};
          }
          const todayStr = getTodayDateString();
          const isSameDay = state.dailyXpDate === todayStr;
          const newDailyXp = isSameDay ? state.dailyXp + xpReward : xpReward;
          return {
            completedLessonIds: [...state.completedLessonIds, lessonId],
            xp: state.xp + xpReward,
            dailyXp: newDailyXp,
            dailyXpDate: todayStr,
          };
        }),
      resetProgress: () => {
        const todayStr = getTodayDateString();
        set({
          xp: 0,
          dailyXp: 0,
          dailyXpDate: todayStr,
          streak: 0,
          completedLessonIds: [],
        });
      },
      setHasHydrated: (val) => set({ hasHydrated: val }),
    }),
    {
      name: 'lingua-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to rehydrate progress storage:', error);
        }
        if (state) {
          const todayStr = getTodayDateString();
          if (state.dailyXpDate !== todayStr) {
            state.dailyXp = 0;
            state.dailyXpDate = todayStr;
          }
          state.hasHydrated = true;
        } else {
          useProgressStore.setState({ hasHydrated: true });
        }
      },
    }
  )
);
