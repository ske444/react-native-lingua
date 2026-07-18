import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";
import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePostHog } from "posthog-react-native";
import { Lesson } from "@/types/learning";

// Helper to map lesson ID/title to a beautiful image source
const getLessonImage = (lessonId: string, title: string): any => {
  const lowerTitle = title.toLowerCase();
  
  if (
    lowerTitle.includes("café") ||
    lowerTitle.includes("bakery") ||
    lowerTitle.includes("bistro") ||
    lessonId.endsWith("-l3") ||
    lessonId.includes("mock-l3")
  ) {
    return { uri: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80" };
  }
  if (
    lowerTitle.includes("greet") ||
    lowerTitle.includes("hello") ||
    lowerTitle.includes("bonjour") ||
    lessonId.endsWith("-l1") ||
    lessonId.includes("mock-l1")
  ) {
    return images.mascotWelcome;
  }
  if (
    lowerTitle.includes("life") ||
    lowerTitle.includes("routine") ||
    lessonId.endsWith("-l2") ||
    lessonId.includes("mock-l2")
  ) {
    return images.earth;
  }
  if (
    lowerTitle.includes("travel") ||
    lowerTitle.includes("direction") ||
    lowerTitle.includes("airport") ||
    lessonId.endsWith("-l4") ||
    lessonId.endsWith("-l8") ||
    lessonId.includes("mock-l4") ||
    lessonId.includes("mock-l8")
  ) {
    return { uri: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80" };
  }
  if (
    lowerTitle.includes("shop") ||
    lowerTitle.includes("cuesta") ||
    lessonId.endsWith("-l5") ||
    lessonId.includes("mock-l5")
  ) {
    return { uri: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80" };
  }
  if (
    lowerTitle.includes("family") ||
    lowerTitle.includes("friend") ||
    lowerTitle.includes("ami") ||
    lessonId.endsWith("-l6") ||
    lessonId.includes("mock-l6")
  ) {
    return { uri: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80" };
  }
  if (
    lowerTitle.includes("food") ||
    lowerTitle.includes("dine") ||
    lessonId.endsWith("-l7") ||
    lessonId.includes("mock-l7")
  ) {
    return { uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80" };
  }

  return images.palace;
};

// Emoji illustration mapping for the right side of the active lesson card
const getLessonEmoji = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("café") || lowerTitle.includes("bakery")) return "☕";
  if (lowerTitle.includes("greet") || lowerTitle.includes("hello")) return "👋";
  if (lowerTitle.includes("life") || lowerTitle.includes("routine")) return "🌍";
  if (lowerTitle.includes("travel") || lowerTitle.includes("direction")) return "🗺️";
  if (lowerTitle.includes("airport")) return "✈️";
  if (lowerTitle.includes("shop")) return "🛍️";
  if (lowerTitle.includes("family") || lowerTitle.includes("friend")) return "❤️";
  if (lowerTitle.includes("food") || lowerTitle.includes("dine")) return "🍣";
  return "📚";
};

// Guidebook contents for the units
const getGuidebookContent = (unitId: string) => {
  switch (unitId) {
    case "es-u1":
      return {
        title: "Basics & Greetings Guidebook",
        grammar: "In Spanish, nouns have gender. 'El' is masculine (e.g., 'el libro'), and 'la' is feminine (e.g., 'la estación'). Greetings like 'hola' can be used anytime, while 'buenos días' is morning only.",
        tips: "When greeting people in Spanish-speaking countries, a single kiss on the cheek or a friendly handshake is common."
      };
    case "ja-u1":
      return {
        title: "Hiragana & Greetings Guidebook",
        grammar: "Japanese has three writing systems: Hiragana, Katakana, and Kanji. Bowing is an essential part of Japanese manners, showing respect and politeness.",
        tips: "Adding 'desu' at the end of sentences makes them polite. For example, 'Ken desu' means 'I am Ken'."
      };
    case "fr-u1":
      return {
        title: "First Encounters Guidebook",
        grammar: "French uses 'tu' for informal situations (friends, family) and 'vous' for formal ones (strangers, superiors). 'Bonjour' is essential when entering shops.",
        tips: "The French greeting 'la bise' consists of light kisses on both cheeks, common among friends and family."
      };
    default:
      return {
        title: "Unit Guidebook",
        grammar: "Practice vocabulary daily to build long-term memory. Repeat aloud to match native pronunciation.",
        tips: "Set a daily learning goal to build a strong learning streak!"
      };
  }
};

export default function LearnScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const posthog = usePostHog();

  const { selectedLanguageId } = useLanguageStore();
  const { completedLessonIds, completeLesson } = useProgressStore();

  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [guidebookModalVisible, setGuidebookModalVisible] = useState(false);
  
  // Custom Toast for Lesson Completion Feedback
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const completedLessonIdParam = params.completedLessonId as string | undefined;
  const xpRewardParam = params.xpReward as string | undefined;
  const shownToastRef = useRef<string | null>(null);

  useEffect(() => {
    if (completedLessonIdParam && shownToastRef.current !== completedLessonIdParam) {
      shownToastRef.current = completedLessonIdParam;
      const lesson = lessons.find((l) => l.id === completedLessonIdParam);
      if (lesson) {
        setToastMessage(`Completed: ${lesson.title}! +${xpRewardParam || lesson.xpReward} XP!`);
        setSuccessToastVisible(true);
        setTimeout(() => {
          setSuccessToastVisible(false);
        }, 3500);
      }
    }
  }, [completedLessonIdParam, xpRewardParam]);

  const currentLanguage = useMemo(() => {
    return languages.find((l) => l.id === selectedLanguageId) || languages[0];
  }, [selectedLanguageId]);

  const languageUnits = useMemo(() => {
    return units.filter((u) => u.languageId === currentLanguage.id);
  }, [currentLanguage]);

  // Set default active unit
  useEffect(() => {
    if (languageUnits.length > 0 && !activeUnitId) {
      setActiveUnitId(languageUnits[0].id);
    }
  }, [languageUnits, activeUnitId]);

  // Retrieve lessons for this language, extending them if count is less than 2
  const lessonsForCurrentLanguage = useMemo(() => {
    if (!selectedLanguageId) return [];
    
    const filtered = lessons.filter((l) => {
      const unit = units.find((u) => u.id === l.unitId);
      return unit?.languageId === selectedLanguageId;
    });

    // If selected language has fewer than 2 lessons in total, return a fully loaded mock set
    if (filtered.length < 2) {
      const mockUnitId = languageUnits[0]?.id || `${selectedLanguageId}-u1`;
      return [
        {
          id: `${selectedLanguageId}-mock-l1`,
          unitId: mockUnitId,
          title: "Greetings & Introductions",
          description: "Learn to introduce yourself and say hello.",
          type: "vocabulary",
          xpReward: 15,
          goals: ["Introduce your name", "Greet friends and teachers"],
          vocabulary: [
            { id: "mock-v1", word: "Hello", translation: "Primary greeting", pronunciation: "hel-lo", partOfSpeech: "phrase", exampleSentence: "Hello, my friend!", exampleTranslation: "¡Hola, mi amigo!" }
          ],
          phrases: [],
          activities: []
        },
        {
          id: `${selectedLanguageId}-mock-l2`,
          unitId: mockUnitId,
          title: "Daily Life",
          description: "Talk about daily habits and items.",
          type: "audio",
          xpReward: 15,
          goals: ["Name daily routines", "Identify common objects"],
          vocabulary: [],
          phrases: [],
          activities: []
        },
        {
          id: `${selectedLanguageId}-mock-l3`,
          unitId: mockUnitId,
          title: "At the Café",
          description: "Order drinks and snacks.",
          type: "chat",
          xpReward: 20,
          goals: ["Order coffee", "Ask for the bill"],
          vocabulary: [],
          phrases: [],
          activities: []
        },
        {
          id: `${selectedLanguageId}-mock-l4`,
          unitId: mockUnitId,
          title: "Travel & Directions",
          description: "Ask for directions and locate landmarks.",
          type: "vocabulary",
          xpReward: 15,
          goals: ["Ask 'Where is...'", "Identify train station"],
          vocabulary: [],
          phrases: [],
          activities: []
        },
        {
          id: `${selectedLanguageId}-mock-l5`,
          unitId: mockUnitId,
          title: "Shopping Basics",
          description: "Inquire about prices and buy clothes.",
          type: "chat",
          xpReward: 20,
          goals: ["Ask 'How much is this?'", "Understand prices"],
          vocabulary: [],
          phrases: [],
          activities: []
        },
        {
          id: `${selectedLanguageId}-mock-l6`,
          unitId: mockUnitId,
          title: "Family & Friends",
          description: "Describe family and friends.",
          type: "video",
          xpReward: 25,
          goals: ["Introduce family members", "Use friendly adjectives"],
          vocabulary: [],
          phrases: [],
          activities: []
        }
      ] as Lesson[];
    }
    return filtered;
  }, [selectedLanguageId, languageUnits]);

  // Lessons inside the currently active Unit
  const lessonsInActiveUnit = useMemo(() => {
    if (!activeUnitId) return [];
    return lessonsForCurrentLanguage.filter((l) => l.unitId === activeUnitId);
  }, [lessonsForCurrentLanguage, activeUnitId]);

  // Final lessons data, enforcing that if a selected unit has fewer than 2 lessons, we extend it dynamically
  const finalLessons = useMemo(() => {
    if (lessonsInActiveUnit.length >= 2) return lessonsInActiveUnit;

    const mockUnitId = activeUnitId || `${selectedLanguageId}-u1`;
    const unit = units.find((u) => u.id === mockUnitId);
    const unitTitle = unit?.title || "Basics";

    return [
      {
        id: `${mockUnitId}-mock-l1`,
        unitId: mockUnitId,
        title: `Greetings in ${unitTitle}`,
        description: `Learn standard expressions for ${unitTitle}.`,
        type: "vocabulary" as const,
        xpReward: 15,
        goals: ["Introduce yourself", "Greet others politely"],
        vocabulary: [
          { id: "v1", word: "Welcome", translation: "Greeting", pronunciation: "wel-cum", partOfSpeech: "interjection", exampleSentence: "Welcome!", exampleTranslation: "¡Bienvenido!" }
        ],
        phrases: [],
        activities: []
      },
      {
        id: `${mockUnitId}-mock-l2`,
        unitId: mockUnitId,
        title: `Daily Life & Routine`,
        description: `Talk about daily activities related to ${unitTitle}.`,
        type: "audio" as const,
        xpReward: 15,
        goals: ["Identify common tasks", "Use daily time verbs"],
        vocabulary: [],
        phrases: [],
        activities: []
      },
      {
        id: `${mockUnitId}-mock-l3`,
        unitId: mockUnitId,
        title: `Dialogue Practice`,
        description: `Practice chatting about ${unitTitle}.`,
        type: "chat" as const,
        xpReward: 20,
        goals: ["Hold a simple dialogue", "Respond to prompts"],
        vocabulary: [],
        phrases: [],
        activities: []
      },
      {
        id: `${mockUnitId}-mock-l4`,
        unitId: mockUnitId,
        title: `Travel & Landmark Basics`,
        description: `Learn how to navigate locations in ${unitTitle}.`,
        type: "vocabulary" as const,
        xpReward: 15,
        goals: ["Ask for directions", "Name major landmarks"],
        vocabulary: [],
        phrases: [],
        activities: []
      },
      {
        id: `${mockUnitId}-mock-l5`,
        unitId: mockUnitId,
        title: `Boutique & Shopping`,
        description: `Practice buying things in ${unitTitle}.`,
        type: "chat" as const,
        xpReward: 20,
        goals: ["Ask for prices", "Complete a transaction"],
        vocabulary: [],
        phrases: [],
        activities: []
      },
      {
        id: `${mockUnitId}-mock-l6`,
        unitId: mockUnitId,
        title: `Speaking Session`,
        description: `Learn to talk about your favorite parts of ${unitTitle}.`,
        type: "video" as const,
        xpReward: 25,
        goals: ["Practice pronunciation", "Listen to expert tips"],
        vocabulary: [],
        phrases: [],
        activities: []
      }
    ];
  }, [lessonsInActiveUnit, activeUnitId, selectedLanguageId]);

  // Set default selected lesson
  useEffect(() => {
    if (finalLessons.length > 0) {
      const exists = finalLessons.some((l) => l.id === selectedLessonId);
      if (!exists) {
        const firstUncompleted = finalLessons.find((l) => !completedLessonIds.includes(l.id));
        setSelectedLessonId(firstUncompleted?.id || finalLessons[0].id);
      }
    }
  }, [finalLessons, completedLessonIds, selectedLessonId]);

  const activeUnit = useMemo(() => {
    return units.find((u) => u.id === activeUnitId) || languageUnits[0];
  }, [activeUnitId, languageUnits]);

  const selectedLesson = useMemo(() => {
    return finalLessons.find((l) => l.id === selectedLessonId) || finalLessons[0];
  }, [finalLessons, selectedLessonId]);

  const heroImage = useMemo(() => {
    if (!selectedLesson) return images.palace;
    return getLessonImage(selectedLesson.id, selectedLesson.title);
  }, [selectedLesson]);

  // Dynamic progress calculator
  const completedCount = useMemo(() => {
    return finalLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  }, [finalLessons, completedLessonIds]);

  const totalCount = finalLessons.length;

  const handleBack = () => {
    posthog.capture("learn_back_button_pressed");
    router.replace("/(tabs)");
  };



  const handleOpenLesson = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
    setDetailModalVisible(true);
    posthog.capture("lesson_details_opened", {
      lesson_id: lesson.id,
    });
  };

  const handleCompleteLessonAction = () => {
    if (!selectedLesson) return;
    
    setDetailModalVisible(false);
    
    posthog.capture("lesson_started", {
      lesson_id: selectedLesson.id,
      type: selectedLesson.type,
    });

    router.push({
      pathname: "/(tabs)/ai-teacher",
      params: { lessonId: selectedLesson.id }
    });
  };

  if (!selectedLanguageId || !activeUnit) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  const guidebook = getGuidebookContent(activeUnit.id);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      {/* 1. Header Navigation Area */}
      <View className="flex-row items-center justify-between px-6 pb-3 bg-white">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-full bg-neutral-surface border border-neutral-border/60 shadow-sm mr-4"
          >
            <Ionicons name="chevron-back" size={24} color="#0D132B" />
          </TouchableOpacity>

          <View className="flex-1 pr-4">
            <Text className="font-h3 text-neutral-text-primary leading-tight font-bold" numberOfLines={1}>
              {activeUnit.title}
            </Text>
            <Text className="font-body-small text-neutral-text-secondary mt-0.5">
              Unit {activeUnit.order} • {completedCount} / {totalCount} lessons
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setGuidebookModalVisible(true)}
          activeOpacity={0.7}
          className="w-10 h-10 items-center justify-center rounded-xl bg-orange-50 border border-orange-200 shadow-sm"
        >
          <Ionicons name="bookmark" size={20} color="#FF8A00" />
        </TouchableOpacity>
      </View>

      {/* 2. Unit Selector Pills (Scrollable) */}
      {languageUnits.length > 1 && (
        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
          >
            {languageUnits.map((u) => {
              const isSelected = activeUnitId === u.id;
              return (
                <TouchableOpacity
                  key={u.id}
                  onPress={() => setActiveUnitId(u.id)}
                  activeOpacity={0.8}
                  className={`px-4 py-2.5 rounded-full border ${
                    isSelected
                      ? "bg-brand-purple border-brand-purple shadow-sm"
                      : "bg-neutral-surface border-neutral-border/60"
                  }`}
                >
                  <Text
                    className={`font-body-medium font-bold ${
                      isSelected ? "text-white" : "text-neutral-text-secondary"
                    }`}
                  >
                    {u.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* 3. Tab Bar (Lessons / Practice) */}
      <View className="flex-row bg-neutral-surface rounded-2xl p-1.5 mb-5 mx-6 border border-neutral-border/50">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setActiveTab("lessons")}
          className={`flex-1 py-3 rounded-xl items-center justify-center ${
            activeTab === "lessons" ? "bg-white shadow-sm border border-neutral-border/10" : ""
          }`}
        >
          <Text
            className={`font-h4 font-bold ${
              activeTab === "lessons" ? "text-brand-purple" : "text-neutral-text-secondary"
            }`}
          >
            Lessons
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setActiveTab("practice")}
          className={`flex-1 py-3 rounded-xl items-center justify-center ${
            activeTab === "practice" ? "bg-white shadow-sm border border-neutral-border/10" : ""
          }`}
        >
          <Text
            className={`font-h4 font-bold ${
              activeTab === "practice" ? "text-brand-purple" : "text-neutral-text-secondary"
            }`}
          >
            Practice
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {activeTab === "lessons" ? (
          <>
            {/* 4. Hero Banner Illustration */}
            <View className="px-6 mb-6">
              <View className="w-full h-52 rounded-3xl overflow-hidden shadow-md bg-neutral-surface border border-neutral-border/40 relative">
                {heroImage && typeof heroImage === "object" && "uri" in heroImage ? (
                  <Image source={{ uri: (heroImage as any).uri }} className="w-full h-full" resizeMode="cover" />
                ) : (
                  <Image source={heroImage} className="w-full h-full" resizeMode="cover" />
                )}
                {/* Floating Selected Lesson Badge overlay */}
                {selectedLesson && (
                  <View className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-2xl border border-neutral-border/30">
                    <Text className="font-caption text-neutral-text-primary uppercase tracking-wider font-bold">
                      {selectedLesson.type} lesson
                    </Text>
                    <Text className="font-body-small font-bold text-neutral-text-primary leading-tight mt-0.5">
                      {selectedLesson.title}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* 5. Lessons Cards List */}
            <View className="px-6 gap-4">
              {finalLessons.map((lesson, idx) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isSelected = selectedLessonId === lesson.id;
                const indexNum = idx + 1;

                // Completed state
                if (isCompleted) {
                  return (
                    <TouchableOpacity
                      key={lesson.id}
                      activeOpacity={0.8}
                      onPress={() => handleOpenLesson(lesson)}
                      className={`flex-row items-center justify-between bg-white border border-neutral-border/60 p-5 rounded-2xl shadow-sm ${
                        isSelected ? "border-brand-purple border-2" : ""
                      }`}
                    >
                      <View className="flex-1 pr-4">
                        <Text className="font-caption text-neutral-text-secondary font-semibold uppercase tracking-wider">
                          Lesson {indexNum}
                        </Text>
                        <Text className="font-h4 text-neutral-text-primary font-bold mt-1">
                          {lesson.title}
                        </Text>
                      </View>
                      <Ionicons name="checkmark-circle" size={26} color="#21C16B" />
                    </TouchableOpacity>
                  );
                }

                // In-Progress / Highlighted state
                if (isSelected) {
                  return (
                    <TouchableOpacity
                      key={lesson.id}
                      activeOpacity={0.9}
                      onPress={() => handleOpenLesson(lesson)}
                      className="flex-row items-center justify-between bg-[#FAF9FF] border-2 border-brand-purple p-5 rounded-2xl shadow-sm"
                    >
                      <View className="flex-1 pr-4">
                        <Text className="font-caption text-brand-purple font-bold uppercase tracking-wider">
                          Lesson {indexNum}
                        </Text>
                        <Text className="font-h4 text-neutral-text-primary font-bold mt-1">
                          {lesson.title}
                        </Text>
                        <Text className="font-body-small text-brand-purple font-semibold mt-1">
                          In progress
                        </Text>
                      </View>
                      
                      {/* Colorful circle containing custom emoji for lesson illustration */}
                      <View className="w-12 h-12 bg-violet-100 rounded-full border border-violet-200 items-center justify-center">
                        <Text className="text-2xl">{getLessonEmoji(lesson.title)}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }

                // Locked state (But interactive to allow opening any lesson)
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    activeOpacity={0.8}
                    onPress={() => handleOpenLesson(lesson)}
                    className="flex-row items-center justify-between bg-white border border-neutral-border/40 p-5 rounded-2xl opacity-80"
                  >
                    <View className="flex-1 pr-4">
                      <Text className="font-caption text-neutral-text-secondary/70 font-semibold uppercase tracking-wider">
                        Lesson {indexNum}
                      </Text>
                      <Text className="font-h4 text-neutral-text-secondary/80 font-bold mt-1">
                        {lesson.title}
                      </Text>
                      <Text className="font-caption text-neutral-text-secondary/60 mt-1">
                        {lesson.xpReward} XP reward
                      </Text>
                    </View>
                    <Ionicons name="lock-closed-outline" size={22} color="#9CA3AF" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : (
          /* 6. Practice Tab content */
          <View className="px-6 gap-5">
            <View className="bg-brand-purple/5 border border-brand-purple/20 p-5 rounded-3xl mb-2">
              <Text className="font-h3 text-brand-purple font-bold">Daily Practice Hub</Text>
              <Text className="font-body-small text-neutral-text-secondary mt-1">
                Strengthen your language skills and earn extra XP by reviewing units you have previously unlocked.
              </Text>
            </View>

            {/* Vocabulary Review */}
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-between bg-white border border-neutral-border/50 p-5 rounded-2xl shadow-sm"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-orange-50 border border-orange-200 rounded-2xl items-center justify-center">
                  <Ionicons name="text" size={24} color="#FF8A00" />
                </View>
                <View className="flex-1 ml-4 pr-2">
                  <Text className="font-h4 text-neutral-text-primary font-bold">Vocabulary review</Text>
                  <Text className="font-body-small text-neutral-text-secondary mt-0.5">
                    Review words from this unit
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Listening Practice */}
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-between bg-white border border-neutral-border/50 p-5 rounded-2xl shadow-sm"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-2xl items-center justify-center">
                  <Ionicons name="headset" size={24} color="#4D8BFF" />
                </View>
                <View className="flex-1 ml-4 pr-2">
                  <Text className="font-h4 text-neutral-text-primary font-bold">Listening lab</Text>
                  <Text className="font-body-small text-neutral-text-secondary mt-0.5">
                    Strengthen audio recognition
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* AI Teacher Video */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/ai-teacher")}
              className="flex-row items-center justify-between bg-white border border-neutral-border/50 p-5 rounded-2xl shadow-sm"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-violet-50 border border-violet-200 rounded-2xl items-center justify-center">
                  <Ionicons name="videocam" size={24} color="#6C4EF5" />
                </View>
                <View className="flex-1 ml-4 pr-2">
                  <Text className="font-h4 text-neutral-text-primary font-bold">AI Teacher lesson</Text>
                  <Text className="font-body-small text-neutral-text-secondary mt-0.5">
                    Practice with your AI Video Instructor
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Speak & Chat Practice */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/chat")}
              className="flex-row items-center justify-between bg-white border border-neutral-border/50 p-5 rounded-2xl shadow-sm"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-2xl items-center justify-center">
                  <Ionicons name="chatbubbles" size={24} color="#21C16B" />
                </View>
                <View className="flex-1 ml-4 pr-2">
                  <Text className="font-h4 text-neutral-text-primary font-bold">AI Chat roleplay</Text>
                  <Text className="font-body-small text-neutral-text-secondary mt-0.5">
                    Casual conversation session
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Guidebook Modal */}
      <Modal
        visible={guidebookModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setGuidebookModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View className="flex-row justify-between items-center mb-6">
              <Text className="font-h2 text-neutral-text-primary font-bold">{guidebook.title}</Text>
              <TouchableOpacity
                onPress={() => setGuidebookModalVisible(false)}
                className="w-8 h-8 rounded-full bg-neutral-surface items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#0D132B" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-6">
                <Text className="font-caption text-brand-purple font-bold uppercase tracking-wider">Grammar Notes</Text>
                <Text className="font-body-medium text-neutral-text-primary mt-2 leading-relaxed">
                  {guidebook.grammar}
                </Text>
              </View>

              <View className="mb-4">
                <Text className="font-caption text-orange-500 font-bold uppercase tracking-wider">Cultural Tips</Text>
                <Text className="font-body-medium text-neutral-text-primary mt-2 leading-relaxed">
                  {guidebook.tips}
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={() => setGuidebookModalVisible(false)}
              className="bg-brand-purple py-4 rounded-2xl items-center mt-6 shadow-sm"
            >
              <Text className="font-h4 text-white font-bold">Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lesson Details Modal */}
      {selectedLesson && (
        <Modal
          visible={detailModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setDetailModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Modal header */}
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="font-caption text-brand-purple font-bold uppercase tracking-wider">
                    {selectedLesson.type} Lesson • {selectedLesson.xpReward} XP
                  </Text>
                  <Text className="font-h2 text-neutral-text-primary font-bold mt-1">
                    {selectedLesson.title}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setDetailModalVisible(false)}
                  className="w-8 h-8 rounded-full bg-neutral-surface items-center justify-center"
                >
                  <Ionicons name="close" size={20} color="#0D132B" />
                </TouchableOpacity>
              </View>

              <Text className="font-body-large text-neutral-text-secondary mb-6 leading-relaxed">
                {selectedLesson.description}
              </Text>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Lesson Goals section */}
                {selectedLesson.goals && selectedLesson.goals.length > 0 && (
                  <View className="mb-6">
                    <Text className="font-h4 text-neutral-text-primary font-bold mb-3">Lesson Goals</Text>
                    {selectedLesson.goals.map((g, index) => (
                      <View key={index} className="flex-row items-start mb-2 pr-2">
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={18}
                          color="#6C4EF5"
                          style={{ marginTop: 2, marginRight: 8 }}
                        />
                        <Text className="font-body-medium text-neutral-text-primary flex-1">{g}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Key Vocabulary section */}
                {selectedLesson.vocabulary && selectedLesson.vocabulary.length > 0 && (
                  <View className="mb-4">
                    <Text className="font-h4 text-neutral-text-primary font-bold mb-3">Key Vocabulary</Text>
                    <View className="gap-2">
                      {selectedLesson.vocabulary.map((vocab) => (
                        <View
                          key={vocab.id}
                          className="flex-row justify-between items-center bg-neutral-surface px-4 py-3.5 rounded-xl border border-neutral-border/30"
                        >
                          <View className="flex-1 pr-3">
                            <Text className="font-body-medium text-neutral-text-primary font-semibold">
                              {vocab.word}
                            </Text>
                            <Text className="font-caption text-neutral-text-secondary mt-0.5">
                              ({vocab.pronunciation}) • {vocab.partOfSpeech}
                            </Text>
                          </View>
                          <Text className="font-body-medium text-brand-purple font-bold">
                            {vocab.translation}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </ScrollView>

              {/* Start/Complete action button */}
              <TouchableOpacity
                onPress={handleCompleteLessonAction}
                activeOpacity={0.9}
                className="bg-brand-purple py-4.5 rounded-2xl items-center mt-6 shadow-md"
              >
                <Text className="font-h4 text-white font-bold">Start Lesson</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Floating Success Feedback Toast */}
      {successToastVisible && (
        <View style={styles.toastContainer} className="bg-brand-purple px-6 py-4 rounded-2xl shadow-lg border border-violet-400">
          <View className="flex-row items-center">
            <Ionicons name="trophy" size={24} color="#FFC800" style={{ marginRight: 10 }} />
            <Text className="font-body-medium font-bold text-white flex-1">{toastMessage}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(13, 19, 43, 0.45)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
    maxHeight: "85%",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 24,
  },
  toastContainer: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    elevation: 10,
  },
});
