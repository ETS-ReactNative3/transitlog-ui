import {reaction} from "mobx";
import moment from "moment-timezone";
import set from "lodash/set";
import unset from "lodash/unset";
import timer from "../helpers/timer";
import TimeActions from "./timeActions";
import FilterActions from "./filterActions";
import {getMomentFromDateTime} from "../helpers/time";
import {TIMEZONE} from "../constants";

const updateListeners = {};
let pollingStart = 0;

// Add update callbacks by name to enable overwriting the callback with
// a new instance without needing to remove the previous one.
// Pass false as the third arg to prevent this from running when auto-updating.
export function setUpdateListener(name, cb, auto = true) {
  set(updateListeners, name, {auto, cb});
  return removeUpdateListener;
}

export function removeUpdateListener(name) {
  return unset(updateListeners, name);
}

let updateTimerHandle = null;

export default (state) => {
  const timeActions = TimeActions(state);
  const filterActions = FilterActions(state);

  const updateTime = (forceCurrent = false) => {
    const {time, timeIncrement, date, timeIsCurrent} = state;
    const selectedMoment = getMomentFromDateTime(date, time, TIMEZONE);
    const nowMoment = moment.tz(new Date(), TIMEZONE);

    if (!timeIsCurrent && !forceCurrent) {
      const nextTimeValue = selectedMoment
        .clone()
        .add(timeIncrement, "seconds")
        .format("HH:mm:ss");

      timeActions.setTime(nextTimeValue);
    } else {
      timeActions.setTime(nowMoment.format("HH:mm:ss"));
      filterActions.setDate(nowMoment.format("YYYY-MM-DD"));
    }
  };

  const update = (isAuto = false) => {
    if (!isAuto) {
      timeActions.toggleLive(false);
    }

    updateTime(!isAuto);

    if (state.timeIsCurrent) {
      Object.values(updateListeners).forEach(({auto, cb}) => {
        // Check that the cb should run when auto-updating if this is an auto-update.
        if (typeof cb === "function" && (!isAuto || (isAuto && auto))) {
          cb();
        }
      });
    }
  };

  function cancelTimer() {
    cancelAnimationFrame(updateTimerHandle.value);
    updateTimerHandle = null;
  }

  reaction(
    () => state.live,
    (isPolling) => {
      if (updateTimerHandle) {
        cancelTimer();
      }

      if (isPolling) {
        pollingStart = Date.now();
        // timer() is a setInterval alternative that uses requestAnimationFrame.
        // This makes it more performant and can "pause" when the tab is not focused.
        updateTimerHandle = timer(() => {
          if (Date.now() - pollingStart > 5000 * 60) {
            timeActions.toggleLive(false);
          }

          update(true);
        }, 1000);
      }
    },
    {fireImmediately: true, delay: 100}
  );

  return {
    update,
  };
};
