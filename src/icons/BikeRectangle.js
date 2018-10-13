import React from "react";
import {Svg, G, Path} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";
import {Colors} from "./HSL_COLORS";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 20 20"
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <G>
        <G>
          <Path
            fill={fill.outer}
            d="M0,2.4748 C0,1.1248 1.1252,0 2.4748,0 L17.4752,0 C18.8752,0 20,1.1248 20,2.4748 L20,17.4748 C20,18.8748 18.8752,20 17.4752,20 L2.4748,20 C1.1252,20 0,18.8748 0,17.4748 L0,2.4748 Z"
            id="Fill-1"
          />
          <Path
            fill={fill.inner}
            d="M8.03948,9.2678 L8.88708,11.4746 L6.39508,11.7146 L8.03948,9.2678 Z M12.88068,9.1214 L13.54628,10.8586 C13.81228,11.5622 14.24948,12.2342 14.57788,12.6094 C14.92188,13.0158 15.40628,12.5938 15.10948,12.2186 C14.78108,11.8122 14.42148,11.2026 14.17148,10.5618 L12.96428,7.373 L13.93508,7.373 L14.46628,8.7174 C14.54468,8.905 14.65428,8.983 14.82588,8.983 L16.12308,8.983 C16.31108,8.983 16.43588,8.8894 16.48268,8.733 L17.13948,6.8262 C17.29548,6.3882 16.76428,6.201 16.59228,6.5758 C16.07628,7.717 15.01388,7.5606 14.62308,7.1074 C14.46628,6.9198 14.35708,6.8262 14.15388,6.8262 L12.75708,6.8262 L12.75308,6.815 C12.75628,6.8098 12.75988,6.8046 12.76308,6.7994 C13.05508,6.3542 13.13708,6.2026 13.20628,5.8642 C13.27428,5.5338 13.20668,5.2254 13.01468,4.993 C12.80748,4.7426 12.50028,4.585 12.12508,4.5926 C11.60308,4.601 11.20108,5.019 11.15668,5.0674 C11.02988,5.2038 11.03788,5.4178 11.17508,5.5454 C11.31308,5.6718 11.51708,5.6582 11.65388,5.5274 C11.73148,5.4522 11.93708,5.2602 12.13508,5.2574 C12.30388,5.2526 12.39548,5.3258 12.44788,5.3806 C12.52668,5.4634 12.57748,5.6198 12.53908,5.7678 C12.51108,5.8758 12.47908,5.9782 12.25468,6.3374 L12.25388,6.3366 C12.07148,6.5558 11.98108,6.7594 12.05908,6.9782 L12.62068,8.4434 C11.56508,9.151 10.78108,10.1786 10.48428,11.5058 C10.27468,11.3938 10.04108,11.3602 9.76388,11.3902 L9.59468,11.4066 L7.75748,6.6158 C7.93028,6.5686 8.12908,6.5286 8.37268,6.5134 L8.57588,6.4978 C8.77908,6.4822 8.93508,6.3574 8.93508,6.1694 C8.93508,5.9822 8.79468,5.8258 8.54468,5.8258 L7.54428,5.8258 C6.80948,5.8258 6.68428,5.8142 6.26268,5.8142 C6.01228,5.8142 5.85628,5.9038 5.85628,6.0914 C5.85628,6.4822 6.37188,6.8418 6.85628,6.8418 C6.93948,6.8418 7.01828,6.8314 7.09748,6.815 L7.74308,8.4966 L7.09108,9.4678 C6.43428,8.983 5.65308,8.7174 4.85588,8.7174 C3.93228,8.7174 3.06788,9.0542 2.44628,9.5722 C2.42588,9.5894 2.29508,9.713 2.27628,9.7318 C2.09508,9.913 2.15308,10.237 2.40588,10.2822 C2.42948,10.2862 2.55788,10.3222 2.58108,10.3278 C3.54108,10.5594 4.45148,11.1486 5.17708,11.929 C4.97828,12.0614 4.85588,12.2738 4.85588,12.4998 C4.85588,12.9062 5.12148,13.1878 5.57468,13.2346 L9.65428,13.6722 C10.42028,13.7506 11.04548,13.4222 11.10788,12.4846 L11.12348,12.2654 C11.19788,11.0562 11.82988,9.891 12.88068,9.1214 Z"
            id="Fill-4"
          />
          <Path
            fill={fill.inner}
            d="M5.48088,14.71952 C4.23048,14.71952 3.21448,13.71912 3.21448,12.46872 C3.21448,12.07792 3.32408,11.68712 3.55848,11.31192 C3.37088,11.18672 3.13648,11.07752 2.93288,10.99912 C2.66728,11.43712 2.52648,11.96872 2.52648,12.46872 C2.52648,14.09432 3.85568,15.40712 5.48088,15.40712 C6.52808,15.40712 7.46608,14.86032 7.98168,14.01592 L7.15328,13.92232 C6.77848,14.42232 6.16848,14.71952 5.48088,14.71952"
            id="Fill-6"
          />
          <Path
            fill={fill.inner}
            d="M14.89064,9.53008 C14.70304,9.53008 14.53104,9.54568 14.37464,9.57688 L14.62464,10.23328 C14.70304,10.21768 14.79664,10.21768 14.89064,10.21768 C16.12504,10.21768 17.14104,11.23368 17.14104,12.46888 C17.14104,13.71928 16.12504,14.71968 14.89064,14.71968 C13.64024,14.71968 12.63984,13.71928 12.63984,12.46888 C12.63984,11.95288 12.81184,11.48408 13.09304,11.10888 L12.81184,10.37408 C12.28024,10.90568 11.93624,11.65568 11.93624,12.46888 C11.93624,14.09408 13.26504,15.40728 14.89064,15.40728 C16.51584,15.40728 17.82904,14.09408 17.82904,12.46888 C17.82904,10.84288 16.51584,9.53008 14.89064,9.53008"
            id="Fill-8"
          />
        </G>
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.shape({
    inner: PropTypes.string,
    outer: PropTypes.string,
  }),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.defaultProps = {
  fill: {
    inner: Colors.primary.hslGreyDark,
    outer: Colors.transport.bike,
  },
};

Icon.displayName = "Icons.BikeRectangle";
