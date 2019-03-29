import React, {useRef} from "react";
import {Tooltip} from "react-leaflet";
import moment from "moment-timezone";
import {observer} from "mobx-react-lite";
import {Text} from "../../helpers/text";
import {TIMEZONE} from "../../constants";

const HfpTooltip = observer(
  ({
    journey = null,
    event = null,
    permanent = false,
    sticky = true,
    direction = "left",
    offset = [-25, 0],
  }) => {
    const prevEvent = useRef(null);
    let usingEvent = event || prevEvent.current;

    if (!usingEvent) {
      return null;
    }

    if (event) {
      prevEvent.current = event;
    }

    return (
      <Tooltip
        sticky={sticky}
        permanent={permanent}
        offset={offset}
        direction={direction}>
        <strong>
          {journey.routeId} / {journey.direction}
        </strong>
        <br />
        {moment.tz(usingEvent.recordedAt, TIMEZONE).format("YYYY-MM-DD, HH:mm:ss")}
        <br />
        {journey.uniqueVehicleId}
        <br />
        <Text>vehicle.next_stop</Text>: {usingEvent.nextStopId}
        <br />
        <Text>vehicle.speed</Text>: {Math.round((usingEvent.velocity * 18) / 5)} km/h
        <br />
        DL: {usingEvent.delay}
      </Tooltip>
    );
  }
);

export default HfpTooltip;
