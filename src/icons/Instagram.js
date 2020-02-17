import React from "react";
import {Svg, Path} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 30 30"
      preserveAspectRatio="xMidYMid meet">
      <Path
        fill={fill}
        d="M3.85199662,0 L26.1498167,0 C28.2683241,0 30,1.73288472 30,3.85139219 L30,26.1492122 C30,28.2671153 28.2683241,29.9981867 26.1498167,29.9981867 L3.85199662,29.9981867 C1.73348914,29.9981867 0,28.2671153 0,26.1492122 L0,3.85139219 C0,1.73288472 1.73348914,0 3.85199662,0 Z M21.854777,3.33219164 C21.1107305,3.33219164 20.5038885,3.94145142 20.5038885,4.684289 L20.5038885,7.91614619 C20.5038885,8.65958819 21.1107305,9.26763912 21.854777,9.26763912 L25.2455978,9.26763912 C25.9878309,9.26763912 26.5958819,8.65958819 26.5958819,7.91614619 L26.5958819,4.684289 C26.5958819,3.94145142 25.9878309,3.33219164 25.2455978,3.33219164 L21.854777,3.33219164 Z M26.6085748,12.6862634 L23.9690535,12.6862634 C24.2198896,13.5034452 24.3546762,14.3659588 24.3546762,15.2623202 C24.3546762,20.2506346 20.1787081,24.2960471 15.0284079,24.2960471 C9.8793166,24.2960471 5.70274409,20.2506346 5.70274409,15.2623202 C5.70274409,14.3659588 5.839344,13.5034452 6.08836685,12.6862634 L3.33521376,12.6862634 L3.33521376,25.359834 C3.33521376,26.0162389 3.87073377,26.5499456 4.52653423,26.5499456 L25.4172543,26.5499456 C26.0736592,26.5499456 26.6085748,26.0162389 26.6085748,25.359834 L26.6085748,12.6862634 Z M15.0284079,9.09719144 C11.7022605,9.09719144 9.00411009,11.7101181 9.00411009,14.935931 C9.00411009,18.1587218 11.7022605,20.7734617 15.0284079,20.7734617 C18.3563686,20.7734617 21.0539147,18.1587218 21.0539147,14.935931 C21.0539147,11.7101181 18.3563686,9.09719144 15.0284079,9.09719144 L15.0284079,9.09719144 Z"
      />
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.Instagram";
