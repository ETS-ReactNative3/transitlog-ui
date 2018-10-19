import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {app} from "mobx-app";
import {get} from "lodash";
import {text} from "../../helpers/text";
import Dropdown from "../Dropdown";
import {createRouteKey} from "../../helpers/hfpCache";

@inject(app("Filters"))
@observer
class RouteInput extends Component {
  onChange = (e) => {
    const {Filters, routes} = this.props;
    const selectedValue = get(e, "target.value", false);

    if (!selectedValue) {
      return Filters.setRoute({});
    }

    const route = routes.find((r) => createRouteKey(r) === selectedValue);

    if (route) {
      Filters.setRoute(route);
    }
  };

  componentDidUpdate() {
    this.resetRoute();
  }

  /**
   * Reset the selected route if none of the route options match. This means
   * the line has changed and the routes should be refetched.
   */
  resetRoute() {
    const {
      routes,
      state: {route},
    } = this.props;
    const currentValue = createRouteKey(route);

    if (
      routes.length !== 0 &&
      routes.every((routeListItem) => createRouteKey(routeListItem) !== currentValue)
    ) {
      this.onChange(false);
    }
  }

  render() {
    const {route = null, routes} = this.props;

    const options = routes.map((routeOption) => {
      const {
        nodeId,
        routeId,
        direction,
        originFi,
        destinationFi,
        dateBegin,
        dateEnd,
      } = routeOption;

      return {
        key: nodeId,
        value: createRouteKey(routeOption),
        label: `${routeId} - suunta ${direction}, ${originFi} - ${destinationFi} (${dateBegin} - ${dateEnd})`,
      };
    });

    options.unshift({value: "", label: text("filterpanel.select_route")});
    const currentValue = createRouteKey(route);

    return (
      <Dropdown value={currentValue} onChange={this.onChange}>
        {options.map(({key, value, label}) => (
          <option key={`route_select_${key}`} value={value}>
            {label}
          </option>
        ))}
      </Dropdown>
    );
  }
}

export default RouteInput;
