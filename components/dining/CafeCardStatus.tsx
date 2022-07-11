import React from "react";
import { CafeHours } from "../../types";
import { Text } from "../Themed";
import { Strings, Colors } from "../../constants";
import { StyleSheet, View } from "react-native";
import { cafeOpenToday, getCafeOpenInfo } from "../../utils/dining";

const { dining: diningStrings } = Strings;
interface CafeCardStatusProps {
  hours: CafeHours[];
}
/*
 * The cafe's operational status if it is not completely closed today.
 */
const CafeCardStatus = ({ hours }: CafeCardStatusProps) => {
  const [isOpenNow, mealType, nextTime, lastTime] = getCafeOpenInfo(hours);
  if (cafeOpenToday(hours)) {
    return (
      <View>
        {isOpenNow ? (
          <Text style={styles.statusTxt}>
            <Text lightColor={Colors.light.open} darkColor={Colors.dark.open}>
              {diningStrings.open}
            </Text>
            , serving {mealType.toLowerCase()} until {nextTime}.
          </Text>
        ) : (
          <Text style={styles.statusTxt}>
            <Text
              lightColor={Colors.light.closed}
              darkColor={Colors.dark.closed}
            >
              {diningStrings.closed}
            </Text>
            ,{" "}
            {nextTime
              ? `opens for ${mealType.toLowerCase()} at ${nextTime}.`
              : `${mealType.toLowerCase()} ended at ${lastTime}.`}
          </Text>
        )}
      </View>
    );
  }
  return <Text style={styles.statusTxt}>{diningStrings.closedToday}</Text>;
};

const styles = StyleSheet.create({
  statusTxt: {
    fontSize: 16,
  },
});

export default CafeCardStatus;
