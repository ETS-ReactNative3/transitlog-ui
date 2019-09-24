import React, {useCallback, useMemo, useEffect} from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import flow from "lodash/flow";
import merge from "lodash/merge";
import last from "lodash/last";
import uniqBy from "lodash/uniqBy";
import {inject} from "../../../helpers/inject";
import {
  JourneyStopEvent,
  JourneyCancellationEventItem,
  JourneyEvent,
} from "./JourneyEvent";
import EventFilters from "./EventFilters";

const EventsListWrapper = styled.div`
  padding: 0.5rem 0;
`;

const EventsList = styled.div`
  padding: 1rem 0.5rem 0 0;
  width: 100%;
  color: var(--light-grey);
`;

const decorate = flow(
  observer,
  inject("Time", "Filters", "UI", "Journey")
);

const JourneyEvents = decorate(
  ({events = [], originDeparture, date, Filters, UI, Time, Journey, state}) => {
    const eventFilterTypes = useMemo(
      () =>
        events.reduce(
          (eventTypes, event) => {
            const {type} = event;

            if (eventTypes[type]) {
              return eventTypes;
            }

            if (["CANCELLATION", "PLANNED"].includes(type)) {
              eventTypes[type] = true;
            } else {
              eventTypes[type] = false;
            }

            return eventTypes;
          },
          {ALL: false, TIMING_STOP_ARS: true, TERMINAL_ARS: true, DEP: true}
        ),
      [events]
    );

    useEffect(() => {
      Journey.setJourneyEventFilter(eventFilterTypes, true);
    }, []);

    const onFilterChange = useCallback(
      (nextState) => {
        Journey.setJourneyEventFilter(nextState);
      },
      [Journey, state.journeyEvents]
    );

    const onClickTime = useCallback(
      (time) => {
        Time.setTime(time);
      },
      [Time]
    );

    const onClick = useCallback(
      (stopId) => {
        if (stopId) {
          Filters.setStop(stopId);
        }
      },
      [Filters]
    );

    const onHover = useCallback(
      (stopId) => {
        UI.highlightStop(stopId);
      },
      [UI]
    );

    if (events.length === 0) {
      return null;
    }

    return (
      <EventsListWrapper>
        <EventFilters onChange={onFilterChange} filterState={state.journeyEvents} />
        <EventsList>
          {uniqBy(events, "id")
            .filter((event, index, arr) => {
              const eventsOfType = arr.filter((evt) => evt.type === event.type);
              const isOrigin = originDeparture.stopId === event.stopId;
              const isLastOfType = last(eventsOfType) === event;

              const isTimingStopArr = event.isTimingStop && event.type === "ARS";
              const isTerminalArr = (isOrigin || isLastOfType) && event.type === "ARS";

              const types = [event.type];

              // Show ARR for timing stops
              if (isTimingStopArr) {
                types.push("TIMING_STOP_ARS");
              }

              // Show ARR for first and last stop
              if (isTerminalArr) {
                types.push("TERMINAL_ARS");
              }

              return types.some((type) => state.journeyEvents[type]);
            })
            .map((event, index, arr) => {
              let Component = JourneyEvent;

              switch (event.type) {
                case "DEP":
                case "ARS":
                case "PLANNED":
                  Component = JourneyStopEvent;
                  break;
                case "CANCELLATION":
                  Component = JourneyCancellationEventItem;
                  break;
                default:
                  Component = JourneyEvent;
              }

              return (
                <Component
                  isOrigin={originDeparture.stopId === event.stopId}
                  isFirst={index === 0}
                  isLast={index === arr.length - 1}
                  key={event.id}
                  onHover={onHover}
                  onClick={onClick}
                  event={event}
                  date={date}
                  departure={originDeparture}
                  onSelectTime={onClickTime}
                />
              );
            })}
        </EventsList>
      </EventsListWrapper>
    );
  }
);

export default JourneyEvents;