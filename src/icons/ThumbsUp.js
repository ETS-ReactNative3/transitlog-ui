import React from "react";
import {Svg, Path, G} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 32 34"
      preserveAspectRatio="xMidYMid meet">
      <G fill={fill} id="Mobile" fillRule="evenodd">
        <Path
          d="M17.8453333,1.58878788 C19.2714667,3.955 17.6544,6.91939394 16.4426667,9.50409091 C15.4016,11.7271212 15.5594667,14.2481818 18.352,13.9257576 C21.7162667,13.5365152 23.0741333,13.2692424 25.9381333,13.0740909 C28.8298667,12.8778788 29.7429333,14.0583333 29.7429333,15.1528788 C29.7429333,16.9198485 29.1498667,17.0524242 29.1498667,17.7301515 C29.1498667,18.4078788 31.3685333,17.9656061 31.3685333,20.1886364 C31.3685333,22.4148485 29.6352,22.3416667 29.6352,22.9621212 C29.6352,23.584697 31.3226667,23.8625758 31.3226667,25.6422727 C31.3226667,27.4219697 29.0485333,27.6574242 29.0485333,28.3924242 C29.0485333,29.1274242 29.7834667,29.3183333 29.7834667,30.420303 C29.7834667,31.5201515 27.4762667,33.9415152 19.3354667,33.9415152 C5.4624,33.9415152 7.1072,30.6334848 0.631466667,30.6334848 L0.631466667,18.4089394 C4.00213333,18.4089394 3.81973333,15.4392424 6.14613333,13.1706061 C8.4928,10.8828788 12.9824,5.70393939 13.8645333,1.62060606 C14.4544,-1.11151515 16.9653333,0.129393939 17.8464,1.59090909 L17.8453333,1.58878788 Z"
          id="Shape"
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

Icon.displayName = "Icons.ThumbsUp";
