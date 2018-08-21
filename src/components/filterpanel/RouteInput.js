import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {app} from "mobx-app";

@inject(app("Filters"))
@observer
export class RouteInput extends Component {
  onChange = (e) => {
    const {Filters} = this.props;
    const selectedValue = e.target.value;

    if (!selectedValue) {
      return Filters.setRoute({});
    }

    Filters.setRoute(selectedValue);
  };

  render() {
    const {route, routes} = this.props;

    const options = routes.map(
      ({
        nodeId,
        routeId,
        direction,
        originFi,
        destinationFi,
        dateBegin,
        dateEnd,
      }) => ({
        value: nodeId,
        label: `${routeId} - suunta ${direction}, ${originFi} - ${destinationFi} (${dateBegin} - ${dateEnd})`,
      })
    );

    options.unshift({value: "", label: "Valitse reitti..."});

    return (
      <select value={route} onChange={this.onChange}>
        {options.map(({value, label}) => (
          <option key={`route_select_${value}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
}