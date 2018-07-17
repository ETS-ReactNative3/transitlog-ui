import React from 'react';
import {Polyline} from 'react-leaflet'

const HfpLayer = ({positions}) => {
    const coords = positions.map(({lat, long}) => [lat, long]);
    return (<Polyline color={"green"} positions={coords}/>)
}

export default HfpLayer;