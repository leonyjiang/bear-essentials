import { Diet } from "../../types";

/**
 * Returns the background color for the dietary preference's tag.
 */
export const getDietaryTagBgColor = (diet: Diet): string => {
  switch (diet) {
    case Diet.GLUTEN_FREE:
      return "#ffda40";
    case Diet.HALAL:
      return "#ffb50f";
    case Diet.KOSHER:
      return "#f77a42";
    case Diet.VEGAN:
      return "#10832f";
    case Diet.VEGETARIAN:
      return "#58b217";
    default:
      return "#ccc";
  }
};
