import React from "react";
import {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Svg,
} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize, svgTranslate} from "../helpers/svg";
import {Colors} from "./HSL_COLORS";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 24 54"
      preserveAspectRatio="xMidYMid meet">
      <Defs>
        <LinearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="97.8555485%"
          id="FerryWithTail-linearGradient-1">
          <Stop stopColor={fill} stopOpacity="0" offset="0%" />
          <Stop stopColor={fill} stopOpacity="0.5" offset="100%" />
        </LinearGradient>
      </Defs>
      <G
        id="icon-ferry-live"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <Path
          fill="url(#FerryWithTail-linearGradient-1)"
          d="M12,54 C18.627417,54 24,48.627417 24,42 C24,35.372583 18.627417,0 12,0 C5.372583,0 0,35.372583 0,42 C0,48.627417 5.372583,54 12,54 Z"
          id="tail"
        />
        <G {...svgTranslate(0.0, 30.0)}>
          <Circle id="Oval-3" fill={fill} cx="12" cy="12" r="12" />
          <G id="icon-ferry" {...svgTranslate(3.0, 3.0)}>
            <G id="icon_ferry">
              <Path
                fill="#FFFFFF"
                fillRule="nonzero"
                d="M15.3,17.46 L2.7,17.46 C1.5069375,17.46 0.54,16.4930625 0.54,15.3 L0.54,2.7 C0.54,1.5069375 1.5069375,0.54 2.7,0.54 L15.3,0.54 C16.4930625,0.54 17.46,1.5069375 17.46,2.7 L17.46,15.3 C17.46,16.4930625 16.4930625,17.46 15.3,17.46 Z"
                id="Shape"
              />
              <Path
                fill={fill}
                fillRule="nonzero"
                d="M0.0005625,2.228625 C0.0005625,1.013625 1.0130625,0.001125 2.2280625,0.001125 L15.7269375,0.001125 C16.9869375,0.001125 17.9994375,1.013625 17.9994375,2.228625 L17.9994375,15.7275 C17.9994375,16.9875 16.9869375,18 15.7269375,18 L2.2280625,18 C1.0130625,18 0.0005625,16.9875 0.0005625,15.7275 L0.0005625,2.228625 Z M2.7230625,15.21 C2.4980625,15.21 2.2955625,15.39 2.2955625,15.6375 C2.2955625,15.885 2.4980625,16.065 2.7230625,16.065 L15.2769375,16.065 C15.5244375,16.065 15.7269375,15.885 15.7269375,15.6375 C15.7269375,15.39 15.5244375,15.21 15.2769375,15.21 L2.7230625,15.21 Z M14.4219375,10.2380625 C14.4219375,10.2380625 12.6219375,9.7655625 11.4069375,9.4955625 C10.3494375,9.2705625 9.0444375,9.1130625 8.9544375,9.1130625 C8.8644375,9.1130625 7.5819375,9.2705625 6.5019375,9.4955625 C5.2869375,9.7655625 3.4869375,10.2380625 3.4869375,10.2380625 L3.9819375,14.5125 L13.9483125,14.5125 L14.4208125,10.2380625 L14.4219375,10.2380625 Z M6.5025,8.6405625 C7.5825,8.4155625 8.8875,8.2580625 8.955,8.2355625 C9.0225,8.2580625 10.3275,8.4155625 11.4075,8.6405625 C12.24,8.8205625 12.7125,8.9330625 13.32,9.0905625 L13.32,5.9630625 C13.32,5.5580625 13.4325,5.0180625 12.375,5.0180625 L10.4175,5.0180625 L10.4175,2.0705625 C10.4175,1.9130625 10.2825,1.7780625 10.125,1.7555625 L7.785,1.7555625 C7.6275,1.7780625 7.515,1.9130625 7.4925,2.0705625 L7.4925,5.0175 L5.535,5.0175 C4.4775,5.0175 4.59,5.5575 4.59,5.9625 L4.59,9.09 L6.5025,8.64 L6.5025,8.6405625 Z M7.56,6.661125 C7.56,7.133625 7.2,7.493625 6.7275,7.493625 C6.255,7.493625 5.895,7.133625 5.895,6.661125 C5.895,6.188625 6.255,5.828625 6.7275,5.828625 C7.2,5.828625 7.56,6.188625 7.56,6.661125 Z M9.7875,6.661125 C9.7875,7.133625 9.4275,7.493625 8.955,7.493625 C8.505,7.493625 8.1225,7.133625 8.1225,6.661125 C8.1225,6.188625 8.505,5.828625 8.955,5.828625 C9.4275,5.828625 9.7875,6.188625 9.7875,6.661125 Z M12.0144375,6.661125 C12.0144375,7.133625 11.6544375,7.493625 11.1819375,7.493625 C10.7319375,7.493625 10.3494375,7.133625 10.3494375,6.661125 C10.3494375,6.188625 10.7319375,5.828625 11.1819375,5.828625 C11.6544375,5.828625 12.0144375,6.188625 12.0144375,6.661125 Z"
                id="Shape"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

Icon.defaultProps = {
  fill: Colors.transport.ferry,
};

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.FerryWithTail";
