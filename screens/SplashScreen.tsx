import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Easing,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { AnimatedTitle, AnimatedLogo } from "../components/splash";
import { View } from "../components/Themed";
import { Colors } from "../constants";

interface SplashScreenProps {
  /*
   * Callback to execute when the animation ends.
   */
  onAnimationEnd: (isFinished: boolean) => void;
}
/*
 * The app's splash screen, which is shown on launch and until initial resource
 * loading is complete, at which point the user is shown the home screen.
 */
const SplashScreen = ({ onAnimationEnd }: SplashScreenProps) => {
  // Below are values used in the splash screen animation.
  const fromValue: number = 0;
  const toValue: number = 1;
  const midValue: number = (toValue - fromValue) / 2;
  const progress = useSharedValue<number>(fromValue);

  // Various animation stop points, expressed as decimals.
  const logoEnterBeginStop: number = 0;
  const logoEnterEndStop: number = 0.1;
  const titleEnterBeginStop: number = 0.2;
  const titleEnterEndStop: number = 0.6;
  const exitBeginStop: number = 0.9;
  const titleExitEndStop: number = 0.91;
  const logoExitEndStop: number = 1;

  /*
   * The interpolated animation value for the logo's animation.
   */
  const logoProgress = useDerivedValue<number>(() =>
    interpolate(
      progress.value,
      // The values signify the two legs of the animation—enter and exit.
      [logoEnterBeginStop, logoEnterEndStop, exitBeginStop, logoExitEndStop],
      [fromValue, midValue, midValue, toValue]
    )
  );
  /*
   * The interpolated animation value for the title's animation.
   */
  const titleProgress = useDerivedValue<number>(() =>
    interpolate(
      progress.value,
      // The values signify the two legs of the animation—enter and exit.
      [titleEnterBeginStop, titleEnterEndStop, exitBeginStop, titleExitEndStop],
      [fromValue, midValue, midValue, toValue]
    )
  );

  // Run the animation one second after the splash screen mounts.
  useEffect(() => {
    progress.value = withDelay(
      1000,
      withTiming(
        toValue,
        {
          duration: 4500,
          easing: Easing.linear,
        },
        onAnimationEnd
      )
    );
  }, []);

  return (
    <View
      style={styles.container}
      lightColor={Colors.light.foreground}
      darkColor={Colors.dark.background}
    >
      <AnimatedLogo
        progress={logoProgress}
        fromValue={fromValue}
        midValue={midValue}
        toValue={toValue}
        style={styles.logo}
      />
      <AnimatedTitle
        progress={titleProgress}
        fromValue={fromValue}
        midValue={midValue}
        toValue={toValue}
        style={styles.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 100,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default SplashScreen;
