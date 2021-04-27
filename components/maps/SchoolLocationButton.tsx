import React from "react";
import { StyleSheet, ViewProps, ViewStyle } from "react-native";
import {
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Path } from "react-native-svg";

interface SchoolLocationButtonProps extends ViewProps {
  /*
   * Callback for when the button is pressed.
   */
  onPress: () => void;
}
/*
 * Button that sets the MapView's region to Brown's campus.
 */
const SchoolLocationButton: React.FC<SchoolLocationButtonProps> = ({
  style,
  onPress,
}) => {
  /*
   * Animation value for pressing of the button.
   */
  const progress = useSharedValue<number>(0);
  /*
   * Handler for state changes caused by tapping the button.
   */
  const onHandlerStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    // Start the animation if a tap is detected.
    if (nativeEvent.state == State.BEGAN) {
      progress.value = withTiming(1, {
        duration: 80,
      });
    }
    // End the animation if the tap gesture ended.
    if (
      nativeEvent.state == State.END ||
      nativeEvent.state == State.CANCELLED ||
      nativeEvent.state == State.FAILED
    ) {
      progress.value = withTiming(0, {
        duration: 80,
      });
      // Call `onPress()` if tap was successfully captured.
      if (nativeEvent.state == State.END) {
        onPress();
      }
    }
  };
  /*
   * Animated styles for tapping the button.
   */
  const animatedStyles = useAnimatedStyle<ViewStyle>(() => ({
    shadowRadius: 4 * progress.value + 2,
    shadowOffset: { width: 0, height: 4 * progress.value + 2 },
  }));

  return (
    <TapGestureHandler
      maxDeltaX={28}
      maxDeltaY={28}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={[styles.button, style, animatedStyles]}>
        <Svg width="24" height="13" viewBox="0 0 24 13" fill="#666">
          <G transform="translate(-50 -35)">
            <Path
              d="M507-1057s10.618,2.848,11.1,3,.9.375.9.75-.3.562-.9.75-11.1,3-11.1,3-10.419-2.785-11.1-3-.9-.375-.9-.75.336-.573.9-.75S507-1057,507-1057Z"
              transform="translate(-445 1092)"
            />
            <Path
              d="M505-1036l9,2.4,9-2.4v4.8c0,.6-3.9,2.4-9,2.4s-9-1.8-9-2.4Z"
              transform="translate(-452.002 1076.804)"
            />
          </G>
        </Svg>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.33,
  },
});

export default SchoolLocationButton;
