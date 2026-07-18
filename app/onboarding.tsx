import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { images } from "@/constants/images";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-6 justify-between py-6">
        
        {/* Top Logo Section */}
        <View className="items-center mt-4">
          <View className="flex-row items-center gap-2">
            <Image 
              source={images.mascotLogo} 
              style={{ width: 36, height: 36 }}
              contentFit="contain"
            />
            <Text className="font-poppins-bold text-[28px] text-[#0D132B] tracking-tight">lingua</Text>
          </View>
        </View>

        {/* Content Section: Titles & Mascot */}
        <View className="flex-1 justify-center items-center my-6">
          {/* Headline */}
          <Text className="font-poppins-bold text-[36px] text-center leading-tight text-[#0D132B]">
            Your AI language{"\n"}
            <Text className="text-[#6C4EF5]">teacher.</Text>
          </Text>

          {/* Sub-headline */}
          <Text className="font-poppins-regular text-base text-center text-[#6B7280] mt-4 leading-relaxed">
            Real conversations, personalized{"\n"}
            lessons, anytime, anywhere.
          </Text>

          {/* Mascot and Bubbles Container */}
          <View className="relative w-[360px] h-[360px] items-center justify-center mt-8">
            {/* Mascot */}
            <Image 
              source={images.mascotWelcome}
              style={{ width: 290, height: 290 }}
              contentFit="contain"
            />

            {/* Bubble 1: Hello! */}
            <View className="absolute top-[35px] left-[10px] bg-[#EBF3FF] px-4.5 py-2.5 rounded-2xl shadow-sm">
              <Text className="font-poppins-semibold text-[15px] text-[#0D132B]">Hello!</Text>
              {/* Tail */}
              <View className="absolute bottom-[-4px] right-[20px] w-3 h-3 bg-[#EBF3FF] rotate-45" />
            </View>

            {/* Bubble 2: ¡Hola! */}
            <View className="absolute top-[10px] right-[25px] bg-[#EEECFD] px-4.5 py-2.5 rounded-2xl shadow-sm">
              <Text className="font-poppins-semibold text-[15px] text-[#6C4EF5]">¡Hola!</Text>
              {/* Tail */}
              <View className="absolute bottom-[-4px] left-[20px] w-3 h-3 bg-[#EEECFD] rotate-45" />
            </View>

            {/* Bubble 3: 你好! */}
            <View className="absolute top-[110px] right-[-5px] bg-[#FFF0F0] px-4.5 py-2.5 rounded-2xl shadow-sm">
              <Text className="font-poppins-semibold text-[15px] text-[#FF4D4F]">你好!</Text>
              {/* Tail */}
              <View className="absolute left-[-4px] top-[40%] w-3 h-3 bg-[#FFF0F0] rotate-45" />
            </View>
          </View>
        </View>

        {/* Bottom Section: Button */}
        <View className="mb-4 w-full">
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, styles.buttonShadow]}
            onPress={() => router.replace("/")}
          >
            <Text className="text-white font-poppins-semibold text-[17px] text-center flex-1">Get Started</Text>
            <View className="absolute right-5">
              <Feather name="chevron-right" size={22} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  buttonShadow: {
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
