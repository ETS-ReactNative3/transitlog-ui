import React, {useMemo} from "react";
import {observer} from "mobx-react-lite";
import StopLayer from "./StopLayer";
import RouteGeometryQuery from "../../queries/RouteGeometryQuery";
import RouteLayer from "./RouteLayer";
import flow from "lodash/flow";
import getJourneyId from "../../helpers/getJourneyId";
import JourneyLayer from "./JourneyLayer";
import HfpMarkerLayer from "./HfpMarkerLayer";
import RouteStopsLayer from "./RouteStopsLayer";
import AreaSelect from "./AreaSelect";
import {expr} from "mobx-utils";
import {areaEventsStyles} from "../../stores/UIStore";
import SimpleHfpLayer from "./SimpleHfpLayer";
import {createRouteId} from "../../helpers/keys";
import {inject} from "../../helpers/inject";
import WeatherDisplay from "./WeatherDisplay";
import JourneyStopsLayer from "./JourneyStopsLayer";
import {WeatherWidget, JourneyWeatherWidget} from "./WeatherWidget";
import get from "lodash/get";

const decorate = flow(
  observer,
  inject("state")
);

const MapContent = decorate(
  ({
    journeys = [],
    routeJourneys = [],
    journeyPositions,
    route,
    zoom,
    mapBounds, // The current map view
    stop,
    setMapView,
    viewLocation,
    setQueryBounds,
    actualQueryBounds,
    centerOnRoute = true,
    state: {selectedJourney, date, mapOverlays, areaEventsStyle, unixTime},
  }) => {
    const hasRoute = !!route && !!route.routeId;
    const showStopRadius = expr(() => mapOverlays.indexOf("Stop radius") !== -1);

    const selectedJourneyId = getJourneyId(selectedJourney);
    const selectedJourneyEvents = useMemo(
      () => get(journeys.find((j) => j.id === selectedJourneyId) || {}, "events", []),
      [selectedJourneyId, journeys.length !== 0]
    );

    return (
      <>
        <AreaSelect
          enabled={zoom > 12}
          usingBounds={actualQueryBounds}
          onSelectArea={setQueryBounds}
        />
        {/* When a route is NOT selected... */}
        {!hasRoute && (
          <StopLayer
            showRadius={showStopRadius}
            onViewLocation={viewLocation}
            date={date}
            selectedStop={stop}
            zoom={zoom}
            bounds={mapBounds}
          />
        )}
        {/* When a route IS selected... */}
        {hasRoute && (
          <>
            <RouteGeometryQuery
              key={`route_query_${createRouteId(route, true)}`}
              route={route}
              date={date}>
              {({routeGeometry = null}) =>
                routeGeometry && routeGeometry.coordinates.length !== 0 ? (
                  <RouteLayer
                    routeId={
                      routeGeometry.coordinates.length !== 0 ? createRouteId(route) : null
                    }
                    mode={routeGeometry.mode || "BUS"}
                    coordinates={routeGeometry.coordinates}
                    canCenterOnRoute={centerOnRoute}
                    setMapView={setMapView}
                    key={`route_line_${createRouteId(route, true)}`}
                  />
                ) : null
              }
            </RouteGeometryQuery>

            {(!selectedJourneyId ||
              journeys.length === 0 ||
              !journeys.find((journey) => selectedJourneyId === journey.id)) && (
              <RouteStopsLayer
                showRadius={showStopRadius}
                onViewLocation={viewLocation}
                route={route}
              />
            )}

            {journeys.length !== 0 &&
              journeys.map((journey) => {
                const isSelectedJourney = selectedJourneyId === journey.id;

                if (!isSelectedJourney) {
                  return null;
                }

                const currentPosition = journeyPositions
                  ? journeyPositions.get(journey.id)
                  : null;

                return [
                  <JourneyLayer
                    key={`journey_line_${journey.id}`}
                    journey={journey}
                    name={journey.id}
                  />,
                  <JourneyStopsLayer
                    showRadius={showStopRadius}
                    onViewLocation={viewLocation}
                    key={`journey_stops_${journey.id}`}
                    journey={journey}
                  />,
                  currentPosition ? (
                    <HfpMarkerLayer
                      key={`hfp_markers_${journey.id}`}
                      currentEvent={currentPosition}
                      journey={journey}
                      isSelectedJourney={isSelectedJourney}
                    />
                  ) : null,
                ];
              })}
            {routeJourneys.length !== 0 &&
              routeJourneys
                .filter(({id}) => id !== selectedJourneyId)
                .map((journey) => {
                  const event = journeyPositions.get(journey.id);

                  if (!event) {
                    return null;
                  }

                  return (
                    <HfpMarkerLayer
                      key={`hfp_markers_${journey.id}`}
                      currentEvent={event}
                      journey={journey}
                      isSelectedJourney={false}
                    />
                  );
                })}
          </>
        )}
        {journeys.length !== 0 &&
          journeys
            .filter(({id}) => id !== selectedJourneyId)
            .map((journey) => {
              if (areaEventsStyle === areaEventsStyles.MARKERS) {
                const event = journeyPositions.get(journey.id);

                if (!event) {
                  return null;
                }

                return (
                  <HfpMarkerLayer
                    key={`hfp_markers_${journey.id}`}
                    currentEvent={event}
                    journey={journey}
                    isSelectedJourney={false}
                  />
                );
              }

              return (
                <SimpleHfpLayer
                  zoom={zoom}
                  name={journey.id}
                  key={`hfp_polyline_${journey.id}`}
                  events={journey.events}
                />
              );
            })}
        {mapOverlays.includes("Weather") && (
          <WeatherDisplay key="weather_map" position={mapBounds} />
        )}
        {mapOverlays.includes("Weather") &&
          (!selectedJourneyId ? (
            <WeatherWidget key="map_weather" position={mapBounds} />
          ) : (
            <JourneyWeatherWidget
              time={unixTime}
              key={`journey_weather_${selectedJourneyId}`}
              events={selectedJourneyEvents}
            />
          ))}
      </>
    );
  }
);

export default MapContent;
