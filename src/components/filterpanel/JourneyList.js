import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import withHfpData from "../../hoc/withHfpData";
import map from "lodash/map";
import get from "lodash/get";
import {app} from "mobx-app";
import getJourneyId from "../../helpers/getJourneyId";

@inject(app("Journey", "Time", "Filters"))
@withHfpData
@observer
class JourneyList extends Component {
  selectJourney = (journey) => (e) => {
    e.preventDefault();
    const {Time, Journey, Filters, state} = this.props;

    // Only set these if the journey is truthy and was not already selected
    if (journey && getJourneyId(state.selectedJourney) !== getJourneyId(journey)) {
      Time.setTime(journey.journeyStartTime);
      Filters.setVehicle(journey.uniqueVehicleId);
    } else {
      Filters.setVehicle("");
    }

    Journey.setSelectedJourney(journey);
  };

  render() {
    const {positionsByJourney, state} = this.props;

    const journeys = map(positionsByJourney, ({positions}) => positions[0]);

    const selectedJourney = get(state, "selectedJourney");

    const isSelected = (journey) =>
      selectedJourney && getJourneyId(selectedJourney) === getJourneyId(journey);

    return (
      <div className="journey-list">
        {journeys.map((journey) => (
          <button
            className={`journey-list-row ${isSelected(journey) ? "selected" : ""}`}
            key={`${journey.journeyStartTime}_${journey.oday}`}
            onClick={this.selectJourney(journey)}>
            <strong className="start-time">{journey.journeyStartTime}</strong>
            <span className="vehicle-id">{journey.uniqueVehicleId}</span>
          </button>
        ))}
      </div>
    );
  }
}

export default JourneyList;
