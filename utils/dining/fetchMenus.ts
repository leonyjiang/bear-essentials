import {
  CafeId,
  CafeStrId,
  DayPartJSON,
  FetchMenuJSON,
  Meal,
  MealMenu,
  Station,
} from "../../types";
import { fetchApi } from "../common";
import { cafeIdToStrId } from "./cafeIdToCafeStrId";
import { createFetchMenuQuery } from "./createFetchMenuQuery";
import { dedupeFoodItems } from "./dedupeFoodItems";

/**
 * Fetches and parses a cafe's menu data from GraphQL API.
 *
 * @returns {Promise<MealMenu>} a promise for the cafe's menu data.
 */
export const fetchMenus = async (
  cafeId: CafeId,
  date?: string
): Promise<MealMenu[]> => {
  const cafeStrId: CafeStrId = cafeIdToStrId(cafeId);
  const res: FetchMenuJSON = await fetchApi(createFetchMenuQuery(cafeStrId));
  // TODO: add fetch by date
  const dayparts: DayPartJSON[] = res.data.data.menu.dayparts;

  const meals: MealMenu[] = [];
  for (const daypart of dayparts) {
    const mealType: Meal = daypart.label;

    const stations: Station[] = [];
    for (const station of daypart.stations) {
      let { id, label: name, items } = station;
      stations.push({ id, name, data: dedupeFoodItems(items) });
    }
    meals.push({ mealType, stations });
  }

  return meals;
};
