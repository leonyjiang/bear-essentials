import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SettingsStackParamList } from "../types";
import { DevelopersScreen, SettingsScreen } from "../screens";

const SettingsTabStack = createStackNavigator<SettingsStackParamList>();

export default function SettingsStackNavigator() {
  return (
    <SettingsTabStack.Navigator initialRouteName="Settings">
      <SettingsTabStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsTabStack.Screen name="Developers" component={DevelopersScreen} />
    </SettingsTabStack.Navigator>
  );
}
