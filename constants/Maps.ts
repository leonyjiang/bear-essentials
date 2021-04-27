import { Region } from "react-native-maps";

/*
 * Initial map region.
 */
const initialRegion: Region = {
  latitude: 41.828,
  longitude: -71.401,
  latitudeDelta: 0.025,
  longitudeDelta: 0.01,
};

/*
 * Coordinates for cafe locations.
 */
const cafeCoordinates = [
  {
    id: "1531",
    name: "Sharpe Refectory",
    coordinate: {
      latitude: 41.82511,
      longitude: -71.40079,
    },
  },
  {
    id: "1532",
    name: "Verney-Woolley",
    coordinate: {
      latitude: 41.82982,
      longitude: -71.40149,
    },
  },
  {
    id: "1533",
    name: "Andrews Commons",
    coordinate: {
      latitude: 41.83059,
      longitude: -71.40248,
    },
  },
  {
    id: "1534",
    name: "Blue Room",
    coordinate: {
      latitude: 41.82682,
      longitude: -71.40335,
    },
  },
  {
    id: "1535",
    name: "Josiah's",
    coordinate: {
      latitude: 41.82338,
      longitude: -71.39937,
    },
  },
  {
    id: "1536",
    name: "Ivy Room",
    coordinate: {
      latitude: 41.82511,
      longitude: -71.40095,
    },
  },
  {
    id: "1537",
    name: "Gourmet to Go",
    coordinate: {
      latitude: 41.82685,
      longitude: -71.40293,
    },
  },
];

/*
 * Map's light and dark styles.
 */
const mapStyle = {
  light: [],
  dark: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ],
};

/*
 * Map's initial latitude delta.
 */
const initialLatitudeDelta = 0.007;
/*
 * Map's initial longitude delta.
 */
const initialLongitudeDelta = 0.005;

export default {
  initialRegion,
  cafeCoordinates,
  initialLatitudeDelta,
  initialLongitudeDelta,
  mapStyle,
};
