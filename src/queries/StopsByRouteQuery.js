import React from "react";
import gql from "graphql-tag";

export const routeStopsQuery = gql`
  query routeStops($routeId: String!, $direction: Direction!, $date: Date!) {
    routeStops(routeId: $routeId, direction: $direction, date: $date) {
      id
      stopId
      shortId
      lat
      lng
      name
      radius
      modes
      routes {
        id
        routeId
        direction
        originStopId
        stopIndex
        isTimingStop
        mode
        destination
        distanceFromPrevious
        distanceFromStart
        duration
      }
    }
  }
`;
