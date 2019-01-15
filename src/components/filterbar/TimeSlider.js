import React, {Component} from "react";
import moment from "moment-timezone";
import {observer, inject} from "mobx-react";
import {app} from "mobx-app";
import RangeInput from "../RangeInput";
import {
  dateToSeconds,
  getTimeRangeFromPositions,
} from "../../helpers/getTimeRangeFromPositions";
import getJourneyId from "../../helpers/getJourneyId";
import get from "lodash/get";

export const TIME_SLIDER_MAX = 86399;
export const TIME_SLIDER_MIN = 15000;

@inject(app("Time", "UI"))
@observer
class TimeSlider extends Component {
  getNumericValue = (value = "", date) => {
    const {timeRange} = this.props;
    const max = get(timeRange, "maxTime", TIME_SLIDER_MAX);

    const val = moment.tz(date, "Europe/Helsinki").startOf("day");

    if (value) {
      const [hours = 23, minutes = 59, seconds = 0] = value.split(":");
      val.hours(hours);
      val.minutes(minutes);
      val.seconds(seconds);
    } else {
      val.add(max, "seconds");
    }

    return Math.abs(
      moment
        .tz(date, "Europe/Helsinki")
        .startOf("day")
        .diff(val, "seconds")
    );
  };

  getTimeValue = (value, date) => {
    const nextDate = moment
      .tz(date, "Europe/Helsinki")
      .startOf("day")
      .add(parseInt(value, 10), "seconds");

    return nextDate.format("HH:mm:ss");
  };

  onChange = (e) => {
    const {
      Time,
      UI,
      state: {date, pollingEnabled},
    } = this.props;

    const timeValue = this.getTimeValue(e.target.value, date);

    if (pollingEnabled) {
      UI.togglePolling(false);
    }

    Time.setTime(timeValue);
  };

  getRange = () => {
    const {
      positions,
      timeRange,
      state: {selectedJourney, route},
    } = this.props;

    const selectedJourneyId = getJourneyId(selectedJourney);
    let selectedJourneyPositions = [];

    if (selectedJourneyId && positions.length !== 0) {
      selectedJourneyPositions = get(
        positions.find(({journeyId}) => journeyId === selectedJourneyId),
        "events",
        []
      );
    }

    return (!route || !route.routeId) && timeRange
      ? {
          min: dateToSeconds(timeRange.min),
          max: dateToSeconds(timeRange.max),
        }
      : selectedJourneyPositions.length !== 0
      ? getTimeRangeFromPositions(
          selectedJourneyPositions,
          TIME_SLIDER_MIN,
          TIME_SLIDER_MAX
        )
      : {};
  };

  render() {
    const {
      className,
      state: {date, time},
    } = this.props;

    const {min = TIME_SLIDER_MIN, max = TIME_SLIDER_MAX} = this.getRange();

    return (
      <div className={className}>
        <RangeInput
          value={this.getNumericValue(time, date)}
          min={min}
          max={max}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default TimeSlider;
