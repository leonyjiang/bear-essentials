import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

const MapsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maps Screen!</Text>
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

export default MapsScreen;
