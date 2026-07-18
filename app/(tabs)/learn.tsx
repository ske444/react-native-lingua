import React from "react";
import { View, Text, SafeAreaView } from "react-native";

export default function LearnScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="font-h1 text-neutral-text-primary text-center mb-2">Learn Screen</Text>
        <Text className="font-body-large text-neutral-text-secondary text-center">
          This is a placeholder for the Learn Screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
