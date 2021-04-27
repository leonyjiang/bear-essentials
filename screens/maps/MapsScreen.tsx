import React, { createRef, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  getCurrentPositionAsync,
  getPermissionsAsync,
  PermissionStatus,
  requestPermissionsAsync,
} from "expo-location";

import useColorScheme from "../../hooks/useColorScheme";
import { SchoolLocationButton } from "../../components";
import { View } from "../../components/Themed";
import { Maps } from "../../constants";

const {
  initialRegion,
  cafeCoordinates,
  initialLongitudeDelta,
  initialLatitudeDelta,
  mapStyle,
} = Maps;

/*
 * The screen shown for the maps tab of the app, which allows the user to view
 * various points of interest at Brown (cafes, lecture halls, bathrooms, etc.).
 */
const MapsScreen = () => {
  /*
   * The user's location permissions.
   */
  const [
    locationPermission,
    setLocationPermission,
  ] = useState<PermissionStatus>(PermissionStatus.UNDETERMINED);
  /*
   * Set custom map style according to app theme.
   */
  const customMapStyle = mapStyle[useColorScheme()];
  /*
   * Ref for MapView, used to animate the MapView.
   */
  const mapRef = createRef<MapView>();

  /*
   * Handle location permissions on mount.
   */
  useEffect(() => {
    (async () => {
      // Get and store the current permission status.
      const { status } = await getPermissionsAsync();
      setLocationPermission(status);
      // If permission status is already DENIED, return.
      if (status == PermissionStatus.DENIED) return;
      // If current status is UNDETERMINED, ask for permission.
      if (status == PermissionStatus.UNDETERMINED) {
        const { status } = await requestPermissionsAsync();
        setLocationPermission(status);
        // If denied location permission, return.
        if (status == PermissionStatus.DENIED) return;
      }
      // If granted permission, set region to the user's location...
      const { latitude, longitude } = (await getCurrentPositionAsync()).coords;
      const timeout = setTimeout(
        () =>
          mapRef.current?.animateToRegion({
            latitudeDelta: initialLatitudeDelta,
            longitudeDelta: initialLongitudeDelta,
            latitude,
            longitude,
          }),
        1500
      );
      return () => clearTimeout(timeout);
    })();
  }, []);

  /*
   * Animates map's `region` to Brown University.
   */
  const goToBrownsLocation = () => {
    mapRef.current?.animateToRegion(initialRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        initialRegion={initialRegion}
        customMapStyle={customMapStyle}
        showsUserLocation={locationPermission == PermissionStatus.GRANTED}
        showsMyLocationButton={locationPermission == PermissionStatus.GRANTED}
        style={styles.mapView}
      >
        {cafeCoordinates.map(({ name, coordinate }, index) => (
          <Marker title={name} coordinate={coordinate} key={index} />
        ))}
      </MapView>
      <SchoolLocationButton
        onPress={goToBrownsLocation}
        style={[
          styles.myLocationButton,
          { bottom: locationPermission == PermissionStatus.GRANTED ? 73 : 10 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  myLocationButton: {
    position: "absolute",
    top: "auto",
    left: "auto",
    right: 10,
  },
});

export default MapsScreen;
