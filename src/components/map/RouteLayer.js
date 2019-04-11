import React, {Component} from "react";
import {Polyline} from "react-leaflet";
import calculateBoundsFromPositions from "../../helpers/calculateBoundsFromPositions";
import {observer} from "mobx-react";
import {getModeColor} from "../../helpers/vehicleColor";

@observer
class RouteLayer extends Component {
  currentRouteId = "";

  componentDidMount() {
    this.updateBounds();
  }

  componentDidUpdate() {
    this.updateBounds();
  }

  updateBounds = () => {
    const {routeId} = this.props;

    if (routeId !== this.currentRouteId) {
      this.currentRouteId = routeId;
      this.setBounds();
    }
  };

  setBounds() {
    const {canCenterOnRoute = true, coordinates, setMapView = () => {}} = this.props;

    if (!canCenterOnRoute || coordinates.length === 0) {
      return;
    }

    const bounds = calculateBoundsFromPositions(coordinates);

    if (bounds && bounds.isValid()) {
      setMapView(bounds);
    }
  }

  render() {
    const {coordinates, mode} = this.props;
    const color = getModeColor(mode);

    return (
      <Polyline pane="route-lines" weight={3} positions={coordinates} color={color} />
    );
  }
}

export default RouteLayer;
