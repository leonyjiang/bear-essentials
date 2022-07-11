import { LaundryId, LaundryRoom } from "../../types";

/**
 * Sorts laundry rooms by stars and then alphabetically.
 *
 * @param {LaundryRoom[]} rooms — the list of laundry rooms to sort.
 *
 * @returns {LaundryRoom[]} the sorted list of laundry rooms.
 */
export const sortRooms = (
  rooms: LaundryRoom[],
  starred: LaundryId[]
): LaundryRoom[] => {
  const sortedRooms = [...rooms];
  sortedRooms.sort((roomA, roomB) => {
    return starred.includes(roomA.id)
      ? starred.includes(roomB.id)
        ? roomA.name < roomB.name
          ? -1
          : 1
        : -1
      : starred.includes(roomB.id)
      ? 1
      : roomA.name < roomB.name
      ? -1
      : 1;
  });
  return sortedRooms;
};
