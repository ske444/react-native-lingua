import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useAuth } from "@clerk/expo";
import { useLanguageStore } from "@/store/useLanguageStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { languages } from "@/data/languages";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { selectedLanguageId, setSelectedLanguageId } = useLanguageStore();
  const selectedLanguage = languages.find((lang) => lang.id === selectedLanguageId);

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.removeItem("lingua-language-storage");
      setSelectedLanguageId(null);
    } catch (error) {
      console.error("Failed to clear AsyncStorage", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="font-h1 text-neutral-text-primary text-center mb-2">Home Screen</Text>
        <Text className="font-body-large text-neutral-text-secondary text-center mb-8">
          This is a placeholder for the Home Screen.
        </Text>

        {selectedLanguage && (
          <View className="w-full bg-neutral-surface border border-neutral-border p-4 rounded-2xl mb-8 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Text className="text-3xl">{selectedLanguage.flag}</Text>
              <View>
                <Text className="font-h4 text-neutral-text-primary">{selectedLanguage.name}</Text>
                <Text className="font-caption text-neutral-text-secondary">Learning Language</Text>
              </View>
            </View>
          </View>
        )}

        <View className="w-full gap-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleClearStorage}
            className="w-full bg-neutral-surface border border-neutral-border py-4 rounded-2xl items-center"
            accessibilityRole="button"
            accessibilityLabel="Clear language selection"
          >
            <Text className="font-h4 text-semantic-error">Clear Language Selection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => signOut()}
            className="w-full bg-brand-purple py-4 rounded-2xl items-center shadow-sm"
            accessibilityRole="button"
            accessibilityLabel="Sign out"
          >
            <Text className="font-h4 text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
