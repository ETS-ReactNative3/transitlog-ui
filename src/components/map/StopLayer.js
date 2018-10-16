import React, {Component} from "react";
import {observer} from "mobx-react";
import withRoute from "../../hoc/withRoute";
import StopsByBboxQuery from "../../queries/StopsByBboxQuery";
import StopMarker from "./StopMarker";

@withRoute
@observer
class StopLayer extends Component {
  state = {selectedStop: null};

  render() {
    const {selectedStop, bounds, state} = this.props;
    const {date} = state;

    return (
      <StopsByBboxQuery variables={{...bounds, date}}>
        {({stops}) => (
          <React.Fragment>
            {stops.map((stop) => (
              <StopMarker
                date={date}
                stop={stop}
                selected={selectedStop === stop.stopId}
                onPopupopen={() => this.setState({selectedStop: stop.stopId})}
                onPopupclose={() => this.setState({selectedStop: null})}
              />
            ))}
          </React.Fragment>
        )}
      </StopsByBboxQuery>
    );
  }
}

export default StopLayer;
