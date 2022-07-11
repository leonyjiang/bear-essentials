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
  const FROM_VALUE: number = 0;
  const TO_VALUE: number = 1;
  const MID_VALUE: number = (TO_VALUE - FROM_VALUE) / 2;
  let progress = useSharedValue<number>(FROM_VALUE);

  // Various animation stop points, expressed as decimals.
  const LOGO_ENTER_BEGIN_STOP: number = 0;
  const LOGO_ENTER_END_STOP: number = 0.1;
  const TITLE_ENTER_BEGIN_STOP: number = 0.2;
  const TITLE_ENTER_END_STOP: number = 0.6;
  const EXIT_BEGIN_STOP: number = 0.9;
  const TITLE_EXIT_END_STOP: number = 0.91;
  const LOGO_EXIT_END_STOP: number = 1;

  /*
   * The interpolated animation value for the logo's animation.
   */
  const logoProgress = useDerivedValue<number>(() =>
    interpolate(
      progress.value,
      // The values signify the two legs of the animation—enter and exit.
      [
        LOGO_ENTER_BEGIN_STOP,
        LOGO_ENTER_END_STOP,
        EXIT_BEGIN_STOP,
        LOGO_EXIT_END_STOP,
      ],
      [FROM_VALUE, MID_VALUE, MID_VALUE, TO_VALUE]
    )
  );
  /*
   * The interpolated animation value for the title's animation.
   */
  const titleProgress = useDerivedValue<number>(() =>
    interpolate(
      progress.value,
      // The values signify the two legs of the animation—enter and exit.
      [
        TITLE_ENTER_BEGIN_STOP,
        TITLE_ENTER_END_STOP,
        EXIT_BEGIN_STOP,
        TITLE_EXIT_END_STOP,
      ],
      [FROM_VALUE, MID_VALUE, MID_VALUE, TO_VALUE]
    )
  );

  // Run the animation one second after the splash screen mounts.
  useEffect(() => {
    progress.value = withDelay(
      1000,
      withTiming(
        TO_VALUE,
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
        fromValue={FROM_VALUE}
        midValue={MID_VALUE}
        toValue={TO_VALUE}
        style={styles.logo}
      />
      <AnimatedTitle
        progress={titleProgress}
        fromValue={FROM_VALUE}
        midValue={MID_VALUE}
        toValue={TO_VALUE}
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
