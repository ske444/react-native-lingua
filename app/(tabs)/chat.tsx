import React from "react";
import { View, Text, SafeAreaView } from "react-native";

export default function ChatScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="font-h1 text-neutral-text-primary text-center mb-2">Chat Screen</Text>
        <Text className="font-body-large text-neutral-text-secondary text-center">
          This is a placeholder for the Chat Screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
