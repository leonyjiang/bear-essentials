import React, { createRef, useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  ViewProps,
  LayoutChangeEvent,
} from "react-native";
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";

import { Text, StarIcon, ForegroundView } from "../Themed";
import { useLaundryStore } from "../../store";
import { LaundryRoom, LaundryStackParamList } from "../../types";
import { useTheme } from "@react-navigation/native";
import { laundryIdToLaundryName } from "../../utils/laundry";

type LaundryScreenNavigationProp = StackNavigationProp<
  LaundryStackParamList,
  "Laundry"
>;
interface LaundryCardProps extends ViewProps {
  room: LaundryRoom;
  navigation: LaundryScreenNavigationProp;
}
const LaundryCard: React.FC<LaundryCardProps> = ({ navigation, room }) => {
  const isDarkTheme = useTheme().dark;
  const { id }: LaundryRoom = room;
  const cardPaddingHorizontal = 18;
  const btnWidth = 35;

  const { starred, addStar, delStar } = useLaundryStore();
  /* The card's width and height, derived from its content's height. */
  const [cardSize, setCardSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  /* Tells the card's `TapGestureHandler` to `waitFor` star taps first. */
  const starBtnRef = createRef<TapGestureHandler>();
  /* Animation value for tapping the card. */
  const tapProgress = useSharedValue<number>(0);

  /* On card press, start the animation. */
  const onCardPress = ({ nativeEvent }: TapGestureHandlerGestureEvent) => {
    if (nativeEvent.state == State.BEGAN) {
      tapProgress.value = withTiming(1, { duration: 100 });
    }
    if (nativeEvent.state == State.FAILED || nativeEvent.state == State.END) {
      tapProgress.value = withTiming(0, { duration: 100 });
      if (nativeEvent.state == State.END) navigation.navigate("Room", { room });
    }
  };

  /* On star press, toggle the `starred` value. */
  const onStarPress = ({ nativeEvent }: TapGestureHandlerGestureEvent) => {
    if (nativeEvent.state == State.END)
      if (starred.includes(id)) {
        delStar(id);
      } else {
        addStar(id);
      }
  };

  /* Card press animation styles. */
  const animatedStyles = useAnimatedStyle<ViewStyle>(() => ({
    shadowOffset: { width: 0, height: 5 - 3 * tapProgress.value },
    shadowOpacity: isDarkTheme ? 0 : 0.2 + 0.1 * tapProgress.value,
    shadowRadius: 4 - 2 * tapProgress.value,
    transform: [{ scale: 1 - 0.025 * tapProgress.value }],
  }));

  /* On content layout, set the card height. */
  const onContentLayout = (evt: LayoutChangeEvent) => {
    const { width, height } = evt.nativeEvent.layout;
    setCardSize({ width, height });
  };

  return (
    <TapGestureHandler waitFor={starBtnRef} onHandlerStateChange={onCardPress}>
      <Animated.View style={[animatedStyles, styles.animationContainer]}>
        <SharedElement id={`${id}.card`}>
          <ForegroundView
            style={[styles.cardContainer, { height: cardSize.height }]}
          />
        </SharedElement>
        <View
          onLayout={onContentLayout}
          style={[
            styles.contentContainer,
            { paddingHorizontal: cardPaddingHorizontal },
          ]}
        >
          <View style={styles.cardHeader}>
            <SharedElement id={`${id}.title`}>
              <Text
                style={[
                  styles.cardTitle,
                  {
                    maxWidth:
                      cardSize.width - cardPaddingHorizontal * 2 - btnWidth,
                  },
                ]}
                numberOfLines={2}
              >
                {laundryIdToLaundryName(room)}
              </Text>
            </SharedElement>
            <TapGestureHandler
              onHandlerStateChange={onStarPress}
              ref={starBtnRef}
            >
              <View style={[styles.buttonContainer, { width: btnWidth }]}>
                <SharedElement id={`${id}.star`}>
                  <StarIcon starred={starred.includes(id)} />
                </SharedElement>
              </View>
            </TapGestureHandler>
          </View>
        </View>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    marginBottom: 20,
  },
  cardContainer: {
    borderRadius: 12,
  },
  contentContainer: {
    position: "absolute",
    width: "100%",
    paddingVertical: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  cardSection: {
    flexDirection: "row",
    marginBottom: 5,
  },
});

export default LaundryCard;
