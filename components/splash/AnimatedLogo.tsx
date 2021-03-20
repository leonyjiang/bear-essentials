import React from "react";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { ViewStyle } from "react-native";

import { ViewProps } from "../Themed";
import Logo from "../../assets/svgs/logo.svg";

interface AnimatedLogoProps extends ViewProps {
  /*
   * The animation value for the logo animation. Values [0, 0.5] are used for
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
 * The animated logo on the splash screen. It receives the `progress` prop from
 * its parent, the splash screen.
 */
const AnimatedLogo = ({
  progress,
  fromValue,
  midValue,
  toValue,
  style,
}: AnimatedLogoProps) => {
  /*
   * The interpolated animation value for the first half of the logo animation
   * during which the logo enters.
   */
  const enterProgress = useDerivedValue<number>(() =>
    interpolate(
      progress.value,
      [fromValue, midValue],
      [0, 1],
      Extrapolate.CLAMP
    )
  );
  /*
   * The scale to which the logo animates when it exits.
   */
  const maxScale = 15;
  /*
   * The interpolated animation value for the second half of the logo animation
   * during which the logo exits.
   */
  const exitProgress = useDerivedValue<number>(() =>
    Easing.out(Easing.cubic)(
      interpolate(
        progress.value,
        [midValue, toValue],
        [0, 1],
        Extrapolate.CLAMP
      )
    )
  );
  /*
   * The animated enter styles for the logo.
   */
  const enterAnimationStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: enterProgress.value,
    transform: [{ translateY: 25 * enterProgress.value }],
  }));
  /*
   * The animated exit styles for the logo.
   */
  const exitAnimationStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: Easing.in(Easing.circle)(1 - exitProgress.value),
    transform: [
      { scale: (maxScale - 1) * exitProgress.value + 1 },
      { translateY: 25 },
    ],
  }));
  // original width and height: 179.866 x 125.848
  return (
    <Animated.View style={[style, enterAnimationStyle, exitAnimationStyle]}>
      <Logo width={214.385} height={150} />
    </Animated.View>
  );
};

export default AnimatedLogo;
