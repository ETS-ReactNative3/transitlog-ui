import moment from "moment-timezone";
import {getMomentFromDateTime} from "./time";
import doubleDigit from "./doubleDigit";

/**
 * Creates a moment from a departure time. Departure times follow the 30-hour day
 * schedule, so early morning times before 4:30 belong to the previous day.
 * Moments always use 24 hour days so it will be adjusted to work correctly.
 *
 * @param departure
 * @param date
 * @returns Moment
 */
export const getAdjustedDepartureDate = (departure, date, useArrival = false) => {
  const hours = useArrival ? departure.arrivalHours : departure.hours;
  const minutes = useArrival ? departure.arrivalMinutes : departure.minutes;
  const isNextDay = departure.isNextDay || false;

  const dateMoment = moment.tz(date, "Europe/Helsinki");

  // If it's a "next day" departure, ie a 24h+ departure, bump the date with one day.
  if (isNextDay) {
    dateMoment.add(1, "day");
  }

  const adjustedDate = dateMoment.format("YYYY-MM-DD");

  return getMomentFromDateTime(
    adjustedDate,
    `${doubleDigit(hours)}:${doubleDigit(minutes)}`,
    "Europe/Helsinki"
  );
};
