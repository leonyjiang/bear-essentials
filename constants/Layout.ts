import { Dimensions } from "react-native";
import * as Device from "expo-device";

// Screen information.
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// Device information.
const os = Device.osName;
const modelName = Device.modelName;

/*
 * Returns the appropriate height of the bottom tabs for the user's device.
 */
const getBottomTabBarHeight = (): number => {
  if (os === "iOS") {
    switch (modelName) {
      case "iPhone 11":
        return 81;
      case "iPhone 8":
        return 69;
      default:
        return 75;
    }
  }
  if (os === "Android") {
    return 75;
  }
  return 75;
};

/*
 * Returns the appropriate padding of the bottom tabs for the user's device.
 */
const getTabBarPadding = () => {
  if (os === "iOS") {
    switch (modelName) {
      case "iPhone 11":
        return { top: 0, bottom: 20 };
      case "iPhone 8":
        return { top: 0, bottom: 7 };
      default:
        return { top: 0, bottom: 0 };
    }
  }
  if (os === "Android") {
    switch (modelName) {
      default:
        return { top: 0, bottom: 0 };
    }
  }
  return { top: 0, bottom: 0 };
};

export default {
  window: {
    width,
    height,
  },
  getBottomTabBarHeight,
  getTabBarPadding,
};
