import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { SettingsStackParamList } from "../../types";

type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  "Settings"
>;
interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}
const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen!</Text>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
