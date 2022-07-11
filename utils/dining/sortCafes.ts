import { Cafe, CafeId } from "../../types";

/**
 * Sorts cafes by operational status, stars, and then alphabetically.
 *
 * @param {Cafe[]} cafes — the list of cafes to sort.
 * @param {CafeId[]} starred — the list of user-starred cafes.
 *
 * @returns {Cafe[]} the sorted list of cafes.
 */
export const sortCafes = (cafes: Cafe[], starred: CafeId[]): Cafe[] => {
  const sortedCafes = [...cafes];
  sortedCafes.sort((cafeA, cafeB) => {
    const cafeAOpenToday = Math.sign(cafeA.hours.length);
    const cafeBOpenToday = Math.sign(cafeB.hours.length);
    return cafeAOpenToday
      ? cafeBOpenToday
        ? starred.includes(cafeA.id)
          ? starred.includes(cafeB.id)
            ? cafeA.name < cafeB.name
              ? -1
              : 1
            : -1
          : starred.includes(cafeB.id)
          ? 1
          : cafeA.name < cafeB.name
          ? -1
          : 1
        : -1
      : cafeBOpenToday
      ? 1
      : starred.includes(cafeA.id)
      ? starred.includes(cafeB.id)
        ? cafeA.name < cafeB.name
          ? -1
          : 1
        : -1
      : starred.includes(cafeB.id)
      ? 1
      : cafeA.name < cafeB.name
      ? -1
      : 1;
  });
  return sortedCafes;
};
