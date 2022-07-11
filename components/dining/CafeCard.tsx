import React, { createRef, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewStyle,
  ViewProps,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
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
import { SharedElement } from "react-navigation-shared-element";

import CafeCardStatus from "./CafeCardStatus";
import { Text, StarIcon, ForegroundView } from "../Themed";
import { Cafe, DiningStackParamList } from "../../types";
import { useCafeStore } from "../../store";

type DiningScreenNavigationProp = StackNavigationProp<
  DiningStackParamList,
  "Dining"
>;
interface CafeCardProps extends ViewProps {
  cafe: Cafe;
  navigation: DiningScreenNavigationProp;
}

const CafeCard: React.FC<CafeCardProps> = ({ navigation, cafe }) => {
  const isDarkTheme = useTheme().dark;
  const { id, name, hours }: Cafe = cafe;
  const { starred, addStar, delStar } = useCafeStore();

  /* `true` if the cafe is operating today, `false` otherwise. */
  const isOpenToday: boolean = hours.length > 0;
  /* The card's width and height, derived from its content's height. */
  const [cardSize, setCardSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const cardPaddingHorizontal = 18;
  const btnWidth = 35;

  const starBtnRef = createRef<TapGestureHandler>();

  /* On card press, start the animation. */
  const tapProgress = useSharedValue<number>(0);
  const onCardPress = ({ nativeEvent }: TapGestureHandlerGestureEvent) => {
    if (nativeEvent.state == State.BEGAN) {
      tapProgress.value = withTiming(1, { duration: 100 });
    }
    if (nativeEvent.state == State.FAILED || nativeEvent.state == State.END) {
      tapProgress.value = withTiming(0, { duration: 100 });
      if (nativeEvent.state == State.END) navigation.navigate("Menu", { cafe });
    }
  };

  /* On star press, toggle the `starred` value. */
  const onStarPress = ({ nativeEvent }: TapGestureHandlerGestureEvent) => {
    if (nativeEvent.state == State.END)
      starred.includes(id) ? delStar(id) : addStar(id);
  };

  /* Card press animation styles. */
  const animatedStyles = useAnimatedStyle<ViewStyle>(() => ({
    shadowOffset: { width: 0, height: 5 - 3 * tapProgress.value },
    shadowOpacity: isDarkTheme ? 0 : 0.2 + 0.1 * tapProgress.value,
    shadowRadius: 4 - 2 * tapProgress.value,
    transform: [
      { scale: 1 - 0.025 * tapProgress.value },
      { translateY: 2 * tapProgress.value },
    ],
  }));

  /* On content layout, set the card height. */
  const onContentLayout = (evt: LayoutChangeEvent) => {
    const { width, height } = evt.nativeEvent.layout;
    setCardSize({ width, height });
  };

  return (
    <TapGestureHandler waitFor={starBtnRef} onHandlerStateChange={onCardPress}>
      <Animated.View
        style={[
          animatedStyles,
          styles.animatedCtr,
          { opacity: isOpenToday ? 1 : 0.5 },
        ]}
      >
        <SharedElement id={`${id}.card`}>
          <ForegroundView
            style={[styles.cardCtr, { height: cardSize.height }]}
          />
        </SharedElement>
        <View
          onLayout={onContentLayout}
          style={[
            styles.contentCtr,
            { paddingHorizontal: cardPaddingHorizontal },
          ]}
        >
          <View style={styles.cardHdr}>
            <SharedElement id={`${id}.title`}>
              <Text
                style={[
                  styles.cardTitle,
                  {
                    maxWidth:
                      cardSize.width - cardPaddingHorizontal * 2 - btnWidth,
                  },
                ]}
                numberOfLines={1}
              >
                {name}
              </Text>
            </SharedElement>
            <TapGestureHandler
              onHandlerStateChange={onStarPress}
              ref={starBtnRef}
            >
              <View style={[styles.btnCtr, { width: btnWidth }]}>
                <SharedElement id={`${id}.star`}>
                  <StarIcon starred={starred.includes(id)} />
                </SharedElement>
              </View>
            </TapGestureHandler>
          </View>
          <View style={styles.cardSection}>
            <SharedElement id={`${id}.status`}>
              <CafeCardStatus hours={hours} />
            </SharedElement>
          </View>
        </View>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  animatedCtr: {
    marginBottom: 20,
  },
  cardCtr: {
    borderRadius: 12,
  },
  contentCtr: {
    position: "absolute",
    width: "100%",
    paddingVertical: 15,
  },
  cardHdr: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  btnCtr: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  cardSection: {
    flexDirection: "row",
    marginBottom: 5,
  },
});

export default CafeCard;
