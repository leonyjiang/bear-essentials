import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList, Tab } from "../types";
import { DiningScreen, LaundryScreen, MapsScreen } from "../screens";
import SettingsStackNavigator from "./SettingsStackNavigator";
import { getTabBarIcon } from "../utils";
import { Layout } from "../constants";

const { bottomTabBarHeight } = Layout;
/*
 * Bottom tabs for navigation across tabs.
 */
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
/*
 * Bottom tab navigator.
 */
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  return (
    <BottomTab.Navigator
      initialRouteName={Tab.DINING}
      tabBarOptions={{
        showLabel: false,
        style: { height: bottomTabBarHeight, paddingTop: 3 },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) =>
          getTabBarIcon(route.name, focused, isDarkTheme),
      })}
    >
      <BottomTab.Screen name={Tab.DINING} component={DiningScreen} />
      <BottomTab.Screen name={Tab.LAUNDRY} component={LaundryScreen} />
      <BottomTab.Screen name={Tab.MAPS} component={MapsScreen} />
      <BottomTab.Screen
        name={Tab.SETTINGS}
        component={SettingsStackNavigator}
      />
    </BottomTab.Navigator>
  );
}
