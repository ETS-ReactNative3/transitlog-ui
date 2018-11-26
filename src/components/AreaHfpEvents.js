import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {observable, action, reaction} from "mobx";
import {app} from "mobx-app";
import {combineDateAndTime} from "../helpers/time";
import AreaHfpQuery from "../queries/AreaHfpQuery";

const defaultQueryParams = {
  minTime: null,
  maxTime: null,
  minLong: null,
  maxLong: null,
  minLat: null,
  maxLat: null,
};

@inject(app("state"))
@observer
class AreaHfpEvents extends Component {
  disposeQueryReaction = () => {};

  @observable
  currentBounds = null;

  @observable
  queryParams = defaultQueryParams;

  onReset = action(() => {
    this.queryParams = defaultQueryParams;
    this.currentBounds = null;
  });

  setQueryBounds = action((bounds) => {
    if (!this.currentBounds || !this.currentBounds.equals(bounds)) {
      this.currentBounds = bounds;
    }
  });

  setQueryParams = action((bounds) => {
    const {
      state: {date, time, areaSearchRangeMinutes = 10},
    } = this.props;

    if (!bounds || (typeof bounds.isValid === "function" && !bounds.isValid())) {
      return;
    }

    const moment = combineDateAndTime(date, time, "Europe/Helsinki");

    this.queryParams = {
      date,
      minTime: moment.clone().subtract(areaSearchRangeMinutes / 2, "minutes"),
      maxTime: moment.clone().add(areaSearchRangeMinutes / 2, "minutes"),
      minLong: bounds.getWest(),
      maxLong: bounds.getEast(),
      minLat: bounds.getSouth(),
      maxLat: bounds.getNorth(),
    };
  });

  componentDidMount() {
    this.props.state.setResetListener(this.onReset);
    this.disposeQueryReaction = reaction(
      () => this.currentBounds,
      this.setQueryParams
    );
  }

  componentWillUnmount() {
    this.disposeQueryReaction();
  }

  render() {
    const {children} = this.props;
    const {date, minTime, maxTime, ...area} = this.queryParams;

    return (
      <AreaHfpQuery
        skip={Object.values(this.queryParams).some((p) => !p)} // Skip query if some params are falsy
        date={date}
        minTime={minTime ? minTime.toISOString() : null}
        maxTime={maxTime ? maxTime.toISOString() : null}
        area={area}>
        {({events, loading, error}) => {
          return children({
            queryBounds: this.setQueryBounds,
            events,
            loading,
            error,
            timeRange: minTime
              ? {
                  min: minTime,
                  max: maxTime,
                }
              : null,
          });
        }}
      </AreaHfpQuery>
    );
  }
}

export default AreaHfpEvents;
