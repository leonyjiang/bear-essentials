import * as React from "react";
import {
  Text as DefaultText,
  TouchableOpacity as DefaultTouchableOpacity,
  View as DefaultView,
} from "react-native";
import Svg, { G, Path, SvgProps } from "react-native-svg";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function Title(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ForegroundView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "foreground"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function PrimaryTouchableOpacity(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );

  return (
    <DefaultTouchableOpacity
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}

export function BackIcon(props: SvgProps) {
  const { style } = props;
  const strokeColor = useThemeColor({}, "primary");

  return (
    <Svg width="9.414" height="16.828" viewBox="0 0 9.414 16.828" style={style}>
      <G transform="translate(1 1.414)">
        <Path
          d="M0,7,7,0l7,7"
          transform="translate(0 14) rotate(-90)"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </G>
    </Svg>
  );
}

interface StarIconProps extends SvgProps {
  starred: boolean;
}
export function StarIcon({ style, starred }: StarIconProps) {
  const starColor = useThemeColor({}, "star");

  return (
    <Svg
      width={27.538}
      height={26.531}
      viewBox="0 0 27.538 26.531"
      style={style}
    >
      <G transform="translate(0.769 0.75)">
        <Path
          d="M13.047.869,9.873,7.334l-7.1,1.04a1.565,1.565,0,0,0-.86,2.666L7.05,16.069l-1.215,7.1A1.556,1.556,0,0,0,8.09,24.82l6.352-3.355,6.352,3.355a1.557,1.557,0,0,0,2.255-1.646l-1.215-7.1L26.97,11.04a1.565,1.565,0,0,0-.86-2.666l-7.1-1.04L15.836.869A1.553,1.553,0,0,0,13.047.869Z"
          transform="translate(-1.441 0.001)"
          fill={starred ? starColor : "none"}
          stroke={starred ? starColor : "#ddd"}
          stroke-width={2}
        />
      </G>
    </Svg>
  );
}
