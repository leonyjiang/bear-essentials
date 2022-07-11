import moment, { Moment } from "moment";

/**
 * Returns a Moment object with the current East Coast time.
 */
export const nowAsMoment = (): Moment => {
  return moment().tz("America/New_York");
};
