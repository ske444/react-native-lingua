import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import { lessons } from "@/data/lessons";
import { languages } from "@/data/languages";
import { images } from "@/constants/images";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePostHog } from "posthog-react-native";
import { useUser } from "@clerk/expo";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  runOnJS,
} from "react-native-reanimated";

export default function AITeacherScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const posthog = usePostHog();
  const { user } = useUser();

  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();
  const { selectedLanguageId } = useLanguageStore();
  const { streak, completeLesson } = useProgressStore();

  // Find the selected lesson or fallback to first lesson of selected language
  const lesson = useMemo(() => {
    if (lessonId) {
      return lessons.find((l) => l.id === lessonId);
    }
    if (selectedLanguageId) {
      return lessons.find((l) => l.id.startsWith(selectedLanguageId)) || lessons[0];
    }
    return lessons[0];
  }, [lessonId, selectedLanguageId]);

  const currentLanguage = useMemo(() => {
    if (!lesson) return languages[0];
    const langId = lesson.id.split("-")[0];
    return languages.find((l) => l.id === langId) || languages[0];
  }, [lesson]);

  // Ensure we always have phrases to practice
  const lessonPhrases = useMemo(() => {
    if (lesson?.phrases && lesson.phrases.length > 0) {
      return lesson.phrases;
    }
    // Universal Fallback phrases
    return [
      {
        id: "fb-1",
        phrase: "Hola, ¿cómo estás?",
        translation: "Hello, how are you?",
        pronunciation: "oh-lah coh-moh es-tahs",
      },
      {
        id: "fb-2",
        phrase: "Mucho gusto en conocerte.",
        translation: "Nice to meet you.",
        pronunciation: "moo-choh goos-toh en coh-noh-sehr-teh",
      },
      {
        id: "fb-3",
        phrase: "Gracias por tu ayuda.",
        translation: "Thank you for your help.",
        pronunciation: "grah-syahs pohr too ah-yoo-dah",
      }
    ];
  }, [lesson]);

  // State Variables
  const [status, setStatus] = useState<"connecting" | "online">("connecting");
  const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isFoxSpeaking, setIsFoxSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);

  // Stats Evaluation
  const [evaluation, setEvaluation] = useState({
    speaking: "Excellent",
    pronunciation: "Great",
    grammar: "Good",
  });

  // End Call & Feedback modal state
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedbackNotes, setFeedbackNotes] = useState("");

  const isCompleted = currentPhraseIndex >= lessonPhrases.length;
  const currentPhrase = isCompleted ? null : lessonPhrases[currentPhraseIndex];

  // Reanimated values for animations
  const speakerScale = useSharedValue(1);
  const wave1 = useSharedValue(1);
  const wave2 = useSharedValue(1);
  const wave3 = useSharedValue(1);
  const wave4 = useSharedValue(1);

  // Handle speaker pulsing animation
  const triggerTeacherGreeting = useCallback(() => {
    setIsFoxSpeaking(true);
    speakerScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 250, easing: Easing.ease }),
        withTiming(1.0, { duration: 250, easing: Easing.ease })
      ),
      6, // Repeat 6 times (~3 seconds)
      true,
      () => {
        runOnJS(setIsFoxSpeaking)(false);
      }
    );
  }, [speakerScale]);

  // Simulate Connection on mount
  useEffect(() => {
    setStatus("connecting");
    const connectTimer = setTimeout(() => {
      setStatus("online");
      triggerTeacherGreeting();
    }, 1500);

    return () => clearTimeout(connectTimer);
  }, [lessonId, triggerTeacherGreeting]);

  // User speaking wave animation loop
  useEffect(() => {
    if (isUserSpeaking) {
      wave1.value = withRepeat(withSequence(withTiming(2.6, { duration: 300 }), withTiming(1, { duration: 300 })), -1, true);
      wave2.value = withRepeat(withSequence(withTiming(1.8, { duration: 400 }), withTiming(1, { duration: 400 })), -1, true);
      wave3.value = withRepeat(withSequence(withTiming(2.3, { duration: 350 }), withTiming(1, { duration: 350 })), -1, true);
      wave4.value = withRepeat(withSequence(withTiming(1.5, { duration: 450 }), withTiming(1, { duration: 450 })), -1, true);
    } else {
      wave1.value = withTiming(1);
      wave2.value = withTiming(1);
      wave3.value = withTiming(1);
      wave4.value = withTiming(1);
    }
  }, [isUserSpeaking, wave1, wave2, wave3, wave4]);

  const handleSpeakerPress = () => {
    if (isFoxSpeaking || isCompleted) return;
    posthog.capture("ai_teacher_speaker_tapped", { phrase_id: currentPhrase?.id ?? "" });
    triggerTeacherGreeting();
  };

  const handleMicPress = () => {
    if (isCompleted || isFoxSpeaking) return;

    if (isUserSpeaking) {
      // Stop speaking, simulate evaluation update and advance
      setIsUserSpeaking(false);
      
      // Update statistics mock evaluation randomly to keep screen alive
      const speakScores = ["Excellent", "Great", "Good"];
      const pronScores = ["Excellent", "Great", "Good", "Needs work"];
      const gramScores = ["Excellent", "Great", "Good"];

      setEvaluation({
        speaking: speakScores[Math.floor(Math.random() * speakScores.length)],
        pronunciation: pronScores[Math.floor(Math.random() * pronScores.length)],
        grammar: gramScores[Math.floor(Math.random() * gramScores.length)],
      });

      // Move to next phrase after a brief delay
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => prev + 1);
        setIsFoxSpeaking(true);
        // Play next prompt animation
        speakerScale.value = withRepeat(
          withSequence(
            withTiming(1.2, { duration: 250, easing: Easing.ease }),
            withTiming(1.0, { duration: 250, easing: Easing.ease })
          ),
          4,
          true,
          () => {
            runOnJS(setIsFoxSpeaking)(false);
          }
        );
      }, 800);
    } else {
      setIsUserSpeaking(true);
      posthog.capture("ai_teacher_speaking_simulated");
    }
  };

  const handleEndCall = () => {
    posthog.capture("ai_teacher_session_ended_clicked");
    setFeedbackModalVisible(true);
  };

  const handleFeedbackSubmit = () => {
    if (!lesson) return;

    // Complete the lesson and reward XP
    completeLesson(lesson.id, lesson.xpReward);

    posthog.capture("ai_teacher_feedback_submitted", {
      lesson_id: lesson.id,
      rating,
      tags: selectedTags,
      notes_length: feedbackNotes.length,
    });

    setFeedbackModalVisible(false);

    // Redirect to Learn screen with success parameters to trigger toast
    router.replace({
      pathname: "/(tabs)/learn",
      params: {
        completedLessonId: lesson.id,
        xpReward: lesson.xpReward,
      },
    });
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Animated styles
  const animatedSpeakerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: speakerScale.value }],
    };
  });

  const animatedWave1 = useAnimatedStyle(() => ({ transform: [{ scaleY: wave1.value }] }));
  const animatedWave2 = useAnimatedStyle(() => ({ transform: [{ scaleY: wave2.value }] }));
  const animatedWave3 = useAnimatedStyle(() => ({ transform: [{ scaleY: wave3.value }] }));
  const animatedWave4 = useAnimatedStyle(() => ({ transform: [{ scaleY: wave4.value }] }));

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) }]}>
      {/* 1. Header Row */}
      <View className="flex-row items-center justify-between px-6 pb-3 bg-white border-b border-neutral-border/10">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-full bg-neutral-surface border border-neutral-border/60 shadow-sm mr-4"
          >
            <Ionicons name="chevron-back" size={24} color="#0D132B" />
          </TouchableOpacity>

          <View>
            <Text className="font-h3 text-neutral-text-primary leading-tight font-bold">
              AI Teacher
            </Text>
            <View className="flex-row items-center mt-0.5">
              <View className={`w-2.5 h-2.5 rounded-full mr-1.5 ${status === "online" ? "bg-brand-green" : "bg-semantic-warning"}`} />
              <Text className="font-caption text-neutral-text-secondary uppercase tracking-wider font-semibold">
                {status === "online" ? "Online" : "Connecting..."}
              </Text>
            </View>
          </View>
        </View>

        {/* Header Right Badges */}
        <View className="flex-row items-center gap-2">
          {/* Camera preview quick toggle */}
          <TouchableOpacity
            onPress={() => setIsCameraEnabled(!isCameraEnabled)}
            className="w-10 h-10 rounded-full border border-neutral-border/60 bg-white items-center justify-center"
          >
            <Ionicons
              name={isCameraEnabled ? "videocam" : "videocam-outline"}
              size={20}
              color={isCameraEnabled ? "#6C4EF5" : "#0D132B"}
            />
          </TouchableOpacity>

          {/* Streak badge */}
          <View className="w-10 h-10 rounded-full border border-neutral-border/60 bg-white items-center justify-center">
            <Text className="font-body-medium font-bold text-semantic-streak">{streak}</Text>
          </View>

          {/* User profile button */}
          <View className="w-10 h-10 rounded-full overflow-hidden border border-neutral-border/60 bg-neutral-surface items-center justify-center">
            {user?.imageUrl ? (
              <Image source={{ uri: user.imageUrl }} className="w-full h-full" />
            ) : (
              <Ionicons name="person" size={18} color="#6B7280" />
            )}
          </View>
        </View>
      </View>

      {/* Connection Indicator overlay */}
      {status === "connecting" ? (
        <View className="flex-1 justify-center items-center bg-white px-6">
          <ActivityIndicator size="large" color="#6C4EF5" className="mb-4" />
          <Text className="font-h3 text-neutral-text-primary text-center font-bold">
            Dialing AI Studio...
          </Text>
          <Text className="font-body-large text-neutral-text-secondary text-center mt-2">
            Preparing {lesson?.title || "Lesson"} ({currentLanguage.name})
          </Text>
        </View>
      ) : (
        <View className="flex-1 justify-between bg-white pt-4">
          
          {/* 2. Cozy Studio Preview Card */}
          <View className="flex-1 px-6 pb-4">
            <View className="relative flex-1 rounded-[32px] overflow-hidden bg-violet-955 border border-neutral-border/10 shadow-md">
              {/* Cozy Blurred Room Background */}
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
                }}
                className="absolute inset-0 w-full h-full opacity-60"
                resizeMode="cover"
              />

              {/* Fox Mascot in the center */}
              <View className="absolute inset-x-0 bottom-0 items-center justify-end h-[70%]">
                <Image
                  source={images.mascotWelcome}
                  className="w-[90%] h-full"
                  resizeMode="contain"
                />
              </View>

              {/* Student Camera Inset preview (top right) */}
              {isCameraEnabled && (
                <View className="absolute top-4 right-4 w-24 h-32 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-neutral-text-primary">
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}

              {/* Lesson meta indicator overlay */}
              <View className="absolute top-4 left-4 bg-black/40 px-3 py-1.5 rounded-full border border-white/20">
                <Text className="font-caption text-white font-semibold">
                  {lesson?.title} • Goal: {lesson?.goals?.[0] || "Practice Speech"}
                </Text>
              </View>

              {/* 3. Floating Response Speech Bubble */}
              <View className="absolute bottom-6 left-6 right-6 bg-white p-5 rounded-[24px] shadow-lg border border-neutral-border/10">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-4">
                    {isCompleted ? (
                      <View>
                        <Text className="font-h4 text-brand-green font-bold flex-row items-center">
                          🎉 Lesson Complete!
                        </Text>
                        <Text className="font-body-medium text-neutral-text-primary mt-1">
                          {"You've practiced all phrases. Tap the red \"End Call\" button below to rate your session and claim your +"}
                          {lesson?.xpReward || 15}
                          {" XP!"}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text className="font-h3 text-brand-purple font-bold">
                          {isFoxSpeaking ? "..." : currentPhrase?.phrase}
                        </Text>
                        {currentPhrase?.pronunciation && (
                          <Text className="font-body-small text-neutral-text-secondary italic mt-0.5">
                            ({currentPhrase.pronunciation})
                          </Text>
                        )}
                        {isSubtitlesEnabled && currentPhrase?.translation && (
                          <Text className="font-body-medium text-neutral-text-primary mt-1.5">
                            {currentPhrase.translation}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>

                  {!isCompleted && (
                    <TouchableOpacity
                      onPress={handleSpeakerPress}
                      disabled={isFoxSpeaking}
                      className="w-10 h-10 rounded-full bg-brand-purple/10 items-center justify-center mt-1"
                    >
                      <Animated.View style={animatedSpeakerStyle}>
                        <Ionicons
                          name={isFoxSpeaking ? "volume-high" : "volume-high-outline"}
                          size={22}
                          color="#6C4EF5"
                        />
                      </Animated.View>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Speech Bubble Pointer Arrow */}
                <View
                  style={{
                    position: "absolute",
                    bottom: -8,
                    right: 48,
                    width: 16,
                    height: 16,
                    backgroundColor: "#FFFFFF",
                    transform: [{ rotate: "45deg" }],
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: "rgba(0,0,0,0.05)",
                  }}
                />
              </View>
            </View>
          </View>

          {/* 4. Voice Input Indicator Waveform */}
          {isUserSpeaking && (
            <View className="items-center justify-center py-2">
              <View className="flex-row items-center justify-center gap-1.5 h-8">
                <Animated.View style={[styles.waveBar, animatedWave1]} />
                <Animated.View style={[styles.waveBar, animatedWave2]} />
                <Animated.View style={[styles.waveBar, animatedWave3]} />
                <Animated.View style={[styles.waveBar, animatedWave4]} />
                <Text className="font-caption text-brand-purple ml-2 font-bold uppercase tracking-widest">
                  Speaking...
                </Text>
              </View>
            </View>
          )}

          {/* 5. Call Controls Row */}
          <View className="flex-row justify-around items-center px-4 py-4 bg-white">
            {/* Camera Switch */}
            <View className="items-center">
              <TouchableOpacity
                onPress={() => setIsCameraEnabled(!isCameraEnabled)}
                className={`w-14 h-14 rounded-full items-center justify-center border border-neutral-border/60 shadow-sm ${
                  isCameraEnabled ? "bg-white" : "bg-neutral-text-primary border-neutral-text-primary"
                }`}
              >
                <Ionicons
                  name={isCameraEnabled ? "videocam-outline" : "videocam-off-outline"}
                  size={24}
                  color={isCameraEnabled ? "#0D132B" : "#FFFFFF"}
                />
              </TouchableOpacity>
              <Text className="font-caption text-neutral-text-secondary mt-1 font-medium">Camera</Text>
            </View>

            {/* Microphone toggle / Speak trigger */}
            <View className="items-center">
              <TouchableOpacity
                onPress={handleMicPress}
                disabled={isFoxSpeaking || isCompleted}
                className={`w-14 h-14 rounded-full items-center justify-center border border-neutral-border/60 shadow-sm ${
                  isUserSpeaking
                    ? "bg-brand-purple border-brand-purple"
                    : "bg-white"
                }`}
              >
                <Ionicons
                  name="mic-outline"
                  size={24}
                  color={isUserSpeaking ? "#FFFFFF" : "#0D132B"}
                />
              </TouchableOpacity>
              <Text className="font-caption text-neutral-text-secondary mt-1 font-medium">
                {isUserSpeaking ? "Tap to Stop" : "Mic"}
              </Text>
            </View>

            {/* Subtitles translate Switch */}
            <View className="items-center">
              <TouchableOpacity
                onPress={() => setIsSubtitlesEnabled(!isSubtitlesEnabled)}
                className={`w-14 h-14 rounded-full items-center justify-center border border-neutral-border/60 shadow-sm ${
                  isSubtitlesEnabled ? "bg-brand-purple border-brand-purple" : "bg-white"
                }`}
              >
                <Ionicons
                  name="language-outline"
                  size={24}
                  color={isSubtitlesEnabled ? "#FFFFFF" : "#0D132B"}
                />
              </TouchableOpacity>
              <Text className="font-caption text-neutral-text-secondary mt-1 font-medium">Subtitles</Text>
            </View>

            {/* End Call red button */}
            <View className="items-center">
              <TouchableOpacity
                onPress={handleEndCall}
                className="w-14 h-14 rounded-full items-center justify-center bg-semantic-error shadow-md"
              >
                <MaterialCommunityIcons name="phone-hangup" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text className="font-caption text-neutral-text-secondary mt-1 font-medium text-semantic-error">
                End Call
              </Text>
            </View>
          </View>

          {/* 6. Skills Evaluation Dashboard */}
          <View className="mx-6 mb-6 p-4 bg-neutral-surface rounded-[24px] border border-neutral-border/30 flex-row justify-around">
            <View className="items-center flex-1 border-r border-neutral-border/40">
              <Text className="font-caption text-neutral-text-secondary font-semibold uppercase tracking-wider">
                Speaking
              </Text>
              <Text className="font-body-medium font-bold text-semantic-success mt-1">
                {evaluation.speaking}
              </Text>
            </View>

            <View className="items-center flex-1 border-r border-neutral-border/40">
              <Text className="font-caption text-neutral-text-secondary font-semibold uppercase tracking-wider">
                Pronunciation
              </Text>
              <Text className="font-body-medium font-bold text-brand-blue mt-1">
                {evaluation.pronunciation}
              </Text>
            </View>

            <View className="items-center flex-1">
              <Text className="font-caption text-neutral-text-secondary font-semibold uppercase tracking-wider">
                Grammar
              </Text>
              <Text className="font-body-medium font-bold text-[#8A56EC] mt-1">
                {evaluation.grammar}
              </Text>
            </View>
          </View>

        </View>
      )}

      {/* 7. Lesson End Feedback Modal */}
      <Modal
        visible={feedbackModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFeedbackModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-h3 font-bold text-neutral-text-primary">
                How was your lesson?
              </Text>
              <TouchableOpacity
                onPress={() => setFeedbackModalVisible(false)}
                className="w-8 h-8 rounded-full bg-neutral-surface items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#0D132B" />
              </TouchableOpacity>
            </View>

            <Text className="font-body-medium text-neutral-text-secondary mb-6">
              Your feedback helps our AI teacher customize lessons to suit your language goals.
            </Text>

            {/* Interactive Stars */}
            <View className="flex-row justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={36}
                    color="#FFC800"
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick tag items */}
            <Text className="font-h4 font-bold text-neutral-text-primary mb-3">
              What did you like?
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {["Clear audio", "Helpful tips", "Perfect speed", "Fun & friendly", "Good vocabulary"].map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => toggleTag(tag)}
                    className={`px-4 py-2.5 rounded-full border ${
                      isSelected
                        ? "bg-brand-purple/10 border-brand-purple"
                        : "bg-white border-neutral-border"
                    }`}
                  >
                    <Text
                      className={`font-body-small font-semibold ${
                        isSelected ? "text-brand-purple" : "text-neutral-text-secondary"
                      }`}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Feedback notes */}
            <Text className="font-h4 font-bold text-neutral-text-primary mb-3">
              Additional comments (optional)
            </Text>
            <TextInput
              placeholder="Tell us more about the audio quality or teacher responses..."
              multiline={true}
              numberOfLines={3}
              value={feedbackNotes}
              onChangeText={setFeedbackNotes}
              className="bg-neutral-surface border border-neutral-border/60 rounded-2xl p-4 font-body-medium text-neutral-text-primary mb-6 text-left"
              style={{ textAlignVertical: "top", minHeight: 80 }}
            />

            {/* Finish session button */}
            <TouchableOpacity
              onPress={handleFeedbackSubmit}
              activeOpacity={0.9}
              className="bg-brand-purple py-4 rounded-2xl items-center shadow-md"
            >
              <Text className="font-h4 text-white font-bold">
                {isCompleted ? "Claim +20 XP & Complete" : "End Session"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  waveBar: {
    width: 4,
    height: 18,
    backgroundColor: "#6C4EF5",
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(13, 19, 43, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
});
