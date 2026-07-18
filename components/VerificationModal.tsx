import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSignUp, useSignIn } from "@clerk/expo";

interface VerificationModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
  mode: "signup" | "signin";
}

export default function VerificationModal({
  isVisible,
  onClose,
  email,
  mode,
}: VerificationModalProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  const { signUp } = useSignUp();
  const { signIn } = useSignIn();

  const [errorMsg, setErrorMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isVisible) {
      setCode("");
      setErrorMsg("");
      setIsVerifying(false);
      // Give a tiny timeout for the modal to mount/render before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Navigate helper to handle post-auth tasks
  const navigateAfterAuth = ({ session, decorateUrl }: { session?: any; decorateUrl: (path: string) => string }) => {
    if (session?.currentTask) {
      console.log("Pending session task:", session.currentTask);
      return;
    }
    const url = decorateUrl("/");
    if (url.startsWith("http")) {
      window.location.href = url;
    } else {
      router.replace(url as any);
    }
  };

  // Handle code change
  const handleChange = async (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, "");
    setCode(cleanText);

    if (cleanText.length === 6) {
      Keyboard.dismiss();
      setIsVerifying(true);
      setErrorMsg("");

      try {
        if (mode === "signup") {
          if (!signUp) return;
          const { error } = await signUp.verifications.verifyEmailCode({
            code: cleanText,
          });

          if (error) {
            setErrorMsg(error.message || "Invalid verification code.");
            setIsVerifying(false);
            return;
          }

          if (signUp.status === "complete") {
            await signUp.finalize({ navigate: navigateAfterAuth });
            onClose();
          } else {
            setErrorMsg("Sign up attempt not complete.");
            setIsVerifying(false);
          }
        } else {
          if (!signIn) return;
          const { error } = await signIn.emailCode.verifyCode({
            code: cleanText,
          });

          if (error) {
            setErrorMsg(error.message || "Invalid verification code.");
            setIsVerifying(false);
            return;
          }

          if (signIn.status === "complete") {
            await signIn.finalize({ navigate: navigateAfterAuth });
            onClose();
          } else {
            setErrorMsg("Sign in attempt not complete.");
            setIsVerifying(false);
          }
        }
      } catch (err: any) {
        setErrorMsg(err.message || "An error occurred during verification.");
        setIsVerifying(false);
      }
    }
  };

  const handleResend = async () => {
    setErrorMsg("");
    try {
      if (mode === "signup") {
        if (!signUp) return;
        const { error } = await signUp.verifications.sendEmailCode();
        if (error) {
          setErrorMsg(error.message || "Failed to resend code.");
        }
      } else {
        if (!signIn) return;
        const { error } = await signIn.emailCode.sendCode({
          emailAddress: email,
        });
        if (error) {
          setErrorMsg(error.message || "Failed to resend code.");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while resending the code.");
    }
  };

  const handleBoxPress = () => {
    if (!isVerifying) {
      inputRef.current?.focus();
    }
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const char = code[i] || "";
      const isFocused = i === code.length && isVisible && !isVerifying;

      boxes.push(
        <View
          key={i}
          className={`w-[44px] h-[56px] border rounded-2xl items-center justify-center bg-neutral-surface ${
            isFocused ? "border-brand-purple border-2 bg-white" : "border-neutral-border"
          }`}
          style={isFocused ? styles.focusedBox : null}
        >
          <Text className="font-poppins-bold text-[20px] text-neutral-text-primary">
            {char}
          </Text>
        </View>
      );
    }
    return boxes;
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable 
        style={StyleSheet.absoluteFill} 
        onPress={() => {
          if (!isVerifying) {
            Keyboard.dismiss();
            onClose();
          }
        }}
      >
        <View className="flex-1 bg-[#0D132B]/50 justify-end" />
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View className="bg-white rounded-t-[32px] px-6 pt-6 pb-10 border-t border-neutral-border shadow-2xl">
          {/* Header Close button */}
          <View className="flex-row justify-end mb-2">
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={onClose}
              disabled={isVerifying}
              className="w-8 h-8 rounded-full bg-neutral-surface items-center justify-center"
            >
              <Feather name="x" size={18} color="#0D132B" />
            </TouchableOpacity>
          </View>

          {/* Text Content */}
          <View className="items-center mb-6">
            <Text className="font-h2 text-neutral-text-primary text-center mb-2">
              Verify your email
            </Text>
            <Text className="font-body-medium text-neutral-text-secondary text-center px-4">
              {"We've sent a 6-digit verification code to\n"}
              <Text className="font-poppins-semibold text-neutral-text-primary">{email || "your email"}</Text>
            </Text>
          </View>

          {/* Verification Code Box Row */}
          <Pressable 
            className="flex-row justify-between w-full mb-6 px-2"
            onPress={handleBoxPress}
          >
            {renderBoxes()}
          </Pressable>

          {/* Hidden text input */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChange}
            keyboardType="number-pad"
            maxLength={6}
            style={styles.hiddenInput}
            caretHidden={true}
            editable={!isVerifying}
            autoFocus={true}
          />

          {/* Loading Indicator */}
          {isVerifying ? (
            <View className="items-center mb-4">
              <ActivityIndicator size="small" color="#6C4EF5" />
            </View>
          ) : null}

          {/* Error Message Display */}
          {errorMsg ? (
            <Text className="font-poppins-regular text-semantic-error text-[13px] text-center mb-4 px-4">
              {errorMsg}
            </Text>
          ) : null}

          {/* Resend Helper */}
          <View className="items-center">
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={handleResend}
              disabled={isVerifying}
            >
              <Text className="font-poppins-semibold text-brand-purple text-[14px]">
                Resend verification code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  focusedBox: {
    // Custom drop shadow for active box
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
});

