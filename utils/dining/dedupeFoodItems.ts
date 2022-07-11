import { FoodItem } from "../../types";

/**
 * Deduplicates a list of food items.
 */
export const dedupeFoodItems = (items: FoodItem[]): FoodItem[] => {
  return items.reduce(
    (acc: FoodItem[], curr) =>
      acc.find((item) => item.name === curr.name) ? acc : [...acc, curr],
    []
  );
};
