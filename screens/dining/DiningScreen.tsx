import React, { useEffect, useRef, useState } from "react";
import {
  LayoutAnimation,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  StyleSheet,
  UIManager,
} from "react-native";
import { RouteProp, useScrollToTop } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";

import {
  CafeCard,
  LoadingState,
  NonIdealState,
  ScreenHeader,
  View,
} from "../../components";
import { Cafe, DiningStackParamList, Screen, Tab } from "../../types";
import { useCafeStore } from "../../store";
import { useInterval } from "../../hooks";
import { fetchCafes, sortCafes } from "../../utils/dining";

/* Enable animations on Android: https://reactnative.dev/docs/layoutanimation */
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type DiningScreenRouteProp = RouteProp<DiningStackParamList, "Dining">;
type DiningScreenNavigationProp = StackNavigationProp<
  DiningStackParamList,
  "Dining"
>;
interface DiningScreenProps {
  navigation: DiningScreenNavigationProp;
  route: DiningScreenRouteProp;
}

const DiningScreen = ({ navigation, route }: DiningScreenProps) => {
  const tab: Tab = route.name as Tab;
  const hdrPaddingTop = useSafeAreaInsets().top;
  const { starred } = useCafeStore();
  const y = useSharedValue<number>(0);

  /* The cafes data to display—`undefined` means the data is being fetched, and
   * `null` means the data is unavailable. */
  const [cafes, setCafes] = useState<Cafe[] | null | undefined>();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const listRef = useRef(null);
  useScrollToTop(listRef);

  const layoutAnimationConfig = LayoutAnimation.create(
    250,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity
  );

  /* On initial mount, load cafe data. */
  useEffect(() => {
    fetchCafes()
      .then((data: Cafe[]) => {
        LayoutAnimation.configureNext(layoutAnimationConfig);
        setCafes(sortCafes(data, starred));
      })
      .catch(() => setCafes(null));
  }, []);

  /* Auto-refresh data once a minute. */
  const refreshInterval = 60000;
  useInterval(() => {
    fetchCafes()
      .then((data: Cafe[]) => {
        LayoutAnimation.configureNext(layoutAnimationConfig);
        setCafes(sortCafes(data, starred));
      })
      .catch(() => setCafes(null));
  }, refreshInterval);

  /* On refresh, reload cafe data. */
  const onRefresh = () => setRefreshing(true);
  useEffect(() => {
    if (refreshing) {
      if (!cafes) setCafes(undefined);
      fetchCafes()
        .then((data: Cafe[]) => {
          LayoutAnimation.configureNext(layoutAnimationConfig);
          setCafes(sortCafes(data, starred));
        })
        .catch(() => setCafes(null))
        .finally(() => setRefreshing(false));
    }
  }, [refreshing]);

  /* When `starred` is updated, re-sort the displayed `cafes`. */
  useEffect(() => {
    if (cafes) {
      LayoutAnimation.configureNext(layoutAnimationConfig);
      setCafes(sortCafes(cafes, starred));
    }
  }, [starred]);

  /* Update `y` on scroll to collapse screen header. */
  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    y.value = nativeEvent.contentOffset.y;
  };

  /* Render each `Cafe` as a `CafeCard`. */
  const renderItem: ListRenderItem<Cafe> = ({ item: cafe }) => {
    return <CafeCard navigation={navigation} cafe={cafe} />;
  };

  return (
    <View style={styles.ctr}>
      <ScreenHeader style={{ paddingTop: hdrPaddingTop + 10 }} tab={tab} />
      <FlatList<Cafe>
        keyExtractor={(cafe: Cafe) => cafe.id}
        data={cafes}
        style={styles.listCtr}
        contentContainerStyle={cafes ? styles.listContentCtr : styles.ctr}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        onScroll={onScroll}
        ListEmptyComponent={
          cafes === null ? (
            <NonIdealState screen={Screen.DINING} />
          ) : (
            <LoadingState />
          )
        }
        ref={listRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ctr: {
    flex: 1,
  },
  listCtr: {
    width: "100%",
  },
  listContentCtr: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 5,
  },
});

export default DiningScreen;
