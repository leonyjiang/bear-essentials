import React, { useState } from "react";
import { Linking, Modal, StyleSheet } from "react-native";
import { ForegroundView, PrimaryTouchableOpacity, Text, View } from "../Themed";
import { Screen } from "../../types";
import { Colors } from "../../constants";
import { useTheme } from "@react-navigation/native";

interface NonIdealStateProps {
  screen: Screen;
  lightColor?: string;
  darkColor?: string;
}
const NonIdealState = ({
  screen,
  lightColor,
  darkColor,
}: NonIdealStateProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const isDarkTheme = useTheme().dark;
  return (
    <>
      <View
        style={styles.container}
        lightColor={lightColor}
        darkColor={darkColor}
      >
        <Text style={styles.message}>
          {screen} data is currently unavailable.
        </Text>
        <PrimaryTouchableOpacity
          activeOpacity={0.8}
          style={styles.actionButton}
          onPress={showModal}
        >
          <Text style={styles.actionText} lightColor={Colors.light.main}>
            Oh no! What do I do?
          </Text>
        </PrimaryTouchableOpacity>
      </View>
      <Modal transparent visible={modalVisible} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            !isDarkTheme && {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
            },
          ]}
        >
          <ForegroundView
            style={[
              styles.modalContentContainer,
              isDarkTheme && { borderColor: Colors.dark.text, borderWidth: 2 },
            ]}
          >
            <Text style={styles.message}>
              • Double check your internet connection.
            </Text>
            <Text style={styles.message}>
              • Try again later, our servers may be down.
            </Text>
            {(screen === Screen.DINING || screen === Screen.CAFE) && (
              <Text style={styles.message}>
                • Visit{" "}
                <Text
                  onPress={() => Linking.openURL("https://dining.brown.edu")}
                  lightColor={Colors.light.hyperlink}
                  darkColor={Colors.dark.hyperlink}
                >
                  dining.brown.edu
                </Text>
                .
              </Text>
            )}
            <PrimaryTouchableOpacity
              style={styles.actionButton}
              onPress={hideModal}
            >
              <Text style={styles.actionText} lightColor={Colors.light.main}>
                Got it!
              </Text>
            </PrimaryTouchableOpacity>
          </ForegroundView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  actionText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContentContainer: {
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 25,
    maxWidth: "75%",
  },
});

export default NonIdealState;
