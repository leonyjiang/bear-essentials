import moment from "moment-timezone";

/**
 * Converts a 24h-formatted time string to a 12h-formatted time string.
 */
export const fmtTime24hAs12h = (time24h: string) => {
  return moment(time24h, "HH:mm").format("h:mm A");
};
