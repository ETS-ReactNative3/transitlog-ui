import {observer, inject} from "mobx-react";
import {observable, action} from "mobx";
import {app} from "mobx-app";
import React from "react";
import {getCachedData, cacheData, getCacheKey} from "../helpers/hfpCache";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import HfpQuery from "../queries/HfpQuery";
import takeEveryNth from "../helpers/takeEveryNth";

const formatData = (hfpData) => {
  if (hfpData.length === 0) {
    return hfpData;
  }

  const groupedData = groupBy(hfpData, "uniqueVehicleId");
  return map(groupedData, (positions, groupName) => ({
    vehicleId: groupName,
    positions: takeEveryNth(positions, 2) // Take every other hfp item.
      // Some HFP items are null for one reason or another. Filter those out.
      .filter((pos) => !!pos && !!pos.lat && !!pos.long),
  }));
};

class HfpLoader extends React.Component {
  render() {
    const {children, route, date, cachedHfp = []} = this.props;

    return cachedHfp.length === 0 ? (
      <HfpQuery route={route} date={date}>
        {({hfpPositions, loading}) => {
          if (loading || hfpPositions.length === 0) {
            return children({hfpPositions: [], loading});
          }

          const formattedPositions = formatData(hfpPositions);
          cacheData(formattedPositions, date, route);

          return children({hfpPositions: formattedPositions, loading});
        }}
      </HfpQuery>
    ) : (
      children({hfpPositions: cachedHfp, loading: false})
    );
  }
}

export default (Component) => {
  @inject(app("state"))
  @observer
  class WithHfpData extends React.Component {
    constructor() {
      super();
      this.cachedHfp = observable.map({}, {deep: false});
    }

    componentDidMount() {
      this.updateComponentCache();
    }

    componentDidUpdate() {
      this.updateComponentCache();
    }

    async updateComponentCache() {
      const {
        state: {date, route},
      } = this.props;

      if (!route) {
        return;
      }

      const cacheKey = getCacheKey(date, route);
      const existingCache = this.cachedHfp.get(cacheKey);

      if (!existingCache) {
        const cachedHfp = await getCachedData(date, route);
        this.setCachedHfp(cachedHfp, cacheKey);
      }
    }

    @action
    setCachedHfp(data, key) {
      this.cachedHfp.set(key, data);
    }

    render() {
      const {
        state: {date, route},
      } = this.props;

      const cacheKey = getCacheKey(date, route);
      const cachedPositions = this.cachedHfp.get(cacheKey);

      return (
        <HfpLoader cachedHfp={cachedPositions} date={date} route={route}>
          {({hfpPositions, loading}) => (
            <Component
              {...this.props}
              loading={loading}
              hfpPositions={hfpPositions}
            />
          )}
        </HfpLoader>
      );
    }
  }

  return WithHfpData;
};