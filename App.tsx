import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { runOnJS } from "react-native-reanimated";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { SplashScreen } from "./screens";

export default function App() {
  let isLoadingComplete = useCachedResources();
  let colorScheme = useColorScheme();
  let [isAnimationComplete, setIsAnimationComplete] = useState(false);

  let onAnimationEnd = () => {
    "worklet";
    runOnJS(setIsAnimationComplete)(true);
  };

  if (!isLoadingComplete || !isAnimationComplete) {
    return <SplashScreen onAnimationEnd={onAnimationEnd} />;
  }
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
}
