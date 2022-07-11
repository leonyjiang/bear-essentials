import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";

interface LoadingStateProps {
  lightColor?: string;
  darkColor?: string;
}
const LoadingState = ({ lightColor, darkColor }: LoadingStateProps) => {
  return (
    <View
      style={styles.container}
      lightColor={lightColor}
      darkColor={darkColor}
    >
      <Text style={styles.message}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
  },
});

export default LoadingState;
