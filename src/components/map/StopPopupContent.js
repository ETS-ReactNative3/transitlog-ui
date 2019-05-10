import {Heading} from "../Typography";
import StopRouteSelect from "./StopRouteSelect";
import {Text} from "../../helpers/text";
import React from "react";
import styled from "styled-components";
import AlertsList from "../AlertsList";
import {StopContent} from "../StopElements";
import {getAlertsInEffect} from "../../helpers/getAlertsInEffect";
import {Button} from "../Forms";
import {observer} from "mobx-react-lite";
import {flow} from "lodash";
import {inject} from "../../helpers/inject";

export const StopAlerts = styled(AlertsList)`
  padding: 0;
  margin-top: 1rem;
`;

export const StopPopupContentSection = styled.div`
  padding: 0 1rem;

  &:first-child {
    padding-top: 1rem;
  }

  &:last-child {
    padding-bottom: 1rem;
  }
`;

export const StopContentWrapper = styled(StopContent)`
  font-family: inherit;
  font-size: 1rem;
  padding: 0;
`;

export const StopStreetViewWrapper = styled(StopPopupContentSection)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const decorate = flow(
  observer,
  inject("state")
);

const StopPopupContent = decorate(
  ({state, color, stop, onSelectRoute, onShowStreetView}) => {
    return (
      <StopContentWrapper>
        <StopPopupContentSection>
          <Heading level={4}>
            {stop.name}, {stop.shortId.replace(/ /g, "")} ({stop.stopId})
          </Heading>
          {onSelectRoute && (
            <StopRouteSelect
              color={color}
              onSelectRoute={onSelectRoute}
              stopId={stop.stopId}
            />
          )}
        </StopPopupContentSection>
        {stop && <StopAlerts alerts={getAlertsInEffect(stop, state.timeMoment)} />}
        <StopStreetViewWrapper>
          <Button onClick={onShowStreetView}>
            <Text>map.stops.show_in_streetview</Text>
          </Button>
        </StopStreetViewWrapper>
      </StopContentWrapper>
    );
  }
);

export default StopPopupContent;
