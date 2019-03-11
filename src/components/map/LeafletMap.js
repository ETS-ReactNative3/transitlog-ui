import React, {Component} from "react";
import {
  Map,
  TileLayer,
  ZoomControl,
  Pane,
  LayersControl,
  FeatureGroup,
  ScaleControl,
} from "react-leaflet";
import {latLng} from "leaflet";
import get from "lodash/get";
import MapillaryViewer from "./MapillaryViewer";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import MapillaryGeoJSONLayer from "./MapillaryGeoJSONLayer";
import {setUrlValue, getUrlValue} from "../../stores/UrlManager";
import {observer, inject} from "mobx-react";
import {app} from "mobx-app";

const MapContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > .leaflet-container {
    width: 100%;
    height: 100%;
    z-index: 0;
    flex: 1 1 50%;
  }
`;

const MapillaryView = styled(MapillaryViewer)`
  width: 100%;
  height: 100%;
  flex: 1 1 50%;
  position: relative;
`;

@inject(app("UI"))
@observer
class LeafletMap extends Component {
  state = {
    currentBaseLayer: getUrlValue("mapBaseLayer", "Digitransit"),
    currentMapillaryMapLocation: false,
  };

  onChangeBaseLayer = ({name}) => {
    setUrlValue("mapBaseLayer", name);

    this.setState({
      currentBaseLayer: name,
    });
  };

  onMapillaryNavigation = ({latLon: {lat, lon}}) => {
    const location = latLng({lat, lng: lon});

    this.setState({
      currentMapillaryMapLocation: location,
    });
  };

  render() {
    const {
      state: {mapOverlays},
      UI: {changeOverlay},
      mapRef,
      children,
      className,
      currentMapillaryViewerLocation,
      setMapillaryViewerLocation,
      onZoom = () => {},
      onMapChanged = () => {},
    } = this.props;

    let mapView = null;

    if (mapRef.current) {
      mapView = mapRef.current.leafletElement.getBounds();
    }

    const {currentBaseLayer, currentMapillaryMapLocation} = this.state;

    return (
      <MapContainer className={className}>
        <Map
          key="the-map"
          ref={mapRef}
          maxZoom={20}
          zoomSnap={1}
          wheelPxPerZoomLevel={50}
          selectArea={true}
          zoomControl={false}
          onBaselayerchange={this.onChangeBaseLayer}
          onOverlayadd={changeOverlay("add")}
          onOverlayremove={changeOverlay("remove")}
          onZoomend={onZoom}
          onMoveend={onMapChanged}>
          <LayersControl position="topright">
            <LayersControl.BaseLayer
              name="Digitransit"
              checked={currentBaseLayer === "Digitransit"}>
              <TileLayer
                attribution={
                  'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors '
                }
                url="https://digitransit-prod-cdn-origin.azureedge.net/map/v1/hsl-map/{z}/{x}/{y}@2x.png"
                tileSize={512}
                zoomOffset={-1}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer
              name="Aerial"
              checked={currentBaseLayer === "Aerial"}>
              <TileLayer
                attribution="MML/LUKE"
                url="http://tiles.kartat.kapsi.fi/ortokuva/{z}/{x}/{y}.jpg"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay
              name="Mapillary"
              checked={mapOverlays.includes("Mapillary")}>
              <MapillaryGeoJSONLayer
                map={get(mapRef, "current.leafletElement", null)}
                viewBbox={mapView}
                location={currentMapillaryMapLocation}
                layerIsActive={mapOverlays.includes("Mapillary")}
                onSelectLocation={setMapillaryViewerLocation}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay
              name="Stop radius"
              checked={mapOverlays.includes("Stop radius")}>
              <FeatureGroup>
                {/*
                  The stop radius is rendered in the StopMarker component. This featuregroup
                  is just a dummy so that the option will show in the layer control.
                */}
              </FeatureGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay
              name="Weather"
              checked={mapOverlays.includes("Weather")}>
              <FeatureGroup>
                {/*
                  The weather display is rendered in MapContent. This featuregroup
                  is just a dummy so that the option will show in the layer control.
                */}
              </FeatureGroup>
            </LayersControl.Overlay>
          </LayersControl>
          <Pane name="mapillary-lines" style={{zIndex: 390}} />
          <Pane name="mapillary-location" style={{zIndex: 400}} />
          <Pane name="route-lines" style={{zIndex: 410}} />
          <Pane name="hfp-lines" style={{zIndex: 420}} />
          <Pane name="stop-radius" style={{zIndex: 440}} />
          <Pane name="selected-stop-radius" style={{zIndex: 445}} />
          <Pane name="stops" style={{zIndex: 450}} />
          <Pane name="hfp-markers" style={{zIndex: 460}} />
          <Pane name="hfp-markers-primary" style={{zIndex: 465}} />
          <ZoomControl position="topright" />
          <ScaleControl position="bottomleft" imperial={false} />
          {children}
        </Map>
        {currentMapillaryViewerLocation && (
          <MapillaryView
            onCloseViewer={() => setMapillaryViewerLocation(false)}
            elementId="mapillary-viewer"
            onNavigation={this.onMapillaryNavigation}
            location={currentMapillaryViewerLocation}
          />
        )}
      </MapContainer>
    );
  }
}

export default LeafletMap;
