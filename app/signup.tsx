import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { images } from "@/constants/images";
import VerificationModal from "@/components/VerificationModal";
import { useSignUp, useSSO } from "@clerk/expo";

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [generalError, setGeneralError] = useState("");
  
  // Verification Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSignUp = async () => {
    if (!signUp) return;
    setGeneralError("");

    const { error } = await signUp.password({
      emailAddress: email,
      password,
    });

    if (error) {
      setGeneralError(error.message || "Failed to sign up.");
      return;
    }

    // Request the email verification code
    const res = await signUp.verifications.sendEmailCode();
    if (res.error) {
      setGeneralError(res.error.message || "Failed to send verification code.");
      return;
    }

    setIsModalVisible(true);
  };

  const handleSocialAuth = async (provider: string) => {
    if (fetchStatus === "fetching") return;
    setGeneralError("");

    try {
      let strategy: any = "oauth_google";
      if (provider === "Google") strategy = "oauth_google";
      else if (provider === "Facebook") strategy = "oauth_facebook";
      else if (provider === "Apple") strategy = "oauth_apple";

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err: any) {
      console.error(`${provider} Auth Error:`, err);
      setGeneralError(err.message || `Failed to authenticate with ${provider}.`);
    }
  };

  const isSubmitting = fetchStatus === "fetching";

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Back Button */}
          <View className="flex-row items-center mt-2 mb-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center rounded-full bg-neutral-surface"
            >
              <Feather name="chevron-left" size={24} color="#0D132B" />
            </TouchableOpacity>
          </View>

          {/* Heading Section */}
          <Text className="font-h1 text-neutral-text-primary tracking-tight mb-1">
            Create your account
          </Text>
          <Text className="font-body-large text-neutral-text-secondary mb-4">
            Start your language journey today ✨
          </Text>

          {/* Mascot Section */}
          <View className="items-center justify-center my-4">
            <Image
              source={images.mascotAuth}
              style={{ width: 220, height: 140 }}
              contentFit="contain"
            />
          </View>

          {/* Form Fields */}
          <View className="mb-5">
            {/* Email Input */}
            <View
              className={`border rounded-[20px] px-4 py-3 mb-4 bg-white ${
                isEmailFocused
                  ? "border-brand-purple border-2"
                  : "border-neutral-border"
              }`}
              style={isEmailFocused ? styles.focusedBorderOffset : null}
            >
              <Text className="font-poppins-semibold text-neutral-text-secondary text-[11px] uppercase tracking-wider mb-1">
                Email
              </Text>
              <TextInput
                className="font-poppins-semibold text-neutral-text-primary text-[15px] p-0"
                value={email}
                onChangeText={setEmail}
                placeholder="alex@gmail.com"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                editable={!isSubmitting}
              />
            </View>
            {errors?.fields?.emailAddress && (
              <Text className="font-poppins-regular text-semantic-error text-[12px] -mt-2 mb-3 ml-2">
                {errors.fields.emailAddress.message}
              </Text>
            )}

            {/* Password Input */}
            <View
              className={`border rounded-[20px] px-4 py-3 bg-white flex-row items-center justify-between ${
                isPasswordFocused
                  ? "border-brand-purple border-2"
                  : "border-neutral-border"
              }`}
              style={isPasswordFocused ? styles.focusedBorderOffset : null}
            >
              <View className="flex-1">
                <Text className="font-poppins-semibold text-neutral-text-secondary text-[11px] uppercase tracking-wider mb-1">
                  Password
                </Text>
                <TextInput
                  className="font-poppins-semibold text-neutral-text-primary text-[15px] p-0"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  editable={!isSubmitting}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="pl-2"
                disabled={isSubmitting}
              >
                <Feather
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {errors?.fields?.password && (
              <Text className="font-poppins-regular text-semantic-error text-[12px] mt-1.5 ml-2">
                {errors.fields.password.message}
              </Text>
            )}
          </View>

          {/* General Error Display */}
          {generalError ? (
            <Text className="font-poppins-regular text-semantic-error text-[13px] text-center mb-4">
              {generalError}
            </Text>
          ) : null}

          {/* Main Action Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.primaryButton, 
              styles.buttonShadow,
              (isSubmitting || !email || !password) && { opacity: 0.6 }
            ]}
            onPress={handleSignUp}
            disabled={isSubmitting || !email || !password}
          >
            <Text className="text-white font-poppins-semibold text-[17px] text-center">
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center justify-center my-6">
            <View className="flex-1 h-[1px] bg-neutral-border" />
            <Text className="px-4 font-poppins-regular text-[13px] text-neutral-text-secondary">
              or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-neutral-border" />
          </View>

          {/* Social Auth Buttons */}
          <View className="gap-3">
            {/* Google */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="border border-neutral-border rounded-[20px] py-4 flex-row items-center justify-center relative bg-white"
              onPress={() => handleSocialAuth("Google")}
              disabled={isSubmitting}
            >
              <View className="absolute left-6">
                <AntDesign name="google" size={20} color="#EA4335" />
              </View>
              <Text className="font-poppins-semibold text-neutral-text-primary text-[15px]">
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="border border-neutral-border rounded-[20px] py-4 flex-row items-center justify-center relative bg-white"
              onPress={() => handleSocialAuth("Facebook")}
              disabled={isSubmitting}
            >
              <View className="absolute left-6">
                <FontAwesome name="facebook" size={20} color="#1877F2" />
              </View>
              <Text className="font-poppins-semibold text-neutral-text-primary text-[15px]">
                Continue with Facebook
              </Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="border border-neutral-border rounded-[20px] py-4 flex-row items-center justify-center relative bg-white"
              onPress={() => handleSocialAuth("Apple")}
              disabled={isSubmitting}
            >
              <View className="absolute left-6">
                <AntDesign name="apple" size={20} color="#000000" />
              </View>
              <Text className="font-poppins-semibold text-neutral-text-primary text-[15px]">
                Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* Navigation Link */}
          <View className="flex-row justify-center mt-6 mb-8">
            <Text className="font-poppins-regular text-[14px] text-neutral-text-secondary">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/signin")}
              disabled={isSubmitting}
            >
              <Text className="font-poppins-bold text-[14px] text-brand-purple">
                Log in
              </Text>
            </TouchableOpacity>
          </View>

          {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
          <View nativeID="clerk-captcha" />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verification Modal */}
      <VerificationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        email={email || "your email"}
        mode="signup"
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  focusedBorderOffset: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  primaryButton: {
    backgroundColor: "#6C4EF5",
    paddingVertical: 16,
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
