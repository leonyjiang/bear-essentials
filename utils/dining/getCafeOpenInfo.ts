import { Moment } from "moment";
import { CafeHours, Meal } from "../../types";
import { fmtTime24hAs12h, nowAsMoment } from "../common";

/**
 * Returns 1) if a given cafe is currently open, 2) the current/next/last meal,
 * 3) the next opening or closing time, and 4) the last closing time.
 */
export const getCafeOpenInfo = (
  cafeHours: CafeHours[]
): [openNow: boolean, mealType: Meal, nextTime: string, lastTime: string] => {
  // TODO: add display option for 24-hour time
  const now: Moment = nowAsMoment();
  const timeNowAs24h = now.format("HH:mm");

  let lastMeal = Meal.NONE;
  let lastEndTime = "00:00";
  for (let { mealType, startTime, endTime } of cafeHours) {
    if (endTime > lastEndTime) {
      lastEndTime = endTime;
      lastMeal = mealType;
    }
    if (timeNowAs24h >= startTime && timeNowAs24h < endTime) {
      return [true, mealType, fmtTime24hAs12h(endTime), ""];
    }
    if (timeNowAs24h < startTime) {
      return [false, mealType, fmtTime24hAs12h(startTime), ""];
    }
  }

  return [false, lastMeal, "", fmtTime24hAs12h(lastEndTime)];
};
