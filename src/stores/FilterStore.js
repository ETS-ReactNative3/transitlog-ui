import {extendObservable, action} from "mobx";
import filterActions from "./filterActions";
import JourneyActions from "./journeyActions";
import {inflate} from "../helpers/inflate";
import pick from "lodash/pick";
import merge from "lodash/merge";
import {resetUrlState} from "./UrlManager";

const resetListeners = [];

export function setResetListener(cb) {
  resetListeners.push(cb);

  return () => {
    const cbIndex = resetListeners.indexOf(cb);

    if (cbIndex !== -1) {
      resetListeners.splice(cbIndex, 1);
    }
  };
}

export default (state, initialState) => {
  const emptyState = {
    date: timeToFormat(new Date(), "YYYY-MM-DD", "Europe/Helsinki"),
    stop: "",
    vehicle: "",
    line: {
      lineId: "1006T",
      dateBegin: "",
      dateEnd: "",
    },
    route: {
      routeId: "",
      direction: "",
      dateBegin: "",
      dateEnd: "",
      originstopId: "",
    },
  };

  extendObservable(
    state,
    merge({}, emptyState, pick(inflate(initialState), ...Object.keys(emptyState)))
  );

  const journeyActions = JourneyActions(state);
  const actions = filterActions(state);

  const reset = action(() => {
    // Recurse through the passed object and assign each value to the respective state value.
    function resetStateWith(obj) {
      Object.entries(obj).forEach(([key, value]) => {
        state[key] = value;
      });
    }

    resetStateWith(emptyState);

    journeyActions.setSelectedJourney(null);
    state.requestedJourneys.clear();

    resetListeners.forEach((cb) => {
      if (typeof cb === "function") {
        cb();
      }
    });

    resetUrlState(true);
  });

  return {
    ...actions,
    reset,
  };
};
