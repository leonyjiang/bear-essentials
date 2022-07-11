import { CafeHours } from "../../types";

/**
 * Returns if a given cafe is operating today.
 */
export const cafeOpenToday = (cafeHours: CafeHours[]): boolean => {
  return cafeHours.length > 0;
};
