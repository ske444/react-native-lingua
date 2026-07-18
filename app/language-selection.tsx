import React, { useState } from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/useLanguageStore";

// Learner count mapping matching the design specifications
const learnerCounts: Record<string, string> = {
  es: "28.4M learners",
  fr: "19.4M learners",
  ja: "12.7M learners",
};

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { selectedLanguageId, setSelectedLanguageId } = useLanguageStore();
  
  // Local state for temporary UI selection before confirmation
  const [selectedId, setSelectedId] = useState<string>(selectedLanguageId || "es");
  const [searchQuery, setSearchQuery] = useState("");

  const handleConfirm = () => {
    setSelectedLanguageId(selectedId);
    router.replace("/");
  };

  // Filter languages based on search query
  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1">
          
          {/* Header */}
          <View className="flex-row items-center justify-center py-4 px-4 relative border-b border-neutral-border/40">
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => router.back()}
              className="absolute left-4 z-10 p-1"
            >
              <Feather name="chevron-left" size={26} color="#0D132B" />
            </TouchableOpacity>
            <Text className="font-h3 text-neutral-text-primary text-center">Choose a language</Text>
          </View>

          {/* Search Bar Container */}
          <View className="px-6 mt-5 mb-4">
            <View className="flex-row items-center bg-neutral-surface border border-neutral-border rounded-2xl px-4 py-2.5">
              <Feather name="search" size={20} color="#6B7280" style={{ marginRight: 10 }} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search languages"
                placeholderTextColor="#6B7280"
                className="flex-1 font-body-medium text-neutral-text-primary p-0"
                style={{ verticalAlign: "middle" }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")} className="p-0.5">
                  <Feather name="x" size={16} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Popular Heading */}
          <View className="px-6 mb-3">
            <Text className="font-h4 text-neutral-text-primary">Popular</Text>
          </View>

          {/* Scrollable Language List */}
          <ScrollView 
            className="flex-1 px-6"
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = selectedId === lang.id;
                const learners = learnerCounts[lang.id] || "0 learners";

                return (
                  <TouchableOpacity
                    key={lang.id}
                    activeOpacity={0.85}
                    onPress={() => setSelectedId(lang.id)}
                    className={`flex-row items-center justify-between bg-neutral-background border rounded-[20px] p-4 mb-3.5`}
                    style={{
                      borderColor: isSelected ? "#6C4EF5" : "#E5E7EB",
                      borderWidth: isSelected ? 2 : 1,
                      backgroundColor: isSelected ? "#6C4EF508" : "#FFFFFF",
                    }}
                  >
                    {/* Left side: Flag and Info */}
                    <View className="flex-row items-center gap-4">
                      {/* Flag circle */}
                      <View className="w-12 h-12 rounded-full bg-neutral-surface border border-neutral-border/40 items-center justify-center overflow-hidden">
                        <Text className="text-[26px] leading-[32px]">{lang.flag}</Text>
                      </View>
                      
                      {/* Name & Learner count */}
                      <View className="justify-center">
                        <Text className="font-h4 text-neutral-text-primary">{lang.name}</Text>
                        <Text className="font-caption text-neutral-text-secondary mt-0.5">{learners}</Text>
                      </View>
                    </View>

                    {/* Right side: Checkmark or Chevron */}
                    {isSelected ? (
                      <View className="w-6 h-6 rounded-full bg-brand-purple items-center justify-center shadow-sm">
                        <Feather name="check" size={14} color="#FFFFFF" />
                      </View>
                    ) : (
                      <Feather name="chevron-right" size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                );
              })
            ) : (
              <View className="items-center justify-center py-10">
                <Text className="font-body-medium text-neutral-text-secondary">No languages found</Text>
              </View>
            )}
          </ScrollView>

          {/* Fixed Footer Area */}
          <View className="bg-neutral-background pt-2">
            
            {/* Confirmation Button Container */}
            <View className="px-6 mb-4">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleConfirm}
                style={[styles.button, styles.buttonShadow]}
              >
                <Text className="text-white font-poppins-semibold text-[17px] text-center">Confirm</Text>
              </TouchableOpacity>
            </View>

            {/* Earth Footer Illustration */}
            <View className="w-full h-[120px] overflow-hidden items-center justify-end bg-neutral-background">
              <Image 
                source={images.earth}
                style={{ width: "100%", height: 160 }}
                contentFit="cover"
              />
            </View>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#6C4EF5",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: "100%",
  },
  buttonShadow: {
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
