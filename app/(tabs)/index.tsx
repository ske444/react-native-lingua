import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth, useUser } from "@clerk/expo";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";
import { images } from "@/constants/images";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const getGreeting = (langId: string, name: string) => {
  switch (langId) {
    case "es":
      return `Hola, ${name}! 👋`;
    case "ja":
      return `こんにちは、${name}! 👋`;
    case "fr":
      return `Bonjour, ${name}! 👋`;
    default:
      return `Hello, ${name}! 👋`;
  }
};

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { selectedLanguageId, setSelectedLanguageId } = useLanguageStore();
  const {
    xp,
    dailyGoalXp,
    dailyXp,
    dailyXpDate,
    streak,
    completedLessonIds,
    resetProgress,
    hasHydrated,
  } = useProgressStore();

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const todayStr = getTodayDateString();
  const displayDailyXp = dailyXpDate === todayStr ? dailyXp : 0;

  const selectedLanguage = languages.find((lang) => lang.id === selectedLanguageId);
  const userName = user?.firstName || "Learner";
  const greeting = selectedLanguageId 
    ? getGreeting(selectedLanguageId, userName) 
    : `Hello, ${userName}! 👋`;

  // Get active unit and lessons for the current language
  const currentUnit = selectedLanguageId
    ? units.find((u) => u.languageId === selectedLanguageId && u.order === 1)
    : units[0];

  const currentLessons = currentUnit
    ? lessons.filter((l) => l.unitId === currentUnit.id)
    : [];



  const handleClearStorage = async () => {
    try {
      await AsyncStorage.removeItem("lingua-language-storage");
      setSelectedLanguageId(null);
    } catch (error) {
      console.error("Failed to clear AsyncStorage", error);
    }
  };

  const handleResetProgress = () => {
    resetProgress();
  };

  // Extract the specific lessons for the unit (usually 3 lessons)
  const firstLesson = currentLessons[0];
  const secondLesson = currentLessons[1];

  // Check completion states
  const isFirstCompleted = firstLesson ? completedLessonIds.includes(firstLesson.id) : false;
  const isSecondCompleted = secondLesson ? completedLessonIds.includes(secondLesson.id) : false;
  
  // Dynamic words count
  const totalVocabularyCount = currentLessons.reduce(
    (acc, lesson) => acc + (lesson.vocabulary?.length || 0), 
    0
  );

  return (
    <View 
      style={[
        styles.safeContainer, 
        { paddingTop: Math.max(insets.top, 16) + 12 }
      ]}
    >
      {/* Fixed Header */}
      <View className="flex-row justify-between items-center px-6 pb-4 border-b border-neutral-border/10 bg-white">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-neutral-surface border border-neutral-border items-center justify-center shadow-sm">
            <Text className="text-2xl">{selectedLanguage?.flag || "🌐"}</Text>
          </View>
          <Text className="font-h3 text-neutral-text-primary text-[20px] font-bold">
            {greeting}
          </Text>
        </View>
        
        <View className="flex-row items-center gap-5">
          <View className="flex-row items-center">
            <Image source={images.streakFire} className="w-6 h-6" resizeMode="contain" />
            <Text className="font-h3 text-[#FF8A00] ml-1.5 font-bold">{streak}</Text>
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Daily Goal Card */}
        <View className="bg-[#FFF9F2] rounded-3xl p-5 border border-[#FFEEDB]">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="font-caption text-neutral-text-secondary font-bold uppercase tracking-wider">
                Daily goal
              </Text>
              <View className="flex-row items-baseline mt-1.5">
                <Text className="font-h1 text-neutral-text-primary text-[32px] font-bold">{displayDailyXp}</Text>
                <Text className="font-body-large text-neutral-text-secondary"> / {dailyGoalXp} XP</Text>
              </View>
            </View>
            <Image source={images.treasure} className="w-20 h-20" resizeMode="contain" />
          </View>
          {/* Progress Bar */}
          <View className="w-full h-3.5 bg-[#FFE6D1] rounded-full overflow-hidden">
            <View
              style={{ width: `${Math.min(100, (displayDailyXp / dailyGoalXp) * 100)}%` }}
              className="h-full bg-semantic-streak rounded-full"
            />
          </View>
        </View>

        {/* Continue Learning Card */}
        <View className="bg-brand-purple rounded-3xl p-5 mt-5 flex-row justify-between items-center relative overflow-hidden">
          <View className="flex-1 z-10 pr-24">
            <Text className="font-caption text-white/85 font-bold uppercase tracking-wider">
              Continue learning
            </Text>
            <Text className="font-h2 text-white text-[24px] mt-1 font-bold">
              {selectedLanguage?.name || "Language"}
            </Text>
            <Text className="font-body-small text-white/90 mt-1">
              A1 • Unit {currentUnit?.order || 1}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/learn")}
              className="bg-white py-3 px-6 rounded-2xl mt-4 self-start shadow-sm"
            >
              <Text className="font-h4 text-brand-purple font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={images.palace}
            className="absolute right-0 bottom-0 w-[150px] h-[140px]"
            resizeMode="contain"
          />
        </View>

        {/* Today's Plan Section */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4 px-1">
            <Text className="font-h3 text-neutral-text-primary text-[20px] font-bold">
              {"Today's plan"}
            </Text>
            <TouchableOpacity onPress={() => router.push("/learn")}>
              <Text className="font-h4 text-brand-purple font-bold">View all</Text>
            </TouchableOpacity>
          </View>

          {/* Item 1: Core Lesson / Vocabulary */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/learn")}
            className="flex-row items-center justify-between bg-white border border-neutral-border/50 p-4 rounded-2xl mb-3 shadow-sm"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-brand-purple rounded-2xl items-center justify-center">
                <Ionicons name="book" size={24} color="#FFFFFF" />
              </View>
              <View className="flex-1 ml-4 pr-4">
                <Text className="font-h4 text-neutral-text-primary font-bold">Lesson</Text>
                <Text 
                  className="font-body-small text-neutral-text-secondary mt-0.5"
                  numberOfLines={1}
                >
                  {firstLesson?.title || "Basic lesson"}
                </Text>
              </View>
            </View>
            <View>
              {isFirstCompleted ? (
                <Ionicons name="checkmark-circle" size={26} color="#6C4EF5" />
              ) : (
                <View className="w-6 h-6 rounded-full border-2 border-neutral-border" />
              )}
            </View>
          </TouchableOpacity>

          {/* Item 2: AI Conversation */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/chat")}
            className="flex-row items-center justify-between bg-white border border-neutral-border/50 p-4 rounded-2xl mb-3 shadow-sm"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-[#8E75FF] rounded-2xl items-center justify-center">
                <Ionicons name="headset" size={24} color="#FFFFFF" />
              </View>
              <View className="flex-1 ml-4 pr-4">
                <Text className="font-h4 text-neutral-text-primary font-bold">AI Conversation</Text>
                <Text 
                  className="font-body-small text-neutral-text-secondary mt-0.5"
                  numberOfLines={1}
                >
                  {secondLesson?.title || "Practice speaking"}
                </Text>
              </View>
            </View>
            <View>
              {isSecondCompleted ? (
                <Ionicons name="checkmark-circle" size={26} color="#6C4EF5" />
              ) : (
                <View className="w-6 h-6 rounded-full border-2 border-neutral-border" />
              )}
            </View>
          </TouchableOpacity>

          {/* Item 3: Vocabulary / New Words */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/learn")}
            className="flex-row items-center justify-between bg-white border border-neutral-border/50 p-4 rounded-2xl mb-3 shadow-sm"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-[#FF6B8B] rounded-2xl items-center justify-center">
                <MaterialCommunityIcons name="chat-processing-outline" size={24} color="#FFFFFF" />
              </View>
              <View className="flex-1 ml-4 pr-4">
                <Text className="font-h4 text-neutral-text-primary font-bold">New words</Text>
                <Text 
                  className="font-body-small text-neutral-text-secondary mt-0.5"
                  numberOfLines={1}
                >
                  {totalVocabularyCount ?? 10} words
                </Text>
              </View>
            </View>
            <View>
              <View className="w-6 h-6 rounded-full border-2 border-neutral-border" />
            </View>
          </TouchableOpacity>
        </View>



        {/* Developer settings for reset / debug */}
        <View className="mt-10 border-t border-neutral-border/50 pt-6 pb-12 gap-4">
          <Text className="font-caption text-neutral-text-secondary font-semibold text-center uppercase tracking-wider">
            Developer Settings
          </Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleClearStorage}
              className="flex-1 bg-neutral-surface border border-neutral-border py-3.5 rounded-2xl items-center"
              accessibilityRole="button"
              accessibilityLabel="Reset language selection"
            >
              <Text className="font-body-medium text-neutral-text-secondary font-semibold">Reset Language</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleResetProgress}
              className="flex-1 bg-neutral-surface border border-neutral-border py-3.5 rounded-2xl items-center"
              accessibilityRole="button"
              accessibilityLabel="Reset progress status"
            >
              <Text className="font-body-medium text-neutral-text-secondary font-semibold">Reset Progress</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => signOut()}
            className="w-full bg-[#FFEAEB] border border-[#FFD0D2] py-4 rounded-2xl items-center"
            accessibilityRole="button"
            accessibilityLabel="Sign out"
          >
            <Text className="font-h4 text-semantic-error font-bold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
});
