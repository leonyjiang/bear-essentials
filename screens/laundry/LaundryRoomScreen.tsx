import React, { useEffect, useState } from "react";
import { RouteProp, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RefreshControl, SectionList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import {
  BackIcon,
  ForegroundView,
  LoadingState,
  NonIdealState,
  StarIcon,
  Text,
} from "../../components";

import { LaundryMachine, LaundryStackParamList } from "../../types";
import { useLaundryStore } from "../../store";
import { Colors } from "../../constants";
import { Layout } from "../../constants";
import { fetchLaundryRoom } from "../../utils/laundry";

const {
  window: { width: screenWidth },
} = Layout;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

type LaundryRoomScreenRouteProp = RouteProp<LaundryStackParamList, "Room">;
type LaundryRoomScreenNavigationProp = StackNavigationProp<
  LaundryStackParamList,
  "Room"
>;
interface LaundryRoomScreenProps {
  navigation: LaundryRoomScreenNavigationProp;
  route: LaundryRoomScreenRouteProp;
}
const LaundryRoomScreen = ({
  navigation,
  route: {
    params: { room },
  },
}: LaundryRoomScreenProps) => {
  const { id, name } = room;
  const { starred, addStar, delStar } = useLaundryStore();
  const isDarkTheme = useTheme().dark;

  const [machines, setMachines] = useState<
    LaundryMachine[] | null | undefined
  >();
  /* List refresh state—`true` during refresh, `false` otherwise. */
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /* On initial mount, load all machines. */
  useEffect(() => {
    fetchLaundryRoom(id)
      .then((data: LaundryMachine[]) => setMachines(data))
      .catch(() => setMachines(null));
  }, []);

  /* Reload machines data on refresh. */
  const onRefresh = () => {
    setRefreshing(true);
  };
  useEffect(() => {
    if (refreshing) {
      if (!machines) setMachines(undefined);
      fetchLaundryRoom(id)
        .then((data: LaundryMachine[]) => setMachines(data))
        .catch(() => setMachines(null))
        .finally(() => setRefreshing(false));
    }
  }, [refreshing]);

  /* The shared animated value for opacity transitions on mount and unmount. */
  const mountProgress = useSharedValue<number>(0);
  /* On mount, animate in the menu screen's components. */
  useEffect(() => {
    mountProgress.value = withDelay(200, withTiming(1, { duration: 400 }));
  }, []);
  /* Styles for components whose entries and exits must be animated. */
  const backBtnAnimationStyle = useAnimatedStyle(() => ({
    opacity: mountProgress.value,
  }));

  /* Animates out components before unmount and returns to the dining screen. */
  const onBack = () => {
    mountProgress.value = withTiming(0, { duration: 100 });
    // This throws an error in development, which can be ignored.
    if (navigation.canGoBack()) navigation.popToTop();
  };
  useEffect(() => {
    const unsubscribe = navigation
      .dangerouslyGetParent()
      ?.addListener("tabPress", onBack);
    return unsubscribe;
  }, []);

  /* Toggles the cafe's `starred` status. */
  const toggleStar = () => {
    starred.includes(id) ? delStar(id) : addStar(id);
  };

  return (
    <View style={styles.ctr}>
      <SharedElement style={styles.ctr} id={`${id}.card`}>
        <ForegroundView style={styles.ctr} />
      </SharedElement>
      <View
        style={[
          StyleSheet.absoluteFill,
          { paddingTop: useSafeAreaInsets().top },
          styles.ctr,
        ]}
      >
        <View style={styles.hdr}>
          <TouchableOpacity style={styles.btnCtr} onPress={onBack}>
            <Animated.View style={backBtnAnimationStyle}>
              <BackIcon />
            </Animated.View>
          </TouchableOpacity>
          <SharedElement id={`${id}.title`}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
          </SharedElement>
          <TouchableOpacity style={styles.btnCtr} onPress={toggleStar}>
            <SharedElement id={`${id}.star`}>
              <StarIcon starred={starred.includes(id)} />
            </SharedElement>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ctr: {
    flex: 1,
  },
  hdr: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btnCtr: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subhdrCtr: {
    paddingBottom: 8,
    shadowOpacity: 1,
    zIndex: 1,
  },
  subhdr: {
    alignSelf: "center",
  },
  menuTitle: {
    fontSize: 18,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  menuCtr: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 25,
    width: screenWidth,
  },
  stationTxt: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  itemCtr: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  itemTxt: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
    marginRight: 10,
  },
  itemTag: {
    marginLeft: -5,
  },
});

export default LaundryRoomScreen;
