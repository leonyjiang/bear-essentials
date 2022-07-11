import { Moment } from "moment";
import {
  Cafe,
  CafeHours,
  CafeId,
  CafeName,
  CafeTimesJSON,
  FetchAllJSON,
  Meal,
} from "../../types";
import { fetchApi, nowAsMoment } from "../common";
import { cafeIdToCafeName } from "./cafeIdToCafeName";
import { createFetchCafesQuery } from "./createFetchCafesQuery";

/* Fetches and returns cafe data for display on the dining screen. */
export const fetchCafes = async (): Promise<Cafe[]> => {
  const res: FetchAllJSON = await fetchApi(createFetchCafesQuery());
  const cafeTimes: CafeTimesJSON[] = res.data.data.cafes;

  const cafes: Cafe[] = [];
  for (const cafe of cafeTimes) {
    const id: CafeId = cafe.id as CafeId;
    const name: CafeName = cafeIdToCafeName(id);

    const now: Moment = nowAsMoment();
    const { days } = cafe;

    const hours: CafeHours[] = [];
    for (const daytimes of days) {
      if (daytimes.date === now.format("YYYY-MM-DD")) {
        for (const mealtime of daytimes.dayparts) {
          hours.push({
            mealType: mealtime.label as Meal,
            startTime: mealtime.starttime,
            endTime: mealtime.endtime,
          });
        }
        break;
      }
    }
    cafes.push({ id, name, hours });
  }

  return cafes;
};
