import React from "react";
import { Easing } from "react-native-reanimated";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { DiningScreen, MenuScreen } from "../screens";
import { DiningStackParamList } from "../types";

const Stack = createSharedElementStackNavigator<DiningStackParamList>();

const config = { duration: 200, easing: Easing.inOut(Easing.ease) };
const DiningStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dining"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        gestureEnabled: false,
        cardStyle: { backgroundColor: "transparent" },
        transitionSpec: {
          open: { animation: "timing", config },
          close: { animation: "timing", config },
        },
      }}
      mode="modal"
    >
      <Stack.Screen name="Dining" component={DiningScreen} />
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        sharedElementsConfig={(route) => {
          const { id } = route.params.cafe;
          return [`${id}.card`, `${id}.title`, `${id}.star`, `${id}.status`];
        }}
      />
    </Stack.Navigator>
  );
};

export default DiningStack;
