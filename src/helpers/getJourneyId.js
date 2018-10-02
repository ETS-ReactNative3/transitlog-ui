import {pickJourneyProps} from "../stores/journeyActions";

export default (journey = null) => {
  const {
    oday = null,
    journey_start_time = null,
    route_id = null,
    direction_id = null,
  } = pickJourneyProps(journey || {});

  if (!oday || !journey_start_time) return "";

  return `journey:${oday}_${journey_start_time}_${route_id}_${direction_id}`;
};