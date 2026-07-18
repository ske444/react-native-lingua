import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { useAuth } from "@clerk/expo";
import { useLanguageStore } from "@/store/useLanguageStore";
import { languages } from "@/data/languages";

export default function DesignSystemShowcase() {
  const { signOut } = useAuth();
  const { selectedLanguageId } = useLanguageStore();
  const selectedLanguage = languages.find(lang => lang.id === selectedLanguageId) || languages[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View className="flex-row items-center justify-between pb-6 mb-6 border-b border-neutral-border">
          <View className="flex-row items-center gap-3">
            <Image 
              source={images.mascotLogo} 
              style={{ width: 48, height: 48 }}
              contentFit="contain"
            />
            <Text className="font-h1 text-neutral-text-primary text-[32px]">lingua</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="bg-brand-purple/10 px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
              <Image 
                source={images.streakFire} 
                style={{ width: 16, height: 16 }}
                contentFit="contain"
              />
              <Text className="font-caption text-brand-purple font-semibold text-[11px]">DS v1.0</Text>
            </View>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => signOut()}
              className="bg-semantic-error/10 px-3 py-1.5 rounded-full"
            >
              <Text className="font-caption text-semantic-error font-semibold text-[11px]">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Introduction */}
        <View className="mb-6">
          <Text className="font-h2 text-neutral-text-primary mb-2">Design System</Text>
          <Text className="font-body-large text-neutral-text-secondary">
            Poppins is a modern, geometric sans-serif typeface that provides excellent readability and a friendly personality.
          </Text>
        </View>

        {/* Onboarding Showcase Banner */}
        <View className="mb-8 bg-brand-purple/10 border border-brand-purple/20 rounded-[24px] p-5">
          <Text className="font-h3 text-brand-purple mb-1.5">Interactive Onboarding</Text>
          <Text className="font-body-medium text-neutral-text-secondary mb-4">
            Experience the full onboarding screen designed with customized speech bubbles and the winking mascot.
          </Text>
          <Link href="/onboarding" asChild>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.button, styles.secondaryButton, { marginBottom: 0 }]}
            >
              <Text className="font-h4 text-neutral-text-primary">Open Onboarding Screen</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Language Selection Banner */}
        <View className="mb-8 bg-brand-purple/10 border border-brand-purple/20 rounded-[24px] p-5">
          <Text className="font-h3 text-brand-purple mb-1.5">Language Selection</Text>
          <Text className="font-body-medium text-neutral-text-secondary mb-4">
            Select the language you want to learn and save it globally.
          </Text>
          
          {selectedLanguage && (
            <View className="flex-row items-center gap-3.5 mb-4 bg-neutral-background border border-neutral-border/60 p-3.5 rounded-2xl">
              <View className="w-10 h-10 rounded-full bg-neutral-surface border border-neutral-border/40 items-center justify-center overflow-hidden">
                <Text className="text-[22px]">{selectedLanguage.flag}</Text>
              </View>
              <View>
                <Text className="font-h4 text-neutral-text-primary">{selectedLanguage.name} ({selectedLanguage.nativeName})</Text>
                <Text className="font-caption text-neutral-text-secondary">Selected Active Language</Text>
              </View>
            </View>
          )}

          <Link href="/language-selection" asChild>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.button, styles.primaryButton, { marginBottom: 0 }]}
            >
              <Text className="font-h4 text-neutral-background">Open Language Selection</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Colors Grid */}
        <View className="mb-8">
          <Text className="font-h3 text-neutral-text-primary mb-4">COLORS</Text>
          
          {/* Primary */}
          <Text className="font-h4 text-neutral-text-secondary uppercase tracking-wider mb-2 text-[12px]">Primary</Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            <View className="flex-1 min-w-[70px] bg-neutral-surface border border-neutral-border rounded-2xl p-2.5 items-center">
              <View className="w-12 h-12 rounded-xl bg-brand-purple mb-2" />
              <Text className="font-caption text-neutral-text-primary text-[10px] font-bold text-center">PURPLE</Text>
              <Text className="font-caption text-neutral-text-secondary text-[9px] text-center mt-0.5">#6C4EF5</Text>
            </View>
            <View className="flex-1 min-w-[70px] bg-neutral-surface border border-neutral-border rounded-2xl p-2.5 items-center">
              <View className="w-12 h-12 rounded-xl bg-brand-deep-purple mb-2" />
              <Text className="font-caption text-neutral-text-primary text-[10px] font-bold text-center">DEEP PURP</Text>
              <Text className="font-caption text-neutral-text-secondary text-[9px] text-center mt-0.5">#5B3BF6</Text>
            </View>
            <View className="flex-1 min-w-[70px] bg-neutral-surface border border-neutral-border rounded-2xl p-2.5 items-center">
              <View className="w-12 h-12 rounded-xl bg-brand-blue mb-2" />
              <Text className="font-caption text-neutral-text-primary text-[10px] font-bold text-center">BLUE</Text>
              <Text className="font-caption text-neutral-text-secondary text-[9px] text-center mt-0.5">#4D8BFF</Text>
            </View>
            <View className="flex-1 min-w-[70px] bg-neutral-surface border border-neutral-border rounded-2xl p-2.5 items-center">
              <View className="w-12 h-12 rounded-xl bg-brand-green mb-2" />
              <Text className="font-caption text-neutral-text-primary text-[10px] font-bold text-center">GREEN</Text>
              <Text className="font-caption text-neutral-text-secondary text-[9px] text-center mt-0.5">#21C16B</Text>
            </View>
          </View>

          {/* Semantic */}
          <Text className="font-h4 text-neutral-text-secondary uppercase tracking-wider mb-2 text-[12px]">Semantic</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-semantic-success mb-1.5" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">SUCCESS</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#21C16B</Text>
            </View>
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-semantic-warning mb-1.5" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">WARN</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#FFC800</Text>
            </View>
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-semantic-streak mb-1.5" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">STREAK</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#FF8A00</Text>
            </View>
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-semantic-error mb-1.5" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">ERROR</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#FF4D4F</Text>
            </View>
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-semantic-info mb-1.5" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">INFO</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#4D8BFF</Text>
            </View>
          </View>

          {/* Neutrals */}
          <Text className="font-h4 text-neutral-text-secondary uppercase tracking-wider mb-2 text-[12px]">Neutrals</Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-neutral-text-primary mb-1.5" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">TEXT PRI</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#0D132B</Text>
            </View>
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-neutral-text-secondary mb-1.5" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">TEXT SEC</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#6B7280</Text>
            </View>
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-neutral-border mb-1.5 border border-neutral-border" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">BORDER</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#E5E7EB</Text>
            </View>
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-neutral-surface mb-1.5 border border-neutral-border" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">SURFACE</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#F6F7FB</Text>
            </View>
            <View className="flex-1 min-w-[60px] bg-neutral-surface border border-neutral-border rounded-xl p-2 items-center">
              <View className="w-8 h-8 rounded-lg bg-neutral-background mb-1.5 border border-neutral-border" />
              <Text className="font-caption text-neutral-text-primary text-[9px] font-bold text-center">BG</Text>
              <Text className="font-caption text-neutral-text-secondary text-[8px] text-center">#FFFFFF</Text>
            </View>
          </View>
        </View>

        {/* Typography */}
        <View className="mb-8">
          <Text className="font-h3 text-neutral-text-primary mb-4">TYPOGRAPHY</Text>
          
          <View className="gap-5">
            <View className="flex-row items-center justify-between border-b border-neutral-border/50 pb-3">
              <View className="flex-1 pr-4">
                <Text className="font-h1 text-neutral-text-primary">H1 Heading</Text>
                <Text className="font-caption text-neutral-text-secondary mt-0.5">Page / Screen Title</Text>
              </View>
              <Text className="font-caption text-neutral-text-secondary text-right">32px • Bold • L.H. 1.2</Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-neutral-border/50 pb-3">
              <View className="flex-1 pr-4">
                <Text className="font-h2 text-neutral-text-primary">H2 Heading</Text>
                <Text className="font-caption text-neutral-text-secondary mt-0.5">Section Title</Text>
              </View>
              <Text className="font-caption text-neutral-text-secondary text-right">24px • SemiBold • L.H. 1.3</Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-neutral-border/50 pb-3">
              <View className="flex-1 pr-4">
                <Text className="font-h3 text-neutral-text-primary">H3 Heading</Text>
                <Text className="font-caption text-neutral-text-secondary mt-0.5">Card / Module Title</Text>
              </View>
              <Text className="font-caption text-neutral-text-secondary text-right">20px • SemiBold • L.H. 1.3</Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-neutral-border/50 pb-3">
              <View className="flex-1 pr-4">
                <Text className="font-h4 text-neutral-text-primary">H4 Subtitle</Text>
                <Text className="font-caption text-neutral-text-secondary mt-0.5">Subheading</Text>
              </View>
              <Text className="font-caption text-neutral-text-secondary text-right">16px • Medium • L.H. 1.4</Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-neutral-border/50 pb-3">
              <View className="flex-1 pr-4">
                <Text className="font-body-large text-neutral-text-primary">Body Large content style</Text>
                <Text className="font-caption text-neutral-text-secondary mt-0.5">Important content</Text>
              </View>
              <Text className="font-caption text-neutral-text-secondary text-right">16px • Regular • L.H. 1.6</Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-neutral-border/50 pb-3">
              <View className="flex-1 pr-4">
                <Text className="font-body-medium text-neutral-text-primary">Body Medium standard text</Text>
                <Text className="font-caption text-neutral-text-secondary mt-0.5">Body text</Text>
              </View>
              <Text className="font-caption text-neutral-text-secondary text-right">14px • Regular • L.H. 1.6</Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-neutral-border/50 pb-3">
              <View className="flex-1 pr-4">
                <Text className="font-body-small text-neutral-text-primary">Body Small supporting text</Text>
                <Text className="font-caption text-neutral-text-secondary mt-0.5">Supporting text</Text>
              </View>
              <Text className="font-caption text-neutral-text-secondary text-right">13px • Regular • L.H. 1.6</Text>
            </View>

            <View className="flex-row items-center justify-between pb-1">
              <View className="flex-1 pr-4">
                <Text className="font-caption text-neutral-text-primary">Caption meta text label</Text>
                <Text className="font-caption text-neutral-text-secondary mt-0.5">Labels, meta text</Text>
              </View>
              <Text className="font-caption text-neutral-text-secondary text-right">11px • Regular • L.H. 1.4</Text>
            </View>
          </View>
        </View>

        {/* Live UI Components Demonstration */}
        <View className="mb-4">
          <Text className="font-h3 text-neutral-text-primary mb-4">COMPONENTS DEMO</Text>
          
          {/* Card Container */}
          <View className="bg-neutral-surface border border-neutral-border rounded-3xl p-5 mb-6">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 pr-2">
                <Text className="font-h3 text-neutral-text-primary">Lesson 1: Earth Basics</Text>
                <Text className="font-body-medium text-neutral-text-secondary mt-1">
                  Learn everyday vocabulary related to our environment and planet.
                </Text>
              </View>
              
              {/* Badge */}
              <View className="bg-semantic-streak/10 px-2.5 py-1 rounded-full flex-row items-center gap-1">
                <Image 
                  source={images.streakFire} 
                  style={{ width: 12, height: 12 }}
                  contentFit="contain"
                />
                <Text className="font-caption text-semantic-streak font-semibold text-[10px]">10 XP</Text>
              </View>
            </View>

            {/* Illustration */}
            <View className="items-center justify-center bg-neutral-background border border-neutral-border rounded-2xl py-6 mb-4">
              <Image 
                source={images.earth}
                style={{ width: 120, height: 120 }}
                contentFit="contain"
              />
            </View>

            {/* Progress Bar */}
            <View className="mb-5">
              <View className="flex-row justify-between items-center mb-1.5">
                <Text className="font-caption text-neutral-text-secondary">Progress</Text>
                <Text className="font-caption text-neutral-text-primary font-bold">60%</Text>
              </View>
              <View className="h-2.5 w-full bg-neutral-border rounded-full overflow-hidden">
                <View className="h-full bg-brand-green rounded-full" style={{ width: "60%" }} />
              </View>
            </View>

            {/* Buttons (Call-to-Action) */}
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.button, styles.primaryButton]}
            >
              <Text className="font-h4 text-neutral-background">Start Lesson</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.button, styles.secondaryButton]}
            >
              <Text className="font-h4 text-neutral-text-primary">View Vocabulary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#6C4EF5",
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
