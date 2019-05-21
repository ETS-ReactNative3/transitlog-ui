import React from "react";
import {observer} from "mobx-react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import get from "lodash/get";
import {AlertFieldsFragment} from "./AlertFieldsFragment";
import {CancellationFieldsFragment} from "./CancellationFieldsFragment";

const departuresQuery = gql`
  query departures(
    $stopId: String!
    $date: Date!
    $routeId: String
    $minHour: Int
    $maxHour: Int
  ) {
    departures(
      stopId: $stopId
      date: $date
      filter: {routeId: $routeId, maxHour: $maxHour, minHour: $minHour}
    ) {
      id
      stopId
      routeId
      direction
      dayType
      departureId
      departureDate
      departureTime
      equipmentColor
      equipmentType
      extraDeparture
      index
      isNextDay
      isTimingStop
      operatorId
      terminalTime
      recoveryTime
      isCancelled
      cancellations {
        ...CancellationFieldsFragment
      }
      alerts {
        ...AlertFieldsFragment
      }
      journey {
        id
        routeId
        lineId
        direction
        originStopId
        departureDate
        departureTime
        uniqueVehicleId
        _numInstance
      }
      observedDepartureTime {
        id
        departureDate
        departureTime
        departureDateTime
        departureTimeDifference
      }
      plannedDepartureTime {
        id
        departureDate
        departureTime
        departureDateTime
      }
    }
  }
  ${AlertFieldsFragment}
  ${CancellationFieldsFragment}
`;

const DeparturesQuery = observer(
  ({stopId, date, routeId, minHour, maxHour, skip = false, children}) => {
    return (
      <Query
        query={departuresQuery}
        variables={{
          stopId,
          date,
          routeId,
          minHour,
          maxHour,
        }}
        skip={skip || !stopId || !date}>
        {({loading, error, data}) => {
          if (loading || error) {
            return children({departures: [], loading, error});
          }

          const departures = get(data, "departures", []);
          return children({departures, loading: false, error});
        }}
      </Query>
    );
  }
);

export default DeparturesQuery;
