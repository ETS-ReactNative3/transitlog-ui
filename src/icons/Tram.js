import React from "react";
import {Svg, Path, G} from "react-primitives-svg";
import PropTypes from "prop-types";

import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="10.5 5.1 14 25"
      preserveAspectRatio="xMidYMid meet">
      <G>
        <Path
          fill={fill}
          d="M22.4175,28.3653125 C22.736875,28.3653125 23.0923437,28.6846875 23.0923437,29.0040625 C23.0923437,29.465625 22.736875,29.75 22.4175,29.75 L12.5814062,29.75 C12.1909375,29.75 11.9426562,29.465625 11.9426562,29.0040625 C11.9426562,28.6846875 12.1909375,28.3653125 12.5814062,28.3653125 L13.6467187,28.3653125 L13.6467187,27.3 L14.9603125,27.4771875 L14.9603125,28.3653125 L20.0385937,28.3653125 L20.0385937,27.4771875 L21.3521875,27.3 L21.3521875,28.3653125 L22.4175,28.3653125 Z M23.7321875,10.6826563 C23.909375,11.1092188 24.0165625,11.711875 24.0165625,12.1745313 L24.0165625,24.9571875 C24.0165625,25.5959375 23.555,25.9875 22.95125,26.0935938 C20.9628125,26.4840625 19.25875,26.62625 17.4835937,26.62625 C15.6373437,26.62625 13.9682812,26.4840625 12.0509375,26.0935938 C11.4121875,25.9875 10.985625,25.5970313 10.985625,24.9571875 L10.985625,12.1745313 C10.985625,11.7129688 10.985625,11.1092188 11.1628125,10.6826563 L11.7665625,9.226875 C11.9798437,8.8003125 12.228125,8.623125 12.7257812,8.4809375 C14.1465625,8.09046875 15.3179687,7.94828125 16.77375,7.91328125 L16.77375,6.67078125 L14.1815625,6.67078125 C13.755,6.67078125 13.435625,6.35140625 13.435625,5.9959375 C13.435625,5.569375 13.755,5.25 14.1815625,5.25 L20.8567187,5.25 C21.2121875,5.25 21.4954687,5.569375 21.4954687,5.9959375 C21.4954687,6.35140625 21.2110937,6.67078125 20.8567187,6.67078125 L18.2295312,6.67078125 L18.2295312,7.91328125 C19.6503125,7.94828125 20.750625,8.09046875 22.2775,8.4809375 C22.7040625,8.58703125 22.9523437,8.8003125 23.1295312,9.226875 L23.7332812,10.6826563 L23.7321875,10.6826563 Z M13.9310938,22.8976563 C13.9310938,22.4010938 13.575625,22.0095313 13.0790625,22.0095313 C12.6175,22.0095313 12.2620313,22.4 12.2620313,22.8976563 C12.2620313,23.3592188 12.6175,23.6785938 13.0790625,23.6785938 C13.575625,23.6785938 13.9310938,23.3592188 13.9310938,22.8976563 Z M12.298125,20.51875 C13.7189062,20.8742188 15.63625,21.1575 17.4825,21.1575 C19.3648437,21.1575 21.2821875,20.9092188 22.6307812,20.51875 L22.6307812,11.8901563 L12.298125,11.8901563 L12.298125,20.51875 Z M22.8790625,22.8976563 C22.8790625,22.4010938 22.4885937,22.0095313 21.9909375,22.0095313 C21.529375,22.0095313 21.21,22.4 21.21,22.8976563 C21.21,23.3592188 21.529375,23.6785938 21.9909375,23.6785938 C22.4875,23.6785938 22.8790625,23.3592188 22.8790625,22.8976563 Z"
        />
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.Tram";
