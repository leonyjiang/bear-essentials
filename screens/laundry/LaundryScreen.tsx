import { RouteProp, useScrollToTop } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  LayoutAnimation,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  LaundryCard,
  LoadingState,
  NonIdealState,
  ScreenHeader,
} from "../../components";

import { View } from "../../components/Themed";
import { useLaundryStore } from "../../store";
import { LaundryRoom, Tab, Screen, LaundryStackParamList } from "../../types";
import { fetchAllLaundry, sortRooms } from "../../utils/laundry";

type LaundryScreenRouteProp = RouteProp<LaundryStackParamList, "Laundry">;
type LaundryScreenNavigationProp = StackNavigationProp<
  LaundryStackParamList,
  "Laundry"
>;
interface LaundryScreenProps {
  navigation: LaundryScreenNavigationProp;
  route: LaundryScreenRouteProp;
}
const LaundryScreen = ({ route, navigation }: LaundryScreenProps) => {
  const tab: Tab = route.name as Tab;
  const hdrPaddingTop = useSafeAreaInsets().top;
  const { starred } = useLaundryStore();
  const y = useSharedValue<number>(0);

  /* The laundry data to show—`undefined` means the data has not been fetched,
   * and `null` means the data is unavailable. */
  const [rooms, setRooms] = useState<LaundryRoom[] | null | undefined>();
  /* List refresh state—`true` during refresh, `false` otherwise. */
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const listRef = useRef(null);
  useScrollToTop(listRef);

  const layoutAnimationConfig = LayoutAnimation.create(
    250,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity
  );

  /*
   * On initial mount, load laundry data.
   */
  useEffect(() => {
    fetchAllLaundry()
      .then((data: LaundryRoom[]) => {
        LayoutAnimation.configureNext(layoutAnimationConfig);
        setRooms(sortRooms(data, starred));
      })
      .catch(() => setRooms(null));
  }, []);
  /*
   * On refresh, reload cafe data.
   */
  useEffect(() => {
    if (refreshing) {
      if (!rooms) setRooms(undefined);
      fetchAllLaundry()
        .then((data: LaundryRoom[]) => {
          LayoutAnimation.configureNext(layoutAnimationConfig);
          setRooms(sortRooms(data, starred));
        })
        .catch(() => setRooms(null))
        .finally(() => setRefreshing(false));
    }
  }, [refreshing]);
  /*
   * On refresh, set `refreshing` to `true`.
   */
  const onRefresh = () => {
    setRefreshing(true);
  };

  /*
   * On `starred` change, update `cafes`.
   */
  useEffect(() => {
    if (rooms) {
      LayoutAnimation.configureNext(layoutAnimationConfig);
      setRooms(sortRooms(rooms, starred));
    }
  }, [starred]);

  /*
   * Update `y` on scroll to hide header.
   */
  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    y.value = nativeEvent.contentOffset.y;
  };

  /*
   * Render each `LaundryRoom` as a `LaundryCard`.
   */
  const renderItem: ListRenderItem<LaundryRoom> = ({ item: room }) => {
    return <LaundryCard navigation={navigation} room={room} />;
  };

  return (
    <View style={styles.ctr}>
      <ScreenHeader style={{ paddingTop: hdrPaddingTop + 10 }} tab={tab} />
      <FlatList<LaundryRoom>
        keyExtractor={(room: LaundryRoom) => room.id.toString()}
        data={rooms}
        style={styles.listCtr}
        contentContainerStyle={rooms ? styles.listContentCtr : styles.ctr}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        onScroll={onScroll}
        ListEmptyComponent={
          rooms === null ? (
            <NonIdealState screen={Screen.LAUNDRY} />
          ) : (
            <LoadingState />
          )
        }
        initialNumToRender={10}
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
    paddingTop: 30,
    paddingBottom: 5,
  },
});

export default LaundryScreen;
