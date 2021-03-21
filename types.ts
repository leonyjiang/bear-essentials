/*
 * react-navigation types
 */
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};
export type BottomTabParamList = {
  Dining: undefined;
  Laundry: undefined;
  Maps: undefined;
  Settings: undefined;
};
export type SettingsStackParamList = {
  Settings: undefined;
  Developers: undefined;
};
export enum Tab {
  DINING = "Dining",
  LAUNDRY = "Laundry",
  MAPS = "Maps",
  SETTINGS = "Settings",
}
