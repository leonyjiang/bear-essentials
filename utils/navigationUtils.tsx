import React from "react";
import DiningIcon from "../assets/svgs/tab-icons/dining.svg";
import DiningActiveIcon from "../assets/svgs/tab-icons/dining-active.svg";
import DiningDarkIcon from "../assets/svgs/tab-icons/dining-dark.svg";
import DiningDarkActiveIcon from "../assets/svgs/tab-icons/dining-dark-active.svg";
import LaundryIcon from "../assets/svgs/tab-icons/laundry.svg";
import LaundryActiveIcon from "../assets/svgs/tab-icons/laundry-active.svg";
import LaundryDarkIcon from "../assets/svgs/tab-icons/laundry-dark.svg";
import LaundryDarkActiveIcon from "../assets/svgs/tab-icons/laundry-dark-active.svg";
import MapsIcon from "../assets/svgs/tab-icons/maps.svg";
import MapsActiveIcon from "../assets/svgs/tab-icons/maps-active.svg";
import MapsDarkIcon from "../assets/svgs/tab-icons/maps-dark.svg";
import MapsDarkActiveIcon from "../assets/svgs/tab-icons/maps-dark-active.svg";
import SettingsIcon from "../assets/svgs/tab-icons/settings.svg";
import SettingsActiveIcon from "../assets/svgs/tab-icons/settings-active.svg";
import SettingsDarkIcon from "../assets/svgs/tab-icons/settings-dark.svg";
import SettingsDarkActiveIcon from "../assets/svgs/tab-icons/settings-dark-active.svg";
import { Tab } from "../types";

/*
 * Returns the appropriate tab icon component for the given parameters.
 */
export const getTabBarIcon = (
  route: string,
  focused: boolean,
  isDarkTheme: boolean
) => {
  switch (route) {
    case Tab.DINING:
      return focused ? (
        isDarkTheme ? (
          <DiningDarkActiveIcon />
        ) : (
          <DiningActiveIcon />
        )
      ) : isDarkTheme ? (
        <DiningDarkIcon />
      ) : (
        <DiningIcon />
      );
    case Tab.LAUNDRY:
      return focused ? (
        isDarkTheme ? (
          <LaundryDarkActiveIcon />
        ) : (
          <LaundryActiveIcon />
        )
      ) : isDarkTheme ? (
        <LaundryDarkIcon />
      ) : (
        <LaundryIcon />
      );
    case Tab.MAPS:
      return focused ? (
        isDarkTheme ? (
          <MapsDarkActiveIcon />
        ) : (
          <MapsActiveIcon />
        )
      ) : isDarkTheme ? (
        <MapsDarkIcon />
      ) : (
        <MapsIcon />
      );
    case Tab.SETTINGS:
      return focused ? (
        isDarkTheme ? (
          <SettingsDarkActiveIcon />
        ) : (
          <SettingsActiveIcon />
        )
      ) : isDarkTheme ? (
        <SettingsDarkIcon />
      ) : (
        <SettingsIcon />
      );
  }
};
