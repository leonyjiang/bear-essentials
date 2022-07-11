import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList, Tab } from "../types";
import { MapsScreen } from "../screens";
import SettingsStackNavigator from "./SettingsStackNavigator";
import { Layout } from "../constants";
import DiningStack from "./DiningStackNavigator";
import { getTabBarIcon } from "../utils/navigation";
import LaundryStack from "./LaundryStackNavigator";

const { getBottomTabBarHeight, getTabBarPadding } = Layout;
/*
 * Bottom tabs for navigation across tabs.
 */
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
/*
 * Bottom tab navigator.
 */
export default function BottomTabNavigator() {
  const isDarkTheme: boolean = useColorScheme() === "dark";
  const tabBarPadding = getTabBarPadding();
  return (
    <BottomTab.Navigator
      initialRouteName={Tab.DINING}
      tabBarOptions={{
        showLabel: false,
        style: {
          height: getBottomTabBarHeight(),
          paddingTop: tabBarPadding.top,
          paddingBottom: tabBarPadding.bottom,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) =>
          getTabBarIcon(route.name, focused, isDarkTheme),
      })}
    >
      <BottomTab.Screen name={Tab.DINING} component={DiningStack} />
      <BottomTab.Screen name={Tab.LAUNDRY} component={LaundryStack} />
      <BottomTab.Screen name={Tab.MAPS} component={MapsScreen} />
      <BottomTab.Screen
        name={Tab.SETTINGS}
        component={SettingsStackNavigator}
      />
    </BottomTab.Navigator>
  );
}
