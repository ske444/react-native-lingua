import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  SharedValue,
  Easing,
} from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_COUNT = 5;
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT;
const CIRCLE_SIZE = 52;
const TAB_BAR_HEIGHT = 66; // Compact core tab bar height

type IconFamily = "Ionicons" | "MaterialCommunityIcons";

interface TabConfig {
  label: string;
  family: IconFamily;
  activeIcon: string;
  inactiveIcon: string;
}

const TAB_CONFIGS: Record<string, TabConfig> = {
  index: {
    label: "Home",
    family: "Ionicons",
    activeIcon: "home",
    inactiveIcon: "home-outline",
  },
  learn: {
    label: "Learn",
    family: "Ionicons",
    activeIcon: "book",
    inactiveIcon: "book-outline",
  },
  "ai-teacher": {
    label: "AI Teacher",
    family: "MaterialCommunityIcons",
    activeIcon: "face-agent",
    inactiveIcon: "face-agent",
  },
  chat: {
    label: "Chat",
    family: "Ionicons",
    activeIcon: "chatbubble",
    inactiveIcon: "chatbubble-outline",
  },
  profile: {
    label: "Profile",
    family: "Ionicons",
    activeIcon: "person",
    inactiveIcon: "person-outline",
  },
};

function TabIcon({
  name,
  family,
  color,
  size = 24,
}: {
  name: string;
  family: IconFamily;
  color: string;
  size?: number;
}) {
  if (family === "MaterialCommunityIcons") {
    return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
  }
  return <Ionicons name={name as any} size={size} color={color} />;
}

interface TabItemProps {
  routeKey: string;
  routeName: string;
  index: number;
  isFocused: boolean;
  onPress: () => void;
  config: TabConfig;
  activeIndexShared: SharedValue<number>;
}

function TabItem({
  routeKey,
  routeName,
  index,
  isFocused,
  onPress,
  config,
  activeIndexShared,
}: TabItemProps) {
  // Animated translation specifically for the icon container
  const animatedIconStyle = useAnimatedStyle(() => {
    const distance = Math.abs(activeIndexShared.value - index);
    // progress = 1 when fully active, 0 when inactive (distance >= 0.5)
    const progress = interpolate(distance, [0, 0.5], [1, 0], "clamp");

    // Confined to the compact 66px vertical center
    const iconTranslateY = interpolate(progress, [0, 1], [-6, 0], "clamp");

    return {
      transform: [{ translateY: iconTranslateY }],
    };
  });

  const whiteIconStyle = useAnimatedStyle(() => {
    const distance = Math.abs(activeIndexShared.value - index);
    const opacity = interpolate(distance, [0, 0.4], [1, 0], "clamp");
    return { opacity };
  });

  const grayIconStyle = useAnimatedStyle(() => {
    const distance = Math.abs(activeIndexShared.value - index);
    const opacity = interpolate(distance, [0, 0.4], [0, 1], "clamp");
    return { opacity };
  });

  const labelStyle = useAnimatedStyle(() => {
    const distance = Math.abs(activeIndexShared.value - index);
    const opacity = interpolate(distance, [0, 0.4], [0, 1], "clamp");
    const translateY = interpolate(distance, [0, 0.4], [6, 0], "clamp");

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="flex-1 items-center justify-center h-full"
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={config.label}
    >
      <View style={styles.itemContainer}>
        {/* Animated Icon Container */}
        <Animated.View style={[animatedIconStyle, styles.iconContainer]}>
          <Animated.View style={[StyleSheet.absoluteFill, whiteIconStyle, styles.iconCenter]}>
            <TabIcon name={config.activeIcon} family={config.family} color="#FFFFFF" size={24} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, grayIconStyle, styles.iconCenter]}>
            <TabIcon name={config.inactiveIcon} family={config.family} color="#9CA3AF" size={24} />
          </Animated.View>
        </Animated.View>

        {/* Text Label */}
        <Animated.View style={[labelStyle, styles.labelContainer]}>
          <Text className="font-caption text-neutral-text-secondary text-[11px] font-semibold">
            {config.label}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeIndexShared = useSharedValue(state.index);

  // Reduce the bottom inset slightly to push the tab bar down and minimize blank space
  const bottomInset = insets.bottom > 0 ? insets.bottom - 12 : 0;

  useEffect(() => {
    activeIndexShared.value = withTiming(state.index, {
      duration: 200,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  }, [state.index, activeIndexShared]);

  // Animated style for the sliding active background circle
  const indicatorStyle = useAnimatedStyle(() => {
    const translateX = activeIndexShared.value * TAB_WIDTH + (TAB_WIDTH - CIRCLE_SIZE) / 2;
    const translateY = (TAB_BAR_HEIGHT - CIRCLE_SIZE) / 2;

    return {
      transform: [
        { translateX },
        { translateY },
      ],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          height: TAB_BAR_HEIGHT + bottomInset,
          paddingBottom: bottomInset,
        },
      ]}
    >
      {/* Animated Active Background Circle */}
      <Animated.View style={[styles.indicator, indicatorStyle]} />

      {/* Tab Buttons Container */}
      <View style={{ flexDirection: "row", width: "100%", height: TAB_BAR_HEIGHT }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const config = TAB_CONFIGS[route.name] || {
            label: options.title || route.name,
            family: "Ionicons",
            activeIcon: "help-circle-outline",
            inactiveIcon: "help-circle-outline",
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabItem
              key={route.key}
              routeKey={route.key}
              routeName={route.name}
              index={index}
              isFocused={isFocused}
              onPress={onPress}
              config={config}
              activeIndexShared={activeIndexShared}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    position: "relative",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 8,
  },
  indicator: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#6C4EF5",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 8, // Snug label positioning
  },
});
