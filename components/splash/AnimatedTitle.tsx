import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { TextProps } from "../../components/Themed";
import { AnimatedLetter } from "../common";
import { Strings } from "../../constants";

const { appName } = Strings;
const wordLength = appName.length;

interface AnimatedTitleProps extends TextProps {
  /*
   * The animation value for the title animation. Values [0, 0.5] are used for
   * the enter animation, and values [0.5, 1] are used for the exit animation.
   */
  progress: Animated.SharedValue<number>;
  /*
   * The from-value for the animation.
   */
  fromValue: number;
  /*
   * The midpoint value for the animation.
   */
  midValue: number;
  /*
   * The to-value for the animation.
   */
  toValue: number;
}
/*
 * The animated title on the splash screen. It receives the `progress` prop from
 * its parent, the splash screen.
 */
const AnimatedTitle = ({
  progress,
  fromValue,
  midValue,
  toValue,
  style,
}: AnimatedTitleProps) => {
  /*
   * The interval of progress over which each letter will animate.
   */
  const interval = (midValue - fromValue) / wordLength;
  /*
   * The interpolated animation value for the second half of the title animation
   * during which the entire title exits.
   */
  const exitProgress = useDerivedValue<number>(() =>
    Easing.out(Easing.cubic)(
      interpolate(
        progress.value,
        [midValue, toValue],
        [1, 0],
        Extrapolate.CLAMP
      )
    )
  );
  /*
   * The animated exit style for the entire title.
   */
  const exitAnimationStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: exitProgress.value,
  }));
  return (
    <Animated.View style={[style, styles.container, exitAnimationStyle]}>
      {appName.split("").map((letter, key) => (
        <AnimatedLetter
          progress={progress}
          interval={interval}
          fromValue={fromValue}
          index={key}
          key={key}
          style={style}
        >
          {letter}
        </AnimatedLetter>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default AnimatedTitle;
