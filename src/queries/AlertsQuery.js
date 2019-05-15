import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import get from "lodash/get";
import {observer} from "mobx-react";
import {AlertFieldsFragment} from "./AlertFieldsFragment";

const alertsQuery = gql`
  query alertsQuery(
    $time: String!
    $all: Boolean
    $network: Boolean
    $allRoutes: Boolean
    $allStops: Boolean
    $route: String
    $stop: String
  ) {
    alerts(
      time: $time
      alertSearch: {
        all: $all
        network: $network
        allRoutes: $allRoutes
        allStops: $allStops
        route: $route
        stop: $stop
      }
    ) {
      ...AlertFieldsFragment
    }
  }
  ${AlertFieldsFragment}
`;

const AlertsQuery = observer(({time, alertSearch, children}) => {
  return (
    <Query query={alertsQuery} variables={{time, ...alertSearch}}>
      {({loading, error, data}) => {
        const alerts = get(data, "alerts", []);

        return children({
          loading,
          error,
          alerts,
        });
      }}
    </Query>
  );
});

export default AlertsQuery;
