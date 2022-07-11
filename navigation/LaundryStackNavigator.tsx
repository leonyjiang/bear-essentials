import React from "react";
import { Easing } from "react-native-reanimated";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { LaundryRoomScreen, LaundryScreen } from "../screens";
import { LaundryStackParamList } from "../types";

const Stack = createSharedElementStackNavigator<LaundryStackParamList>();

const config = { duration: 200, easing: Easing.inOut(Easing.ease) };
const LaundryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Laundry"
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
      <Stack.Screen name="Laundry" component={LaundryScreen} />
      <Stack.Screen
        name="Room"
        component={LaundryRoomScreen}
        sharedElementsConfig={(route) => {
          const { id } = route.params.cafe;
          return [`${id}.card`, `${id}.title`, `${id}.star`];
        }}
      />
    </Stack.Navigator>
  );
};

export default LaundryStack;
