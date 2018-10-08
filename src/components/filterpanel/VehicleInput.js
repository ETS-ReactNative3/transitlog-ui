import React from "react";
import SuggestionInput from "./SuggestionInput";
import flow from "lodash/flow";
import flatMap from "lodash/flatMap";
import unionBy from "lodash/unionBy";
import {observer, inject} from "mobx-react";
import withHfpData from "../../hoc/withHfpData";
import {app} from "mobx-app";

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => (
  <span className="suggestion-content">
    <div className="suggestion-text">{getSuggestionValue(suggestion)}</div>
  </span>
);

const getSuggestions = (vehicleIds) => (value = "") => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const suggestionIds =
    inputLength === 0 || vehicleIds.length === 0
      ? vehicleIds
      : vehicleIds.filter((item) => item.includes(inputValue));

  return suggestionIds.length !== 0 ? suggestionIds : [inputValue];
};

const enhance = flow(
  observer,
  withHfpData,
  inject(app("state"))
);

export default enhance(({vehicle = "", onChange, onSelect, state, positions}) => {
  const options = unionBy(
    flatMap(positions, (group) => group.positions),
    "unique_vehicle_id"
  ).map((pos) => pos.unique_vehicle_id);

  return (
    <SuggestionInput
      minimumInput={0}
      placeholder="Rajaa kulkuneuvoa"
      value={vehicle}
      onSelect={onSelect}
      getValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      getSuggestions={getSuggestions(options)}
    />
  );
});
