import moment from "moment-timezone";
import {journeyStartTime} from "./time";
import {TIMEZONE} from "../constants";

// Add props to or modify the HFP item.
export function createHfpItem(rawHfp, startMoment) {
  const received_at_moment = moment.tz(rawHfp.received_at, TIMEZONE);
  const journey_start_time = journeyStartTime(rawHfp, startMoment);

  return {
    ...rawHfp,
    journey_start_time,
    received_at_unix: received_at_moment.unix(),
  };
}
