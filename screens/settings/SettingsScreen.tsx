import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenHeader } from "../../components";

import { Text, View } from "../../components/Themed";
import { SettingsStackParamList, Tab } from "../../types";

type SettingsScreenRouteProp = RouteProp<SettingsStackParamList, "Settings">;
type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  "Settings"
>;
interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
}
const SettingsScreen = ({ navigation, route }: SettingsScreenProps) => {
  const tab: Tab = route.name as Tab;
  const headerPaddingTop = useSafeAreaInsets().top;
  return (
    <View style={styles.container}>
      <ScreenHeader
        style={[styles.header, { paddingTop: headerPaddingTop + 15 }]}
        searchable={false}
        tab={tab}
      />
      <Text style={styles.title}>Settings!</Text>
      <Button
        title="Go to developers screen!"
        onPress={() => navigation.navigate("Developers")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingHorizontal: 18,
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
