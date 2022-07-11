import React from "react";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import { Diet } from "../../types";
import { getDietaryTagBgColor } from "../../utils/dining";

interface DietaryTagProps {
  diet: Diet;
  style: ViewStyle;
}
const DietaryTag = ({ diet, style }: DietaryTagProps) => {
  return (
    <View
      style={[
        styles.ctr,
        { backgroundColor: getDietaryTagBgColor(diet) },
        style,
      ]}
    >
      <Text style={styles.txt}>{diet}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ctr: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "#fff",
    fontSize: 12,
  },
});

export default DietaryTag;
