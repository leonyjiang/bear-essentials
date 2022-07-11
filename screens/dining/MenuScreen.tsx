import React, { useEffect, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  RefreshControl,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  View,
} from "react-native";
import { RouteProp, useFocusEffect, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";

import {
  BackIcon,
  CafeCardStatus,
  DietaryTag,
  ForegroundView,
  LoadingState,
  NonIdealState,
  StarIcon,
  Text,
} from "../../components";
import {
  Diet,
  DiningStackParamList,
  FoodItem,
  MealMenu,
  Screen,
  Station,
} from "../../types";
import { Colors, Layout } from "../../constants";
import { useCafeStore } from "../../store";
import { nowAsMoment } from "../../utils/common";
import { fetchMenus, getCafeOpenInfo } from "../../utils/dining";

const {
  window: { width: screenWidth },
} = Layout;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

type MenuScreenRouteProp = RouteProp<DiningStackParamList, "Menu">;
type MenuScreenNavigationProp = StackNavigationProp<
  DiningStackParamList,
  "Menu"
>;
interface MenuScreenProps {
  navigation: MenuScreenNavigationProp;
  route: MenuScreenRouteProp;
}

const MenuScreen = ({
  navigation,
  route: {
    params: { cafe },
  },
}: MenuScreenProps) => {
  const { id, name, hours } = cafe;
  const isDarkTheme = useTheme().dark;
  const { starred, addStar, delStar } = useCafeStore();

  /* The date for which the menus currently displayed are for. */
  const [chosenDate] = useState<string>(nowAsMoment().format("MM/DD"));

  /* Map of dates (as strings) to menu data—`undefined` or a missing entry means
   * the data for that date has yet to be fetched, and `null` means the data for
   * that date is unavailable. */
  const [menus, setMenus] = useState<
    Map<string, MealMenu[] | null | undefined>
  >(new Map([[chosenDate, undefined]]));

  /* The list of menus currently displayed (today's menus by default). */
  const [currentMenus, setCurrentMenus] = useState<
    MealMenu[] | null | undefined
  >(menus.get(chosenDate));

  /* List refresh state—`true` during refresh, `false` otherwise. */
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /* The height of the subheader, used to style its shadow. */
  const [subhdrHeight, setSubhdrHeight] = useState<number>(0);

  /* Ref for animating ScrollView to the current meal's menu. */
  const scrollRef = useRef<Animated.ScrollView>(null);

  /* On initial mount, load today's menus. */
  useEffect(() => {
    fetchMenus(id)
      .then((data: MealMenu[]) =>
        setMenus(new Map(menus.set(chosenDate, data.length ? sortMenus(data) : null)))
      )
      .catch(() => setMenus(new Map(menus.set(chosenDate, null))));
  }, []);

  /* Reload the menu data on refresh, and ensure `currentMenus` is updated. */
  const onRefresh = () => setRefreshing(true);
  useEffect(() => {
    if (refreshing) {
      if (!menus.get(chosenDate))
        setMenus(new Map(menus.set(chosenDate, undefined)));
      fetchMenus(id)
        .then((data: MealMenu[]) =>
          setMenus(new Map(menus.set(chosenDate, data.length ? sortMenus(data) : null)))
        )
        .catch(() => setMenus(new Map(menus.set(chosenDate, null))))
        .finally(() => setRefreshing(false));
    }
  }, [refreshing]);
  useEffect(() => {
    setCurrentMenus(menus.get(chosenDate));
  }, [menus]);

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
  const subhdrAnimatedStyle = useAnimatedStyle(() => ({
    opacity: mountProgress.value,
  }));
  const scrollViewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: mountProgress.value,
  }));

  /* Animates out components before unmount and returns to the dining screen. */
  const onBack = () => {
    mountProgress.value = withTiming(0, { duration: 100 });
    if (navigation.canGoBack()) navigation.popToTop();
  };
  useFocusEffect(() => {
    const unsubscribe = navigation
      .dangerouslyGetParent()
      ?.addListener("tabPress", onBack);
    return unsubscribe;
  });

  /* The shared animated value for rendering data once it's loaded. */
  const displayProgress = useSharedValue<number>(0);
  useEffect(() => {
    if (currentMenus) {
      displayProgress.value = withTiming(1, { duration: 1000 });
      const scrollTimer = setTimeout(() => {
        const [, currentMeal] = getCafeOpenInfo(hours);
        const displayIdx = currentMenus.findIndex(
          (menu) => menu.mealType === currentMeal
        );
        scrollRef.current?.scrollTo({
          x: screenWidth * (~displayIdx ? displayIdx : 0),
        });
      });
      return () => clearTimeout(scrollTimer);
    }
  }, [currentMenus]);

  /* Styles for the menu component. */
  const menuAnimatedStyle = useAnimatedStyle(() => ({
    opacity: displayProgress.value,
  }));

  /* Toggles the cafe's `starred` status. */
  const toggleStar = () => (starred.includes(id) ? delStar(id) : addStar(id));

  /* Renders food station names. */
  const renderSectionHeader = ({
    section: { name },
  }: {
    section: SectionListData<FoodItem, Station>;
  }) => {
    return <Text style={styles.stationTxt}>{name}</Text>;
  };

  /* Renders the menu's food items. */
  const renderItem = ({
    item,
  }: SectionListRenderItemInfo<FoodItem, Station>) => {
    return (
      <View style={styles.itemCtr}>
        <Text key={item.name} style={styles.itemTxt} ellipsizeMode="tail">
          • {item.name}
        </Text>
        {renderDietaryTags(item)}
      </View>
    );
  };

  /* Renders a food item's dietary tags. */
  const renderDietaryTags = (item: FoodItem) => {
    const { gluten_free, kosher, halal, vegan, vegetarian } = item;
    return (
      <>
        {gluten_free && (
          <DietaryTag diet={Diet.GLUTEN_FREE} style={styles.itemTag} />
        )}
        {halal && <DietaryTag diet={Diet.HALAL} style={styles.itemTag} />}
        {kosher && <DietaryTag diet={Diet.KOSHER} style={styles.itemTag} />}
        {vegan && <DietaryTag diet={Diet.VEGAN} style={styles.itemTag} />}
        {vegetarian && (
          <DietaryTag diet={Diet.VEGETARIAN} style={styles.itemTag} />
        )}
      </>
    );
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
        <Animated.View
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }: LayoutChangeEvent) => setSubhdrHeight(height)}
          style={[
            styles.subhdrCtr,
            {
              shadowOffset: { width: 0, height: subhdrHeight / 2 },
              shadowRadius: subhdrHeight / 5,
              backgroundColor: isDarkTheme
                ? Colors.dark.foreground
                : Colors.light.foreground,
              shadowColor: isDarkTheme
                ? Colors.dark.foreground
                : Colors.light.foreground,
            },
            subhdrAnimatedStyle,
          ]}
        >
          <SharedElement style={styles.subhdr} id={`${id}.status`}>
            <CafeCardStatus hours={hours} />
          </SharedElement>
        </Animated.View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          style={scrollViewAnimatedStyle}
          contentContainerStyle={!currentMenus && { flex: 1 }}
          ref={scrollRef}
        >
          {currentMenus ? (
            currentMenus.map((menu) => (
              <AnimatedSectionList<FoodItem, Station>
                key={menu.mealType}
                sections={menu.stations}
                stickySectionHeadersEnabled={false}
                keyExtractor={(item: FoodItem, index: number) =>
                  item.name + index
                }
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListHeaderComponent={
                  <Text style={styles.menuTitle}>{menu.mealType}</Text>
                }
                ListEmptyComponent={
                  currentMenus === null ? (
                    <NonIdealState
                      screen={Screen.DINING}
                      lightColor={Colors.light.foreground}
                      darkColor={Colors.dark.foreground}
                    />
                  ) : (
                    <LoadingState
                      lightColor={Colors.light.foreground}
                      darkColor={Colors.dark.foreground}
                    />
                  )
                }
                contentContainerStyle={[styles.menuCtr, menuAnimatedStyle]}
              />
            ))
          ) : currentMenus === null ? (
            <NonIdealState
              screen={Screen.DINING}
              lightColor={Colors.light.foreground}
              darkColor={Colors.dark.foreground}
            />
          ) : (
            <LoadingState
              lightColor={Colors.light.foreground}
              darkColor={Colors.dark.foreground}
            />
          )}
        </Animated.ScrollView>
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

export default MenuScreen;
