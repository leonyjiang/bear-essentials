import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";
import {
  CafeState,
  LaundryState,
  MapsState,
  SettingsState,
  CafeId,
  Tab,
  MapFeature,
} from "./types";

/*
 * Store for cafe state.
 */
export const useCafeStore = create<CafeState>(
  persist(
    (set) => ({
      starred: [],
      addStar: (cafeId: CafeId) =>
        set(({ starred }) => ({ starred: starred.concat(cafeId) })),
      delStar: (cafeId: CafeId) =>
        set(({ starred }) => ({
          starred: starred.filter((id) => id !== cafeId),
        })),
      clearStars: () => set({ starred: [] }),
    }),
    { name: "bear-essentials-cafe", getStorage: () => AsyncStorage }
  )
);
/*
 * Store for laundry state.
 */
export const useLaundryStore = create<LaundryState>(
  persist(
    (set) => ({
      starred: [],
      addStar: (laundryId: string) =>
        set(({ starred }) => ({ starred: starred.concat(laundryId) })),
      delStar: (laundryId: string) =>
        set(({ starred }) => ({
          starred: starred.filter((id) => id !== laundryId),
        })),
      clearStars: () => set({ starred: [] }),
    }),
    { name: "bear-essentials-laundry", getStorage: () => AsyncStorage }
  )
);
/*
 * Store for maps state.
 */
export const useMapsStore = create<MapsState>(
  persist(
    (set) => ({
      filters: [],
      addFilter: (filter: MapFeature) =>
        set((state) => ({ filters: state.filters.concat(filter) })),
      delFilter: (filter: MapFeature) =>
        set((state) => ({
          filters: state.filters.filter((id) => id !== filter),
        })),
      clearFilters: () => set((_) => ({ filters: [] })),
    }),
    { name: "bear-essentials-maps", getStorage: () => AsyncStorage }
  )
);
/*
 * Store for settings state.
 */
const DEFAULT_LANDING_TAB: Tab = Tab.DINING;
export const useSettingsStore = create<SettingsState>(
  persist(
    (set) => ({
      landingTab: DEFAULT_LANDING_TAB,
      setLandingTab: (tab: Tab) => set({ landingTab: tab }),
      resetToDefaults: () => set({ landingTab: DEFAULT_LANDING_TAB }),
    }),
    { name: "bear-essentials-settings", getStorage: () => AsyncStorage }
  )
);
