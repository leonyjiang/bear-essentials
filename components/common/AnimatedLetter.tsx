import React from "react";
import { ViewStyle } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { Text, TextProps } from "../Themed";

interface AnimatedLetterProps extends TextProps {
  /*
   * The animation progress for the entire word.
   */
  progress: Animated.SharedValue<number>;
  /*
   * The length of progress over which to interpolate.
   */
  interval: number;
  /*
   * The from-value for the animation.
   */
  fromValue: number;
  /*
   * The index of this letter within the word.
   */
  index: number;
}
/*
 * Renders a single animated letter of a word.
 */
const AnimatedLetter = ({
  progress,
  fromValue,
  interval,
  index,
  style,
  children,
}: AnimatedLetterProps) => {
  /*
   * The interpolated animation value for the first half of the title animation
   * during which the letters enter sequentially.
   */
  const enterProgress = useDerivedValue<number>(() =>
    interpolate(
      progress.value,
      [fromValue + index * interval, fromValue + (index + 1) * interval],
      [0, 1],
      Extrapolate.CLAMP
    )
  );
  /*
   * The animated enter styles for an individual letter.
   */
  const enterAnimationStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: enterProgress.value,
    transform: [{ translateY: -15 * enterProgress.value }],
  }));
  return (
    <Animated.View style={enterAnimationStyle}>
      <Text style={style}>{children}</Text>
    </Animated.View>
  );
};

export default AnimatedLetter;
