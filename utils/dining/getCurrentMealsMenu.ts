import { CafeHours, Meal, MealMenu } from "../../types";
import { getCafeOpenInfo } from "./getCafeOpenInfo";

/**
 * Given a cafe's menus for some day, returns the appropriate menu to display.
 */
export const getCurrentMealsMenu = (
  hours: CafeHours[],
  menus: MealMenu[]
): MealMenu => {
  const [, mealType] = getCafeOpenInfo(hours);
  for (const menu of menus) {
    if (menu.mealType === mealType) {
      return menu;
    }
  }
  return { mealType: Meal.NONE, stations: [] };
};
