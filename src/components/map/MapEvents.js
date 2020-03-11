import React from "react";
import {observer} from "mobx-react-lite";
import flow from "lodash/flow";
import get from "lodash/get";
import AreaJourneys from "../AreaJourneys";
import SelectedJourneyEvents from "../SelectedJourneyEvents";
import {inject} from "../../helpers/inject";

const decorate = flow(observer, inject("state"));

const MapEvents = decorate(({children, state}) => {
  const {areaEventsRouteFilter} = state;

  return (
    <AreaJourneys>
      {({journeys: areaJourneysResult = [], loading: areaJourneysLoading}) => {
        let areaJourneys = areaJourneysResult;

        if (areaEventsRouteFilter) {
          const routes = areaEventsRouteFilter.split(",").map((r) => r.trim());
          areaJourneys = areaJourneysResult.filter((route) => {
            if (!get(route, "routeId", null)) {
              return routes.some((r) => r === "signoff");
            }

            return routes.some((r) => route.routeId.includes(r));
          });
        }

        return (
          <SelectedJourneyEvents>
            {({
              journey: selectedJourney = null,
              loading: selectedJourneyLoading = false,
            }) =>
              children({
                selectedJourney,
                areaJourneys,
                areaJourneysLoading,
                selectedJourneyLoading: selectedJourneyLoading,
              })
            }
          </SelectedJourneyEvents>
        );
      }}
    </AreaJourneys>
  );
});

export default MapEvents;
