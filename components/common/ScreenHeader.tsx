import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, ViewProps } from "react-native";
import { Title, useThemeColor, View } from "../Themed";
import { Tab } from "../../types";
import { useTheme } from "@react-navigation/native";

interface ScreenHeaderProps extends ViewProps {
  tab: Tab;
}
const ScreenHeader = ({ tab, style }: ScreenHeaderProps) => {
  const isDarkTheme: boolean = useTheme().dark;
  const [hdrHeight, setHdrHeight] = useState<number>(0);

  const onLayoutChange = (e: LayoutChangeEvent) => {
    setHdrHeight(e.nativeEvent.layout.height);
  };

  return (
    <View
      style={[
        styles.ctr,
        style,
        {
          backgroundColor: useThemeColor({}, "main"),
          shadowColor: useThemeColor({}, "main"),
          shadowOpacity: isDarkTheme ? 0 : 1,
          shadowOffset: { width: 0, height: hdrHeight / 8 },
          shadowRadius: hdrHeight / 16,
        },
      ]}
      onLayout={onLayoutChange}
    >
      <Title style={styles.title}>{tab}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  ctr: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 1,
  },
  title: {
    fontWeight: "800",
    fontSize: 34,
  },
});

export default ScreenHeader;
