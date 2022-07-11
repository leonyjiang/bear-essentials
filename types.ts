// ================
// react-navigation
// ================
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
export type DiningStackParamList = {
  Dining: undefined;
  Menu: { cafe: Cafe };
};
export type LaundryStackParamList = {
  Laundry: undefined;
  Room: { room: LaundryRoom };
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
export enum Screen {
  DINING = "Dining",
  CAFE = "Cafe",
  LAUNDRY = "Laundry",
  ROOM = "Laundry room",
  MAPS = "Maps",
}

// =============
// zustand state
// =============
export type CafeState = {
  starred: CafeId[];
  addStar: (cafeId: CafeId) => void;
  delStar: (cafeId: CafeId) => void;
  clearStars: () => void;
};
export type LaundryState = {
  starred: LaundryId[];
  addStar: (laundryId: LaundryId) => void;
  delStar: (laundryId: LaundryId) => void;
  clearStars: () => void;
};
export type MapsState = {
  filters: MapFeature[];
  addFilter: (filter: MapFeature) => void;
  delFilter: (filter: MapFeature) => void;
  clearFilters: () => void;
};
export type SettingsState = {
  landingTab: Tab;
  setLandingTab: (tab: Tab) => void;
  resetToDefaults: () => void;
};

// ============
// common types
// ============
export interface HMTime {
  hours: number;
  minutes: number;
}

// ============
// dining types
// ============
/*
 * Numeric IDs for all cafes.
 */
export enum CafeId {
  SHARPE_REFECTORY = "1531",
  ANDREWS_COMMONS = "1533",
  VERNEY_WOOLLEY = "1532",
  BLUE_ROOM = "1534",
  IVY_ROOM = "1536",
  GOURMET_TO_GO = "1537",
  JOSIAHS = "1535",
  CAFE_CARTS = "1538",
}
/*
 * String IDs for all cafes.
 */
export enum CafeStrId {
  SHARPE_REFECTORY = "ratty",
  ANDREWS_COMMONS = "andrews",
  VERNEY_WOOLLEY = "vdub",
  BLUE_ROOM = "blueroom",
  IVY_ROOM = "ivyroom",
  GOURMET_TO_GO = "campusmarket",
  JOSIAHS = "jos",
  CAFE_CARTS = "cafecarts",
}
/*
 * Human-readable names for all cafes.
 */
export enum CafeName {
  SHARPE_REFECTORY = "Sharpe Refectory",
  ANDREWS_COMMONS = "Andrews Commons",
  VERNEY_WOOLLEY = "Verney-Woolley",
  BLUE_ROOM = "Blue Room",
  IVY_ROOM = "Ivy Room",
  GOURMET_TO_GO = "Gourmet-to-Go",
  JOSIAHS = "Josiah's",
  CAFE_CARTS = "Cafe Carts",
}
/*
 * Cafe type for displaying cafe information.
 */
export interface Cafe {
  id: CafeId;
  name: CafeName;
  hours: CafeHours[];
}
/*
 * Cafe hours.
 */
export interface CafeHours {
  mealType: Meal;
  startTime: string;
  endTime: string;
}
/*
 * Meal types, either `BREAKFAST`, `LUNCH`, or `DINNER`.
 */
export enum Meal {
  BREAKFAST = "Breakfast",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  NONE = "",
}
/*
 * CafeStatus, either `OPEN` or `CLOSED`.
 */
export enum CafeStatus {
  OPEN = "Open",
  CLOSED = "Closed",
}
/*
 * Meal menu type for displaying cafe's meal information.
 */
export interface MealMenu {
  mealType: Meal;
  stations: Station[];
}
export interface Station {
  id: string;
  name: string;
  data: FoodItem[];
}
export interface FoodItem {
  name: string;
  description: string;
  gluten_free: boolean;
  halal: boolean;
  kosher: boolean;
  vegan: boolean;
  vegetarian: boolean;
}
export enum Diet {
  GLUTEN_FREE = "GF",
  HALAL = "H",
  KOSHER = "K",
  VEGAN = "V",
  VEGETARIAN = "VG",
}

// =============
// laundry types
// =============
/* Basic display information for laundry rooms. */
export type LaundryRoom = {
  id: LaundryId;
  name: string;
};
/* Enum of laundry machine types. */
export enum MachineType {
  WASHER = "wash",
  DRYER = "dry",
}
/* Laundry machines. */
export type LaundryMachine = {
  machine_no: number;
  offline: boolean;
  type: MachineType;
  avail: boolean;
  time_remaining: number;
};
/*
 * Numeric IDs for Brown's fifty-eight laundry rooms.
 */
export enum LaundryId {
  BROWN_ST_111_RM106 = 1429213,
  WATERMAN_ST_125_127_RM003 = 1429265,
  THAYER_315_ST = 1429240,
  ANDREWS_E_RM154 = 14292350,
  ANDREWS_W_RM160 = 1429250,
  ARCHIBALD_BRONSON_RMA103 = 1429212,
  BARBOUR_APTS_RM070 = 1429231,
  BUXTON_HOUSE_RM008 = 1429215,
  CASWELL_MIDDLE_RM000 = 1429216,
  CASWELL_NORTH_RM010B = 1429253,
  CHAMPLIN_RM110A = 1429217,
  CHAPIN_HOUSE_RM023 = 1429218,
  DIMAN_HOUSE_RM028 = 142927,
  DIMAN_HOUSE_RM106_ = 1429249,
  EVERETT_POLAND_RME243 = 1429251,
  EVERETT_POLAND_RME166 = 1429267,
  GOODARD_HOUSE_RM018 = 142928,
  GOODARD_HOUSE_RM130 = 142922,
  GRAD_CENTER_A_RM120 = 1429221,
  GRAD_CENTER_B_RM113 = 1429222,
  GRAD_CENTER_C_RM120 = 1429220,
  GRAD_CENTER_D_RM130 = 1429223,
  HARKNESS_HOUSE_RM023 = 142929,
  HARKNESS_HOUSE_RM106 = 1429245,
  HEDGEMAN_D_RM009A = 1429224,
  HOPE_COLLEGE_RM015 = 1429225,
  JAMISON_MEAD_RMJ055 = 1429246,
  KING_HOUSE_RM007 = 1429226,
  LITTLEFIELD_HALL_RM011 = 1429227,
  MACHADO_HOUSE_RM209 = 1429237,
  MARCY_HOUSE_RM028 = 1429210,
  METCALF_HALL = 1429229,
  MILLER_HALL = 1429230,
  MINDEN_HALL_RM102 = 1429257,
  MORRISS_RM211A = 1429254,
  MORRISS_RM311A = 1429255,
  MORRISS_RM411A = 1429256,
  NPEMBROKE_2_RM000 = 1429232,
  NPEMBROKE_3_RM000 = 1429233,
  NPEMBROKE_3_RM020 = 1429252,
  NPEMBROKE_4_RM117 = 1429234,
  OLNEY_HOUSE_RM024 = 1429211,
  PERKINS_RM020_ = 1429235,
  PLANTATIONS_HOUSE_RM108 = 1429236,
  SEARS_HOUSE_RM023 = 1429238,
  SEARS_HOUSE_RM106 = 1429263,
  SLATER_HALL_RM008 = 1429239,
  VGQA_RM001 = 1429247,
  VGQA_RM007 = 1429288,
  WAYLAND_HOUSE_RM023 = 1429241,
  WEST_HOUSE_RM100B = 1429214,
  WOOLLEY_RM101A = 1429219,
  WOOLLEY_RM201A = 1429258,
  WOOLLEY_RM301A = 1429259,
  WOOLLEY_RM401A = 1429260,
  YO10_RM142 = 1429242,
  YO2_RM142 = 1429243,
  YO4_RM142 = 1429244,
}
/*
 * Names and room numbers for Brown's fifty-eight laundry rooms.
 */
export enum LaundryRoomName {
  BROWN_ST_111_RM106 = "111 Brown Street | 106",
  WATERMAN_ST_125_127_RM003 = "125-127 Waterman Street | 003",
  THAYER_315_ST = "315 Thayer",
  ANDREWS_E_RM154 = "East Andrews | 154",
  ANDREWS_W_RM160 = "West Andrews | 160",
  ARCHIBALD_BRONSON_RMA103 = "Archibald-Bronson | A103",
  BARBOUR_APTS_RM070 = "Barbour Apartments | 070",
  BUXTON_HOUSE_RM008 = "Buxton House | 008",
  CASWELL_MIDDLE_RM000 = "Caswell Hall | 000",
  CASWELL_NORTH_RM010B = "Caswell Hall | 010B",
  CHAMPLIN_RM110A = "Champlin Hall | 110A",
  CHAPIN_HOUSE_RM023 = "Chapin House | 023",
  DIMAN_HOUSE_RM028 = "Diman House | 028",
  DIMAN_HOUSE_RM106_ = "Diman House | 106",
  EVERETT_POLAND_RME243 = "Everett-Poland | E243",
  EVERETT_POLAND_RME166 = "Everett-Poland | E166",
  GOODARD_HOUSE_RM018 = "Goddard House | 018",
  GOODARD_HOUSE_RM130 = "Goddard House | 130",
  GRAD_CENTER_A_RM120 = "Grad Center A | 120",
  GRAD_CENTER_B_RM113 = "Grad Center B | 113",
  GRAD_CENTER_C_RM120 = "Grad Center C | 120",
  GRAD_CENTER_D_RM130 = "Grad Center D | 130",
  HARKNESS_HOUSE_RM023 = "Harkness House | 023",
  HARKNESS_HOUSE_RM106 = "Harkness House | 106",
  HEDGEMAN_D_RM009A = "Hegeman Hall | 009A",
  HOPE_COLLEGE_RM015 = "Hope College | 015",
  JAMISON_MEAD_RMJ055 = "Jameson-Mead | J055",
  KING_HOUSE_RM007 = "King House | 007",
  LITTLEFIELD_HALL_RM011 = "Littlefield Hall | 011",
  MACHADO_HOUSE_RM209 = "Machado House | 209",
  MARCY_HOUSE_RM028 = "Marcy House | 028",
  METCALF_HALL = "Metcalf Hall",
  MILLER_HALL = "Miller Hall",
  MINDEN_HALL_RM102 = "Minden Hall | 102",
  MORRISS_RM211A = "Morriss Hall | 211A",
  MORRISS_RM311A = "Morriss Hall | 311A",
  MORRISS_RM411A = "Morriss Hall | 411A",
  NPEMBROKE_2_RM000 = "New Pembroke 2 | 000",
  NPEMBROKE_3_RM000 = "New Pembroke 3 | 000",
  NPEMBROKE_3_RM020 = "New Pembroke 3 | 020",
  NPEMBROKE_4_RM117 = "New Pembroke 4 | 117",
  OLNEY_HOUSE_RM024 = "Olney House | 024",
  PERKINS_RM020_ = "Perkins Hall | 020",
  PLANTATIONS_HOUSE_RM108 = "Plantations House | 108",
  SEARS_HOUSE_RM023 = "Sears House | 023",
  SEARS_HOUSE_RM106 = "Sears House | 106",
  SLATER_HALL_RM008 = "Slater Hall | 008",
  VGQA_RM001 = "Vartan Gregorian Quad A | 001",
  VGQA_RM007 = "Vartan Gregorian Quad A | 007",
  WAYLAND_HOUSE_RM023 = "Wayland House | 023",
  WEST_HOUSE_RM100B = "West House | 100B",
  WOOLLEY_RM101A = "Woolley Hall | 101A",
  WOOLLEY_RM201A = "Woolley Hall | 201A",
  WOOLLEY_RM301A = "Woolley Hall | 301A",
  WOOLLEY_RM401A = "Woolley Hall | 401A",
  YO10_RM142 = "Young Orchard 10 | 142",
  YO2_RM142 = "Young Orchard 2 | 142",
  YO4_RM142 = "Young Orchard 4 | 142",
}

// ==========
// maps types
// ==========
/*
 * Toggle-able map features.
 */
export enum MapFeature {
  CAFES,
  UBUILDINGS,
  DORMITORIES,
  LIBRARIES,
  GYMNASIUMS,
  BLUE_LIGHTS,
  WATER_FOUNTAINS,
  RESTROOMS,
}

// =============
// graphql types
// =============
// dining api
export type FetchAllJSON = {
  data: {
    data: {
      cafes: CafeTimesJSON[];
    };
  };
};
export type CafeTimesJSON = {
  id: string;
  days: DayTimesJSON[];
};
export type DayTimesJSON = {
  date: string;
  dayparts: MealTimesJSON[];
};
export type MealTimesJSON = {
  label: Meal;
  starttime: string;
  endtime: string;
};

export type FetchMenuJSON = {
  data: {
    data: {
      menu: {
        dayparts: DayPartJSON[];
      };
    };
  };
};
export type DayPartJSON = {
  label: Meal;
  stations: StationJSON[];
};
export type StationJSON = {
  id: string;
  label: string;
  items: FoodItem[];
};

// laundry api
export type FetchAllLaundryJSON = {
  data: {
    data: {
      laundryRooms: {
        results: LaundryRoom[];
      };
    };
  };
};
export type FetchLaundryRoomJSON = {
  data: {
    data: {
      laundryRoomDetailed: {
        machines: LaundryMachine[];
      };
    };
  };
};
