import "../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useLanguageStore } from "../store/useLanguageStore";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!isLoaded || !hasHydrated) return;

    const inAuthGroup = segments[0] === "signin" || segments[0] === "signup" || segments[0] === "onboarding";
    const onLanguageSelection = segments[0] === "language-selection";

    if (!isSignedIn) {
      if (!inAuthGroup) {
        // If not signed in and trying to access protected screens, redirect to onboarding
        router.replace("/onboarding");
      }
    } else {
      // User is signed in
      if (!selectedLanguageId) {
        // Must select a language before accessing home (/) or any other screen
        if (!onLanguageSelection) {
          router.replace("/language-selection");
        }
      } else {
        // Language selected, redirect away from onboarding/auth if present
        if (inAuthGroup) {
          router.replace("/");
        }
      }
    }
  }, [isSignedIn, isLoaded, hasHydrated, selectedLanguageId, segments, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}

